/* Galeria vertical: aparição suave, botão de voltar ao topo e travas contra download. */
(function () {
  var root = document.documentElement;
  var feed = document.querySelector("[data-feed]");
  var toTop = document.getElementById("to-top");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Aparição das fotos ao rolar */
  if (feed && "IntersectionObserver" in window) {
    root.classList.add("has-js");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    [].forEach.call(feed.querySelectorAll(".shot"), function (s) { io.observe(s); });
  }

  /* Botão voltar ao topo: aparece depois de rolar a página */
  if (toTop) {
    var onScroll = function () { toTop.classList.toggle("is-shown", window.scrollY > 400); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  }

  /* Travas contra download: botão direito, arrastar, segurar no celular, selecionar, copiar e atalhos de salvar */
  if (feed) {
    var block = function (e) { e.preventDefault(); };
    ["contextmenu", "dragstart", "selectstart", "copy"].forEach(function (ev) { feed.addEventListener(ev, block); });
  }
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "p" || k === "u")) e.preventDefault();
  });
})();
