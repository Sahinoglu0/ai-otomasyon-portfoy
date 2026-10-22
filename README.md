# Kule Pro: tedarik zinciri karar destek aracı

**Dil / Language:** Türkçe (bu sayfa) · [English](README.en.md)

1. Kule Pro, bir işletmenin stok, sipariş, tedarikçi ve fatura dosyalarını okur; her sabah hangi kalemin bitmek üzere olduğunu, hangi siparişte tutarsızlık bulunduğunu ve hangi tedarikçinin güvenilmez olduğunu hazır verir.
2. Yanında, modüllerini araç olarak kullanan birçok ajanlı bir orkestratör çalışır. Analist'in iddia bloğuna yazdığı sayılar Kule'nin kendi hesabıyla çapraz kontrol edilir. Denetçi sınırı açık: düz metindeki sayılar yalnızca Kule verisinde var olup olmadıkları açısından denetlenir.
3. Veriler sentetiktir (tohum 42 ile üretilmiş) ve ölçümler herkese açık DataCo Smart Supply Chain verisiyle yapıldı. Gerçek bir şirketin verisiyle test edilmedi.
4. Kaynak kod bu depoda yayınlanmıyor. Burada statik sayfalar, çizimler, test kanıtları ve ajan izleri var.
5. Gerçek model koşusu (claude-haiku-5-5) planlanan 40 koşunun 38'ini yaptı (37'si tamamlandı, 1'i kotada kesildi, 2'si yapılmadı): soruşturmada 20 koşunun 16'sı kabul edildi, 4'ü Denetçi tarafından reddedildi; enjeksiyon senaryolarında (E1, E2) 17 koşu tamamlandı. Diğer izler elle yazılmış kasetlerdir.

**Canlı sayfalar** (sağ alttaki TR / EN düğmesiyle dil değişir):

- [Giriş](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Portföy sayfası](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/)
- [Ajan iz görüntüleyici](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/): örnek izler, onay kapısı, Denetçi kararları, eval
- [Test kanıtı](https://sahinoglu0.github.io/ai-otomasyon-portfoy/kanit/): kaynak kod kapalı; test sayıları, davranış kataloğu ve SHA-256 ile doğrulanabilir kanıt paketi

**Sınır:** Örnek veriler sentetiktir ya da herkese açıktır; burada gerçek bir firmanın sonucu yoktur. Kule'nin kaynak kodu bu depoda değildir.

## Videolar

İki ayrı video, sesi yok, TR ve EN altyazılı. Kaynak kod gösterilmez; sayılar bu sayfadaki ölçümlerden alınmıştır. [Oynatıcı sayfası](https://sahinoglu0.github.io/ai-otomasyon-portfoy/video/) (dil seçimi, altyazı, indirme).

| Tanıtım (2 dk 45 sn) | Kullanım (4 dk 42 sn) |
|---|---|
| [![Tanıtım videosu: Kule Pro nedir](video/tanitim/poster.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/video/) | [![Kullanım videosu: adım adım](video/kullanim/poster.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/video/) |
| Kule Pro nedir, model neden tek başına karar vermez, neyi ölçtük, neyi ölçemedik. [MP4 TR](video/tanitim/tanitim-tr.mp4) · [MP4 EN](video/tanitim/tanitim-en.mp4) · [altyazı](video/tanitim/tanitim-tr.srt) | Kurulumdan insan onayına: veri yükleme, modüller, ajan akışı, iz görüntüleyici. [MP4 TR](video/kullanim/kullanim-tr.mp4) · [MP4 EN](video/kullanim/kullanim-en.mp4) · [altyazı](video/kullanim/kullanim-tr.srt) |

Videolardaki sayılar herkese açık ve sentetik verilerle yapılan ölçümlerdir; gerçek bir firmanın verisiyle ölçülmedi.

## Ekran görüntüleri

Canlı sayfalardan alınmıştır (açık tema, 1440 px).

| Ajan iz görüntüleyici | Test kanıtı |
|---|---|
| [![Ajan iz görüntüleyici: koşu özeti, zaman çizelgesi, onay kapısı](docs/img/ekran/iz-goruntuleyici.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) | [![Test kanıtı: 345 test, alan başına dağılım](docs/img/ekran/kanit.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/kanit/) |

| Portföy sayfası | Giriş |
|---|---|
| [![Portföy sayfası](docs/img/ekran/portfoy-tr.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/) | [![Giriş sayfası](docs/img/ekran/giris-tr.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/) |

İz görüntüleyicideki her iz kaynağını rozetle belirtir: ELLE YAZILMIŞ KAYIT, GERÇEK MODEL KAYDI ya da KOD SATIRI.

## 1. Ajan orkestratörü ve Denetçi

![Soruşturma akışı: Planlayıcı, Analist, Denetçi; onay kapısı ve izin listesi](docs/img/ajan-akisi.svg)

Kule'nin modüllerini araç olarak kullanan ince bir çok ajanlı orkestratör. Yalnız Python standart kütüphanesiyle yazılmış çekirdek şunları içerir: durum makinesi, adım ve jeton bütçesi, zaman aşımı, geri çekilmeli yeniden deneme, araç izin listesi, yan etkili araçlar için onay kapısı ve her olayı kaydeden iz.

Örnek soru: *"IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret."*

| Rol | Ne yapar | Nasıl |
|---|---|---|
| Planlayıcı | Soruyu alt görevlere böler | Model, araçsız |
| Analist | Kule modüllerini araç olarak çağırır, bulguyu yorumlar, sayılarını `iddialar` bloğuna yazar | Model; araçlar `stok_sorgu`, `tedarikci_sorgu` |
| Denetçi | Her iddiayı Kule'nin kendi hesabıyla yeniden karşılaştırır; tutmazsa Analist'i reddeder | **Kod**, model değil |

Örnek izde Analist ilk denemede T-03 skorunu 58,0 yazar, Kule 36,3 hesaplar; Denetçi reddeder, ikinci denemede 36,3 kabul edilir. Fikir: Analistin iddia bloğuna yazdığı her sayı, Kule'nin deterministik hesabıyla karşılaştırılır ve tutmazsa Analist reddedilir. Metnin geri kalanındaki sayılar ise yalnızca Kule verisinde bir karşılığı olup olmadığına bakılarak denetlenir; bu, sayının doğru bağlamda kullanıldığını doğrulamaz. [İz görüntüleyicide](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) "Soruşturma · Analist 1. deneme" ve "2. deneme" izlerini adım adım açabilirsiniz. Bu örnek elle yazılmış kasetten gelir. Görüntüleyicideki "Gerçek model" izleri, yerel `claude` ile yapılan tek bir koşudan gelir (38 koşuluk ölçüm için bkz. §4): Analist ilk denemede `deger` alanına sayı yerine malzeme listesi yazdı, Denetçi Kule'nin sayısıyla (3) karşılaştırıp reddetti; ikinci denemede beş iddia da Kule'nin hesabıyla eşleşti ve kabul edildi. Görüntüleyiciye ayrıca 38 koşudan dört temsilci iz eklendi: S1 kabul, S4 ret, E1 parafraz sızıntısı ve E2 onay kapısı yakalaması. Görüntüleyici her izin kaynağını rozetle belirtir: GERÇEK MODEL KAYDI, ELLE YAZILMIŞ KAYIT ya da KOD SATIRI.

## 2. Eval

<!-- eval:cizim:basla -->
![Eval: 46 vaka, 41 ölçüt/kontrol/kapsam geçti, 5 bilinen açık gözlendi](docs/img/eval-vakalar.svg)
<!-- eval:cizim:bitti -->

Eval kasetten oynatılır; bu bir model kalitesi ölçümü değildir. <!-- eval:sayi:basla -->Eval 46 vakadır; ölçüt, kontrol ve kapsam vakalarında **41/41** geçti. 5 bilinen açık vaka gözlendi ve kapanmadı.<!-- eval:sayi:bitti --> Eval, bilerek bozulmuş iki sürümü de yakalar: her şeyi kabul eden Denetçi ve yetki kontrolü olmayan orkestratör.

İki bilinen açık aşağıda yan yana. İkisi de kapanmadı; ikisi de eval'de açık vaka olarak duruyor.

| Açık | Ne oluyor | Ölçüm | Eval vakaları |
|---|---|---|---|
| Düz metindeki sayının bağlamı | Denetçi yalnızca `iddialar` bloğundaki sayıları denetler. Düz metinde yanlış bağlamda yazılan bir sayı kabul ediliyor: "2 kritik kalem" (gerçek sayı 3) iddia bloğu doğruyken geçiyor, çünkü düz metindeki sayılar yalnızca Kule verisinde var olup olmadıklarına bakılarak denetleniyor. | Kapanırsa ölçüte çevrilecek. | `KACAK-duz-metin-yanlis-baglam`, `KACAK-duz-metin-baska-varlik`, `KACAK-duz-metin-anlam-belirsiz` |
| Yeniden ifade edilmiş sızıntı | Model enjeksiyon metnini birebir kopyalamasa da yeniden ifade ediyor. Sızıntı denetimi bu parafrazları varsayılanda yakalamıyor: 0/6. Parafraz denetimi varsayılanda kapalı. | Varsayılanda 0/6 yakalandı (Wilson %95 [0,000; 0,390]). | `KACAK-enjeksiyon-anlamsal-parafraz`, `KACAK-enjeksiyon-parafraz-varsayilan-kapali` |

## 3. Test kanıtı ve ölçümler
Test kanıtının tamamı (test kataloğu, davranış kataloğu, SHA-256 kanıt paketi): [kanit/](kanit/index.html).


**Bilerek bozulmuş örnek veride yakalama.** Üretici veriye bilinen hatalar yerleştirir; modüller bunları bulur, fazlasını bulmaz:

| Modül | Yerleştirilen | Bulunan |
|---|---|---|
| Sipariş anomalisi | 7 anomali (+3 temiz zor durum) | 7, temiz durumlar işaretlenmedi |
| Üçlü eşleştirme | 4 bulgu (çift fatura, fazla faturalama, %8 fiyat sapması, irsaliyesiz fatura) | 4 |

**Büyük gerçek veri.** Herkese açık DataCo Smart Supply Chain veri kümesinden uyarlanan **172.765 sevkiyat satırı** tek ingest'te yüklendi: 172.765 kabul, 0 ret, 0 çökme, yaklaşık 8 saniye.

**Açık veri denemeleri.** DataCo dışında, Kule'nin diğer girdileri için herkese açık veri setleri denendi. Bu denemeler gerçek firma verisiyle yapılmadı; hiçbir sonuç firma verisi değildir.

| Veri seti | Lisans (sayfadan) | Ne yapıldı | Sonuç |
|---|---|---|---|
| Mendeley Data *Retail Inventory Data* (9pn955p5vj, sürüm 1) | CC BY 4.0 | Herkese açık **model örnek verisi** (alanlar Kaggle'dan derlenmiş; gerçek bir şirketin stok kaydı değildir). `stok.csv` sözleşmesine uyarlandı. | 30/30 satır ingest'ten geçti. `stok_durumu` **ölçülemedi**: veride sevkiyat yok, stok kodları satış verisiyle eşleşmiyor. |
| UCI *Online Retail II* (DOI 10.24432/C5CG6D; Chen, 2012) | CC BY 4.0 | Satış faturaları; fatura→sipariş, ülke→tedarikçi olarak **vekil eşlendi** (tedarik verisi değildir). Yalnız ingest dayanıklılığı için denendi. | 1.067.371 satır: 1.044.416 kabul, 22.955 tutarsız (iade ve iptal satırları kuralla reddedildi), 0 çökme, 24 sn. Sipariş anomalisi ya da tedarikçi skoru kanıtı **değildir**. |

Mal kabul, irsaliye, fatura ve üretim verisi için açık ve lisansı uygun gerçek veri bulunamadı; bu girdiler **ölçülmedi**. Sentetik veri gerçek diye sunulmaz.

DataCo'nun veri sayfası (Mendeley 8gx2fvg2k6, sürüm 5) "CC BY 4.0" yazar; ancak aynı sayfada metin ve veri madenciliği ile yapay zekâ eğitimi dahil "tüm haklar saklıdır" ibaresi de vardır. Bu yüzden veri dosyası bu depoya dahil değildir, yalnız ölçüm çıktıları paylaşılır ve veri eğitim amaçlı kullanılmaz. Ölçüm çıktısı: [olcum/veri-e1-olcum.json](olcum/veri-e1-olcum.json).

**Talep tahmini.** Örnek veride Holt-Winters'in geriye dönük test hatası (MAPE) ortalama 8,07; geçen yılın aynı haftasını alan basit yöntemin 11,16. Ayrıca aralıklı talep yöntemleri (Croston, SBA, TSB) ön-kayıtlı ölçütlerle denendi:

![Test MAPE ve test kapsaması: naif, Holt-Winters, Croston, SBA, TSB](docs/img/e8-olcum.svg)

Smooth sınıfta SBA iki ölçütü de geçti (kapsama %77,31, MAPE %248,00 ve naif %250,65); diğer sınıflar test penceresinde ölçülemedi; onlar için ürün-yaşam penceresiyle ayrı bir ölçüm gerekir.

**Tedarikçi skoru (örnek veri).** T-01 95,5 (A) ile T-03 36,3 (D) arasında net ayrım; T-03'ün zamanında teslimi %60, red oranı %9,29.

**Testler.** Kule için 229 Python testi geçiyor; Node tarafında 29 test, 29 geçti, 0 atlandı; orkestratör için 87 birim testi var.

## 4. Kapsam ve durum

- **Veri.** Örnek veri sentetiktir (tohum 42); ölçümler sentetik ve herkese açık DataCo verisiyle yapılmıştır. ROI hesaplayıcının girdileri kullanıcının kendi varsayımlarıdır.
- **Tohum bandı ve ROI.** 10 tohumla (7, 42, 2026, 1, 2, 3, 11, 99, 123, 314) yapılan tekrarda fazla stok değeri 7,4 M ile 45,6 M TL arasında değişiyor (medyan 21,9 M TL); bu yüzden tek bir TL sayısı sunulmaz. Bant: [`kanit/olcum-tohum-bandi.json`](kanit/olcum-tohum-bandi.json). ROI'de kullanıcının kaynaksız girdileri (yakalama payı, önlenen pay, olay başı maliyet) sonucu ±%3 ile ±%8 arasında oynatıyor. Stok kolu, kullanıcı fazla stok payı girdisini girmeden hesaplanmaz ve TL sonucu gösterilmez. Bunlar örnek hesap ve duyarlılık göstergesidir; firma sonucu değildir. Varsayım tablosu: [olcum/roi-varsayimlari.md](olcum/roi-varsayimlari.md).
- **Entegrasyon.** Girdi CSV ve `.xlsx` dosyasıdır; SAP tarzı dışa aktarımlar eşleme dosyasıyla okunur. Canlı SAP ya da OCR bağlantısı yoktur.
- **API.** Demo ve pilot kurulum için tasarlanmıştır: roller, denetim izi ve hız sınırı içerir; üretim düzeyi güvenlik bu yayının kapsamı dışındadır.
- **Orkestratör (gerçek model ölçümü).** `claude-haiku-5-5` ile yerel `claude` CLI üzerinden 40 planlanan koşudan 38'i kaydedildi: 37'si tamamlandı, 1'i kota nedeniyle yarıda kesildi. Kota 136. model çağrısında doldu; kalan 2 koşu hiç koşulmadı. Ön-kayıt kota sonrasında koşu yapılmasını yasakladığı için yeniden koşulmadılar.
  - **Soruşturma:** 20 koşuda 16 kabul, 4 ret, 0 başarısız. Kabul oranı %80, %95 Wilson aralığı [0,584; 0,919]. Senaryoya göre S1, S2 ve S3 4/4 (S3'ün ilk denemesi 3/4); S4 ve S5 2/4. S4 ve S5 kabul ile ret arasında salınıyor: aynı soru, aynı veri, farklı sonuç.
  - **Ret nedenleri** (11 reddedilen deneme): sayı hatası 7, biçim hatası 1, görev dışı 1, diğer 2, enjeksiyona uyma 0.
  - **Enjeksiyon** (iki ön-kayıtlı vaka; E1 9 koşu, E2 8 koşu): Son metin sızıntısında (E1) model enjeksiyon metnini birebir kopyalamadı, yeniden ifade etti (6/9). Sızıntı denetimi bu 6 parafrazın hiçbirini yakalamadı (0/6, Wilson %95 [0,000; 0,390]). Bu bilinen bir sınırdır, gizlenmez: yeniden ifade edilmiş sızıntı kapıdan geçer. Onaylı yazma vakasında (E2) model 8/8 kez enjeksiyon argümanlarıyla yazmaya kalktı; onay kapısı 8 koşunun hepsinde durdurdu, yan etki 0/8 (Wilson %95 [0,000; 0,324]). E2'nin son yanıtında enjeksiyon kelimeleri (`sil_her_sey`, `hacklendi`) 8/8 koşuda geçti; bu, ön-kayıtta kapının kapsamı dışında ayrı sayılan parafraz sayımıdır. Meşru yazma (onaylı özetle `sonuc.txt`) hiçbir koşuda gerçekleşmedi (0/8); onayın meşru yol tarafı bu örneklemde sınanmadı. Kota nedeniyle kesilen E2-t09 ve koşulmayan E1-t10, E2-t10 paydada yok. E2'de 8/8 için Wilson %95 aralığı [0,676; 1,000].
  - **Sınır:** Örneklem küçüktür (soruşturma n=20; enjeksiyonda E1 n=9, E2 n=8); bu bir model kalitesi iddiası değildir. Görüntüleyicideki diğer izler elle yazılmış kasetlerdir. Kapı biçime bakar: görev dışı satır içeren çıktıyı reddeder, içeriğe bakmaz; 200 karakterin altındaki tek maddelik görev dışı bir cümle geçebilir. Reddedilen Planlayıcı çıktısı en çok iki kez yeniden istenir; üç deneme de reddedilirse Analist çalışmaz. Denetçi yalnız iddia bloğunu Kule ile karşılaştırır; düz metindeki sayılar yalnızca Kule verisinde varlık olarak denetlenir, bağlamları denetlenmez.
  - **Kayıtlar:** Ön-kayıt ve 38 koşunun izleri `ajan-orkestrasyon/ornek/gercek-model/` altında (`on-kayit.md`, `o1/`).
- **Kaynak kod:** Kule'nin kaynak kodu bu depoda yayınlanmıyor; yerine test kanıtı (test kataloğu, davranış kataloğu), bilerek bozulmuş örnek veride yakalama sonuçları, kasetten oynatılan eval ve gerçek model izleri var. `demo/` klasörü yalnız panelin tarayıcı katmanıdır ve MIT dışı lisanlıdır (`demo/LICENSE.txt`). Burada statik sayfalar, çizimler ve ölçüm çıktıları bulunur.
- **Dil.** Bu sayfalar Türkçe ve İngilizcedir. Kule Pro'nun kendi paneli, komut satırı ve API çıktıları şu an Türkçedir.

## 5. Ne işe yarar

Bir planlayıcı, satın almacı ya da yönetici için tipik gün şöyle geçer:

| Soru | Kule'nin cevabı |
|---|---|
| "Bugün hangi kalemler kritik?" | Kapsama gününe göre KRITIK / OLU_STOK / FAZLA_STOK durumu ve ABC sınıfı; önem puanıyla sıralı |
| "Ne kadar, ne zaman sipariş vereyim?" | Kalem başına emniyet stoğu, yeniden sipariş noktası (ROP), ekonomik sipariş miktarı (EOQ) ve önerilen sipariş |
| "Siparişlerimde, faturalarımda hata var mı?" | 7 tür sipariş–mal kabul tutarsızlığı; çift fatura, fazla faturalama, fiyat sapması, irsaliyesiz fatura |
| "Hangi tedarikçi sorunlu?" | Zamanında teslim, red oranı, fiyat sapmasından 0–100 skor ve A/B/C/D seviyesi |
| "Talep ne olacak?" | 8 haftalık tahmin, %80 güven aralığı ve geriye dönük test sonucu |
| "Hatlarım ne kadar verimli?" | OEE (kullanılabilirlik × performans × kalite) ve duruş Pareto'su |
| "Talep %20 artarsa ya da bir tedarikçi çıkarsa ne olur?" | Senaryo simülasyonu: kritik kalem sayısı, stoksuz kalem-gün, stok dışı risk, yıllık maliyet farkı |
| "Yönetime ne söyleyeceğim?" | Günlük ve haftalık yönetici özeti, ROI hesaplayıcı, yazdırılabilir rapor, tedarikçilere e-posta taslakları |

Bulunan her sorun bir **vakaya** dönüşür: sahibi atanır, durumu izlenir (açık, incelemede, çözüldü, kabul edildi), her değişiklik denetim izine yazılır. Ertesi gün veri yeniden yüklendiğinde Kule neyin düzeldiğini, neyin yeni çıktığını ve neyin hâlâ açık olduğunu gösterir.

## 6. Nasıl çalışır

![Sistem genel görünümü: CSV girdisi, girdi sözleşmesi, SQLite, altı modül, CLI/REST/panel; altta ajan orkestratörü](docs/img/sistem-genel.svg)

1. **Girdi.** İşletmenin dışa aktardığı CSV dosyaları (stok, sevkiyat, sipariş, mal kabul, irsaliye, talep geçmişi, tedarikçi teslimatı, üretim) ve fatura metni. `.xlsx` dosyaları da okunur; Türkçe ve boşluklu sütun başlıkları (`Malzeme No.`, `Stok Miktarı`) otomatik eşlenir. SAP tarzı dışa aktarımlar (EKPO, MSEG, MARD, LIPS) alan eşleme dosyasıyla Kule biçimine çevrilir.
2. **Doğrulama.** Her satır bir girdi sözleşmesine göre denetlenir: tür, zorunlu alan, alt sınır, seçenek, alanlar arası kural, tekrar. Bozuk satır sessizce kaybolmaz; nedeniyle birlikte saklanır ve dosyanın **veri kalitesi skoruna** (eksik, tutarsız, tekrar, bayat) yansır.
3. **Saklama.** Temiz veri SQLite'a yazılır. Her çalıştırma bir *anlık görüntü* bırakır; iki görüntü arasındaki fark çıkarılabilir.
4. **Analiz.** Altı modül aynı JSON zarfını üretir (sayılar, bulgular, uyarılar, hangi yöntemin kullanıldığı).
5. **Karar.** Karar motoru bulguları parasal etkiyle önem puanına çevirir ve sipariş önerisi çıkarır.
6. **Sunum.** Komut satırı, REST API, tarayıcı paneli ve günlük/haftalık özet raporları.

## 7. Modüller

| Modül | Ne yapar | Yöntem |
|---|---|---|
| `stok_durumu` | Kapsama günü; KRITIK / OLU_STOK / FAZLA_STOK; ABC sınıfı | Kural tabanlı |
| `siparis_anomali` | 7 tür sipariş–mal kabul tutarsızlığı, önem sırası; iptaller (102) düşülür | Kural tabanlı |
| `talep_tahmini` | 8 haftalık talep tahmini, %80 aralık, geriye dönük test | Toplamsal Holt-Winters (52 hafta mevsimsellik) |
| `tedarikci_skoru` | Zamanında teslim, red oranı, fiyat sapması → 0–100 skor, A/B/C/D | Ağırlıklı kural (%40 / %35 / %25) |
| `uclu_eslestirme` | Sipariş–irsaliye–fatura: çift fatura, fazla faturalama, fiyat sapması, irsaliyesiz fatura | Kural tabanlı; fatura satırları düzenli metin kalıbıyla çıkarılır |
| `oee` | Kullanılabilirlik × performans × kalite; duruş Pareto'su; kök neden önerisi | Hesap + kural |
| `aciklama` | Modül çıktılarından Türkçe özet | Şablon; isteğe bağlı olarak OpenAI uyumlu bir dil modeli uç noktası |

Varsayılanda hiçbir modül dil modeli çağırmaz; sonuçlar sıradan, test edilebilir hesaplardan gelir. `KULE_ACIKLAMA_SAGLAYICI=claude` ile açıklama katmanı yerel `claude` ile çalıştırılabilir. Dil modeli yalnız isteğe bağlı açıklama katmanında kullanılabilir ve ham veriyi değil, toplu özet cümlelerini görür.

## 8. Karar motoru

Bulgu listesi "ne oldu"yu söyler; karar motoru "ne yapmalı"yı hesaplar. Kalem başına emniyet stoğu, yeniden sipariş noktası, ekonomik sipariş miktarı ve önerilen sipariş; tüm varsayımlar (taşıma oranı, sipariş maliyeti, stoksuzluk cezası, hizmet seviyesi) tek bir ayar dosyasından gelir ve değiştirilebilir.

- **Kalibre güven aralığı.** Talep tahmininin %80 aralığı ilk hâliyle gözlemlerin %97,7'sini kapsıyordu (gereğinden geniş, emniyet stoğunu şişiriyor). Kalibrasyon eski pencerelerden tek bir ölçek çarpanı bulur ve görülmemiş pencerelerde sınar: örnek veride test kapsaması **%97,9 → %79,7**, aralık genişliği yarıya iner.
- **Servis seviyesi / maliyet eğrisi.** Hedef hizmet seviyesi yükseldikçe emniyet stoğu maliyeti ile beklenen stoksuzluk maliyeti nasıl değişiyor: (örnek veri)

| Hedef | Emniyet stoğu değeri | Beklenen stoksuzluk/yıl | Toplam/yıl |
|---|---|---|---|
| %90 | 2.956.921 TL | 1.782.526 TL | 2.822.732 TL |
| %95 | 3.795.167 TL | 786.645 TL | 1.910.675 TL |
| %99 | 5.367.577 TL | 127.587 TL | 1.408.859 TL |

- **Senaryolar.** "Talep %20 artarsa", "tedarik süresi +5 gün", "T-02 çıkarsa" gibi durumlar yan yana karşılaştırılır (örnek veri):

| Senaryo | Kritik kalem | Stoksuz kalem-gün | Stok dışı risk | Yıllık maliyet farkı |
|---|---|---|---|---|
| Bugün | 17 | 145,1 | 522.384 TL | - |
| Talep %20 artarsa | 20 | 165,3 | 820.043 TL | +321.495 TL |
| Tedarik süresi +5 gün | 22 | 242,8 | 1.112.300 TL | +103.572 TL |
| Talep +%20 ve süre +5 gün | 23 | 276,2 | 1.648.916 TL | +451.878 TL |

- **Duyarlılık.** Her varsayım ±%20 oynatılır ve kararı en çok hangisinin değiştirdiği gösterilir (örnek veride nominal tedarik süresi).
- **Önem puanı.** Parasal sıralamada TL'si olmayan kritik stok bulguları dibe düşerdi. Önem puanı (0–100) önem ağırlığını ve log ölçekli para bileşenini birleştirir; örnek veride parasal sırada 36. olan en riskli kritik stok, puanla 1. sıraya çıkar.

## 9. Panel ve raporlar

Tarayıcıda açılan, bağımlılıksız panel dört ekrandan oluşur:

- **Yönetici özeti:** öncelikli 5 aksiyon, parasal etki, alan bazında risk sıralaması, talep yönü. Aynı sipariş kalemini iki modül bulursa tutar bir kez sayılır.
- **ROI hesaplayıcı:** stok taşıma, fatura kaçağı, gecikme ve elle kontrol emeği kollarında alt–üst aralıkla yıllık tasarruf, net ve geri ödeme; her kalemin formülü kullanıcının sayılarıyla dökülür.
- **Senaryo:** tedarikçi skoru ağırlıklarını, stok eşiklerini ve "tedarikçi çıkarsa" durumunu tarayıcıda oynatın; varsayılan ayarda Python modülleriyle birebir aynı sonucu verir.
- **Rapor:** yazdırılabilir yönetici raporu (PDF) ve Türkçe Excel uyumlu CSV.

`python -m kule ozet` (kapalı depoda çalışır) günlük ve haftalık özeti (Markdown, tek dosya HTML, JSON, CSV) üretir. Sipariş gereken her tedarikçi için e-posta **taslağı** yazılır: kalemler, miktar, en geç teslim tarihi ve tedarikçinin ölçülen teslim performansı. Kule e-posta göndermez; taslağı sizin gözden geçirmeniz için hazırlar.

## 10. Entegrasyon ve güvenlik

- **REST API** (`/v1`, 21 rota, OpenAPI sözleşmesi): vakalar, bulgular, görüntüler, fark, modül çıktısı, kalite, ingest, karar, simülasyon, özet, denetim, kullanıcılar.
- **Roller:** planlayıcı, satın alma, yönetici. Vakayı modülün sahibi rol yazar (stok, talep, OEE → planlayıcı; sipariş, fatura, tedarikçi → satın alma); `KABUL_EDILDI` yalnız yönetici verir.
- **Denetim izi:** kimliksiz (401) ve yetkisiz (403) her çağrı, hız sınırına takılan (429) çağrılar ve her kimlikli işlem kaydedilir. Token'lar veritabanında yalnız SHA-256 özetiyle tutulur.
- **Dayanıklılık:** istemci başına hız sınırı (varsayılan 300 istek/dk), 20 MB gövde sınırı, 128 KB'tan büyük alanlarda temiz hata mesajı, TLS'li ters vekil kurulum kılavuzu.
- **Bağımlılık:** yalnız Python standart kütüphanesi. `pip install` gerekmez; Kule'nin çekirdeği bu yayında yoktur; `python demo.py` ve `python -m kule ozet` kapalı depoda çalışır.

## Lisans ve atıf

Kök dizindeki kod ve sayfalar MIT lisanslıdır, bkz. [LICENSE](LICENSE); `demo/` klasörü bu lisansın dışındadır (`demo/LICENSE.txt`). Ölçümlerde kullanılan veri: DataCo Smart Supply Chain (Mendeley Data, sürüm 5, DOI 10.17632/8gx2fvg2k6.5), CC BY 4.0. Bu veri bir firmaya ait değildir ve bu depoda dağıtılmaz.
