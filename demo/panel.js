/* Kule Pro demo paneli: statik örnek, sentetik veri, canlı API yok. Hesaplar hesap.js'te (KuleHesap). */
(function () {
  'use strict';
  var H = window.KuleHesap;

  var MODUL = [
    { id: 'stok', ad: 'Stok', ekran: 'stok' },
    { id: 'anomali', ad: 'Sipariş anomalisi', ekran: 'anomali' },
    { id: 'eslestirme', ad: 'Üçlü eşleştirme', ekran: 'eslestirme' },
    { id: 'tedarikci', ad: 'Tedarikçi puanı', ekran: 'tedarikci' },
    { id: 'talep', ad: 'Talep tahmini', ekran: 'talep' },
    { id: 'oee', ad: 'OEE', ekran: 'oee' }
  ];
  var TUM_ID = MODUL.map(function (m) { return m.id; }).concat(['aciklama']);
  var SEMA_SURUM = '1.1';

  var EKRANLAR = [
    { grup: 'Yönetim', liste: [
      { id: 'ozet', ad: 'Yönetici özeti', alt: 'Öncelikli aksiyonlar, parasal etki, risk sıralaması' },
      { id: 'roi', ad: 'ROI hesaplayıcı', alt: 'Kendi varsayımlarınızla yıllık tasarruf aralığı' },
      { id: 'senaryo', ad: 'Senaryo', alt: 'Eşik ve ağırlık simülasyonu · istemcide hesap' },
      { id: 'rapor', ad: 'Rapor', alt: 'Yazdırılabilir yönetici raporu' }
    ] },
    { grup: 'Modüller', liste: MODUL.map(function (m) { return { id: m.ekran, ad: m.ad, modul: m.id, alt: 'Modül çıktısı · önceden hesaplandı' }; }) },
  ];
  var EKRAN_DUZ = [];
  EKRANLAR.forEach(function (g) { g.liste.forEach(function (s) { EKRAN_DUZ.push(s); }); });

  var veri = {};
    var aktif = 'ozet';
  var durumSecim = 'Tümü';
  var urunSecim = null;

  var $ = function (id) { return document.getElementById(id); };
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function e(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }
  function sayi(n, ondalik) {
    if (n == null || isNaN(n)) return '—';
    return Number(n).toLocaleString('tr-TR', { maximumFractionDigits: ondalik == null ? 2 : ondalik });
  }
  function tl(n) { return (n == null || isNaN(n)) ? '—' : sayi(n, 0) + ' TL'; }
  // Büyük tutarlar için kısa yazım (1,2 mn TL); tam değer title'da.
  function tlKisa(n) {
    if (n == null || isNaN(n)) return '—';
    var a = Math.abs(n);
    if (a >= 1e6) return sayi(n / 1e6, 2) + ' mn TL';
    if (a >= 1e4) return sayi(n / 1e3, 0) + ' bin TL';
    return tl(n);
  }
  function yuzde(n, o) {
    if (n == null || isNaN(n)) return '—';
    return (n < 0 ? '-' : '') + '%' + Math.abs(Number(n)).toLocaleString('tr-TR', { maximumFractionDigits: o == null ? 1 : o });
  }
  function gun(n) { return (n == null || isNaN(n)) ? '—' : sayi(n, 1) + ' gün'; }
  function tarih(s) { var p = String(s || '').slice(0, 10).split('-'); return p.length === 3 ? p[2] + '.' + p[1] + '.' + p[0] : (s || '—'); }
  function kisaTarih(s) { var p = String(s || '').split('-'); return p.length === 3 ? p[2] + '.' + p[1] : (s || '—'); }
  function dizi(x) { return Array.isArray(x) ? x : []; }
  // "1.000.000", "1000000", "0,5" ve "0.5" kabul edilir; virgül varsa ondalıktır, binlik nokta atılır.
  function sayiOku(m) {
    var s = String(m).trim().replace(/\s/g, '');
    if (s.indexOf(',') !== -1) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^[1-9]\d{0,2}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    if (!/^\d+(\.\d+)?$/.test(s)) return null;
    return Number(s);
  }
  function sinir(n) { return Math.max(0, Math.min(100, Number(n) || 0)); }

  var ETIKET = { ORNEK_VERI: 'Örnek veri · sentetik', GERCEK_VERI: 'Gerçek veri' };
  var YONTEM = { kural_tabanli: 'Kural tabanlı', istatistiksel: 'İstatistiksel', sablon: 'Şablon özeti', dil_modeli: 'Dil modeli' };
  var DURUM_AD = { KRITIK: 'Kritik', OLU_STOK: 'Ölü stok', FAZLA_STOK: 'Fazla stok', NORMAL: 'Normal', YUKSEK: 'Yüksek', ORTA: 'Orta', DUSUK: 'Düşük' };
  var DURUM_SINIF = { KRITIK: 'bad', OLU_STOK: 'wait', FAZLA_STOK: 'wait', NORMAL: 'ok', YUKSEK: 'bad', ORTA: 'wait', DUSUK: 'ok',
    A: 'ok', B: 'ok', C: 'wait', D: 'bad' };
  var TUR_AD = { CIFT_KAYIT: 'Çift kayıt', FAZLA_TESLIMAT: 'Fazla teslimat', EKSIK_TESLIMAT: 'Eksik teslimat',
    ACIK_GECIKMIS: 'Açık ve gecikmiş', GEC_TESLIMAT: 'Geç teslimat', MALZEME_UYUSMAZLIGI: 'Malzeme uyuşmazlığı',
    SIPARISSIZ_KABUL: 'Siparişsiz kabul', IRSALIYESIZ_FATURA: 'İrsaliyesiz fatura', FAZLA_FATURA_MIKTAR: 'Fazla fatura miktarı',
    FIYAT_SAPMASI: 'Fiyat sapması', CIFT_FATURA: 'Çift fatura', SIPARISSIZ_FATURA: 'Siparişsiz fatura', FATURALANMAMIS_TESLIM: 'Faturalanmamış teslim' };
  var NEDEN_AD = { ARIZA: 'Arıza', AYAR: 'Ayar', MALZEME: 'Malzeme' };

  function tur(x) { return TUR_AD[x] || x || '—'; }
  function rozet(x, ad) { return '<span class="rozet ' + (DURUM_SINIF[x] || '') + '">' + e(ad || DURUM_AD[x] || x) + '</span>'; }
  function veriRozetHtml(z) { return '<span class="rozet cerceve">' + e(ETIKET[z.veri_etiketi] || z.veri_etiketi) + '</span>'; }
  function yontemRozet(z) {
    return '<span class="rozet">' + e(YONTEM[z.yontem.tur] || z.yontem.tur) + ' · ' + (z.yontem.llm_kullanildi ? 'LLM kullanıldı' : 'LLM yok') + '</span>';
  }
  var VARSAYIM_ROZET = '<span class="rozet varsayim">Varsayımsal · sentetik</span>';
  var SIM_ROZET = '<span class="rozet sim">Simülasyon · istemcide hesap</span>';
  var SENTETIK_ROZET = '<span class="rozet cerceve">Örnek veri · sentetik</span>';
  var LLM_YOK_ROZET = '<span class="rozet">Kural tabanlı · LLM yok</span>';
  function kpi(ad, deger, alt, sinif, baslik) {
    return '<div class="kpi' + (sinif ? ' ' + sinif : '') + '"' + (baslik ? ' title="' + e(baslik) + '"' : '') + '><span>' + e(ad) + '</span><b>' + deger + '</b>' +
      (alt ? '<small>' + alt + '</small>' : '') + '</div>';
  }
  // Önceki anlık görüntü gelene kadar trend yok; ok çizilmez (uydurma trend yok).
  var TREND_YOK = '<span class="trend yok" title="Karşılaştırılacak önceki anlık görüntü yok">— önceki dönem verisi yok</span>';
  function mini(oran) { return '<span class="mini-iz"><i style="--w:' + sinir(oran) + '"></i></span>'; }
  function bos(n) { return '<tr><td colspan="' + n + '">Satır yok</td></tr>'; }
  function tablo(basliklar, satirlar, bosN) {
    return '<div class="tablo-kap"><table class="tbl"><thead><tr>' + basliklar.map(function (b) {
      return '<th>' + b + '</th>';
    }).join('') + '</tr></thead><tbody>' + (satirlar || bos(bosN || basliklar.length)) + '</tbody></table></div>';
  }
  function sayfaBas(ust, baslik, aciklama, rozetler) {
    return '<div class="sayfa-bas"><div><span class="ust-etiket">' + e(ust) + '</span><h2>' + e(baslik) + '</h2>' +
      (aciklama ? '<p>' + aciklama + '</p>' : '') + '</div><div class="rozetler">' + (rozetler || '') + '</div></div>';
  }
  function eksikModul(ids) {
    var yok = ids.filter(function (i) { return !veri[i]; });
    return yok.length ? '<div class="uyari"><p>Yüklenmeyen modül: ' + e(yok.join(', ')) + '. İlgili sayılar yazılmadı.</p></div>' : '';
  }

  // ---- CSV indirme
  function indir(ad, metin, tip) {
    var blob = new Blob([metin], { type: tip || 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = ad;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  function aksiyonCsv() {
    return H.csv(['sira', 'alan', 'aksiyon', 'onem', 'parasal_etki_tl', 'etki_turu', 'neden', 'tedarikci', 'kaynak_modul', 'not', 'veri_etiketi'],
      H.aksiyonlar(veri).map(function (a) {
        return [a.sira, a.alan, a.baslik, a.onem, a.tutar_tl, a.tutar_tur || 'ölçülmedi', a.neden, a.sahip, a.kaynak, a.not, 'ORNEK_VERI'];
      }));
  }

  // =========================================================== Yönetici özeti
  function ozetMetrik() {
    var b = H.bulgular(veri);
    var tekil = b.reduce(function (s, x) { return s + (x.tutar_tl || 0); }, 0);
    var ham = (veri.anomali ? veri.anomali.ozet.tutar_etkisi_tl : 0) + (veri.eslestirme ? veri.eslestirme.ozet.tutar_etkisi_tl : 0);
    var stok = veri.stok, bagli = null, bagliPay = null, kritik = null, kritikAB = null;
    if (stok) {
      bagli = dizi(stok.kayitlar).filter(function (r) { return r.durum === 'FAZLA_STOK' || r.durum === 'OLU_STOK'; })
        .reduce(function (s, r) { return s + (r.stok_degeri_tl || 0); }, 0);
      bagliPay = H.fazlaPayOrnek(stok);
      kritik = stok.ozet.kritik;
      kritikAB = dizi(stok.kayitlar).filter(function (r) { return r.durum === 'KRITIK' && r.abc !== 'C'; }).length;
    }
    var dTed = veri.tedarikci ? dizi(veri.tedarikci.kayitlar).filter(function (r) { return r.seviye === 'D'; }) : null;
    return { bulgu: b, tekil: tekil, ham: ham, bagli: bagli, bagliPay: bagliPay, kritik: kritik, kritikAB: kritikAB, dTed: dTed };
  }

  function aksiyonLi(a) {
    var para = a.tutar_tl != null
      ? '<span class="para">' + tl(a.tutar_tl) + '<small>' + e(a.tutar_tur) + '</small></span>'
      : '<span class="para yok">Parasal etki ölçülmedi</span>';
    return '<li class="aksiyon"><span class="aksiyon-no" aria-hidden="true">' + a.sira + '</span>' +
      '<div class="aksiyon-bas"><b>' + e(a.baslik) + '</b>' + para + '</div>' +
      '<p>' + e(a.neden) + '</p>' +
      '<div class="meta">' + rozet(a.onem, 'Önem: ' + DURUM_AD[a.onem]) + '<span class="rozet">' + e(a.alan) + '</span>' +
      (a.sahip ? '<span class="rozet cerceve">' + e(a.sahip) + '</span>' : '') +
      (a.not ? '<span class="kucuk-metin">' + e(a.not) + '</span>' : '') + '</div></li>';
  }

  function riskTablo(r) {
    var ISARET = { YUKSEK: ['bad', '!'], ORTA: ['wait', '~'], DUSUK: ['ok', '✓'] };
    return '<ol class="aksiyonlar">' + r.map(function (x, i) {
      var is = ISARET[x.seviye];
      return '<li class="aksiyon" style="grid-template-columns:32px minmax(0,1fr)"><span class="risk-isaret ' + is[0] + '" aria-hidden="true">' + (i + 1) + '</span>' +
        '<div class="aksiyon-bas"><b>' + e(x.alan) + '</b>' + rozet(x.seviye, 'Risk: ' + DURUM_AD[x.seviye]) + '</div>' +
        '<p>' + e(x.gosterge) + (x.yuksek ? ' · yüksek: ' + x.yuksek : '') +
        (x.tutar_tl ? ' · ' + tl(x.tutar_tl) + (x.tutar_tur ? ' ' + e(x.tutar_tur) : ' etki') : '') + '</p></li>';
    }).join('') + '</ol>';
  }

  function ozetEkrani() {
    var m = ozetMetrik();
    var aks = H.aksiyonlar(veri);
    var risk = H.riskler(veri);
    var ilk5 = aks.slice(0, 5), kalan = aks.slice(5);
    var uretilme = veri.stok ? veri.stok.uretilme : null;
    var roi = H.roi(roiGirdi());

    var kpiler = '<div class="kpis">' +
      kpi('Tespit edilen tutar etkisi', tlKisa(m.tekil), m.bulgu.length + ' sipariş kalemi · ham toplam ' + tlKisa(m.ham) + ' tekilleştirildi<br>' + TREND_YOK, 'vurgu buyuk', tl(m.tekil)) +
      kpi('Bağlı sermaye', tlKisa(m.bagli), (m.bagliPay != null ? yuzde(m.bagliPay) + ' stok değeri fazla veya ölü' : '') + '<br>' + TREND_YOK, 'buyuk', tl(m.bagli)) +
      kpi('Kritik stok kalemi', sayi(m.kritik), (m.kritikAB != null ? m.kritikAB + ' tanesi A/B sınıfı' : '') + '<br>' + TREND_YOK, 'buyuk') +
      kpi('D seviyesi tedarikçi', m.dTed ? sayi(m.dTed.length) : '—', m.dTed ? e(m.dTed.map(function (r) { return r.tedarikci; }).join(', ')) + '<br>' + TREND_YOK : '', 'buyuk') +
      '</div>';

    var yon = veri.talep ? H.tahminYonu(veri.talep) : [];
    var yonSatir = yon.map(function (y) {
      var ok = y.yon > 0 ? '<span class="yukari" aria-label="artış">▲</span>' : (y.yon < 0 ? '<span class="asagi" aria-label="azalış">▼</span>' : '<span class="notr" aria-label="yatay">▶</span>');
      return '<tr><td>' + e(y.urun_no) + '</td><td>' + sayi(y.ilk, 0) + '</td><td>' + sayi(y.son, 0) + '</td><td>' + ok + ' ' + yuzde(y.degisim_pct) + '</td></tr>';
    }).join('');

    return sayfaBas('Yönetim', 'Yönetici özeti',
      'Yedi modülün çıktısından tek bakışta: nereden para kaçıyor, neyi önce yapmalı, risk nerede. ' +
      (uretilme ? 'Çıktı tarihi ' + e(tarih(uretilme)) + '.' : ''),
      SENTETIK_ROZET + LLM_YOK_ROZET) +
      eksikModul(TUM_ID.filter(function (i) { return i !== 'aciklama'; })) +
      kpiler +
      '<div class="izgara uc-bir">' +
        '<section class="kart" aria-labelledby="aksBas"><div class="kart-bas"><h3 id="aksBas">Öncelikli 5 aksiyon</h3>' +
          '<button class="btn kucuk hayalet yalniz-ekran" type="button" data-act="aksiyon-csv">CSV indir</button>' +
          '<p class="alt-yazi">Sıra kuralı: önem, sonra etki türü (doğrudan para kaybı, bağlı sermaye, ölçülmedi), sonra tutar.</p></div>' +
          (ilk5.length ? '<ol class="aksiyonlar">' + ilk5.map(aksiyonLi).join('') + '</ol>' : '<p>Aksiyon yok.</p>') +
          (kalan.length ? '<details class="mt"><summary class="btn kucuk hayalet">Diğer ' + kalan.length + ' aksiyon</summary><ol class="aksiyonlar">' +
            kalan.map(aksiyonLi).join('') + '</ol></details>' : '') +
        '</section>' +
        '<div>' +
          '<section class="kart" aria-labelledby="riskBas"><div class="kart-bas"><h3 id="riskBas">Risk sıralaması</h3>' +
            '<p class="alt-yazi">Seviye kuralı: yüksek önemli bulgu, D seviyesi tedarikçi, %60 altı OEE ya da A sınıfı kritik kalem → yüksek. Eşikler varsayımdır.</p></div>' +
            riskTablo(risk) + '</section>' +
          '<section class="kart" aria-labelledby="roiBas"><div class="kart-bas"><h3 id="roiBas">Size ne kazandırır?</h3>' + VARSAYIM_ROZET + '</div>' +
            '<div class="roi-sonuc"><div class="buyuk">' + tlKisa(roi.alt) + ' <span>–</span> ' + tlKisa(roi.ust) + '</div>' +
            '<p class="kucuk-metin">Yıllık brüt tasarruf aralığı, şu anki ROI girdileriyle. Rakamlar sizin varsayımınızdır; ' +
            'ölçülmüş sonuç değildir.</p><button class="btn birincil" type="button" data-git="roi">Kendi rakamlarımla hesapla</button></div></section>' +
        '</div>' +
      '</div>' +
      '<div class="izgara iki">' +
        '<section class="kart"><div class="kart-bas"><h3>Talep tahmini yönü · 8 hafta</h3><span class="rozet info">Tahmin · gerçekleşme değil</span>' +
          '<p class="alt-yazi">İlk ve son tahmin haftası karşılaştırılır; ±%2 içi yatay sayılır. Geçmiş dönem trendi değildir.</p></div>' +
          tablo(['Ürün', '1. hafta', '8. hafta', 'Yön'], yonSatir) + '</section>' +
        '<section class="kart"><div class="kart-bas"><h3>Modül özeti</h3>' +
          (veri.aciklama ? '<span class="rozet wait">Şablon özeti · anahtarsız</span>' : '') + '</div>' +
          (veri.aciklama ? '<ul class="aksiyonlar">' + dizi(veri.aciklama.kayitlar).map(function (r) {
            var mm = MODUL.filter(function (x) { return x.id === r.konu; })[0];
            return '<li class="aksiyon" style="grid-template-columns:minmax(0,1fr)"><div class="aksiyon-bas"><b>' + e(mm ? mm.ad : r.konu) + '</b>' +
              (mm ? '<button class="btn kucuk hayalet" type="button" data-git="' + mm.ekran + '">Aç</button>' : '') + '</div><p>' + e(r.cumle) + '</p></li>';
          }).join('') + '</ul>' : '<p>Özet metni yok.</p>') + '</section>' +
      '</div>';
  }

  // =========================================================== ROI
  var ROI_ANAHTAR = 'kule-demo-roi-v1';
  var GUVEN_AD = { ikincil: 'Kaynaklı (ikincil)', kullanici: 'Kaynak yok · kendi değerinizi girin',
    ornek: 'Örnek değer · şirketinize göre girin', veri: 'Örnek veriden (sentetik)' };
  function guvenSayim() {
    var s = { ikincil: 0, kullanici: 0, ornek: 0, veri: 0 };
    Object.keys(H.ROI_VARSAYIM).forEach(function (k) { s[H.ROI_VARSAYIM[k].guven]++; });
    return s;
  }
  var ROI_GRUPLAR = [
    { ad: 'Stok taşıma maliyeti', alanlar: ['stok_degeri_tl', 'fazla_pay_pct', 'azaltma_pct', 'tasima_pct'] },
    { ad: 'Fatura kaçağı', alanlar: ['satinalma_tl', 'kacak_pct', 'yakalama_pct'] },
    { ad: 'Gecikme ve stoksuzluk', alanlar: ['gecikme_olay', 'olay_maliyet_tl', 'onlenen_pct'] },
    { ad: 'Plansız duruş', alanlar: ['durus_saat', 'durus_deger_tl', 'durus_azalma_pct'] },
    { ad: 'Elle kontrol emeği', alanlar: ['vaka_ay', 'vaka_dk', 'kisalan_pct', 'saat_tl'] },
    { ad: 'Maliyet', alanlar: ['yillik_maliyet_tl'] }
  ];
  var roiDeger = null;

  function roiVarsayilan() {
    var g = {};
    Object.keys(H.ROI_VARSAYIM).forEach(function (k) {
      var v = H.ROI_VARSAYIM[k];
      g[k] = ('alt' in v) ? { alt: v.alt, ust: v.ust } : v.deger;
    });
    var p = H.fazlaPayOrnek(veri.stok);
    g.fazla_pay_pct = p == null ? 20 : Math.round(p * 10) / 10;
    return g;
  }
  function roiGirdi() {
    if (roiDeger) return roiDeger;
    var g = roiVarsayilan();
    try {
      var kayit = JSON.parse(localStorage.getItem(ROI_ANAHTAR) || 'null');
      if (kayit && typeof kayit === 'object') Object.keys(g).forEach(function (k) { if (k in kayit) g[k] = kayit[k]; });
    } catch (err) { /* depolama yoksa varsayılan */ }
    roiDeger = g;
    return g;
  }
  function roiKaydet() { try { localStorage.setItem(ROI_ANAHTAR, JSON.stringify(roiDeger)); } catch (err) { /* sessiz */ } }

  function roiAlan(k) {
    var v = H.ROI_VARSAYIM[k], g = roiGirdi();
    var kaynak = '<b class="guven-' + v.guven + '">' + e(GUVEN_AD[v.guven]) + '</b>' + (v.kaynak ? ' · ' + e(v.kaynak) : '');
    var id = 'roi-' + k;
    function kutu(uc, deger) {
      return '<div class="girdi"><input id="' + id + (uc ? '-' + uc : '') + '" inputmode="decimal" data-roi="' + k + '"' + (uc ? ' data-uc="' + uc + '"' : '') +
        ' value="' + e(sayi(deger, 4)) + '"' + (uc ? ' aria-label="' + e(v.ad) + (uc === 'alt' ? ' alt' : ' üst') + ' değer, ' + e(v.birim) + '"' : '') + '>' +
        (uc ? '' : '<span class="birim">' + e(v.birim) + '</span>') + '</div>';
    }
    if ('alt' in v) {
      return '<div class="alan varsayim"><span class="etiket" id="' + id + '-e">' + e(v.ad) + ' <span class="kucuk-metin">(' + e(v.birim) + ')</span></span>' +
        '<div class="aralik-girdi" role="group" aria-labelledby="' + id + '-e"><span>alt</span>' + kutu('alt', g[k].alt) +
        '<span>üst</span>' + kutu('ust', g[k].ust) + '</div><small>' + kaynak + '</small></div>';
    }
    return '<div class="alan varsayim"><label for="' + id + '">' + e(v.ad) + '</label>' + kutu(null, g[k]) +
      '<small>' + kaynak + (k === 'fazla_pay_pct' ? ' · örnek veride ' + yuzde(H.fazlaPayOrnek(veri.stok)) : '') + '</small></div>';
  }

  function roiSonucHtml() {
    var g = roiGirdi(), r = H.roi(g);
    var enUst = Math.max.apply(null, [1].concat(r.kalemler.map(function (k) { return k.ust; })));
    var bar = r.kalemler.map(function (k) {
      return '<li><span>' + e(k.ad) + '</span><b>' + tlKisa(k.alt) + ' – ' + tlKisa(k.ust) + '</b>' +
        '<span class="iz aralik" aria-hidden="true"><i style="--a:' + (k.alt / enUst * 100).toFixed(1) + ';--b:' + Math.max(k.alt / enUst * 100 + 1, k.ust / enUst * 100).toFixed(1) + '"></i></span></li>';
    }).join('');
    function n(x) { return sayi(x, 2); }
    function a(k, uc) { return n(g[k][uc]) + '%'; }
    var dokum = [
      ['stok', 'Stok', n(g.stok_degeri_tl) + ' × ' + n(g.fazla_pay_pct) + '% × ' + a('azaltma_pct', 'alt') + '…' + a('azaltma_pct', 'ust') + ' × ' + a('tasima_pct', 'alt') + '…' + a('tasima_pct', 'ust')],
      ['fatura', 'Fatura', n(g.satinalma_tl) + ' × ' + a('kacak_pct', 'alt') + '…' + a('kacak_pct', 'ust') + ' × ' + a('yakalama_pct', 'alt') + '…' + a('yakalama_pct', 'ust')],
      ['gecikme', 'Gecikme', n(g.gecikme_olay) + ' × ' + n(g.olay_maliyet_tl) + ' × ' + a('onlenen_pct', 'alt') + '…' + a('onlenen_pct', 'ust')],
      ['durus', 'Duruş', n(g.durus_saat) + ' × ' + n(g.durus_deger_tl) + ' × ' + a('durus_azalma_pct', 'alt') + '…' + a('durus_azalma_pct', 'ust')],
      ['emek', 'Emek', n(g.vaka_ay) + ' × 12 × ' + n(g.vaka_dk) + '/60 × ' + a('kisalan_pct', 'alt') + '…' + a('kisalan_pct', 'ust') + ' × ' + n(g.saat_tl)]
    ].map(function (d) {
      var k = r.kalemler.filter(function (x) { return x.id === d[0]; })[0];
      return '<tr><td>' + d[1] + '</td><td class="l mono">' + e(d[2]) + '</td><td>' + tl(k.alt) + '</td><td>' + tl(k.ust) + '</td></tr>';
    }).join('');
    function ay(x) { return x == null ? '—' : sayi(x, 1) + ' ay'; }
    return '<div class="roi-sonuc"><span class="ust-etiket">Yıllık brüt tasarruf</span>' +
      '<div class="buyuk" id="roiToplam">' + tlKisa(r.alt) + ' <span>–</span> ' + tlKisa(r.ust) + '</div>' +
      '<div class="karsi"><div><span>Net (maliyet sonrası)</span><b>' + tlKisa(r.net_alt) + ' – ' + tlKisa(r.net_ust) + '</b></div>' +
      '<div><span>Geri ödeme</span><b>' + ay(r.geri_odeme_ay_alt) + ' – ' + ay(r.geri_odeme_ay_ust) + '</b></div>' +
      '<div><span>Yıllık maliyet</span><b>' + tlKisa(r.maliyet) + '</b></div></div>' +
      '<ul class="cubuklar mt">' + bar + '</ul></div>' +
      '<details class="mt" open><summary class="kucuk-metin" style="cursor:pointer;min-height:32px">Hesap dökümü (elle kontrol için)</summary>' +
      tablo(['Kalem', 'Formül, sizin girdilerinizle', 'Alt', 'Üst'], dokum) +
      '<p class="not">Alt uç bütün oranların alt değeriyle, üst uç üst değeriyle hesaplanır. Kalemler bağımsız varsayılır; çakışma düşülmez.</p></details>';
  }

  function ornekGirdiler() {
    var g = roiGirdi();
    return Object.keys(H.ROI_VARSAYIM).filter(function (k) { return H.ROI_VARSAYIM[k].guven === 'ornek'; })
      .map(function (k) { var v = H.ROI_VARSAYIM[k]; return v.ad.toLowerCase() + ' ' + sayi(g[k], 0) + ' ' + v.birim; });
  }

  function roiEkrani() {
    var gs = guvenSayim();
    return sayfaBas('Yönetim', 'ROI hesaplayıcı',
      'Kendi şirketinizin rakamlarını girin; kule\'nin beş tasarruf kolunda yıllık aralık hesaplanır. Hesap tarayıcıda yapılır, hiçbir yere gönderilmez.',
      VARSAYIM_ROZET) +
      '<div class="uyari"><p><b>Tüm girdiler varsayımsaldır; sonuç ölçüm değil, varsayımlarınızın sonucudur.</b></p>' +
      '<p>' + gs.ikincil + ' oran ikincil kaynaklardan (satıcı blogları üzerinden; birincil rapor açılmadı), ' +
      gs.kullanici + ' girdi için kaynak bulunamadı, ' + (gs.ornek + gs.veri) + ' girdi şirket büyüklüğü ya da örnek veridir. ' +
      'Kule’nin gerçek veride yakalama oranı ölçülmedi.</p>' +
      '<p><b>Örnek girdiler</b> (şirketinize göre girin): ' + ornekGirdiler().join(' · ') + '. ' +
      'Beş tasarruf kolunun her biri bu değerlerden en az birini çarpan olarak kullanır; birini sıfır girerseniz o kol sıfırlanır.</p></div>' +
      '<div class="izgara bir-iki">' +
        '<form class="kart" id="roiForm" novalidate onsubmit="return false">' +
          ROI_GRUPLAR.map(function (gr) {
            return '<fieldset class="mt"><legend>' + e(gr.ad) + '</legend><div class="alanlar">' + gr.alanlar.map(roiAlan).join('') + '</div></fieldset>';
          }).join('<hr class="ayirici">') +
          '<div class="esnek mt"><button class="btn hayalet" type="button" data-act="roi-sifirla">Varsayılanlara dön</button></div>' +
        '</form>' +
        '<section class="kart" aria-live="polite" aria-labelledby="roiSonBas"><div class="kart-bas"><h3 id="roiSonBas">Sonuç</h3>' +
          '<button class="btn kucuk hayalet" type="button" data-act="roi-csv">CSV indir</button></div><div id="roiSonuc">' + roiSonucHtml() + '</div></section>' +
      '</div>';
  }

  function roiCsv() {
    var g = roiGirdi(), r = H.roi(g), satir = [];
    Object.keys(H.ROI_VARSAYIM).forEach(function (k) {
      var v = H.ROI_VARSAYIM[k], d = g[k];
      satir.push(['girdi', v.ad, v.birim, typeof d === 'object' ? d.alt : d, typeof d === 'object' ? d.ust : d, GUVEN_AD[v.guven] + (v.kaynak ? ' · ' + v.kaynak : '')]);
    });
    r.kalemler.forEach(function (k) { satir.push(['sonuc', k.ad + ' (' + k.formul + ')', 'TL/yıl', k.alt, k.ust, 'hesap']); });
    satir.push(['sonuc', 'Toplam brüt', 'TL/yıl', r.alt, r.ust, 'hesap']);
    satir.push(['sonuc', 'Net', 'TL/yıl', r.net_alt, r.net_ust, 'hesap']);
    satir.push(['sonuc', 'Geri ödeme', 'ay', r.geri_odeme_ay_alt, r.geri_odeme_ay_ust, 'hesap']);
    return H.csv(['tur', 'ad', 'birim', 'alt', 'ust', 'kaynak'], satir.concat([['not', 'VARSAYIMSAL - sentetik; ölçüm değildir', '', '', '', '']]));
  }

  // =========================================================== Senaryo
  var sen = null;
  function senSifirla() {
    sen = { agirlik: { teslim: H.AGIRLIK_VARSAYILAN.teslim, kalite: H.AGIRLIK_VARSAYILAN.kalite, fiyat: H.AGIRLIK_VARSAYILAN.fiyat },
      kritik: H.STOK_KRITIK_GUN, fazla: H.STOK_FAZLA_GUN, cikan: '' };
  }
  senSifirla();

  function kaydirici(id, ad, deger, min, max, cikti) {
    return '<div class="kaydirici"><label for="' + id + '">' + e(ad) + '</label><output for="' + id + '" id="' + id + '-o">' + cikti + '</output>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="1" value="' + deger + '" data-sen="' + id + '"></div>';
  }
  function fark(once, sonra, ondalik, ters, bicim) {
    var d = sonra - once, f = bicim || function (x) { return sayi(x, ondalik); };
    if (Math.abs(d) < Math.pow(10, -(ondalik || 0)) / 2) return '<small class="notr">değişmedi</small>';
    var iyi = ters ? d < 0 : d > 0;
    return '<small class="' + (iyi ? 'yukari' : 'asagi') + '">' + (d > 0 ? '▲ +' : '▼ ') + f(d) + '</small>';
  }

  function senTedarikciHtml() {
    var t = veri.tedarikci;
    if (!t) return '<p>Tedarikçi verisi yok.</p>';
    var w = sen.agirlik, top = w.teslim + w.kalite + w.fiyat || 1;
    var s = H.tedarikciSenaryo(t.kayitlar, w);
    var satir = s.map(function (r) {
      var degisti = r.seviye !== r.temel_seviye || r.sira !== r.temel_sira;
      var siraFark = r.temel_sira - r.sira;
      return '<tr' + (degisti ? ' class="degisti"' : '') + '><td>' + e(r.tedarikci) + '</td><td>' + r.temel_sira + ' → <b>' + r.sira + '</b>' +
        (siraFark ? ' <small class="' + (siraFark > 0 ? 'yukari' : 'asagi') + '">' + (siraFark > 0 ? '▲' : '▼') + Math.abs(siraFark) + '</small>' : '') + '</td>' +
        '<td>' + sayi(r.temel_skor, 1) + ' ' + rozet(r.temel_seviye) + '</td><td>' + mini(r.skor) + '<b>' + sayi(r.skor, 1) + '</b> ' + rozet(r.seviye) + '</td></tr>';
    }).join('');
    return '<p class="kucuk-metin">Normalize ağırlık: teslim ' + yuzde(w.teslim / top * 100, 0) + ' · kalite ' + yuzde(w.kalite / top * 100, 0) +
      ' · fiyat ' + yuzde(w.fiyat / top * 100, 0) + '</p>' +
      tablo(['Tedarikçi', 'Sıra', 'Temel skor', 'Senaryo skoru'], satir);
  }

  function senStokHtml() {
    var st = veri.stok;
    if (!st) return '<p>Stok verisi yok.</p>';
    var temel = H.stokSenaryo(st.kayitlar, H.STOK_KRITIK_GUN, H.STOK_FAZLA_GUN);
    var s = H.stokSenaryo(st.kayitlar, sen.kritik, sen.fazla);
    var deg = s.degisen.map(function (d) {
      return '<tr class="degisti"><td>' + e(d.malzeme_no) + '</td><td>' + e(d.depo) + '</td><td>' + gun(d.kapsama_gun) + '</td><td>' + rozet(d.once) + ' → ' + rozet(d.sonra) + '</td></tr>';
    }).join('');
    return '<div class="karsi">' +
      '<div><span>Kritik</span><b>' + s.KRITIK + '</b>' + fark(temel.KRITIK, s.KRITIK, 0, true) + '</div>' +
      '<div><span>Fazla stok</span><b>' + s.FAZLA_STOK + '</b>' + fark(temel.FAZLA_STOK, s.FAZLA_STOK, 0, true) + '</div>' +
      '<div><span>Normal</span><b>' + s.NORMAL + '</b>' + fark(temel.NORMAL, s.NORMAL, 0) + '</div>' +
      '<div><span>Bağlı sermaye</span><b>' + tlKisa(s.bagli_sermaye_tl) + '</b>' + fark(temel.bagli_sermaye_tl, s.bagli_sermaye_tl, 0, true, tlKisa) + '</div></div>' +
      (deg ? '<p class="kucuk-metin mt">Durumu değişen ' + s.degisen.length + ' kalem:</p>' + tablo(['Malzeme', 'Depo', 'Kapsama', 'Durum'], deg)
        : '<p class="kucuk-metin mt">Bu eşiklerde hiçbir kalemin durumu değişmiyor.</p>') +
      '<p class="not">Emniyet stoğunun altında olduğu için kritik olan kalemler eşikten bağımsız kritik kalır (emniyet değeri örnek çıktıda yok).</p>';
  }

  function senCikarHtml() {
    var t = veri.tedarikci;
    if (!t) return '<p>Tedarikçi verisi yok.</p>';
    var secenek = '<option value="">Tedarikçi seçin</option>' + dizi(t.kayitlar).map(function (r) {
      return '<option value="' + e(r.tedarikci) + '"' + (r.tedarikci === sen.cikan ? ' selected' : '') + '>' + e(r.tedarikci) + ' · skor ' + sayi(r.skor, 1) + ' (' + r.seviye + ')</option>';
    }).join('');
    var ust = '<div class="alan"><label for="cikanSec">Portföyden çıkarılacak tedarikçi</label><select class="secim" id="cikanSec" data-sen="cikan">' + secenek + '</select></div>';
    if (!sen.cikan) return ust + '<p class="kucuk-metin mt">Bir tedarikçi seçin: sipariş hacmi kalanlara mevcut paylarıyla dağıtılır ve portföy yeniden hesaplanır.</p>';
    var s = H.tedarikciCikar(t.kayitlar, H.bulgular(veri), sen.cikan);
    var o = s.once, n = s.sonra;
    var yogun = n.en_buyuk_pay_pct > 30;
    return ust + '<div class="karsi mt">' +
      '<div><span>Ağırlıklı portföy skoru</span><b>' + sayi(n.skor, 1) + '</b>' + fark(o.skor, n.skor, 1) + '</div>' +
      '<div><span>Zamanında teslim</span><b>' + yuzde(n.zamaninda_pct) + '</b>' + fark(o.zamaninda_pct, n.zamaninda_pct, 1, false, function (x) { return sayi(x, 1) + ' puan'; }) + '</div>' +
      '<div><span>Red oranı</span><b>' + yuzde(n.red_pct, 2) + '</b>' + fark(o.red_pct, n.red_pct, 2, true, function (x) { return sayi(x, 2) + ' puan'; }) + '</div>' +
      '<div><span>En büyük tedarikçi payı</span><b>' + yuzde(n.en_buyuk_pay_pct) + '</b>' + fark(o.en_buyuk_pay_pct, n.en_buyuk_pay_pct, 1, true, function (x) { return sayi(x, 1) + ' puan'; }) + '</div>' +
      '</div>' +
      '<div class="uyari mt' + (yogun ? '' : ' info') + '"><p>' + e(sen.cikan) + ' sipariş hacminin ' + yuzde(s.tasinan_pay_pct) + '\'ini taşıyor; ' +
      (n.tedarikci_sayisi) + ' tedarikçiye dağıtılır. Açık bulgularından ' + s.kapanan_bulgu + ' tanesi' +
      (s.kapanan_tutar_tl ? ' (' + tl(s.kapanan_tutar_tl) + ' tutar etkisi)' : '') + ' bu tedarikçiye ait.</p>' +
      (yogun ? '<p><b>Yoğunlaşma uyarısı:</b> en büyük tedarikçinin payı %30\'u aşıyor.</p>' : '') +
      '<p>Varsayım: kalan tedarikçiler ek hacmi bugünkü performanslarıyla karşılar; kapasite ve fiyat verisi yoktur.</p></div>';
  }

  function senaryoEkrani() {
    var w = sen.agirlik;
    return sayfaBas('Yönetim', 'Senaryo',
      'Kuralların eşiklerini ve ağırlıklarını değiştirin, sonucun nasıl değiştiğini anında görün. Kaynak veri değişmez; hesap tarayıcıda yapılır.',
      SIM_ROZET + SENTETIK_ROZET) +
      '<div class="esnek" style="margin-bottom:16px"><button class="btn hayalet" type="button" data-act="sen-sifirla">Senaryoyu sıfırla</button>' +
      '<button class="btn hayalet" type="button" data-act="sen-csv">Senaryo CSV indir</button></div>' +
      '<div class="izgara bir-iki">' +
        '<section class="kart"><div class="kart-bas"><h3>Tedarikçi skoru ağırlıkları</h3>' + SIM_ROZET +
          '<p class="alt-yazi">Temel: %40 / %35 / %25. Ağırlıklar toplamı 100\'e normalize edilir.</p></div>' +
          kaydirici('w-teslim', 'Zamanında teslim', w.teslim, 0, 100, w.teslim) +
          kaydirici('w-kalite', 'Kalite (red)', w.kalite, 0, 100, w.kalite) +
          kaydirici('w-fiyat', 'Fiyat uyumu', w.fiyat, 0, 100, w.fiyat) +
        '</section>' +
        '<section class="kart" aria-live="polite"><div class="kart-bas"><h3>Sıralama sonucu</h3></div><div id="senTed">' + senTedarikciHtml() + '</div></section>' +
      '</div>' +
      '<div class="izgara bir-iki">' +
        '<section class="kart"><div class="kart-bas"><h3>Stok eşikleri</h3>' + SIM_ROZET +
          '<p class="alt-yazi">Temel: kritik &lt; 7 gün, fazla &gt; 180 gün kapsama.</p></div>' +
          kaydirici('s-kritik', 'Kritik eşiği (gün)', sen.kritik, 1, 30, sen.kritik + ' gün') +
          kaydirici('s-fazla', 'Fazla stok eşiği (gün)', sen.fazla, 60, 365, sen.fazla + ' gün') +
        '</section>' +
        '<section class="kart" aria-live="polite"><div class="kart-bas"><h3>Stok sonucu</h3></div><div id="senStok">' + senStokHtml() + '</div></section>' +
      '</div>' +
      '<section class="kart"><div class="kart-bas"><h3>Tedarikçi çıkarılırsa</h3>' + SIM_ROZET + '</div><div id="senCikar" aria-live="polite">' + senCikarHtml() + '</div></section>';
  }

  function senCsv() {
    var satir = [];
    satir.push(['parametre', 'agirlik_teslim', sen.agirlik.teslim, '', '']);
    satir.push(['parametre', 'agirlik_kalite', sen.agirlik.kalite, '', '']);
    satir.push(['parametre', 'agirlik_fiyat', sen.agirlik.fiyat, '', '']);
    satir.push(['parametre', 'stok_kritik_gun', sen.kritik, '', '']);
    satir.push(['parametre', 'stok_fazla_gun', sen.fazla, '', '']);
    if (veri.tedarikci) H.tedarikciSenaryo(veri.tedarikci.kayitlar, sen.agirlik).forEach(function (r) {
      satir.push(['tedarikci', r.tedarikci, r.temel_skor + ' ' + r.temel_seviye, r.skor + ' ' + r.seviye, r.temel_sira + '->' + r.sira]);
    });
    if (veri.stok) {
      var s = H.stokSenaryo(veri.stok.kayitlar, sen.kritik, sen.fazla);
      ['KRITIK', 'FAZLA_STOK', 'OLU_STOK', 'NORMAL'].forEach(function (d) { satir.push(['stok_sayim', d, '', s[d], '']); });
      satir.push(['stok_sayim', 'bagli_sermaye_tl', '', s.bagli_sermaye_tl, '']);
      s.degisen.forEach(function (d) { satir.push(['stok_degisen', d.malzeme_no + '/' + d.depo, d.once, d.sonra, d.kapsama_gun]); });
    }
    if (sen.cikan && veri.tedarikci) {
      var c = H.tedarikciCikar(veri.tedarikci.kayitlar, H.bulgular(veri), sen.cikan);
      satir.push(['cikarma', sen.cikan + ' portfoy_skoru', c.once.skor, c.sonra.skor, '']);
      satir.push(['cikarma', sen.cikan + ' zamaninda_pct', c.once.zamaninda_pct, c.sonra.zamaninda_pct, '']);
      satir.push(['cikarma', sen.cikan + ' red_pct', c.once.red_pct, c.sonra.red_pct, '']);
      satir.push(['cikarma', sen.cikan + ' en_buyuk_pay_pct', c.once.en_buyuk_pay_pct, c.sonra.en_buyuk_pay_pct, '']);
    }
    satir.push(['not', 'SIMULASYON - sentetik veri, istemcide hesap', '', '', '']);
    return H.csv(['tur', 'ad', 'temel', 'senaryo', 'ek'], satir);
  }

  // =========================================================== Rapor (yazdırılabilir)
  function raporEkrani() {
    var m = ozetMetrik(), aks = H.aksiyonlar(veri), risk = H.riskler(veri), g = roiGirdi(), r = H.roi(g);
    var uretilme = veri.stok ? veri.stok.uretilme : null;
    var aksSatir = aks.map(function (a) {
      return '<tr><td>' + a.sira + '</td><td class="l">' + e(a.baslik) + '<span class="not-satir">' + e(a.neden) + '</span></td><td>' + rozet(a.onem) + '</td>' +
        '<td>' + (a.tutar_tl != null ? tl(a.tutar_tl) + '<span class="not-satir">' + e(a.tutar_tur) + '</span>' : 'ölçülmedi') + '</td></tr>';
    }).join('');
    var riskSatir = risk.map(function (x, i) {
      return '<tr><td>' + (i + 1) + '</td><td class="l">' + e(x.alan) + '</td><td>' + rozet(x.seviye) + '</td><td class="l">' + e(x.gosterge) + '</td><td>' + (x.tutar_tl ? tl(x.tutar_tl) : '—') + '</td></tr>';
    }).join('');
    var roiSatir = r.kalemler.map(function (k) { return '<tr><td class="l">' + e(k.ad) + '<span class="not-satir">' + e(k.formul) + '</span></td><td>' + tl(k.alt) + '</td><td>' + tl(k.ust) + '</td></tr>'; }).join('') +
      '<tr><td class="l"><b>Toplam brüt</b></td><td><b>' + tl(r.alt) + '</b></td><td><b>' + tl(r.ust) + '</b></td></tr>' +
      '<tr><td class="l">Net (yıllık maliyet ' + tl(r.maliyet) + ' sonrası)</td><td>' + tl(r.net_alt) + '</td><td>' + tl(r.net_ust) + '</td></tr>';
    return '<div class="esnek yalniz-ekran" style="margin-bottom:16px"><button class="btn birincil" type="button" data-act="yazdir">Yazdır / PDF olarak kaydet</button>' +
      '<button class="btn hayalet" type="button" data-act="aksiyon-csv">Aksiyonlar CSV</button><button class="btn hayalet" type="button" data-act="roi-csv">ROI CSV</button></div>' +
      '<article class="kart" id="raporKagit">' +
      '<div class="sayfa-bas"><div><span class="ust-etiket">Kule Pro · yönetici raporu</span><h2>Tedarik zinciri kontrol raporu</h2>' +
      '<p>Çıktı tarihi ' + e(tarih(uretilme)) + ' · rapor ' + e(tarih(new Date().toISOString())) + '</p></div><div class="rozetler">' + SENTETIK_ROZET + LLM_YOK_ROZET + '</div></div>' +
      '<div class="uyari"><p><b>Okumadan önce:</b> Veriler sentetik örnek veridir; gerçek bir şirkete ait değildir. SAP bağlantısı yoktur. ' +
      'Bulgular açık kurallarla bulunmuştur; dil modeli kullanılmamıştır. ROI bölümü kullanıcı varsayımlarının sonucudur, ölçüm değildir.</p></div>' +
      '<div class="kpis">' + kpi('Tutar etkisi (tekil)', tl(m.tekil)) + kpi('Bağlı sermaye', tl(m.bagli)) + kpi('Kritik kalem', sayi(m.kritik)) +
      kpi('D seviyesi tedarikçi', m.dTed ? sayi(m.dTed.length) : '—') + kpi('Ortalama OEE', veri.oee ? yuzde(veri.oee.ozet.ortalama_oee_pct) : '—') + '</div>' +
      '<h3 class="mt">1. Aksiyonlar (' + aks.length + ')</h3>' + tablo(['#', 'Aksiyon ve neden', 'Önem', 'Parasal etki'], aksSatir) +
      '<p class="not">Sıra: önem, etki türü (para kaybı, bağlı sermaye, ölçülmedi), tutar. Aynı sipariş kaleminin iki modüldeki bulgusu bir kez sayılır.</p>' +
      '<h3 class="mt">2. Risk sıralaması</h3>' + tablo(['#', 'Alan', 'Seviye', 'Gösterge', 'Tutar'], riskSatir) +
      '<h3 class="mt">3. ROI — varsayımsal</h3>' + tablo(['Kol', 'Alt (TL/yıl)', 'Üst (TL/yıl)'], roiSatir) +
      '<p class="not">Girdiler ROI hesaplayıcıdaki son değerlerdir. Varsayılanların ' + guvenSayim().ikincil + ' tanesi ikincil kaynaklı aralık, ' +
      guvenSayim().kullanici + ' tanesi kaynaksızdır (kullanıcı girmeli).</p>' +
      '<h3 class="mt">4. Yöntem ve sınırlar</h3><ul class="kucuk-metin">' +
      '<li>Stok: kapsama = stok ÷ günlük sevk; kritik &lt; 7 gün veya emniyet altı, fazla &gt; 180 gün.</li>' +
      '<li>Tedarikçi skoru: %40 zamanında teslim, %35 kalite, %25 fiyat; ağırlıklar kalibre edilmemiş varsayımdır.</li>' +
      '<li>Talep: Holt-Winters; %80 aralık ölçümde %97,7 kapsıyor (fazla geniş, kalibre değil).</li>' +
      '<li>Üçlü eşleştirme: fatura düzenli metin kalıbıyla okunur; OCR yoktur.</li>' +
      '<li>Trend: önceki dönem anlık görüntüsü yok; gösterilen yön yalnız talep tahminidir.</li></ul>' +
      '</article>';
  }

  // =========================================================== Modül ekranları
  function uyariKutusu(z) {
    var s = dizi(z.uyarilar).map(function (u) { return '<p>' + e(u) + '</p>'; });
    if (dizi(z.hatalar).length) s.push('<p>Reddedilen girdi satırı: ' + sayi(z.hatalar.length) + '.</p>');
    return s.length ? '<div class="uyari">' + s.join('') + '</div>' : '';
  }
  function modulBas(ad, z) {
    return sayfaBas('Modül', ad, e(z.yontem.aciklama), veriRozetHtml(z) + yontemRozet(z)) + uyariKutusu(z);
  }
  function filtre() {
    return '<div class="esnek" style="justify-content:flex-end;margin-bottom:8px"><input type="search" class="secim" data-act="filtre" placeholder="Tabloda ara" aria-label="Tabloda ara" style="width:min(260px,100%)"></div>';
  }

  function stokEkrani(z) {
    var o = z.ozet, k = dizi(z.kayitlar);
    var durumlar = ['Tümü', 'KRITIK', 'OLU_STOK', 'FAZLA_STOK', 'NORMAL'];
    var secili = k.filter(function (r) { return durumSecim === 'Tümü' || r.durum === durumSecim; });
    var depolar = {};
    k.forEach(function (r) {
      var g = depolar[r.depo] || (depolar[r.depo] = { kalem: 0, kritik: 0, olu: 0, fazla: 0, deger: 0 });
      g.kalem++; if (r.durum === 'KRITIK') g.kritik++; if (r.durum === 'OLU_STOK') g.olu++; if (r.durum === 'FAZLA_STOK') g.fazla++;
      g.deger += Number(r.stok_degeri_tl) || 0;
    });
    var depoSatir = Object.keys(depolar).sort().map(function (d) {
      var g = depolar[d];
      return '<tr><td>' + e(d) + '</td><td>' + g.kalem + '</td><td>' + g.kritik + '</td><td>' + g.olu + '</td><td>' + g.fazla + '</td><td>' + tl(g.deger) + '</td></tr>';
    }).join('');
    var satir = secili.map(function (r) {
      return '<tr><td class="l">' + e(r.malzeme_no) + ' · ' + e(r.malzeme_adi) + '</td><td>' + e(r.depo) + '</td><td>' + sayi(r.stok) + ' ' + e(r.birim) + '</td>' +
        '<td>' + gun(r.kapsama_gun) + '</td><td>' + rozet(r.durum) + '</td><td>' + e(r.abc) + '</td><td>' + tl(r.stok_degeri_tl) + '</td></tr>';
    }).join('');
    return modulBas('Stok', z) +
      '<div class="kpis">' + kpi('Depo', sayi(o.depo_sayisi)) + kpi('Kalem', sayi(o.kalem_sayisi)) + kpi('Kritik', sayi(o.kritik)) +
      kpi('Ölü stok', sayi(o.olu_stok)) + kpi('Fazla stok', sayi(o.fazla_stok)) + kpi('Stok değeri', tlKisa(o.stok_degeri_tl), '', '', tl(o.stok_degeri_tl)) + '</div>' +
      '<section class="kart"><div class="kart-bas"><h3>Depo özeti</h3></div>' + tablo(['Depo', 'Kalem', 'Kritik', 'Ölü', 'Fazla', 'Stok değeri'], depoSatir) + '</section>' +
      '<section class="kart"><div class="kart-bas"><h3>Kalemler</h3><div class="esnek"><label class="kucuk-metin" for="durumSec">Durum</label><select class="secim" id="durumSec" data-act="durum">' +
      durumlar.map(function (d) { return '<option value="' + e(d) + '"' + (d === durumSecim ? ' selected' : '') + '>' + e(DURUM_AD[d] || d) + '</option>'; }).join('') +
      '</select><span class="kucuk-metin">' + secili.length + ' / ' + k.length + ' kalem</span></div></div>' + filtre() +
      tablo(['Malzeme', 'Depo', 'Stok', 'Kapsama', 'Durum', 'ABC', 'Değer'], satir) + '</section>';
  }

  function bulguEkrani(ad, z, kpiler, ekSutun) {
    var k = dizi(z.kayitlar), sayim = {};
    k.forEach(function (r) { sayim[r.tur] = (sayim[r.tur] || 0) + 1; });
    var enBuyuk = Math.max.apply(null, [1].concat(Object.keys(sayim).map(function (t) { return sayim[t]; })));
    var dag = Object.keys(sayim).sort(function (a, b) { return sayim[b] - sayim[a]; }).map(function (t) {
      return '<li><span>' + e(tur(t)) + '</span><b>' + sayim[t] + '</b><span class="iz"><i style="--b:' + Math.round(sayim[t] / enBuyuk * 100) + '"></i></span></li>';
    }).join('');
    var satir = k.map(function (r) {
      return '<tr><td class="l">' + e(tur(r.tur)) + '</td><td>' + e(r.siparis_no) + '/' + e(r.kalem) + '</td><td>' + e(r.tedarikci) + '</td><td>' + rozet(r.onem) + '</td>' +
        '<td>' + (r.tutar_etkisi_tl ? tl(r.tutar_etkisi_tl) : '<span class="kucuk-metin">ölçülmedi</span>') + '</td><td class="l">' + e(r.aciklama) + '</td><td>' + ekSutun(r) + '</td></tr>';
    }).join('');
    return modulBas(ad, z) + '<div class="kpis">' + kpiler + '</div>' +
      '<div class="izgara bir-iki"><section class="kart"><div class="kart-bas"><h3>Tür dağılımı</h3></div><ul class="cubuklar">' + (dag || '<li>Bulgu yok</li>') + '</ul></section>' +
      '<section class="kart"><div class="kart-bas"><h3>Bulgular</h3></div>' + filtre() +
      tablo(['Tür', 'Sipariş/kalem', 'Tedarikçi', 'Önem', 'Tutar etkisi', 'Açıklama', z.modul === 'eslestirme' ? 'Belgeler' : 'Gecikme'], satir) + '</section></div>';
  }
  function anomaliEkrani(z) {
    var o = z.ozet;
    return bulguEkrani('Sipariş anomalisi', z, kpi('Bulgu', sayi(o.bulgu_sayisi)) + kpi('Yüksek', sayi(o.yuksek)) + kpi('Orta', sayi(o.orta)) +
      kpi('Düşük', sayi(o.dusuk)) + kpi('Tutar etkisi', tl(o.tutar_etkisi_tl)), function (r) { return r.gecikme_gun == null ? '—' : r.gecikme_gun + ' gün'; });
  }
  function eslestirmeEkrani(z) {
    var o = z.ozet;
    return bulguEkrani('Üçlü eşleştirme', z, kpi('Kalem', sayi(o.kalem_sayisi)) + kpi('Bulgu', sayi(o.bulgu_sayisi)) + kpi('Tutar etkisi', tl(o.tutar_etkisi_tl)),
      function (r) { return e(dizi(r.belgeler).join(', ') || '—'); });
  }

  function talepGrafik(s) {
    var W = 360, Hh = 230, L = 40, R = 10, T = 12, B = 26;
    var lo = Math.min.apply(null, s.map(function (r) { return r.alt_80; })), hi = Math.max.apply(null, s.map(function (r) { return r.ust_80; }));
    var pay = (hi - lo) * 0.08 || 1; lo -= pay; hi += pay;
    var n = s.length;
    function x(i) { return n > 1 ? L + i * (W - L - R) / (n - 1) : L; }
    function y(v) { return T + (hi - v) * (Hh - T - B) / (hi - lo); }
    var ust = s.map(function (r, i) { return x(i).toFixed(1) + ',' + y(r.ust_80).toFixed(1); });
    var alt = s.map(function (r, i) { return x(i).toFixed(1) + ',' + y(r.alt_80).toFixed(1); }).reverse();
    var cz = s.map(function (r, i) { return x(i).toFixed(1) + ',' + y(r.tahmin).toFixed(1); });
    var iz = '', ye = '';
    for (var k = 0; k <= 3; k++) {
      var v = hi - k * (hi - lo) / 3, yy = y(v).toFixed(1);
      iz += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + yy + '" y2="' + yy + '"/>';
      ye += '<text x="' + (L - 8) + '" y="' + (Number(yy) + 4) + '" text-anchor="end">' + sayi(v, 0) + '</text>';
    }
    var nk = s.map(function (r, i) { return '<circle class="nokta-g" cx="' + x(i).toFixed(1) + '" cy="' + y(r.tahmin).toFixed(1) + '" r="3"/>'; }).join('');
    var xe = '<text x="' + L + '" y="' + (Hh - 8) + '">' + e(kisaTarih(s[0].hafta_baslangic)) + '</text><text x="' + (W - R) + '" y="' + (Hh - 8) + '" text-anchor="end">' + e(kisaTarih(s[n - 1].hafta_baslangic)) + '</text>';
    return '<div class="grafik"><svg viewBox="0 0 ' + W + ' ' + Hh + '" role="img" aria-label="Seçili ürünün ' + n + ' haftalık tahmini ve yaklaşık %80 aralığı">' +
      iz + '<polygon class="band" points="' + ust.concat(alt).join(' ') + '"/><polyline class="cizgi" points="' + cz.join(' ') + '"/>' + nk + ye + xe + '</svg>' +
      '<p class="not">Gölgeli alan yaklaşık %80 aralık (ölçümde fazla geniş); çizgi tahmindir. Birim: adet.</p></div>';
  }
  function talepEkrani(z) {
    var o = z.ozet, k = dizi(z.kayitlar), ek = z.ek || {}, urunler = [];
    k.forEach(function (r) { if (urunler.indexOf(r.urun_no) === -1) urunler.push(r.urun_no); });
    if (!urunSecim || urunler.indexOf(urunSecim) === -1) urunSecim = urunler[0];
    var s = k.filter(function (r) { return r.urun_no === urunSecim; });
    var satir = s.map(function (r) { return '<tr><td>' + e(tarih(r.hafta_baslangic)) + '</td><td>' + sayi(r.tahmin, 1) + '</td><td>' + sayi(r.alt_80, 1) + '</td><td>' + sayi(r.ust_80, 1) + '</td></tr>'; }).join('');
    var geri = dizi(ek.geriye_test).map(function (g) {
      var kotu = g.mape_pct > g.benchmark_mape_pct;
      return '<tr' + (kotu ? ' class="degisti"' : '') + '><td>' + e(g.urun_no) + '</td><td>' + yuzde(g.mape_pct) + '</td><td>' + yuzde(g.benchmark_mape_pct) + '</td>' +
        '<td>' + (kotu ? rozet('D', 'Kıyası geçemiyor') : rozet('A', 'Geçiyor')) + '</td><td>' + yuzde(g.kapsama_80_pct) + '</td><td>' + g.pencere_sayisi + '</td></tr>';
    }).join('');
    return modulBas('Talep tahmini', z) +
      '<div class="kpis">' + kpi('Ürün', sayi(o.urun_sayisi)) + kpi('Ufuk', o.ufuk_hafta + ' hafta') + kpi('Ort. MAPE', yuzde(o.ortalama_mape_pct)) +
      kpi('Benchmark MAPE', yuzde(o.benchmark_mape_pct)) + kpi('%80 aralık kapsaması', yuzde(o.kapsama_80_pct), 'nominal %80; aralık fazla geniş') + '</div>' +
      '<div class="izgara iki"><section class="kart"><div class="kart-bas"><h3>Tahmin</h3><div class="esnek"><label class="kucuk-metin" for="urunSec">Ürün</label><select class="secim" id="urunSec" data-act="urun">' +
      urunler.map(function (u) { return '<option' + (u === urunSecim ? ' selected' : '') + '>' + e(u) + '</option>'; }).join('') + '</select></div></div>' +
      (s.length ? talepGrafik(s) : '') + tablo(['Hafta', 'Tahmin', 'Alt %80', 'Üst %80'], satir) + '</section>' +
      '<section class="kart"><div class="kart-bas"><h3>Geriye dönük test</h3><p class="alt-yazi">Benchmark: geçen yılın aynı haftası.</p></div>' +
      tablo(['Ürün', 'MAPE', 'Benchmark', 'Kıyas', '%80 kapsama', 'Pencere'], geri) + '</section></div>';
  }

  function tedarikciEkrani(z) {
    var o = z.ozet, k = dizi(z.kayitlar);
    var satir = k.map(function (r) {
      return '<tr><td>' + e(r.tedarikci) + '</td><td>' + mini(r.skor) + sayi(r.skor, 1) + '</td><td>' + rozet(r.seviye) + '</td><td>' + yuzde(r.zamaninda_pct) + '</td>' +
        '<td>' + sayi(r.ortalama_gecikme_gun, 2) + ' gün</td><td>' + yuzde(r.red_pct, 2) + '</td><td>' + yuzde(r.fiyat_sapma_pct, 2) + '</td><td>' + r.siparis_sayisi + '</td></tr>';
    }).join('');
    return modulBas('Tedarikçi puanı', z) +
      '<div class="kpis">' + kpi('Tedarikçi', sayi(o.tedarikci_sayisi)) + kpi('Ortalama skor', sayi(o.ortalama_skor, 1)) +
      kpi('Ağırlıklı portföy skoru', sayi(H.portfoy(k).skor, 1), 'sipariş sayısıyla ağırlıklı') + '</div>' +
      '<section class="kart"><div class="kart-bas"><h3>Skor sıralaması</h3><button class="btn kucuk hayalet" type="button" data-git="senaryo">Ağırlıkları dene</button></div>' +
      tablo(['Tedarikçi', 'Skor', 'Seviye', 'Zamanında', 'Ort. gecikme', 'Red', 'Fiyat sapması', 'Sipariş'], satir) + '</section>';
  }

  function oeeEkrani(z) {
    var o = z.ozet, k = dizi(z.kayitlar), par = dizi((z.ek || {}).pareto);
    var satir = k.map(function (r) {
      return '<tr><td>' + e(r.hat) + '/' + e(r.vardiya) + '</td><td>' + yuzde(r.kullanilabilirlik_pct) + '</td><td>' + yuzde(r.performans_pct) + '</td><td>' + yuzde(r.kalite_pct) + '</td>' +
        '<td>' + mini(r.oee_pct) + '<b>' + yuzde(r.oee_pct) + '</b></td><td>' + e(NEDEN_AD[r.baskin_durus_nedeni] || r.baskin_durus_nedeni) + '</td><td class="l">' + e(r.kok_neden_onerisi) + '</td></tr>';
    }).join('');
    var p = par.map(function (x) {
      return '<li><span>' + e(NEDEN_AD[x.neden] || x.neden) + ' · ' + sayi(x.dakika, 0) + ' dk</span><b>' + yuzde(x.pay_pct) + '</b><span class="iz"><i style="--b:' + sinir(x.pay_pct) + '"></i></span></li>';
    }).join('');
    return modulBas('OEE', z) + '<div class="kpis">' + kpi('Hat · vardiya', sayi(o.hat_vardiya_sayisi)) + kpi('Ortalama OEE', yuzde(o.ortalama_oee_pct)) + '</div>' +
      '<div class="izgara uc-bir"><section class="kart"><div class="kart-bas"><h3>Hat ve vardiya</h3></div>' +
      tablo(['Hat/vardiya', 'Kullanılabilirlik', 'Performans', 'Kalite', 'OEE', 'Baskın duruş', 'Kök neden önerisi'], satir) + '</section>' +
      '<section class="kart"><div class="kart-bas"><h3>Duruş Pareto</h3></div><ul class="cubuklar">' + (p || '<li>Duruş yok</li>') + '</ul>' +
      '<p class="not">Kök neden metni kural önerisidir, kanıt değildir.</p></section></div>';
  }

  var MODUL_EKRAN = { stok: stokEkrani, anomali: anomaliEkrani, eslestirme: eslestirmeEkrani, tedarikci: tedarikciEkrani, talep: talepEkrani, oee: oeeEkrani };

  // =========================================================== Çizim
  function gezintiCiz() {
    $('gezinti').innerHTML = EKRANLAR.map(function (g) {
      return '<div class="gezinti-grup" role="group" aria-label="' + e(g.grup) + '"><span>' + e(g.grup) + '</span>' + g.liste.map(function (s) {
        var z = s.modul ? veri[s.modul] : null;
        return '<button type="button" data-git="' + s.id + '"' + (s.id === aktif ? ' aria-current="page"' : '') + '>' + e(s.ad) +
          (s.modul ? '<span class="say">' + (z ? dizi(z.kayitlar).length : '—') + '</span>' : '') + '</button>';
      }).join('') + '</div>';
    }).join('');
  }

  function ciz() {
    gezintiCiz();
    var s = EKRAN_DUZ.filter(function (x) { return x.id === aktif; })[0] || EKRAN_DUZ[0];
    $('ustBaslik').textContent = s.ad;
    $('ustAlt').textContent = s.alt;
    document.title = s.ad + ' — Kule Pro demo';
    var yuklu = TUM_ID.filter(function (i) { return !!veri[i]; }).length;
    $('yukleAlan').hidden = yuklu > 0;
    if (!yuklu) { $('govde').innerHTML = ''; $('veriRozet').textContent = 'Örnek veri yüklenemedi'; return; }
    var html;
    if (s.modul) html = veri[s.modul] ? MODUL_EKRAN[s.id](veri[s.modul]) :
      '<div class="bekle"><b>ÖRNEK ÇIKTI YOK</b><p>Bu modülün örnek çıktısı demoda yok.</p></div>';
    else html = { ozet: ozetEkrani, roi: roiEkrani, senaryo: senaryoEkrani, rapor: raporEkrani }[s.id]();
    $('govde').innerHTML = html;
    $('veriRozet').textContent = 'Sentetik · ' + yuklu + '/' + TUM_ID.length + ' modül';
    $('veriRozet').title = 'Önceden hesaplanmış örnek çıktı (tohum 42); canlı API yok';
  }

  function git(id, odak) {
    if (!EKRAN_DUZ.some(function (x) { return x.id === id; })) id = 'ozet';
    aktif = id;
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    ciz();
    window.scrollTo(0, 0);
    if (odak) $('icerik').focus({ preventScroll: true });
  }

  function durum(metin) { $('durum').textContent = metin; $('durum').hidden = !metin; }

  // =========================================================== Veri yükleme
  function zarfUygun(j, beklenen) {
    if (!j || j.sema_surum !== SEMA_SURUM) return 'sürüm uyuşmuyor';
    if (beklenen && j.modul !== beklenen) return 'modül uyuşmuyor (' + j.modul + ')';
    if (TUM_ID.indexOf(j.modul) === -1) return 'bilinmeyen modül';
    return null;
  }
  function gomuluYukle() {
    var g = window.KULE_DEMO;
    if (!g) return false;
    var n = 0;
    TUM_ID.forEach(function (id) { if (g[id] && !zarfUygun(g[id], id)) { veri[id] = g[id]; n++; } });
    return n > 0;
  }
  function veriYukle() {
    if (!gomuluYukle()) durum('Örnek veri dosyası (veri.js) okunamadı.');
    ciz();
  }

  // =========================================================== Olaylar
  document.addEventListener('click', function (ev) {
    var g = ev.target.closest('[data-git]');
    if (g) { git(g.getAttribute('data-git'), true); return; }
    var a = ev.target.closest('[data-act]');
    if (!a || a.tagName === 'SELECT' || a.tagName === 'INPUT') return;
    var act = a.getAttribute('data-act');
    var gun = new Date().toISOString().slice(0, 10);
    if (act === 'aksiyon-csv') indir('kule-aksiyonlar-' + gun + '.csv', aksiyonCsv());
    if (act === 'roi-csv') indir('kule-roi-' + gun + '.csv', roiCsv());
    if (act === 'sen-csv') indir('kule-senaryo-' + gun + '.csv', senCsv());
    if (act === 'yazdir') window.print();
    if (act === 'roi-sifirla') { roiDeger = roiVarsayilan(); roiKaydet(); ciz(); }
    if (act === 'sen-sifirla') { senSifirla(); ciz(); }
  });
  $('raporBtn').addEventListener('click', function () { git('rapor', true); });

  $('govde').addEventListener('change', function (ev) {
    var act = ev.target.getAttribute('data-act');
    if (act === 'durum') { durumSecim = ev.target.value; ciz(); }
    if (act === 'urun') { urunSecim = ev.target.value; ciz(); }
    if (ev.target.getAttribute('data-sen') === 'cikan') { sen.cikan = ev.target.value; $('senCikar').innerHTML = senCikarHtml(); $('cikanSec').focus(); }
  });

  $('govde').addEventListener('input', function (ev) {
    var t = ev.target;
    if (t.getAttribute('data-act') === 'filtre') {
      var q = t.value.trim().toLocaleLowerCase('tr-TR');
      t.closest('.kart').querySelectorAll('tbody tr').forEach(function (tr) {
        tr.hidden = q !== '' && tr.textContent.toLocaleLowerCase('tr-TR').indexOf(q) === -1;
      });
      return;
    }
    var k = t.getAttribute('data-roi');
    if (k) {
      var v = sayiOku(t.value);
      var gecerli = v != null && v >= 0;
      t.closest('.girdi').style.outline = gecerli ? '' : '2px solid var(--bad)';
      t.setAttribute('aria-invalid', gecerli ? 'false' : 'true');
      if (!gecerli) return;
      var uc = t.getAttribute('data-uc');
      if (uc) roiDeger[k][uc] = v; else roiDeger[k] = v;
      roiKaydet();
      $('roiSonuc').innerHTML = roiSonucHtml();
      return;
    }
    var s = t.getAttribute('data-sen');
    if (s && t.type === 'range') {
      var n = Number(t.value);
      if (s === 'w-teslim') sen.agirlik.teslim = n;
      if (s === 'w-kalite') sen.agirlik.kalite = n;
      if (s === 'w-fiyat') sen.agirlik.fiyat = n;
      if (s === 's-kritik') sen.kritik = n;
      if (s === 's-fazla') sen.fazla = n;
      $(s + '-o').textContent = s.charAt(0) === 's' ? n + ' gün' : n;
      if (s.charAt(0) === 'w') $('senTed').innerHTML = senTedarikciHtml();
      else $('senStok').innerHTML = senStokHtml();
      if (s.charAt(0) === 'w') $('senCikar').innerHTML = senCikarHtml();
    }
  });

  window.addEventListener('hashchange', function () { git(location.hash.slice(1)); });

  // Tema: sistem → açık → koyu (kişisel tercih; localStorage yoksa sistem)
  var TEMALAR = [['sistem', 'Tema: sistem'], ['acik', 'Tema: açık'], ['koyu', 'Tema: koyu']];
  var temaIdx = 0;
  try { temaIdx = Math.max(0, TEMALAR.findIndex(function (t) { return t[0] === localStorage.getItem('kule-tema'); })); } catch (err) { temaIdx = 0; }
  function temaUygula() {
    var t = TEMALAR[temaIdx], kok = document.documentElement;
    if (t[0] === 'sistem') kok.removeAttribute('data-theme'); else kok.setAttribute('data-theme', t[0] === 'acik' ? 'light' : 'dark');
    $('temaBtn').textContent = t[1];
    try { localStorage.setItem('kule-tema', t[0]); } catch (err) { /* sessiz */ }
  }
  $('temaBtn').addEventListener('click', function () { temaIdx = (temaIdx + 1) % TEMALAR.length; temaUygula(); });
  temaUygula();

  aktif = (location.hash || '#ozet').slice(1);
  if (!EKRAN_DUZ.some(function (x) { return x.id === aktif; })) aktif = 'ozet';
  veriYukle();
})();
