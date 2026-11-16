/* Akış sahnesi: hareket azaltılmışsa döngüyü hiç oynatma (CSS poster'ı gösterir). */
(function () {
  "use strict";
  var v = document.querySelector(".akis-video");
  if (!v) return;
  var mq = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  function azalt() { return (mq && mq.matches) || document.documentElement.getAttribute("data-hareket") === "azalt"; }
  if (azalt()) { v.removeAttribute("autoplay"); v.pause(); }
})();
