# AI / otomasyon portföyü: statik örnekler

Bu depo iki çalışmanın **statik örnek sayfalarını** içerir. Canlı API yoktur; sayfalar örnek veriyle açılır.

- [Portföy sayfası](portfoy/index.html)
- [Ajan iz görüntüleyici](ajan-orkestrasyon/iz-goruntuleyici/index.html): elle yazılmış kasetlerin izi ve eval sonuçları

## Sınırlar ve ölçüm bulguları (açıkça)

**Kule Pro** (tedarik zinciri karar destek aracı; kaynak kodu bu depoda değildir)

- İç değerlendirme puanı **2,7 / 5**. Puan yalnız teknik sağlamlığa dayanır; **firma ihtiyacı kanıtı yoktur**. ROI varsayımsaldır.
- Veriler sentetiktir. Ölçümler **gerçek ama herkese açık** DataCo verisiyle yapıldı (Mendeley Data, CC BY 4.0); bu bir firma verisi değildir.
- Aralıklı talep ölçümü (KULE-E8, ön-kayıtlı ölçütlerle, tüm varyantlar raporlandı):
  - Smooth sınıfta mevcut Holt-Winters ölçütü geçmiyor: test kapsaması %72,84 (hedef %75–85), test MAPE %264,12, naif MAPE'nin (%250,65) üstünde.
  - SBA iki ölçütü geçti ama marj zayıf: 9 test ürünü, 2,6 MAPE puanı.
  - Erratic, intermittent ve lumpy sınıflar test penceresinde **ölçülemedi**; bu sınıflar için hüküm yoktur.
- Kule testleri: 186.

**Ajan orkestratörü** (kaynak kodu bu depoda değildir)

- Örnek izler **elle yazılmış kayıttır** (kaset oynatma). Gerçek model çağrısı yapılmadı; kaydedilen jetonlar gerçek maliyet değildir.
- Denetçi bir dil modeli değil, koddur ve yalnız iddia bloğundaki sayıları Kule çıktısıyla karşılaştırır.
- 24 vakalı eval: 22 ölçüt/kontrol geçti, **2 bilinen enjeksiyon açığı kapanmadı** (görüntüleyicide gizlenmeden gösterilir).
- Orkestratör testleri: 44.

## Lisans

MIT, bkz. [LICENSE](LICENSE).
