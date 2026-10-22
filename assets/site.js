/* Tema düğmesi: sistem temasının tersine geçer, seçim bu tarayıcıda saklanır (depolama yoksa yalnız bu açılış). */
(function () {
  "use strict";
  var kok = document.documentElement, ANAHTAR = "kule-sayfa-tema";
  try { var s = localStorage.getItem(ANAHTAR); if (s === "light" || s === "dark") kok.setAttribute("data-theme", s); } catch (e) { /* depolama yok */ }
  function koyuMu() {
    var t = kok.getAttribute("data-theme");
    return t ? t === "dark" : !!(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function kur() {
    var b = document.getElementById("tema");
    if (!b) return;
    function yaz() { b.setAttribute("aria-pressed", String(koyuMu())); }
    b.addEventListener("click", function () {
      var yeni = koyuMu() ? "light" : "dark";
      kok.setAttribute("data-theme", yeni);
      try { localStorage.setItem(ANAHTAR, yeni); } catch (e) { /* depolama yok */ }
      yaz();
    });
    yaz();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
  else kur();
})();
