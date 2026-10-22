# Tedarik krizi soruşturması

ETİKET: **ELLE YAZILMIŞ KAYIT** — model yanıtları kasetten oynatıldı; gerçek model çıktısı değildir.

Soru: IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret.

Durum: **tamamlandi**

## Planlayıcı

Alt görevler:
1. IZM-01 deposunda KRITIK durumdaki kalemleri say (stok_sorgu).
2. T-03 tedarikçisinin skorunu ve bileşenlerini al (tedarikci_sorgu).
3. Analist bulguları yorumlar ve aksiyon planı yazar; sayılar Denetçi tarafından Kule çıktısıyla karşılaştırılır.
4. Tedarikçi için yalnız taslak e-posta üretilir; gönderim yoktur.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | reddedildi | tedarikci_skoru {'tedarikci': 'T-03'}: iddia 58.0, Kule 36.3; dayanaksız sayı 58: metinde var, Kule çıktısında ve hesabında yok |
| 2 | kabul | — |

## Son Analist yanıtı (denetimden geçti)

IZM-01 deposunda KRITIK durumda 3 kalem var: M-1002 Koli 40x30x30, M-1005 Çember (PET) 12mm, M-1006 Etiket rulosu 100x150. Kapsama süreleri 3,3 ile 4,1 gün arasında.

T-03 tedarikçisinin skoru 36,3 (seviye D): zamanında teslim %60, red %9,29, fiyat sapması %6,08.

Aksiyon planı: kritik kalemler için acil sipariş ver; T-03 ile teslimat performansını görüş ve red oranını azaltmak için bir iyileştirme planı iste.

Taslak e-posta (gönderilmez): Konu: Teslimat performansı hakkında. Merhaba, son dönem teslimatlarınızda zamanında teslim oranının düşük seyrettiğini gözlemledik; red oranı ve gecikmeler için bir iyileştirme planı paylaşmanızı rica ederiz.

```iddialar
[{"modul": "stok_durumu", "filtre": {"depo": "IZM-01", "durum": "KRITIK"}, "deger": 3}, {"modul": "tedarikci_skoru", "filtre": {"tedarikci": "T-03"}, "alan": "skor", "deger": 36.3}]
```
