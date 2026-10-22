# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IST-01 deposunun stok durumunu özetle: kritik ve fazla stok kalemleri neler?

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IST-01 deposunun güncel stok kayıtlarını (kalem kodu, miktar, birim) kaynak sistemden çek.
2. Kalem bazında mevcut stok ile emniyet stoku ve yeniden sipariş noktasını karşılaştır.
3. Stoğu yeniden sipariş noktasının altında olan kalemleri kritik olarak işaretle.
4. Stoğu belirlenen maksimum seviyenin üzerinde olan kalemleri fazla stok olarak işaretle.
5. Kritik ve fazla stok kalemlerini ayrı listelere ayır ve her birinin açık sipariş durumunu ekle.
6. Kritik kalemler için tedarikçi teslim süresini kontrol et ve stok tükenme riskini belirle.
7. Fazla stok kalemlerinin son hareket tarihlerini ve değerini incele.
8. Analiz sonuçlarını kullanıcıya kısa bir özet olarak sun.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | reddedildi | stok_durumu {'malzeme_no': 'M-1004'}: 3 kayıt, tek olmalı; stok_durumu {'malzeme_no': 'M-1005'}: 3 kayıt, tek olmalı; stok_durumu {'malzeme_no': 'M-1010'}: 3 kayıt, tek olmalı |
| 2 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

IST-01 deposunda 12 kalem var. Kritik stokta 5, fazla stokta 1 kalem bulunuyor. Sonuçlar iki araç çıktısından alındı (stok_sorgu, depo IST-01, genel ve durum=KRITIK).

**Kritik stok (5 kalem)**

| Malzeme | Ad | Stok | Birim | Kapsama (gün) | Stok değeri (TL) | ABC |
|---|---|---|---|---|---|---|
| M-1002 | Koli 40x30x30 | 37.0 | AD | 3.4 | 240.5 | C |
| M-1003 | Euro palet 80x120 | 24.0 | AD | 5.0 | 10080.0 | C |
| M-1005 | Çember (PET) 12mm | 176.0 | RL | 5.3 | 112640.0 | A |
| M-1007 | Köşebent karton 35mm | 37.0 | AD | 4.6 | 118.4 | C |
| M-1010 | Big bag 1 ton | 165.0 | AD | 4.4 | 42900.0 | A |

Kritik kalemlerin kapsama süreleri kısa. Bunların arasında A sınıfı olan M-1005 ve M-1010 öncelikli ilgi gerektiriyor.

**Fazla stok (1 kalem)**

- M-1004 Koli bandı 45mm: stok 9476.0 AD, kapsama 355.5 gün, stok değeri 170568.0 TL, ABC C.

**Eksik kalan analizler**

Planda istenen şu bilgiler araç çıktılarında yok, bu yüzden rapora eklenmedi:
- Emniyet stoku ve yeniden sipariş noktası
- Maksimum stok seviyesi
- Açık sipariş durumu
- Tedarikçi teslim süresi (tedarikci_sorgu için tedarikçi adı gerekiyor, bu da henüz bilinmiyor)
- Son hareket tarihleri

Bu verilere ihtiyaç varsa kaynak sistemden ayrıca sorgulanması gerekir.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "KRITIK"}, "deger": 5},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "FAZLA_STOK"}, "deger": 1},
  {"modul": "stok_durumu", "filtre": {"depo": "IST-01", "durum": "FAZLA_STOK"}, "alan": "stok", "deger": 9476.0}
]
```
