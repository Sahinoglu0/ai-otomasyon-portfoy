# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IST-01 deposunun stok durumunu özetle: kritik ve fazla stok kalemleri neler?

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IST-01 deposunun güncel stok kayıtlarını (kalem kodu, miktar, birim) ilgili kaynaktan çek.
2. Her kalemin mevcut miktarını o kaleme tanımlı minimum stok seviyesi ile karşılaştır.
3. Minimum seviyenin altında kalan kalemleri kritik stok olarak işaretle.
4. Tanımlı maksimum stok seviyesinin üzerindeki kalemleri fazla stok olarak işaretle.
5. Kritik ve fazla kalemleri ayrı listeler halinde derle.
6. Eksik minimum veya maksimum tanımı olan kalemleri ayrıca raporla.
7. Kayıt tarihini kontrol et ve veri güncelliğini doğrula.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## IST-01 Stok Durumu Özeti

Araç çıktısında 12 kalem var. Bunlardan 5'i **KRITIK**, 1'i **FAZLA_STOK**, 6'sı **NORMAL** durumda.

### Kritik stok (5 kalem)

| Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | ABC |
|---|---|---|---|---|---|
| M-1002 | Koli 40x30x30 | 37.0 | AD | 3.4 | C |
| M-1003 | Euro palet 80x120 | 24.0 | AD | 5.0 | C |
| M-1005 | Çember (PET) 12mm | 176.0 | RL | 5.3 | A |
| M-1007 | Köşebent karton 35mm | 37.0 | AD | 4.6 | C |
| M-1010 | Big bag 1 ton | 165.0 | AD | 4.4 | A |

Kritik kalemlerin ikisi (M-1005 ve M-1010) A sınıfı. Bu ikisi öncelikli ele alınmalı.

### Fazla stok (1 kalem)

| Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | Stok Değeri (TL) |
|---|---|---|---|---|---|
| M-1004 | Koli bandı 45mm | 9476.0 | AD | 355.5 | 170568.0 |

### Eksik veri notu

Araç çıktısında kalemlere ait minimum ve maksimum stok seviyesi ile kayıt tarihi bulunmuyor. Bu nedenle kritik ve fazla sınıflandırması, Kule'nin hesapladığı `durum` alanına göre yapıldı. Minimum/maksimum tanımı eksik kalemler ve veri güncelliği doğrulanamadı. Bu kontrol için stok_durumu kaynağında seviye tanımları ve kayıt tarihi alanlarının sorgulanması gerekiyor.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "KRITIK"}, "deger": 5},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "FAZLA_STOK"}, "deger": 1}
]
```
