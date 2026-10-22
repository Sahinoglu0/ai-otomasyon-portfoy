# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: T-05 tedarikçisinin performansı neden zayıf? Skor, seviye ve teslim bilgisini yaz, iyileştirme öner.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. T-05 tedarikçisinin güncel performans skorunu veri kaynağından al.
2. T-05 tedarikçisinin performans seviyesini skor eşiklerine göre belirle.
3. T-05 tedarikçisinin teslim geçmişini, zamanında teslim oranını ve gecikme kayıtlarını çıkar.
4. T-05 skor bileşenlerini (kalite, teslim, fiyat, iletişim vb.) ayrı ayrı incele ve en düşük katkı yapan bileşenleri belirle.
5. T-05 performansını aynı kategorideki diğer tedarikçilerle karşılaştır.
6. Zayıf performansın olası kök nedenlerini (kapasite, lojistik, kalite hataları, sipariş planlaması) veriye dayanarak sınıflandır.
7. Tespit edilen nedenlere göre T-05 için iyileştirme seçeneklerini hazırla.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## T-05 performans özeti

Tedarikçi sorgusundan alınan değerler:

- **Skor:** 47,7
- **Seviye:** D
- **Zamanında teslim oranı:** %75,0
- **Ortalama gecikme:** 0,93 gün
- **Red oranı:** %4,95
- **Fiyat sapması:** %12,02
- **Sipariş sayısı:** 40

**Zayıf performansın göstergeleri:** Skor D seviyesinde. En belirgin sorun teslim tarafında: zamanında teslim oranı %75,0 ve geciken teslimler, skorun düşük kalmasına katkı yapıyor olabilir. Fiyat sapması %12,02 ile de dikkat çekiyor. Red oranı %4,95 düzeyinde.

**Kısıtlar:** Mevcut araç çıktısında skor bileşenlerinin ayrı ağırlıkları, teslim geçmişinin kayıt bazlı dökümü, diğer tedarikçilerle karşılaştırma ve kök neden verisi yok. Bu nedenle hangi bileşenin skoru en çok düşürdüğünü, T-05'in kategori ortalamasına göre konumunu ve gecikmelerin kapasite, lojistik ya da sipariş planlamasından hangisinden kaynaklandığını bu veriyle kesin olarak söyleyemem.

**Veriye dayalı iyileştirme önerileri:**

1. **Teslim süreci:** Gecikmelerin nedenini tedarikçiyle birlikte inceleyin. Siparişlerin üretim ve sevkiyat takvimini paylaşmak ve gecikme olduğunda erken uyarı almak, zamanında teslim oranını yükseltmeye yardımcı olabilir.
2. **Fiyat sapması:** %12,02 sapmanın sözleşme fiyatı, ek maliyet ya da ölçü/miktar farkından mı kaynaklandığını kontrol edin ve fiyat koşullarını netleştirin.
3. **Kalite:** Red oranını azaltmak için ret nedenlerini kategorize edip kök neden analizi yapmak ve tedarikçiyle kalite beklentilerini yazılı hale getirmek faydalı olur.
4. **Veri tamamlama:** Kararı desteklemek için bileşen skorları, teslim kayıtları ve aynı kategorideki tedarikçi karşılaştırması gerekli. Bu verileri sağlarsanız analizi tamamlayabilirim.

```iddialar
[
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-05"}, "alan": "skor", "deger": 47.7},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-05"}, "alan": "seviye", "deger": "D"},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-05"}, "alan": "zamaninda_pct", "deger": 75.0},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-05"}, "alan": "ortalama_gecikme_gun", "deger": 0.93},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-05"}, "alan": "red_pct", "deger": 4.95},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-05"}, "alan": "fiyat_sapma_pct", "deger": 12.02},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-05"}, "alan": "siparis_sayisi", "deger": 40}
]
```
