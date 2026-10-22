# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IZM-01 deposunun stok seviyelerini ve kapasite kullanımını incele.
2. IZM-01 üzerinden karşılanan sipariş ve sevkiyat hacmini belirle.
3. IZM-01'e bağlı kritik ürün ve müşteri gruplarını çıkar.
4. T-03 tedarikçisinin teslimat performansını geçmiş verilerle değerlendir.
5. T-03'ün tedarik ettiği kalemleri ve bu kalemlerin ikame olanaklarını listele.
6. T-03 ile IZM-01 arasındaki tedarik bağlantısını ve bağımlılık düzeyini haz­ırla.
7. Gecikme veya kesinti senaryolarının IZM-01 stoklarına etkisini modelle.
8. Riskli kalemleri ve bu risklerin olası sonuçlarını önceliklendir.
9. Yönetim kararı için gerekli ek verileri ve eksik bilgileri tespit et.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## Kısa cevap

- **IZM-01 deposu:** Araç çıktısında üç kalem `KRITIK` olarak işaretli. Bunların kapsama süresi 3.3 ile 4.1 gün arasında. Araç bu etiketin gerekçesini vermiyor; etiketi kapsama sürelerine dayanarak yorumluyorum.
- **T-03 tedarikçisi:** Seviye `D`, skor 36.3. Zamanında teslimat oranı %60.0 ve ortalama gecikme 2.4 gün.
- **Bağlantı doğrulanmadı:** Araçlar T-03'ün hangi kalemleri tedarik ettiğini göstermiyor. Dolayısıyla T-03'ün IZM-01'deki kritik kalemlerle ilişkisi kanıtlanmış değil.

## Veri kapsamı

Mevcut iki araç yalnızca stok durumu ve tedarikçi skor kaydını döndürüyor. Plandaki 9 alt görevin büyük kısmı için veri yok.

| # | Alt görev | Durum |
|---|---|---|
| 1 | Stok ve kapasite kullanımı | Kısmen: stok ve kapsama var, kapasite verisi yok |
| 2 | Sipariş ve sevkiyat hacmi | Veri yok |
| 3 | Kritik ürün ve müşteri grupları | Veri yok |
| 4 | T-03 teslimat performansı | Kısmen: oranlar var, dönemsel trend yok |
| 5 | T-03 kalemleri ve ikameler | Veri yok |
| 6 | T-03–IZM-01 bağlantısı | Veri yok |
| 7 | Gecikme senaryoları | Veri yok, modelleme yapılamadı |
| 8 | Risk önceliklendirmesi | Kısmen, yalnız stok ve tedarikçi verisiyle |
| 9 | Eksik veri tespiti | Aşağıda |

## IZM-01 bulguları

**Kritik kalemler:**

| Malzeme | Stok | Kapsama (gün) | ABC | Stok değeri (TL) |
|---|---|---|---|---|
| M-1005 Çember (PET) 12mm | 166 RL | 3.8 | A | 106240.0 |
| M-1002 Koli 40x30x30 | 76 AD | 3.3 | C | 494.0 |
| M-1006 Etiket rulosu 100x150 | 150 RL | 4.1 | C | 14250.0 |

M-1005 hem kritik hem A sınıfı olduğu için öncelikli.

**Fazla stok (ayrı risk):**
- M-1003 Euro palet 80x120: 237.7 gün kapsama, 1640520.0 TL, B sınıfı.
- M-1001 Streç film 23 mikron: 249.6 gün kapsama, 110245.0 TL, C sınıfı.

Bu kalemlerde sermaye bağlanmış durumda; kritik kalemlerle aynı depoda, fakat ayrı bir yönetim konusu.

## T-03 bulguları

- Zamanında teslimat: %60.0
- Ortalama gecikme: 2.4 gün
- Red oranı: %9.29
- Fiyat sapması: %6.08
- Sipariş sayısı: 40
- Skor: 36.3, seviye D

## Aksiyon planı

**Hemen:**
- M-1005, M-1002 ve M-1006 için açık sipariş ve sevkiyat durumunu kontrol edin.
- T-03'ün hangi kalemleri tedarik ettiğini satınalma kayıtlarından doğrulayın.

**Kısa vadede:**
- T-03 ile performans ve düzeltici faaliyet görüşmesi yapın (taslak aşağıda).
- Kritik kalemler için alternatif tedarikçi araştırması başlatın. İkame verisi olmadığı için bu adım için kaynak bilgi eksik.

**Orta vadede:**
- M-1003 ve M-1001 için satın almayı gözden geçirin ve fazla stokun nasıl azaltılacağını değerlendirin.
- Kapasite, sevkiyat hacmi ve müşteri etkisi verilerini toplayıp gecikme senaryolarını modelleyin.

## Taslak e-posta (T-03'e)

**Konu:** T-03 teslimat performansı ve iyileştirme planı

Sayın T-03 Yetkilisi,

Tedarikçi performans kayıtlarımızı inceledik. Mevcut kayıtlara göre 40 sipariş üzerinden zamanında teslimat oranı %60.0, ortalama gecikme 2.4 gün, red oranı %9.29 ve fiyat sapması %6.08 olarak görünmektedir. Genel skorunuz 36.3 (seviye D) olarak kaydedilmiştir.

Bu durum IZM-01 deposunda bazı kritik kalemlerin tedarikinde risk oluşturmaktadır. Sizden aşağıdakileri en kısa sürede paylaşmanızı rica ediyoruz:

1. Açık siparişlerin güncel teslim tarihleri
2. Gecikme ve red nedenlerinin analizi
3. Düzeltici faaliyet planı ve uygulama takvimi
4. [Kalemler, satınalma doğrulaması sonrası eklenecek] için öncelikli teslimat taahhüdü

Önümüzdeki haftalarda bu konuyu görüşmek üzere bir toplantı planlamak isteriz.

Saygılarımızla,
[Adınız]
[Unvan]
[Şirket]

## Eksik bilgiler (yönetim kararı için)

1. T-03'ün tedarik ettiği kalemler ve IZM-01 ile eşleşmesi
2. IZM-01 kapasite kullanım oranı ve depo kapasitesi
3. Sipariş ve sevkiyat hacmi, kritik müşteri grupları
4. T-03 için dönemsel teslimat trendi (son dönem ile önceki dönem karşılaştırması)
5. Kritik kalemlerin ikame tedarikçi ve ürün bilgileri
6. Kritik kalemlerin mevcut açık sipariş miktarları


<br>

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "KRITIK"}, "deger": 3},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "skor", "deger": 36.3},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "zamaninda_pct", "deger": 60.0}
]
```
