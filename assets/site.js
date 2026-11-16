/* Comportamentos compartilhados: modo escuro (com memória) e ano do rodapé. */
(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");

  if (button) {
    button.addEventListener("click", function () {
      var isDark = root.classList.toggle("dark");
      button.setAttribute("aria-pressed", String(isDark));
      try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) {}
    });
    button.setAttribute("aria-pressed", String(root.classList.contains("dark")));
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
