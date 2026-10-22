/* Giriş ve ürün sayfasının İngilizce karşılıkları (KULE-D1 metni). assets/i18n.js bu sözlüğü tam eşleşme olarak kullanır;
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
  "© 2026 · MIT lisansı.": "© 2026 · MIT license.", "demo/ klasörü": "The demo/ folder", "bu lisansın dışındadır.": "is outside this license.",

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
  "Ajan orkestratörü için 87 birim testi var. Son koşu 22 Ekim 2026 tarihli ve 0 başarısız test içeriyor.":
    "The agent orchestrator has 87 unit tests. The latest run is dated 22 October 2026 and had 0 failures.",
  "Ajan orkestratörünün değerlendirme seti 46 vakadan oluşur. Kasetten oynatılır, bu yüzden model kalitesini ölçmez. Ölçüt, kontrol ve kapsam vakalarının 41'i de geçti (41/41); 5 bilinen açık vaka gözlendi ve kapanmadı.":
    "The orchestrator's evaluation set has 46 cases. It is replayed from recorded tapes, so it does not measure model quality. All 41 criteria, check and scope cases passed (41/41); 5 known-gap cases were observed and are not closed.",
  "claude-haiku-5-5 ile planlanan 40 koşudan 38'i kaydedildi; 37'si tamamlandı, 1'i kota nedeniyle kesildi, 2'si yapılmadı. Soruşturma akışında 20 koşunun 16'sı kabul edildi (%80; %95 Wilson aralığı 0,584–0,919). Ölçümler ön-kayıtlıdır; önceden yazılan hedefler vaat değildir ve sonuç ne çıkarsa o yayımlanır.":
    "With claude-haiku-5-5, 38 of 40 planned runs were recorded: 37 completed, 1 was cut off by a quota, and 2 were not run. In the investigation flow, 16 of 20 runs were accepted (80%; 95% Wilson interval 0.584–0.919). The measurements were pre-registered; the targets written in advance are not promises, and the result is published whatever it turns out to be.",
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
  "Kurulum gerektirmeyen statik demo, önceden hesaplanmış sentetik örnek veriyle çalışır. Canlı API yoktur.":
    "A static demo that needs no installation, using precomputed synthetic sample data. There is no live API.",
  "Soruşturma akışını adım adım açın. Her izin kaynağı rozetle belirtilir: GERÇEK MODEL KAYDI, ELLE YAZILMIŞ KAYIT ya da KOD SATIRI.":
    "Open the investigation flow step by step. Each trace's source is marked with a badge: REAL MODEL RECORD, HAND-WRITTEN RECORD, or CODE LINE.",
  "Test sayıları, davranış kataloğu ve SHA-256 ile doğrulanabilir kanıt paketi. Kaynak kod bu depoda yayımlanmıyor; yerine bu kanıtlar var.":
    "Test counts, a behaviour catalogue, and an evidence package that can be verified with SHA-256. The source code is not published in this repository; these records are published instead.",

  /* 08 sss */
  "08 / sss": "08 / faq", "Sık sorulan sorular": "Frequently asked questions",
  "Kule Pro bir yapay zekâ mı?": "Is Kule Pro an AI product?",
  "Hayır, karar çıktıları kural tabanlıdır ve test edilebilir. Ajan orkestratörü ayrı bir bileşendir ve dil modeli kullanır; onun iddiaları da Kule'nin hesabıyla denetlenir.":
    "No. Decision outputs are rule-based and testable. The agent orchestrator is a separate component and uses a language model; its claims are also checked against Kule's own calculation.",
  "Gerçek bir firmanın verisiyle çalıştı mı?": "Has it been run on a real company's data?",
  "Hayır. Ölçümler sentetik veriyle ve herkese açık DataCo verisiyle yapıldı.":
    "No. The measurements used synthetic data and the publicly available DataCo dataset.",
  "Kaynak kodu neden yayımlanmıyor?": "Why isn't the source code published?",
  "Kaynak kod bu depoda yayımlanmıyor. Bunun yerine test kanıtları, eval sonuçları, ölçüm çıktıları ve ajan izleri açık.":
    "The source code is not published in this repository. Test evidence, eval results, measurement outputs and agent traces are published instead.",
  "Ne gerekiyor?": "What do I need?",
  "Bu sayfalar ve demo için yalnız bir tarayıcı. Kule'nin kendisi Python 3.10 veya üstüyle çalışır; yalnız standart kütüphane kullanılır, ek paket kurmak gerekmez.":
    "Only a browser for these pages and the demo. Kule itself runs on Python 3.10 or later; it uses only the standard library, so no extra packages need to be installed.",
  "Hangi dillerde?": "Which languages?",
  "Bu sayfalar Türkçe ve İngilizce. Kule'nin paneli ve komut satırı çıktıları şu an Türkçe.":
    "These pages are in Turkish and English. The Kule panel and command-line output are currently in Turkish.",

  /* giriş sayfası */
  "Nereden başlamalı?": "Where to start?",
  "01 · ürün": "01 · product", "02 · demo": "02 · demo", "03 · izler": "03 · traces", "04 · kanıt": "04 · evidence",
  "Ne yaptığı, nasıl çalıştığı, modülleri, neyin ölçüldüğü ve nerede durduğu.":
    "What it does, how it works, its modules, what was measured and where it stops.",
  "Eval kasetten oynatılır; model kalitesini ölçmez. 5 bilinen açık vaka gözlendi ve kapanmadı.":
    "The eval is replayed from tapes; it does not measure model quality. 5 known-gap cases were observed and are not closed."
};
