# Test davranış kataloğu

Bu katalog, otomatik testlerin neyi doğruladığını kısa cümlelerle anlatır. Her madde bir teste karşılık gelir.

Toplam 869 test (0.7.0, koşu 2026-11-05): Kule çekirdeği 603 (601 geçti, 2 beklenen başarısızlık), Ajan orkestrasyonu 120, Kule arayüzü (panel) 146. Python 3.14.7 ve Node v26.13.0 ile koşuldu.

Bu katalog 0.7.0 koşusundaki 869 testin tamamını kapsar.

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

- Açık veri etiketli dosya gerçek müşteri verisi sayılmaz.
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

- Yükleme yanıtı en fazla beş ilk bulguyu sıralı verir.
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

### Favorita açık veri uyarlaması

- Haftalık toplamda negatif değerler sıfırlanır ve eksik hafta dışarıda bırakılır.

### M5 açık veri uyarlaması

- Uyarlanan M5 verisi açık veri olarak etiketlenir.
- M5 günlük satışları haftalığa toplanır ve eksik hafta atılır.
- İstenen seri sayısı kadar seri örneklenir.
- Uyarlanan uzun seri talep tahmini modülünden hatasız geçer.

### Üretim açık veri uyarlaması

- Üretim verisi bloklara bölünür ve kullanılabilirlik arızalardan hesaplanır.
- Uyarlanan üretim verisi OEE modülünden hatasız geçer.
- İdeal çevrim süresi kullanıldığında performans yüzde yüzü aşmaz.
- Yarı iletken verisinde vardiya ve hatalı ürün sayısı doğru çıkar.

### Satın alma süreci verisi uyarlaması

- Veri dışında kalan kayıtlar nedenlerine göre sayılır.
- Fatura tutarı fatura kapatma olayından alınır.
- Fatura yalnız temiz kalemler için yazılır.
- Aynı kaleme art arda eklenen kümülatif faturalar mükerrer sayılır.
- Mal kabul ve irsaliye yalnız temiz kalemlerden üretilir.
- Sipariş kaydında vekil alanlar ve plan alanları doldurulur.
- Tedarikçi teslimat alanı bu veride boş yazılır.
- Üç yönlü eşleştirme ölçütü kalem kategorisinden belirlenir.
- Uyarlanan veri üçlü eşleştirme modülüyle uyumlu çalışır.
- Çift fatura ve siparişsiz fatura bulgu adayları yakalanır.
- Yalnız üç yönlü ve temiz kalemler veride kalır.
- Zaman damgaları temizlenir ve tutarsız sıralı kayıtlar ayıklanır.

### Satın alma verisinde çift fatura kuralları

- Bir avro fazlasıyla artan kümülatif diziler çift fatura sayılır.
- Meşru kısmi faturalamada bulgu üretilmez.

### Büyük veri üretimi

- Anomaliler çoğaltılan her kopyada korunur.
- Üretilen büyük veri sentetik olarak etiketlenir.
- Faturaların akışlı yazımı eski yöntemle aynı çıktıyı verir.
- Fatura kimlikleri sipariş kimlikleriyle eşleşir.
- Geçersiz çoğaltma çarpanı reddedilir.
- Karar etiketi ve kalem sayısı çoğaltmadan sonra doğru kalır.
- Kimlikler kopyalar arasında benzersizdir.
- Komut satırı hem satır hedefini hem çarpanı kabul eder.
- İstenen satır sayısı hedeflenerek veri üretilir.
- Satır sayısı çarpan kadar artar.
- Satır sınırı aşılınca sade bir hata mesajı verilir.

### Deneme ucu

- Deneme ucu paketi yükler ve beklenen bulgularla karşılaştırır.

### Deneme paketi

- Beklenen bulguların hepsi birebir yakalanır.
- Deneme belgesi her beklenen bulguyu listeler.
- Paketteki dosya biçimleri birbirinden farklıdır ve hepsi tanınır.
- Depodaki deneme dosyaları üreticinin çıktısıyla aynı içeriktedir.
- Eksi işaretli 102 iadesi pozitif miktarla da kabul edilir.
- Paketteki her dosya örnek veri etiketi taşır.
- Hiçbir satır reddedilmez ve veri örnek olarak sayılır.
- Panel metni paketin içeriğiyle tutarlıdır.
- Excel dosyasında ondalık ve bilimsel gösterimli sayılar doğru okunur.
- Excel sayı hücresindeki ondalık işareti doğru çevrilir.

### 102 hareketi kuralları

- Eşleşen 102 girişi hareketi sıfırlar.
- Eşleşmeyen 102 girişi net miktarı azaltır.

### Dünden beri yükleme akışı

- Deneme verisinin ikinci günü yüklenince önceki günle fark gösterilir.
- Karar bulguları ilk bulgularda ve günler arası farkta yer alır.

### Dünden beri karşılaştırması

- Aynı gün yeniden yüklemede her bulgu sürüyor görünür.
- İkinci gün dosyaları üreticiyle aynıdır ve etiketlidir.
- İkinci gün farkı bilinen sayılarla eşleşir.
- İlk raporda karşılaştırılacak önceki gün yoktur.
- Paylaşılan rapor günler arası farkı da taşır.
- Sahibi atanan vaka bekleyenler listesinden düşer.

### Karar bulgularında günler arası fark

- İkinci gün karar bulguları yeni, kaybolan ve değişen olarak ayrılır.
- İlk raporda tüm karar bulguları yeni sayılır.
- Karar bulguları kaydedilir ama vaka açmaz.
- Karar girdisi eksikse karar bulgusu kaydedilmez.
- Deneme paketi karar bulgusunu iki kez saymaz.
- Paylaşılan rapor karar satırlarına değişim durumunu yazar.

### Bakiye farkı

- Bakiye farkı toleransın üstündeyse bulgu çıkar.
- Kuruş farkı tolerans içinde kalır ve bulgu sayılmaz.
- Ödeme ve avans bakiyeyi azaltır.

### Çift açık kalem

- Referansı, tutarı ve satıcısı aynı olan kalem iki kez açıksa bulgu çıkar.
- Tutarı farklı kalemler çift sayılmaz.

### FBL1N örnek veri zinciri

- Örnek veri zinciri beklenen bulguları üretir.
- Örnek veri, girdi sözleşmesi tarafından kabul edilir.
- Özet ve bulgu türü sayıları doğrudur.
- Örnek veri sözleşmeye uyar ve sentetik olarak etiketlidir.
- Temiz bir satıcı için bulgu üretilmez.
- Vaka bulguları kararlı bir parmak izi taşır.

### FBL1N mutabakatının görüntü katmanı

- Modül görüntü katmanında çalışır; girdi eksikse atlanır.

### FBL1N kural sınırları

- Referansı aynı olan farklı tedarikçilerin kalemleri karışmaz.
- Bulgular önce öneme, sonra tutara göre sıralanır.

### Ödenmiş görünen açık kalem

- Ekstrede ödenmiş görünen kalem SAP'de açıksa bulgu çıkar.
- Ödeme tutarı farklıysa bu durum ayrı bir bulgu değildir.

### FBL1N dosya eşlemesi

- FBL1N dosyası Kule'nin ekstre biçimine çevrilip yazılır.

### Tutar uyuşmazlığı

- Tutar ve para birimi aynıysa bulgu çıkmaz.
- Para birimi farklıysa lira etkisi sıfır gösterilir.
- Tutar uyuşmazlığının etkisi fark kadardır.

### Vadesi geçmiş fatura

- Ödeme kaleminin vadesi geçse de bulgu sayılmaz.
- Vadesi bugün olan fatura gecikmiş sayılmaz.
- Vadesi geçmiş açık fatura bulunur.

### Girdi sınırları

- Sonsuz, sayı olmayan ve aşırı basamaklı değerler 400 hatasıyla reddedilir.
- Metin alanlarında uzunluk ve tür sınırı denetlenir.
- Ölçüm kaydında aşırı büyük tamsayı 422 hatası verir ve yazılmaz.
- Çok derin iç içe gövde tüm yazma uçlarında 400 hatası verir.
- Simülasyonda taşan sayı 422 hatasıyla reddedilir.
- Sınıra yakın iç içelik hâlâ kabul edilir.

### Ölçüm veri tabanı göçü

- Eski yükleme kayıtları veri tabanı göçünden sonra bozulmaz.

### Ölçüm uçları

- Bulgu doğruluğu işareti olay olarak yazılır, vaka durumunu değiştirmez.
- Bulgu doğruluğu işareti için yetki ve girdi kuralları uygulanır.
- Yüklemede atlanan modülün eksik girdileri listelenir.
- Yükleme süresi ölçülür; hem yanıtta hem veri tabanında saklanır.
- Geçersiz ölçüm girdisi 422 hatası verir ve yazılmaz.
- Ölçüm listesi en yeniyi başa alır ve kalıcıdır.
- Ölçüm özeti kaydedilen ölçümleri yansıtır.
- Ölçüm, erişim anahtarının sahibi adına yazılır.
- Ölçüm yazma yetkisi tüm roller için açıktır.

### Ölçüm kaydı

- Geçersiz ölçüm girdisi kayda yazılmaz.
- Ölçüm kaydı dönemi ve kaynağı taşır.

### Ölçüm özeti

- Boş veri tabanında medyan ve oran üretilmez.
- Ölçüm kaynakları ayrı ayrı özetlenir.

### Çeyrek aralığı ve SAP ipuçları

- Çeyrek aralığı tek kayıtta ve çok kayıtta doğru hesaplanır.
- SAP ipuçları ve ek düzeltmeler doğru metinle gelir.

### Paylaşım uçları

- Paylaşım ucu raporu hem web sayfası hem CSV olarak verir.
- Özet yanıtı rapor tarihini taşır.

### Paylaşılan rapor

- CSV çıktısı Excel ile sorunsuz açılır.
- CSV'de tırnak işaretleri kaçırılır ve formül enjeksiyonuna karşı korunur.
- Örnek veri için dosya adı etiket taşır.
- Rapor sayfasında rozet, tarih, kaynak ve dosyalar beklenen bölümlerde üstte yer alır.
- Çalışmayan analizler rapor sayfasında her zaman listelenir.
- Rapor sayfası tek dosyadır; betik ve dış kaynak içermez.
- Rapor sayfası yazdırmaya ve dar ekrana uygun biçimlenir.
- Paylaşılan raporda kişi adı ve erişim anahtarı bulunmaz.
- Paylaşılan rapordaki SAP işlem adları panelle aynıdır.

### Rapor tarihi uçları

- Geçersiz ve gelecekteki rapor tarihi 400 hatasıyla reddedilir.
- Yükleme yanıtı rapor tarihini ve tarihin kaynağını yazar.

### Rapor tarihi seçimi

- Gerçek veride gecikme hesabı rapor tarihine göre değişir.
- Gerçek veride tarih istenmezse bugünün tarihi kullanılır.
- Karışık girdi gerçek veri sayılır.
- Örnek veride sabit tarih istenen tarihten önce gelir ve etiketlidir.
- Girdide tarih yoksa istenen tarih ya da bugün kullanılır.

### Son düzeltmeler

- SAP uyarlamasında açık veri etiketi korunur.
- Çerçevesiz sabit genişlikli liste için anlaşılır bir uyarı verilir.
- Etiketsiz dosya gerçek veri olarak kalır.
- FBL1N yöntem metni doğru kural sayısını yazar.

### Sabah raporunda eksik girdi

- Veri tabanı yolu SAP dosyalarıyla da hatasız çalışır.
- Eksik girdi özeti eksikleri listeler ve metin olarak yazar.
- Yükleme yanıtı her modüle SAP ipucu ekler.
- Yalnız SAP dosyaları yüklenince karar kalemi ve karar bulgusu üretilmez.
- SAP dosyalarıyla karar analizi atlanır, diğer analizler çalışır.
- Sevkiyat verisi olmadan kritik stok bulgusunun önemi ve metni doğru verilir.
- Sevkiyat verisi yokken stok analizi yalnız emniyet stoğunu denetler.
- Girdi tamsa karar analizi çalışır; yalnız gerçekten eksik analizler listelenir.

### SAP dosya biçimleri

- Türkçe etiketli, işaretli ve ondalık virgüllü sipariş listesi okunur.
- İngilizce etiketli, virgül ayraçlı ve ay-gün sıralı tarihli sipariş listesi okunur.
- Üst bilgi satırlı, eski kodlamalı malzeme hareketi listesi ve eksi işaretleri okunur.
- Sonda değil başta eksi işareti ve iade hareketleri doğru okunur.
- Teknik adlı, farklı sıralı ve fazla sütunlu stok listesi okunur.
- Toplam ve boş satırlar sayılıp atlanır.
- Yıl-ay-gün biçimli tarih, boş tarih ve altı haneli kalem numarası okunur.
- Teknik adlı dosya Windows satır sonlarıyla da okunur.
- Ondalık noktalı sayılar tahmin edilmez; uyarı verilir.
- Eksik sütunlar adlarıyla sade bir hata mesajında söylenir.
- Satır sınırı eşiği aşılınca uyarı verilir.
- Eşlemedeki etiket listesi doğrulanır.
- Örnek dosya sayısı ve etiketi doğrudur.
- Aynı sipariş kalemi iki farklı şirketten gelirse ikinci şirketin kalemi tekrar olarak reddedilir.
- Aynı belge numarası farklı yıllarda iki kez yazılırsa uyarlama iki satırı da yazar; doğrulama ilkini kabul eder, ikincisini tekrar olarak reddeder.
- Birden fazla şirketi olan hedef dosyada iki kalem de kabul edilir.
- Birden fazla yılı olan hedef dosyada iki belge de kabul edilir.
- Eşleme şablonunda bir sütun eksikse hata mesajı eksik sütunun adını söyler.
- Şablondaki tablo ve sütun adları doğru kaynakla eşlenir; birincil kaynakla doğrulanamayan alanlar açıkça işaretli kalır.
- Kullanıcı kendi başlığını etiketle bağladığında sütun doğru alana eşlenir ve sayılar doğru okunur.
- Ondalık virgüllü dosyada üç basamaklı nokta değerleri binlik sayılmaz; çevrilemeyen değer olarak bildirilir.

### SAP kodlama ve ayraçları

- Başlık hiç tanınmazsa kodlama ve ayraç söylenir, sütun suçlanmaz.
- Bozuk 16 bitlik kodlamada sade bir hata verilir.
- Eski Türkçe kodlamalı, sekme ayraçlı ve Türkçe etiketli dosya okunur.
- Çizgi çerçeveli sabit genişlikli liste okunur.
- Büyük uçlu 16 bit kodlamalı, işaretli, sekme ayraçlı dosya okunur.
- Sütun gerçekten eksikse hata eksik sütunları ve dosya başlıklarını gösterir.
- Küçük uçlu 16 bit kodlamalı, işaretli, noktalı virgül ayraçlı dosya okunur.
- Küçük uçlu 16 bit kodlamalı, işaretli, sekme ayraçlı dosya okunur.
- İşaretsiz küçük uçlu 16 bit kodlamalı, sekme ayraçlı dosya okunur.
- Sekme ayraçlı standart kodlamalı dosya okunur.
- Uzantısı .xls olan web sayfası ya da Excel dosyası için sade bir uyarı verilir.

### Çok sayfalı Excel dosyaları

- Beklenen sütun hiçbir sayfada yoksa ilk sayfa kullanılır ve uyarı verilir.
- Çok sayfalı dosyada doğru sayfa seçilir ve uyarı verilir.
- Excel satır sınırına ulaşılınca uyarı verilir.
- Satır sınırının altında uyarı verilmez.
- Sayfa adıyla seçim yapılabilir.
- Tek sayfalı dosyada uyarı verilmez.

### Ekstre ve sevkiyat eşlemesi

- Borç ve alacak sütunlu ekstrede tür, tutar, iade, devir ve varsayılan para birimi doğru çıkar.
- Çıkış hareketi yoksa sevkiyat dosyası yazılmaz ve mevcut dosya ezilmez.
- Depo sütunu yoksa sevkiyat atlanır, mal kabul yazılır.
- İngilizce başlıklar ve para birimi sütunu tanınır.
- Tek malzeme hareketi dosyasından hem mal kabul hem sevkiyat çıkarılır.
- Zorunlu mal kabul sütunu eksikse ve başka hedef yoksa hata verilir.

### Ekstre sözleşmesi

- Aynı faturaya iki kısmi ödeme tekrar sayılmaz; iade ve devir kabul edilir.
- Veri tabanı göçü eski ekstre satırlarını korur.

### Kısmi ödeme, iade ve devir

- Bölünmüş ödemelerin toplamı faturayı karşılıyorsa fatura ödenmiş sayılır.
- Devir alacağı bakiyeyi azaltır.
- İade ve devir bakiyeye girer, ödeme sayılmaz.
- Kısmi ödeme SAP'de kayıtsızsa bulgu çıkar, kayıtlıysa çıkmaz.

### Tam SAP seti ile sabah raporu

- Ekstre yoksa mutabakat atlanır ve nedeni söylenir.
- Tam SAP setiyle FBL1N mutabakatı ve kapsama analizi çalışır.

### CSV satır seçimi

- Aday yöntem naiften iyiyse son dört hafta ortalaması hiç hesaplanmaz.
- Aday ve son dört hafta ortalaması naiften kötüyse mevsimsel naif yöntem kullanılır ve gerekçesi yazılır.
- Aday naiften kötüyken son dört hafta ortalaması naiften iyiyse o yöntem seçilir ve hatası gerekçede yer alır.
- Son dört hafta ortalamasının geriye dönük hatası, sabit bir seride gerçek pencere üzerinde sıfırdır.
- Son dört hafta ortalaması doğru hesaplanır; tek değerli seride o değerin kendisi döner.
- Son dört hafta ortalaması ufuk boyunca sabit tahmin verir ve pozitif bir sapma üretir.
- Akış okuyucu da aynı kuralı uygular: tırnak içinde satır sonu varsa hata, satır numarasıyla birlikte bildirilir.
- Tırnak içinde biten çok satırlı kayıttan sonra gelen yorum satırı atlanır ve kayıt sayısı bozulmaz.
- Tırnak içinde kalan '#' ile başlayan satır sessizce düşmez; hata dosya adı ve satır numarasıyla bildirilir.
- Noktalı virgül ayraçlı dosyada tırnaksız inç işareti değerin parçası olarak korunur.
- Tırnaksız inç işareti taşıyan meşru bir dosya reddedilmez; sonraki '#' satırı yorum sayılır.
- Kapanmamış tırnak kayıt kaybına yol açmaz; açık bir 'kapanmamış tırnak' hatası verilir.
- Araya '#' satırı girse de kapanmamış tırnak net bir hata verir.
- Akış okuyucuda kapanmamış tırnak da açık bir hata olarak bildirilir.
- Tırnak içinde iki satıra yayılan alan kapandığında tek kayıt olarak birleşir.
- Tırnak içindeki çift tırnak kaçışı tek tırnağa çevrilir.

### Fatura ve RBKP/RSEG belgeleri

- Alacak dekontu fatura olarak alınmaz ve süzülen kayıtlar arasında sayılır.
- Windows-1254 kodlamalı fatura dosyası okunur ve kodlama için uyarı verilir.
- Bozuk tutar tahmin edilmez; o satır tutarsız diye reddedilir, diğer satır yüklenir.
- Yüklenen fatura kayıtları dışa aktarıldığında aynı fatura numaralarını taşıyan dosya çıkar.
- Türkçe, İngilizce ve teknik başlıklı fatura dosyaları aynı tabloyu üretir.
- Bir girdinin yerine geçen alternatif dosya varsa o girdi eksik sayılmaz.
- Üçlü eşleştirmede çift fatura, fatura tablosundan bulunur.
- Fiyat sapması tablodan bulunur ve alacak dekontu bu bulguya karışmaz.
- Örnek veride metin fatura dosyası ile tablo fatura dosyası aynı bulguları verir.
- Sıfır miktarlı fatura satırı hata olur; dosyanın geri kalanı yine işlenir.

### Yorumlanamayan sonuçlar

- Adaptör, kaynakta olmayan alanları YOK satırıyla bildirir; bu alanlara bağlı kurallar yorumlanamaz sayılır.
- Eski, ödemesiz ve girişsiz fatura gerçek aday olarak kalır.
- Kısa bir logda zaman penceresi uygulanmaz; bulgular kesilmeden çıkar.
- Log sonuna yakın, pencerenin sağ ucunda kesilmiş fatura dışlanır ve dışlama sayılır.
- Ödenmiş ya da girişi olan kalem pencere içinde kalır; ödenmiş ama girişsiz fatura yine gerçek aday olur.
- Kaynakta olmayan alana bağlı kural, nedeniyle birlikte yorumlanamaz sayılır; alanlar tamamsa hiçbir şey dönmez.
- YOK satırı alan adlarına ayrıştırılır; satır yoksa liste boş kalır.
- Sipariş anomalisinde miktar ve plan alanları yoksa ilgili kurallar çalışmaz; sıfır bulgunun temiz anlamına gelmediği uyarılır.
- Siparişi olmayan mal kabulü, alan ilanından etkilenmeden sipariş dışı kabul olarak bulunur.
- Alan ilanı yoksa sipariş anomalisi önceki gibi çalışır: fazla teslimat bulunur ve yorumlanamaz alanı yazılmaz.
- Birim fiyat yoksa üçlü eşleştirmede fiyat sapması kuralı çalışmaz ve yorumlanamaz olarak listelenir.
- Miktar yoksa miktara dayalı kurallar yorumlanamaz sayılır; birim fiyata dayanan fiyat sapması yine çalışır.
- Alan ilanı olmayan üçlü eşleştirme önceki gibi fazla fatura miktarı ve fiyat sapması bulguları verir.

### Stok

- Stoğu sıfır ve sevkiyatı olmayan kalem ölü stok sayılmaz; emniyet stoğunun altındaysa kritik, değilse normal olur.

### Kule programlama arayüzü

- Veri alımında sayı biçimi yalnız SAP kipinde ve tr ya da en değerleriyle kabul edilir; diğer değerler reddedilir.
- Tırnak içinde kalan '#' satırı içeren veri alımı reddedilir, hiçbir şey yazılmaz ve hata dosya adı ile satır numarasını gösterir.

### Karar kaydı

- Bir tedarikçi çıkarıldığında yerine geçen kalemlerde emniyet stoğu azalmaz ve tedarik süresi dalgalanması havuzun altına düşmez.
- Tedarikçi bağımlılık tablosu her satırda tutarlıdır, risk sırasıyla azalan dizilir ve ana tedarikçi sayıları kalem sayısına eşittir.
- Tedarik süresi ACİL kalemin stok bitiş süresini aşarsa uyarı yalnız iç nota yazılır; tedarikçiye giden metinde görünmez.
- Tedarikçi taslağındaki satır sayısı, acil kalem sayısı ve tutar karar çıktısıyla birebir aynıdır; taslakta adres uydurulmaz.

### Ölçüm

- Komut satırı içe aktarımının süresi kaydedilir ve ölçüm özetinde görünür.
- Boş veritabanında kapanış süresi ve red oranı hesaplanmaz; sıfır değil boş görünür.
- Kapanan vakaların medyan süresi ve son yüklemenin red oranı doğru hesaplanır; açılıştan önce kapanmış bozuk kayıt sayılmaz.
- Sentetik olarak etiketlenmiş dosya ve yüklemeler ayrı sayılır; son yüklemenin sentetik durumu bildirilir.

### PDF ekstre

- Eksik PDF bağımlılığı mesajı belgelerdeki kurulum komutunu verir; adı karışabilecek bir paketi önermez.
- Çekirdek kurulumun bağımlılığı yoktur; PDF desteği isteğe bağlı ek paket olarak tanımlanır.
- PDF tutar çözücü sondaki eksi işaretini ve Türkçe ondalık biçimini doğru okur; belirsiz biçimleri reddeder.
- PDF kütüphanesi yoksa açık bir kurulum hatası verilir ve veri alımının çekirdeği çalışmaya devam eder.
- Başarılı PDF okumasından sonra arka planda kalan bir süreç olmaz.
- Geçersiz süre ayarı (sıfır, negatif ya da sayı olmayan) varsayılan süreye döner.
- Bir sayfadaki metin sınırı aşılırsa belge sınır hatasıyla reddedilir ve sayfa numarası bildirilir.
- Okuma süresi aşılırsa okuma durdurulur, süre hatası verilir ve arkada süreç kalmaz.
- Bozuk ve sınır durumdaki PDF dosyaları ham bir hata yerine açık bir okunamadı nedeniyle reddedilir.
- PDF içindeki betik çalıştırılmaz, ağa erişilmez ve bu durum bir uyarıyla bildirilir.
- Aynı ekstre CSV ya da PDF olarak verildiğinde çıkan tedarikçi satırları birebir aynıdır.
- Sonda eksi işaretli tutarlar bakiye zincirinde doğru işlenir; biçimi belirsiz sayılar reddedilir.
- Üç farklı tohumla üretilen metin tabanlı PDF ekstrelerinde tüm değerler beklenen satırlarla eşleşir ve bakiye zinciri tutarlı çıkar.
- Çizgili tablolu PDF'ler de üç tohumda aynı sonucu verir ve bakiye zinciri tutarlı kalır.
- Çok sayfalı ekstreler tek parça olarak okunur; sütun başlığı yalnız bir sayfada varsa her eksik sayfa için uyarı verilir.
- Farklı yazı tipi ve farklı başlık adı kullanan ekstre aynı satırları üretir ve bakiye zinciri tutarlı kalır.
- Devreden bakiye satırı devir borcu olarak, iade açıklaması taşıyan alacak satırı ise iade olarak sınıflandırılır.
- Bakiye zinciri kırık bir PDF belge, bakiye zinciri hatasıyla reddedilir.
- Bakiye zinciri kırık bir PDF ile dönüşüm yapılırsa çıktı CSV dosyası hiç yazılmaz.
- Hizası kayık tutarlar belirsiz sayılır ve satır belirsiz olarak reddedilir.
- Bakiye sütunu olmayan ama toplam kontrolü tutan ekstre kabul edilir; ne bakiye ne de toplam kontrolü olmayan ekstre reddedilir.
- Taranmış, metin katmanı olmayan PDF'ler metin yok hatasıyla reddedilir.
- Tedarikçi adı boş bırakılırsa PDF okuma, tedarikçi eksik hatasıyla reddedilir.

### Sabah raporu Excel okuma

- Geçerli bir ZIP arşivi olmayan xlsx içeriği 422 yanıtıyla reddedilir.
- SAP dosyalarının tamamı xlsx olarak gönderildiğinde yükleme kabul edilir ve sekiz dosya uyarlanır.
- Base64 olmayan xlsx içeriği 400 yanıtıyla reddedilir.
- Karşılığı olan bir SAP kaynağı bulunmayan xlsx dosyası 400 yanıtıyla reddedilir.
- SAP listesindeki bir xlsx dosyası kabul edilir ve gerçek dosya adıyla xlsx olarak okunur.
- SAP bayrağı olmadan gönderilen xlsx yükleme 400 yanıtıyla reddedilir.
- Aynı SAP kaynağı hem csv hem xlsx olarak gönderilirse istek 400 yanıtıyla reddedilir.
- İngilizce seçilince xlsx sayı hücreleri değişmez; metin hücreleri ise İngilizce sayı kuralına göre okunur.
- Türkçe seçilince xlsx sayı hücreleri değişmez; metin hücreleri ise Türkçe sayı kuralına göre okunur.

### SAP anonimleştirme

- Anonimleştirme aracı ağ erişimi kullanmaz.
- Aynı tedarikçi farklı satırlarda ve dosyalarda aynı sahte değeri alır; farklı tedarikçiler farklı değer alır.
- Anonimleştirilmiş çıktıda gerçek tedarikçi adları ve kodları geçmez.
- Eşleme tablosu çıktıda yer almaz ve çıktı klasörüne yazılması reddedilir.
- Aynı eşleme tablosu sonraki çalıştırmada yeniden kullanılır; böylece değerler tutarlı kalır.
- Sayılar, tarihler, ondalık biçimler ve sütun adları anonimleştirmeden sonra aynen korunur.
- Serbest metin sütunundaki bilinen tedarikçi adı da değişir ve tablodaki aynı sahte değeri kullanır.
- Tedarikçi, müşteri ve malzeme adları çıktının hiçbir yerinde geçmez; satır sayısı korunur.
- Anonimleştirme aracı, yalnızca kendi betiği ve girdi dosyasıyla komut satırından tek başına çalışır.
- Xlsx girdisi desteklenir; metindeki adlar değişir, sayı hücreleri olduğu gibi kalır.
- Çıktı klasörü girdi klasörüyle aynıysa işlem reddedilir ve girdi dosyası değişmez.
- Komut satırında çıktı olarak girdi klasörü seçilirse çıkış kodu 2 döner ve girdi değişmez.
- Üzerine yazma seçeneğiyle var olan çıktı dosyası yenilenir.
- Var olan çıktı dosyasının üzerine, üzerine yazma seçeneği olmadan yazılmaz.
- Xlsx girdisinden üretilecek csv çıktısı girdi klasörüne düşecekse işlem reddedilir ve girdi değişmez.
- Çıktı klasöründeki sabit bağ girdi dosyasını gösteriyorsa komut satırı 2 koduyla durur ve girdi değişmez.
- Girdi dosyasına sabit bağlı bir çıktı üzerine yazılamaz.
- Girdi dosyasına sembolik bağlı bir çıktı üzerine yazılamaz.
- Bağsız, düzenli bir çıktı dosyası üzerine yazma seçeneğiyle yine yenilenir.
- Girdi dışındaki bir dosyaya sabit bağlı çıktı hedefi komut satırında 2 koduyla reddedilir.
- Girdi dışındaki bir dosyaya sabit bağlı çıktı hedefinin içeriği ezilmez.
- Girdi dışındaki bir dosyaya sembolik bağlı çıktı hedefinin içeriği ezilmez.
- Kiril ve Yunan harflerinden oluşan görsel benzer yazımlar tedarikçi adını sızdırmaz.
- Küçük harfli Kiril ve Yunan benzerleri de tanınır; tedarikçi adı gizli kalır.
- Normal Latin harflerle yazılmış, bilinen bir adın yalnızca parçasına benzeyen adlar yanlışlıkla değiştirilmez.
- Sızıntı denetimi, Kiril harfli bir tedarikçi adı kalırsa bunu yakalar.
- Başlık satırındaki gerçek tedarikçi adı da anonimleştirilir.
- Büyük-küçük harf farkı, fazla boşluk ve kısmi tedarikçi adları çıktıda sızmaz.
- Anonimleştirme sonrası sızıntı kalırsa komut satırı 3 koduyla durur.
- Çıktı zaten varsa komut satırı 2 koduyla durur; aynı çalıştırma üzerine yazma seçeneğiyle başarılı olur.
- Anonimleştirme adımı gerçek bir değeri geçirirse sızıntı denetimi işlemi durdurur ve hiçbir dosya yazılmaz.
- Sızıntı denetimi büyük-küçük harf, boşluk ve kısmi ad farklılıklarını da yakalar.
- Çıktı girdi klasörüne yazılmak istenirse reddedilir ve girdi dosyası değişmez.
- Serbest metindeki tedarikçi adı, büyük-küçük harf farkı olsa bile tablodaki sahte değeri alır.
- Var olan çıktı, üzerine yazma seçeneği verilmeden yazılmaz; seçenek verilince yazılır.
- Tırnak içindeki çok satırlı tedarikçi adının devam satırı diyezle başlamıyorsa normal işlenir.
- Tırnak içindeki devam satırı diyezle başlıyorsa komut satırı sıfırdan farklı bir kod döner.
- Tırnak içindeki satır sonundan sonra gelen diyezli satır kaydı sessizce bozmaz; işlem durdurulur.
- Karışık büyük-küçük harf, noktalama, boşluk, tire, alt çizgi ve görünmez karakterle yapılan ad atlatmaları kapanır.
- Genel şirket eklerinin listesi sabittir ve testle korunur.
- İki karakterlik ad parçaları, örneğin AB veya 3M, metinde sızmaz.
- Sert boşluk ve Türkçe büyük İ varyantları sızmaz; genel bir şirket eki başka metinde yanlış eşleşmez.
- Sayısal tedarikçi kodu serbest metinde geçse bile sızmaz.
- Sızıntı denetimi birleşik işaretli, tam genişlikli, yumuşak tireli, harfleri aralıklı ve sayısal kodlu yeni biçimleri de yakalar.
- Unicode ile gizlenen tedarikçi adları (birleşik işaret, sıfır genişlikli boşluk, Kiril harf, tam genişlik, yumuşak tire, satır sonu) sızmaz ve satır sayısı korunur.
- Başlık satırı da gerçek tedarikçi adlarına karşı anonimleştirilir ve sütun sayısı korunur.
- Büyük-küçük harf farkı ve boşluklu ad varyantları çıktıda kalmaz.
- Tek başına genel bir şirket eki kimlik sayılmaz; başka bir şirketin sahte kodu ona verilmez.
- İki karakterlik gerçek ad serbest metinde kelime olarak geçtiğinde değiştirilir.
- Gerçek ad tam geçmese bile yalnızca bir parçası geçiyorsa o parça da değiştirilir.
- Serbest metindeki ad, tedarikçi adı hücresindeki sahte değerle aynı kalır.

### Sayı biçimi

- Dosya seçilen biçimle uyuşmuyorsa yanlış okunacak değerleri gösteren bir uyarı üretilir; değerler değişmez.
- İngilizce seçilmiş ama Türkçe yazılmış bir dosya uyuşmazlık olarak yakalanır.
- Seçilen biçimle uyuşan dosyada uyarı üretilmez.
- Türkçe seçilmiş ama İngilizce yazılmış bir dosya uyuşmazlık olarak yakalanır.
- Kanıt yoksa, yani yalnızca belirsiz değerler varsa, uyarı üretilmez.
- Bilinmeyen bir sayı biçimi ya da listede olmayan bir dosya adı, değeri gösteren bir hata verir.
- İngilizce seçilen dosya, aynı girdiyle Türkçeden farklı okunur: nokta ondalık, virgül binlik ayıracı sayılır.
- Biçim seçilmeyen dosya eski kuralla okunur ve belirsiz değerler reddedilir.
- Türkçe seçilen dosya, aynı girdiyle İngilizceden farklı okunur: virgül ondalık, nokta binlik ayıracı sayılır.
- Belirsiz değeri olmayan ya da boş sütunlar kontrol edilemedi olarak bildirilmez.
- Dosya raporunda kontrol edilemeyen sütun ve değer sayısı bildirilir; değerler değişmez.
- Sonunda eksi işareti olan belirsiz değerler de sayılır.
- İngilizce seçilince virgülden sonra üç basamaklı değerler kontrol edilemedi olarak bildirilir.
- Hem belirsiz hem net değer içeren sütun kontrol edilemedi olarak bildirilmez.
- Sütunda net bir karşı kanıt varsa belirsiz değerler kontrol edilemedi sayılmaz; uyuşmazlık olarak ayrıca bildirilir.
- Biçim seçilmeyen dosya için kontrol edilemedi bildirimi yapılmaz.
- Bir sütunun bütün değerleri belirsizse sütun, örnekleriyle birlikte kontrol edilemedi olarak bildirilir.
- İngilizce seçildiğinde nokta ondalık ayıracıdır; virgül binlik ayıracıdır.
- Seçilen biçimle uymayan bir değer reddedilir.
- Biçim seçilmediğinde eski kural değişmez ve belirsiz değerler reddedilir.
- Türkçe seçildiğinde nokta binlik ayıracıdır; virgül ondalık ayıracıdır.
- İngilizce yazılmış dosya Türkçe seçilince, yanlış okunacak satırlar satır numarasıyla ve iki okunuşuyla gösterilir.
- Uyarıda en fazla üç örnek gösterilir; kalanlar sayı olarak bildirilir.
- Rapor, yanlış okunan her değerin satırını, sütununu, değerini ve iki okunuşunu içerir.
- Tek değerli dosyada kanıt olmadığından uyarı çıkmaz; değer seçilen biçimle okunur.
- Toplu Türkçe biçimli değerler İngilizce seçilince yanlış okunan değerler, doğru okunuşla birlikte gösterilir.

### Sunucu güvenliği

- Xlsx'in '#' ile başlayan satırı csv'ye tüm hücreleriyle yazılır; ayraç içeren hücreler tırnaklanır.
- '#' ile başlayan hücrede satır sonu varsa dönüşüm reddedilir ve hedef dosya oluşmaz.
- Sıkıştırma bombası niteliğindeki xlsx yüklemesi 422 yanıtı ve sade bir sıkıştırma mesajıyla reddedilir; döküm görünmez.
- Olağandışı yüksek sıkıştırma oranına sahip xlsx dosyası reddedilir.
- İçinde izin verilenden fazla parça bulunan xlsx dosyası reddedilir.
- Normal boyutlu bir xlsx dosyası hâlâ doğru okunur.
- Arşiv dizininde yalan beyan edilen açık boyut belleği şişirmez; okuma küçük bir bellek tepesiyle reddedilir.

### Talep akışı

- Bitişik girdi, önceki sürümle birebir aynı çıktıyı üretir.
- Bitişik olmayan girdi, önceki sürümle birebir aynı çıktıyı üretir.
- Gerekli sütun eksikse hata mesajı eksik sütunun adını verir.
- Yalnızca yorum satırlarından oluşan dosya kayıt yok hatası verir.

### Excel okuma

- Xlsx'in '#' ile başlayan satırı, tüm hücreleriyle ve virgül içeren hücreler tırnaklı olarak csv'ye yazılır.
- '#' ile başlayan ilk hücrede satır sonu varsa dönüşüm reddedilir.
- Sayfa sayısı sınırı aşıldığında xlsx okuması reddedilir.
- Çok yüksek sıkıştırma oranlı xlsx okuması reddedilir.
- Açılan toplam boyut sınırı aşıldığında, her parça tek tek sınırın altında olsa bile okuma reddedilir.
- Zip içindeki üye sayısı sınırı aşıldığında okuma reddedilir.

### Yayın kapısı

- Düz metinde geçen bir kullanıcı adı sızıntı olarak yakalanır.
- Gerçek bir Windows kullanıcı yolu sızıntı olarak yakalanır ve kullanıcı adı ayrıca bildirilir.
- Satırda bir ipucu bulunsa bile gerçek yol sızıntı olarak yakalanır.
- Ters tırnaklı ad ve ipucu aynı satırdaysa, düz metindeki ad yine sızıntı sayılır.
- Ters tırnak içindeki kullanıcı adı, ipucu olmasa da sızıntı olarak yakalanır.
- Kuralı anlatan, yer tutucu yol ve ad içeren bir satır sızıntı sayılmaz.
- Yer tutucu yolun yanında gerçek bir yol varsa, gerçek olan yakalanır.
- Yalnızca yer tutucu bir yol içeren kural açıklaması geçer.

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

### Düzeltme bloğunu birleştirme

- Bozuk biçimli düzeltme bloğu reddedilir.
- Reddedilen iddia satırıyla birlikte çıkarılır; kabul edilenler kalır.

### Kayıt kimlikli denetim

- Kayıt kimliği depo, malzeme ya da tedarikçi alanından üretilir; hiçbiri yoksa genel kimlik verilir.
- Kimlikli kipte, kimliğin yanında iddiası olmayan sayı reddedilir.
- Yerleri değiştirilmiş sayılar reddedilir; doğru yerdekiler kabul edilir.

### Kısmi yeniden isteme

- İkinci istek yalnız reddedileni yeniden ister ve Kule'nin değerini ipucu olarak vermez.

### Yeniden ifade seçeneği

- Seçenek, denetimdeki yeniden ifade bayrağına iletilir.
- Yeniden ifade seçeneği varsayılanda kapalıdır ve ikinci tur kolu değişmez.

### Analist seçenekleri

- İkinci tur kolunun ve varsayılan analist seçeneklerinin değerleri sabittir.

### Şemalı çıktı

- Araç isteği ve son yanıt şemalı alandan okunur.
- Şemaya uymayan parametreler reddedilir.
- Şemalı çıktı yoksa sonuç olduğu gibi bırakılır.
- Şema yalnız analiste uygulanır ve varsayılanda kapalıdır.

### Varsayılan davranış korunur

- Sistem mesajı, araç çıktısı ve rapor biçimi varsayılanda değişmez.
- Varsayılan denetimde red listesi boş döner.

### Ölçüm koşusunu sürdürme

- Yarıda kesilen ölçüm koşusu kaldığı yerden devam eder.

### Güven aralığı hesapları

- Yüzde doksan başarı oranının alt güven sınırı doğru hesaplanır.
- Yüzde doksan oran için gereken örnek sayısı doğru bulunur.
- Hiç hata görülmediğinde hata oranı üst sınırı doğru hesaplanır.
- Veri yokken güven aralığı bütün aralığı kapsar.
- Yirmi sorgudan on altısı kabul edildiğinde güven aralığı doğru hesaplanır.

### Çağrı sayacı

- Başarılı çağrının süresi ölçülür ve kayıt noktasına yazılır.
- Girdi uyuşmazlığı koşuyu durdurur.
- Kotaya takılan çağrı ölçüm kaydına girmez.

### Plan, koşu ve hesap (0.7.0)

- Etiketsiz, geçersiz etiketli ya da yarıda kesilmiş koşular paydaya girmez ve dışarıda bırakılma nedeni gösterilir.
- Örneklem sayısı sıfır olduğunda sonuç doğrulanamadı olarak biçimlendirilir.
- Etiketler ve denetimlerle yapılan puanlama doğru özeti üretir; kopya, sözcük ve anlamsal yakalama ölçütleri beklenen sayıları verir.
- On iki koşu toplam 30 çağrıyla tamamlanır; her koşunun çağrı kaydı ayrı tutulur ve tüm koşular tek kayıt dosyasına yazılır.
- Kota dolunca koşu durur, model yeniden denenmez ve kalan koşular yapılamadı olarak işaretlenir.
- Çağrı tavanına ulaşılınca koşu durur ve kalan koşular yapılamadı olarak işaretlenir.
- Dosya değişince özet imzası uyuşmaz hale gelir; imza dosyası yoksa bu ayrıca bildirilir.
- Gerçek ön kayıt imzası doğrulanır ve uyarı vermez.
- Plan, iki eksen üzerinden serpiştirilmiş 12 koşudan oluşur ve bütçe tavana tam olarak eşittir.

## Kule arayüzü

### Kule panel arayüzü

- Sayfada, bir ihtiyacın kanıtlandığını ima eden bir ifade yer almaz.
- Uzantısı .xls olan web sayfası ya da Excel dosyası CSV değil diye uyarılır; metin dosyasında uyarı çıkmaz.
- Tablo dosyaları işaret sırası, noktalı virgül ayracı, ondalık virgül ve tırnak kaçışlarıyla doğru okunur.
- Excel satır sınırı uyarısı yalnız sınıra ulaşan metinde çıkar.
- Mevsimsel yöntem basit taban yöntemden kötüyse bu açıkça belirtilir.
- Arayüzdeki durum geçiş kuralları sunucudaki kurallarla birebir aynıdır.
- Yatırım getirisi elle yapılan hesapla aynı çıkar.
- Yatırım getirisi varsayılanları, her girdinin güven düzeyi belirtilerek seçilir.
- Kaynağı zaten yüklenmiş liste yüklendi diye işaretlenir; sunucu uyarısı sebep olur ve yüklenmemişler listenin sonuna iner.
- Boş durum adımları her SAP listesi için nereden alınacağını ve neyi açacağını söyler.
- Dünden beri rozeti yeni, tutarı değişen ve kaç gündür açık olduğunu gösterir; ilk beş parmak izini taşır.
- SAP biçimi olmayan metin tanınmaz.
- SAP dosyası, Türkçe ya da İngilizce etiketli veya teknik başlıkla, açıklama satırı ve işaretle birlikte de tanınır.
- Vaka süreleri kalan, bugün, gecikmiş ve kapanmış olarak doğru sınıflanır.
- Farklı 16 bit kodlamalı, işaretsiz, standart ve eski kodlamalı dosyalar çözülür; sekme ayraçlı malzeme hareketi tanınır.
- Aksiyonlar önem, etki türü ve tutar sırasıyla listelenir; tutarsız olanlar kendi düzeyinin sonunda yer alır.
- Kaynak atfı ve referans bağlantısı sayfada bulunur.
- Aynı sipariş kalemi, tutarı tek kez sayılacak biçimde işlenir.
- Ağırlık değişince sıralama değişir; ağırlıklar toplamı bir olacak biçimde ölçeklenir.
- Başlık normalleştirmesi sunucu tarafıyla birebir aynı sonucu verir.
- Bulgu doğruluğunda son işaret olay sırasındaki en sonuncusudur; işaret yoksa boş döner.
- Cari ekstre, çıkışlı malzeme hareketi ve FBL1N listesi doğru türde tanınır.
- Vaka yalnız yönetici tarafından kabul edilebilir; geçersiz durum geçişine izin verilmez.
- Eksik listeler dosya başına toplanır: önce eklenebilenler, sonra açtığı analiz ve diğer eksikler yazılır.
- Eksik sütunlu dosya tanınır ama eksik alanları listelenir.
- Emek tasarrufu hesabında kayıtlı süre tek değer olarak kullanılır; diğer kollar değişmez.
- Emek tasarrufunda alt sınır üst sınırdan farklıdır; eski tek sayı kaydı da okunur.
- Emniyet gerekçesi olan kritik kalem, eşiğin altına düşse de kritik kalır.
- Gerçek veride kalibrasyon ölçülemezse bu açıkça söylenir; hedef dışı sıfır doldurma kabul edilmez.
- Girdi ve SAP dosyası tablosu eşleme dosyasıyla birebir aynıdır.
- Hedef aralığının sınır değerleri hedef içinde sayılır; sınırın hemen üstündeki değer dışarıda kalır.
- İki veri kaynağı ayrı rozetlerle gösterilir ve metinleri gerçek veri sayfasıyla aynıdır.
- İlk beş bulgu sıraya göre verilir; sorumlu ve ipucu taşır, SAP ipucu olmayan modülde ipucu boştur.
- Kazanılan süre hesabında çeyrek aralığı kullanılır; tek kayıt tek tahmin sayılır.
- Yeni ölçüm kayıtları hesaptaki değeri günceller; kayıt kalmazsa varsayıma dönülür ve elle girilen değere dokunulmaz.
- Kabul edilen vakalar sütunu yalnız istendiğinde ya da dolu olduğunda görünür.
- Panelde reddedilen satırlardan en fazla yirmisi gösterilir.
- Red, kalite puanı, veri alım süresi ve sevkiyat bulguları sayfada yazılı olarak yer alır.
- Risk sayısı, hesabın kendi özetiyle aynıdır.
- Hata mesajı sütun, biçim, oturum, ağ ve sınır ipuçlarıyla sade biçimde verilir.
- Sayfadaki sayılar kanıt dosyalarıyla birebir uyuşur; kanıt yoksa bu kontrol atlanır.
- Karşılaştırma özeti yoksa karşılaştırma satırı çizilmez, sayfa yine de görünür.
- Sorumlu rol ve SAP ipucu, sunucudaki modül sahipleri listesiyle tutarlıdır.
- Süre girdisi sıfırdan bin dört yüz kırka kadar bir sayıdır ve virgüllü ondalık kabul edilir; diğerleri boş sayılır.
- Süre göstergesi her zaman varsayım olarak etiketlenir; geçersiz girdide metin gösterilmez.
- Tanıma tablosu eşleme dosyasıyla aynı kaynağı ve aynı alan kümesini taşır.
- Tanıma tablosundaki her Türkçe ve İngilizce etiket eşlemede tanımlıdır.
- Bir tedarikçi çıkarıldığında hacmi kalan tedarikçilere dağılır ve ilgili bulgular kapanır.
- Varsayılan ağırlıklarla hesaplanan puan ve seviye, ana hesabın sonucuyla aynıdır.
- Varsayılan stok eşikleri beklenen durum sınıflarını verir.
- Veri eksik olan bölümler nedenleriyle birlikte soluk olarak gösterilir.
- Veri yoksa sayfa hata vermeden boş bir durum gösterir.
- Yazma yetkisi sunucunun verdiği listeye göre belirlenir.
- Çizgi çerçeveli sabit genişlikli liste malzeme hareketi olarak tanınır.
- Sayfada kod olarak çalışabilecek bir ifade yer almaz.
- Ölçüm bağlarında kayıt yoksa değer boştur ve hesaba alınamaz; sıfır yazılmaz.
- Ölçüm bağlarında yalnız aylık vaka ve kayıtlı süre hesaba alınabilir; az kayıt ve dolmamış ay uyarılır.
- Örnek veride fazla stok payı, stok sonucundan okunur.

### Panel ek testleri (0.7.0)

- Tanınmayan dosya mesajı Excel'e değinmez; Excel dosyaları ayrıca uyarılır ve başlık satırı istenir.
- İstek gövdesi sınırı aşılırsa istek gönderilmez ve sade bir mesaj gösterilir.
- Boş dosya kendi mesajını alır: dosyanın sıfır bayt olduğu yazılır.
- İkili ya da bozuk kodlanmış içerik "metin değil" uyarısı alır; gerçek SAP metni bu uyarıdan etkilenmez.
- Türkçe arayüzde İngilizce cümle görünmez.
- Eksik alanlı bir dosya varken hazırla düğmesi devre dışı kalır.
- Panel betikleri sözdizimi hatası olmadan derlenir.
- Alan adları Türkçe ad ile kodu birlikte gösterir; bilinmeyen kod olduğu gibi kalır; kaynak verilirse o listenin etiketi kullanılır.
- Kayıt sayısı eşiğin altındayken medyan gizlenir ve nedeni yazılır.
- Açık kalma süresi 24 saatten kısaysa saat, daha uzunsa gün olarak gösterilir; değer yoksa süre yazılmaz.
- Açık temada girdi kutusu kenarlığı hem kağıt hem yüzey üzerinde en az 3:1 kontrast sağlar.
- Açık temada odak halkası kağıt üzerinde en az 3:1 kontrast sağlar.
- Boyutu aşırı büyük beyan edilmiş ama gerçekte küçük olan bir dosya sınır hatasıyla reddedilir.
- Tarayıcıdaki base64 kodlaması sunucu tarafıyla birebir aynı sonucu verir; Excel dosyasının baytları değişmeden gönderilir.
- Zip imzası olmayan bozuk .xlsx dosyası "okunamadı" uyarısı alır; genel "tanınmadı" mesajı verilmez.
- Bozuk .xlsx uyarısı ekran okuyucularda duyurulur.
- Yerel başlık konumu bozuksa hata anında fırlatılmaz; çağıran taraf "okunamadı" yanıtını verebilecek şekilde reddedilen bir sonuç döner.
- Veri yokken "Henüz ölçüm yok" yazılır; sayı kartı ya da sıfır değer gösterilmez.
- .xlsx dosyası kabul edilir ve sunucuya gönderilir; eski "okunmaz" metni artık gösterilmez.
- "Bilmiyorum" yanıtı kullanıcıyı SU3 → Varsayılanlar → Ondalık gösterim yoluna yönlendirir; yanlış bir yol gösterilmez ve düğmenin neden pasif olduğu yazılır.
- Belirsiz sayılar duyurulan bir alanda, iki okunuşuyla ve "Kule birini seçmez" notuyla gösterilir.
- Ondalık biçimi anlaşılamayan sütun, sihirbaz adımında ve sonuç ekranında sakin bir dille duyurulur.
- Seçilen ondalık biçim ekrana yansır ve sunucuya gönderilen istekte yer alır.
- Dosya adı, uyarı, ret nedeni ve tanınmayan dosya metinleri sade Türkçeyle ekrana yazılır.
- Excel dosyası için "önizleme yapılmaz" metni kalktı; yalnız belirsiz metin hücreleri sorulur.
- Dar ekranda yatay kaydırılan tablolar klavyeyle odaklanır ve ekran okuyucuya adlarıyla duyurulur.
- Dolu veride değerler ölçüm kayıtlarından alınır ve Türkçe sayı biçiminde gösterilir.
- Rastgele içerikli, kapanmamış satır etiketleri çok olan 6 MB'lık dosya bir saniye içinde sonuç ya da net hata verir; sıkıştırma oranı sınırına takılmaz.
- Rastgele içerikli, kapanmamış satır etiketleri çok olan 20 MB'lık dosya bir saniye içinde sonuç ya da net hata verir; sıkıştırma oranı sınırına takılmaz.
- Girdi, seçim ve açılır kutu kenarlıkları aynı kenarlık rengini kullanır.
- Tek satırda çok sayıda kapanmamış hücre etiketi olsa bile okuma bir saniye içinde sonuç ya da net hata verir.
- Elle girilen süre "Kullanıcı beyanı", Kule kartları "Kule ölçümü" rozetiyle ayrı ayrı gösterilir.
- İki üye de küçük beyan edilmiş ama toplam 80 MB'a açılıyorsa ortak sayaç sınırı aşılır ve sınır hatası verilir.
- İlişki kimliğinde özel karakter varsa düz "ilişki bulunamadı" hatası verilir; teknik hata kullanıcıya sızmaz.
- Kapanmamış ikinci satır sessizce atlanmaz; net bir hata verilir ve veri kaybı olmaz.
- Ölçüm özetinde TL, tasarruf ya da kazanç yazılmaz; önce ve sonra arasında olmayan bir fark uydurulmaz.
- Ekrana yazılan metinde HTML özel karakterleri kaçışlanır.
- Normal boyutlu, geçerli bir Excel dosyası hâlâ açılır ve metni döndürülür.
- Koyu temada, sistem ayarıyla ya da elle seçilse de girdi kenarlığı kağıt üzerinde en az 3:1 kontrast sağlar.
- Koyu temada odak rengi vurgu rengiyle aynıdır ve koyu kağıt üzerinde yüksek kontrast verir.
- Belirsiz sayı bloğunda uzun değer satır içinde kırılır; blok taşmaz.
- Kısmi veride kaydı olmayan kart "—" ve nedenini gösterir; sıfır yazılmaz.
- Adı .xlsx olan ama içeriği metin olan dosya, önceki gibi metin olarak tanınır ve uyarı verilmez.
- Odak halkası merkezi renk tanımından okunur; klavye odağında ve girdi alanı odaklandığında görünür.
- Örnek seçimi önce belirsiz değerleri alır ve istenen sayı kadar gösterir; sıra örnek listesiyle aynıdır.
- Ölçüm özeti panele, gezintiye ve canlı ekran kaydına doğru bağlanır; betikler doğru sırayla yüklenir.
- Sunucudan gelen ret kategorileri sade Türkçe adlarıyla gösterilir; tanınmayan kategori olduğu gibi kalır.
- Ret nedenindeki iç işaret sade metne çevrilir; dosya, SAP adıyla birlikte gösterilir.
- İç işaret hiçbir uyarı ya da hata metninde görünmez; kullanıcı, seçilen ayara göre okunamayan değeri görür.
- Eksik sütun uyarısı, eksik alanların adlarını içeren tek bir cümle olur; geliştirici notu ve başlık dökümü gösterilmez.
- Çok sayıda kapanmamış satır etiketi olsa bile okuma bir saniye içinde sonuç ya da net hata verir; okuyucu kendi kendini yavaşlatmaz.
- Belirsiz bir sayının iki okunuşu düz metin olarak, yan yana yazılır: Türkçe okunuş ve İngilizce okunuş.
- Belirsiz sayı metni üretilirken girdi listesi ve değer değişmez.
- Belirsizlik kararı ve iki okunuş, sunucunun kesin kuralıyla birebir aynı sonucu verir.
- Yalnız iki okunuşu da geçerli ve birbirinden farklı olan sayılar belirsiz sayılır; tek okunanlar ya da okunamayanlar belirsiz sayılmaz.
- Sayı biçimi isteğine yalnız tanınmış ve seçilmiş dosyalar girer; anahtar SAP kaynak adıdır.
- Ondalık biçimi anlaşılamayan sütunlar, sunucuyla aynı kuralla sütun düzeyinde belirlenir.
- Sayılar seçilen Türkçe ya da İngilizce biçime göre okunur; eksi işareti korunur, okunamayan değer boş döner.
- Önizlemede okunan sayı, sunucunun kesin kuralıyla birebir aynıdır.
- Sayı okuma, sunucudaki çeviriciyle aynı sonucu verir; tek gruplu belirsiz değerler bu kuraldan ayrı ele alınır.
- Okunuş Türkçe yazılır ve binlik ayraç içermez; okunamayan değer için "okunamaz" yazılır.
- Örnek sayılar sayısal SAP sütunlarından alınır; iki biçimde farklı okunanlar önce gelir.
- Sayı biçimi seçimi CSV dosyalarında her zaman sorulur; Excel dosyasında yalnız belirsiz metin hücresi varsa sorulur.
- Sayısal sütunlar tek tek, SAP alan koduna göre ayrılır ve değerler dosyadaki sırayla listelenir.
- Seçilen biçimle dosya içeriği çelişiyorsa uyarı verilir; belirsiz değerler bu kontrole dahil edilmez.
- Yanlış okunabilecek değerler satır, sütun, değer ve iki okunuşuyla listelenir; sunucuyla birebir aynıdır.
- Senaryo ekranındaki tedarikçi seçeneğinde seviye bilgisi HTML olarak kaçışlanır.
- Sentetik veri başlıkta ve ret kartında etiketlenir; kaç kaydın sentetik olduğu yazılır.
- Ortak metin tablosunda çok sayıda kapanmamış giriş olsa bile okuma bir saniye içinde sonuç ya da net hata verir.
- Sıkıştırılmamış bir dosya küçük boyut beyan edip gerçekte 70 MB ise toplam açık boyut sınırı aşılır ve sınır hatası verilir.
- Sunucudan gelen yükleme kimliği ve tarih gibi metinler ekranda kaçışlanır.
- Telefon genişliğinde açılır özetler en az 44 piksel yüksekliğindedir; satır içi yükseklik sınırı yoktur.
- Telefon genişliğinde düğmeler, girdi kutuları, seçimler ve kaldırma hedefleri en az 44 piksel yüksekliğindedir.
- Etiketi olmayan, kullanıcının kendi yüklediği dosya "Kendi dosyalarınız · gerçek veri" rozetiyle gösterilir.
- Beyanı 1 KB olup gerçekte 40 MB'a açılan Excel dosyası, sınır aşılınca sekmeyi dondurmadan reddedilir.
- Açık boyut sınırı (64 MB) tüm üyelerin toplamına uygulanır; beyan toplamı sınırı aşarsa hiçbir üye açılmaz.
- Normal boyutlu geçerli Excel dosyası sınırlar yüzünden engellenmez ve açılır.
- Binlerce üyesi olan Excel dosyası, açılmadan üye sayısı sınırıyla reddedilir.
- Excel'den çıkarılan metin SAP tanımasından geçer ve EKPO başlığı tanınır.
- Bozuk zip dosyası reddedilir; sessizce boş metin döndürülmez.
- Excel'in ilk sayfası sekmeyle ayrılmış metne çevrilir; ortak ve satır içi metin, sayılar ve kaçış karakterleri doğru okunur.
- Excel'den yalnız metin hücreleri alınır; sayı tipindeki hücreler listeye girmez.
- Oranı 1000'e 1 olan zip bombası açılmadan reddedilir; sınır işareti yanıt yolunda kaybolmaz ve "sınırı aştı" uyarısı gösterilir.
- Bir dosyanın Excel sayılması için hem .xlsx adı hem zip imzası gerekir; yalnız biri yeterli değildir.
- Excel'de yalnız iki okunuşu farklı metin değerler sorulur; "4711" ve "abc" gibi değerler sorulmaz.
- Küçük beyan edilip 80 MB'a açılan üye, akış sırasında kesilir ve sınır hatası verilir.
- Adı .xlsx olmayan zip dosyası Office ya da zip dosyası olarak adlandırılır ve Excel adımı gösterilmez.
- Örnek paket düğmeleri giriş anahtarı yokken pasif olur; sonuç başlığı klavyeyle odaklanabilir.
