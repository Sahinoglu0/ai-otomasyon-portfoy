# Test davranış kataloğu

Bu katalog, otomatik testlerin neyi doğruladığını kısa cümlelerle anlatır. Her madde bir teste karşılık gelir.

Toplam 345 test: Kule çekirdeği 229, Ajan orkestrasyonu 87, Kule arayüzü 29.

## Kule çekirdeği

### Aralıklı talep yöntemleri

- Aralıklı talep tahminleri negatif çıkmaz.
- Hiç talep yoksa tahmin sıfır olur.
- Talep sabitse iki aralıklı yöntem de aynı değeri verir.
- Düzeltilmiş yöntem tahmini bilinen bir oranda aşağı çeker.

### Seri boşluklarının doldurulması

- Uzun süren gerçek bir boşluk doldurulmaz.
- Eksik değerler yalnız seri içindeki boşlukları doldurur; baş ve son dokunulmaz.
- Tam pencere seçildiğinde bütün eksik noktalar doldurulur.

### Talep sınıfları

- Büyüklüğü dalgalanan talep kendi sınıfına girer.
- Seyrek ve kümeli talep kendi sınıflarında ayrılır.
- Düzgün talep düzgün sınıfına girer.
- Hiç talep görmeyen kalem talepsiz sınıfına girer.

### Kalibrasyon ve ölçüm

- Kalibrasyon katsayısı ve güven değeri tanımlı kurallara göre hesaplanır.
- Hata oranı yalnız pozitif gözlemler üzerinden ölçülür.
- Tahmin satırları gelecekteki değerlere bakmadan üretilir.

### Uçtan uca ölçüm

- Ölçüm çıktısının yapısı ve karar özeti birlikte doğrulanır.

### Satır okuma

- Çok büyük bir alan, hangi satırda olduğu belirtilerek reddedilir.
- Eksik alan boş bırakılır, fazla alan atılır.
- Noktalı virgül ayraçlı dosyalar doğru okunur.
- Hata satır numarası, yorum satırları da sayılarak bulunur.
- Yorum ve boş satırlar atlanır, başlıktaki fazla boşluklar temizlenir.

### Yöntem seçimi

- Aday yöntem basit yöntemden iyiyse ya da eşitse seçilir.
- Aday yöntem basit yöntemden kötüyse basit yöntem kalır.
- Aralıklı talepte aday, düzeltilmiş aralıklı yöntem olur.
- Uygun durumda düzeltilmiş yöntem ve basit yöntem aynı sabit tahmini verir.
- Sıfır gözlem olsa da aday yöntem korunur.
- Geçmiş yetersizse basit yöntem taban olarak kullanılır.

### Sevkiyat verisinin uyarlanması

- Dışlanan kayıt durumları çıktı dosyalarına girmez.
- Sütun eşleştirmesi ve türetilen tarihler doğru hesaplanır.
- Haftalık toplamlar pazartesi günü başlayan haftalara göre alınır.
- İptal edilen teslimatta gerçekleşen miktar boş kalır.
- Kişisel veri çıktı dosyalarında yer almaz.
- Uyarlanan veri sevkiyat veri sözleşmesinden geçer.
- Çıktı sütunları sözleşmedeki kümeyle tam olarak aynıdır.

### Demo

- Demo, kurulum gerektirmeden baştan sona çalışır.

### Denetim kayıtlarının taşınması

- Göç sırasında eski denetim kayıtları korunur; hız sınırı reddi de geçerli bir kayıt olarak okunur.

### İstek hız sınırı

- Hız sınırı aşıldığında denetim kaydına hız reddi olarak yazılır.
- Sınırı aşan istek çok istek yanıtı alır.

### Hız sınırı kuralları

- Geçersiz hız sınırı değerleri reddedilir.
- Her istemcinin hız sayacı ayrıdır.
- Hız sayacı süresiz büyümez.
- Sınır aşılınca istek reddedilir; zaman penceresi geçince yeniden açılır.

### Komut satırı

- Komut çalıştırıldığında dört çıktı dosyası üretilir.
- Girdi yoksa komut anlaşılır bir hatayla kullanım hatası kodu döner.

### Sipariş anomalileri

- Çift kayıt tek bulgu üretir ve net miktar fazlaya dönüşmez.
- Gecikme toleransı aşılınca teslimat geç olarak işaretlenir.
- İptal ve düzeltme kayıtları temiz sayılır, sahte bulgu üretmez.
- Örnek veride beklenen anomaliler eksiksiz ve fazlasız bulunur.
- Parçalı teslimat temiz sayılır.
- Planlanan tarihi olmayan kayıt eksik bulgu üretmez.
- Siparişi olmayan iptalin net etkisi sıfırdır.
- Temiz ama zor durumlar işaretlenmez.
- Tolerans sınırındaki değer kabul edilir, sınırı aşan değer işaretlenir.
- Tutar etkisi birim fiyata göre hesaplanır.

### Veri sözleşmesi

- Bozuk veri zarfı çıktı olarak yazılmaz.
- Zarfta eksik bir alan varsa bu açıkça bildirilir.
- Kayıtta eksik bir anahtar olduğunda bu bildirilir.
- Dil modeli kullanım bayrağı doğru bir değer değilse reddedilir.
- Dil modeli kullanım bayrağı doğru değerdeyse sözleşmeye uygundur.
- Özet eksik bir anahtar içeriyorsa bu bildirilir.
- Tüm modül çıktıları etiketli olur ve dil modeli kullanılmaz.
- Üretilen zarf sözleşmeye uygundur.

### Stok durumu

- Stok kalemleri birikimli değer eşiklerine göre sınıflanır.
- Örnek veriye bilerek eklenen kritik stok bulunur.
- Örnek veriye bilerek eklenen ölü stok bulunur.
- Negatif stok miktarı reddedilir.
- Stok özeti kayıtlarla tutarlıdır.

### Talep tahmini

- Geriye dönük test ve taban karşılaştırması raporlanır.
- Çok kısa geçmişi olan kalem için tahmin reddedilir.
- Talep tahmini mevsimselliği ve eğilimi yakalar.
- Pencere geçmişi ve aralık sırası doğru tutulur.
- Tahmin haftaları ardışık pazartesi günlerinden oluşur.

### Tedarikçi skoru

- Örnek veride tedarikçi sıralaması beklenen sırayı verir.
- Red miktarı teslim miktarından büyükse satır reddedilir.
- Tedarikçi seviyesi sınır değerlerinde doğru atanır.
- Tedarikçi puanı tanımlı formüle göre hesaplanır.
- Düşük fiyat tek başına tedarikçiyi cezalandırmaz.

### Örnek veri üretimi

- Aynı tohum değeri aynı örnek veriyi üretir.
- Örnek veri beklenen yedi tür anomali içerir.

### Veri yükleme

- Eksik sütun açık bir hata verir.
- Etiketi olmayan dosya gerçek veri sayılır.
- Örnek etiketli dosya sentetik veri sayılır.
- Yorum satırları yüklemede atlanır.

### Eşzamanlı erişim

- Aynı anda yapılan yazma ve okumalarda kayıt kaybı olmaz.

### İstek boyutu sınırı

- Boyut sınırı aşılınca mesaj her denemede eksiksiz ulaşır.

### Kimlik ve denetim

- Başarılı istekler de denetim kaydında kişi ve yetkisiyle yer alır.
- Kullanıcı oluşturulur, kullanılır ve iptal edilir.
- Erişim anahtarı ve istek içeriği denetim kaydına ya da veritabanına yazılmaz.
- Anahtarsız, geçersiz ya da iptal edilmiş istekler yetkisiz olarak reddedilir ve kaydedilir.
- Anahtarsız olarak bilinmeyen bir adrese gelen istek yetkisiz döner; adres listesi sızdırılmaz.

### Belgeleme

- Belge denetimi eksik ya da yanlış tipteki alanları yakalar.
- Belgedeki rol tablosu koddakiyle birebir aynıdır.
- Belgedeki arayüz tanımı günceldir.
- Her uç nokta belgelenmiştir ve belgedeki bağlantılar çözülür.
- Vaka durumları ve hata kodları belgede ve kodda aynıdır.

### Paketleme

- Kapsayıcı paketleme dosyaları eksiksiz ve birbiriyle tutarlıdır.
- Paket tanımı ve paket verisi tutarlıdır.

### Panel dosyaları

- Gömülü yedek sayfa ve canlı betikler doğru sırayla yüklenir.
- Panel dışındaki dosyalar ve kaynak dosyalar kullanıcıya sunulmaz.
- Panel dosyaları kullanıcıya sunulur.
- Eski sürüm adresleri panelden ayrı tutulur.

### Rol ve yetki

- Kullanıcının kendi izinleri rol tablosuyla aynıdır.
- Her modülün sahibi tanımlıdır.
- Her uç noktaya hangi rollerin erişebildiği tabloyla aynıdır.

### SAP veri alımı

- SAP kaynaklı veri alımı başarıyla kabul edilir.

### SAP eşleme

- SAP alanları Kule alanlarına doğru çevrilir.
- Bağlantı kodu yoksa bu açıkça belirtilir.
- Çevrilemeyen bir değer tahmin edilmez; veri alımı reddedilir.
- Eksik SAP sütununun adı hata mesajında yer alır.
- Eşleme dosyası kullanılmadan önce doğrulanır.
- SAP komutu, sonucuna uygun çıkış kodunu döner.
- SAP üzerinden gelen veriyle aynı bulgular çıkar.
- Sayı ve tarih değerleri doğru biçimde çevrilir.

### Arayüz sözleşmesi

- Açık olması gereken adresler anahtarsız da erişilebilir.
- Bilinmeyen adres ya da yöntem uygun şekilde reddedilir.
- Bulgu sayısı vaka sayısıyla tutarlıdır ve örnek veri etiketlidir.
- Negatif içerik uzunluğu sistemi takılmadan reddedilir.
- Haftalık özet doğru üretilir ve hatalı tarih bildirilir.
- Veri alımında büyük bir alan işlenmeden reddedilir.
- Veri alımı dosya adını ve içeriğini denetler.
- Veri alımı iki gün arasındaki farkı doğru hesaplar.
- Kabul yalnız yönetici tarafından yapılabilir ve gerekçe zorunludur.
- Okuma istekleri belgelenmiş yanıt biçimine uyar.
- Simülasyon varsayılan ve özel ayarlarla çalışır.
- Taslak ve tuhaf kimlikli istekler hatalı istek olarak reddedilir ve kaydedilir.
- Vaka akışında işlemi yapan kişi, anahtarın sahibidir.

### Açıklama üretimi

- Anahtar verildiğinde dil modeli kullanılır ama anahtar çıktıda görünmez.
- Anahtar yoksa hazır şablon kullanılır ve uyarı verilir.
- Dil modeli hata verirse şablona dönülür.
- Dil modeli, ayarlanan model seçeneğiyle belirlenir.
- Dil modeli kipi açıkça istenirse gerçek model adı ve jeton sayısı kaydedilir.
- Dil modeli yoksa şablona dönülür ve nedeni uyarıda yazılır.
- Eksik ortam ayarı bir uyarı üretir.
- Dil modeli hatasında şablona dönülür ve anahtar gizlenir.
- Varsayılan ayarda dil modeli çağrılmaz.

### Fatura çıkarımı

- Başlığı olmayan satır reddedilir.
- Kalıba uyan satır ve ondalık virgüllü tutar doğru okunur.
- Kalıba uymayan satır reddedilir, diğer satırlar işlenir.

### Üretim verimliliği

- Verimlilik formülleri bilinen değerlerle doğru sonuç verir.
- Kök neden, baskın nedene göre belirlenir.
- Örnek veride en düşük verimli hat beklenen hattır.
- Pareto listesi azalan sırada ilerler ve birikimli yüzde yüze ulaşır.
- Tutarsız üretim kaydı reddedilir.

### Üçlü eşleştirme

- Çift fatura, fazla miktarı ikinci kez saymaz.
- Fatura miktarı irsaliyenin altındaysa kalan miktar faturalanmamış sayılır.
- Fatura irsaliyeyi aşarsa fazla kısım işaretlenir.
- Fiyat farkı tolerans sınırındaysa kabul edilir.
- İrsaliyesi olmayan fatura yalnız irsaliyesiz fatura olarak işaretlenir.
- Örnek veride beklenen üçlü eşleştirme bulguları eksiksiz çıkar.
- Siparişi olmayan fatura işaretlenir.

### Ek örnek veri üretimi

- Ek örnek veri dosyaları üretilir.
- Ek örnek veri üretimi her seferinde aynı sonucu verir.

### Ayarlar

- Ayar dosyası ve komut satırı değerleri birleşir; hatalı değer komut satırında bildirilir.
- Geçersiz ayar değerleri reddedilir.

### Çıktı kodlaması

- Çıktı yönlendirildiğinde Türkçe karakterler doğru kodlanır.

### Karar formülleri

- Durum eşikleri sınır değerlerinde doğru sınıfı verir.
- Stok dışı durum ve öneri doğru üretilir.
- Emniyet stoku, yeniden sipariş noktası ve ekonomik sipariş miktarı doğru hesaplanır.
- Talep ve tedarik süresi hesabı doğrudur.
- Talebi olmayan kalem için karar üretilmez.
- Yedek parça miktarı tahmine dayanır.
- Yıllık maliyet doğru hesaplanır.

### Veri kabulü

- Bozuk veri veritabanına kabul edilmez.
- Farklı tohum değerleri farklı ama geçerli sonuçlar verir.
- Veritabanı yoksa anlaşılır bir hata verilir.

### Kalibrasyon

- Kalibrasyon test penceresindeki veriyi görmez; son 24 hafta değişse de katsayı sabit kalır.
- Kısa geçmişi olan kalem kalibre edilmez.
- Kalibrasyon önce geniş aralıkta, sonra hedef aralıkta yapılır.

### Kalibrasyon girdisi

- Veritabanındaki talepten, stok bilgisi olmadan kalibrasyon yapılabilir.
- Talep verisi olmayan girdi anlaşılır bir hata verir.

### Önem puanı

- Önem puanı tanımlı formüle göre hesaplanır.
- Değeri sıfır olsa da kritik stok önem listesinin dibinde kalmaz.

### Örnek veri senaryoları

- Örnek veri, değişmemesi gereken kuralları korur.
- Örnek veri, girdi değişince sonuçların da değiştiğini gösterir.
- Örnek veride kalemler ve bilerek eklenen durumlar yer alır.
- Örnek senaryolar birbiriyle tutarlıdır.
- Servis düzeyi eğrisi artan yönde ilerler.
- Simülasyon tablosu beklenen biçimde üretilir.
- Bir tedarikçi çıkarılırsa talep alternatif tedarikçiye geçer.

### Yönetici özeti

- Özet dosyaları yazılır.
- E-posta yalnız taslak olarak hazırlanır.
- Özet beklenen bölümleri içerir.
- Kodda e-postayı gönderen bir yol yoktur.

### Ardışık görüntü kabulü

- İki günlük veri ardışık olarak kabul edilir.
- Reddedilen sipariş satırına dokunan bulgu veri şüphesi taşır.

### Bozma deneyi

- Bozma deneyi, sabit bir tohumla tekrarlanabilir sonuç verir.

### Veritabanı göçü

- Boş veritabanı son sürüme getirilir; yeniden göç boş geçer.
- Daha yeni bir şema sürümü reddedilir.
- Eski sürümden göç veriyi korur.
- Tablo sütunları girdi sözleşmesiyle aynıdır.

### Komut satırı hataları

- Büyük alan içeren girdiyle komut çalıştırılınca girdi hatası kodu döner.
- Büyük alan içeren girdi karar komutunda hata kodu döner.
- Büyük alan içeren SAP örneğinde hata kodu döner.
- Büyük alan içeren SAP uyarlamasında hata kodu döner.
- Büyük alan içeren veri alımı isteğinde hata kodu döner.
- Büyük alan içeren SAP veri alımında hata kodu döner.
- Tablo dosyasında alan sınırı aşılınca hata kodu döner.
- Veri alımı, vaka ve fark komutları beklenen sonuçları verir.
- Olmayan girdi klasörü hata koduyla bildirilir.

### Vaka yaşam döngüsü

- Çözülmüş bir vaka, bulgu yeniden ortaya çıkarsa yeniden açılır.
- Vaka elle ilerletilir ve her adım denetim izinde kalır.
- Geçersiz durum geçişi ve gerekçesiz kabul reddedilir.
- Kabul edilen vaka, bulgu sürse de yeniden açılmaz.
- Kaybolan bulgu otomatik çözülür; ancak ilgili modül çalışmadıysa vaka kapanmaz.
- Vakalar filtrelenip sıralanarak listelenir.
- Önem değişimi izlenir.
- Tekrarlayan bulgu aynı vakaya birleşir.
- Yeni bir bulgu vaka açar; süre hedefi önemine göre belirlenir.

### Veri yükleme denetimi

- Alanlar arasındaki tutarsızlık yakalanır.
- Eski tarihli dosya işaretlenir.
- Eksik sütunlu dosya yapı hatası sayılır; ilgili modül atlanır, diğerleri çalışır.
- Hatalı satırlar reddedilir, dosyanın geri kalanı yüklenir.
- Temiz örnek veride hiç red olmaz.
- Veritabanı üzerinden elde edilen modül sonuçları, dosyalardan doğrudan okunanlarla aynıdır.

### Tablo başlığı eşleme

- Belirsiz bir başlık açık bir uyarı verir; sessizce seçim yapılmaz.
- Belirsizlik uyarısı başlık eşleştirmesiyle birlikte gösterilir.
- Bir sütun iki alana uyarsa, ikinci alan için uyarı verilir.
- Tablo, sütun adlarıyla eşleşir ve yinelenen sütun ayrılır.
- Eksik sütun tahmin edilmeden yapı hatası olarak bildirilir.
- Türkçe ve boşluklu başlıklar veri alımında doğru eşleşir.

### Tablo dosyası yükleme

- Tablo dosyası yüklenir ve sentetik veri olarak kalır.

### Tablo dosyası okuma

- Boyut sınırı açıkça aşılırsa dosya okunmaz.
- Aynı kaynak iki alana birden gitmez.
- Başlık eşleştirmesi takma adları ve belirsizliği ele alır.
- Standart, Türkçe ve boşluklu başlıklar okunur.
- Boş dosya boş sonuç verir.
- Bozuk tablo dosyası açık bir hata verir.
- Eksik sayfa içeren tablo dosyası hata verir.
- Ortak metinler, satır içi metinler, sayılar ve boş hücreler doğru okunur.
- Sütun adresi doğru çözülür.

## Ajan orkestrasyonu

### Gerçek model sorgusu

- Gerçek modda yanlış sayı reddedilir, doğru yanıt kabul edilir ve kayıt yazılır.
- Gerçek model hatası düzgün bir başarısızlık raporu üretir.
- Kayıt bandı modu, elle yazılmış etiketle değişmeden çalışır.
- Kayıt dosyası sonradan aynen yeniden oynatılabilir.

### Ajan ve sağlayıcı birlikte

- Araç döngüsü gerçek sağlayıcıyla tamamlanır ve izde model bilgisi bulunur.

### Model sağlayıcısı

- Çok istek yanıtı geçici bir hata olarak sınıflanır.
- Araç bloğu bir çağrıya dönüşür ve metinden ayrılır.
- Komut satırı araçları ve harici araç sunucuları kapalı tutulur; girdi standart girişten gider.
- Bozuk araç bloğu kalıcı bir hata olarak bildirilir.
- Model komutu yoksa açık bir hata verilir.
- Döküm, araç sonucunu ve önceki çağrıyı gösterir.
- Düz metin yanıtından model, jeton sayısı ve gecikme okunur.
- Yapılandırılmamış çıktı kalıcı bir hata sayılır.
- Model belirtilmezse model seçeneği eklenmez.
- Oturum hatası kalıcı bir hata olur ve mesaj kısa tutulur.

### Araç çıktısı sızıntısı

- Araç çıktısındaki gömülü bir komut son yanıta sızarsa denetçi yanıtı reddeder.
- İddia bloğundaki yapılandırılmış kopya sızıntı sayılmaz.
- Yalnız sayılardan oluşan yanıt kabul edilir.

### Onay özeti

- Basit bir onay, yazma işlemini açmaz.
- Onaylanan özet, çalıştırılan girdiyle uyuşmazsa yazma yapılmaz.
- Onaylanan özet eşleşirse yazma yapılır.
- Özet, anahtarların sırasından bağımsızdır.

### Bilinen açıkların ölçümü

- Bilinen bir açık kapanırsa ilgili ölçüm vakası başarısız olur.
- Onay olayı olmasa da açık gözlemlenir.

### Değerlendirme komutu

- Değerlendirme komutu sağlam bir taban üzerinde başarıyla tamamlanır.

### Değerlendirme vakaları

- Enjeksiyon metni döngüye girer ve aracın çalışması engellenir.
- Kapanan açıklar ölçüt olarak sayılır.
- Kapsam ve sızıntı vakaları gözlemi belgeler.
- Kayıtlı jeton sayısı model adımlarından gelir.
- Özet, ölçüt sayılarını ve bilinen açık sayılarını ayrı verir.
- Özet satırı, bilinen bir açığı geçti olarak saymaz.
- Sağlam kodda bütün vakalar geçer.

### Gerileme kontrolü

- Bozuk denetçi bir gerileme olarak yakalanır.
- Bozuk onay kapısı enjeksiyon vakalarında yakalanır.
- Karşılaştırmada önceden geçen bir vakanın artık geçmemesi gerileme sayılır.
- Sağlam bir taban ile komut başarı kodu döner.

### Kayıt ve oynatma

- Kayıt modu bandı yazar ve gerçek etiketi taşır.
- Yanıtlar sırayla oynar; bant bitince hata verilir.

### Uyumlu arayüz

- Anahtar yoksa açık bir hata verilir; sahte yanıt üretilmez.
- Araç sonucu, araç rolüne karşılık gelir.
- Çok istek yanıtı geçici, hatalı istek yanıtı kalıcı sayılır.
- İstek ve yanıt doğru eşleşir.

### Ajan döngüsü

- Adım bütçesi aşılınca durum bütçe aşıldı olarak işaretlenir.
- Araç hatası çalışmayı düşürmez; model hatayı sonuç olarak görür.
- Geçersiz durum geçişi reddedilir.
- Geçici hatada bekleyerek yeniden denenir.
- Yeniden deneme hakkı tükenince çalışma başarısız olur.
- İzinsiz araç reddedilir, çalıştırılmaz ve izlenir.
- Jeton bütçesi aşılınca çalışma durur.
- Kalıcı hata yeniden denenmez.
- Yan etkisi olan araç onay olmadan çalışmaz, onayla birlikte çalışır.
- Zaman aşımı geçici hata sayılır.

### Uçtan uca senaryolar

- Basit onay, senaryoda da yazmayı açmaz.
- Canlı modda anahtar yoksa komut açık bir hata verir.
- Bant modunda komut, beklenen çıkış kodlarını döner.
- İzdeki araç sonucu elle değişirse yeniden oynatma farkı bildirir.
- İz üzerinden yeniden oynatma aynı sonucu üretir.
- Bant koşusu tamamlanır ve yetkisiz araç çalışmaz.
- Onay verilirse dosya yazılır.

### Denetçi

- Biçimi bozuk iddialar çökme yaratmadan reddedilir.
- Bilinmeyen bir kaynağa dayanan iddia reddedilir.
- Boş iddia bloğu reddedilir.
- Bozuk iddia bloğu reddedilir.
- Doğru iddialar kabul edilir.
- İddia bloğu yoksa yanıt reddedilir.
- Tek olmayan kayıt alanına dair iddia reddedilir.
- Yanlış sayı reddedilir ve uyuşmazlık kaydedilir.

### Düz metin denetimi

- Kanıtı olmayan düz metin sayısı reddedilir.

### Metindeki sayılar

- Aralık ve normal sayılar sayı olarak sayılır.
- Binlik ayraç bir tam sayı, virgül ise ondalık ayracıdır.
- Kimlik numarası sayı sayılmaz.
- Madde numarası sayı sayılmaz.
- Ondalık sayı, yuvarlama payı içinde eşleşir.
- Tam sayı, kanıtta tam olarak aranır.
- Tarih ve saat sayı sayılmaz.

### Kule araçları

- Stok sorgusu gerçek çıktıdan okunur.
- Tedarikçi sorgusundaki puan, hesaplamanın kendisinden gelir.

### Soruşturma akışı

- Kayıt bantları hazır bulunur.
- Uçtan uca akışta ilk deneme reddedilir, ikincisi geçer.

### Planlayıcı kapısı

- Aşırı uzun bir madde reddedilir.
- E-posta adresi içeren çıktı reddedilir.
- Görev dışına çıkan planlayıcı uçtan uca reddedilir; analist çalıştırılmaz.
- Kayıt bandı soruşturması kapıdan geçer ve kurallar yerinde kalır.
- Maddesiz çıktı reddedilir.
- Görev dışına çıkan ilk çıktı, geri bildirimle yeniden istenir; ikinci çıktı geçer.
- Tablo ya da eylem planı içeren çıktı reddedilir.
- Yalnız alt görev listesinden oluşan çıktı kabul edilir.

## Kule arayüzü

### Kule panel arayüzü

- Sayfada, bir ihtiyacın kanıtlandığını ima eden bir ifade yer almaz.
- Tablo dosyaları işaret sırası, noktalı virgül ayracı, ondalık virgül ve tırnak kaçışlarıyla doğru okunur.
- Mevsimsel yöntem basit taban yöntemden kötüyse bu açıkça belirtilir.
- Arayüzdeki durum geçiş kuralları sunucudaki kurallarla birebir aynıdır.
- Yatırım getirisi elle yapılan hesapla aynı çıkar.
- Yatırım getirisi varsayılanları, her girdinin güven düzeyi belirtilerek seçilir.
- Vaka süreleri kalan, bugün, gecikmiş ve kapanmış olarak doğru sınıflanır.
- Aksiyonlar önem, etki türü ve tutar sırasıyla listelenir; tutarsız olanlar kendi düzeyinin sonunda yer alır.
- Kaynak atfı ve referans bağlantısı sayfada bulunur.
- Aynı sipariş kalemi, tutarı tek kez sayılacak biçimde işlenir.
- Ağırlık değişince sıralama değişir; ağırlıklar toplamı bir olacak biçimde ölçeklenir.
- Vaka yalnız yönetici tarafından kabul edilebilir; geçersiz durum geçişine izin verilmez.
- Emniyet gerekçesi olan kritik kalem, eşiğin altına düşse de kritik kalır.
- Gerçek veride kalibrasyon ölçülemezse bu açıkça söylenir; hedef dışı sıfır doldurma kabul edilmez.
- Hedef aralığının sınır değerleri hedef içinde sayılır; sınırın hemen üstündeki değer dışarıda kalır.
- İki veri kaynağı ayrı rozetlerle gösterilir ve metinleri gerçek veri sayfasıyla aynıdır.
- Kabul edilen vakalar sütunu yalnız istendiğinde ya da dolu olduğunda görünür.
- Red, kalite puanı, veri alım süresi ve sevkiyat bulguları sayfada yazılı olarak yer alır.
- Risk sayısı, hesabın kendi özetiyle aynıdır.
- Sayfadaki sayılar kanıt dosyalarıyla birebir uyuşur; kanıt yoksa bu kontrol atlanır.
- Karşılaştırma özeti yoksa karşılaştırma satırı çizilmez, sayfa yine de görünür.
- Bir tedarikçi çıkarıldığında hacmi kalan tedarikçilere dağılır ve ilgili bulgular kapanır.
- Varsayılan ağırlıklarla hesaplanan puan ve seviye, ana hesabın sonucuyla aynıdır.
- Varsayılan stok eşikleri beklenen durum sınıflarını verir.
- Veri eksik olan bölümler nedenleriyle birlikte soluk olarak gösterilir.
- Veri yoksa sayfa hata vermeden boş bir durum gösterir.
- Yazma yetkisi sunucunun verdiği listeye göre belirlenir.
- Sayfada kod olarak çalışabilecek bir ifade yer almaz.
- Örnek veride fazla stok payı, stok sonucundan okunur.
