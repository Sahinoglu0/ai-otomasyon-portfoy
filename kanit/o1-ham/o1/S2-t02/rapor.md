# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: ANK-01 deposunda kritik stok var mı? Kritik kalemleri listele ve aksiyon planı öner.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. ANK-01 deposunun güncel stok verisini kaynaktan çek.
2. Her kalem için mevcut stok miktarını ve birim bilgisini doğrula.
3. Kalemlerin minimum stok veya emniyet stoku eşiklerini belirle.
4. Mevcut stoku eşiklerle karşılaştırarak kritik seviyedeki kalemleri ayır.
5. Açık siparişleri ve tedarikçi teslim sürelerini kritik kalemlerle eşleştir.
6. Son tüketim hızına göre her kritik kalemin tükenme tarihini hesapla.
7. Kritik kalemleri öncelik sırasına ve etki düzeyine göre sırala.
8. Bulguları kalem bazında listele ve her kalem için gereken aksiyonları çıkar.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

**Evet, ANK-01 deposunda 5 kritik kalem var.** Hepsi tek araç sonucundan alındı.

| Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | ABC | Stok Değeri (TL) |
|---|---|---|---|---|---|---|
| M-1010 | Big bag 1 ton | 142 | AD | 3.8 | A | 36920 |
| M-1003 | Euro palet 80x120 | 57 | AD | 3.4 | B | 23940 |
| M-1006 | Etiket rulosu 100x150 | 302 | RL | 6.4 | B | 28690 |
| M-1012 | Plastik kasa 60x40 | 195 | AD | 6.2 | B | 40950 |
| M-1001 | Streç film 23 mikron | 80 | RL | 5.4 | C | 6800 |

**Öncelik sırası (kapsama süresine ve ABC sınıfına göre):**
1. **M-1003 Euro palet:** En kısa kapsama (3.4 gün), B sınıfı.
2. **M-1010 Big bag:** Kapsama 3.8 gün ve A sınıfı. Etki açısından en önemli kalem.
3. **M-1001 Streç film:** Kapsama 5.4 gün, düşük değerli C sınıfı.
4. **M-1012 Plastik kasa:** Kapsama 6.2 gün, en yüksek stok değeri (40950 TL).
5. **M-1006 Etiket rulosu:** Kapsama 6.4 gün.

**Aksiyon planı:**
- **Kısa vadede:** M-1003 ve M-1010 için acil sipariş veya tedarikçi ile teslim teyidi yapılmalı. Bu iki kalem en kısa kapsamaya sahip.
- **Kısa vadede:** M-1001 ve M-1012 için sipariş oluşturulmalı. Stok değeri yüksek olan M-1012 için tedarik takibi sıkı tutulmalı.
- **Takip:** M-1006 için sipariş planlanmalı. Stok adedi (302 RL) diğerlerine göre yüksek olsa da kapsama 6.4 gün.

**Eksik veriler:**
- Eşik (minimum/emniyet stok) değerleri, açık siparişler ve tedarikçi teslim süreleri elimizde yok. Bu yüzden tükenme tarihleri hesaplanmadı; yalnızca araçtan gelen kapsama günleri verildi.
- Tedarikçi kayıtlarını sorgulamak için tedarikçi adı gerekiyor. Bu bilgiyi paylaşırsan teslim performansını da kontrol edebilirim.

```iddialar
[{"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK"}, "deger": 5}]
```
