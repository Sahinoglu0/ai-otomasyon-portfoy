(function () {
"use strict";
function kur() {
var bar = document.querySelector("[data-ds-ustbar]");
if (!bar) return;
var cizgi = bar.querySelector(".ds-ilerleme i");
var css = window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()");
var bekliyor = false;
function guncelle() {
bekliyor = false;
var y = window.scrollY || document.documentElement.scrollTop;
bar.classList.toggle("ds-kaydi", y > 4);
if (cizgi && !css) {
var max = document.documentElement.scrollHeight - innerHeight;
cizgi.style.setProperty("--ilerleme", max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
}
}
var baglar = [].slice.call(bar.querySelectorAll('nav a[href^="#"]'));
var hedef = baglar.map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1))); });
var etkin = -2;
function bolum() {
var cizgi = innerHeight * 0.35, ilk = -1;
for (var i = 0; i < hedef.length; i++) if (hedef[i] && hedef[i].getBoundingClientRect().top <= cizgi) ilk = i;
if (ilk === etkin) return;
etkin = ilk;
baglar.forEach(function (a, k) {
if (k !== ilk) { a.removeAttribute("aria-current"); return; }
a.setAttribute("aria-current", "true");
var nav = a.parentNode, sol = a.offsetLeft - nav.offsetLeft;
if (sol < nav.scrollLeft || sol + a.offsetWidth > nav.scrollLeft + nav.clientWidth) nav.scrollLeft = sol - 16;
});
}
window.addEventListener("scroll", function () {
if (!bekliyor) { bekliyor = true; requestAnimationFrame(function () { guncelle(); bolum(); }); }
}, { passive: true });
window.addEventListener("resize", function () { guncelle(); bolum(); });
guncelle(); bolum();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
else kur();
})();
