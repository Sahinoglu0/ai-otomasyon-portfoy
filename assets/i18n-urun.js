/* Giriş ve ürün sayfasının İngilizce karşılıkları (ürün sayfası metni). assets/i18n.js bu sözlüğü tam eşleşme olarak kullanır;
   bu dosya i18n.js'ten ÖNCE yüklenir. Anahtar: metin düğümünün boşlukları sadeleştirilmiş Türkçesi. */
window.I18N_EK = {
  /* başlık, üst bar, ortak */
  "Kule Pro — ürün anlatımı": "Kule Pro — product overview",
  "Kule Pro, bir işletmenin stok, sipariş, tedarikçi ve fatura verisinden her gün karar çıktısı üreten bir karar destek aracıdır. Ne yaptığını, nasıl çalıştığını ve neyin ölçüldüğünü anlatır.":
    "Kule Pro is a decision-support tool that turns a company's stock, order, supplier and invoice data into a daily decision output. This page explains what it does, how it works, and what has been measured.",
  "Nedir": "What it is", "Nasıl çalışır": "How it works", "Modüller": "Modules", "Kanıt": "Evidence",
  "Sınırlar": "Limits", "Dene": "Try it", "Ürün": "Product", "İzler": "Traces", "Sayfalar": "Pages",
  "Karar destek aracı · ürün anlatımı": "Decision-support tool · product overview",
  "Karar destek aracı · statik örnek sayfalar": "Decision-support tool · static sample pages",
  "Demoyu dene": "Try the demo", "İz görüntüleyiciyi aç": "Open the trace viewer", "Test kanıtını gör": "See the test evidence",
  "Ürünü tanı": "Meet the product",
  "Kule Pro · Yönetici özeti": "Kule Pro · Executive summary",
  "Kule Pro · Stok": "Kule Pro · Stock", "Kule Pro · Sipariş anomalisi": "Kule Pro · Order anomaly",
  "Kule Pro · Üçlü eşleştirme": "Kule Pro · Three-way matching", "Kule Pro · Tedarikçi": "Kule Pro · Supplier",
  "Kule Pro · Talep tahmini": "Kule Pro · Demand forecast",
  "Gerçek panel ekranı. Gösterilen veriler sentetik örnek veridir; gerçek bir şirkete ait değildir.":
    "Real panel screen. The data shown is synthetic sample data; it does not belong to a real company.",
  "Kule Pro panelinin yönetici özeti ekranı: tutar etkisi, bağlı sermaye, kritik stok kalemi, öncelikli aksiyonlar ve risk sıralaması.":
    "The executive summary screen of the Kule Pro panel: money impact, tied-up capital, critical stock items, priority actions and risk ranking.",
  "Kule Pro panelinin yönetici özeti ekranı, koyu tema.": "The executive summary screen of the Kule Pro panel, dark theme.",
  "Tekrar oynat": "Replay", "Duraklat": "Pause", "Sürdür": "Resume",
  "Demolardaki tüm veriler sentetiktir; gerçek şirket verisi kullanılmamıştır.": "All demo data is synthetic; no real company data was used.",
  "© 2026 · MIT lisansı.": "© 2026 · MIT license.",
  "demo/ klasörü": "demo/ folder", "bu lisansın dışındadır.": "is outside this license.",

  /* sayılar */
  "modül, aynı çıktı biçimi": "modules, one output format",
  "Kule · Python testi": "Kule · Python tests", "Orkestratör · birim testi": "Orchestrator · unit tests",
  "Panel · Node testi": "Panel · Node tests", "Eval · ölçüt, kontrol, kapsam": "Eval · criteria, checks, scope",

  /* 01 nedir */
  "01 / nedir": "01 / what it is", "Kule Pro nedir?": "What is Kule Pro?",
  "Kule Pro, bir işletmenin stok, sipariş, tedarikçi ve fatura dosyalarını okuyan bir karar destek aracıdır. Her sabah hangi kalemin bitmek üzere olduğunu, hangi siparişte tutarsızlık bulunduğunu ve hangi tedarikçinin güvenilmez göründüğünü hazır bir liste olarak verir. Çekirdeği kural tabanlı, test edilebilir hesaplardan oluşur; varsayılanda hiçbir modül dil modeli çağırmaz.":
    "Kule Pro is a decision-support tool that reads a company's stock, order, supplier and invoice files. Each morning it gives a ready list of items about to run out, order-to-receipt mismatches, and suppliers that look unreliable. Its core is rule-based calculations that can be tested; by default, no module calls a language model.",

  /* 02 sorun */
  "02 / sorun": "02 / problem", "Hangi sorunu çözer?": "What problem does it solve?",
  "Stok, sipariş, mal kabul ve fatura çoğu işletmede ayrı tablolarda kontrol edilir. Bir hata genellikle fark edildiğinde maliyeti çoktan oluşmuş olur. Kule Pro bu kontrolleri tek bir günlük çıktıda toplar: kritik ve ölü stok, sipariş–mal kabul–fatura tutarsızlıkları, tedarikçi performansı ve sipariş önerisi.":
    "In most companies, stock, orders, goods receipts and invoices are checked in separate tables. By the time an error is noticed, the cost has often already been incurred. Kule Pro brings these checks into one daily output: critical and dead stock, order, receipt and invoice mismatches, supplier performance, and an order suggestion.",
  "Aracı kullanacak kişiler farklı işlere bakar.": "Different people use it for different things.",
  "Planlayıcı": "Planner", "Stok ve talep tarafını izler.": "Follows stock and demand.",
  "Satın alma": "Purchasing", "Sipariş, fatura ve tedarikçi tarafını izler.": "Follows orders, invoices and suppliers.",
  "Yönetici": "Manager", "Özet ve maliyet tarafını izler.": "Follows the summary and the cost side.",

  /* 03 nasıl */
  "03 / nasıl çalışır": "03 / how it works", "Nasıl çalışır?": "How does it work?",
  "Veri bir kez okunur, satır satır denetlenir, modüllerden geçer ve karara dönüşür.":
    "Data is read once, checked row by row, passed through the modules and turned into a decision.",
  "Veri akışı: dosya, doğrulama, modüller, karar": "Data flow: file, validation, modules, decision",
  "işletmenin dışa aktardığı dosyalar": "files the company exports",
  "Doğrulama": "Validation", "her satır girdi sözleşmesine göre": "every row against an input contract",
  "SQLite, 7 kural tabanlı analiz": "SQLite, 7 rule-based analyses",
  "Karar": "Decision", "önem puanı ve sipariş önerisi": "importance score and order suggestion",
  "Veri": "Input",
  "İşletmenin dışa aktardığı CSV ve .xlsx dosyaları okunur. SAP tarzı dışa aktarımlar bir eşleme dosyasıyla Kule biçimine çevrilir.":
    "The CSV and .xlsx files a company exports are read. SAP-style exports are converted to Kule's format with a mapping file.",
  "Her satır bir girdi sözleşmesine göre denetlenir. Bozuk satır sessizce kaybolmaz; nedeni birlikte saklanır ve dosyanın veri kalitesi skoruna yansır.":
    "Every row is checked against an input contract. A bad row is not silently dropped; its reason is stored with it and reflected in the file's data-quality score.",
  "Saklama ve analiz": "Storage and analysis",
  "Temiz veri SQLite'a yazılır. Her çalıştırma bir anlık görüntü bırakır; iki görüntü arasındaki fark çıkarılabilir. Analiz modülleri aynı çıktı biçimini üretir.":
    "Clean data is written to SQLite. Each run leaves a snapshot, and the difference between two snapshots can be extracted. The analysis modules produce the same output format.",
  "Karar ve sunum": "Decision and output",
  "Karar motoru bulguları parasal etkilerine göre önem puanına çevirir ve sipariş önerisi çıkarır. Sonuçlar komut satırı, REST API, tarayıcı paneli ve günlük ya da haftalık raporlar olarak sunulur.":
    "The decision engine turns findings into an importance score based on their money impact and produces an order suggestion. Results are available through the command line, a REST API, a browser panel, and daily or weekly reports.",
  "Komut satırında karar çıktısı: kalem, durum, stok, günlük talep, emniyet stoğu, yeniden sipariş noktası, sipariş önerisi ve tedarikçi sütunları.":
    "Decision output on the command line: item, status, stock, daily demand, safety stock, reorder point, order suggestion and supplier columns.",
  "Komut satırı çıktısı, gerçek koşudan; düzenlenmedi. Girdi sentetik örnek veridir.":
    "Command-line output from a real run; not edited. The input is synthetic sample data.",
  "Ajan orkestratörü (ayrı bileşen)": "Agent orchestrator (a separate component)",
  "Kule'nin modüllerini araç olarak kullanan çok ajanlı bir akıştır. Planlayıcı soruyu alt görevlere böler. Analist modülleri çağırır, bulguyu yorumlar ve sayılarını bir iddia bloğuna yazar. Denetçi ise bir model değil, koddur: iddia bloğundaki her sayıyı Kule'nin kendi hesabıyla karşılaştırır ve tutmayan sayıyı reddeder.":
    "A multi-agent flow that uses Kule's modules as tools. The Planner splits the question into subtasks. The Analyst calls the modules, interprets the findings, and writes its numbers into a claims block. The Auditor is code, not a model: it compares every number in the claims block with Kule's own calculation and rejects any number that does not match.",
  "Denetçi yalnız iddia bloğunu kontrol eder; düz metindeki sayılar yalnızca Kule verisinde var olup olmadıklarına bakılarak denetlenir. Yan etkili araçlar (örneğin bir kayıt yazmak) insan onayı olmadan çalışmaz. Her adım bir iz olarak kaydedilir ve iz görüntüleyicide açılabilir.":
    "The Auditor checks only the claims block; numbers in plain text are checked only for whether they exist in Kule's data. Tools with side effects (for example, writing a record) do not run without human approval. Every step is recorded as a trace that can be opened in the trace viewer.",
  "Ajan akışı: Planlayıcı, Analist, Denetçi ve onay kapısı": "Agent flow: Planner, Analyst, Auditor and approval gate",
  "Soruyu alt görevlere böler": "Splits the question into subtasks",
  "Analist": "Analyst", "Modülleri çağırır, iddia bloğunu yazar": "Calls the modules, writes the claims block",
  "Denetçi (kod)": "Auditor (code)", "Sayıyı Kule'nin hesabıyla karşılaştırır": "Compares each number with Kule's calculation",
  "Yan etkili adımı insan onaylar": "A person approves the side-effect step",
  "2. deneme": "2nd try", "1. red": "1st: rejected", "2. kabul": "2nd: accepted", "Onaylandı": "Approved",
  "Red: Denetçi Analist'e geri gönderir": "Rejected: the Auditor sends it back to the Analyst",
  "Planlayıcı soruyu alt görevlere böler.": "The Planner splits the question into subtasks.",
  "Analist modülleri çağırır ve sayıları iddia bloğuna yazar.": "The Analyst calls the modules and writes the numbers into the claims block.",
  "Denetçi reddeder: iddia 58,0, Kule'nin hesabı 36,3.": "The Auditor rejects it: claimed 58.0, Kule's calculation 36.3.",
  "Analist ikinci denemede sayıyı düzeltir.": "On the second try the Analyst corrects the number.",
  "Denetçi kabul eder: sayı Kule'nin hesabıyla eşleşiyor.": "The Auditor accepts: the number matches Kule's calculation.",
  "Onay kapısı: yan etkili adım insan onayıyla çalışır.": "Approval gate: the side-effect step runs only with human approval.",
  "Örnek akış eval'deki bir vakadan alındı (T-03 tedarikçi skoru: iddia 58,0, Kule 36,3).":
    "The example flow is taken from an eval case (T-03 supplier score: claimed 58.0, Kule 36.3).",

  /* 04 modüller */
  "04 / modüller": "04 / modules",
  "Kule Pro yedi modülden oluşur. Her biri bir işi yapar ve aynı biçimde çıktı verir.":
    "Kule Pro has seven modules. Each one does one job and returns output in the same format.",
  "Stok durumu": "Stock status",
  "Her kalem için kapsama gününü hesaplar, kalemi KRİTİK, ÖLÜ STOK ya da FAZLA STOK olarak sınıflar ve ABC sınıfını verir.":
    "Calculates coverage days for each item, classifies it as CRITICAL, DEAD STOCK or EXCESS STOCK, and assigns an ABC class.",
  "Sipariş anomalisi": "Order anomaly",
  "Sipariş ile mal kabul kayıtları arasındaki yedi tür tutarsızlığı bulur ve önem sırasına koyar.":
    "Finds seven types of mismatch between orders and goods receipts and ranks them by importance.",
  "Talep tahmini": "Demand forecast",
  "Önümüzdeki sekiz hafta için talep tahmini verir; %80 güven aralığı ve geriye dönük test sonucu ile birlikte.":
    "Gives a demand forecast for the next eight weeks, together with an 80% confidence interval and a backtest result.",
  "Tedarikçi skoru": "Supplier score",
  "Zamanında teslim, red oranı ve fiyat sapmasından 0–100 arası bir skor ve A/B/C/D seviyesi üretir. Örnek veride T-01 95,5 (A), T-03 36,3 (D) çıkar.":
    "Produces a 0–100 score and an A/B/C/D level from on-time delivery, rejection rate and price deviation. In the sample data, T-01 scores 95.5 (A) and T-03 scores 36.3 (D).",
  "Üçlü eşleştirme": "Three-way matching",
  "Sipariş, irsaliye ve faturayı birlikte kontrol eder: çift fatura, fazla faturalama, fiyat sapması ve irsaliyesiz fatura.":
    "Checks order, delivery note and invoice together: duplicate invoices, over-billing, price deviation and invoices without a delivery note.",
  "OEE": "OEE",
  "Hat verimliliğini (kullanılabilirlik × performans × kalite) hesaplar ve duruşları Pareto grafiğine döker. Gerçek üretim verisiyle ölçülmedi (bkz. sınırlar).":
    "Calculates line effectiveness (availability × performance × quality) and breaks down downtime into a Pareto chart. Not measured on real production data (see limits).",
  "Açıklama": "Summary",
  "Modül çıktılarından Türkçe bir özet üretir. Varsayılanda şablonla çalışır; isteğe bağlı bir dil modeli yalnızca toplu özet cümlelerini görür, ham veriyi görmez.":
    "Produces a Turkish summary from the module outputs. By default it uses a template; an optional language model sees only aggregated summary sentences, never the raw data.",
  "Panelde modül ekranları": "Module screens in the panel", "Modül ekranları": "Module screens",
  "Stok": "Stock", "Tedarikçi": "Supplier",
  "Panelde stok modülü: kalemlerin kapsama günü ve KRİTİK, ÖLÜ STOK, FAZLA STOK sınıfları.":
    "Stock module in the panel: coverage days per item and CRITICAL, DEAD STOCK, EXCESS STOCK classes.",
  "Panelde stok modülü, koyu tema.": "Stock module in the panel, dark theme.",
  "Panelde sipariş anomalisi modülü: sipariş ile mal kabul arasındaki tutarsızlıklar önem sırasıyla.":
    "Order anomaly module in the panel: mismatches between orders and goods receipts, ranked by importance.",
  "Panelde sipariş anomalisi modülü, koyu tema.": "Order anomaly module in the panel, dark theme.",
  "Panelde üçlü eşleştirme modülü: sipariş, irsaliye ve fatura bulguları.":
    "Three-way matching module in the panel: order, delivery note and invoice findings.",
  "Panelde üçlü eşleştirme modülü, koyu tema.": "Three-way matching module in the panel, dark theme.",
  "Panelde tedarikçi puanı: altı tedarikçinin skoru, seviyesi, zamanında teslim, red ve fiyat sapması.":
    "Supplier score in the panel: score, level, on-time delivery, rejection and price deviation for six suppliers.",
  "Panelde tedarikçi puanı, koyu tema.": "Supplier score in the panel, dark theme.",
  "Panelde talep tahmini: sekiz haftalık tahmin ve güven aralığı.": "Demand forecast in the panel: eight-week forecast and confidence interval.",
  "Panelde talep tahmini, koyu tema.": "Demand forecast in the panel, dark theme.",
  "Ekranlar panelin kendisinden alındı. Panel ve komut satırı şu an Türkçe; modül ekranlarındaki veriler sentetiktir.":
    "The screens are taken from the panel itself. The panel and command line are currently in Turkish; the data in the module screens is synthetic.",

  /* 05 kanıt */
  "05 / kanıt": "05 / evidence", "Ne kanıtlandı?": "What has been tested?",
  "Testler": "Tests", "Gerçek model deneyi": "Real-model run", "Örneklem": "Sample size",
  "Ajan orkestratörü için 120 birim testi var. Son koşu 2 Kasım 2026 tarihli ve 0 başarısız test içeriyor.":
    "The agent orchestrator has 120 unit tests. The latest run is dated 2 November 2026 and had 0 failures.",
  "Ajan orkestratörünün değerlendirme seti 123 vakadan oluşur. Kasetten oynatılır, bu yüzden model kalitesini ölçmez. Ölçüt, kontrol ve kapsam vakalarının 111'i de geçti (111/111); 12 bilinen açık vakanın 12'si gözlendi ve kapanmadı.":
    "The orchestrator's evaluation set has 123 cases. It is replayed from recorded tapes, so it does not measure model quality. All 111 criteria, check and scope cases passed (111/111); all 12 known-gap cases were observed and are not closed.",
  "claude-haiku-5-5 ile planlanan 40 koşudan 38'i kaydedildi; 37'si tamamlandı, 1'i kota nedeniyle kesildi, 2'si yapılmadı. Soruşturma akışında 20 koşunun 16'sı kabul edildi (%80; %95 Wilson aralığı 0,584–0,919). Kaynak: 22 Ekim 2026 ön-kaydı ve bu turun kayıtları (o1/ozet.json, on-kayit.md); ham kayıtlar kanit/o1-ham/ altında, SHA-256 ile kanit/SHA256SUMS dosyasında listelenir. Bu sayılar yalnızca o turu kapsar; sonraki parafraz denetimi ölçümü bu kutuda sayılmaz ve ölçülmüş bir sonuç olarak sunulmaz. Ölçümler ön-kayıtlıdır; önceden yazılan hedefler vaat değildir ve sonuç ne çıkarsa o yayımlanır.":
    "With claude-haiku-5-5, 38 of 40 planned runs were recorded: 37 completed, 1 was cut off by a quota, and 2 were not run. In the investigation flow, 16 of 20 runs were accepted (80%; 95% Wilson interval 0.584–0.919). Source: the 22 October 2026 pre-registration and this round's records (o1/ozet.json, on-kayit.md); the raw records are under kanit/o1-ham/ and listed with SHA-256 in kanit/SHA256SUMS. These figures cover only that round; a later paraphrase-check measurement is not counted in this box and is not presented as a measured result. The measurements were pre-registered; the targets written in advance are not promises, and the result is published whatever it turns out to be.",
  "Bu örneklem küçüktür (soruşturma 20 koşu). Bir model kalitesi iddiası değildir.":
    "The sample is small (20 investigation runs). This is not a claim about model quality.",
  "İz görüntüleyici: ELLE YAZILMIŞ KAYIT rozeti, koşu özeti, adım bütçesi ve ajan şeridindeki zaman çizelgesi.":
    "Trace viewer: HAND-WRITTEN RECORD badge, run summary, step budget and the timeline in the agent lane.",
  "İz görüntüleyici: her izin kaynağı rozetle belirtilir. Bu kare elle yazılmış bir kaset koşusunu gösterir.":
    "Trace viewer: each trace's source is marked with a badge. This frame shows a hand-written tape run.",

  /* 06 sınırlar */
  "06 / sınırlar": "06 / limits",
  "Gerçek firma verisi yok": "No real company data", "Bilinen açık 1": "Known gap 1", "Bilinen açık 2": "Known gap 2",
  "ROI varsayıma bağlı": "ROI depends on assumptions",
  "Gerçek bir firmanın verisiyle ölçülmedi. Ölçümler sentetik veriyle (tohum 42) ve herkese açık DataCo Smart Supply Chain verisiyle yapıldı. Mal kabul, irsaliye, fatura ve üretim verisi için lisansı uygun gerçek veri bulunamadı; bu girdiler ölçülmedi.":
    "It has not been measured on a real company's data. Measurements used synthetic data (seed 42) and the publicly available DataCo Smart Supply Chain dataset. No real data with a suitable license was found for goods receipts, delivery notes, invoices, or production; those inputs were not measured.",
  "Eval'de düz metin içindeki sayının bağlamı denetlenmiyor. \"2 kritik kalem\" yazılan vaka kabul ediliyor, oysa gerçek sayı 3.":
    "In the eval, the context of a number in plain text is not checked. A case that writes \"2 critical items\" is accepted, although the real count is 3.",
  "Enjeksiyon metnini modelin kendi sözleriyle yeniden ifade ettiği durumlarda sızıntı denetimi yakalamadı (6 vakanın 0'ı).":
    "When the model rephrases an injected instruction in its own words, the leak check did not catch any of the 6 such cases.",
  "ROI hesaplayıcının sonucu kullanıcının kendi varsayımlarına bağlıdır. Bu yüzden tek bir TL rakamı sunulmaz; varsayım tablosu açıktır.":
    "The ROI calculator's result depends on the user's own assumptions. That is why no single currency figure is presented; the assumption table is open.",

  /* 07 dene */
  "07 / dene": "07 / try it", "Nasıl denenir?": "How can I try it?",
  "Kurulum gerektirmeyen statik demo, önceden hesaplanmış sonuçlarla çalışır. Canlı API yoktur.":
    "A static demo that needs no installation and runs on precomputed results. There is no live API.",
  "Soruşturma akışını adım adım açın. Her izin kaynağı rozetle belirtilir: GERÇEK MODEL KAYDI, ELLE YAZILMIŞ KAYIT ya da KOD SATIRI.":
    "Open the investigation flow step by step. Each trace's source is marked with a badge: REAL MODEL RECORD, HAND-WRITTEN RECORD, or CODE LINE.",
  "Test sayıları, davranış kataloğu ve SHA-256 ile doğrulanabilir kanıt paketi.":
    "Test counts, a behaviour catalogue, and an evidence package that can be verified with SHA-256.",

  /* 08 sss */
  "08 / sss": "08 / faq", "Sık sorulan sorular": "Frequently asked questions",
  "Kule Pro bir yapay zekâ mı?": "Is Kule Pro an AI product?",
  "Hayır, karar çıktıları kural tabanlıdır ve test edilebilir. Ajan orkestratörü ayrı bir bileşendir ve dil modeli kullanır; onun iddiaları da Kule'nin hesabıyla denetlenir.":
    "No. Decision outputs are rule-based and testable. The agent orchestrator is a separate component and uses a language model; its claims are also checked against Kule's own calculation.",
  "Gerçek bir firmanın verisiyle çalıştı mı?": "Has it been run on a real company's data?",
  "Hayır. Ölçümler sentetik veriyle ve herkese açık DataCo verisiyle yapıldı.":
    "No. The measurements used synthetic data and the publicly available DataCo dataset.",
  "Kaynak kodu neden yayımlanmıyor?": "Why isn't the source code published?",
  "Kaynak kod yayımlanmıyor. Bunun yerine test kanıtları, eval sonuçları, ölçüm çıktıları ve ajan izleri açık.":
    "The source code is not published. Test evidence, eval results, measurement outputs and agent traces are open instead.",
  "Ne gerekiyor?": "What do I need?",
  "Bu sayfalar ve demo için yalnız bir tarayıcı. Kule'nin kendisi Python 3.10 veya üstüyle çalışır; yalnız standart kütüphane kullanılır, ek paket kurmak gerekmez.":
    "Only a browser for these pages and the demo. Kule itself runs on Python 3.10 or later; it uses only the standard library, so no extra packages need to be installed.",
  "Hangi dillerde?": "Which languages?",
  "Bu sayfalar Türkçe ve İngilizce. Kule'nin paneli ve komut satırı çıktıları şu an Türkçe.":
    "These pages are in Turkish and English. The Kule panel and command-line output are currently in Turkish.",

  /* ürün sayfası metni (yeniden kurulum) */
  "Ürün anlatımı": "Product overview",
  "Kule Pro, bir işletmenin stok, sipariş, mal kabul ve fatura dosyalarını okuyup bakılacak işlerin listesini çıkarır. Ne yaptığını, nasıl okunduğunu ve sayıların nereden geldiğini anlatır.":
    "Kule Pro reads a company's stock, order, goods receipt and invoice files and produces a list of work to do. It explains what it does, how files are read, and where the numbers come from.",
  "Kule Pro: stok, sipariş ve fatura dosyalarınızdan bakılacak işler": "Kule Pro: work to do from your stock, order and invoice files",
  "Kule Pro, bir işletmenin SAP dışa aktarımlarını ve tedarikçi dosyalarını alıp bakılacak işlerin listesini çıkarır. Kararı insan verir diye tasarlandı: araç her bulguyu, dayanağını ve sorumlusunu gösterir. Aşağıda dosyanın nasıl okunduğunu, her modülün ne yaptığını ve sayıların nereden geldiğini bulabilirsiniz.":
    "Kule Pro takes SAP exports and supplier files from a business and produces a list of work to do. The product is built so that people make the decisions: the tool shows each finding, what it rests on, and who owns it. The sections below explain how a file is read, what each module does, and where the numbers come from.",
  "Panelden alınmış ekran. Veriler sentetik örnektir; gerçek bir şirkete ait değildir.":
    "Screen taken from the panel. The data is synthetic sample data and does not belong to a real company.",
  "Ürün anlatımı · sorun": "Product overview · problem",
  "Tutarsızlık ayrı tablolarda saklanır": "Mismatches sit in separate tables",
  "Stok, sipariş, mal kabul ve fatura çoğu zaman ayrı tablolarda ve ayrı kişilerde tutulur. Her tablo kendi içinde doğru görünebilir; fark ancak kayıtlar yan yana konduğunda ortaya çıkar.":
    "Stock, orders, goods receipts and invoices are often kept in separate tables, sometimes by separate people. Each table can look correct on its own; the gap appears only when the records are read side by side.",
  "Örneğin bir siparişle faturası miktar ya da tutar bakımından uyuşmayabilir ve bunu kimse, iki kayıt bir araya getirilene kadar görmez.":
    "For example, an order and its invoice may disagree on quantity or amount, and nobody sees it until the two records are put together.",
  "Dosyayı yüklersiniz, satırlar okunur": "You upload the file and the rows are read",
  "Dosyayı yüklersiniz. Stok, sipariş, mal kabul, fatura ve SAP dışa aktarımları kabul edilir; SAP dışa aktarımları CSV ya da .xlsx biçiminde gelebilir.":
    "You upload the file. Stock, purchase order, goods receipt, invoice and SAP export files are accepted, and SAP exports can arrive as CSV or .xlsx.",
  "Her satır okunur. Okunamayan satır atlanmaz; satır numarası ve nedeni listede gösterilir. Hiç satır okunamayan dosya kabul edilmez ve nedeni gösterilir.":
    "Every row is read. A row that cannot be read is not dropped; its row number and the reason appear in the list. A file with no readable rows is not accepted, and the reason is shown.",
  "Komut satırı çıktısı, gerçek bir koşudan; düzenlenmedi.": "Command-line output from a real run; not edited.",
  "Yedi analiz modülü": "Seven analysis modules",
  "Her modül verilere bir soru sorar.": "Each module asks the data one question.",
  "Kritik stoku ve ölü stoku ayırır.": "Separates critical stock from dead stock.",
  "Sipariş, mal kabul ve fatura arasındaki tutarsızlıkları bulur.": "Finds mismatches between orders, goods receipts and invoices.",
  "Geçmiş satıştan gelecek dönemin talebini tahmin eder.": "Estimates the demand for the coming period from past sales.",
  "Tedarikçi performansını özetler.": "Summarizes supplier performance.",
  "Sipariş, mal kabul ve faturayı karşılaştırır.": "Compares orders, goods receipts and invoices.",
  "Ekipman genel verimliliğini hesaplar.": "Calculates overall equipment effectiveness.",
  "FBL1N açık kalem mutabakatı": "FBL1N open-item reconciliation",
  "Satıcı açık kalemlerini kontrol eder.": "Checks the vendor's open items.",
  "Ekranlar panelden alındı. Panel ve komut satırı şu an Türkçe.":
    "The screens are taken from the panel. The panel and the command line are currently in Turkish.",
  "Sürümler": "Releases",
  "Neyin ölçüldüğü": "What was measured",
  "Bir örnek dosya": "A sample file",
  "Test paketi, bilerek konmuş 18 hatalı bir örnek dosya içerir. Paket bu hataların 18'ini buldu ve listeye fazla bulgu eklemedi. Dosya uydurma verilerle hazırlandığı için bu sonuç, kuralların konmuş hataları yakalayabildiğini gösterir.":
    "The test suite includes a sample file with 18 deliberately planted errors. The suite found all 18 and added no extra findings. The file is invented, so the result shows that the rules catch planted errors.",
  "Ne ölçüldü": "What was measured",
  "Toplam 1652 otomatik test var: 1298 Python testi, 120 ajan orkestratörü testi ve 234 Node testi. Bu koşuda 4 test atlandı; bu yüzden 1652 rakamı otomatik test sayısıdır, geçen test sayısı olarak okunmamalıdır.":
    "1,652 automated tests: 1,298 Python tests, 120 agent orchestrator tests and 234 Node tests. Four tests were skipped in that run, so 1,652 is the number of automated tests, not the number that passed.",
  "Değerlendirme seti 123 vakadan oluşur. Dosya elle yazılmış kayıt olarak etiketlidir: model yanıtları kayıttan oynatılır, puan kodun bu yanıtlara verdiği tepkiyi ölçer, modelin kalitesini ölçmez.":
    "The evaluation set has 123 cases. It is labeled a hand-written record: model answers are replayed from a recording, so the score measures how the code responds to those answers, not the quality of the model.",
  "Açık veri: 180.519 ham satırdan 172.765'i kabul edildi. Satırlar DataCo açık veri setinden gelir ve veri seti CC BY 4.0 lisanslıdır.":
    "Open data: 172,765 rows were accepted out of 180,519 raw rows. The rows come from the DataCo open dataset, licensed under CC BY 4.0.",
  "Bu sayılar 16 Kasım 2026 tarihli, 0.14.0 sürümüne ait koşudan alındı. Kanıt sayfasındaki sayılar daha eski bir koşuya ait; iki sayfa güncelleninceye kadar farklı sayılar görebilirsiniz.":
    "These counts come from a run on 16 November 2026 against version 0.14.0. The evidence page still shows numbers from an earlier run, so the two pages will differ until it is updated.",
  "Hız sınırı": "Rate limit",
  "0.14.0 sürümünün API'si 37 yol ve 41 işlem içerir. /v1 altındaki istekler IP adresi başına dakikada 300 ile sınırlıdır. Sınırı aşan istek 429 yanıtı alır ve Retry-After başlığında ne zaman yeniden denenebileceğini görür.":
    "Version 0.14.0 exposes 37 paths and 41 operations. Requests under /v1 are limited to 300 per minute per IP address. A request over the limit gets a 429 response with a Retry-After header that says when to retry.",
  "Bu sınır kimlik doğrulamanın yerine geçmez. Önünde bir ters vekil sunucu varsa bütün istemciler tek IP olarak görünür ve sınır hepsine birlikte uygulanır.":
    "The limit is not a substitute for authentication. If a reverse proxy sits in front of the service, all clients appear as one IP address and share the limit.",
  "Gerçek SAP çıktısıyla henüz denenmedi": "Not yet tried on real SAP output",
  "Ölçümler örnek dosyalar ve açık veriyle yapıldı; ilk gerçek SAP çıktısını pilot kullanımda deneyeceğiz. Sürüm demo ve pilot için tasarlandı; üretim düzeyinde güvenlik bu sürümün kapsamı dışında. Gerçek veride doğruluk oranı henüz bilinmiyor.":
    "Kule Pro has not been run on a real SAP export. The measurements used sample files and open data, and the first real SAP export will be tried in a pilot. The release is built for demos and pilots; production-grade security is outside its scope. Accuracy on real data is not yet known.",
  "0.8.1'den 0.14.0'a kadar eklenenler: satıcı ana verisi ve mükerrer satıcı adayları, boş yüklemenin reddi, günlük dosyası ve veritabanı yedekleme komutları, karar tablosunun CSV olarak indirilmesi. Tam liste sürüm notlarında.":
    "Added from 0.8.1 to 0.14.0: supplier master data with duplicate candidates, rejection of empty uploads, log rotation and database backup commands, and the decision table as a CSV download. The full list is in the release notes.",
  "Sorular": "Questions",
  "Kaynak kodu açık mı?": "Is the source code open?",
  "Hayır. Ürünün kaynak kodu paylaşılmıyor. Bu sitede test sonuçları, sayılar ve doğrulama dosyaları yer alır.":
    "No. The product's source code is not shared. This site publishes test results, counts and verification files.",
  "Demo ve kanıt sayfaları:": "Demo and evidence pages:",
  "test kanıtı": "test evidence",
  "Demolardaki veriler örnek verisidir; gerçek şirket verisi kullanılmamıştır.": "All demo data is sample data; no real company data was used.",
  "Statik örnek sayfa; canlı API yok.": "Static sample page; no live API.",
  "Ölçüm": "Measurement",

  /* giriş sayfası */
  "Nereden başlamalı?": "Where to start?",
  "01 · ürün": "01 · product", "02 · demo": "02 · demo", "03 · izler": "03 · traces", "04 · kanıt": "04 · evidence",
  "Ne yaptığı, nasıl çalıştığı, modülleri, neyin ölçüldüğü ve nerede durduğu.":
    "What it does, how it works, its modules, what was measured and where it stops.",
  "Eval kasetten oynatılır; model kalitesini ölçmez. 12 bilinen açık vaka gözlendi ve kapanmadı.":
    "The eval is replayed from tapes; it does not measure model quality. 12 known-gap cases were observed and are not closed.",

  /* güncel geliştirme (0.7.0 sonrası) bölümü */
  "güncel": "current",
  "Güncel geliştirme (0.7.0 sonrası)": "Current development (after 0.7.0)",
  "Bu bölüm 0.7.0'dan sonra yapılanları anlatır. Sürümler 0.14.0'a kadar etiketlidir; kaynak kod bu sitede yayımlanmaz. Hiçbiri gerçek SAP verisiyle denenmedi.":
    "This section describes what was done after 0.7.0. Versions up to 0.14.0 are tagged; the source code is not published on this site. None of it has been tried on real SAP data.",
  "kule[pdf] (deneysel)": "kule[pdf] (experimental)",
  "Metin katmanlı tedarikçi ekstresi PDF'i beş kapıdan geçerse okunur. Yalnız tek sentetik şablonla sınandı. Kurulum isteğe bağlıdır; çekirdek bağımlılıksız kalır.":
    "A text-layer supplier statement PDF is read if it passes five gates. It has been tested only with a single synthetic template. Installation is optional; the core stays dependency-free.",
  "Son 4 hafta ortalaması (aday, varsayılan değil)": "Last-4-weeks average (candidate, not the default)",
  "Talep tahmininde yedek yöntem. Sentetik ve açık veride sonuç karışık çıktı: ortalama hata kötüleşti, medyan iyileşti. Üretimde açılmadı.":
    "A fallback method for demand forecasting. On synthetic and open data the results were mixed: the mean error got worse, the median improved. Not enabled in production.",
  "Pilot ölçüm özeti ekranı": "Pilot measurement summary screen",
  "Panelde yükleme süresi, red oranı ve vaka kapanma süresi. Boş ve sentetik veri açıkça etiketli; TL ya da tasarruf iddiası yok.":
    "In the panel: upload time, rejection rate and case closing time. Empty and synthetic data are clearly labelled; there is no TL or savings claim.",
  "Pilot ölçüm özeti · tasarım taslağı": "Pilot measurement summary · design draft",
  "Pilot ölçüm özeti tasarım taslağı: önce ve sonra süreleri, Kule'nin kendi kayıtları ve ölçümün ne kadar sağlam olduğu. Sentetik veri.":
    "Pilot measurement summary design draft: before and after times, Kule's own records and how robust the measurement is. Synthetic data.",
  "Tasarım taslağı, pilot sonucu değil.": "Design draft, not a pilot result.",
  "Ekranın nasıl görüneceğini gösterir. Üstteki rozetler ve başlık verinin sentetik olduğunu belirtir; sayılar bir pilot ölçümü değildir ve Kule'nin bir iddiası sayılmamalıdır.":
    "It shows how the screen would look. The badges and title at the top state that the data is synthetic; the numbers are not a pilot measurement and should not be read as a Kule claim."
};
