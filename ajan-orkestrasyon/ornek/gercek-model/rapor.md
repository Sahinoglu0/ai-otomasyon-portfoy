# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret.

Durum: **tamamlandi**

## Planlayıcı

Elimde IZM-01 deposu ve T-03 tedarikçisine ait veri yok. Dosya, veritabanı ya da kayıt kaynağı bağlı değil, bu yüzden kritiklik nedenini doğrulayamam ve sayısal bir değerlendirme yapmayacağım. Aşağıda analizi alt görevlere bölüyorum. Verileri paylaşırsanız her adımı doldurabilirim.

## 1. Alt görevler

| # | Alt görev | Gerekli veri |
|---|---|---|
| A | T-03'ün tedarik payını belirle | T-03'ten gelen hacim ve toplam satın alma hacmi |
| B | IZM-01'in bağımlılığını ölç | Depo stok devir hızı, emniyet stoğu, IZM-01'e bağlı sipariş/sevkiyatlar |
| C | Alternatif tedarikçi durumunu kontrol et | T-03 dışında aynı kalemi tedarik eden kaynaklar, onay süreleri |
| D | Risk olayını tanımla | Gecikme, kalite sorunu, fiyat artışı, sözleşme/kapasite sorunu gibi tetikleyici |
| E | Etki süresini hesapla | Stokta kalınan gün sayısı, sipariş-teslim süresi (lead time) |
| F | Önceliklendir | A–E sonuçlarına göre kalem bazlı kritiklik sıralaması |

Kritiklik genelde şu üç soruyla netleşir: T-03'ün yerine ne kadar sürede ikame bulunabilir, bu sürede IZM-01'de stok tükenir mi, ve tükenirse hangi müşteri ya da üretim hattı etkilenir?

## 2. Aksiyon planı şablonu

- **Hemen (0–2 gün):** T-03 ile mevcut sipariş ve teslimat durumunu netleştir. IZM-01 güncel stok ve emniyet stoğu seviyesini kontrol et.
- **Kısa vade (1–2 hafta):** Alternatif tedarikçi için ön değerlendirme başlat. Kritik kalemler için sevkiyat önceliklendirmesi yap.
- **Orta vade (1–3 ay):** Çift kaynak stratejisi, sözleşme revizyonu ve güvenlik stoğu hedefini gözden geçir.
- **Sürekli:** T-03 için haftalık teslimat ve kalite takibi, IZM-01 için günlük stok izleme.

Süreler ve hedefler, verilerinize göre yeniden ayarlanmalıdır.

## 3. Tedarikçiye taslak e-posta

**Konu:** [Sipariş No] – Teslimat Durumu ve Kapasite Teyidi Talebi

Sayın [Yetkili Adı],

[Sipariş No / Kalem Kodu] kapsamındaki siparişlerimizle ilgili [IZM-01 deposuna yönelik] teslimat durumunu netleştirmek istiyoruz.

Aşağıdaki bilgileri paylaşmanızı rica ederiz:

1. Mevcut siparişlerin güncel teslimat tarihleri ve sevk durumu
2. [Tarih] itibarıyla üretim/sevkiyat kapasitesi
3. Gecikme ya da kısıt öngörüyorsanız nedeni ve tahmini süre
4. Olası aksaklıklara karşı alınacak önlemler

Kritik kalemlerde kesintiyi önlemek için [X] iş günü içinde yazılı geri dönüş almayı önemsiyoruz. Görüşmek üzere toplantı için uygun bir zaman önerebilir misiniz?

Saygılarımla,
[Ad Soyad]
[Unvan / Departman]
[İletişim Bilgisi]

---

Analizi somut hale getirmek için şunları paylaşabilirsiniz: IZM-01 stok ve sipariş verileri, T-03 sipariş geçmişi ve teslimat performansı, kalem listesi ve alternatif tedarikçi bilgileri. Bu veriler gelirse kritiklik değerlendirmesini ve taslağı kişiselleştirebilirim.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | reddedildi | stok_durumu {'depo': 'IZM-01', 'durum': 'KRITIK'}: iddia M-1002, M-1005, M-1006, Kule 3; stok_durumu {'depo': 'IZM-01', 'durum': 'FAZLA_STOK'}: iddia M-1001, M-1003, Kule 2 |
| 2 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

Denetçinin işaret ettiği iki sorgunun sonuçlarını araç çıktısından yeniden inceledim. Sayılar önceki çağrılardan gelen araç sonuçlarıyla aynı.

**IZM-01 – KRITIK (3 kalem)**

| Malzeme | Ad | Stok | Birim | Kapsama (gün) | ABC | Stok değeri (TL) |
|---|---|---|---|---|---|---|
| M-1002 | Koli 40x30x30 | 76.0 | AD | 3.3 | C | 494.0 |
| M-1005 | Çember (PET) 12mm | 166.0 | RL | 3.8 | A | 106240.0 |
| M-1006 | Etiket rulosu 100x150 | 150.0 | RL | 4.1 | C | 14250.0 |

**IZM-01 – FAZLA_STOK (2 kalem)**

| Malzeme | Ad | Stok | Birim | Kapsama (gün) | ABC | Stok değeri (TL) |
|---|---|---|---|---|---|---|
| M-1001 | Streç film 23 mikron | 1297.0 | RL | 249.6 | C | 110245.0 |
| M-1003 | Euro palet 80x120 | 3906.0 | AD | 237.7 | B | 1640520.0 |

Kritiklik nedeni olarak araçlardan doğrulanabilen tek bilgi, üç KRITIK kalemin 3.3–4.1 günlük kapsamasıdır. Bu, stokların yaklaşık bir hafta içinde tükeneceği anlamına gelmez; yalnızca mevcut stokun kaç gün yettiğini gösterir. T-03 tedarikçisinin bu kalemlerle ilişkisi ve kritikliğe etkisi henüz sorgulanmadı, bu yüzden doğrulanmış bir neden olarak yazamam. İsterseniz `tedarikci_sorgu` ile T-03 kaydını çekebilirim.

Düzeltilmiş iddia bloğu (yalnız araç çıktısındaki kayıt sayıları):

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "KRITIK"}, "deger": 3},
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "FAZLA_STOK"}, "deger": 2}
]
```
