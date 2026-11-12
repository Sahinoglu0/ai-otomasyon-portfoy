# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: ANK-01 deposunda kritik stok var mı? Kritik kalemleri listele ve aksiyon planı öner.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. ANK-01 deposunun güncel stok kayıtlarını kaynaktan çek.
2. Her kalem için mevcut stok miktarını ve birimini doğrula.
3. Her kalem için minimum stok veya emniyet stoku eşiğini belirle.
4. Mevcut stoğu eşikle karşılaştırarak kritik seviyedeki kalemleri ayır.
5. Kritik kalemleri, ilgili ürün ve tedarikçi bilgileriyle birlikte listele.
6. Bekleyen satın alma siparişlerini ve tahmini teslim tarihlerini kritik kalemlerle eşleştir.
7. Kritik kalemlerin son dönem tüketim hızını hesapla ve tükenme riskini değerlendir.
8. Sonuçları ANK-01 deposu için kritik stok raporu olarak derle.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

Evet, ANK-01 deposunda **5 kalem** kritik stok durumunda.

| Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | ABC | Stok Değeri (TL) |
|---|---|---|---|---|---|---|
| M-1003 | Euro palet 80x120 | 57.0 | AD | 3.4 | B | 23940.0 |
| M-1010 | Big bag 1 ton | 142.0 | AD | 3.8 | A | 36920.0 |
| M-1001 | Streç film 23 mikron | 80.0 | RL | 5.4 | C | 6800.0 |
| M-1012 | Plastik kasa 60x40 | 195.0 | AD | 6.2 | B | 40950.0 |
| M-1006 | Etiket rulosu 100x150 | 302.0 | RL | 6.4 | B | 28690.0 |

**Aksiyon önerisi (kapsama süresine göre):**

1. **Hemen:** M-1003 (Euro palet) ve M-1010 (Big bag) için satın alma talebi açılmalı. Bu iki kalemin kapsama süresi en kısa, M-1010 ise A sınıfı olduğu için öncelikli.
2. **Kısa vadede:** M-1001 (Streç film) ve M-1012 (Plastik kasa) için sipariş planlanmalı.
3. **Takip:** M-1006 (Etiket rulosu) kapsama süresi en uzun olan kalem, ancak yine kritik listede; sipariş durumu izlenmeli.

**Eksik veriler:** Araç çıktısında minimum/emniyet stok eşikleri, bekleyen satın alma siparişleri, tedarikçi bilgileri ve tüketim hızları yer almıyor. Bu yüzden teslim tarihiyle eşleştirme ve tükenme riski hesabını yapamadım. Tedarikçi skorlarını görmek için tedarikçi adlarını paylaşmanız yeterli.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK"}, "deger": 5},
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK", "malzeme_no": "M-1001"}, "alan": "stok", "deger": 80.0},
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK", "malzeme_no": "M-1003"}, "alan": "stok", "deger": 57.0},
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK", "malzeme_no": "M-1006"}, "alan": "stok", "deger": 302.0},
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK", "malzeme_no": "M-1010"}, "alan": "stok", "deger": 142.0},
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK", "malzeme_no": "M-1012"}, "alan": "stok", "deger": 195.0}
]
```
