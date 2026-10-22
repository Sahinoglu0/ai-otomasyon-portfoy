# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IST-01 deposunun stok durumunu özetle: kritik ve fazla stok kalemleri neler?

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IST-01 deposunun güncel stok kayıtlarını ve kayıt tarihini doğrula.
2. Kalem bazında mevcut stok, açık sipariş ve rezerve miktarları eşleştir.
3. Her kalem için emniyet stoku ve yeniden sipariş noktası değerlerini kaynağıyla birlikte topla.
4. Kritik kalemleri, mevcut miktarı emniyet stoku altında veya tükenmek üzere olanlar olarak ayır.
5. Fazla stok kalemlerini, tüketim hızına göre kapsama süresi uzun olanlar olarak belirle.
6. Son hareket tarihi eski olan, hareketsiz kalemleri ayrı listele.
7. Kritik ve fazla stok listelerini kalem kodu, açıklama ve depo bilgisiyle birleştirerek sonuç setini hazırla.
8. Sonuçların eksik veya tutarsız kayıt içerip içermediğini kontrol et ve tespit edilenleri işaretle.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

IST-01 deposunda 12 kalem var. Araç sonucuna göre:

**Kritik stok (5 kalem)**

| Malzeme no | Açıklama | Stok | Birim | Kapsama (gün) | ABC |
|---|---|---|---|---|---|
| M-1002 | Koli 40x30x30 | 37 | AD | 3.4 | C |
| M-1003 | Euro palet 80x120 | 24 | AD | 5.0 | C |
| M-1005 | Çember (PET) 12mm | 176 | RL | 5.3 | A |
| M-1007 | Köşebent karton 35mm | 37 | AD | 4.6 | C |
| M-1010 | Big bag 1 ton | 165 | AD | 4.4 | A |

Bu kalemlerin kapsama süreleri kısa; yeniden sipariş kararının yakın vadede verilmesi gerekiyor. M-1005 ve M-1010 A sınıfı kalemler.

**Fazla stok (1 kalem)**

| Malzeme no | Açıklama | Stok | Birim | Kapsama (gün) | Stok değeri (TL) |
|---|---|---|---|---|---|
| M-1004 | Koli bandı 45mm | 9476 | AD | 355.5 | 170568.0 |

**Kontrol notları**

- Aracın verdiği kayıtlarda tutarsızlık görmedim: her kalemin durumu, kapsama süresiyle uyumlu görünüyor.
- Çıktıda emniyet stoku, yeniden sipariş noktası, açık sipariş, rezerve miktar, son hareket tarihi ve kayıt tarihi alanları yok. Bu yüzden plandaki 2, 3 ve 6. adımları (eşleştirme, emniyet stoku/sipariş noktası karşılaştırması ve hareketsiz kalem tespiti) yapamadım. "Kritik" ve "fazla stok" etiketleri yalnızca aracın durum alanına dayanıyor.
- Kayıt tarihini doğrulayamadığım için stok verisinin güncelliğini teyit edemiyorum.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "KRITIK"}, "deger": 5},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "FAZLA_STOK"}, "deger": 1},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "FAZLA_STOK"}, "alan": "kapsama_gun", "deger": 355.5}
]
```
