(function () {
"use strict";
var sayac = 0;
function kur1(kap) {
var paneller = [].slice.call(kap.querySelectorAll(":scope > .ds-sekme-panel"));
if (paneller.length < 2) return;
var no = ++sayac;
var liste = document.createElement("div");
liste.className = "ds-sekme-liste"; liste.setAttribute("role", "tablist");
if (kap.getAttribute("data-ds-etiket")) liste.setAttribute("aria-label", kap.getAttribute("data-ds-etiket"));
var cizgi = document.createElement("span"); cizgi.className = "ds-sekme-cizgi"; cizgi.setAttribute("aria-hidden", "true");
var sekmeler = paneller.map(function (p, i) {
var b = document.createElement("button");
var bas = p.querySelector(".ds-sekme-baslik");
b.type = "button"; b.setAttribute("role", "tab");
b.id = "ds-sekme-" + no + "-" + i; p.id = p.id || "ds-panel-" + no + "-" + i;
b.setAttribute("aria-controls", p.id);
b.textContent = (bas && bas.textContent.trim()) || p.getAttribute("data-baslik") || String(i + 1);
p.setAttribute("role", "tabpanel"); p.setAttribute("aria-labelledby", b.id); p.tabIndex = 0;
liste.appendChild(b);
return b;
});
liste.appendChild(cizgi);
kap.insertBefore(liste, paneller[0]);
var secili = -1;
function cizgiyiTasi() {
var b = sekmeler[secili];
if (!b) return;
cizgi.style.setProperty("--x", b.offsetLeft + "px");
cizgi.style.setProperty("--o", (b.offsetWidth / 100).toFixed(3));
}
function sec(i, odakla, ilk) {
if (i === secili) return;
secili = i;
sekmeler.forEach(function (b, k) {
var on = k === i;
b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1;
paneller[k].hidden = !on;
paneller[k].classList.remove("ds-giriyor");
});
if (!ilk) { void paneller[i].offsetWidth; paneller[i].classList.add("ds-giriyor"); }
cizgiyiTasi();
if (odakla) sekmeler[i].focus();
}
liste.addEventListener("click", function (e) {
var b = e.target.closest('[role="tab"]');
if (b) sec(sekmeler.indexOf(b), false);
});
liste.addEventListener("keydown", function (e) {
var n = sekmeler.length, i = secili;
if (e.key === "ArrowRight") i = (secili + 1) % n;
else if (e.key === "ArrowLeft") i = (secili - 1 + n) % n;
else if (e.key === "Home") i = 0;
else if (e.key === "End") i = n - 1;
else return;
e.preventDefault(); sec(i, true);
});
paneller.forEach(function (p) { p.addEventListener("animationend", function () { p.classList.remove("ds-giriyor"); }); });
var bas = Math.max(0, paneller.findIndex(function (p) { return p.hasAttribute("data-secili"); }));
sec(bas, false, true);
if ("ResizeObserver" in window) new ResizeObserver(cizgiyiTasi).observe(liste);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(cizgiyiTasi);
}
function kur() {
var hepsi = document.querySelectorAll("[data-ds-sekme]");
for (var i = 0; i < hepsi.length; i++) kur1(hepsi[i]);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
else kur();
})();
