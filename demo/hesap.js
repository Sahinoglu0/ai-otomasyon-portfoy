/* Kule Pro demo: hesap katmanı (DOM yok). Tarayıcıda window.KuleHesap.
 *
 * Her şey modül JSON çıktılarından (sözleşme 1.1) ve kullanıcının girdiği varsayımlardan hesaplanır.
 * Uydurma sayı yok: veride karşılığı olmayan değer null döner ve ekranda "ölçülmedi" yazar.
 */
(function (kok, fabrika) {
  if (typeof module === 'object' && module.exports) module.exports = fabrika();
  else kok.KuleHesap = fabrika();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function dizi(x) { return Array.isArray(x) ? x : []; }
  function num(x) { var n = Number(x); return isFinite(n) ? n : 0; }
  var ONEM_SIRA = { YUKSEK: 3, ORTA: 2, DUSUK: 1 };

  // ---- Tedarikçi skoru: modül çıktısıyla aynı formül (ağırlıklar kaydırıcıdan gelebilir).
  var AGIRLIK_VARSAYILAN = { teslim: 40, kalite: 35, fiyat: 25 };
  var SEVIYE_ESIKLERI = [['A', 85], ['B', 70], ['C', 55]];

  function seviye(skor) {
    for (var i = 0; i < SEVIYE_ESIKLERI.length; i++) if (skor >= SEVIYE_ESIKLERI[i][1]) return SEVIYE_ESIKLERI[i][0];
    return 'D';
  }

  // Ağırlıklar yüzde (toplamı 100 olmak zorunda değil; normalize edilir).
  function tedarikciSkor(r, agirlik) {
    var w = agirlik || AGIRLIK_VARSAYILAN;
    var t = num(w.teslim) + num(w.kalite) + num(w.fiyat);
    if (t <= 0) return 0;
    return (num(w.teslim) * num(r.zamaninda_pct) +
      num(w.kalite) * Math.max(0, 100 - num(r.red_pct) * 10) +
      num(w.fiyat) * Math.max(0, 100 - Math.max(0, num(r.fiyat_sapma_pct)) * 10)) / t;
  }

  function tedarikciSenaryo(kayitlar, agirlik) {
    var satir = dizi(kayitlar).map(function (r) {
      var skor = Math.round(tedarikciSkor(r, agirlik) * 10) / 10;
      return { tedarikci: r.tedarikci, temel_skor: r.skor, temel_seviye: r.seviye, skor: skor, seviye: seviye(skor),
        siparis_sayisi: r.siparis_sayisi };
    });
    satir.sort(function (a, b) { return b.skor - a.skor || (a.tedarikci < b.tedarikci ? -1 : 1); });
    var temelSira = dizi(kayitlar).slice().sort(function (a, b) { return b.skor - a.skor || (a.tedarikci < b.tedarikci ? -1 : 1); })
      .map(function (r) { return r.tedarikci; });
    satir.forEach(function (s, i) { s.sira = i + 1; s.temel_sira = temelSira.indexOf(s.tedarikci) + 1; });
    return satir;
  }

  // "Tedarikçi çıkarılırsa": hacmi kalanlara sipariş payı oranında dağıtılır, kalanların performansı aynı kalır (varsayım).
  function portfoy(kayitlar) {
    var k = dizi(kayitlar), n = 0, zam = 0, red = 0, skor = 0, enBuyuk = 0;
    k.forEach(function (r) { n += num(r.siparis_sayisi); });
    k.forEach(function (r) {
      var p = n ? num(r.siparis_sayisi) / n : 0;
      zam += p * num(r.zamaninda_pct); red += p * num(r.red_pct); skor += p * num(r.skor);
      enBuyuk = Math.max(enBuyuk, p * 100);
    });
    return { tedarikci_sayisi: k.length, siparis: n, zamaninda_pct: zam, red_pct: red, skor: skor, en_buyuk_pay_pct: enBuyuk };
  }

  function tedarikciCikar(kayitlar, bulgular, cikan) {
    var k = dizi(kayitlar);
    var kalan = k.filter(function (r) { return r.tedarikci !== cikan; });
    var cikanSatir = k.filter(function (r) { return r.tedarikci === cikan; })[0] || null;
    var once = portfoy(k), sonra = portfoy(kalan);
    var giden = dizi(bulgular).filter(function (b) { return b.tedarikci === cikan; });
    return {
      cikan: cikanSatir,
      once: once,
      sonra: sonra,
      tasinan_pay_pct: cikanSatir && once.siparis ? num(cikanSatir.siparis_sayisi) / once.siparis * 100 : 0,
      kapanan_bulgu: giden.length,
      kapanan_tutar_tl: giden.reduce(function (s, b) { return s + (b.tutar_tl || 0); }, 0)
    };
  }

  // ---- Stok eşikleri: modül çıktısıyla aynı kural. Emniyet stoğu örnek çıktıda yok; bu yüzden temel çıktıda
  // kapsama ≥ 7 gün olduğu hâlde KRITIK olan kalem (emniyet altında) KRITIK kalır.
  var STOK_KRITIK_GUN = 7, STOK_FAZLA_GUN = 180;

  function stokSinifla(r, kritikGun, fazlaGun) {
    if (r.durum === 'OLU_STOK' || r.kapsama_gun == null) return r.durum;
    var emniyetNedeniyle = r.durum === 'KRITIK' && r.kapsama_gun >= STOK_KRITIK_GUN;
    if (r.kapsama_gun < kritikGun || emniyetNedeniyle) return 'KRITIK';
    if (r.kapsama_gun > fazlaGun) return 'FAZLA_STOK';
    return 'NORMAL';
  }

  function stokSenaryo(kayitlar, kritikGun, fazlaGun) {
    var s = { KRITIK: 0, OLU_STOK: 0, FAZLA_STOK: 0, NORMAL: 0, bagli_sermaye_tl: 0, degisen: [] };
    dizi(kayitlar).forEach(function (r) {
      var d = stokSinifla(r, kritikGun, fazlaGun);
      s[d] = (s[d] || 0) + 1;
      if (d === 'FAZLA_STOK' || d === 'OLU_STOK') s.bagli_sermaye_tl += num(r.stok_degeri_tl);
      if (d !== r.durum) s.degisen.push({ malzeme_no: r.malzeme_no, depo: r.depo, once: r.durum, sonra: d, kapsama_gun: r.kapsama_gun });
    });
    return s;
  }

  // ---- Bulgular: anomali + üçlü eşleştirme aynı sipariş kalemini iki kez sayabilir; kalem başına tekilleştirilir.
  function bulgular(veri) {
    var gruplar = {}, sira = [];
    ['anomali', 'eslestirme'].forEach(function (id) {
      var z = veri[id];
      if (!z) return;
      dizi(z.kayitlar).forEach(function (r) {
        var anahtar = r.siparis_no + '|' + r.kalem;
        var g = gruplar[anahtar];
        if (!g) {
          g = gruplar[anahtar] = { siparis_no: r.siparis_no, kalem: r.kalem, tedarikci: r.tedarikci, onem: r.onem,
            turler: [], aciklamalar: [], kaynak: [], tutar_tl: null, tutar_toplam_ham: 0 };
          sira.push(anahtar);
        }
        if (ONEM_SIRA[r.onem] > ONEM_SIRA[g.onem]) g.onem = r.onem;
        g.turler.push(r.tur); g.aciklamalar.push(r.aciklama);
        if (g.kaynak.indexOf(id) === -1) g.kaynak.push(id);
        var t = num(r.tutar_etkisi_tl);
        g.tutar_toplam_ham += t;
        // Aynı kalemin iki bulgusu aynı parayı anlatır: en büyüğü alınır, toplanmaz. 0 TL "ölçülmedi" demektir.
        if (t > 0) g.tutar_tl = Math.max(g.tutar_tl || 0, t);
      });
    });
    return sira.map(function (a) { return gruplar[a]; });
  }

  var EYLEM = {
    CIFT_FATURA: 'Çift faturayı ödemeden durdur',
    IRSALIYESIZ_FATURA: 'İrsaliyesiz faturayı ödeme blokajına al',
    FAZLA_FATURA_MIKTAR: 'Fazla faturalanan miktar için düzeltme faturası iste',
    FIYAT_SAPMASI: 'Sözleşme fiyatı farkı için düzeltme faturası iste',
    ACIK_GECIKMIS: 'Gecikmiş siparişi tedarikçiye eskale et',
    CIFT_KAYIT: 'Çift mal kabul kaydını ters kayıtla düzelt',
    EKSIK_TESLIMAT: 'Eksik teslimatı tamamlat ya da kalemi kapat',
    FAZLA_TESLIMAT: 'Fazla teslim edilen miktarı iade et',
    MALZEME_UYUSMAZLIGI: 'Yanlış malzeme girişini düzelt',
    SIPARISSIZ_KABUL: 'Siparişsiz girişin kaynağını bul',
    GEC_TESLIMAT: 'Gecikmeyi tedarikçi görüşmesine taşı'
  };
  // Önce para kaybını durduran eylem gelir.
  var EYLEM_ONCELIK = ['CIFT_FATURA', 'IRSALIYESIZ_FATURA', 'FAZLA_FATURA_MIKTAR', 'FIYAT_SAPMASI', 'CIFT_KAYIT',
    'ACIK_GECIKMIS', 'EKSIK_TESLIMAT', 'FAZLA_TESLIMAT', 'MALZEME_UYUSMAZLIGI', 'SIPARISSIZ_KABUL', 'GEC_TESLIMAT'];

  // ---- Aksiyon listesi. Sıralama kuralı (ekranda da yazar): önem ↓, sonra etki türü (para kaybı > bağlı sermaye >
  // ölçülmedi), sonra tutar ↓.
  function aksiyonlar(veri) {
    var liste = [];

    bulgular(veri).forEach(function (g) {
      var ana = EYLEM_ONCELIK.filter(function (t) { return g.turler.indexOf(t) !== -1; })[0] || g.turler[0];
      liste.push({
        alan: g.kaynak.indexOf('eslestirme') !== -1 ? 'Faturalama' : 'Sipariş · mal kabul',
        baslik: (EYLEM[ana] || ana) + ' · ' + g.siparis_no + '/' + g.kalem,
        neden: g.aciklamalar.join(' · '),
        onem: g.onem, tutar_tl: g.tutar_tl, tutar_tur: g.tutar_tl ? 'tutar etkisi' : null,
        sahip: g.tedarikci && g.tedarikci !== '-' ? g.tedarikci : null, kaynak: g.kaynak.join(', '),
        not: g.turler.length > 1 ? g.turler.length + ' bulgu aynı kalemde; tutar bir kez sayıldı' : null
      });
    });

    var stok = veri.stok;
    if (stok) {
      var k = dizi(stok.kayitlar);
      // Depolar arası transfer: aynı malzeme bir depoda kritik, başka depoda fazla.
      var malzemeler = {};
      k.forEach(function (r) { (malzemeler[r.malzeme_no] = malzemeler[r.malzeme_no] || []).push(r); });
      var transferli = {};
      Object.keys(malzemeler).sort().forEach(function (m) {
        var kritik = malzemeler[m].filter(function (r) { return r.durum === 'KRITIK'; });
        var fazla = malzemeler[m].filter(function (r) { return r.durum === 'FAZLA_STOK'; });
        if (!kritik.length || !fazla.length) return;
        transferli[m] = true;
        liste.push({
          alan: 'Stok', baslik: 'Depolar arası transfer · ' + m + ' ' + fazla.map(function (r) { return r.depo; }).join('+') +
            ' → ' + kritik.map(function (r) { return r.depo; }).join('+'),
          neden: kritik[0].malzeme_adi + ': ' + kritik.map(function (r) { return r.depo + ' ' + r.kapsama_gun + ' gün'; }).join(', ') +
            ' kapsamada; ' + fazla.map(function (r) { return r.depo + ' ' + r.kapsama_gun + ' gün'; }).join(', ') + ' fazla.',
          onem: kritik.some(function (r) { return r.abc !== 'C'; }) ? 'YUKSEK' : 'ORTA',
          tutar_tl: fazla.reduce(function (s, r) { return s + num(r.stok_degeri_tl); }, 0), tutar_tur: 'bağlı sermaye',
          sahip: null, kaynak: 'stok', not: 'Tutar fazla depodaki stok değeridir; tasarruf değil, serbest bırakılabilecek sermaye.'
        });
      });
      var kritikAB = k.filter(function (r) { return r.durum === 'KRITIK' && r.abc !== 'C' && !transferli[r.malzeme_no]; });
      if (kritikAB.length) {
        liste.push({
          alan: 'Stok', baslik: 'A/B sınıfı ' + kritikAB.length + ' kritik kalem için acil sipariş',
          neden: kritikAB.map(function (r) { return r.malzeme_no + '/' + r.depo + ' ' + r.kapsama_gun + ' gün'; }).join(', '),
          onem: 'YUKSEK', tutar_tl: null, tutar_tur: null, sahip: null, kaynak: 'stok',
          not: 'Satış kaybı verisi yok; parasal etki ölçülmedi.'
        });
      }
      var olu = k.filter(function (r) { return r.durum === 'OLU_STOK'; });
      if (olu.length) {
        liste.push({
          alan: 'Stok', baslik: 'Ölü stoku elden çıkar ya da başka depoya ver · ' + olu.map(function (r) { return r.malzeme_no + '/' + r.depo; }).join(', '),
          neden: 'Dönemde hiç sevk yok.', onem: 'ORTA',
          tutar_tl: olu.reduce(function (s, r) { return s + num(r.stok_degeri_tl); }, 0), tutar_tur: 'bağlı sermaye',
          sahip: null, kaynak: 'stok', not: 'Tutar stok değeridir; geri kazanılacak para hurda/satış fiyatına bağlı.'
        });
      }
    }

    var ted = veri.tedarikci;
    if (ted) {
      var d = dizi(ted.kayitlar).filter(function (r) { return r.seviye === 'D'; });
      if (d.length) {
        liste.push({
          alan: 'Tedarikçi', baslik: 'D seviyesi tedarikçilerle performans görüşmesi · ' + d.map(function (r) { return r.tedarikci; }).join(', '),
          neden: d.map(function (r) { return r.tedarikci + ': zamanında %' + r.zamaninda_pct + ', red %' + r.red_pct + ', fiyat %' + r.fiyat_sapma_pct; }).join(' · '),
          onem: 'YUKSEK', tutar_tl: null, tutar_tur: null, sahip: null, kaynak: 'tedarikci',
          not: 'Harcama tutarı örnek çıktıda yok; fiyat sapmasının parası ölçülmedi.'
        });
      }
    }

    var oee = veri.oee;
    if (oee && dizi(oee.kayitlar).length) {
      var enDusuk = dizi(oee.kayitlar).slice().sort(function (a, b) { return a.oee_pct - b.oee_pct; })[0];
      liste.push({
        alan: 'Üretim', baslik: enDusuk.hat + '/' + enDusuk.vardiya + ' hattında duruş azaltma planı (OEE %' + enDusuk.oee_pct + ')',
        neden: enDusuk.kok_neden_onerisi, onem: enDusuk.oee_pct < 60 ? 'YUKSEK' : 'ORTA', tutar_tl: null, tutar_tur: null,
        sahip: null, kaynak: 'oee', not: 'Kök neden kural önerisidir, kanıt değil.'
      });
    }

    // Doğrudan para kaybı (tutar etkisi) ile bağlı sermaye aynı terazide tartılmaz: aynı önemde önce kayıp gelir.
    var TUR_SIRA = { 'tutar etkisi': 2, 'bağlı sermaye': 1 };
    liste.sort(function (a, b) {
      return (ONEM_SIRA[b.onem] - ONEM_SIRA[a.onem]) || ((TUR_SIRA[b.tutar_tur] || 0) - (TUR_SIRA[a.tutar_tur] || 0)) ||
        ((b.tutar_tl == null ? -1 : b.tutar_tl) - (a.tutar_tl == null ? -1 : a.tutar_tl));
    });
    liste.forEach(function (a, i) { a.sira = i + 1; });
    return liste;
  }

  // ---- Alan bazında risk sıralaması. Seviye kuralı açıktır ve eşikler varsayımdır.
  function riskler(veri) {
    var r = [];
    // Alan başına modülün kendi kayıtları sayılır (birleşik kalem grubu önemi başka modülden taşıyabilir).
    function bulguAlan(ad, kaynak, gosterge) {
      var g = dizi(veri[kaynak].kayitlar);
      var yuksek = g.filter(function (x) { return x.onem === 'YUKSEK'; }).length;
      r.push({ alan: ad, yuksek: yuksek, toplam: g.length,
        tutar_tl: g.reduce(function (s, x) { return s + num(x.tutar_etkisi_tl); }, 0),
        seviye: yuksek ? 'YUKSEK' : (g.length ? 'ORTA' : 'DUSUK'), gosterge: gosterge(g) });
    }
    if (veri.eslestirme) bulguAlan('Faturalama', 'eslestirme', function (g) { return g.length + ' bulgu / ' + veri.eslestirme.ozet.kalem_sayisi + ' kalem'; });
    if (veri.anomali) bulguAlan('Sipariş · mal kabul', 'anomali', function (g) { return g.length + ' bulgu'; });
    if (veri.stok) {
      var o = veri.stok.ozet;
      var kritikA = dizi(veri.stok.kayitlar).filter(function (x) { return x.durum === 'KRITIK' && x.abc === 'A'; }).length;
      var bagli = dizi(veri.stok.kayitlar).filter(function (x) { return x.durum === 'FAZLA_STOK' || x.durum === 'OLU_STOK'; })
        .reduce(function (s, x) { return s + num(x.stok_degeri_tl); }, 0);
      r.push({ alan: 'Stok', yuksek: kritikA, toplam: o.kritik + o.olu_stok + o.fazla_stok, tutar_tl: bagli,
        tutar_tur: 'bağlı sermaye', seviye: kritikA ? 'YUKSEK' : (o.kritik ? 'ORTA' : 'DUSUK'),
        gosterge: o.kritik + ' kritik / ' + o.kalem_sayisi + ' kalem' });
    }
    if (veri.tedarikci) {
      var t = dizi(veri.tedarikci.kayitlar);
      var dSay = t.filter(function (x) { return x.seviye === 'D'; }).length;
      var cSay = t.filter(function (x) { return x.seviye === 'C'; }).length;
      r.push({ alan: 'Tedarikçi', yuksek: dSay, toplam: dSay + cSay, tutar_tl: null,
        seviye: dSay ? 'YUKSEK' : (cSay ? 'ORTA' : 'DUSUK'), gosterge: dSay + ' tedarikçi D seviyesinde / ' + t.length });
    }
    if (veri.oee) {
      var ort = veri.oee.ozet.ortalama_oee_pct;
      var alti60 = dizi(veri.oee.kayitlar).filter(function (x) { return x.oee_pct < 60; }).length;
      r.push({ alan: 'Üretim (OEE)', yuksek: alti60, toplam: alti60, tutar_tl: null,
        seviye: alti60 ? 'YUKSEK' : (ort < 75 ? 'ORTA' : 'DUSUK'), gosterge: 'ortalama %' + ort });
    }
    if (veri.talep) {
      var tt = veri.talep.ozet;
      var gecemeyen = dizi((veri.talep.ek || {}).geriye_test).filter(function (x) { return x.mape_pct > x.benchmark_mape_pct; }).length;
      r.push({ alan: 'Talep tahmini', yuksek: 0, toplam: gecemeyen, tutar_tl: null,
        seviye: tt.ortalama_mape_pct > 15 ? 'YUKSEK' : (gecemeyen ? 'ORTA' : 'DUSUK'),
        gosterge: 'MAPE %' + tt.ortalama_mape_pct + '; ' + gecemeyen + ' ürün kıyası geçemiyor' });
    }
    r.sort(function (a, c) {
      return (ONEM_SIRA[c.seviye] - ONEM_SIRA[a.seviye]) || (c.yuksek - a.yuksek) || ((c.tutar_tl || 0) - (a.tutar_tl || 0));
    });
    return r;
  }

  // ---- Tahmin yönü: 8 haftalık tahminin ilk ve son haftası. Gerçekleşen trend DEĞİL; ekranda öyle etiketlenir.
  function tahminYonu(talep) {
    var u = {};
    dizi(talep && talep.kayitlar).forEach(function (r) { (u[r.urun_no] = u[r.urun_no] || []).push(r); });
    return Object.keys(u).sort().map(function (k) {
      var s = u[k].slice().sort(function (a, b) { return a.hafta_baslangic < b.hafta_baslangic ? -1 : 1; });
      var ilk = s[0].tahmin, son = s[s.length - 1].tahmin;
      var deg = ilk ? (son / ilk - 1) * 100 : 0;
      return { urun_no: k, ilk: ilk, son: son, degisim_pct: deg, yon: Math.abs(deg) < 2 ? 0 : (deg > 0 ? 1 : -1) };
    });
  }

  // ---- ROI. Her girdinin bir "guven" türü var, ekranda öyle etiketlenir:
  //   ikincil   → ikincil kaynaklı aralık (birincil rapor açılmadı)
  //   kullanici → kaynak bulunamadı ya da doğrulanamadı; değer örnektir, firma kendisi girmeli
  //   ornek     → şirket büyüklüğü (stok, hacim, adet); her firmada farklı, örnek değer
  //   veri      → panelin sentetik örnek verisinden hesaplanır
  // Şirket büyüklüğü girdileri tek değer; belirsiz oranlar alt-üst aralık.
  var IKINCIL = 'İkincil kaynak: ';
  var ROI_VARSAYIM = {
    stok_degeri_tl:   { ad: 'Ortalama stok değeri', birim: 'TL', deger: 50000000, guven: 'ornek' },
    fazla_pay_pct:    { ad: 'Fazla + ölü stok payı', birim: '%', deger: null, guven: 'veri',
      kaynak: 'ölü stok payı için doğrulanmış kaynak yok, kendi değerinizi girin' },
    azaltma_pct:      { ad: 'Fazla stoktan ilk yıl azaltılan pay', birim: '%', alt: 10, ust: 25, guven: 'kullanici',
      kaynak: 'tahminle stok azalması doğrulanamadı' },
    tasima_pct:       { ad: 'Yıllık taşıma maliyeti (stok değerine oran)', birim: '%', alt: 10, ust: 30, guven: 'ikincil',
      kaynak: IKINCIL + 'APQC medyan %10; %20-30 ders kitabı/blog (MRPeasy)' },
    satinalma_tl:     { ad: 'Yıllık satın alma (ödeme) hacmi', birim: 'TL', deger: 200000000, guven: 'ornek' },
    kacak_pct:        { ad: 'Mükerrer / hatalı ödeme payı', birim: '%', alt: 0.03, ust: 0.8, guven: 'ikincil',
      kaynak: IKINCIL + 'Berkeley denetimi %0,03 (tek belediye ölçümü); APQC %0,8 (blog üzerinden). Kaynağın %2 üst ucu satıcı kaynaklı olduğu için kullanılmadı; varsayılan üst sınır %0,8, kendi değerinizi girin' },
    yakalama_pct:     { ad: 'Ödemeden önce yakalanan pay', birim: '%', alt: 50, ust: 80, guven: 'kullanici',
      kaynak: 'Kule’nin gerçek veride yakalama oranı bilinmiyor (yalnız sentetikte 7/7, 4/4)' },
    gecikme_olay:     { ad: 'Yıllık gecikme / stoksuzluk olayı', birim: 'adet', deger: 120, guven: 'ornek' },
    olay_maliyet_tl:  { ad: 'Olay başı maliyet', birim: 'TL', deger: 15000, guven: 'kullanici', kaynak: 'kaynak bulunamadı' },
    onlenen_pct:      { ad: 'Erken uyarıyla önlenen pay', birim: '%', alt: 10, ust: 30, guven: 'kullanici', kaynak: 'kaynak bulunamadı' },
    durus_saat:       { ad: 'Yıllık plansız duruş', birim: 'saat', deger: 300, guven: 'ornek' },
    durus_deger_tl:   { ad: 'Saatlik üretim değeri (duruş maliyeti)', birim: 'TL/saat', deger: 20000, guven: 'kullanici',
      kaynak: IKINCIL + '$5.000–260.000/saat (büyük tesis); orta ölçek için kaynak yok, kendi değerinizi girin' },
    durus_azalma_pct: { ad: 'Erken uyarıyla azalan duruş', birim: '%', alt: 5, ust: 15, guven: 'kullanici', kaynak: 'kaynak bulunamadı' },
    vaka_ay:          { ad: 'Aylık elle kontrol / mutabakat vakası', birim: 'adet', deger: 400, guven: 'ornek' },
    vaka_dk:          { ad: 'Vaka başı süre', birim: 'dk', deger: 20, guven: 'kullanici', kaynak: 'elle mutabakat süresi bulunamadı' },
    kisalan_pct:      { ad: 'Kısalan süre payı', birim: '%', alt: 30, ust: 60, guven: 'kullanici', kaynak: 'kaynak bulunamadı' },
    saat_tl:          { ad: 'Tam yüklü saat maliyeti', birim: 'TL', deger: 600, guven: 'ornek' },
    yillik_maliyet_tl:{ ad: 'Aracın yıllık işletme maliyeti', birim: 'TL', deger: 600000, guven: 'ornek' }
  };

  function fazlaPayOrnek(stok) {
    if (!stok) return null;
    var t = num(stok.ozet.stok_degeri_tl);
    if (!t) return null;
    var f = dizi(stok.kayitlar).filter(function (r) { return r.durum === 'FAZLA_STOK' || r.durum === 'OLU_STOK'; })
      .reduce(function (s, r) { return s + num(r.stok_degeri_tl); }, 0);
    return f / t * 100;
  }

  // ---- ROI'nin ölçüme bağlanması. Sıra: ölçüm → kullanıcı → varsayım.
  //   kule → Kule'nin kendi kaydı (vaka sayısı, işleme süresi); elle → kullanıcının kendi girdiği kayıt (beyan, kronometre değil)
  // Yalnız iki değer hesaba alınabilir: aylık vaka (vaka_ay) ve Sabah raporu başına kazanılan süre (emek kolunu değiştirir).
  // Bulgu doğruluğu ve işleme süresi bilgi olarak gösterilir: doğruluk kaçırılanı bilmez, yakalama oranı yerine geçmez.
  // "hesap" hesaba alınan değerdir: aylık vaka tek sayı; kazanılan süre kayıtların çeyrek aralığı {alt, ust}:
  // tek medyan sahte kesinlik veriyordu; tek kayıtta alt = üst ve tek_tahmin işaretli.
  var IS_GUNU_AY = 21;      // emek kolu kayıtlı süreyle hesaplanırken ayda iş günü (varsayım)
  var OLCUM_AZ_KAYIT = 10;  // kullanıcı-iş başına 10 kayıt ancak yön verir; altı "az kayıt"
  function olcumBaglari(oz) {
    if (!oz) return [];
    var s = oz.sabah || {}, v = oz.vaka || {}, d = oz.bulgu_dogrulugu || {}, i = oz.ingest || {};
    var isaret = num(d.dogru) + num(d.yanlis);
    return [
      { id: 'vaka_ay', ad: 'Aylık vaka sayısı', birim: 'adet/ay', kaynak: 'kule', deger: v.toplam ? num(v.son_30_gun) : null,
        hesap: v.toplam ? num(v.son_30_gun) : null,
        n: num(v.toplam), aciklama: 'Kule’nin son 30 günde açtığı vaka sayısı',
        uygulanabilir: num(v.son_30_gun) > 0,
        uyari: v.kapsam_gun != null && v.kapsam_gun < 30 ? (v.kapsam_gun < 1 ? 'Kayıtlar bugün başladı' : 'Kayıtlar yalnız ' + v.kapsam_gun + ' günlük') +
          '; ay dolmadı, gerçek aylık sayı farklı olabilir.' : null },
      { id: 'emek_dk_gun', ad: 'Sabah raporu başına kazanılan süre (medyan)', birim: 'dk/gün', kaynak: 'elle', deger: s.medyan_sure_dk == null ? null : num(s.medyan_sure_dk),
        hesap: s.medyan_sure_dk == null ? null : { alt: num(s.ceyrek_alt == null ? s.medyan_sure_dk : s.ceyrek_alt),
          ust: num(s.ceyrek_ust == null ? s.medyan_sure_dk : s.ceyrek_ust) },
        tek_tahmin: num(s.kayit) < 2,
        n: num(s.kayit), aciklama: num(s.kullanici) + ' kullanıcının Sabah raporu ekranında girdiği süre tahminleri (kişi başı)',
        uygulanabilir: s.medyan_sure_dk != null,
        uyari: s.medyan_sure_dk != null && num(s.kayit) < OLCUM_AZ_KAYIT ? 'Yalnız ' + num(s.kayit) + ' kayıt; yön için bile ' + OLCUM_AZ_KAYIT + ' kayıt gerekir.' : null },
      { id: 'dogruluk', ad: 'Bulgu doğruluğu', birim: '%', kaynak: 'elle', deger: d.oran == null ? null : num(d.oran) * 100, n: isaret,
        aciklama: 'Vaka kartlarındaki doğru / yanlış işaretleri', uygulanabilir: false,
        uyari: 'Hesaba girmez: kaçırılan bulguyu bilmez, "ödemeden önce yakalanan pay" yerine kullanılamaz.' },
      { id: 'ingest', ad: 'Kule işleme süresi (medyan)', birim: 'sn', kaynak: 'kule', deger: i.medyan_sure_ms == null ? null : num(i.medyan_sure_ms) / 1000,
        n: num(i.yukleme), aciklama: 'Yüklemenin sunucuda işlenme süresi (ölçüm)', uygulanabilir: false, uyari: 'Bilgi amaçlı; hesaba girmez.' }
    ];
  }

  // Hesaba alınmış kayıtları yeni özetle eşitler: "Kayıtları yenile"den sonra tablo yeni medyanı, hesap eski
  // değeri gösteriyordu). g.olcum[id] olan her girdi için: değer değiştiyse g ve kayıt bilgisi güncellenir; kayıt artık
  // hesaba alınamıyorsa girdi varsayılana döner. Döndürür: [{id, ad, eski, yeni}] (yeni null = varsayıma döndü).
  function olcumEsitle(g, oz, varsayilan) {
    var baglar = olcumBaglari(oz), degisen = [];
    Object.keys(g.olcum || {}).forEach(function (id) {
      var b = baglar.filter(function (x) { return x.id === id; })[0], eski = g[id];
      if (!b || !b.uygulanabilir) {
        delete g.olcum[id];
        g[id] = varsayilan[id];
        degisen.push({ id: id, ad: b ? b.ad : id, eski: eski, yeni: null });
        return;
      }
      if (JSON.stringify(eski) !== JSON.stringify(b.hesap)) {
        g[id] = b.hesap;
        degisen.push({ id: id, ad: b.ad, eski: eski, yeni: b.hesap });
      }
      g.olcum[id] = { deger: b.hesap, n: b.n, kaynak: b.kaynak, aciklama: b.aciklama, zaman: oz.zaman, tek_tahmin: !!b.tek_tahmin };
    });
    return degisen;
  }

  // Kazanılan süre girdisi: sayı (S8 kayıtları) ya da {alt, ust}. Alt/üst uçtaki dakika; yoksa 0.
  function emekDk(g, uc) {
    var x = g.emek_dk_gun;
    if (x && typeof x === 'object') return num(x[uc]);
    return num(x);
  }

  // g: { anahtar: sayı } (tek değerliler) ve { anahtar: {alt, ust} } (aralıklılar). Çıktı TL/yıl.
  // g.emek_dk_gun doluysa emek kolu varsayım aralığı yerine kayıtlı sürenin çeyrek aralığıyla hesaplanır.
  function roi(g) {
    function v(a) { return num(g[a]); }
    function ar(a, uc) { return num(g[a] && g[a][uc]) / 100; }
    var kalemler = [
      { id: 'stok', ad: 'Stok taşıma maliyeti', formul: 'stok × fazla payı × azaltma × taşıma',
        f: function (uc) { return v('stok_degeri_tl') * v('fazla_pay_pct') / 100 * ar('azaltma_pct', uc) * ar('tasima_pct', uc); } },
      { id: 'fatura', ad: 'Fatura kaçağı', formul: 'satın alma × kaçak × yakalama',
        f: function (uc) { return v('satinalma_tl') * ar('kacak_pct', uc) * ar('yakalama_pct', uc); } },
      { id: 'gecikme', ad: 'Gecikme / stoksuzluk', formul: 'olay × olay maliyeti × önlenen',
        f: function (uc) { return v('gecikme_olay') * v('olay_maliyet_tl') * ar('onlenen_pct', uc); } },
      { id: 'durus', ad: 'Plansız duruş', formul: 'duruş saati × saatlik değer × azalma',
        f: function (uc) { return v('durus_saat') * v('durus_deger_tl') * ar('durus_azalma_pct', uc); } },
      emekDk(g, 'ust') > 0
        ? { id: 'emek', ad: 'Elle kontrol emeği', formul: 'kişi başı kayıtlı dk/gün × ' + IS_GUNU_AY + ' iş günü × 12 / 60 × saat maliyeti', olcum: true,
          f: function (uc) { return emekDk(g, uc) * IS_GUNU_AY * 12 / 60 * v('saat_tl'); } }
        : { id: 'emek', ad: 'Elle kontrol emeği', formul: 'vaka/ay × 12 × dk/60 × kısalan × saat maliyeti',
          f: function (uc) { return v('vaka_ay') * 12 * v('vaka_dk') / 60 * ar('kisalan_pct', uc) * v('saat_tl'); } }
    ].map(function (k) { return { id: k.id, ad: k.ad, formul: k.formul, olcum: !!k.olcum, alt: k.f('alt'), ust: k.f('ust') }; });
    var alt = kalemler.reduce(function (s, k) { return s + k.alt; }, 0);
    var ust = kalemler.reduce(function (s, k) { return s + k.ust; }, 0);
    var maliyet = v('yillik_maliyet_tl');
    function geriOdeme(t) { return t > 0 ? maliyet / (t / 12) : null; }
    return { kalemler: kalemler, alt: alt, ust: ust, net_alt: alt - maliyet, net_ust: ust - maliyet,
      geri_odeme_ay_alt: geriOdeme(ust), geri_odeme_ay_ust: geriOdeme(alt), maliyet: maliyet };
  }

  // ---- CSV: Türkçe Excel için ; ayraç, ondalık virgül, UTF-8 BOM.
  function csvHucre(x) {
    if (x == null) return '';
    if (typeof x === 'number') return isFinite(x) ? String(Math.round(x * 100) / 100).replace('.', ',') : '';
    var s = String(x);
    return /[;"\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function csv(basliklar, satirlar) {
    return '\ufeff' + [basliklar].concat(satirlar).map(function (r) { return r.map(csvHucre).join(';'); }).join('\r\n') + '\r\n';
  }

  return {
    AGIRLIK_VARSAYILAN: AGIRLIK_VARSAYILAN, STOK_KRITIK_GUN: STOK_KRITIK_GUN, STOK_FAZLA_GUN: STOK_FAZLA_GUN,
    ROI_VARSAYIM: ROI_VARSAYIM, seviye: seviye, tedarikciSkor: tedarikciSkor, tedarikciSenaryo: tedarikciSenaryo,
    tedarikciCikar: tedarikciCikar, portfoy: portfoy, stokSinifla: stokSinifla, stokSenaryo: stokSenaryo,
    bulgular: bulgular, aksiyonlar: aksiyonlar, riskler: riskler, tahminYonu: tahminYonu,
    fazlaPayOrnek: fazlaPayOrnek, roi: roi, csv: csv,
    IS_GUNU_AY: IS_GUNU_AY, OLCUM_AZ_KAYIT: OLCUM_AZ_KAYIT, olcumBaglari: olcumBaglari, olcumEsitle: olcumEsitle, emekDk: emekDk
  };
});
