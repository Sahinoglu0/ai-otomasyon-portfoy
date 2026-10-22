# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IZM-01 deposunun stok seviyesini ve kapasite kullanımını kaynak verilerden doğrula.
2. IZM-01 deposunun bağlı olduğu ürün ve sipariş kalemlerini listele.
3. T-03 tedarikçisinin teslimat sürelerini ve son dönem gecikme kayıtlarını topla.
4. T-03 tedarikçisinin tedarik ettiği kalemlerin alternatif kaynaklarını belirle.
5. IZM-01 ve T-03 arasındaki bağımlılığı, bu kalemlerin ciroya ve üretime etkisiyle birlikte değerlendir.
6. Kritiklik ölçütlerini (stok tükenme riski, teslimat gecikmesi, maliyet etkisi) tanımla ve veriyle karşılaştır.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

# IZM-01 ve T-03 Kritiklik Değerlendirmesi

## Kısa cevap

- **IZM-01** deposunda 12 kalemden **3'ü KRITIK** durumda: M-1002, M-1005, M-1006. Bu kalemlerin kapsama süreleri 3,3 ile 4,1 gün arasında. Bunların sipariş yenilemesi kısa vadede gerekir.
- **T-03** tedarikçisinin skoru **36,3** ve seviyesi **D**. Siparişlerinin yalnızca **%60,0**'ı zamanında teslim edilmiş, ortalama gecikme **2,4 gün**, red oranı **%9,29**, fiyat sapması **%6,08**.

## Doğrulanan veriler

**IZM-01 stok durumu (stok_sorgu çıktısı):**

| Malzeme | Ad | Kapsama (gün) | Durum | ABC | Stok değeri (TL) |
|---|---|---|---|---|---|
| M-1002 | Koli 40x30x30 | 3.3 | KRITIK | C | 494.0 |
| M-1005 | Çember (PET) 12mm | 3.8 | KRITIK | A | 106240.0 |
| M-1006 | Etiket rulosu 100x150 | 4.1 | KRITIK | C | 14250.0 |
| M-1001 | Streç film 23 mikron | 249.6 | FAZLA_STOK | C | 110245.0 |
| M-1003 | Euro palet 80x120 | 237.7 | FAZLA_STOK | B | 1640520.0 |

Kalan 7 kalem NORMAL durumda. OLU_STOK kaydı yok.

**T-03 tedarikçi skoru (tedarikci_sorgu çıktısı):** skor 36.3, seviye D, zamanında teslim %60.0, ortalama gecikme 2.4 gün, red %9.29, fiyat sapması %6.08, sipariş sayısı 40.

## Eksik veriler

Mevcut iki araçla şunları doğrulayamıyorum:

1. **Kapasite kullanımı:** IZM-01 için kapasite verisi araç çıktısında yok.
2. **T-03'ün hangi kalemleri tedarik ettiği:** Çıktılarda bu eşleşme yok. KRITIK kalemlerin T-03'e bağlı olup olmadığını bu yüzden söyleyemem.
3. **Teslimat süreleri ve tek tek gecikme kayıtları:** Yalnızca ortalama gecikme değeri var.
4. **Alternatif kaynaklar:** Bunu sorgulayacak bir araç yok.
5. **Ciro ve üretim etkisi:** Veri yok. Yalnızca stok değerleri elimizde.

Bu nedenle bağımlılık ve kritiklik ölçütlerini tam olarak değerlendiremiyorum.

## Kritiklik ölçütleri (veriyle karşılaştırma)

- **Stok tükenme riski:** Yüksek. Üç kalem KRITIK ve kapsamaları birkaç gün içinde tükenecek düzeyde. M-1005 A sınıfı ve stok değeri 106240.0 TL ile en önemli kalem.
- **Teslimat gecikmesi:** Yüksek. T-03 siparişlerinin %40'ı zamanında değil. Bu kalemlerin tedarikçisi T-03 ise risk doğrudan bu gecikmeden geliyor. Bağlantıyı doğrulamak gerekiyor.
- **Maliyet etkisi:** Orta. Fiyat sapması %6.08 ve red oranı %9.29. Maliyet etkisinin büyüklüğünü ölçmek için satın alma verisi gerekiyor.

## Aksiyon planı

1. **Kısa vadede:** M-1005, M-1002 ve M-1006 için acil sipariş durumunu kontrol et. Hangi siparişin açık olduğunu ve teslim tarihini netleştir.
2. **Kısa vadede:** T-03'ün bu üç kalemi tedarik edip etmediğini satın alma kaydından doğrula.
3. **Kısa vadede:** T-03 ile teslimat süreleri ve gecikme kayıtları üzerine görüşme yap. Ekteki taslak e-postayı gönder.
4. **Orta vadede:** Bu üç kalem için alternatif tedarikçi araştır. Veri bu konuda hiçbir şey söylemiyor, bu yüzden araştırma insan ekibine ait.
5. **Orta vadede:** IZM-01 kapasite kullanımı ve ciro etkisi verisini sisteme ekle, sonra kritiklik değerlendirmesini yenile.

## T-03'e taslak e-posta

**Konu:** Teslimat performansı ve iyileştirme planı talebi

Merhaba,

Son dönem tedarik kayıtlarımızı değerlendirdik. Siparişlerinizin yalnızca %60,0'ı zamanında teslim edilmiş. Ortalama gecikme 2,4 gün, red oranı %9,29 ve fiyat sapması %6,08 olarak kaydedildi. Bu değerler sizin tedarikçi skorunuzu 36,3 (seviye D) seviyesine indiriyor.

Stok güvenliğimizi korumak için aşağıdakileri talep ediyoruz:

1. Son dönem gecikme kayıtlarının dökümü ve gecikme nedenleri
2. Standart teslimat süresi ve sipariş onay süresi
3. Zamanında teslimi iyileştirmek için yazılı bir aksiyon planı
4. Red ve fiyat sapmalarının kaynağına ilişkin açıklama

Önümüzdeki hafta bu konuda bir görüşme planlamak istiyoruz. Dönüşünüzü bekliyoruz.

Saygılarımla,
[Ad Soyad]
[Şirket / Departman]

## İddialar

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "KRITIK"}, "deger": 3},
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "malzeme_no": "M-1002"}, "alan": "kapsama_gun", "deger": 3.3},
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "malzeme_no": "M-1005"}, "alan": "kapsama_gun", "deger": 3.8},
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "malzeme_no": "M-1006"}, "alan": "kapsama_gun", "deger": 4.1},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "skor", "deger": 36.3},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "zamaninda_pct", "deger": 60.0},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "ortalama_gecikme_gun", "deger": 2.4}
]
```
