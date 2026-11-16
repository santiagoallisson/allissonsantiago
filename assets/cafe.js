/* Café com (c)alma: sorteio de carta, giro, trocar carta e compartilhar. */
(function () {
  var frases = window.CAFE_FRASES || [];
  var card = document.getElementById("card");
  if (!card || !frases.length) return;

  var elQuote = document.getElementById("quote");
  var elAuthor = document.getElementById("author");
  var elMeaning = document.getElementById("meaning");
  var elStatus = document.getElementById("share-status");
  var current = null;
  var FONT = '"Segoe UI", "Open Sans", system-ui, -apple-system, Roboto, Arial, sans-serif';

  /* ---------- Sorteio ----------
     Cada visitante embaralha o próprio baralho (aleatório do navegador) e recebe uma carta nova
     a cada acesso ou atualização; só repete depois de ver todas, e nunca a mesma em seguida. */
  function rand(n) {
    var a = new Uint32Array(1);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return a[0] % n;
  }
  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) { var j = rand(i + 1), t = list[i]; list[i] = list[j]; list[j] = t; }
    return list;
  }
  function nextIndex() {
    var deck = [], last = -1;
    try {
      var saved = JSON.parse(localStorage.getItem("cafe-deck") || "null");
      if (saved && saved.n === frases.length && Array.isArray(saved.deck)) { deck = saved.deck; last = saved.last; }
    } catch (e) {}
    if (!deck.length) {
      deck = shuffle(frases.map(function (_, i) { return i; }));
      if (frases.length > 1 && deck[deck.length - 1] === last) {   /* evita repetir a última carta no recomeço */
        var k = rand(deck.length - 1), t = deck[k]; deck[k] = deck[deck.length - 1]; deck[deck.length - 1] = t;
      }
    }
    var idx = deck.pop();
    try { localStorage.setItem("cafe-deck", JSON.stringify({ n: frases.length, deck: deck, last: idx })); } catch (e) {}
    return idx;
  }

  /* ---------- Carta ---------- */
  function show(i) {
    var f = frases[i]; current = f;
    elQuote.textContent = "“" + f.frase + "”";
    elAuthor.textContent = f.autor;
    elMeaning.textContent = f.significado;
  }
  function setFlipped(on) {
    card.classList.toggle("is-flipped", on);
    card.setAttribute("aria-pressed", String(on));
  }
  function change() {
    var wasFlipped = card.classList.contains("is-flipped");
    setFlipped(false);
    card.classList.add("is-changing");
    setTimeout(function () {
      show(nextIndex());
      card.classList.remove("is-changing");
    }, wasFlipped ? 450 : 300);
    status("");
  }
  card.addEventListener("click", function () { setFlipped(!card.classList.contains("is-flipped")); });
  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped(!card.classList.contains("is-flipped")); }
  });
  document.getElementById("btn-reset").addEventListener("click", change);

  function status(msg) { if (elStatus) elStatus.textContent = msg; }

  /* ---------- Imagem para o Instagram (Stories 1080x1920) ---------- */
  function wrap(ctx, text, maxW) {
    var words = text.split(" "), lines = [], line = "";
    words.forEach(function (w) {
      var test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else { line = test; }
    });
    if (line) lines.push(line);
    return lines;
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function logoImage(color) {
    return new Promise(function (resolve) {
      var svg = document.getElementById("cafe-logo");
      if (!svg) return resolve(null);
      var src = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="290 262 1620 1676" width="1620" height="1676" fill="' + color + '">' + svg.innerHTML + "</svg>";
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(src);
    });
  }
  async function buildImage() {
    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }
    var dark = document.documentElement.classList.contains("dark");
    var C = dark
      ? { bg: "#000000", card: "#18181b", text: "#f4f4f5", gray: "#a1a1aa" }
      : { bg: "#ffffff", card: "#f4f4f5", text: "#27272a", gray: "#71717a" };
    var W = 1080, H = 1920, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var ctx = cv.getContext("2d");
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    var spacing = function (px) { if ("letterSpacing" in ctx) ctx.letterSpacing = px + "px"; };

    /* Topo: "Meu momento", centralizado em cinza */
    ctx.fillStyle = C.gray; ctx.font = "300 60px " + FONT; spacing(8);
    ctx.fillText("Meu momento", W / 2, 250); spacing(0);

    /* Carta */
    ctx.font = "400 56px " + FONT;
    var lines = wrap(ctx, "“" + current.frase + "”", 740), lineH = 84, padV = 130, authorH = 120;
    var cardW = 900, cardH = padV * 2 + lines.length * lineH + authorH;
    var cardX = (W - cardW) / 2, cardY = Math.max(360, (H - cardH) / 2 - 30);
    ctx.fillStyle = C.card; roundRect(ctx, cardX, cardY, cardW, cardH, 40); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = "400 56px " + FONT;
    lines.forEach(function (l, i) { ctx.fillText(l, W / 2, cardY + padV + 56 + i * lineH); });
    ctx.fillStyle = C.gray; ctx.font = "300 38px " + FONT; spacing(3);
    ctx.fillText(current.autor, W / 2, cardY + padV + lines.length * lineH + 70); spacing(0);

    /* Rodapé: ícone em cinza */
    var logo = await logoImage(C.gray);
    if (logo) { var lh = 150, lw = lh * 1620 / 1676; ctx.drawImage(logo, (W - lw) / 2, 1650, lw, lh); }

    return new Promise(function (resolve) { cv.toBlob(resolve, "image/png"); });
  }

  async function share() {
    var btn = document.getElementById("btn-share");
    btn.disabled = true; status("Preparando a imagem...");
    try {
      var blob = await buildImage();
      var file = new File([blob], "meu-momento.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: "Meu momento" }); status("Escolha o Instagram para publicar."); }
        catch (e) { if (e && e.name === "AbortError") status(""); else download(blob); }
      } else { download(blob); }
    } catch (e) { status("Não foi possível gerar a imagem. Tente novamente."); }
    btn.disabled = false;
  }
  function download(blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "meu-momento.png";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    status("Imagem salva. Abra o Instagram e publique nos Stories.");
  }
  document.getElementById("btn-share").addEventListener("click", share);

  show(nextIndex());
})();
