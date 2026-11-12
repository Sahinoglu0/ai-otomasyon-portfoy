# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: T-05 tedarikçisinin performansı neden zayıf? Skor, seviye ve teslim bilgisini yaz, iyileştirme öner.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. T-05 tedarikçisinin güncel performans skoru ve seviyesi kaynak verilerden çekilir.
2. Teslim zamanındalık, kısmi teslim ve gecikme kayıtları son dönem için derlenir.
3. Skoru etkileyen kriter bazında ağırlıklar incelenip en düşük katkı yapan kriterler belirlenir.
4. Kalite, sipariş karşılama ve iletişim verileri ayrı ayrı kontrol edilir.
5. Zayıflığın tedarikçi kaynaklı mı, sipariş planlamasından veya iç süreçlerden mi kaynaklandığı ayrıştırılır.
6. Benzer tedarikçilerle karşılaştırma yapılarak T-05'in sapması doğrulanır.
7. Bulgular tek bir nedensel özet halinde birleştirilir.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## T-05 Performans Özeti

| Gösterge | Değer |
|---|---|
| Skor | 47.7 |
| Seviye | D |
| Zamanında teslim oranı | %75.0 |
| Ortalama gecikme | 0.93 gün |
| Red oranı | %4.95 |
| Fiyat sapması | %12.02 |
| Sipariş sayısı | 40 |

## Neden zayıf?

Elimdeki veriye göre performansı en çok etkileyen alanlar teslim ve fiyat:

- **Teslim:** Zamanında teslim oranı %75.0. Yani siparişlerin dörtte birinde teslim zamanında gerçekleşmiyor. Ortalama gecikme 0.93 gün; bu süre tek başına büyük görünmüyor, ancak sık tekrarlanan gecikme skoru düşürüyor.
- **Fiyat:** Fiyat sapması %12.02 ile tabloda en yüksek oransal sapma. Sözleşme ya da teklif fiyatından ciddi uzaklaşma, satın alma maliyetini ve dolayısıyla skoru olumsuz etkiliyor.
- **Red:** Red oranı %4.95. Kalite tarafında ciddi bir sorun görünmüyor, ancak düşük de değil.

**Sınırlar:** Aracın döndürdüğü veride kriter ağırlıkları, kalite detayları, sipariş teyit verileri ve iletişim kayıtları yok. Bu yüzden skora hangi kriterin ne kadar katkı yaptığını, ayrıca gecikmenin tedarikçi kaynaklı mı yoksa sipariş planlaması ya da iç süreçlerden mi kaynaklandığını kesin olarak ayıramıyorum. Benzer tedarikçilerle karşılaştırma da yapılamadı, çünkü elimdeki araç yalnızca tek bir tedarikçi kaydı getiriyor. Bu nedenle T-05'in sapmasını doğrulayamıyorum.

## İyileştirme önerileri

1. **Gecikme kök nedeni:** Gecikmiş siparişlerde tedarikçinin teyit ettiği tarih ile gerçek teslim tarihini karşılaştırın. Tedarikçi teyidi zamanında yapılmış ama teslim geç olmuşsa sorun tedarikçide; teyit zaten geç ya da planlama değişikliği varsa sorun iç süreçtedir.
2. **Fiyat sapması:** Sapan kalemleri sözleşme fiyatıyla faturalar üzerinden kontrol edin ve fiyat revizyonunu tedarikçiyle kısa vadede görüşün.
3. **Red nedenleri:** Redlerin kalite, belge ya da yanlış miktar kaynaklı olduğunu kodlayın. Bu, red oranının kaynağını netleştirir.
4. **Veri eksikliği:** Kalite, teyit ve iletişim verilerini ayrı kaynaklardan çekip skor ağırlıklarıyla birlikte inceleyin. Bu olmadan kök neden kesinleşmez.
5. **Takip:** Teslim oranı ve fiyat sapmasını haftalık takip edin; iyileşme olmazsa tedarikçi değerlendirmesini gözden geçirin.

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
