/* Carrossel automático com gesto de deslizar, teclado e travas contra download. */
(function () {
  var root = document.querySelector("[data-gallery]");
  if (!root) return;

  var slides = [].slice.call(root.querySelectorAll(".slide"));
  var dots = [].slice.call(root.querySelectorAll(".gallery-dot"));
  var count = root.querySelector(".gallery-count");
  var stage = root.querySelector(".gallery-stage");
  var interval = 5000;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0, timer = null, paused = false;

  root.style.setProperty("--interval", interval + "ms");

  function show(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle("is-active", i === current); s.setAttribute("aria-hidden", i === current ? "false" : "true"); });
    dots.forEach(function (d, i) {
      d.classList.remove("is-active", "is-done");
      void d.offsetWidth;                       /* reinicia a animação da barra */
      if (i < current) d.classList.add("is-done");
      if (i === current) d.classList.add("is-active");
      d.setAttribute("aria-current", i === current ? "true" : "false");
    });
    if (count) count.textContent = (current + 1) + " / " + slides.length;
  }
  function stop() { clearTimeout(timer); }
  function schedule() {
    stop();
    if (paused || reduce || document.hidden) return;
    timer = setTimeout(function () { show(current + 1); schedule(); }, interval);
  }
  function go(n) { show(n); schedule(); }

  root.querySelector(".gallery-prev").addEventListener("click", function () { go(current - 1); });
  root.querySelector(".gallery-next").addEventListener("click", function () { go(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });

  /* Pausa ao passar o mouse ou tocar */
  function pause() { paused = true; root.classList.add("is-paused"); stop(); }
  function resume() { paused = false; root.classList.remove("is-paused"); schedule(); }
  root.addEventListener("mouseenter", pause);
  root.addEventListener("mouseleave", resume);
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : schedule(); });

  /* Deslizar no celular (e arrastar com o mouse) */
  var x0 = null;
  stage.addEventListener("pointerdown", function (e) { x0 = e.clientX; pause(); });
  stage.addEventListener("pointerup", function (e) {
    if (x0 !== null) { var dx = e.clientX - x0; if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1)); }
    x0 = null; resume();
  });
  stage.addEventListener("pointercancel", function () { x0 = null; resume(); });
  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") go(current - 1);
    if (e.key === "ArrowRight") go(current + 1);
  });

  /* Travas contra download: botão direito, arrastar, segurar (iOS/Android), atalhos de salvar e copiar */
  var block = function (e) { e.preventDefault(); };
  ["contextmenu", "dragstart", "selectstart", "copy"].forEach(function (ev) { root.addEventListener(ev, block); });
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "p" || k === "u")) e.preventDefault();
  });

  show(0);
  schedule();
})();
