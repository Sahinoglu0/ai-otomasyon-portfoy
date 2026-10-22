(function () {
"use strict";
var kok = document.documentElement;
var mq = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
function azalt() { return (mq && mq.matches) || kok.getAttribute("data-hareket") === "azalt"; }
if (!("IntersectionObserver" in window) || azalt()) return;
kok.classList.add("ds-reveal-hazir");
function ac(el) {
if (el.classList.contains("ds-gorundu")) return;
el.classList.add("ds-gorundu");
var son = el.getAttribute("data-ds-reveal") === "sira" ? el.children.length : 1;
setTimeout(function () { el.classList.add("ds-bitti"); }, 700 + son * 70);
}
function kur() {
var hepsi = document.querySelectorAll("[data-ds-reveal]");
var io = new IntersectionObserver(function (girdiler) {
girdiler.forEach(function (g) {
if (g.isIntersecting) { ac(g.target); io.unobserve(g.target); }
});
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
for (var i = 0; i < hepsi.length; i++) {
var el = hepsi[i];
if (el.getAttribute("data-ds-reveal") === "sira") {
for (var k = 0; k < el.children.length; k++) el.children[k].style.setProperty("--ds-i", Math.min(k, 8));
}
if (el.getBoundingClientRect().top < innerHeight * 0.92) ac(el);
else io.observe(el);
}
function hepsiniAc() { for (var j = 0; j < hepsi.length; j++) ac(hepsi[j]); io.disconnect(); }
if (mq && mq.addEventListener) mq.addEventListener("change", function () { if (mq.matches) hepsiniAc(); });
new MutationObserver(function () { if (azalt()) hepsiniAc(); })
.observe(kok, { attributes: true, attributeFilter: ["data-hareket"] });
window.addEventListener("hashchange", function () {
var h = location.hash && document.getElementById(location.hash.slice(1));
if (h) { var r = h.closest("[data-ds-reveal]") || h.querySelector("[data-ds-reveal]"); if (r) ac(r); }
});
window.addEventListener("beforeprint", hepsiniAc);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
else kur();
})();
