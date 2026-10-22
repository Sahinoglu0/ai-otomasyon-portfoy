# Değişiklik günlüğü

Bu dosya geçmişi yeniden yazmadan tutulur. Commit tarihleri değiştirilmedi.
18–19 Ekim 2026 arasındaki sürüm satırları **tarihsel olarak sonradan yazıldı** (ilk yayın sırasında değil, sonradan bu dosyaya işlendi). 21 Ekim 2026'dan sonraki satırlar kendi tarihinde yazıldı.

SHA'lar bu depodaki `git log` çıktısıdır. Kule (ölçüm ve test) SHA'ları yerel `cv-portfoy-kule` deposundandır; uzakta yoktur. "Commit yok" işaretli satırlar yayın kopyasında duruyor ve henüz commit edilmedi.

## 2026-10-22 (sonraki sürümler: v0.2.0, v0.2.1, v0.3.0, v0.4.0)

- **v0.4.0 (bu güncelleme):** iki ayrı video (tanıtım 2 dk 45 sn, kullanım 4 dk 42 sn; sessiz, TR ve EN altyazılı, MP4/.srt/.vtt), oynatıcı sayfası (`video/`, `noindex`), README'ye video ve ekran görüntüsü bölümleri, canlı sayfalardan 4 ekran görüntüsü. Yeni ölçüm yok; sayılar v0.3.0 ile aynı. Raporlar: PORTFOY-V4, V5.
- **v0.3.0 (`83857f8`):** açık veri denemeleri eklendi. Mendeley *Retail Inventory Data* (model örnek verisi, 30/30 satır kabul) ve UCI *Online Retail II* (1.067.371 satır, vekil eşleme, yalnız ingest dayanıklılığı). `stok_durumu` gerçek veriyle koşulamadı; mal kabul, irsaliye, fatura ve üretim için açık gerçek veri bulunamadı. DataCo lisans notu güncellendi. Raporlar: ARASTIRMA-VERI-01, VERI-E1, VERI-T1, VERI-Y1.
- **v0.2.1 (`80c1bf7`):** iz görüntüleyiciye gerçek model koşularından 4 örnek iz, ana sayfada ve portföy sayfasında 4 kartlık okuma sırası, README özeti. Gerçek model koşu sayısı düzeltildi: 38 koşu yapıldı, 37'si tamamlandı, 1'i kotada kesildi. Rapor: PORTFOY-S2.
- **v0.2.0 (`42c5af4`):** test kanıtı sayfası (`kanit/`), 345 maddelik test kataloğu, SHA-256 manifesti, statik demo (`demo/`, MIT dışı), tohum bandı ve ROI varsayım tablosu (`olcum/`), `noindex`. Raporlar: PORTFOY-K2, K3, K4, O2.
- Aşağıdaki 22 Ekim satırlarının güncel hâli: orkestratör testleri 68 → 87 (G2b, G3, G4, G6); eval 24/24 → 34 vaka, 33/33 geçti, 1 bilinen açık (düz metindeki sayı yalnız Kule verisinde varlık için denetlenir). Körlemesine onay modu kapatıldı; onay yalnız içeriğin özetiyle yazmayı açar (G2b). Düz metindeki sayılar da denetlenir (G3). Planlayıcı çıktısı bir kod kapısından geçer, en çok 2 yeniden deneme (G4, G6). Raporlar: PORTFOY-G2b, G3, G4, G6.
- Gerçek model ölçümü (O1): 38/40 koşu, soruşturmada 16/20 kabul; yeniden ifade edilmiş sızıntı kapıdan geçti (0/6), bu bilinen bir sınırdır. Rapor: PORTFOY-O1.

## 2026-10-22

- Kule Python testleri 224 → 229 (K1). Sayım koşudan üretildi, `sayim.py` ile. Kule SHA `1d31a4f`. Rapor: PORTFOY-K1.
- Orkestratör testleri 60 → 68 (G2, +8 regresyon testi; sayım 68/68). Rapor: PORTFOY-G2.
- Node testleri 29 (tam ağaçta 29/29). Geçici kopyada 1 test atlanır, nedeni yazılı. Rapor: PORTFOY-K1.
- Eval 22/24 → 24/24. İki açık ölçüte çevrildi; taban yeni adlarla yeniden yazıldı. Rapor: PORTFOY-G2.
- Enjeksiyon: araç çıktısının son yanıta sızması kapandı. Onaylı yazma özet eşleşmezse reddedilir. Körlemesine onay modu (`--onay-ver`) açık kaldı. Rapor: PORTFOY-G2.
- Yayın sayfalarındaki test sayıları JSON'dan üretildi ve kontrol modu ile denetlenir. Rapor: PORTFOY-K1. Commit yok.
- Üç HTML sayfasına `noindex` eklendi (index, portfoy, iz görüntüleyici). Commit yok. Canlı doğrulama push'tan sonra yapılacak. Rapor: PORTFOY-D2.
- Statik panel demosu eklendi (`demo/`; sentetik ve önceden hesaplanmış veri; tıklama testi 58/58). Commit yok. Rapor: PORTFOY-S1.
- İz verisindeki "ELLE YAZILMIŞ KAYIT" etiketi korundu. Rapor: PORTFOY-G2.

## 2026-10-19 (tarihsel olarak sonradan yazıldı)

- Gerçek model izleri ve İngilizce SVG'ler eklendi, rozetli iz görüntüleyici. SHA `98b3131`.
- Gerçek model sonrası metin düzeltmeleri (SVG, iz görüntüleyici altbilgisi, ana sayfa). SHA `a5c645a`.
- README: aracın ne yaptığını anlatan ayrıntılı sürüm (TR + EN). SHA `0bb9d9d`.

## 2026-10-18 (tarihsel olarak sonradan yazıldı)

- Puan 3,0/5 ve test sayıları (Kule 224 Python + 29 Node). SHA `66df4d0`.
- Eval sonucu: yazım hatası düzeltildi. SHA `2d7c1dc`.
- İz görüntüleyici: TR/EN dil geçişi. SHA `ed1f0da`.
- Giriş ve portföy sayfası: TR/EN dil geçişi; giriş sayfasına anlatım bağlantısı. SHA `30b79c8`.
- README: ayrıntılı anlatım, çizimler; İngilizce sürüm. SHA `9403a08`.
- Çizimler (SVG). SHA `f698c30`.
- TR/EN dil geçişi betiği. SHA `dda64a4`.
- İz görüntüleyici. SHA `c449a9a`.
- Eval sonucu. SHA `64de285`.
- Analist izleri ve eval sonucu. SHA `29d516c`.
- Portföy sayfası, analist izleri ve eval sonucu. SHA `8541b59`.
- README, giriş sayfası ve örnek izler. SHA `33bb039`.
- MIT lisansı. SHA `10169b0`.
