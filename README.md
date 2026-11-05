# Kule Pro: tedarik zinciri karar destek aracı

**Dil / Language:** Türkçe (bu sayfa) · [English](README.en.md)

1. Kule Pro, bir işletmenin stok, sipariş, tedarikçi ve fatura dosyalarını, SAP dışa aktarımlarını ve satıcı açık kalemlerini okur; her sabah hangi kalemin bitmek üzere olduğunu, hangi siparişte tutarsızlık bulunduğunu ve hangi tedarikçinin güvenilmez olduğunu hazır verir. Sabah raporu ekranı SAP dosyalarını sürükle-bırak ile alır, bugünün ilk 5 bulgusunu ve "dünden beri" farkını gösterir.
2. Yanında, modüllerini araç olarak kullanan birçok ajanlı bir orkestratör çalışır. Analist'in iddia bloğuna yazdığı sayılar Kule'nin kendi hesabıyla çapraz kontrol edilir. Denetçi sınırı açık: düz metindeki sayılar yalnızca Kule verisinde var olup olmadıkları açısından denetlenir.
3. Veriler sentetiktir (tohum 42 ile üretilmiş) ve ölçümlerin büyük kısmı herkese açık verilerle yapıldı: DataCo Smart Supply Chain, BPI Challenge 2019 (gerçek ama anonimleştirilmiş bir süreç kaydı), simüle Berti paketi, Zenodo kil tuğla OEE ve M5 talep verisi. Hiçbir modül bir müşterinin ya da kendi SAP sisteminizin verisiyle test edilmedi.
4. Kaynak kod bu depoda yayınlanmıyor. Burada statik sayfalar, çizimler, test kanıtları ve ajan izleri var.
5. Gerçek model koşusu (claude-haiku-5-5) planlanan 40 koşunun 38'ini yaptı (37'si tamamlandı, 1'i kotada kesildi, 2'si yapılmadı): soruşturmada 20 koşunun 16'sı kabul edildi, 4'ü Denetçi tarafından reddedildi; enjeksiyon senaryolarında (E1, E2) 17 koşu tamamlandı. Diğer izler elle yazılmış kasetlerdir.

**Canlı sayfalar** (sağ alttaki TR / EN düğmesiyle dil değişir):

- [Giriş](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Ürün sayfası](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/)
- [Ajan iz görüntüleyici](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/): örnek izler, onay kapısı, Denetçi kararları, eval
- [Test kanıtı](https://sahinoglu0.github.io/ai-otomasyon-portfoy/kanit/): kaynak kod kapalı; test sayıları, davranış kataloğu ve SHA-256 ile doğrulanabilir kanıt paketi

**Sınır:** Örnek veriler sentetiktir ya da herkese açıktır; burada gerçek bir firmanın sonucu yoktur. SAP biçimleri (RBKP/RSEG dahil) sentetik dosyalarla sınandı, gerçek bir SAP çıktısıyla denenmedi. Kule'nin kaynak kodu bu depoda değildir.

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
| [![Ajan iz görüntüleyici: koşu özeti, zaman çizelgesi, onay kapısı](docs/img/ekran/iz-goruntuleyici.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) | [![Test kanıtı: son koşu özeti ve alan başına dağılım](docs/img/ekran/kanit.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/kanit/) |

| Ürün sayfası | Giriş |
|---|---|
| [![Ürün sayfası](docs/img/ekran/portfoy-tr.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/) | [![Giriş sayfası](docs/img/ekran/giris-tr.png)](https://sahinoglu0.github.io/ai-otomasyon-portfoy/) |

İz görüntüleyicideki her iz kaynağını rozetle belirtir: ELLE YAZILMIŞ KAYIT, GERÇEK MODEL KAYDI ya da KOD SATIRI.

### Sabah raporu ekranı

Aşağıdaki görüntülerin hepsi **sentetik veriyle** alındı: Kule Pro'nun kendi deneme paketi (SAP biçimini taklit eden, uydurma dosyalar) ve elle üretilmiş sahte dosyalar. Gerçek bir firmanın ya da gerçek bir SAP sisteminin verisi yoktur; ekranlardaki "ÖRNEK VERİ · SENTETİK" rozeti her görüntüde görünür. Görüntüler Chrome'da, 980 px genişliğinde alınmış kırpmalardır. Ekran gerçek bir SAP çıktısıyla denenmedi.

| Görüntü | Ne gösteriyor |
|---|---|
| ![Sabah raporu: bugün bakılacak ilk 5 bulgu, sentetik örnek paket](docs/img/ekran/sabah-ilk5-bulgu.png) | **İlk 5 bulgu.** Sentetik deneme paketinin 1. günü. Her bulguda önem, tahmini etki (sunucu tahmini), kim bakmalı ve SAP'de nereye gidileceği yazar; menü yolu "öneri"dir, firmaya göre değişebilir. |
| ![Sabah raporu: örnek paket sonucu, 17 / 17 beklenen sorun bulundu](docs/img/ekran/sabah-ornek-paket.png) | **Örnek paket sonucu.** Paketin içine bilerek yerleştirilmiş 17 sorunun 17'si bulundu. Bu, kendi uydurduğumuz sorulara verilen cevaptır; gerçek veride doğruluk ölçüsü değildir. |
| ![Sabah raporu: "Dünden beri" bölümü, 2. gün](docs/img/ekran/sabah-dunden-beri.png) | **Dünden beri.** Aynı paketin ertesi sabahı: 2 yeni, 3 çözülen, 3 tutarı değişen bulgu. Tarihler denemenin çalıştırıldığı güne göre görünür. |
| ![Sabah raporu: zorunlu sütunu eksik dosya uyarısı](docs/img/ekran/sabah-eksik-sutun.png) | **Eksik sütun uyarısı.** Elle üretilmiş sentetik EKPO dosyasından sipariş miktarı (MENGE) sütunu çıkarıldı. Kule dosyayı tanır, eksik alanı adıyla söyler ve "Sabah raporunu hazırla" düğmesini devre dışı bırakır (görüntüde düğme koyu görünse de pasiftir). |
| ![Sabah raporu: çok büyük dosya için hata mesajı](docs/img/ekran/sabah-buyuk-dosya-hata.png) | **Hata mesajı örneği.** Elle üretilmiş sentetik, 75 MB'lık bir EKPO dosyası. Kule isteği göndermeden önce "Dosyalar birlikte çok büyük… sınır 20 MB" der. Gösterilen "yaklaşık 79 MB" kodlama payı eklenmiş tahmindir. |

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
![Eval: 123 vaka, 111 ölçüt/kontrol/kapsam geçti, 12 bilinen açık gözlendi](docs/img/eval-vakalar.svg)
<!-- eval:cizim:bitti -->

Eval kasetten oynatılır; bu bir model kalitesi ölçümü değildir. <!-- eval:sayi:basla -->Eval 123 vakadır; ölçüt, kontrol ve kapsam vakalarında **111/111** geçti. 12 bilinen açık vaka gözlendi ve kapanmadı.<!-- eval:sayi:bitti --> Eval, bilerek bozulmuş iki sürümü de yakalar: her şeyi kabul eden Denetçi ve yetki kontrolü olmayan orkestratör.

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

**Gerçek açık veri ölçümleri (KULE-V1..V5, KULE-F1).** Aşağıdaki her sayı, sondaki rapor adından alınmıştır. Hiçbiri doğruluk ölçümü değildir. "Kural uyuşması", iki kodun aynı tanımı ne kadar tutarlı uyguladığını gösterir; tanımın gerçek dünyada doğru olduğunu göstermez. Berti verisi simülasyondur; etiketli sipariş anomalisi içeren bir veri bu ölçümlerde yoktur.

| Modül | Veri (lisans) | Sonuç | Rapor |
|---|---|---|---|
| `uclu_eslestirme` | BPI Challenge 2019 OCEL (4TU, CC BY 4.0; MD5 doğrulandı). 251.734 iz, 1,6 milyon olay. | 984 aday bulgu (tutar etkisi 7.182.225), 5,3 sn, tepe bellek 537 MB. Bulgular aday; kanıt değil. Miktar alanı olmadığı için FATURALANMAMIS_TESLIM ve FAZLA_FATURA_MIKTAR koşmadı. Item Category çapraz kontrolünde CIFT_FATURA oranı iki kategoride neredeyse aynı (%0,50 / %0,47). | KULE-V1-ezgi |
| `siparis_anomali` (BPI) | Aynı günlük | 0 bulgu, ama **değerlendirilemedi**: altı kuralın miktar, plan tarihi ve malzeme alanı yok. Bu 0 bir temizlik kanıtı değildir. | KULE-V1-ezgi |
| `stok_durumu` | Berti simüle envanter paketi (simülasyon) | Düzeltme öncesi: 88 karşılaştırılabilir çiftte %96,6 (85/88) kural uyuşması; 357 ölü stok çifti karşılaştırılamadı. Kule'de stoğu 0 ve sevki olmayan kalem ölü stok sayılıyordu; 192 çiftte bu bir kusurdu ve düzeltildi. Düzeltme sonrası 280 çiftte %98,9 (277/280) uyuşma. Berti etiketi Kule'nin kuralına yakın olduğu için bu bağımsız doğruluk değildir. | KULE-V2-zeynep, KULE-V5-ezgi-2 |
| `karar` (Berti) | Aynı paket | 88 karşılaştırılabilir çiftte %86,4 uyuşma; Understock duyarlılığı %100, Normal 0/3. | KULE-V2-zeynep |
| `siparis_anomali` (Berti PO/GR) | Berti simüle, 438 PO kalemi, 94 mal kabul | Doğal veride altı kuralın beşi bağımsız referansla birebir uyuştu; CIFT_KAYIT iki tarafta da 0 buldu. Doğal bulguların çoğu (367 ACIK_GECIKMIS) anahtar rastgeleliğinden geliyor: 94 mal kabulün yalnız 47'si bir PO kalemine denk geliyor. Enjekte sapmada (her kural 15 kalem) 90/90 yakalandı; 15 temiz kalemde 0 sahte bulgu. Enjekte sapmalar belirgin seçildi (+%50, −%50, 10 gün). | KULE-V4-zeynep-3 |
| `oee` (kil tuğla) | Zenodo 17855209, 62 gün, CC BY 4.0; vekil eşleme | Günlük toplam OEE, kaynakla ort. mutlak hata 0,07 puan; bu bir cebirsel özdeşliktir, doğrulama değildir. Kullanılabilirlik +15,7 puan, performans −16,9 puan sapıyor (r = 0,23 ve 0,36). Bileşenler kaynakla uyuşmuyor. | KULE-V3-zeynep |
| `talep_tahmini` (M5) | M5, Zenodo 12636070, 5.082 seri, son 4 hafta tutuldu, CC BY 4.0 | WAPE: Kule %47,3; mevsimsel naif %61,0; son 4 hafta ortalaması %38,4. Yani Kule basit ortalamadan kötü. Toplamda %10,4 eksik tahmin. İkinci örneklemde (1.017 seri) aynı yön. | KULE-V3-zeynep |
| `fatura.csv` (RBKP/RSEG) | Yok; sentetik dosya | 569 test geçti. Gerçek SAP çıktısıyla doğrulanmadı. | KULE-F1-ezgi |

KULE-V6 bir varyant ölçümüdür: "son 4 hafta ortalaması" seçim adayı olarak eklenince M5'te WAPE %39,7'ye iniyor; oee'deki "diğer plansız duruş" kalemi kullanılabilirlik farkını kapatmadı (+15,7 → +15,0 puan). Kule kodu bu varyantları kullanmıyor.

**Hâlâ ölçülmeyenler.** Gerçek bir SAP dışa aktarımı (EKPO, MSEG, RBKP/RSEG dahil) hiçbir modülde denenmedi. BPI 2019'da miktar ve plan tarihi olmadığı için siparis_anomali'nin altı kuralı bu veride koşmadı. Etiketli sipariş anomalisi verisi olmadığından yanlış alarm oranı hiçbir modül için verilmez. Kule'de RBKP ile RSEG'i birleştiren adım yoktur; tek dosyada birleştirilmeleri gerekir.

Mal kabul, irsaliye ve fatura olayları BPI 2019 günlüğüyle, üretim (OEE) kil tuğla verisiyle vekil eşlemeyle ölçüldü. Sentetik veri gerçek diye sunulmaz.

DataCo'nun veri sayfası (Mendeley 8gx2fvg2k6, sürüm 5) "CC BY 4.0" yazar; ancak aynı sayfada metin ve veri madenciliği ile yapay zekâ eğitimi dahil "tüm haklar saklıdır" ibaresi de vardır. Bu yüzden veri dosyası bu depoya dahil değildir, yalnız ölçüm çıktıları paylaşılır ve veri eğitim amaçlı kullanılmaz. Ölçüm çıktısı: [olcum/veri-e1-olcum.json](olcum/veri-e1-olcum.json).

**Talep tahmini.** Örnek veride Holt-Winters'in geriye dönük test hatası (MAPE) ortalama 8,07; geçen yılın aynı haftasını alan basit yöntemin 11,16. Ayrıca aralıklı talep yöntemleri (Croston, SBA, TSB) ön-kayıtlı ölçütlerle denendi:

![Test MAPE ve test kapsaması: naif, Holt-Winters, Croston, SBA, TSB](docs/img/e8-olcum.svg)

Smooth sınıfta SBA iki ölçütü de geçti (kapsama %77,31, MAPE %248,00 ve naif %250,65); diğer sınıflar test penceresinde ölçülemedi; onlar için ürün-yaşam penceresiyle ayrı bir ölçüm gerekir.

**Tedarikçi skoru (örnek veri).** T-01 95,5 (A) ile T-03 36,3 (D) arasında net ayrım; T-03'ün zamanında teslimi %60, red oranı %9,29.

**Testler.** Son koşu 2026-11-05'te yerelde yapıldı (`cv-portfoy-kule` e3873d9; Python 3.14.7, Node v26.13.0; sayılar: [`kanit/sayilar.json`](kanit/sayilar.json)). Kule Python testleri: 603 test, 601 geçti, 0 başarısız, 2 beklenen başarısızlık (iki hedef: iki yılın aynı MBLNR'si ayrı belgedir; farklı şirket kodunda aynı EBELN/EBELP ayrı kalemdir; ikisi de henüz uygulanmadı). Ajan orkestratörü: 120 geçti. Kule paneli (Node): 146 geçti, 0 atlandı. Önceki 0.7.0 kanıt sayfası 559 Python testi gösteriyordu; aradaki fark 0.7.0 sonrası eklemelerden gelir. Koşu, commit edilmemiş bir belge içeren çalışma kopyasında yapıldı; bu belge testleri etkilemez, ama kaynağın temiz olmadığını gösterir. Kaynak raporu: test sayıları için bu koşu; eski 569 sayısı KULE-F1 raporundadır.

**0.7.0 sonrası geliştirme (yayınlanmadı, sürüm numarası yok).** Aşağıdakiler yalnız özel `cv-portfoy-kule` deposundadır, sentetik veriyle sınandı, **gerçek SAP verisiyle doğrulanmadı**:

- **`kule[pdf]` (deneysel):** metin katmanlı tedarikçi ekstresi PDF'i beş kapıdan geçerse okunur. Yalnız tek sentetik şablonla sınandı. İsteğe bağlı kurulum; çekirdek bağımlılıksız kalır.
- **Son 4 hafta ortalaması (aday, varsayılan değil):** sentetik ve açık veride sonuç karışık çıktı (ortalama hata kötüleşti, medyan iyileşti). KULE-V3 M5 ölçümünde WAPE: Kule %47,3, mevsimsel naif %61,0, son 4 hafta ortalaması %38,4; KULE-V6 varyant ölçümünde %39,7; bu varyant Kule kodunda uygulanmadı. Üretimde açılmadı. Kaynak raporlar: KULE-V3-zeynep, KULE-V6.
- **Pilot ölçüm özeti ekranı:** panelde yükleme, red oranı ve vaka kapanma süresi. Boş ve sentetik veri açıkça etiketli; TL ya da tasarruf iddiası yok.
- **Python'suz Windows paketi (spike):** embeddable Python ve `baslat.bat` ile hazırlandı; yalnız simülasyon, ürün kodu değişmedi. Bu yayında kurulum kanıtı yoktur (KULE-N1).
- **Açık kalanlar:** iki beklenen başarısızlık (yukarıda); kanıt sayfasındaki test davranış kataloğu hâlâ 0.6.0 koşusunda (580 test) ve 0.7.0 sonrası testleri kapsamıyor; gerçek SAP çıktısı denenmedi.

## 4. Kapsam ve durum

- **Veri.** Örnek veri sentetiktir (tohum 42); ölçümler sentetik ve herkese açık DataCo verisiyle yapılmıştır. ROI hesaplayıcının girdileri kullanıcının kendi varsayımlarıdır; Kule kayıtlarından iki değer (aylık vaka, kayıtlı süre) kaynağıyla hesaba alınabilir, ama kayıtlar pilot ölçümü değildir: süre kullanıcının kendi tahminidir.
- **Tohum bandı ve ROI.** 10 tohumla (7, 42, 2026, 1, 2, 3, 11, 99, 123, 314) yapılan tekrarda fazla stok değeri 7,4 M ile 45,6 M TL arasında değişiyor (medyan 21,9 M TL); bu yüzden tek bir TL sayısı sunulmaz. Bant: [`kanit/olcum-tohum-bandi.json`](kanit/olcum-tohum-bandi.json). ROI'de kullanıcının kaynaksız girdileri (yakalama payı, önlenen pay, olay başı maliyet) sonucu ±%3 ile ±%8 arasında oynatıyor. Stok kolu, kullanıcı fazla stok payı girdisini girmeden hesaplanmaz ve TL sonucu gösterilmez. Bunlar örnek hesap ve duyarlılık göstergesidir; firma sonucu değildir. Varsayım tablosu: [olcum/roi-varsayimlari.md](olcum/roi-varsayimlari.md).
- **Entegrasyon.** Girdi CSV ve `.xlsx` dosyasıdır; SAP tarzı dışa aktarımlar (EKPO, MSEG, MARD, LIPS, FBL1N) eşleme dosyasıyla okunur: TR ve EN başlıklar, UTF-8/UTF-16/ANSI, sekme, `;`, `,` ve `|` ayracı; ALV üst bilgisi ve toplam satırı atlanır. **Bu biçimler sentetik dosyalarla sınandı; gerçek bir SAP çıktısıyla denenmedi.** RBKP/RSEG fatura eşlemesi (KULE-F1) da yalnız sentetik veriyle sınandı. Sabah raporu ekranı `.xlsx` dosyasını da kabul eder (0.7.0; ilk sayfa okunur, Zip64 ve şifreli dosya kapsam dışı); eski `.xls` okunmaz. Canlı SAP ya da OCR bağlantısı yoktur.
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
| "Satıcının açık kalemleri ekstresiyle tutuyor mu?" | FBL1N açık kalem mutabakatı: vadesi geçmiş, çift açık kalem, ödenmiş görünen açık kalem, tutar uyuşmazlığı, bakiye farkı, kısmi ödeme |
| "Hangi tedarikçi sorunlu?" | Zamanında teslim, red oranı, fiyat sapmasından 0–100 skor ve A/B/C/D seviyesi |
| "Talep ne olacak?" | 8 haftalık tahmin, %80 güven aralığı ve geriye dönük test sonucu |
| "Hatlarım ne kadar verimli?" | OEE (kullanılabilirlik × performans × kalite) ve duruş Pareto'su |
| "Talep %20 artarsa ya da bir tedarikçi çıkarsa ne olur?" | Senaryo simülasyonu: kritik kalem sayısı, stoksuz kalem-gün, stok dışı risk, yıllık maliyet farkı |
| "Yönetime ne söyleyeceğim?" | Günlük ve haftalık yönetici özeti, ROI hesaplayıcı, yazdırılabilir rapor, tedarikçilere e-posta taslakları |

Bulunan her sorun bir **vakaya** dönüşür: sahibi atanır, durumu izlenir (açık, incelemede, çözüldü, kabul edildi), her değişiklik denetim izine yazılır. Ertesi gün veri yeniden yüklendiğinde Kule neyin düzeldiğini, neyin yeni çıktığını ve neyin hâlâ açık olduğunu gösterir.

## 6. Nasıl çalışır

![Sistem genel görünümü: CSV girdisi, girdi sözleşmesi, SQLite, yedi modül, CLI/REST/panel; altta ajan orkestratörü](docs/img/sistem-genel.svg)

1. **Girdi.** İşletmenin dışa aktardığı CSV dosyaları (stok, sevkiyat, sipariş, mal kabul, irsaliye, talep geçmişi, tedarikçi teslimatı, üretim) ve fatura metni. `.xlsx` dosyaları da okunur; Türkçe ve boşluklu sütun başlıkları (`Malzeme No.`, `Stok Miktarı`) otomatik eşlenir. SAP tarzı dışa aktarımlar (EKPO, MSEG, MARD, LIPS, FBL1N) alan eşleme dosyasıyla Kule biçimine çevrilir; satıcı mutabakatında karşı taraf, tedarikçi ekstresidir (Kule CSV biçimi).
2. **Doğrulama.** Her satır bir girdi sözleşmesine göre denetlenir: tür, zorunlu alan, alt sınır, seçenek, alanlar arası kural, tekrar. Bozuk satır sessizce kaybolmaz; nedeniyle birlikte saklanır ve dosyanın **veri kalitesi skoruna** (eksik, tutarsız, tekrar, bayat) yansır.
3. **Saklama.** Temiz veri SQLite'a yazılır. Her çalıştırma bir *anlık görüntü* bırakır; iki görüntü arasındaki fark çıkarılabilir.
4. **Analiz.** Yedi modül aynı JSON zarfını üretir (sayılar, bulgular, uyarılar, hangi yöntemin kullanıldığı).
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
| `fbl1n_mutabakat` | Satıcı açık kalem mutabakatı: vadesi geçmiş, çift açık kalem, ödenmiş görünen açık kalem, tutar uyuşmazlığı, bakiye farkı, kısmi ödeme | Kural tabanlı; SAP tarafı FBL1N, karşı taraf tedarikçi ekstresi |
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

Tarayıcıda açılan, bağımlılıksız panel dört ekrandan ve ek bir Sabah raporu ekranından oluşur:

- **Yönetici özeti:** öncelikli 5 aksiyon, parasal etki, alan bazında risk sıralaması, talep yönü. Aynı sipariş kalemini iki modül bulursa tutar bir kez sayılır.
- **ROI hesaplayıcı:** stok taşıma, fatura kaçağı, gecikme ve elle kontrol emeği kollarında alt–üst aralıkla yıllık tasarruf, net ve geri ödeme; her kalemin formülü kullanıcının sayılarıyla dökülür.
- **Senaryo:** tedarikçi skoru ağırlıklarını, stok eşiklerini ve "tedarikçi çıkarsa" durumunu tarayıcıda oynatın; varsayılan ayarda Python modülleriyle birebir aynı sonucu verir.
- **Rapor:** yazdırılabilir yönetici raporu (PDF) ve Türkçe Excel uyumlu CSV.
- **Sabah raporu (ek ekran):** SAP dosyalarını sürükleyip bırakma, başlıktan tanıma, bugünün ilk 5 bulgusu, reddedilen satırlar, eksik liste kartı ve "Dünden beri" bölümü (yeni, çözülen, tutarı değişen, değişmeyen). Tek dosyalık HTML rapor ve formül korumalı CSV indirilebilir. Ekran görüntüsü sentetik veri rozetiyle gelir; `.xlsx` ve CSV kabul edilir, eski `.xls` kabul edilmez.

`python -m kule ozet` (kapalı depoda çalışır) günlük ve haftalık özeti (Markdown, tek dosya HTML, JSON, CSV) üretir. Sipariş gereken her tedarikçi için e-posta **taslağı** yazılır: kalemler, miktar, en geç teslim tarihi ve tedarikçinin ölçülen teslim performansı. Kule e-posta göndermez; taslağı sizin gözden geçirmeniz için hazırlar.

## 10. Entegrasyon ve güvenlik

- **REST API** (`/v1`, 28 işlem, OpenAPI sözleşmesi): vakalar, bulgular, görüntüler, fark, modül çıktısı, kalite, ingest, karar, simülasyon, özet, denetim, kullanıcılar, ölçüm (`/v1/olcum`, `/v1/olcum/ozet`), bulgu doğruluğu.
- **Roller:** planlayıcı, satın alma, yönetici. Vakayı modülün sahibi rol yazar (stok, talep, OEE → planlayıcı; sipariş, fatura, tedarikçi → satın alma); `KABUL_EDILDI` yalnız yönetici verir.
- **Denetim izi:** kimliksiz (401) ve yetkisiz (403) her çağrı, hız sınırına takılan (429) çağrılar ve her kimlikli işlem kaydedilir. Token'lar veritabanında yalnız SHA-256 özetiyle tutulur.
- **Dayanıklılık:** istemci başına hız sınırı (varsayılan 300 istek/dk), 20 MB gövde sınırı, 128 KB'tan büyük alanlarda temiz hata mesajı, TLS'li ters vekil kurulum kılavuzu.
- **Bağımlılık:** yalnız Python standart kütüphanesi. `pip install` gerekmez; Kule'nin çekirdeği bu yayında yoktur; `python demo.py` ve `python -m kule ozet` kapalı depoda çalışır.

## Lisans ve atıf

Kök dizindeki kod ve sayfalar MIT lisanslıdır, bkz. [LICENSE](LICENSE); `demo/` klasörü bu lisansın dışındadır (`demo/LICENSE.txt`). Ölçümlerde kullanılan veri: DataCo Smart Supply Chain (Mendeley Data, sürüm 5, DOI 10.17632/8gx2fvg2k6.5), CC BY 4.0. Bu veri bir firmaya ait değildir ve bu depoda dağıtılmaz.

Ek ölçüm verileri, hepsi CC BY 4.0 ve ham hâliyle bu depoda dağıtılmaz: BPI Challenge 2019 OCEL (4TU, MD5 doğrulandı), Berti simüle envanter paketi (simülasyon, gerçek bir firmanın verisi değil), Zenodo 17855209 (kil tuğla OEE) ve Zenodo 12636070 (M5). Atıflar `CREDITS.md` dosyasında.
