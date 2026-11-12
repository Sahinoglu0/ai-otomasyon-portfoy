# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IZM-01 deposunun stok seviyelerini, kapasite kullanımını ve son dönem hareket verilerini incele.
2. IZM-01 deposunun hangi ürün, müşteri ve sevkiyat akışları için kritik olduğunu belirle.
3. IZM-01 deposunda yaşanan gecikme, kesinti ya da taşma riski olan dönemleri tespit et.
4. T-03 tedarikçisinin sipariş, teslimat süresi ve kalite performans verilerini incele.
5. T-03 tedarikçisinin tek kaynak olup olmadığını ve alternatif tedarikçi durumunu değerlendir.
6. T-03 tedarikçisinin IZM-01 deposuna bağımlılığını ve bu bağımlılığın yarattığı riski analiz et.
7. Riskleri etki ve olasılık açısından önceliklendir.
8. Aksiyon planı için gerekli adımları, sorumluları ve tamamlanma sürelerini hazırla.
9. T-03 tedarikçisine gönderilecek taslak e-postanın içeriğini ve ana mesajlarını belirle.
10. Taslak e-postayı sonuç ve takip adımlarıyla birlikte son haline getir.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## Kısa cevap

IZM-01 deposunda üç kalem **KRITIK** durumda ve bunların kapsama süreleri çok kısa. T-03 tedarikçisinin skoru **36.3** ile **D** seviyesinde. Veriler bu iki durumun neden önemli olduğunu gösteriyor, ancak T-03'ün IZM-01 kalemlerini tedarik edip etmediği araç çıktısında yok. Bu bağlantıyı doğrulamak için ek veri gerekiyor.

## IZM-01 bulguları

| Malzeme | Ad | Stok | Kapsama (gün) | Durum | ABC | Stok değeri (TL) |
|---|---|---|---|---|---|---|
| M-1005 | Çember (PET) 12mm | 166.0 RL | 3.8 | KRITIK | A | 106240.0 |
| M-1002 | Koli 40x30x30 | 76.0 AD | 3.3 | KRITIK | C | 494.0 |
| M-1006 | Etiket rulosu 100x150 | 150.0 RL | 4.1 | KRITIK | C | 14250.0 |

- **M-1005** en öncelikli kalem. A sınıfında olması ve kapsamasının 3.8 gün olması, bu kalemin tükenmesinin etkisini büyütüyor.
- **M-1002** ve **M-1006** de kritik, ancak stok değerleri düşük.
- **Fazla stok:** M-1001 (kapsama 249.6 gün) ve M-1003 (kapsama 237.7 gün, B sınıfı, 1640520.0 TL). Bu kalemler serbest sermaye ve depo alanı açısından ayrıca incelenmeli.

## T-03 bulguları

- Zamanında teslim oranı: **%60.0**
- Ortalama gecikme: **2.4 gün**
- Red oranı: **%9.29**
- Fiyat sapması: **%6.08**
- Skor: **36.3**, seviye: **D**
- Sipariş sayısı: **40**

## Araçla doğrulanamayan konular

Aşağıdaki başlıklar için mevcut araçlarım veri sağlamıyor:
- IZM-01 hareket verileri, kapasite kullanımı ve gecikme/taşma dönemleri
- Müşteri ve sevkiyat akışlarında kritiklik
- T-03'ün tek kaynak olup olmadığı ve alternatif tedarikçi durumu
- T-03'ün hangi IZM-01 kalemlerini tedarik ettiği

Bu nedenle "IZM-01 neden kritik" sorusu yalnızca stok kapsamı açısından yanıtlanabiliyor.

## Risk önceliği

1. **Yüksek:** M-1005 kaleminin kısa sürede tükenmesi (A sınıfı, 3.8 gün kapsama).
2. **Yüksek:** M-1002 ve M-1006 kalemlerinin tükenmesi (3.3 ve 4.1 gün kapsama).
3. **Orta:** T-03'ün düşük performansı (skor 36.3, zamanında teslim %60.0). Tedarik kesintisi olasılığı var, ancak IZM-01 ile bağlantısı henüz doğrulanmadı.
4. **Düşük:** Fazla stoklu kalemlerin sermaye bağlaması.

## Aksiyon planı

| # | Adım | Sorumlu (rol) | Süre |
|---|---|---|---|
| 1 | M-1005, M-1002 ve M-1006 için açık sipariş ve yoldaki mal durumunu kontrol et | Satın alma | Hemen |
| 2 | M-1005 için acil sipariş veya ikame tedarik seçeneklerini değerlendir | Satın alma ve operasyon | Hemen |
| 3 | T-03'e teslimat taahhüdü ve gecikme nedenleri için yazılı bildirim gönder | Tedarik yönetimi | Hemen |
| 4 | T-03'ün IZM-01 kalemlerindeki payını ve tek kaynak durumunu belirle | Tedarik yönetimi | Kısa vadede |
| 5 | Kapasite ve hareket verilerini topla, taşma ve kesinti dönemlerini tespit et | Depo yönetimi | Kısa vadede |
| 6 | M-1001 ve M-1003 için fazla stok azaltma planı hazırla | Planlama | Kısa vadede |
| 7 | T-03 performansını haftalık izle, alternatif tedarikçi değerlendirmesini başlat | Tedarik yönetimi | Düzenli olarak |

## Taslak e-posta

**Konu:** T-03 teslimat performansı ve acil teslimat planı talebi

Sayın [Tedarikçi yetkilisi],

Son dönem teslimat performansınızı inceledik. Zamanında teslim oranı **%60.0** olarak ölçüldü ve ortalama gecikme **2.4 gün** seviyesinde. Tedarikçi skorunuz **36.3** (seviye D) olarak görünüyor.

Depomuzda bazı kalemlerin stok kapsaması kısalmış durumda. Bu nedenle sizden aşağıdakileri talep ediyoruz:

1. Açık siparişlerimiz için güncel teslimat tarihlerini bildirmenizi,
2. Gecikmelerin nedenlerini ve alınan önlemleri yazılı olarak paylaşmanızı,
3. Acil ihtiyaç duyulan kalemler için hızlandırılmış teslimat seçeneklerini değerlendirmenizi.

Bu bilgileri en kısa sürede almak istiyoruz. Görüşmek üzere.

Saygılarımızla,
[Ad Soyad]
[Unvan], [Şirket]

**Takip adımları:** E-postanın gönderilmesinin ardından yanıt süresini kontrol et. Yanıt gelmezse telefonla ulaş. Gelen teslimat tarihlerini M-1005, M-1002 ve M-1006 kalemleriyle eşleştir ve kapsama süresini yeniden hesapla.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "KRITIK"}, "deger": 3},
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "FAZLA_STOK"}, "deger": 2},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "skor", "deger": 36.3},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "zamaninda_pct", "deger": 60.0}
]
```
