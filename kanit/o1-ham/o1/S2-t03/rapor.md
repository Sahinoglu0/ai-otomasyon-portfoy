# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: ANK-01 deposunda kritik stok var mı? Kritik kalemleri listele ve aksiyon planı öner.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. ANK-01 deposuna ait güncel stok kayıtlarını ilgili veri kaynağından çek.
2. Her kalem için mevcut stok seviyesini, emniyet stoğunu ve yeniden sipariş noktasını karşılaştır.
3. Stok seviyesi emniyet stoğunun altında olan veya sipariş noktasına ulaşmış kalemleri belirle.
4. Kritik kalemleri bekleyen siparişler, tedarik süreleri ve talep tahminleriyle eşleştir.
5. Kritik kalemleri tükenme riskine göre sırala.
6. Kritik kalemlerin listesini deponun kendi kayıt formatında derle.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

ANK-01 deposunda **5 adet kritik stok kalemi** var.

| Sıra | Malzeme No | Malzeme Adı | Stok | Birim | Kapsama (gün) | ABC | Stok Değeri (TL) |
|---|---|---|---|---|---|---|---|
| 1 | M-1003 | Euro palet 80x120 | 57.0 | AD | 3.4 | B | 23940.0 |
| 2 | M-1010 | Big bag 1 ton | 142.0 | AD | 3.8 | A | 36920.0 |
| 3 | M-1001 | Streç film 23 mikron | 80.0 | RL | 5.4 | C | 6800.0 |
| 4 | M-1012 | Plastik kasa 60x40 | 195.0 | AD | 6.2 | B | 40950.0 |
| 5 | M-1006 | Etiket rulosu 100x150 | 302.0 | RL | 6.4 | B | 28690.0 |

Sıralama, tükenme riskine göre yapıldı: kapsama süresi en kısa olan kalem en üstte.

**Aksiyon planı**

1. **Hemen:** M-1003 (Euro palet) ve M-1010 (Big bag). Kapsama süreleri en kısa olan iki kalem bunlar. M-1010 ABC sınıfı A olduğu ve stok değeri en yüksek kalem olduğu için önceliklidir.
2. **Kısa vadede:** M-1001 (Streç film), M-1012 (Plastik kasa) ve M-1006 (Etiket rulosu). Bu kalemler için tedarik siparişleri bu hafta içinde verilmeli.
3. Bu kalemler için mevcut açık siparişleri, tedarik sürelerini ve talep tahminlerini kontrol edin. Bu bilgiler elimdeki araçlarla alınamadı, bu yüzden aksiyon planında yer almıyor.

**Eksik bilgi:** Veride emniyet stoğu ve yeniden sipariş noktası alanları yok. Kritik durum yalnızca Kule'nin sınıflandırmasına dayanıyor. Bu eşiklerin nasıl belirlendiğini doğrulamak için stok_durumu kaynağına bakmanızı öneririm.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "ANK-01", "durum": "KRITIK"}, "deger": 5}
]
```
