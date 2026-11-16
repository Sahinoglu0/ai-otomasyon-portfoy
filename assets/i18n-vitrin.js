/* Ana sayfa (index.html) İngilizce karşılıkları. Hero, bölüm metinleri VITRIN-M1 onaylı metinleridir (docs/agent-results/VITRIN-M1-metin-en.md);
   karar defteri, akış ve etiket metinleri bu kartta yazıldı. assets/i18n.js bu sözlüğü tam eşleşme olarak kullanır; bu dosya i18n.js'ten ÖNCE yüklenir. */
window.I18N_EK = Object.assign(window.I18N_EK || {}, {
  /* Üst bölüm */
  "Karar destek aracı · örnek ve herkese açık veriyle": "Decision support tool · sample and public data",
  "Dosyalarınızdan bakılacak işler": "Work to do, from your files",
  "Kule Pro, SAP dışa aktarımlarınızı okur ve bugün ilgilenmeniz gereken stok kalemlerini, siparişleri ve tedarikçileri sıraya koyar. Her bulgu, kimin bakacağını ve nereye bakacağını da söyler.": "Kule Pro reads your SAP exports and sorts the stock items, orders and suppliers that need attention today. Each finding also says who should look at it and where to look.",
  "Ürün sayfasını aç": "Open the product page",
  "Karar defteri": "Decision ledger",
  "Aşağıdaki liste, uydurulmuş verilerden oluşan örnek bir dosyanın çıktısıdır.": "The list below is the output of a sample file built from invented data.",

  /* Karar defteri satırları (örnek veri) */
  "Stok": "Stock",
  "Sipariş": "Order",
  "Tedarikçi": "Supplier",
  "Ölü stok": "Dead stock",
  "K-1042 kritik stokta": "K-1042 is at critical stock",
  "Planlayıcı · SAP stok listesi": "Planner · SAP stock list",
  "S-7781: mal kabul ile fatura uyuşmuyor": "S-7781: goods receipt and invoice do not match",
  "Satın almacı · SAP sipariş ve fatura kayıtları": "Buyer · SAP order and invoice records",
  "T-203 teslimatı yine geciktirdi": "T-203 delivered late again",
  "Satın almacı · tedarikçi performansı": "Buyer · supplier performance",
  "K-0917 uzun süredir hareket görmüyor": "K-0917 has seen no movement for a long time",
  "Planlayıcı · stok yaşı raporu": "Planner · stock age report",
  "V-310 açık kalemleri mutabakatsız": "V-310 open items not reconciled",
  "Muhasebe · satıcı açık kalemleri": "Accounting · vendor open items",

  /* Kısaca */
  "Kısaca": "In brief",
  "Kule Pro ne yapar?": "What Kule Pro does",
  "Kule Pro, bir işletmenin stok, sipariş, mal kabul ve fatura dosyalarını okur. Dosyayı yüklersiniz, yedi analiz modülü bu verileri kendi kurallarıyla tarar ve sonuçlar bakılacak işlerin listesine dönüşür. Liste hangi kalemin bittiğini, hangi siparişte tutar farkı olduğunu ve hangi tedarikçinin geciktiğini gösterir. Her bulgunun yanında kimin bakacağı ve SAP'de nereye gidileceği yazılıdır. Hesaplar açık kurallara dayanır ve varsayılan kurulumda dil modeli çağrılmaz. Ölçümler örnek dosyalar ve açık veriyle yapıldı; gerçek bir SAP çıktısıyla henüz denenmedi.": "Kule Pro reads a business's stock, purchase order, goods receipt and invoice files. You upload the files, seven analysis modules scan the data with their own rules, and the results become a list of work to do. The list shows which item is running out, which order has an amount difference, and which supplier is late. Each finding names the person who should look at it and where to go in SAP. The calculations rest on explicit rules, and the default setup calls no language model. The measurements used sample files and open data; we have not yet tried it on a real SAP export.",

  /* Sorun */
  "Hata, dosyayı açtığınız gün görünsün": "Errors should show up on the day the file is loaded",
  "Stok, sipariş, mal kabul ve fatura çoğu işletmede ayrı tablolarda tutulur. Bir tutarsızlık genellikle ay sonunda, ödeme yapıldıktan sonra fark edilir. Kule Pro aynı kontrolleri dosyayı yüklediğiniz anda yapar, böylece sorun ay sonunu beklemeden görünür.": "Stock, orders, goods receipts and invoices usually sit in separate tables. A mismatch often comes to light at month end, after payment. Kule Pro runs the same checks as soon as you upload a file, so the problem shows up that day instead of waiting for month end.",

  /* Akış */
  "Akış": "Flow",
  "Dosyadan karara": "From file to decision",
  "Yükle": "Upload",
  "Stok, sipariş, mal kabul, fatura ve SAP dışa aktarımlarını yüklersiniz; SAP çıktıları CSV ya da .xlsx olabilir.": "You upload stock, order, goods receipt, invoice and SAP exports; SAP output can be CSV or .xlsx.",
  "Dosya → Kural → Karar": "File → Rule → Decision",
  "Oku": "Read",
  "Her satır okunur. Okunamayan satır atlanmaz; numarası ve nedeni listede görünür.": "Every row is read. A row that cannot be read is not skipped; its number and reason appear in the list.",
  "Hesapla": "Calculate",
  "Yedi analiz modülü stok durumu, sipariş anomalisi, talep tahmini, tedarikçi skoru, üçlü eşleştirme, OEE ve FBL1N açık kalem mutabakatını hesaplar.": "Seven analysis modules calculate stock status, order anomalies, demand forecasting, supplier score, three-way matching, OEE and FBL1N open-item reconciliation.",
  "Karar": "Decide",
  "Karar motoru sipariş önerisi ve öncelik listesi çıkarır. Her bulgu, kimin bakacağıyla birlikte gelir.": "The decision engine produces order suggestions and a priority list. Each finding arrives with who should look at it.",

  /* Kimin için */
  "Kullanıcılar": "Users",
  "Kimin için": "Who it is for",
  "Planlayıcı stoka, satın almacı sipariş ve faturaya, yönetici özete bakar. Bir siparişle mal kabul arasındaki tutar farkı satın almacıya gider; bitmek üzere olan bir kalem planlayıcının önüne düşer. Her bulgu, onu düzeltebilecek rolün önüne gelir.": "Planners look at stock, buyers look at orders and invoices, and managers read the summary. A mismatch between an order and its goods receipt goes to the buyer. An item about to run out goes to the planner. Each finding reaches the role that can fix it.",

  /* Şeffaflık */
  "Şeffaflık": "Transparency",
  "Hesaplar açık kurallara dayanır": "Calculations rest on explicit rules",
  "Hesaplar açık, tekrarlanabilir kurallara dayanır. Varsayılan kurulumda hiçbir modül dil modeli çağırmaz. Bir sonucun nereden geldiğini, hangi kuralın onu ürettiğini kuralların kendisinde arayabilirsiniz.": "The calculations rest on explicit, repeatable rules. The default setup calls no language model. When a result looks wrong, you can start from the rule that produced it.",

  /* Ölçüm */
  "Ölçüm": "Measurement",
  "Sayılar nereden geliyor": "How the numbers were produced",
  "Ürün 1652 otomatik test, 37 yollu bir API ve 18 bilerek konmuş hatanın 18'ini bulan bir deneme paketiyle ölçüldü. Sayılar 16 Kasım 2026 koşusundan alındı. Ayrıntılar ürün sayfasında.": "Kule Pro was checked with 1,652 automated tests, a 37-path API, and a sample-file test that found 18 of 18 deliberately planted errors. The numbers come from a run on 16 November 2026. Details are on the product page.",
  "Kule · Python testi": "Kule · Python tests",
  "Orkestratör · birim testi": "Orchestrator · unit tests",
  "Panel · Node testi": "Panel · Node tests",
  "Deneme paketi · bulunan hata": "Sample file · errors found",
  "Eval kasetten oynatılır; model kalitesini ölçmez. 12 bilinen açık vaka gözlendi ve kapanmadı.": "The eval is replayed from a tape; it does not measure model quality. 12 known-gap cases were observed and not closed.",
  "Ürün sayfasında ayrıntılar ve sınırlar": "Details and limits on the product page"
});
