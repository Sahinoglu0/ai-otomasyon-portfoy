# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: ANK-01 deposunda kritik stok var mı? Kritik kalemleri listele ve aksiyon planı öner.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:

1. ANK-01 deposunun güncel stok verisini (envanter kayıtları, sayım sonuçları) temin et ve erişilebilirliğini doğrula.
2. Her kalem için mevcut stok miktarını, emniyet stoğunu ve yeniden sipariş noktasını karşılaştır.
3. Stok seviyesi emniyet stoğunun altında kalan veya tükenmeye yakın kalemleri, talep hızı ve tedarik süresine göre kritik olarak işaretle.
4. Kritik kalemlerin tedarikçi, teslim süresi ve minimum sipariş miktarı bilgilerini doğrula.
5. Kritik kalemler için açık siparişleri, planlanmış gelişleri ve bekleyen talepleri kontrol et.
6. Kritik kalemleri üretim veya satış üzerindeki etkisine göre önceliklendir.
7. Öncelikli kalemler için acil sipariş, depolar arası transfer veya ikame ürün seçeneklerini değerlendir.
8. Kritik kalem listesini ve önceliklendirme sonuçlarını, aksiyon planı hazırlanması için girdi olarak derle.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

Evet, ANK-01 deposunda 5 kalemin durumu **KRITIK**.

| Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | ABC |
|---|---|---|---|---|---|
| M-1010 | Big bag 1 ton | 142 | AD | 3.8 | A |
| M-1003 | Euro palet 80x120 | 57 | AD | 3.4 | B |
| M-1001 | Streç film 23 mikron | 80 | RL | 5.4 | C |
| M-1012 | Plastik kasa 60x40 | 195 | AD | 6.2 | B |
| M-1006 | Etiket rulosu 100x150 | 302 | RL | 6.4 | B |

Ayrıca M-1009 (Ahşap kasa 120x100) OLU_STOK durumunda; kapsama süresi hesaplanamıyor ve stok değeri 259000 TL. Kritik değil ama ayrı bir inceleme gerektiriyor.

**Önceliklendirme (kapsama süresi ve ABC sınıfına göre)**
1. **M-1010 Big bag:** A sınıfı ve 3.8 gün kapsıyor. Üretim ve sevkiyatta en yüksek etkiye sahip olabilir.
2. **M-1003 Euro palet:** Kapsama süresi en kısa (3.4 gün). Sevkiyatı doğrudan etkileyebilir.
3. **M-1001 Streç film:** 5.4 gün kapsıyor.
4. **M-1012 Plastik kasa:** 6.2 gün kapsıyor.
5. **M-1006 Etiket rulosu:** 6.4 gün kapsıyor.

**Aksiyon planı önerisi**
- **Kısa vadede:** M-1010 ve M-1003 için acil sipariş durumunu tedarikçiyle netleştirin. Açık sipariş veya planlanmış geliş varsa bunu teyit edin.
- **Kısa vadede:** Diğer üç kalem için sipariş durumunu kontrol edin ve gerekiyorsa acil sipariş verin.
- **Kısa vadede:** M-1009 için mevcut talep olup olmadığını inceleyin. Talep yoksa satış veya tasfiye seçeneklerini değerlendirin.
- **Bu aşamada:** Depolar arası transfer seçeneğini değerlendirmek için diğer depoların stok verisi gerekir. Bu araçla yalnızca ANK-01 verisine erişebildim.

**Eksik bilgiler**
Elimdeki araçlar yalnızca stok durumu ve tedarikçi kaydı sorgulayabiliyor. Bu nedenle şunları doğrulayamadım:
- Emniyet stoğu ve yeniden sipariş noktası
- Tedarik süresi ve minimum sipariş miktarı
- Açık siparişler ve planlanmış gelişler
- Bekleyen talepler ve üretim/satış etkisi

Bu bilgilere erişim sağlanırsa önceliklendirmeyi ve sipariş miktarlarını buna göre güncelleyebilirim. Tedarikçi adlarını verirseniz tedarikçi kayıtlarını da sorgulayabilirim.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK"}, "deger": 5},
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "OLU_STOK"}, "deger": 1}
]
```
