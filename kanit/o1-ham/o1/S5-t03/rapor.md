# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: T-01 ile T-06 tedarikçilerini skor ve seviye açısından karşılaştır.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. T-01 ile T-06 tedarikçilerinin skor verilerini tek bir kaynakta topla.
2. Skorların aynı dönem, aynı ölçek ve aynı ağırlıklarla hesaplandığını doğrula.
3. Her tedarikçinin mevcut seviyesini ve seviye belirleme kriterlerini kaynağından çek.
4. Skor ve seviye bilgilerini tedarikçi bazında eşleştir ve eksik veya tutarsız kayıtları işaretle.
5. Tedarikçileri skor ve seviye üzerinden yan yana karşılaştır.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## T-01 ile T-06 karşılaştırması

| Ölçüt | T-01 | T-06 |
|---|---|---|
| Skor | 95.5 | 95.0 |
| Seviye | A | A |
| Zamanında teslim (%) | 97.5 | 97.5 |
| Ortalama gecikme (gün) | 0.03 | 0.03 |
| Red (%) | 0.99 | 0.51 |
| Fiyat sapması (%) | -0.04 | 0.88 |
| Sipariş sayısı | 40 | 40 |

**Skor ve seviye:** Her iki tedarikçi de A seviyesinde. T-01'in skoru (95.5) T-06'dan (95.0) 0.5 puan yüksek.

**Skoru ayıran alanlar:** Teslim süresi ve sipariş sayısı iki tedarikçide aynı. Fark red oranı ve fiyat sapmasında. T-01'in red oranı daha yüksek (%0.99 ve %0.51), T-06'nın fiyat sapması daha yüksek (%0.88 ve %-0.04). Aracın verdiği çıktıda skorun hangi ağırlıkla hesaplandığı yer almadığı için bu alanların skora etkisini sayısal olarak ayıramıyorum.

**Doğrulanamayanlar:**
- Skorların aynı dönem, aynı ölçek ve aynı ağırlıklarla hesaplandığı çıktıda belirtilmiyor. Bu kontrol yapılamadı.
- Seviye belirleme kriterleri (ör. A için eşik değerleri) mevcut araçlarla alınamıyor. Seviyelerin hangi kurala göre atandığı doğrulanamadı.

```iddialar
[
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-01"}, "alan": "skor", "deger": 95.5},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-01"}, "alan": "seviye", "deger": "A"},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-06"}, "alan": "skor", "deger": 95.0},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-06"}, "alan": "seviye", "deger": "A"}
]
```
