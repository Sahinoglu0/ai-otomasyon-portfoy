# ROI ve karar varsayımları (TR)

> Bu tablodaki her sayı **varsayımdır** ya da ikincil kaynaktandır. Hiçbiri firma ölçümü değildir.
> Sonuç sayıları (TL) örnek veriyle hesaplanmıştır; gerçek bir şirketin sonucu değildir.
> Kaynak sütunu: **varsayım** (sahibi tarafından seçildi) · **ikincil** (kaynak bulundu, doğrulanmadı) · **örnek** (şirket büyüklüğü; firmaya göre değişir) · **kullanıcı** (kaynak yok; firma kendi değerini girmeli).

Veri: bu tablolar örnek veri üzerinde, karar ayar dosyasındaki değerler ±%20 oynatılarak ve ROI hesaplayıcısının duyarlılık ölçümüyle üretildi. Kaynak kod bu yayında kapalıdır; tablo yukarıdaki haliyle okunabilir.

## 1. Karar motoru (karar ayar dosyası)

Duyarlılık: değer ±%20 oynatıldığında **toplam maliyet** (örnek veri) ve ilk 10 önceliğin kaç kez değiştiği.

| Girdi | Değer | Kaynak | Makul aralık | Sonuca duyarlılık (±%20 ya da verilen değer) |
|---|---|---|---|---|
| Taşıma oranı (yıllık) | 0,10 | ikincil (APQC medyanı, doğrulanmadı) | 0,08–0,12; literatür üstü 0,25 | −%20: maliyet −%12,9 · +%20: +%12,1 · 0,25: **+%80,6** (ilk 10 aynı kalır; 2 kalemin önceliği değişir) |
| Sipariş maliyeti | 500 TL | varsayım | ±%20 | −%20: −%0,9 · +%20: +%1,5 |
| Stoksuzluk ceza oranı | 0,5 | varsayım | ±%20 | ±%20: ±%6,3 |
| Nominal tedarik süresi | 14 gün | varsayım | ±%20 | −%20: maliyet −%3,7, ACİL −2, ilk 10'un 8'i kalır, 7 kalemin önceliği değişir · +%20: +%3,5, ACİL +3 |
| Hizmet seviyesi (A/B/C/yedek) | 0,97 / 0,95 / 0,90 / 0,95 | varsayım | ±2 puan | −2 puan: **+%18,2** · +2 puan: −%13,8 |
| Para ağırlığı (önem puanı) | 40 | varsayım | ±%20 | sonuç değişmez (0,0%) |
| Alternatif geçiş ek gün | 7 | varsayım | tek değer | ölçülmedi (bu koşuda oynatılmadı) |
| Alternatifsiz ek gün | 30 | varsayım | tek değer | ölçülmedi (bu koşuda oynatılmadı) |
| Kalibrasyon hedef kapsama | 0,80 | varsayım | tek değer | ölçülmedi |
| Uyarı eşikleri | 95 / 55 / 1000 TL / 25000 TL | varsayım | tek değer | ölçülmedi (uyarı sayısını etkiler, ROI'yi değil) |

Okuma: en çok taşıma oranı ve hizmet seviyesi karar sonucunu oynatıyor. Bu iki varsayım, herhangi bir TL sonucu sunulmadan önce firma verisiyle ölçülmeli.

## 2. ROI hesaplayıcı

Değerler ±%20 oynatıldı (aralıklı girdilerde alt ve üst birlikte). Taban: alt **798.000 TL/yıl**, üst **3.296.000 TL/yıl**. Yüzdeler toplam ROI'deki değişimdir.

| Girdi | Değer | Kaynak | Makul aralık | Alt toplamın değişimi, % (girdi −%20 / +%20) | Üst toplamın değişimi, % (girdi −%20 / +%20) |
|---|---|---|---|---|---|
| Ortalama stok değeri | 50.000.000 TL | örnek | tek değer | ölçülemedi: bağlı fazla stok payı girdisi girilmemiş | ölçülemedi |
| Fazla + ölü stok payı | (girilmedi) | kullanıcı | tek değer | ölçülemedi | ölçülemedi |
| Fazla stoktan ilk yıl azaltılan pay | %10–25 | kullanıcı | %10–25 | ölçülemedi: bağlı fazla stok payı girdisi | ölçülemedi |
| Yıllık taşıma maliyeti (stok oranı) | %10–30 | ikincil (APQC; ders kitabı) | %10–30 | ölçülemedi: bağlı fazla stok payı girdisi | ölçülemedi |
| Yıllık satın alma hacmi | 200.000.000 TL | örnek | tek değer | −0,8 / +0,8 | −7,8 / +7,8 |
| Mükerrer / hatalı ödeme payı | %0,03–0,8 | ikincil (Berkeley, APQC) | %0,03–0,8 | −0,8 / +0,8 | −7,8 / +7,8 |
| Ödemeden önce yakalanan pay | %50–80 | kullanıcı | %50–80 | −0,8 / +0,8 | −7,8 / +7,8 |
| Yıllık gecikme / stoksuzluk olayı | 120 adet | örnek | tek değer | −4,5 / +4,5 | −3,3 / +3,3 |
| Olay başı maliyet | 15.000 TL | kullanıcı | tek değer | −4,5 / +4,5 | −3,3 / +3,3 |
| Erken uyarıyla önlenen pay | %10–30 | kullanıcı | %10–30 | −4,5 / +4,5 | −3,3 / +3,3 |
| Yıllık plansız duruş | 300 saat | örnek | tek değer | −7,5 / +7,5 | −5,5 / +5,5 |
| Saatlik üretim değeri | 20.000 TL/saat | kullanıcı (ikincil üst uç: 5.000–260.000) | tek değer | −7,5 / +7,5 | −5,5 / +5,5 |
| Erken uyarıyla azalan duruş | %5–15 | kullanıcı | %5–15 | −7,5 / +7,5 | −5,5 / +5,5 |
| Aylık elle kontrol vakası | 400 adet | örnek | tek değer | −7,2 / +7,2 | −3,5 / +3,5 |
| Vaka başı süre | 20 dk | kullanıcı | tek değer | −7,2 / +7,2 | −3,5 / +3,5 |
| Kısalan süre payı | %30–60 | kullanıcı | %30–60 | −7,2 / +7,2 | −3,5 / +3,5 |
| Tam yüklü saat maliyeti | 600 TL | örnek | tek değer | −7,2 / +7,2 | −3,5 / +3,5 |
| Aracın yıllık işletme maliyeti | 600.000 TL | örnek | tek değer | ölçülmedi: yalnız net ROI'yi etkiler, brüt aralığı değil | aynı |

Okuma: stok kolu, fazla stok payı girdisi girilmeden hesaplanamaz; şu an ROI'nin o kısmı sıfır. Bu girdi firma tarafından girilmeden stok kolunun TL sonucu sunulmamalı. En büyük oynatıcılar üst toplamda satın alma hacmi, kaçak payı ve yakalama payı (±%7,8); alt toplamda duruş kolu girdileri (±%7,5). Kaynağı olmayan kullanıcı girdileri de sonucu oynatıyor: yakalama payı üst toplamı ±%7,8, önlenen pay ±%3,3–4,5.

## 3. Ne ölçülmedi

- Karar motorunun alternatif tedarik süreleri, kalibrasyon ve uyarı eşikleri bu koşuda oynatılmadı.
- ROI'de kaynak bulunamayan girdiler (ör. olay başı maliyet, önlenen pay) için gerçek firma aralığı yok; bu tablodaki aralıklar yalnız tartışma içindir.
- [Tohum bandı](../kanit/olcum-tohum-bandi.json) bu tablonun girdilerini değiştirmez; yalnız örnek verinin tohumuna duyarlılığını gösterir.
