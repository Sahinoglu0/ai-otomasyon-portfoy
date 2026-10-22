/* Test kanıtı sayfası. Sayılar sayilar.json'dan, katalog katalog.json'dan, paket paket.json'dan okunur;
   hiçbir sayı elle yazılmaz. katalog.json ve paket.json yoksa ilgili bölüm gizli kalır.
   Dil tercihi sitenin geri kalanıyla aynı anahtarı kullanır (localStorage "lang", ?lang=en). */
(() => {
  "use strict";

  const T = {
    dilTr: ["Türkçe", "Turkish"],
    dilEn: ["İngilizce", "English"],
    atla: ["İçeriğe geç", "Skip to content"],
    baslik: ["Test kanıtı", "Test evidence"],
    geri: ["Portföy", "Portfolio"],
    tema: ["Koyu / açık", "Dark / light"],
    temaEtiket: ["Temayı değiştir", "Toggle theme"],
    sayfaAciklama: ["Kaynak kod kapalı; bu sayfa kodu değil test çıktısını gösterir. Sayılar koşudan yazılan sayilar.json dosyasından okunur.",
      "Source code is closed; this page shows test output, not code. Numbers are read from sayilar.json, which is written by the test run."],
    durustBaslik: ["Kaynak kod kapalı; bu bölüm kodu değil çıktıyı gösterir.", "Source code is closed; this section shows output, not code."],
    durustModel: ["Gerçek model koşuları CI'da değil yerelde yapılır.", "Real model runs are done locally, not in CI."],
    yerelKosu: ["Test koşusu da yereldir: CI koşusu yok. Sayılar o koşunun çıktısından otomatik yazıldı.",
      "The test run is local too: there is no CI run. The numbers were written automatically from that run's output."],
    ciKosu: ["Test koşusu CI'da yapıldı; sayılar o koşunun çıktısından otomatik yazıldı.",
      "The test run was done in CI; the numbers were written automatically from that run's output."],
    lejantBaslik: ["Etiketler", "Labels"],
    rozetKosu: ["Koşudan çıktı", "Run output"],
    rozetKaset: ["Elle yazılmış kayıt (kaset)", "Hand-written tape"],
    lejantKosu: ["Testler gerçekten koşturuldu; sayı ve süre o koşunun çıktısından otomatik yazıldı.",
      "The tests were actually run; counts and duration were written automatically from that run's output."],
    lejantKaset: ["Model yanıtları önceden yazılmış bir kayıttan oynatıldı; model kalitesini ölçmez, yalnız akışın doğru işlediğini gösterir.",
      "Model replies were replayed from a pre-written record; it does not measure model quality, it only shows the flow works."],
    hata: ["Sayı dosyası okunamadı. Sayfayı yenileyin.", "The numbers file could not be read. Reload the page."],
    sayilarBaslik: ["Son test koşusu", "Latest test run"],
    toplam: ["test", "tests"],
    gecti: ["geçti", "passed"],
    basarisiz: ["başarısız", "failed"],
    atlandi: ["atlandı", "skipped"],
    tarih: ["Koşu tarihi", "Run date"],
    sure: ["Süre", "Duration"],
    surum: ["Sürüm", "Version"],
    ortam: ["Ortam", "Environment"],
    temiz: ["commit edilmiş kaynak", "committed source"],
    kirli: ["commit edilmemiş değişiklik içeren çalışma kopyası", "working copy with uncommitted changes"],
    sn: ["sn", "s"],
    dagilimBaslik: ["Alan başına dağılım", "Breakdown by area"],
    basarisizNot: ["Başarısız testler gizlenmez; düzeltilene kadar burada görünür.", "Failed tests are not hidden; they stay visible here until fixed."],
    kasetBaslik: ["Ajan eval skoru", "Agent eval score"],
    kasetMetin: ["Ajan orkestratörünün eval skoru elle yazılmış kayıttan oynatılır; model kalitesini ölçmez. Vakalar ve bilinen açık iz görüntüleyicinin Eval sekmesindedir.",
      "The agent orchestrator's eval score is replayed from a hand-written tape; it does not measure model quality. The cases and the known gap are on the trace viewer's Eval tab."],
    evalVaka: ["vaka", "cases"],
    evalOlcut: ["ölçüt ve kontrol geçti", "criteria and checks passed"],
    evalAcik: ["bilinen açık gözlendi (gizlenmez)", "known gap observed (not hidden)"],
    kasetBag: ["İz görüntüleyiciyi aç", "Open the trace viewer"],
    katalogBaslik: ["Test kataloğu", "Test catalogue"],
    katalogAlt: ["Her test, kod adı yerine sınadığı davranışla yazıldı. Ayrıca işaretlenmeyen satırlar koşudan çıktıdır.",
      "Each test is described by the behaviour it checks, not by its code name. Rows not marked otherwise are run output."],
    katalogOzet: ["alan", "areas"],
    katalogMd: ["Kataloğun tamamı tek dosya:", "The full catalogue as one file:"],
    katalogMdDosya: ["test-katalogu.tr.md", "test-katalogu.en.md"],
    katalogMdDiger: ["İngilizce: test-katalogu.en.md", "Turkish: test-katalogu.tr.md"],
    davranis: ["davranış", "behaviours"],
    paketBaslik: ["Kanıt paketi", "Evidence package"],
    olusturma: ["Oluşturma", "Created"],
    manifest: ["Manifest", "Manifest"],
    arsiv: ["Arşiv", "Archive"],
    uyumVar: ["Paket, yukarıdaki test koşusuyla aynı sürümden üretildi.", "The package was built from the same version as the test run above."],
    uyumYok: ["Dikkat: paketin sürümü yukarıdaki test koşusunun sürümünden farklı.", "Note: the package version differs from the test run version above."],
    dogrulaBaslik: ["Nasıl doğrulanır", "How to verify"],
    dogrulaHizli: ["Tek adımda (Linux / macOS / Git Bash): boş bir klasörde manifesti ve listelenen dosyaları indirip denetler.",
      "In one step (Linux / macOS / Git Bash): in an empty folder, downloads the manifest and the listed files, then checks them."],
    dogrulaElle: ["Dosyaları kendiniz indirdiyseniz yalnız denetim komutu:", "If you downloaded the files yourself, only the check command:"],
    dogrula2: ["Ya da dosyaları bu tarayıcıda indirip özetlerini manifestle karşılaştırın:", "Or download the files in this browser and compare their digests with the manifest:"],
    dogrulaBtn: ["Tarayıcıda doğrula", "Verify in browser"],
    dogrulaniyor: ["Doğrulanıyor…", "Verifying…"],
    dogrulaYok: ["Bu tarayıcı SHA-256 hesaplayamıyor (güvenli bağlantı gerekir). Yukarıdaki komutu kullanın.",
      "This browser cannot compute SHA-256 (a secure connection is required). Use the command above."],
    eslesti: ["eşleşti", "matches"],
    eslesmedi: ["eşleşmedi", "does not match"],
    okunamadi: ["okunamadı", "could not be read"],
    dogrulaOzet: ["dosya manifestle eşleşti", "files match the manifest"],
    altMetin: ["Bu sayfadaki sayılar elle yazılmaz; koşudan üretilen veri dosyasından okunur:",
      "The numbers on this page are not typed by hand; they are read from the data file produced by the run:"],
  };

  let lang = "tr";
  const t = (k) => (T[k] ? T[k][lang === "en" ? 1 : 0] : k);
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const nf = (n, d = 0) => new Intl.NumberFormat(lang === "en" ? "en-GB" : "tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
  const tarih = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return String(iso);
    return d.toLocaleString(lang === "en" ? "en-GB" : "tr-TR", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " UTC";
  };
  const ad = (o) => (lang === "en" ? o.ad_en : o.ad_tr) || o.kimlik || "";
  const metin = (o, kok) => (lang === "en" ? o[kok + "_en"] ?? o.en : o[kok + "_tr"] ?? o.tr) || "";

  const veri = { sayilar: null, katalog: null, paket: null, eval: null };

  async function oku(yol) {
    try {
      const r = await fetch(yol, { cache: "no-cache" });
      if (!r.ok) return null;
      return await r.json();
    } catch (_) { return null; }
  }

  // ---------- şema denetimi: beklenmeyen veri bölümü açmaz ----------
  const tamSayi = (v) => Number.isInteger(v) && v >= 0;
  const hex64 = (v) => typeof v === "string" && /^[0-9a-f]{64}$/.test(v);
  const guvenliYol = (v) => typeof v === "string" && /^[a-z0-9][a-z0-9._/-]*$/i.test(v) && !v.includes("..") && !v.includes("//");
  function sayilarGecerli(s) {
    return s && s.sema === "kanit-sayilar/1" && Array.isArray(s.kumeler) && s.kumeler.length > 0 &&
      s.kumeler.every((k) => tamSayi(k.toplam) && tamSayi(k.gecti) && tamSayi(k.basarisiz) && tamSayi(k.atlandi) && k.gecti + k.basarisiz + k.atlandi === k.toplam);
  }
  function katalogGecerli(k) {
    return k && k.sema === "kanit-katalog/1" && Array.isArray(k.alanlar) && k.alanlar.length > 0 &&
      k.alanlar.every((a) => Array.isArray(a.testler) && a.testler.length > 0 && a.testler.every((x) => x.tr && x.en));
  }
  function paketGecerli(p) {
    return p && p.sema === "kanit-paket/1" && guvenliYol(p.manifest) && Array.isArray(p.dosyalar) && p.dosyalar.length > 0 &&
      p.dosyalar.every((d) => guvenliYol(d.yol) && hex64(d.sha256)) && (!p.arsiv || (guvenliYol(p.arsiv.yol) && hex64(p.arsiv.sha256)));
  }

  function evalGecerli(e) {
    const o = e && e.ozet;
    return o && Array.isArray(e.vakalar) && e.vakalar.length > 0 && o.olcut_kontrol_kapsam && o.bilinen_acik &&
      tamSayi(o.olcut_kontrol_kapsam.gecen) && tamSayi(o.olcut_kontrol_kapsam.toplam) && tamSayi(o.bilinen_acik.gozlendi) && tamSayi(o.bilinen_acik.toplam);
  }

  function rozet(kaynak) {
    const kaset = kaynak === "kaset";
    return el("span", "tag " + (kaset ? "kaset" : "kosu"), t(kaset ? "rozetKaset" : "rozetKosu"));
  }
  function metaSatir(dl, k, v) { dl.append(el("dt", null, k), el("dd", null, v)); }

  // ---------- çizim ----------
  function cizSayilar() {
    const s = veri.sayilar;
    if (!s) return;
    const top = s.kumeler.reduce((a, k) => ({ toplam: a.toplam + k.toplam, gecti: a.gecti + k.gecti, basarisiz: a.basarisiz + k.basarisiz, atlandi: a.atlandi + k.atlandi }),
      { toplam: 0, gecti: 0, basarisiz: 0, atlandi: 0 });
    const ozet = $("#ozet");
    ozet.replaceChildren();
    for (const [k, cls] of [["toplam", ""], ["gecti", "ok"], ["basarisiz", top.basarisiz ? "bad" : ""], ["atlandi", top.atlandi ? "skip" : ""]]) {
      const d = el("div", "stat " + cls);
      d.append(el("b", null, nf(top[k])), el("span", null, t(k)));
      ozet.append(d);
    }
    const meta = $("#meta");
    meta.replaceChildren();
    metaSatir(meta, t("tarih"), tarih(s.kosu_tarihi_utc));
    metaSatir(meta, t("sure"), nf(s.sure_sn, 1) + " " + t("sn"));
    if (s.surum) metaSatir(meta, t("surum"), s.surum.git_sha_kisa + " · " + t(s.surum.kaynak_temiz ? "temiz" : "kirli"));
    if (s.ortam) metaSatir(meta, t("ortam"), Object.entries(s.ortam).map(([k, v]) => `${k === "python" ? "Python" : k === "node" ? "Node" : k} ${v}`).join(" · "));

    const kosuYeri = $("#kosuYeri");
    kosuYeri.textContent = t(s.kosu_yeri === "ci" ? "ciKosu" : "yerelKosu");
    kosuYeri.hidden = false;

    const kap = $("#kumeler");
    kap.replaceChildren();
    for (const k of s.kumeler) {
      const d = el("div", "kume");
      const ust = el("div", "kume-ust");
      ust.append(el("b", null, ad(k)), el("span", "mono", nf(k.toplam) + " " + t("toplam")));
      const cubuk = el("div", "cubuk");
      cubuk.setAttribute("aria-hidden", "true");
      for (const [n, c] of [[k.gecti, "g"], [k.basarisiz, "b"], [k.atlandi, "a"]]) {
        if (!n) continue;
        const i = el("i", c);
        i.style.width = (100 * n / k.toplam) + "%";
        cubuk.append(i);
      }
      const sy = el("div", "sayilar");
      sy.append(el("span", null, nf(k.gecti) + " " + t("gecti")));
      if (k.basarisiz) sy.append(el("span", "bad", nf(k.basarisiz) + " " + t("basarisiz")));
      if (k.atlandi) sy.append(el("span", null, nf(k.atlandi) + " " + t("atlandi")));
      sy.append(el("span", null, nf(k.sure_sn, 1) + " " + t("sn")));
      d.append(ust, cubuk, sy);
      if (k.atlandi && k.atlama_nedeni) d.append(el("p", "not", metin(k.atlama_nedeni, "")));
      if (k.basarisiz) d.append(el("p", "not", t("basarisizNot")));
      kap.append(d);
    }
    $("#b-sayilar").hidden = false;
    $("#b-dagilim").hidden = false;
  }

  // eval-sonuc.json yoksa ya da şemaya uymuyorsa sayı satırı gösterilmez; metin ve bağlantı kalır.
  function cizEval() {
    const e = veri.eval;
    const kap = $("#evalOzet");
    kap.replaceChildren();
    kap.hidden = !e;
    if (!e) return;
    const o = e.ozet;
    for (const [deger, k, cls] of [[nf(e.vakalar.length), "evalVaka", ""],
      [nf(o.olcut_kontrol_kapsam.gecen) + " / " + nf(o.olcut_kontrol_kapsam.toplam), "evalOlcut", "ok"],
      [nf(o.bilinen_acik.gozlendi) + " / " + nf(o.bilinen_acik.toplam), "evalAcik", "wait"]]) {
      const d = el("div", "stat " + cls);
      d.append(el("b", null, deger), el("span", null, t(k)));
      kap.append(d);
    }
  }

  function cizKatalog() {
    const k = veri.katalog;
    if (!k) return;
    $("#katalogAlt").textContent = t("katalogAlt") + " " + nf(k.alanlar.length) + " " + t("katalogOzet") + ", " +
      nf(k.alanlar.reduce((a, x) => a + x.testler.length, 0)) + " " + t("davranis") + ".";
    const md = $("#katalogMd");
    md.replaceChildren(t("katalogMd") + " ");
    const ma = el("a", "mono", t("katalogMdDosya")); ma.href = t("katalogMdDosya");
    const diger = lang === "en" ? "test-katalogu.tr.md" : "test-katalogu.en.md";
    const da = el("a", "mono", diger); da.href = diger;
    md.append(ma, " · ", da);
    const kap = $("#alanlar");
    const acik = new Set([...kap.querySelectorAll("details[open]")].map((d) => d.dataset.kimlik));
    kap.replaceChildren();
    for (const a of k.alanlar) {
      const d = el("details", "alan");
      d.dataset.kimlik = a.kimlik || "";
      if (acik.has(d.dataset.kimlik)) d.open = true;
      const s = el("summary");
      s.append(el("span", null, ad(a)), el("span", "mono muted", nf(a.testler.length) + " " + t("davranis")));
      const ul = el("ul");
      for (const x of a.testler) {
        const li = el("li", null, lang === "en" ? x.en : x.tr);
        if (x.kaynak === "kaset") { li.append(" "); li.append(rozet("kaset")); }
        ul.append(li);
      }
      d.append(s, ul);
      kap.append(d);
    }
    $("#b-katalog").hidden = false;
  }

  function bayt(n) {
    if (!tamSayi(n)) return "";
    if (n < 1024) return nf(n) + " B";
    if (n < 1048576) return nf(n / 1024, 1) + " KB";
    return nf(n / 1048576, 1) + " MB";
  }

  function cizPaket() {
    const p = veri.paket;
    if (!p) return;
    const meta = $("#paketMeta");
    meta.replaceChildren();
    if (p.olusturma_utc) metaSatir(meta, t("olusturma"), tarih(p.olusturma_utc));
    if (p.git_sha_kisa) metaSatir(meta, t("surum"), p.git_sha_kisa);
    const md = el("dd");
    const ma = el("a", null, p.manifest); ma.href = p.manifest;
    md.append(ma);
    meta.append(el("dt", null, t("manifest")), md);
    if (p.arsiv) {
      const ad2 = el("dd");
      const aa = el("a", null, p.arsiv.yol); aa.href = p.arsiv.yol; aa.setAttribute("download", "");
      ad2.append(aa, el("span", "muted", p.arsiv.bayt ? " · " + bayt(p.arsiv.bayt) : ""));
      meta.append(el("dt", null, t("arsiv")), ad2);
    }

    const uyum = $("#paketUyum");
    const sSha = veri.sayilar && veri.sayilar.surum && veri.sayilar.surum.git_sha_kisa;
    if (sSha && p.git_sha_kisa) {
      const ayni = sSha === p.git_sha_kisa;
      uyum.textContent = t(ayni ? "uyumVar" : "uyumYok");
      uyum.className = "not " + (ayni ? "durum-ok" : "durum-bad");
    } else uyum.textContent = "";

    const ul = $("#dosyalar");
    ul.replaceChildren();
    for (const d of p.dosyalar) {
      const li = el("li");
      li.dataset.yol = d.yol;
      const ust = el("div", "dosya-ust");
      const a = el("a", "mono", d.yol); a.href = d.yol;
      ust.append(a, rozet(d.kaynak));
      if (d.bayt) ust.append(el("span", "kucuk muted", bayt(d.bayt)));
      const sonuc = el("span", "kucuk dogrula-sonuc");
      ust.append(sonuc);
      li.append(ust);
      const acik = metin(d, "aciklama");
      if (acik) li.append(el("span", "kucuk", acik));
      li.append(el("span", "hash", "SHA-256 " + d.sha256));
      ul.append(li);
    }
    // tek adım: sayfanın kendi adresinden manifesti ve içindeki dosyaları indirip denetler
    const kok = new URL(".", location.href).href;
    $("#komutHizli").textContent = [
      "curl -fsSO " + kok + p.manifest + " &&",
      "awk '{print $2}' " + p.manifest + " | while read f; do curl -fsSO \"" + kok + "$f\"; done &&",
      "{ sha256sum -c " + p.manifest + " || shasum -a 256 -c " + p.manifest + "; }",
    ].join(" \\\n  ");
    $("#komutLinux").textContent = "sha256sum -c " + p.manifest;
    $("#komutMac").textContent = "shasum -a 256 -c " + p.manifest;
    $("#komutWin").textContent = "Get-Content " + p.manifest + " | ForEach-Object {\n  $h, $f = $_ -split '\\s+\\*?', 2\n  \"$f \" + ((Get-FileHash $f -Algorithm SHA256).Hash.ToLower() -eq $h)\n}";
    $("#b-paket").hidden = false;
  }

  async function tarayicidaDogrula() {
    const p = veri.paket;
    const sonuc = $("#dogrulaSonuc");
    if (!p) return;
    if (!(window.crypto && crypto.subtle)) { sonuc.textContent = t("dogrulaYok"); return; }
    sonuc.textContent = t("dogrulaniyor");
    let tamam = 0;
    for (const d of p.dosyalar) {
      const yer = [...document.querySelectorAll("#dosyalar li")].find((li) => li.dataset.yol === d.yol)?.querySelector(".dogrula-sonuc");
      let durum = "okunamadi";
      try {
        const r = await fetch(d.yol, { cache: "no-cache" });
        if (r.ok) {
          const h = await crypto.subtle.digest("SHA-256", await r.arrayBuffer());
          const hex = [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
          durum = hex === d.sha256 ? "eslesti" : "eslesmedi";
        }
      } catch (_) { /* okunamadı kalır */ }
      if (durum === "eslesti") tamam++;
      if (yer) { yer.textContent = t(durum); yer.className = "kucuk dogrula-sonuc " + (durum === "eslesti" ? "durum-ok" : "durum-bad"); yer.dataset.durum = durum; }
    }
    sonuc.textContent = nf(tamam) + " / " + nf(p.dosyalar.length) + " " + t("dogrulaOzet");
    sonuc.className = "not " + (tamam === p.dosyalar.length ? "durum-ok" : "durum-bad");
  }

  // ---------- dil ----------
  function cevirStatik() {
    for (const e of document.querySelectorAll("[data-i18n]")) e.textContent = t(e.dataset.i18n);
    for (const e of document.querySelectorAll("[data-i18n-attr]")) {
      for (const cift of e.dataset.i18nAttr.split(";")) { const [at, k] = cift.split(":"); e.setAttribute(at, t(k)); }
    }
    document.title = t("baslik");
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", t("sayfaAciklama"));
    document.documentElement.lang = lang;
  }
  function ciz() {
    cevirStatik();
    cizSayilar();
    cizEval();
    cizKatalog();
    cizPaket();
    const dg = $("#dogrulaSonuc"); if (dg) dg.textContent = "";
    for (const b of document.querySelectorAll("#lang-switch button")) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
      b.title = t(b.dataset.lang === "en" ? "dilEn" : "dilTr");
    }
  }
  function setLang(l) {
    lang = l === "en" ? "en" : "tr";
    try { localStorage.setItem("lang", lang); } catch (_) { /* depolama yoksa devam */ }
    ciz();
  }
  function ilkDil() {
    try { const p = new URLSearchParams(location.search).get("lang"); if (p === "en" || p === "tr") return p; } catch (_) { /* yok say */ }
    try { const s = localStorage.getItem("lang"); if (s === "en" || s === "tr") return s; } catch (_) { /* yok say */ }
    return (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";
  }
  // Dil düğmesi sitenin assets/i18n.js düğmesiyle aynı görünüm ve kimlikte.
  function dilDugmesi() {
    const st = document.createElement("style");
    st.textContent =
      "#lang-switch{position:fixed;right:12px;bottom:12px;z-index:9999;display:flex;border:1px solid var(--rule-strong);" +
      "border-radius:999px;overflow:hidden;background:var(--surface);box-shadow:0 1px 4px rgba(0,0,0,.18);font:600 12px/1 var(--mono)}" +
      "#lang-switch button{all:unset;cursor:pointer;padding:10px 14px;min-width:44px;text-align:center;color:var(--ink)}" +
      "#lang-switch button[aria-pressed=true]{background:var(--ink);color:var(--paper)}" +
      "#lang-switch button:focus-visible{outline:2px solid var(--accent);outline-offset:-4px}";
    document.head.append(st);
    const box = el("div");
    box.id = "lang-switch";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language");
    for (const [code, label] of [["tr", "TR"], ["en", "EN"]]) {
      const b = el("button", null, label);
      b.type = "button"; b.dataset.lang = code;
      b.addEventListener("click", () => setLang(code));
      box.append(b);
    }
    document.body.append(box);
  }

  async function init() {
    dilDugmesi();
    lang = ilkDil();
    cevirStatik();
    $("#tema").addEventListener("click", () => {
      const kok = document.documentElement;
      const koyu = kok.getAttribute("data-theme") === "dark" || (!kok.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
      kok.setAttribute("data-theme", koyu ? "light" : "dark");
    });
    $("#tarayiciDogrula").addEventListener("click", tarayicidaDogrula);
    const [s, k, p, e] = await Promise.all([oku("sayilar.json"), oku("katalog.json"), oku("paket.json"), oku("eval-sonuc.json")]);
    veri.eval = evalGecerli(e) ? e : null;
    veri.sayilar = sayilarGecerli(s) ? s : null;
    veri.katalog = katalogGecerli(k) ? k : null;
    veri.paket = paketGecerli(p) ? p : null;
    if (!veri.sayilar) $("#hata").hidden = false;
    ciz();
    document.documentElement.dataset.hazir = "1";
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
