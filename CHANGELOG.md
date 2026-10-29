# Değişiklik günlüğü

Bu dosya geçmişi yeniden yazmadan tutulur. Commit tarihleri değiştirilmedi.
18–19 Ekim 2026 arasındaki sürüm satırları **tarihsel olarak sonradan yazıldı** (ilk yayın sırasında değil, sonradan bu dosyaya işlendi). 21 Ekim 2026'dan sonraki satırlar kendi tarihinde yazıldı.

SHA'lar bu depodaki `git log` çıktısıdır. Kule (ölçüm ve test) SHA'ları yerel `cv-portfoy-kule` deposundandır; uzakta yoktur. "Commit yok" işaretli satırlar yayın kopyasında duruyor ve henüz commit edilmedi.

## 2026-10-29 (v0.6.0)

- **v0.6.0 demo güncellemesi:** statik demo (`demo/`) v0.6.0'a getirildi. Yedinci modül olarak FBL1N açık kalem mutabakatı, Sabah raporu ekranı (ilk 5 bulgu, atlanan analizler ve nedenleri), "Dünden beri" karşılaştırması (2. günü yükle düğmesi, YENİ / "N gündür açık" / "Tutar değişti" rozetleri) ve SAP dosya biçimleri notu eklendi. Veri Kule'nin sentetik deneme paketinden üretildi; demo yine statiktir, canlı API yoktur ve gerçek SAP ya da şirket verisi içermez. Özet metni "yedi modül" der (bir önceki yayında demo 6 modül gösterirken metin yanlışlıkla "yedi" demişti ve düzeltilmişti). Bağımsız denetimde gerçek tarayıcıda 49/49 kontrol geçti.
- **v0.6.0 (Kule commit `a772940`; sayılar `sayim.py` çıktısından):** Kule Pro'ya SAP dışa aktarımlarıyla çalışan bir sabah akışı eklendi. Kaynak kod yine yayınlanmıyor; anlatım, sayılar ve sınırlar güncellendi. Sayılar `sayim.py` ve `yayin_uret.py` çıktısından alınır, elle yazılmaz.
  - **SAP biçimleri:** ALV/SE16N dışa aktarımları TR ve EN başlıklarla, UTF-8, UTF-16 (BOM'lu ve BOM'suz) ve ANSI kodlamayla, sekme, noktalı virgül, virgül ya da dikey çizgi (`|`, "Unconverted" çerçeveli liste) ayracıyla okunur. ALV üst bilgisi ve toplam satırları atlanır, sondaki eksi işareti (`12,5-`) çevrilir. `.xls` uzantılı HTML/MHTML ve Excel dosyaları sade bir mesajla reddedilir; çevrilemeyen değer tahmin edilmez, satır reddedilir. Biçimler sentetik dosyalarla sınandı; **gerçek bir SAP sisteminin çıktısıyla denenmedi** ve varsayılan kodlama ile BOM kararı birincil kaynakla kesinleşmedi. Canlı SAP bağlantısı yoktur. Raporlar: KULE-S1, S7, S12, R5, R5b.
  - **FBL1N satıcı açık kalem mutabakatı:** yedinci analiz modülü. Kurallar: vadesi geçmiş, çift açık kalem, ödenmiş görünen açık kalem, tutar uyuşmazlığı, bakiye farkı ve kısmi ödeme (S12 ile altıncı kural olarak eklendi). SAP tarafı FBL1N dışa aktarımı, karşı taraf tedarikçinin ekstresidir (Kule CSV biçimi; ekstrenin SAP karşılığı yoktur). Elle hesaplanmış sınama setlerinde bulgular tür, belge ve etki düzeyinde birebir tuttu. Raporlar: KULE-S2, R6, Q1, Q4.
  - **Sabah raporu ekranı:** SAP dosyalarını sürükleyip bırakma, başlıktan otomatik tanıma, bugünün ilk 5 bulgusu, reddedilen satırlar ve hangi SAP listesinin eksik olduğunu söyleyen kart. Rapor tarihi artık istekten (ekranın gönderdiği bugün) ya da sunucunun bugününden alınır; sabit örnek tarih yalnız bütün girdiler örnek veri olduğunda kullanılır ve ekranda etiketlidir (S9). Sentetik SAP deneme paketi tek düğmeyle yüklenir; paket 5 dosya ve 17 bilinen sorun içerir, 17/17 yakalanır, beklenmeyen bulgu 0. Raporlar: KULE-S3, S4, S8, S9, S11, Q3, Q4.
  - **"Dünden beri" bölümü:** Sabah raporu, görüntüyü bir öncekiyle karşılaştırır: yeni, çözülen ya da kaybolan, tutarı değişen ve değişmeden süren bulgular; sahibi bekleyen vakalar ayrıca sayılır. Aynı sayılar ekranda, indirilen HTML raporunda ve CSV'de görünür. Karşılaştırma "bir önceki yükleme" ile yapılır; karar motoru bulgularında bu fark henüz yoktur. Rapor: KULE-S14.
  - **İndirilebilir rapor:** tek dosyalık yazdırılabilir HTML rapor ve Excel uyumlu, formül korumalı bulgu CSV'si; kişi adı ve erişim anahtarı içermez. Rapor: KULE-S13.
  - **Fatura hattı düzeltmesi (BPI 2019 adaptörü):** ±1 EUR sınırındaki kümülatif fatura dizileri artık mükerrer olarak tanınıyor, meşru kısmi faturalama (iki yarım fatura, iki yarım ödeme) yanlış alarm vermiyor. Tam XES çıktısı bir önceki sürümle bayt bayt aynı. Enjekte sınamada yakalama 7/20'den 20/20'ye, ek 10 türlük sette 14/16'dan 16/16'ya çıktı; bunlar kendi tohumumuzla yapılan sınamalardır, bağımsız yeniden sınama bekliyor. Raporlar: KULE-V6, V7, V9, Q5, Q6.
  - **Ölçüm altyapısı:** yükleme işleme süresi ölçülür; kullanıcı kendi süre tahminini kaydeder (yalnız kendi adına); "bulgu doğru muydu?" işareti denetim izine yazılır; özet ucu `/v1/olcum/ozet`. ROI hesabı Kule kayıtlarından iki değeri (aylık vaka, kayıtlı süre) kaynağıyla alabilir; tek tahmin "kullanıcı tahmini" etiketli ve çeyrek aralığıyla gösterilir (S10). Raporlar: KULE-M1, M2, Q2, S8, S10.
  - **Açık veri ölçek testleri:** M5, Favorita, SECOM, AI4I ve BPI 2019 ile modüller büyük girdide koşuldu; açık veri girdileri `ACIK_VERI_DAHILI_TEST` etiketiyle çıkar, `GERCEK_VERI` ile çıkmaz. Raporlar: KULE-V1–V8, S7, S12.
  - **Eval:** 123 vaka; ölçüt/kontrol/kapsam 111/111 geçti, 12 bilinen açık gözlendi ve kapanmadı. Orkestratörde parafraz denetimi artık Analist seçeneğinden açılabiliyor. Raporlar: KULE-C2, A1, ARASTIRMA-KULE-02. Gerçek model ölçümü yeniden yapılmadı; O1 sayıları değişmedi.
  - **Sayılar:** Kule Python 411, Node 58, orkestratör 111, toplam 580 (bir önceki sürümde 229 + 29 + 87 = 345). API 28 rota, işlem olarak sayılır (bir önceki sürümde 21). Kule SHA: `a772940`.
  - **Bilinen sınırlar:**
    - Gerçek SAP çıktısıyla denenmedi; biçimler sentetiktir.
    - **Sabah ekranı `.xlsx` dosyasını kabul etmez:** seçici `.csv` ve `.txt` ile sınırlıdır, `.xlsx` bırakılırsa "Farklı kaydet → CSV" uyarısıyla reddedilir. Sunucu `.xlsx` okuyabilir ama yalnız disk klasöründen. Kabul etmek bir ürün kararıdır. Rapor: KULE-R7.
    - BPI 2019 sonucu bir firma durumu ya da doğruluk ölçümü değildir: bulguların büyük kısmı adaptör varsayımından doğar, doğruluk ölçülmedi. AI4I ve SECOM için OEE değeri vekildir (proxy).
    - "Dünden beri" bir önceki yüklemeyle karşılaştırır; tutar eşiği 0,005 TL'dir.
    - Ölçüm kayıtları pilot ölçümü değildir: süre kullanıcının kendi tahminidir; ROI "ölçüme bağlı" değil "kısmen kayıtlı"dır.
    - Eval'deki 12 açık kapanmadı; Denetçi düz metindeki sayının bağlamını denetlemez.
    - Tam M5 talep koşusu ve 5 milyon satırlık koşu makinede bellek azlığı nedeniyle tamamlanamadı.

## 2026-10-22 (sonraki sürümler: v0.2.0, v0.2.1, v0.3.0, v0.4.0, v0.4.1, v0.4.2, v0.5.0)

- **v0.5.0 (bu güncelleme):** giriş ve ürün sayfası yeniden kuruldu: yalnız ürünün anlatımı (nedir, hangi sorunu çözer, nasıl çalışır, modüller, kanıt, sınırlar, nasıl denenir); özgeçmiş, işveren adları ve yazar adı sayfalardan çıkarıldı (LICENSE dosyasındaki telif sahibi satırı lisans gereği kaldı). Küçük animasyonlar (kaydırınca beliren bölümler, sayaçlar, akış diyagramı, tekrar oynat/duraklat) `prefers-reduced-motion` altında kapalıdır. Gerçek panel ekran görüntüleri sentetik veri rozetiyle eklendi. README ve ekran görüntüleri güncellendi. Rapor: KULE-D3.
- **v0.4.2 (`fb94f6b`):** eval sayıları ve çizimleri tek kaynaktan (46 vaka, 41/41 ölçüt, 5 bilinen açık), iki açık yan yana, YOL-HARITASI güncel. Rapor: KULE-A2.
- **v0.4.1 (bu güncelleme):** kanıt sayfasındaki SHA-256 doğrulaması düzeltildi. `kanit/SHA256SUMS` ve `paket.json` özetleri Windows'ta CRLF olarak çıkmış dosyalardan hesaplanmıştı; yayındaki dosyalar LF olduğundan Linux/macOS'ta `sha256sum -c` 9 dosyadan 8'inde FAILED veriyordu (dış analizle bildirildi, canlıda doğrulandı). Özetler yayındaki baytlardan yeniden üretildi, `.gitattributes` ile `kanit/*` için `eol=lf` sabitlendi, yayın kapısına özet ve satır sonu kontrolü eklendi. Raporlar: ARASTIRMA-KULE-01, ARASTIRMA-KULE-02.
- **v0.4.0 (`e301249`):** iki ayrı video (tanıtım 2 dk 45 sn, kullanım 4 dk 42 sn; sessiz, TR ve EN altyazılı, MP4/.srt/.vtt), oynatıcı sayfası (`video/`, `noindex`), README'ye video ve ekran görüntüsü bölümleri, canlı sayfalardan 4 ekran görüntüsü. Yeni ölçüm yok; sayılar v0.3.0 ile aynı. Raporlar: PORTFOY-V4, V5.
- **v0.3.0 (`83857f8`):** açık veri denemeleri eklendi. Mendeley *Retail Inventory Data* (model örnek verisi, 30/30 satır kabul) ve UCI *Online Retail II* (1.067.371 satır, vekil eşleme, yalnız ingest dayanıklılığı). `stok_durumu` gerçek veriyle koşulamadı; mal kabul, irsaliye, fatura ve üretim için açık gerçek veri bulunamadı. DataCo lisans notu güncellendi. Raporlar: ARASTIRMA-VERI-01, VERI-E1, VERI-T1, VERI-Y1.
- **v0.2.1 (`80c1bf7`):** iz görüntüleyiciye gerçek model koşularından 4 örnek iz, ana sayfada ve portföy sayfasında 4 kartlık okuma sırası, README özeti. Gerçek model koşu sayısı düzeltildi: 38 koşu yapıldı, 37'si tamamlandı, 1'i kotada kesildi. Rapor: PORTFOY-S2.
- **v0.2.0 (`42c5af4`):** test kanıtı sayfası (`kanit/`), 345 maddelik test kataloğu, SHA-256 manifesti, statik demo (`demo/`, MIT dışı), tohum bandı ve ROI varsayım tablosu (`olcum/`), `noindex`. Raporlar: PORTFOY-K2, K3, K4, O2.
- Aşağıdaki 22 Ekim satırlarının güncel hâli: orkestratör testleri 68 → 87 (G2b, G3, G4, G6); eval 24/24 → 34 vaka, 33/33 geçti, 1 bilinen açık (düz metindeki sayı yalnız Kule verisinde varlık için denetlenir). Körlemesine onay modu kapatıldı; onay yalnız içeriğin özetiyle yazmayı açar (G2b). Düz metindeki sayılar da denetlenir (G3). Planlayıcı çıktısı bir kod kapısından geçer, en çok 2 yeniden deneme (G4, G6). Raporlar: PORTFOY-G2b, G3, G4, G6.
- Gerçek model ölçümü (O1): 38/40 koşu, soruşturmada 16/20 kabul; yeniden ifade edilmiş sızıntı kapıdan geçti (0/6), bu bilinen bir sınırdır. Rapor: PORTFOY-O1.

## 2026-10-22

- **Düzeltme (yayın bütünlüğü, A2):** bu bölümdeki "Commit yok" işaretleri bayattır: `noindex` ve `demo/` v0.2.0 (`42c5af4`) ile zaten commit edilmişti. "--onay-ver açık kaldı" ve "eval 24/24" satırları aşağıdaki güncel hâl satırıyla geçersizdir: körlemesine onay yolu kapalıdır, bayrak yalnız senaryoya özgü özetle yazmayı açar. Eval bugün 46 vaka: ölçüt/kontrol/kapsam 41/41 geçti, 5 bilinen açık gözlendi (kaynak `ajan-orkestrasyon/ornek/eval-a3/`). Aşağıdaki eski satırlar değiştirilmedi.
- Kule Python testleri 224 → 229 (K1). Sayım koşudan üretildi, `sayim.py` ile. Kule SHA `1d31a4f`. Rapor: PORTFOY-K1.
- Orkestratör testleri 60 → 68 (G2, +8 regresyon testi; sayım 68/68). Rapor: PORTFOY-G2.
- Node testleri 29 (tam ağaçta 29/29). Geçici kopyada 1 test atlanır, nedeni yazılı. Rapor: PORTFOY-K1.
- Eval 22/24 → 24/24. İki açık ölçüte çevrildi; taban yeni adlarla yeniden yazıldı. Rapor: PORTFOY-G2.
- Enjeksiyon: araç çıktısının son yanıta sızması kapandı. Onaylı yazma özet eşleşmezse reddedilir. Körlemesine onay modu (`--onay-ver`) açık kaldı. Rapor: PORTFOY-G2.
- Yayın sayfalarındaki test sayıları JSON'dan üretildi ve kontrol modu ile denetlenir. Rapor: PORTFOY-K1. Commit yok.
- Üç HTML sayfasına `noindex` eklendi (index, portfoy, iz görüntüleyici). Commit yok. Canlı doğrulama push'tan sonra yapılacak. Rapor: PORTFOY-D2.
- Statik panel demosu eklendi (`demo/`; sentetik ve önceden hesaplanmış veri; tıklama testi 58/58). Commit yok. Rapor: PORTFOY-S1.
- İz verisindeki "ELLE YAZILMIŞ KAYIT" etiketi korundu. Rapor: PORTFOY-G2.

## 2026-10-19 (tarihsel olarak sonradan yazıldı)

- Gerçek model izleri ve İngilizce SVG'ler eklendi, rozetli iz görüntüleyici. SHA `98b3131`.
- Gerçek model sonrası metin düzeltmeleri (SVG, iz görüntüleyici altbilgisi, ana sayfa). SHA `a5c645a`.
- README: aracın ne yaptığını anlatan ayrıntılı sürüm (TR + EN). SHA `0bb9d9d`.

## 2026-10-18 (tarihsel olarak sonradan yazıldı)

- Puan 3,0/5 ve test sayıları (Kule 224 Python + 29 Node). SHA `66df4d0`.
- Eval sonucu: yazım hatası düzeltildi. SHA `2d7c1dc`.
- İz görüntüleyici: TR/EN dil geçişi. SHA `ed1f0da`.
- Giriş ve portföy sayfası: TR/EN dil geçişi; giriş sayfasına anlatım bağlantısı. SHA `30b79c8`.
- README: ayrıntılı anlatım, çizimler; İngilizce sürüm. SHA `9403a08`.
- Çizimler (SVG). SHA `f698c30`.
- TR/EN dil geçişi betiği. SHA `dda64a4`.
- İz görüntüleyici. SHA `c449a9a`.
- Eval sonucu. SHA `64de285`.
- Analist izleri ve eval sonucu. SHA `29d516c`.
- Portföy sayfası, analist izleri ve eval sonucu. SHA `8541b59`.
- README, giriş sayfası ve örnek izler. SHA `33bb039`.
- MIT lisansı. SHA `10169b0`.
