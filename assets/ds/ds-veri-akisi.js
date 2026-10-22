(function () {
"use strict";
var kok = document.documentElement;
var mq = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
function azalt() { return (mq && mq.matches) || kok.getAttribute("data-hareket") === "azalt"; }
var SIMGE_DUR = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor"/></svg>';
var SIMGE_OYNA = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5l7 4.5-7 4.5z" fill="currentColor"/></svg>';
var SIMGE_TEKRAR = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6.5A4 4 0 1 1 8.6 3.2M9.6 1v2.6H7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
function etiket(b, simge, metin) { b.innerHTML = simge; b.appendChild(document.createTextNode(metin)); }
function hazirla(fig) {
var li = fig.querySelectorAll(".ds-veri-hat > li");
for (var i = 0; i < li.length; i++) {
li[i].style.setProperty("--ds-i", i);
if (i < li.length - 1) {
var p = document.createElement("span"); p.className = "ds-veri-paket"; p.setAttribute("aria-hidden", "true");
li[i].appendChild(p);
}
}
var sonKutu = li[li.length - 1].querySelector(".ds-veri-kutu");
var kutu = document.createElement("div"); kutu.className = "ds-oynat";
var etDur = fig.getAttribute("data-ds-etiket-duraklat") || "Duraklat";
var etSur = fig.getAttribute("data-ds-etiket-surdur") || "Sürdür";
var bDur = document.createElement("button"); bDur.type = "button"; etiket(bDur, SIMGE_DUR, etDur);
bDur.setAttribute("aria-pressed", "false"); bDur.disabled = true;
var bTek = document.createElement("button"); bTek.type = "button";
etiket(bTek, SIMGE_TEKRAR, fig.getAttribute("data-ds-etiket-tekrar") || "Tekrar oynat");
kutu.appendChild(bDur); kutu.appendChild(bTek); fig.appendChild(kutu);
function bitir() {
fig.classList.remove("ds-akiyor"); fig.removeAttribute("data-duraklat");
bDur.disabled = true; bDur.setAttribute("aria-pressed", "false"); etiket(bDur, SIMGE_DUR, etDur);
}
function oynat() {
bitir();
if (azalt()) return;
void fig.offsetWidth; // animasyonu baştan başlat
fig.classList.add("ds-akiyor"); bDur.disabled = false;
}
sonKutu.addEventListener("animationend", function () { if (fig.classList.contains("ds-akiyor")) bitir(); });
bDur.addEventListener("click", function () {
var dur = !fig.hasAttribute("data-duraklat");
if (dur) fig.setAttribute("data-duraklat", ""); else fig.removeAttribute("data-duraklat");
bDur.setAttribute("aria-pressed", String(dur)); etiket(bDur, dur ? SIMGE_OYNA : SIMGE_DUR, dur ? etSur : etDur);
});
bTek.addEventListener("click", oynat);
return { oynat: oynat, bitir: bitir, kutu: kutu };
}
function kur() {
var hepsi = document.querySelectorAll("[data-ds-veri]");
if (!hepsi.length) return;
var oy = [];
for (var i = 0; i < hepsi.length; i++) { oy.push(hazirla(hepsi[i])); hepsi[i]._dsVeri = oy[i]; }
var io = null;
if ("IntersectionObserver" in window && !azalt()) {
io = new IntersectionObserver(function (gs) {
gs.forEach(function (g) { if (g.isIntersecting) { g.target._dsVeri.oynat(); io.unobserve(g.target); } });
}, { threshold: 0.5 });
for (var j = 0; j < hepsi.length; j++) io.observe(hepsi[j]);
}
function kontrol() {
var k = azalt();
oy.forEach(function (o) { if (k) o.bitir(); o.kutu.hidden = k; });
if (k && io) { io.disconnect(); io = null; }
}
kontrol();
if (mq && mq.addEventListener) mq.addEventListener("change", kontrol);
new MutationObserver(kontrol).observe(kok, { attributes: true, attributeFilter: ["data-hareket"] });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
else kur();
})();
