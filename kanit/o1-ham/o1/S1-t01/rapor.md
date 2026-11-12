# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IZM-01 deposunun stok, kapasite ve sevkiyat verilerini topla.
2. T-03 tedarikçisinin teslimat geçmişini, kapasite ve alternatif kaynak durumunu incele.
3. IZM-01 deposunun T-03 tedarikine bağımlılığını ve bu bağımlılığın operasyonel etkisini belirle.
4. Kritikliği belirleyen eşikleri tanımla: stok yeterliliği, teslimat gecikmesi, hizmet seviyesi ve maliyet etkisi.
5. Kritiklik değerlendirmesini yönetici özetine dönüştür.
6. Aksiyon planı için öncelikli iş kalemlerini ve sorumluluk alanlarını ayır.
7. Tedarikçiye iletilecek e-postanın amacını, talep edilen bilgileri ve yanıt tarihini netleştir.
8. Taslak e-postayı ilgili ekip onayına sun.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

## Kısa cevap

IZM-01 deposunda üç malzemede stok kapsaması çok kısa ve üçü de "KRITIK" durumda. T-03 tedarikçisinin performansı da zayıf: skoru 36.3, seviyesi D. Ancak T-03'ün hangi malzemeleri tedarik ettiği araç çıktılarında yok, bu yüzden IZM-01'in T-03'e bağımlılığını doğrulayamıyorum.

## Veri bulguları

**IZM-01 kritik kalemler** (stok_sorgu çıktısı):

| Malzeme | Ad | Stok | Birim | Kapsama (gün) | ABC | Stok değeri (TL) |
|---|---|---|---|---|---|---|
| M-1005 | Çember (PET) 12mm | 166.0 | RL | 3.8 | A | 106240.0 |
| M-1006 | Etiket rulosu 100x150 | 150.0 | RL | 4.1 | C | 14250.0 |
| M-1002 | Koli 40x30x30 | 76.0 | AD | 3.3 | C | 494.0 |

M-1005 en öncelikli kalemdir: ABC sınıfı A, stok değeri en yüksek ve kapsaması kısa.

**T-03 tedarikçisi** (tedarikci_sorgu çıktısı):
- Zamanında teslimat: %60.0
- Ortalama gecikme: 2.4 gün
- Red oranı: %9.29
- Fiyat sapması: %6.08
- Skor: 36.3, seviye: D
- Sipariş sayısı: 40

## Eşikler (değerlendirme ölçütleri)

- **Stok yeterliliği:** Kapsama süresi, tedarik süresinden kısaysa kritik kabul edilir.
- **Teslimat gecikmesi:** Zamanında teslimat oranı düşük ve ortalama gecikme birikiyorsa risk yüksektir.
- **Hizmet seviyesi:** Red oranı yüksekse teslim edilen malzeme kalitesi veya uygunluğu sorgulanır.
- **Maliyet etkisi:** Fiyat sapması ve stok değeri birlikte değerlendirilir; A sınıfı kalemlerde etki öncelikli sayılır.

Bu eşikler tanımlayıcıdır; kurum politikanızdaki sayısal değerlerle değiştirilmelidir.

## Yönetici özeti

IZM-01'de üç kalem kısa kapsamayla kritik durumda; en önemlisi A sınıfı M-1005 çember malzemesi. T-03 tedarikçisi, zamanında teslimatın %60.0 olduğu ve skorunun 36.3 (seviye D) olduğu için güvenilir bir kaynak değildir. Kritik kalemlerin T-03'ten tedarik edilip edilmediği doğrulanmalıdır. Bağımlılık doğrulanırsa T-03 kaynaklı gecikme doğrudan IZM-01 sevkiyat riskine dönüşür.

## Aksiyon planı

Önceliklendirme ve sorumluluk alanları için öneri:

1. **Hemen (acil):** M-1005, M-1006 ve M-1002 için sipariş durumu kontrolü ve acil tedarik seçenekleri. *Sorumlu: Satın alma.*
2. **Kısa vadede:** T-03 ile gecikme nedenlerini ve düzeltici faaliyet planını netleştirmek. *Sorumlu: Satın alma ve tedarik kalite.*
3. **Kısa vadede:** T-03 bağımlılığını malzeme bazında haritalamak ve alternatif kaynak durumunu araştırmak. *Sorumlu: Tedarik planlama.*
4. **Orta vadede:** Fiyat sapması (%6.08) için maliyet analizi yapmak. *Sorumlu: Finans ve satın alma.*
5. **Orta vadede:** Kritik kalemler için güvenlik stoku ve yeniden sipariş noktası revizyonu. *Sorumlu: Depo ve planlama.*

## Taslak e-posta (ilgili ekip onayına sunulacak)

**Konu:** IZM-01 depo tedarik riski – teslimat planı ve düzeltici faaliyet talebi

Sayın T-03 Yetkilisi,

IZM-01 deposunda bazı malzemelerde stok kapsaması kritik seviyeye inmiştir. Son dönemde teslimatlarımızda zamanında teslimat oranının düşük olması ve gecikme yaşanması nedeniyle durumun netleştirilmesine ihtiyaç duyuyoruz.

Aşağıdaki bilgileri kısa vadede iletmenizi rica ederiz:

1. Bekleyen siparişlerin malzeme bazında sevk takvimi ve teslim tarihleri
2. Son dönemdeki gecikmelerin kök nedenleri ve uygulanacak düzeltici faaliyetler
3. Mevcut fiyatlardaki sapmanın gerekçesi
4. Acil sevkiyat ve ek kapasite imkânı
5. Alternatif üretim veya sevkiyat planınız varsa paylaşılması

Bu bilgileri kısa vadede ve mümkünse bu hafta içinde almayı beklemekteyiz. Değerlendirme sonrası görüşme talep edebiliriz.

Saygılarımızla,
[Ad Soyad]
[Unvan / Birim]

*Not: Taslak gönderilmeden önce ilgili ekip onayı gereklidir.*

## Eksik veriler

- IZM-01 kapasite ve sevkiyat verileri araç çıktısında yok.
- T-03'ün hangi malzemeleri tedarik ettiği bilinmiyor; bağımlılık bu yüzden doğrulanamadı.
- T-03 için alternatif kaynak durumu bilinmiyor.

```iddialar
[
  {"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "KRITIK"}, "deger": 3},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "skor", "deger": 36.3},
  {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "zamaninda_pct", "deger": 60.0}
]
```
