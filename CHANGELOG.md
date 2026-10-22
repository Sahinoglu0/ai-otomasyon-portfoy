# Değişiklik günlüğü

Bu dosya geçmişi yeniden yazmadan tutulur. Commit tarihleri değiştirilmedi.
18–19 Ekim 2026 arasındaki sürüm satırları **tarihsel olarak sonradan yazıldı** (ilk yayın sırasında değil, sonradan bu dosyaya işlendi). 21 Ekim 2026'dan sonraki satırlar kendi tarihinde yazıldı.

SHA'lar bu depodaki `git log` çıktısıdır. Kule (ölçüm ve test) SHA'ları yerel `cv-portfoy-kule` deposundandır; uzakta yoktur. "Commit yok" işaretli satırlar yayın kopyasında duruyor ve henüz commit edilmedi.

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
