/* Ana sayfa karar defteri: aktif satırı sırayla kaydırır. Hareket azaltılmışsa ya da JS yoksa liste durağan kalır (ilk satır .aktif). */
(function () {
  "use strict";
  var kok = document.documentElement;
  var mq = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  function azalt() { return (mq && mq.matches) || kok.getAttribute("data-hareket") === "azalt"; }
  var liste = document.querySelector("[data-defter]");
  if (!liste || azalt()) return;
  var satirlar = liste.children;
  var n = satirlar.length, at = 0, zamanlayici = null;
  function gecis() {
    satirlar[at].classList.remove("aktif");
    at = (at + 1) % n;
    satirlar[at].classList.add("aktif");
  }
  function baslat() { if (!zamanlayici && n > 1) zamanlayici = setInterval(gecis, 2600); }
  function durdur() { if (zamanlayici) { clearInterval(zamanlayici); zamanlayici = null; } }
  // Sekme arka plandayken döngü durur; geri gelince devam eder.
  document.addEventListener("visibilitychange", function () { if (document.hidden) durdur(); else baslat(); });
  if (mq && mq.addEventListener) mq.addEventListener("change", function () { if (azalt()) durdur(); else baslat(); });
  baslat();
})();
