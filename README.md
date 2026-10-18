# Kule Pro: tedarik zinciri karar destek aracı

**Dil / Language:** Türkçe (bu sayfa) · [English](README.en.md)

Kule Pro, bir işletmenin stok, sipariş, tedarikçi, fatura ve üretim dosyalarını okur ve her sabah şu soruların cevabını hazır verir: **hangi kalem bitmek üzere, ne kadar ve ne zaman sipariş edilmeli, hangi siparişte ya da faturada tutarsızlık var, hangi tedarikçiye güvenilemiyor, para nerede kaçıyor.** Yanında, aracın modüllerini kullanarak soru soran ve kendi cevabını denetleyen bir çok ajanlı orkestratör bulunur.

**Canlı sayfalar** (sağ alttaki TR / EN düğmesiyle dil değişir):

- [Giriş](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Portföy sayfası](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/)
- [Ajan iz görüntüleyici](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/): örnek izler, onay kapısı, Denetçi kararları, eval

## 1. Ne işe yarar

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

## 2. Nasıl çalışır

![Sistem genel görünümü: CSV girdisi, girdi sözleşmesi, SQLite, altı modül, CLI/REST/panel; altta ajan orkestratörü](docs/img/sistem-genel.svg)

1. **Girdi.** İşletmenin dışa aktardığı CSV dosyaları (stok, sevkiyat, sipariş, mal kabul, irsaliye, talep geçmişi, tedarikçi teslimatı, üretim) ve fatura metni. `.xlsx` dosyaları da okunur; Türkçe ve boşluklu sütun başlıkları (`Malzeme No.`, `Stok Miktarı`) otomatik eşlenir. SAP tarzı dışa aktarımlar (EKPO, MSEG, MARD, LIPS) alan eşleme dosyasıyla Kule biçimine çevrilir.
2. **Doğrulama.** Her satır bir girdi sözleşmesine göre denetlenir: tür, zorunlu alan, alt sınır, seçenek, alanlar arası kural, tekrar. Bozuk satır sessizce kaybolmaz; nedeniyle birlikte saklanır ve dosyanın **veri kalitesi skoruna** (eksik, tutarsız, tekrar, bayat) yansır.
3. **Saklama.** Temiz veri SQLite'a yazılır. Her çalıştırma bir *anlık görüntü* bırakır; iki görüntü arasındaki fark çıkarılabilir.
4. **Analiz.** Altı modül aynı JSON zarfını üretir (sayılar, bulgular, uyarılar, hangi yöntemin kullanıldığı).
5. **Karar.** Karar motoru bulguları parasal etkiyle önem puanına çevirir ve sipariş önerisi çıkarır.
6. **Sunum.** Komut satırı, REST API, tarayıcı paneli ve günlük/haftalık özet raporları.

## 3. Modüller

| Modül | Ne yapar | Yöntem |
|---|---|---|
| `stok_durumu` | Kapsama günü; KRITIK / OLU_STOK / FAZLA_STOK; ABC sınıfı | Kural tabanlı |
| `siparis_anomali` | 7 tür sipariş–mal kabul tutarsızlığı, önem sırası; iptaller (102) düşülür | Kural tabanlı |
| `talep_tahmini` | 8 haftalık talep tahmini, %80 aralık, geriye dönük test | Toplamsal Holt-Winters (52 hafta mevsimsellik) |
| `tedarikci_skoru` | Zamanında teslim, red oranı, fiyat sapması → 0–100 skor, A/B/C/D | Ağırlıklı kural (%40 / %35 / %25) |
| `uclu_eslestirme` | Sipariş–irsaliye–fatura: çift fatura, fazla faturalama, fiyat sapması, irsaliyesiz fatura | Kural tabanlı; fatura satırları düzenli metin kalıbıyla çıkarılır |
| `oee` | Kullanılabilirlik × performans × kalite; duruş Pareto'su; kök neden önerisi | Hesap + kural |
| `aciklama` | Modül çıktılarından Türkçe özet | Şablon; isteğe bağlı olarak OpenAI uyumlu bir dil modeli uç noktası |

Varsayılanda hiçbir modül dil modeli çağırmaz; sonuçlar sıradan, test edilebilir hesaplardan gelir. `KULE_ACIKLAMA_SAGLAYICI=claude` ile açıklama katmanı yerel `claude` ile çalıştırılabilir; bir koşuda metindeki 24 sayının hepsi kural çıktısında birebir bulundu. Dil modeli yalnız isteğe bağlı açıklama katmanında kullanılabilir ve ham veriyi değil, toplu özet cümlelerini görür.

## 4. Karar motoru: ne kadar, ne zaman sipariş

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

## 5. Panel ve raporlar

Tarayıcıda açılan, bağımlılıksız panel dört ekrandan oluşur:

- **Yönetici özeti:** öncelikli 5 aksiyon, parasal etki, alan bazında risk sıralaması, talep yönü. Aynı sipariş kalemini iki modül bulursa tutar bir kez sayılır.
- **ROI hesaplayıcı:** stok taşıma, fatura kaçağı, gecikme ve elle kontrol emeği kollarında alt–üst aralıkla yıllık tasarruf, net ve geri ödeme; her kalemin formülü kullanıcının sayılarıyla dökülür.
- **Senaryo:** tedarikçi skoru ağırlıklarını, stok eşiklerini ve "tedarikçi çıkarsa" durumunu tarayıcıda oynatın; varsayılan ayarda Python modülleriyle birebir aynı sonucu verir.
- **Rapor:** yazdırılabilir yönetici raporu (PDF) ve Türkçe Excel uyumlu CSV.

`python -m kule ozet` günlük ve haftalık özeti (Markdown, tek dosya HTML, JSON, CSV) üretir. Sipariş gereken her tedarikçi için e-posta **taslağı** yazılır: kalemler, miktar, en geç teslim tarihi ve tedarikçinin ölçülen teslim performansı. Kule e-posta göndermez; taslağı sizin gözden geçirmeniz için hazırlar.

## 6. Entegrasyon ve güvenlik

- **REST API** (`/v1`, 21 rota, OpenAPI sözleşmesi): vakalar, bulgular, görüntüler, fark, modül çıktısı, kalite, ingest, karar, simülasyon, özet, denetim, kullanıcılar.
- **Roller:** planlayıcı, satın alma, yönetici. Vakayı modülün sahibi rol yazar (stok, talep, OEE → planlayıcı; sipariş, fatura, tedarikçi → satın alma); `KABUL_EDILDI` yalnız yönetici verir.
- **Denetim izi:** kimliksiz (401) ve yetkisiz (403) her çağrı, hız sınırına takılan (429) çağrılar ve her kimlikli işlem kaydedilir. Token'lar veritabanında yalnız SHA-256 özetiyle tutulur.
- **Dayanıklılık:** istemci başına hız sınırı (varsayılan 300 istek/dk), 20 MB gövde sınırı, 128 KB'tan büyük alanlarda temiz hata mesajı, TLS'li ters vekil kurulum kılavuzu.
- **Bağımlılık:** yalnız Python standart kütüphanesi. `pip install` gerekmez; `python demo.py` ile kurulumsuz, bir iki saniyede ilk karar çıktısı alınır.

## 7. Ölçülen sonuçlar

**Bilerek bozulmuş örnek veride yakalama.** Üretici veriye bilinen hatalar yerleştirir; modüller bunları bulur, fazlasını bulmaz:

| Modül | Yerleştirilen | Bulunan |
|---|---|---|
| Sipariş anomalisi | 7 anomali (+3 temiz zor durum) | 7, temiz durumlar işaretlenmedi |
| Üçlü eşleştirme | 4 bulgu (çift fatura, fazla faturalama, %8 fiyat sapması, irsaliyesiz fatura) | 4 |

**Büyük gerçek veri.** Herkese açık DataCo Smart Supply Chain veri kümesinden uyarlanan **172.765 sevkiyat satırı** tek ingest'te yüklendi: 172.765 kabul, 0 ret, 0 çökme, yaklaşık 8 saniye.

**Talep tahmini.** Örnek veride Holt-Winters'in geriye dönük test hatası (MAPE) ortalama 8,07; geçen yılın aynı haftasını alan basit yöntemin 11,16. Ayrıca aralıklı talep yöntemleri (Croston, SBA, TSB) ön-kayıtlı ölçütlerle denendi:

![Test MAPE ve test kapsaması: naif, Holt-Winters, Croston, SBA, TSB](docs/img/e8-olcum.svg)

Smooth sınıfta SBA iki ölçütü de geçti (kapsama %77,31, MAPE %248,00 ve naif %250,65); diğer sınıflar test penceresinde ölçülemedi; onlar için ürün-yaşam penceresiyle ayrı bir ölçüm gerekir.

**Tedarikçi skoru (örnek veri).** T-01 95,5 (A) ile T-03 36,3 (D) arasında net ayrım; T-03'ün zamanında teslimi %60, red oranı %9,29.

**Testler.** Kule için 224 Python ve 29 Node testi geçiyor; orkestratör için 44 birim testi var.

## 8. Ajan orkestratörü

![Soruşturma akışı: Planlayıcı, Analist, Denetçi; onay kapısı ve izin listesi](docs/img/ajan-akisi.svg)

Kule'nin modüllerini araç olarak kullanan ince bir çok ajanlı orkestratör. Yalnız Python standart kütüphanesiyle yazılmış çekirdek şunları içerir: durum makinesi, adım ve jeton bütçesi, zaman aşımı, geri çekilmeli yeniden deneme, araç izin listesi, yan etkili araçlar için onay kapısı ve her olayı kaydeden iz.

Örnek soru: *"IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret."*

| Rol | Ne yapar | Nasıl |
|---|---|---|
| Planlayıcı | Soruyu alt görevlere böler | Model, araçsız |
| Analist | Kule modüllerini araç olarak çağırır, bulguyu yorumlar, sayılarını `iddialar` bloğuna yazar | Model; araçlar `stok_sorgu`, `tedarikci_sorgu` |
| Denetçi | Her iddiayı Kule'nin kendi hesabıyla yeniden karşılaştırır; tutmazsa Analist'i reddeder | **Kod**, model değil |

Örnek izde Analist ilk denemede T-03 skorunu 58,0 yazar, Kule 36,3 hesaplar; Denetçi reddeder, ikinci denemede 36,3 kabul edilir. Fikir: modelin ürettiği her sayı, deterministik hesapla çapraz kontrol edilmeden kullanıcıya ulaşmaz. [İz görüntüleyicide](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) "Soruşturma · Analist 1. deneme" ve "2. deneme" izlerini adım adım açabilirsiniz. Bu örnek elle yazılmış kasetten gelir. Ayrıca yerel `claude` ile gerçek modelle bir koşu daha yapıldı ("Gerçek model" izleri): Analist ilk denemede `deger` alanına sayı yerine malzeme listesi yazdı, Denetçi Kule'nin sayısıyla (3) karşılaştırıp reddetti; ikinci denemede beş iddia da Kule'nin hesabıyla eşleşti ve kabul edildi. Görüntüleyici her izin kaynağını rozetle belirtir: GERÇEK MODEL KAYDI, ELLE YAZILMIŞ KAYIT ya da KOD SATIRI.

### Eval

![Eval: 24 vaka, 22 ölçüt/kontrol/kapsam geçti, 2 bilinen açık gözlendi](docs/img/eval-vakalar.svg)

24 vakalık eval: Denetçi (13 ölçüt + 1 kapsam dışı), yetki ve onay (3 ölçüt + 1 pozitif kontrol), enjeksiyon (2 ölçüt + 2 açık bırakılan vaka), uçtan uca (2). Ölçüt, kontrol ve kapsam vakalarının **22/22'si geçti**; iki enjeksiyon vakası bilerek açık bırakıldı ve olduğu gibi raporlanıyor (araç çıktısındaki gömülü komutun son yanıta sızması; onay verilmişken enjeksiyonla başlatılan yazma). Eval, bilerek bozulmuş iki sürümü de yakalar: her şeyi kabul eden Denetçi ve yetki kontrolü olmayan orkestratör.

## 9. Kapsam ve durum

- **Veri.** Örnek veri sentetiktir (tohum 42); ölçümler sentetik ve herkese açık DataCo verisiyle yapılmıştır. ROI hesaplayıcının girdileri kullanıcının kendi varsayımlarıdır.
- **Entegrasyon.** Girdi CSV ve `.xlsx` dosyasıdır; SAP tarzı dışa aktarımlar eşleme dosyasıyla okunur. Canlı SAP ya da OCR bağlantısı yoktur.
- **API.** Demo ve pilot kurulum için tasarlanmıştır: roller, denetim izi, hız sınırı vardır; TLS için ters vekil kılavuzu hazırdır, SSO yoktur.
- **Orkestratör.** Gerçek model koşusu tek bir senaryoyla (soruşturma) ve `claude-haiku-5-5` ile yapıldı: 7 model çağrısı, 2 deneme (1 ret, 1 kabul). Diğer izler elle yazılmış kasetlerdir. Planlayıcı "sayı üretme" talimatına uydu ama görev dışına çıkıp taslak e-posta yazdı; Denetçi yalnız iddia bloğunu denetler, düz metindeki sayılara bakmaz.
- **Kaynak kod** bu depoda yoktur; burada statik sayfalar, çizimler ve ölçüm çıktıları bulunur.
- **Dil.** Bu sayfalar Türkçe ve İngilizcedir. Kule Pro'nun kendi paneli, komut satırı ve API çıktıları şu an Türkçedir.

## Lisans ve atıf

Kod ve sayfalar MIT lisanslıdır, bkz. [LICENSE](LICENSE). Ölçümlerde kullanılan veri: DataCo Smart Supply Chain (Mendeley Data), CC BY 4.0. Bu veri bir firmaya ait değildir ve bu depoda dağıtılmaz.
