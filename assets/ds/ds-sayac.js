(function () {
"use strict";
var kok = document.documentElement;
var mq = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
function azalt() { return (mq && mq.matches) || kok.getAttribute("data-hareket") === "azalt"; }
var SURE = 1100;
var SAYI = /-?\d+(?:[.,]\d+)?/;
function egri(t) { return 1 - Math.pow(1 - t, 3); }
function hazirla(el) {
if (el._ds) return el._ds;
var son = el.textContent.trim();
var m = son.match(SAYI);
if (!m) return null;
var ham = m[0], ayrac = ham.indexOf(",") > -1 ? "," : ".";
var ondalik = ham.split(/[.,]/)[1] || "";
var g = document.createElement("span");
g.setAttribute("aria-hidden", "true");
g.textContent = son;
var sr = document.createElement("span");
sr.className = "ds-sr";
sr.textContent = son;
el.textContent = "";
el.appendChild(g); el.appendChild(sr);
el.style.minWidth = son.length + "ch";
var alt = el.closest(".ds-sayi");
var cubuk = alt && alt.querySelector(".ds-alt i");
el._ds = {
g: g, cubuk: cubuk, on: son.slice(0, m.index), arka: son.slice(m.index + ham.length),
hedef: parseFloat(ham.replace(",", ".")), basamak: ondalik.length, ayrac: ayrac, son: son,
oran: cubuk ? parseFloat(cubuk.parentNode.getAttribute("data-oran") || "1") : 1, iz: 0
};
return el._ds;
}
function yaz(d, v) {
var s = v.toFixed(d.basamak);
if (d.ayrac === ",") s = s.replace(".", ",");
d.g.textContent = d.on + s + d.arka;
}
function oynat(el) {
var d = hazirla(el);
if (!d) return;
cancelAnimationFrame(d.iz);
if (azalt()) { d.g.textContent = d.son; if (d.cubuk) d.cubuk.style.setProperty("--ds-oran", d.oran); return; }
var bas = performance.now();
el.classList.add("ds-sayiyor");
(function adim(t) {
var p = Math.min(1, (t - bas) / SURE), e = egri(p);
yaz(d, d.hedef * e);
if (d.cubuk) d.cubuk.style.setProperty("--ds-oran", (d.oran * e).toFixed(4));
if (p < 1) d.iz = requestAnimationFrame(adim);
else { d.g.textContent = d.son; el.classList.remove("ds-sayiyor"); }
})(bas);
}
function kur() {
var hepsi = document.querySelectorAll("[data-ds-sayac]");
for (var i = 0; i < hepsi.length; i++) hazirla(hepsi[i]);
if (!azalt() && "IntersectionObserver" in window) {
var io = new IntersectionObserver(function (gs) {
gs.forEach(function (g) { if (g.isIntersecting) { oynat(g.target); io.unobserve(g.target); } });
}, { threshold: 0.4 });
for (var j = 0; j < hepsi.length; j++) io.observe(hepsi[j]);
}
var gruplar = document.querySelectorAll("[data-ds-sayac-grup]"), kutular = [];
for (var k = 0; k < gruplar.length; k++) (function (grup) {
var kutu = document.createElement("div");
kutu.className = "ds-oynat";
var b = document.createElement("button");
b.type = "button";
b.innerHTML = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6.5A4 4 0 1 1 8.6 3.2M9.6 1v2.6H7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
b.appendChild(document.createTextNode(grup.getAttribute("data-ds-etiket-tekrar") || "Tekrar oynat"));
b.addEventListener("click", function () {
var ic = grup.querySelectorAll("[data-ds-sayac]");
for (var n = 0; n < ic.length; n++) oynat(ic[n]);
});
kutu.appendChild(b);
grup.appendChild(kutu);
kutular.push(kutu);
})(gruplar[k]);
function kontrol() { for (var n = 0; n < kutular.length; n++) kutular[n].hidden = azalt(); }
kontrol();
if (mq && mq.addEventListener) mq.addEventListener("change", kontrol);
new MutationObserver(kontrol).observe(kok, { attributes: true, attributeFilter: ["data-hareket"] });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
else kur();
window.dsSayac = { oynat: oynat };
})();
