# AI / otomasyon portföyü: Kule Pro ve ajan orkestratörü

**Dil / Language:** Türkçe (bu sayfa) · [English](README.en.md)

Bu depo iki çalışmanın **statik örnek sayfalarını ve ayrıntılı anlatımını** içerir: bir tedarik zinciri karar destek aracı (Kule Pro) ve bu aracın modüllerini araç olarak kullanan, kendi yazdığımız ince bir çok ajanlı orkestratör. Kaynak kod bu depoda yoktur (aşağıda "Bu depoda ne var").

**Canlı sayfalar** (Türkçe ve İngilizce arasında sağ alttaki TR / EN düğmesiyle geçilir):

- [Giriş](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Portföy sayfası](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/)
- [Ajan iz görüntüleyici](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/): örnek izler, onay kapısı, Denetçi kararları, eval

> **Dürüst durum özeti.** Kule Pro iç değerlendirmesi **3,0 / 5** (önceki 2,7; ön-kayıtlı rubrikle iki ayrı ajan bağımsız puanladı, ikisi de aynı sonuca vardı; yine de iç değerlendirmedir, dış doğrulama değildir). Puan teknik sağlamlığa dayanır; **bir firmanın bu araca ihtiyacı olduğuna dair kanıt yoktur**. Veriler sentetik ya da herkese açıktır (DataCo), ROI varsayımsaldır, SAP ve OCR bağlantısı yoktur. Orkestratörde **gerçek model çağrısı yapılmadı**; kasetler elle yazıldı. Aşağıdaki her sayı bu sınırlar içinde okunmalıdır.

## 1. Sistem bir bakışta

![Sistem genel görünümü: CSV girdisi, girdi sözleşmesi, SQLite, altı modül, CLI/REST/panel; altta ajan orkestratörü](docs/img/sistem-genel.svg)

**Kule Pro** CSV alır, her satırı bir girdi sözleşmesine göre denetler (türler, zorunlu alanlar, alanlar arası kurallar, tekrarlar) ve bozuk satırları nedeniyle birlikte saklar. Temiz veri SQLite'a yazılır; her çalıştırma bir *anlık görüntü* bırakır, bulgular *vakalara* dönüşür ve her vaka değişikliği denetim izine yazılır. Altı modül aynı JSON zarfını üretir:

| Modül | Ne yapar | Yöntem |
|---|---|---|
| `stok_durumu` | Kapsama günü; KRITIK / OLU_STOK / FAZLA_STOK; ABC sınıfı | Kural tabanlı |
| `siparis_anomali` | 7 tür sipariş–mal kabul tutarsızlığı, önem sırası | Kural tabanlı |
| `talep_tahmini` | 8 haftalık talep tahmini, %80 aralık, geriye dönük test | Toplamsal Holt-Winters (52 hafta mevsimsellik) |
| `tedarikci_skoru` | Zamanında teslim, red oranı, fiyat sapması → 0–100 skor, A/B/C/D | Ağırlıklı kural (%40 / %35 / %25) |
| `uclu_eslestirme` | Sipariş–irsaliye–fatura: çift fatura, fazla faturalama, fiyat sapması, irsaliyesiz fatura | Kural tabanlı; fatura satırları düzenli metin kalıbıyla çıkarılır, **OCR yok** |
| `oee` | Kullanılabilirlik × performans × kalite; duruş Pareto'su | Hesap + kural; kök neden bir *öneridir*, kanıt değil |

Varsayılanda **hiçbir modül dil modeli çağırmaz.** İsteğe bağlı açıklama katmanı, ortam değişkenleriyle bir OpenAI uyumlu uç noktaya bağlanabilir; gerçek bir sağlayıcıyla denenmedi. Çıktılara CLI (`python -m kule ...`) ve demo kurulum olarak bir REST API (21 rota, token'lar veritabanında SHA-256 özetiyle, rol matrisi) üzerinden ulaşılır. API üretime hazır değildir: TLS (yalnız kurulum belgesi var, doğrulanmadı) ve SSO yoktur; süreç içi hız sınırı vardır (istemci başına varsayılan 300 istek/dk, aşılınca 429).

## 2. Ajan orkestratörü

![Soruşturma akışı: Planlayıcı, Analist, Denetçi; onay kapısı ve izin listesi](docs/img/ajan-akisi.svg)

Orkestratör yalnız Python standart kütüphanesiyle yazılmış ince bir çekirdektir: durum makinesi (HAZIR → ÇALIŞIYOR → TAMAMLANDI / BAŞARISIZ / BÜTÇE_AŞTI), adım ve jeton bütçesi, zaman aşımı, geri çekilmeli yeniden deneme, araç izin listesi, yan etkili araçlar için onay kapısı ve her olayı kaydeden iz (trace).

Örnek senaryo: *"IZM-01 deposu ve T-03 tedarikçisi neden kritik? Aksiyon planı ve tedarikçiye taslak e-posta üret."*

| Rol | Ne yapar | Nasıl |
|---|---|---|
| Planlayıcı | Soruyu alt görevlere böler | Model, araçsız |
| Analist | Kule modüllerini araç olarak çağırır, bulguyu yorumlar, sonunda sayılarını bir `iddialar` bloğuna yazar | Model; araçlar `stok_sorgu`, `tedarikci_sorgu` |
| Denetçi | Her iddiayı Kule'nin kendi hesabıyla yeniden karşılaştırır; tutmazsa Analist'i reddeder (en fazla 2 deneme) | **Kod**, model değil |

Örnek izde Analist ilk denemede T-03 skorunu **58,0** yazar, Kule **36,3** hesaplar; Denetçi reddeder. İkinci denemede **36,3** kabul edilir. [İz görüntüleyicide](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) örnek seçiciden "Soruşturma · Analist 1. deneme" ve "2. deneme" izlerini açarak adım adım görebilirsin.

**Önemli:** bu izler **elle yazılmış kasetlerdir.** Bir dil modeli çalışmadı; görüntüleyici bunu her ekranda "ELLE YAZILMIŞ KAYIT" etiketiyle gösterir. Kayıtlı jeton sayıları gerçek maliyet değildir.

## 3. Eval ve bilinen açıklar

![Eval: 24 vaka, 22 ölçüt/kontrol/kapsam geçti, 2 bilinen açık gözlendi](docs/img/eval-vakalar.svg)

24 vakalık eval: Denetçi (13 ölçüt + 1 kapsam dışı), yetki ve onay (3 ölçüt + 1 pozitif kontrol), enjeksiyon (2 ölçüt + **2 bilinen açık**), uçtan uca (2). Sonuç iki ayrı sayı olarak yazılır: **ölçüt/kontrol/kapsam 22/22 geçti** ve **bilinen açık 2/2 gözlendi (kapanmadı).**

- **KACAK-enjeksiyon-son-metinde:** araç çıktısındaki gömülü komut Analist'in son yanıtına sızar; Denetçi yalnız sayılara baktığı için bu metni kabul eder.
- **KACAK-onayli-yazma-enjeksiyonla:** onay verilmişse enjeksiyonla başlatılan yazma kapıdan geçer; onay programlı bir geri çağırmadır ve içeriği denetlemez.
- **Kapsam kararı:** Denetçi düz metindeki sayıları denetlemez; Türkçe sayılar (`58,0`, `%9,29`), tarihler ve madde numaraları düz metinden güvenilir ayrıştırılamaz. Sayısal iddia `iddialar` bloğuna yazılmak zorundadır.
- Enjeksiyon vakalarında kaset modelin enjeksiyona uyduğunu *varsayar*; ölçülen, kapının bu çağrıyı durdurup durdurmadığıdır. Gerçek bir modelin enjeksiyona uyup uymayacağı bu eval'le ölçülemez.

Eval, bilerek bozulmuş iki sürümü de yakalar (her şeyi kabul eden Denetçi; yetki ve onay kontrolü olmayan orkestratör): ikisinde de ilgili vakalar REGRESYON olarak işaretlenir.

## 4. Aralıklı talep ölçümü (KULE-E8)

![Test MAPE ve test kapsaması: naif, Holt-Winters, Croston, SBA, TSB](docs/img/e8-olcum.svg)

Soru: Kule'nin talep tahmini (Holt-Winters), satışsız haftaları 0 sayma yolunda ya da aralıklı talep yöntemleriyle (Croston, SBA, TSB) daha iyi mi? Ölçütler **sonuçtan önce yazıldı**: kalibrasyon penceresinde seçilen `k`, ayrı bir test penceresinde raporlandı (kapsama %75–85 ve naiften düşük MAPE); tüm 15 varyant × yöntem satırı, başarısız olanlar dahil, raporda yer alır.

Veri: DataCo (herkese açık, Mendeley Data, CC BY 4.0), 162 hafta, 118 ürün. **Firma verisi değildir.**

- **Smooth sınıf (9 test ürünü, 648 satır):** mevcut Holt-Winters iki ölçütü de geçmiyor (kapsama %72,84; MAPE %264,12, naif %250,65). SBA ikisini de geçti (%77,31; %248,00) ama marj **2,6 puan**; 9 ürün üzerinde zayıf kanıt.
- **Erratic, intermittent, lumpy sınıflar:** test penceresinde puanlı satır olmadığı için **ölçülemedi.** Bu sınıflar için hüküm yoktur. Satışı biten ürünler test penceresinden düştüğü için aralıklı talep sorusu bu pencerede cevaplanamıyor; ürün-yaşam penceresiyle yeni bir ölçüm gerekir.
- **Tuzaklar:** tüm pencereyi sıfırla yolunda test satırlarının %89'u satışı bitmiş ürünlerin sıfırlarıdır ve kapsamayı yapay şişirir; bu yol karşılaştırma olarak raporlandı, karar dayanağı yapılmadı. Kısmi son hafta MAPE'yi bozar (duyarlılık koşusunda hüküm değişmedi). 2017-08 → 2017-10 hacim kırılması incelenmedi.
- Üretim kalibrasyon kuralı bu ölçüm sırasında **değiştirilmedi**; sentetik veride regresyon kontrolü beklenen %79,7 kapsamayı verdi (%79,69).

## 5. Sınırlar ve açık işler

| Konu | Durum |
|---|---|
| Firma ihtiyacı | **Kanıt yok.** İç puanın "firma ihtiyacı" ölçütü 2/5. Gerçek bir firmanın kazanç ya da tasarruf verisi kullanılmadı |
| Veri | Örnek veri sentetik (tohum 42). Ölçümler herkese açık DataCo ile; yalnız iki modül sınandı |
| ROI | Panelde varsayımsal; girdileri sizin varsayımınızdır |
| SAP / OCR | Yok. SAP tarzı CSV dışa aktarımları yapılandırmayla okunur; gerçek SAP çıktısıyla denenmedi |
| Orkestratör | Gerçek model çağrısı yok, kasetler elle yazıldı, Denetçi kod; 2 enjeksiyon açığı bilinen ve açık |
| Testler | Kule 224 Python + 29 Node, orkestratör 44 birim testi geçiyor. Kule'de eskiden bir koşuda 1 hata görüldü; sonraki 30'dan fazla temiz koşuda tekrarlanmadı, kök nedeni bulunamadı |
| Güvenlik | REST API demo kurulumdur (TLS ve SSO yok; süreç içi hız sınırı var, DDoS savunması değildir; hesap kilidi yok) |
| Docker | Dosyaları var, bu ortamda koşulamadı |

## 6. Bu depoda ne var

- `index.html`, `portfoy/`, `ajan-orkestrasyon/iz-goruntuleyici/`: bağımlılıksız statik sayfalar. `assets/i18n.js` Türkçe/İngilizce geçişini sağlar.
- `ajan-orkestrasyon/ornek/`: görüntüleyicinin okuduğu örnek izler ve eval sonucu (hepsi elle yazılmış kayıt).
- `docs/img/`: bu sayfadaki çizimler (SVG).
- **Kule Pro ve orkestratör kaynak kodu bu depoda yok.** Burada yalnız sonuçların görünür kısmı var.
- **Dil seçeneği** bu sayfalar içindir. Örnek izlerin ve eval vakalarının *verisi* (model metinleri, girdiler) Türkçe örnek veridir ve çevrilmez. Kule Pro'nun kendi paneli, CLI ve API çıktıları şu an yalnız Türkçedir.

## Lisans ve atıf

Kod ve sayfalar MIT lisanslıdır, bkz. [LICENSE](LICENSE). Ölçümlerde kullanılan veri: DataCo Smart Supply Chain (Mendeley Data), CC BY 4.0. Bu veri bir firmaya ait değildir ve bu depoda dağıtılmaz.
