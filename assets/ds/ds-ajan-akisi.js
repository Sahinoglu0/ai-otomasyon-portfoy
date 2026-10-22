(function () {
"use strict";
var kok = document.documentElement;
var mq = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
function azalt() { return (mq && mq.matches) || kok.getAttribute("data-hareket") === "azalt"; }
var SIMGE_DUR = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor"/></svg>';
var SIMGE_OYNA = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5l7 4.5-7 4.5z" fill="currentColor"/></svg>';
var SIMGE_TEKRAR = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6.5A4 4 0 1 1 8.6 3.2M9.6 1v2.6H7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
var B = "bekliyor", A = "aktif", T = "bitti", R = "red";
var ADIMLAR = [
{ d: { planlayici: A, analist: B, denetci: B, onay: B }, r: [] },
{ d: { planlayici: T, analist: A, denetci: B, onay: B }, r: [] },
{ d: { planlayici: T, analist: T, denetci: R, onay: B }, r: ["red"], geri: true },
{ d: { planlayici: T, analist: A, denetci: B, onay: B }, r: ["red", "deneme2"], geri: true },
{ d: { planlayici: T, analist: T, denetci: A, onay: B }, r: ["red", "deneme2", "kabul"] },
{ d: { planlayici: T, analist: T, denetci: T, onay: A }, r: ["red", "deneme2", "kabul", "onay"] }
];
function Oynatici(el) {
this.el = el; this.i = -1; this.zaman = 0; this.durdu = false; this.bitti = true;
this.dugum = {}; var ds = el.querySelectorAll("[data-dugum]");
for (var k = 0; k < ds.length; k++) this.dugum[ds[k].getAttribute("data-dugum")] = ds[k];
this.rozet = el.querySelectorAll("[data-rozet]");
this.geri = el.querySelector(".ds-ajan-geri");
this.anlati = el.querySelectorAll(".ds-ajan-anlati > li");
this.sure = parseInt(getComputedStyle(kok).getPropertyValue("--sure-adim"), 10) || 650;
this.dugmeler();
}
Oynatici.prototype.dugmeler = function () {
var self = this, el = this.el, kutu = document.createElement("div");
kutu.className = "ds-oynat";
function dugme(simge, metin) {
var b = document.createElement("button"); b.type = "button";
b.innerHTML = simge; b.appendChild(document.createTextNode(metin)); kutu.appendChild(b); return b;
}
this.etDur = el.getAttribute("data-ds-etiket-duraklat") || "Duraklat";
this.etSur = el.getAttribute("data-ds-etiket-surdur") || "Sürdür";
this.bDur = dugme(SIMGE_DUR, this.etDur);
this.bDur.setAttribute("aria-pressed", "false");
this.bTekrar = dugme(SIMGE_TEKRAR, el.getAttribute("data-ds-etiket-tekrar") || "Tekrar oynat");
this.bDur.addEventListener("click", function () { self.durdu ? self.surdur() : self.duraklat(); });
this.bTekrar.addEventListener("click", function () { self.bastan(); });
this.bDur.disabled = true;
el.appendChild(kutu);
};
Oynatici.prototype.uygula = function (i) {
var a = ADIMLAR[i];
for (var ad in this.dugum) this.dugum[ad].setAttribute("data-durum", a.d[ad]);
for (var k = 0; k < this.rozet.length; k++)
this.rozet[k].classList.toggle("ds-gizli", a.r.indexOf(this.rozet[k].getAttribute("data-rozet")) < 0);
if (this.geri) { this.geri.classList.toggle("ds-gizli", !a.geri); this.geri.classList.toggle("ds-vurgu", i === 2); }
for (var n = 0; n < this.anlati.length; n++) {
if (n === i) this.anlati[n].setAttribute("aria-current", "step"); else this.anlati[n].removeAttribute("aria-current");
}
};
Oynatici.prototype.son = function () {
clearTimeout(this.zaman); this.bitti = true; this.durdu = false; this.i = -1;
for (var ad in this.dugum) this.dugum[ad].removeAttribute("data-durum");
for (var k = 0; k < this.rozet.length; k++) this.rozet[k].classList.remove("ds-gizli");
if (this.geri) this.geri.classList.remove("ds-gizli", "ds-vurgu");
for (var n = 0; n < this.anlati.length; n++) this.anlati[n].removeAttribute("aria-current");
this.el.removeAttribute("data-oynuyor");
this.bDur.disabled = true; this.bDur.setAttribute("aria-pressed", "false");
this.etiket(this.bDur, SIMGE_DUR, this.etDur);
};
Oynatici.prototype.ilerle = function () {
var self = this;
this.i++;
if (this.i >= ADIMLAR.length) { this.son(); return; }
this.uygula(this.i);
this.zaman = setTimeout(function () { self.ilerle(); }, this.sure);
};
Oynatici.prototype.bastan = function () {
clearTimeout(this.zaman);
if (azalt()) { this.son(); return; }
this.bitti = false; this.durdu = false; this.i = -1;
this.el.setAttribute("data-oynuyor", "");
this.bDur.disabled = false;
this.ilerle();
};
Oynatici.prototype.duraklat = function () {
if (this.bitti) return;
clearTimeout(this.zaman); this.durdu = true;
this.bDur.setAttribute("aria-pressed", "true"); this.etiket(this.bDur, SIMGE_OYNA, this.etSur);
};
Oynatici.prototype.surdur = function () {
var self = this;
this.durdu = false;
this.bDur.setAttribute("aria-pressed", "false"); this.etiket(this.bDur, SIMGE_DUR, this.etDur);
this.zaman = setTimeout(function () { self.ilerle(); }, this.sure / 2);
};
Oynatici.prototype.etiket = function (b, simge, metin) { b.innerHTML = simge; b.appendChild(document.createTextNode(metin)); };
function kur() {
var hepsi = document.querySelectorAll("[data-ds-ajan]");
if (!hepsi.length) return;
var oy = [];
for (var i = 0; i < hepsi.length; i++) { oy.push(new Oynatici(hepsi[i])); hepsi[i]._dsOynatici = oy[i]; }
var io = null;
if ("IntersectionObserver" in window && !azalt()) {
io = new IntersectionObserver(function (gs) {
gs.forEach(function (g) { if (g.isIntersecting) { g.target._dsOynatici.bastan(); io.unobserve(g.target); } });
}, { threshold: 0.5 });
for (var j = 0; j < hepsi.length; j++) io.observe(hepsi[j]);
}
function kontrol() {
var k = azalt();
oy.forEach(function (o) { if (k) o.son(); o.bDur.parentNode.hidden = k; });
if (k && io) { io.disconnect(); io = null; }
}
kontrol();
if (mq && mq.addEventListener) mq.addEventListener("change", kontrol);
new MutationObserver(kontrol).observe(kok, { attributes: true, attributeFilter: ["data-hareket"] });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
else kur();
})();
