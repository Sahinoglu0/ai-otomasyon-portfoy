# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IST-01 deposunun stok durumunu özetle: kritik ve fazla stok kalemleri neler?

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:

1. IST-01 deposuna ait güncel stok kayıtlarının kaynağını ve tarih aralığını belirle.
2. Kalem bazında mevcut stok miktarını çek ve depo kapasitesi veya kullanılabilir alanla karşılaştır.
3. Kalem bazında emniyet stoğu ve yeniden sipariş noktası değerlerini stok miktarıyla eşleştir.
4. Stoğu emniyet seviyesinin altında kalan kalemleri kritik olarak işaretle.
5. Talep tahminine ve ortalama tüketim hızına göre stok süresi yeterli olmayan kalemleri belirle.
6. Stoğu yeniden sipariş noktasının belirgin üzerinde olan veya tüketim hızına göre uzun süre yetecek kalemleri fazla stok olarak ayır.
7. Kritik ve fazla stok listelerini kalem kodu, ürün adı ve son hareket tarihi bilgileriyle birleştir.
8. Son hareket tarihi eski olan veya hareketsiz kalan kalemleri ayrıca kontrol et.
9. Bulguları kritik ve fazla stok başlıklarıyla kullanıcıya sunulacak kısa bir özet halinde derle.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## IST-01 Stok Durumu Özeti

Araç yalnızca depo, malzeme, stok miktarı, birim, kapsama süresi, durum, ABC sınıfı ve stok değeri alanlarını döndürdü. Emniyet stoğu, yeniden sipariş noktası, depo kapasitesi, talep tahmini ve son hareket tarihi bu çıktıda yok. Kritik ve fazla stok sınıflandırması, aracın verdiği `durum` alanına göre yapıldı.

### Kritik Stok (5 kalem)

| Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | ABC | Stok Değeri (TL) |
|---|---|---|---|---|---|---|
| M-1002 | Koli 40x30x30 | 37.0 | AD | 3.4 | C | 240.5 |
| M-1003 | Euro palet 80x120 | 24.0 | AD | 5.0 | C | 10080.0 |
| M-1005 | Çember (PET) 12mm | 176.0 | RL | 5.3 | A | 112640.0 |
| M-1007 | Köşebent karton 35mm | 37.0 | AD | 4.6 | C | 118.4 |
| M-1010 | Big bag 1 ton | 165.0 | AD | 4.4 | A | 42900.0 |

En dikkat çekici iki kalem M-1005 ve M-1010'dur. Her ikisi A sınıfında ve kapsama süreleri 6 günden kısa.

### Fazla Stok (1 kalem)

| Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | ABC | Stok Değeri (TL) |
|---|---|---|---|---|---|---|
| M-1004 | Koli bandı 45mm | 9476.0 | AD | 355.5 | C | 170568.0 |

Bu kalemin kapsama süresi aracın verdiği değere göre 355.5 gün. Kalem C sınıfında olmasına karşın stok değeri yüksek.

### Normal Stok (6 kalem)

M-1001, M-1006, M-1008, M-1009, M-1011 ve M-1012 normal durumda.

### Eksik Kalanlar

- Emniyet stoğu ve yeniden sipariş noktası karşılaştırması yapılamadı. Bu değerler araç çıktısında yok.
- Son hareket tarihine göre hareketsiz kalem kontrolü yapılamadı.
- Depo kapasitesi karşılaştırması yapılamadı.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "malzeme_no": "M-1002"}, "alan": "stok", "deger": 37.0},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "malzeme_no": "M-1003"}, "alan": "stok", "deger": 24.0},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "malzeme_no": "M-1005"}, "alan": "stok", "deger": 176.0},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "malzeme_no": "M-1007"}, "alan": "stok", "deger": 37.0},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "malzeme_no": "M-1010"}, "alan": "stok", "deger": 165.0},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "malzeme_no": "M-1004"}, "alan": "stok", "deger": 9476.0}
]
```
