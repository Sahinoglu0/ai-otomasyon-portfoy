/* Kule Pro demo: TR / EN dil geçişi. Sayfa Türkçe çizilir; İngilizce seçilince metin düğümleri ve öznitelikler çevrilir.
   Dil düğmesi ve tercih (localStorage "lang") sitenin öteki sayfalarıyla aynıdır. Veri sabit (önceden hesaplanmış) olduğu için
   örnek verinin cümleleri de sözlükte; sayı biçimi (1.234,5) Türkçe kalır. */
(() => {
  "use strict";

  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const L = "A-Za-zÇĞİÖŞÜçğıöşü";

  // Tam eşleşme: kısa ve belirsiz sözcükler yalnız metin düğümünün tamamı bu olduğunda çevrilir.
  const EXACT = {
    "Alt": "Low", "Üst": "High", "alt": "low", "üst": "high", "Kol": "Line", "Red": "Rejects", "Tür": "Type", "Yön": "Direction",
    "Sıra": "Rank", "Önem": "Severity", "Alan": "Area", "Tutar": "Amount", "Değer": "Value", "Durum": "Status", "Depo": "Warehouse",
    "Kalem": "Items", "Kalemler": "Items", "Kritik": "Critical", "Fazla": "Excess", "Ölü": "Dead", "Normal": "Normal", "Tümü": "All",
    "Yüksek": "High", "Orta": "Medium", "Düşük": "Low", "Stok": "Inventory", "Fatura": "Invoice", "Gecikme": "Delay", "Duruş": "Downtime",
    "Emek": "Labour", "Maliyet": "Cost", "Sonuç": "Result", "Rapor": "Report", "Senaryo": "Scenario", "Modül": "Module", "Modüller": "Modules",
    "Yönetim": "Management", "Gezinti": "Navigation", "Portföy": "Portfolio", "Aç": "Open", "Skor": "Score", "Seviye": "Level",
    "Zamanında": "On time", "Sipariş": "Orders", "Tedarikçi": "Supplier", "Ürün": "Product", "Hafta": "Week", "Tahmin": "Forecast",
    "Pencere": "Windows", "Kıyas": "Benchmark", "Benchmark": "Benchmark", "Ufuk": "Horizon", "Bulgu": "Findings", "Bulgular": "Findings",
    "Belgeler": "Documents", "Açıklama": "Description", "Malzeme": "Material", "Kalite": "Quality", "Performans": "Performance",
    "Kullanılabilirlik": "Availability", "Gösterge": "Indicator", "Faturalama": "Invoicing", "Üretim": "Production",
    "Arıza": "Breakdown", "Ayar": "Setup", "Geçiyor": "Passes", "artış": "increase", "azalış": "decrease", "yatay": "flat",
    "adet": "pcs", "saat": "hours", "dk": "min", "TL/saat": "TL/hour", "ölçülmedi": "not measured", "değişmedi": "no change",
    "Okumadan önce:": "Before reading:", "Örnek girdiler": "Sample inputs", "Tema: sistem": "Theme: system", "Tema: açık": "Theme: light",
    "Tema: koyu": "Theme: dark", "Risk: Yüksek": "Risk: High", "Risk: Orta": "Risk: Medium", "Risk: Düşük": "Risk: Low",
    "Önem: Yüksek": "Severity: High", "Önem: Orta": "Severity: Medium", "Önem: Düşük": "Severity: Low", "Statik demo": "Static demo",
    "Kritik eşiği (gün)": "Critical threshold (days)", "Fazla stok eşiği (gün)": "Excess threshold (days)",
    "Language / Dil": "Language", "Türkçe": "Turkish",
    "Yeni": "New", "Çözülen": "Resolved", "Değişen": "Changed", "Değişmeyen": "Unchanged", "Atlandı": "Skipped", "Yok.": "None.",
    "Satıcı": "Vendor", "▼ azaldı": "▼ decreased", "▲ arttı": "▲ increased", "Veri şüphesi": "Data doubt"
  };

  // Sayı içeren dinamik metinler. Sıra önemli: özel kurallar genel olanlardan önce.
  const RULES = [
    [/^(.+) — Kule Pro demo$/, (m, a) => core(a) + " — Kule Pro demo"],
    // Sabah raporu ve açık kalem mutabakatı
    [/^(\d+)\. gün · (ilk rapor|ertesi sabah)$/, (m, n, t) => "Day " + n + " · " + (t === "ilk rapor" ? "first report" : "next morning")],
    [/^Yüklü: 1\. gün \((\S+)\)\. Düğme ertesi sabahın dosyalarını yükler\.$/, "Loaded: day 1 ($1). The button loads the next morning's files."],
    [/^Yüklü: 2\. gün \((\S+)\), (\S+) raporuyla karşılaştırıldı\.$/, "Loaded: day 2 ($1), compared with the $2 report."],
    [/^Rapor tarihi (\S+) örnek veride sabit gündür; yükleme günü (\S+)\.$/, "Report date $1 is a fixed day in the sample data; upload day $2."],
    [/^Çözülen: (\S+) dosyasında vardı, (\S+) dosyasında artık çıkmayan bulgu\. Karşılaştırma bulgu parmak izine göre yapılır\.$/,
      "Resolved: a finding that was in the $1 file and no longer appears in the $2 file. The comparison is made by finding fingerprint."],
    [/^Çözülen \((\d+)\)$/, "Resolved ($1)"],
    [/^Tutarı değişen \((\d+)\)$/, "Amount changed ($1)"],
    [/^Diğer (\d+) bulgu$/, "$1 more findings"],
    [/^(\d+) gündür açık$/, (m, n) => "open for " + n + (n === "1" ? " day" : " days")],
    [/^girdi yok: (.+)$/, "no input: $1"],
    [/^yüksek (\d+) · diğer (\d+)$/, "high $1 · other $2"],
    [/^yüksek (\d+) · orta (\d+) · düşük (\d+)$/, "high $1 · medium $2 · low $3"],
    [/^(\S+) satıcı$/, "$1 vendors"],
    [/^Satıcı açık kalemi ile tedarikçi ekstresi karşılaştırması; (\d+) kural\.$/, "Comparison of vendor open items with the supplier statement; $1 rules."],
    [/(\d+) ayrı açık kalem aynı referans ve tutarda: (\S+), (\S+) TRY/g, "$1 separate open items with the same reference and amount: $2, $3 TRY"],
    [/ekstrede (\S+) için (\S+) TRY kısmi ödeme var \(fatura (\S+)\); SAP'ta bu referansla (\S+) ödeme açık, fark (\S+)/g,
      "the statement shows a partial payment of $2 TRY for $1 (invoice $3); SAP has $4 payment open against this reference, difference $5"],
    [/ekstrede (\S+) için (\S+) TRY ödeme var; SAP kalemi açık/g, "the statement shows a payment of $2 TRY for $1; the SAP item is still open"],
    [/SAP bakiye (\S+), ekstre (\S+) TRY; fark (\S+)/g, "SAP balance $1, statement $2 TRY; difference $3"],
    [/vade (\S+), (\d+) gün geçti; (\S+) TRY/g, "due $1, $2 days overdue; $3 TRY"],
    [/SAP (\S+) TRY, ekstre (\S+) TRY \((\S+)\)/g, "SAP $1 TRY, statement $2 TRY ($3)"],
    [/^(.+) \((\S+)\) kritik stok; kapsama (\S+) gün$/, (m, a, k, g) => a + " (" + k + ") critical stock; cover " + g + " days"],
    [/^(.*) alt değer, (.*)$/, (m, a, b) => core(a) + " low value, " + core(b)],
    [/^(.*) üst değer, (.*)$/, (m, a, b) => core(a) + " high value, " + core(b)],
    [/^(%[\d.,]+) stok değeri fazla veya ölü$/, "$1 of stock value is excess or dead"],
    [/^1\. Aksiyonlar \((\d+)\)$/, "1. Actions ($1)"],
    [/^(\d+) kalem kritik, (\d+) kalem ölü stok ve (\d+) kalem fazla stok bulundu; stok değeri (\d+) TL\.$/,
      "$1 items critical, $2 dead stock and $3 excess stock; stock value $4 TL."],
    [/(\d+) kritik \/ (\d+) kalem/, "$1 critical / $2 items"],
    [/^(\d+) \/ (\d+) kalem$/, "$1 / $2 items"],
    [/(\d+) bulgu aynı kalemde; tutar bir kez sayıldı/, "$1 findings on the same line; the amount is counted once"],
    [/^(\d+) oran ikincil kaynaklardan \(satıcı blogları üzerinden; birincil rapor açılmadı\), (\d+) girdi için kaynak bulunamadı, (\d+) girdi şirket büyüklüğü ya da örnek veridir\. Kule’nin gerçek veride yakalama oranı ölçülmedi\.$/,
      "$1 rates come from secondary sources (via vendor blogs; the primary reports were not opened), no source was found for $2 inputs, $3 inputs are company size or sample data. Kule’s catch rate on real data has not been measured."],
    [/(\d+) tedarikçi D seviyesinde \/ (\d+)/, "$1 suppliers at level D / $2"],
    [/(\d+) bulgu \/ (\d+) kalem/, "$1 findings / $2 lines"],
    [/^(\d+) sipariş kalemi · ham toplam (.+) tekilleştirildi$/, "$1 order lines · raw total $2, deduplicated"],
    [/^(\d+) sipariş–mal kabul bulgusu var; (\d+) tanesi yüksek önemde, tutar etkisi (\d+) TL\.$/,
      "$1 order–goods receipt findings; $2 are high severity, amount impact $3 TL."],
    [/^(\d+) tanesi A\/B sınıfı$/, "$1 of them class A/B"],
    [/^(\d+) ürün için (\d+) haftalık talep tahmini: ortalama MAPE (\S+), geçen yılın aynı haftası kıyasında (\S+)\. %80 aralığın gerçek kapsaması (\S+); aralıklar fazla geniş\.$/,
      "$2-week demand forecast for $1 products: mean MAPE $3, against same week last year $4. Real coverage of the 80% interval is $5; the intervals are too wide."],
    [/^A\/B sınıfı (\d+) kritik kalem için acil sipariş$/, "Urgent order for $1 critical class A/B items"],
    [/^Diğer (\d+) aksiyon$/, "$1 more actions"],
    [/^Durumu değişen (\d+) kalem:$/, "$1 items change status:"],
    [/^(\S+) hattında duruş azaltma planı \(OEE (\S+)\)$/, "Downtime reduction plan for line $1 (OEE $2)"],
    [/(\d+) ürün kıyası geçemiyor/, (m, n) => n + (n === "1" ? " product fails" : " products fail") + " the benchmark"],
    [/^Normalize ağırlık: teslim (\S+) · kalite (\S+) · fiyat (\S+)$/, "Normalised weights: delivery $1 · quality $2 · price $3"],
    [/^Net \(yıllık maliyet (.+) sonrası\)$/, "Net (after annual cost of $1)"],
    [/^Sentetik · (\S+) modül$/, "Synthetic · $1 modules"],
    [/^(\S+) sipariş hacminin (%[\d.,]+)'ini taşıyor; (\d+) tedarikçiye dağıtılır\. Açık bulgularından (\d+) tanesi(?: \((.+) tutar etkisi\))? bu tedarikçiye ait\.$/,
      (m, t, p, n, k, tut) => t + " carries " + p + " of order volume; it is spread across " + n + " suppliers. " + k +
        " of the open findings" + (tut ? " (" + tut + " amount impact)" : "") + " belong to this supplier."],
    [/^Girdiler ROI hesaplayıcıdaki son değerlerdir\. Varsayılanların (\d+) tanesi ikincil kaynaklı aralık, (\d+) tanesi kaynaksızdır \(kullanıcı girmeli\)\.$/,
      "The inputs are the latest values in the ROI calculator. Of the defaults, $1 are secondary-sourced ranges and $2 have no source (the user should enter them)."],
    [/^En düşük skorlu tedarikçi (\S+) \(skor (\S+), seviye (\S+)\): zamanında teslim (\S+), red (\S+)\.$/,
      "Lowest-scoring supplier $1 (score $2, level $3): on-time delivery $4, rejects $5."],
    [/^En düşük OEE (\S+) hattı (\S+) vardiyasında (\S+) \(kullanılabilirlik (\S+), performans (\S+), kalite (\S+)\); baskın duruş (\S+)\. Öneri \(kanıt değil\): /,
      (m, h, v, o, k, p, q, d) => "Lowest OEE on line " + h + ", shift " + v + ": " + o + " (availability " + k + ", performance " + p + ", quality " + q +
        "); main downtime cause " + ({ ARIZA: "BREAKDOWN", AYAR: "SETUP", MALZEME: "MATERIAL" }[d] || d) + ". Suggestion (not evidence): "],
    [/^Üçlü eşleştirmede (\d+) bulgu var \(tutar etkisi (.+)\); türler: /, "Three-way match has $1 findings (amount impact $2); types: "],
    [/^(\d+) açık satıcı kalemi \((\d+) satıcı\) incelendi; (\d+) mutabakat bulgusu var \(tutar etkisi (.+)\); türler: /,
      "$1 open vendor items ($2 vendors) reviewed; $3 reconciliation findings (amount impact $4); types: "],
    [/ · skor ([\d.,]+) \(/, " · score $1 ("],
    [/: zamanında ([^,]+), red ([^,]+), fiyat /g, ": on time $1, rejects $2, price "],
    [/^Seçili ürünün (\d+) haftalık tahmini ve yaklaşık %80 aralığı$/, "$1-week forecast for the selected product with an approximate 80% interval"],
    [/^ortalama (\S+)/, "average $1"],
    [/Çıktı tarihi /g, "Output date "],
    [/ · rapor (\S+)$/, " · report $1"],
    // örnek verinin bulgu açıklamaları
    [/hiç giriş yok; plan (\S+), (\d+) gün geçti/g, "no receipt at all; planned $1, $2 days overdue"],
    [/(\d+) ayrı belgede aynı giriş: (\d+) adet, (\S+)/g, "same receipt on $1 separate documents: $2 pcs, $3"],
    [/(\d+) faturada aynı satır: (\d+) adet, ([\d.]+) TL/g, "same line on $1 invoices: $2 pcs, $3 TL"],
    [/sipariş ([\d.]+), giriş ([\d.]+)/g, "ordered $1, received $2"],
    [/plan üzerinden (\d+) gün geçti/g, "$1 days past plan"],
    [/sipariş ([\d.]+), fatura ([\d.]+)/g, "order $1, invoice $2"],
    [/siparişte (\S+), girişte (\S+)/g, "ordered $1, received $2"],
    [/siparişte olmayan kalem için (\d+) adet giriş/g, "$1 pcs received for a line not on the order"],
    [/irsaliye ([\d.]+), fatura ([\d.]+)/g, "delivery note $1, invoice $2"],
    [/irsaliye yok; (\d+) adet fatura edilmiş/g, "no delivery note; $1 pcs invoiced"],
    [/plan (\S+), ilk giriş (\S+) \((\d+) gün geç\)/g, "planned $1, first receipt $2 ($3 days late)"],
  ];
  // Birimler ve sayılı kısa kalıplar: cümle sözlüğünden SONRA çalışır (yoksa "7 gün" önce değişir, cümle eşleşmez).
  const UNITS = [
    [/^(\d+)\. hafta$/, "Week $1"],
    [/([\d.,]+) gün fazla\./g, "$1 days excess."],
    [/ gün kapsamada;/g, " days of cover;"],
    [/(\d[\d.,]*) bin TL/g, "$1k TL"],
    [/(\d[\d.,]*) mn TL/g, "$1m TL"],
    [/(\d[\d.,]*) gün(?![A-Za-zçğıöşü])/g, "$1 days"],
    [/(\d[\d.,]*) ay(?![A-Za-zçğıöşü])/g, "$1 mo"],
    [/(\d[\d.,]*) puan/g, "$1 pts"],
    [/(\d[\d.,]*) adet/g, "$1 pcs"],
    [/(\d[\d.,]*) saat(?![A-Za-zçğıöşü])/g, "$1 hours"],
    [/(\d[\d.,]*) dk(?![A-Za-z])/g, "$1 min"],
    [/(\d[\d.,]*) hafta(?![A-Za-zçğıöşü])/g, "$1 weeks"],
    [/(\d+) bulgu(?![A-Za-zçğıöşü])/g, "$1 findings"],
    [/ · yüksek: /g, " · high: "]
  ];

  // Alt dize değişimi: sözcük sınırına bakılır, uzun ifade önce.
  const PHRASES = [
    // kabuk
    ["İçeriğe geç", "Skip to content"], ["Statik örnek, sentetik veri, canlı API yok", "Static sample, synthetic data, no live API"],
    ["Önceden hesaplanmış çıktı (tohum 42) · gerçek şirket verisi değildir", "Precomputed output (seed 42) · not real company data"],
    ["Önceden hesaplanmış örnek çıktı (tohum 42); canlı API yok", "Precomputed sample output (seed 42); no live API"],
    ["Bu demo sentetik örnek veriyle önceden hesaplanmıştır. Sunucu, canlı API ve dosya yükleme yoktur. Hesaplar kural tabanlıdır; dil modeli çağrısı yoktur.",
      "This demo was precomputed with synthetic sample data. There is no server, no live API and no file upload. Calculations are rule-based; there are no language model calls."],
    ["Bu sayfadaki bütün veriler sentetik (örnek) veridir ve önceden hesaplanmıştır; firma verisi ve SAP bağlantısı yoktur. Aksiyon, risk ve senaryo hesapları açık kurallarla tarayıcıda yapılır; dil modeli çağrısı yoktur. ROI girdileri varsayımsaldır. Sabah raporu da deneme paketinin sentetik dosyalarından önceden hesaplanmıştır; gerçek SAP çıktısı değildir.",
      "All data on this page is synthetic (sample) data and was precomputed; there is no company data and no SAP connection. Action, risk and scenario calculations run in the browser with explicit rules; there are no language model calls. ROI inputs are assumptions. The Morning report is also precomputed from the trial package's synthetic files; it is not real SAP output."],
    ["Demo verisi okunamadı. Sayfayı yenileyin.", "The demo data could not be read. Reload the page."], ["ÖRNEK VERİ YOK", "NO SAMPLE DATA"],
    ["Örnek veri dosyası (veri.js) okunamadı.", "The sample data file (veri.js) could not be read."], ["Örnek veri yüklenemedi", "Sample data could not be loaded"],
    ["ÖRNEK ÇIKTI YOK", "NO SAMPLE OUTPUT"], ["Bu modülün örnek çıktısı demoda yok.", "This module has no sample output in the demo."],
    ["Veri yükleniyor", "Loading data"], ["Rapor görünümü", "Report view"], ["Tedarik zinciri kontrol kulesi", "Supply chain control tower"],
    ["Kule Pro demo", "Kule Pro demo"],
    // gezinti ve sayfa başlıkları
    ["Yönetici özeti", "Executive summary"], ["Öncelikli aksiyonlar, parasal etki, risk sıralaması", "Priority actions, financial impact, risk ranking"],
    ["ROI hesaplayıcı", "ROI calculator"], ["Kendi varsayımlarınızla yıllık tasarruf aralığı", "Annual savings range from your own assumptions"],
    ["Eşik ve ağırlık simülasyonu · istemcide hesap", "Threshold and weight simulation · computed in the browser"],
    ["Yazdırılabilir yönetici raporu", "Printable executive report"], ["Modül çıktısı · önceden hesaplandı", "Module output · precomputed"],
    ["Sipariş anomalisi", "Order anomalies"], ["Üçlü eşleştirme", "Three-way match"], ["Tedarikçi puanı", "Supplier score"],
    ["Talep tahmini", "Demand forecast"],
    // rozetler
    ["Örnek veri · sentetik", "Sample data · synthetic"], ["Kural tabanlı · LLM yok", "Rule-based · no LLM"], ["İstatistiksel · LLM yok", "Statistical · no LLM"],
    ["Şablon özeti · LLM yok", "Template summary · no LLM"], ["Varsayımsal · sentetik", "Assumption · synthetic"],
    ["Simülasyon · istemcide hesap", "Simulation · computed in the browser"], ["Tahmin · gerçekleşme değil", "Forecast · not actuals"],
    ["Şablon özeti · anahtarsız", "Template summary · no API key"], ["Karşılaştırılacak önceki anlık görüntü yok", "No earlier snapshot to compare with"],
    ["— önceki dönem verisi yok", "— no previous period data"],
    // özet
    ["Yedi modülün çıktısından tek bakışta: nereden para kaçıyor, neyi önce yapmalı, risk nerede.",
      "Seven modules at a glance: where money leaks, what to do first, where the risk is."],
    ["Tespit edilen tutar etkisi", "Detected amount impact"], ["Bağlı sermaye", "Tied-up capital"], ["Kritik stok kalemi", "Critical stock items"],
    ["D seviyesi tedarikçi", "Level D suppliers"], ["Öncelikli 5 aksiyon", "Top 5 actions"], ["CSV indir", "Download CSV"],
    ["Sıra kuralı: önem, sonra etki türü (doğrudan para kaybı, bağlı sermaye, ölçülmedi), sonra tutar.",
      "Ranking rule: severity, then impact type (direct money loss, tied-up capital, not measured), then amount."],
    ["Parasal etki ölçülmedi", "Financial impact not measured"], ["Risk sıralaması", "Risk ranking"],
    ["Seviye kuralı: yüksek önemli bulgu, D seviyesi tedarikçi, %60 altı OEE ya da A sınıfı kritik kalem → yüksek. Eşikler varsayımdır.",
      "Level rule: a high-severity finding, a level D supplier, OEE below 60% or a critical class A item → high. The thresholds are assumptions."],
    ["Size ne kazandırır?", "What could it save you?"],
    ["Yıllık brüt tasarruf aralığı, şu anki ROI girdileriyle. Rakamlar sizin varsayımınızdır; ölçülmüş sonuç değildir.",
      "Annual gross savings range with the current ROI inputs. The figures are your assumptions, not a measured result."],
    ["Kendi rakamlarımla hesapla", "Calculate with my own figures"], ["Talep tahmini yönü · 8 hafta", "Demand forecast direction · 8 weeks"],
    ["İlk ve son tahmin haftası karşılaştırılır; ±%2 içi yatay sayılır. Geçmiş dönem trendi değildir.",
      "The first and last forecast weeks are compared; within ±2% counts as flat. This is not a historical trend."],
    ["Modül özeti", "Module summary"], ["Özet metni yok.", "No summary text."], ["Aksiyon yok.", "No actions."],
    ["Sipariş · mal kabul", "Orders · goods receipt"], ["Üretim (OEE)", "Production (OEE)"],
    ["Tutar etkisi", "Amount impact"], ["tutar etkisi", "amount impact"], ["Arıza", "Breakdown"], ["Ayar", "Setup"], ["Malzeme", "Material"], ["bağlı sermaye", "tied-up capital"], [" TL etki", " TL impact"],
    // aksiyon başlıkları ve notları
    ["Çift faturayı ödemeden durdur", "Stop the duplicate invoice before payment"],
    ["İrsaliyesiz faturayı ödeme blokajına al", "Put the invoice without a delivery note on payment block"],
    ["Fazla faturalanan miktar için düzeltme faturası iste", "Request a correction invoice for the over-invoiced quantity"],
    ["Sözleşme fiyatı farkı için düzeltme faturası iste", "Request a correction invoice for the contract price difference"],
    ["Gecikmiş siparişi tedarikçiye eskale et", "Escalate the overdue order to the supplier"],
    ["Çift mal kabul kaydını ters kayıtla düzelt", "Reverse the duplicate goods receipt posting"],
    ["Eksik teslimatı tamamlat ya da kalemi kapat", "Get the short delivery completed or close the line"],
    ["Fazla teslim edilen miktarı iade et", "Return the over-delivered quantity"], ["Yanlış malzeme girişini düzelt", "Correct the wrong material receipt"],
    ["Siparişsiz girişin kaynağını bul", "Find the source of the receipt without an order"],
    ["Gecikmeyi tedarikçi görüşmesine taşı", "Raise the delay in the supplier meeting"], ["Depolar arası transfer", "Transfer between warehouses"],
    ["Ölü stoku elden çıkar ya da başka depoya ver", "Dispose of the dead stock or move it to another warehouse"],
    ["D seviyesi tedarikçilerle performans görüşmesi", "Performance review with level D suppliers"],
    ["Tutar fazla depodaki stok değeridir; tasarruf değil, serbest bırakılabilecek sermaye.",
      "The amount is the stock value in the excess warehouse; it is capital that can be freed, not a saving."],
    ["Satış kaybı verisi yok; parasal etki ölçülmedi.", "No lost-sales data; financial impact not measured."],
    ["Dönemde hiç sevk yok.", "No shipments in the period."],
    ["Tutar stok değeridir; geri kazanılacak para hurda/satış fiyatına bağlı.", "The amount is the stock value; the money recovered depends on the scrap or sale price."],
    ["Harcama tutarı örnek çıktıda yok; fiyat sapmasının parası ölçülmedi.", "Spend is not in the data; the cost of the price deviation was not measured."],
    ["Kök neden kural önerisidir, kanıt değil.", "The root cause is a rule suggestion, not evidence."],
    // ROI
    ["Kendi şirketinizin rakamlarını girin; kule'nin beş tasarruf kolunda yıllık aralık hesaplanır. Hesap tarayıcıda yapılır, hiçbir yere gönderilmez.",
      "Enter your own company's figures; an annual range is calculated for the tower's five savings lines. The calculation runs in the browser and nothing is sent anywhere."],
    ["Tüm girdiler varsayımsaldır; sonuç ölçüm değil, varsayımlarınızın sonucudur.", "All inputs are assumptions; the result is not a measurement, it follows from your assumptions."],
    ["(şirketinize göre girin):", "(enter your company's values):"],
    ["Beş tasarruf kolunun her biri bu değerlerden en az birini çarpan olarak kullanır; birini sıfır girerseniz o kol sıfırlanır.",
      "Each of the five savings lines uses at least one of these values as a multiplier; if you enter zero for one, that line becomes zero."],
    ["Stok taşıma maliyeti", "Inventory carrying cost"], ["Fatura kaçağı", "Invoice leakage"], ["Gecikme ve stoksuzluk", "Delays and stock-outs"],
    ["Gecikme / stoksuzluk", "Delays / stock-outs"], ["Plansız duruş", "Unplanned downtime"], ["Elle kontrol emeği", "Manual checking effort"],
    ["Ortalama stok değeri", "Average stock value"], ["Fazla + ölü stok payı", "Excess + dead stock share"],
    ["Fazla stoktan ilk yıl azaltılan pay", "Share of excess stock reduced in year one"],
    ["Yıllık taşıma maliyeti (stok değerine oran)", "Annual carrying cost (share of stock value)"],
    ["Yıllık satın alma (ödeme) hacmi", "Annual purchasing (payment) volume"], ["Mükerrer / hatalı ödeme payı", "Duplicate / erroneous payment share"],
    ["Ödemeden önce yakalanan pay", "Share caught before payment"], ["Yıllık gecikme / stoksuzluk olayı", "Annual delay / stock-out events"],
    ["Olay başı maliyet", "Cost per event"], ["Erken uyarıyla önlenen pay", "Share prevented by early warning"],
    ["Yıllık plansız duruş", "Annual unplanned downtime"], ["Saatlik üretim değeri (duruş maliyeti)", "Hourly production value (downtime cost)"],
    ["Erken uyarıyla azalan duruş", "Downtime reduced by early warning"], ["Aylık elle kontrol / mutabakat vakası", "Monthly manual check / reconciliation cases"],
    ["Vaka başı süre", "Time per case"], ["Kısalan süre payı", "Share of time saved"], ["Tam yüklü saat maliyeti", "Fully loaded hourly cost"],
    ["Aracın yıllık işletme maliyeti", "Annual running cost of the tool"],
    ["Kaynaklı (ikincil)", "Sourced (secondary)"], ["Kaynak yok · kendi değerinizi girin", "No source · enter your own value"],
    ["Örnek değer · şirketinize göre girin", "Sample value · enter your company's value"], ["Örnek veriden (sentetik)", "From sample data (synthetic)"],
    ["İkincil kaynak:", "Secondary source:"],
    ["APQC medyan %10; %20-30 ders kitabı/blog (MRPeasy)", "APQC median 10%; 20-30% textbook/blog (MRPeasy)"],
    ["Berkeley denetimi %0,03 (tek belediye ölçümü); APQC %0,8 (blog üzerinden). Kaynağın %2 üst ucu satıcı kaynaklı olduğu için kullanılmadı; varsayılan üst sınır %0,8, kendi değerinizi girin",
      "Berkeley audit 0.03% (a single municipal measurement); APQC 0.8% (via a blog). The source's 2% upper end is vendor-sourced and was not used; the default upper bound is 0.8%, enter your own value"],
    ["$5.000–260.000/saat (büyük tesis); orta ölçek için kaynak yok, kendi değerinizi girin", "$5,000–260,000/hour (large plant); no source for mid-size, enter your own value"],
    ["ölü stok payı için doğrulanmış kaynak yok, kendi değerinizi girin", "no verified source for the dead stock share, enter your own value"],
    ["tahminle stok azalması doğrulanamadı", "stock reduction through forecasting could not be verified"],
    ["Kule’nin gerçek veride yakalama oranı bilinmiyor (yalnız sentetikte 7/7, 4/4)", "Kule's catch rate on real data is unknown (synthetic only: 7/7, 4/4)"],
    ["elle mutabakat süresi bulunamadı", "no figure found for manual reconciliation time"], ["kaynak bulunamadı", "no source found"],
    ["örnek veride", "in the sample data"],
    ["ortalama stok değeri", "average stock value"], ["yıllık satın alma (ödeme) hacmi", "annual purchasing (payment) volume"],
    ["yıllık gecikme / stoksuzluk olayı", "annual delay / stock-out events"], ["yıllık plansız duruş", "annual unplanned downtime"],
    ["aylık elle kontrol / mutabakat vakası", "monthly manual check / reconciliation cases"], ["tam yüklü saat maliyeti", "fully loaded hourly cost"],
    ["aracın yıllık işletme maliyeti", "annual running cost of the tool"],
    ["Varsayılanlara dön", "Reset to defaults"], ["Yıllık brüt tasarruf", "Annual gross savings"], ["Net (maliyet sonrası)", "Net (after cost)"],
    ["Geri ödeme", "Payback"], ["Yıllık maliyet", "Annual cost"], ["Hesap dökümü (elle kontrol için)", "Calculation breakdown (for manual checking)"],
    ["Formül, sizin girdilerinizle", "Formula with your inputs"],
    ["Alt uç bütün oranların alt değeriyle, üst uç üst değeriyle hesaplanır. Kalemler bağımsız varsayılır; çakışma düşülmez.",
      "The low end uses the low value of every rate, the high end the high value. The lines are assumed independent; overlap is not subtracted."],
    ["stok × fazla payı × azaltma × taşıma", "stock × excess share × reduction × carrying"], ["satın alma × kaçak × yakalama", "purchasing × leakage × catch"],
    ["olay × olay maliyeti × önlenen", "events × cost per event × prevented"], ["duruş saati × saatlik değer × azalma", "downtime hours × hourly value × reduction"],
    ["vaka/ay × 12 × dk/60 × kısalan × saat maliyeti", "cases/month × 12 × min/60 × saved × hourly cost"],
    // senaryo
    ["Kuralların eşiklerini ve ağırlıklarını değiştirin, sonucun nasıl değiştiğini anında görün. Kaynak veri değişmez; hesap tarayıcıda yapılır.",
      "Change the rules' thresholds and weights and see the result change at once. The source data does not change; the calculation runs in the browser."],
    ["Senaryoyu sıfırla", "Reset scenario"], ["Senaryo CSV indir", "Download scenario CSV"], ["Tedarikçi skoru ağırlıkları", "Supplier score weights"],
    ["Temel: %40 / %35 / %25. Ağırlıklar toplamı 100'e normalize edilir.", "Baseline: 40% / 35% / 25%. The weights are normalised to a total of 100."],
    ["Zamanında teslim", "On-time delivery"], ["Kalite (red)", "Quality (rejects)"], ["Fiyat uyumu", "Price compliance"], ["Sıralama sonucu", "Ranking result"],
    ["Temel skor", "Baseline score"], ["Senaryo skoru", "Scenario score"], ["Stok eşikleri", "Stock thresholds"],
    ["Temel: kritik < 7 gün, fazla > 180 gün kapsama.", "Baseline: critical < 7 days, excess > 180 days of cover."], ["Stok sonucu", "Stock result"],
    ["Fazla stok", "Excess stock"], ["Ölü stok", "Dead stock"], ["Bu eşiklerde hiçbir kalemin durumu değişmiyor.", "At these thresholds no item changes status."],
    ["Emniyet stoğunun altında olduğu için kritik olan kalemler eşikten bağımsız kritik kalır (emniyet değeri örnek çıktıda yok).",
      "Items that are critical because they are below safety stock stay critical regardless of the threshold (the safety value is not in the sample output)."],
    ["Tedarikçi çıkarılırsa", "If a supplier is removed"], ["Portföyden çıkarılacak tedarikçi", "Supplier to remove from the portfolio"],
    ["Tedarikçi seçin", "Choose a supplier"],
    ["Bir tedarikçi seçin: sipariş hacmi kalanlara mevcut paylarıyla dağıtılır ve portföy yeniden hesaplanır.",
      "Choose a supplier: its order volume is spread across the others in their current proportions and the portfolio is recalculated."],
    ["Ağırlıklı portföy skoru", "Weighted portfolio score"], ["Red oranı", "Reject rate"], ["En büyük tedarikçi payı", "Largest supplier share"],
    ["Yoğunlaşma uyarısı:", "Concentration warning:"], ["en büyük tedarikçinin payı %30'u aşıyor.", "the largest supplier's share is above 30%."],
    ["Varsayım: kalan tedarikçiler ek hacmi bugünkü performanslarıyla karşılar; kapasite ve fiyat verisi yoktur.",
      "Assumption: the remaining suppliers take the extra volume at today's performance; there is no capacity or price data."],
    ["Tedarikçi verisi yok.", "No supplier data."], ["Stok verisi yok.", "No stock data."],
    // rapor
    ["Yazdır / PDF olarak kaydet", "Print / save as PDF"], ["Aksiyonlar CSV", "Actions CSV"], ["ROI CSV", "ROI CSV"],
    ["Kule Pro · yönetici raporu", "Kule Pro · executive report"], ["Tedarik zinciri kontrol raporu", "Supply chain control report"],
    ["Veriler sentetik örnek veridir; gerçek bir şirkete ait değildir. SAP bağlantısı yoktur. Bulgular açık kurallarla bulunmuştur; dil modeli kullanılmamıştır. ROI bölümü kullanıcı varsayımlarının sonucudur, ölçüm değildir.",
      "The data is synthetic sample data; it does not belong to a real company. There is no SAP connection. The findings come from explicit rules; no language model was used. The ROI section follows from user assumptions; it is not a measurement."],
    ["Tutar etkisi (tekil)", "Amount impact (deduplicated)"], ["Kritik kalem", "Critical items"], ["Ortalama OEE", "Average OEE"],
    ["Aksiyon ve neden", "Action and reason"], ["Parasal etki", "Financial impact"],
    ["Sıra: önem, etki türü (para kaybı, bağlı sermaye, ölçülmedi), tutar. Aynı sipariş kaleminin iki modüldeki bulgusu bir kez sayılır.",
      "Order: severity, impact type (money loss, tied-up capital, not measured), amount. Findings for the same order line in two modules are counted once."],
    ["2. Risk sıralaması", "2. Risk ranking"], ["3. ROI — varsayımsal", "3. ROI — assumptions"], ["Alt (TL/yıl)", "Low (TL/year)"], ["Üst (TL/yıl)", "High (TL/year)"],
    ["Toplam brüt", "Gross total"],
    ["4. Yöntem ve sınırlar", "4. Method and limits"],
    ["Stok: kapsama = stok ÷ günlük sevk; kritik < 7 gün veya emniyet altı, fazla > 180 gün.",
      "Inventory: cover = stock ÷ daily shipments; critical < 7 days or below safety stock, excess > 180 days."],
    ["Tedarikçi skoru: %40 zamanında teslim, %35 kalite, %25 fiyat; ağırlıklar kalibre edilmemiş varsayımdır.",
      "Supplier score: 40% on-time delivery, 35% quality, 25% price; the weights are uncalibrated assumptions."],
    ["Talep: Holt-Winters; %80 aralık ölçümde %97,7 kapsıyor (fazla geniş, kalibre değil).",
      "Demand: Holt-Winters; the 80% interval covers 97.7% when measured (too wide, not calibrated)."],
    ["Üçlü eşleştirme: fatura düzenli metin kalıbıyla okunur; OCR yoktur.", "Three-way match: invoices are read with a regular text pattern; there is no OCR."],
    ["Trend: önceki dönem anlık görüntüsü yok; gösterilen yön yalnız talep tahminidir.", "Trend: there is no previous-period snapshot; the direction shown is only the demand forecast."],
    // modül ekranları
    ["Depo özeti", "Warehouse summary"], ["Stok değeri", "Stock value"], ["Kapsama", "Cover"], ["Tabloda ara", "Search the table"],
    ["Tür dağılımı", "Type breakdown"], ["Sipariş/kalem", "Order/line"], ["Bulgu yok", "No findings"], ["Satır yok", "No rows"],
    ["Hat ve vardiya", "Line and shift"], ["Hat · vardiya", "Line · shift"], ["Hat/vardiya", "Line/shift"], ["Baskın duruş", "Main downtime cause"],
    ["Kök neden önerisi", "Root cause suggestion"], ["Duruş Pareto", "Downtime Pareto"], ["Duruş yok", "No downtime"],
    ["Kök neden metni kural önerisidir, kanıt değildir.", "The root cause text is a rule suggestion, not evidence."],
    ["Ortalama skor", "Average score"], ["sipariş sayısıyla ağırlıklı", "weighted by order count"], ["Skor sıralaması", "Score ranking"],
    ["Ağırlıkları dene", "Try the weights"], ["Ort. gecikme", "Avg. delay"], ["Fiyat sapması", "Price deviation"],
    ["Ort. MAPE", "Avg. MAPE"], ["Benchmark MAPE", "Benchmark MAPE"], ["%80 aralık kapsaması", "80% interval coverage"],
    ["nominal %80; aralık fazla geniş", "nominal 80%; the interval is too wide"], ["Alt %80", "Low 80%"], ["Üst %80", "High 80%"],
    ["Geriye dönük test", "Backtest"], ["Benchmark: geçen yılın aynı haftası.", "Benchmark: the same week last year."], ["%80 kapsama", "80% coverage"],
    ["Kıyası geçemiyor", "Fails benchmark"],
    ["Gölgeli alan yaklaşık %80 aralık (ölçümde fazla geniş); çizgi tahmindir. Birim: adet.",
      "The shaded area is the approximate 80% interval (too wide when measured); the line is the forecast. Unit: pcs."],
    ["Reddedilen girdi satırı:", "Rejected input rows:"],
    // bulgu türleri
    ["Çift kayıt", "Duplicate posting"], ["Fazla teslimat", "Over-delivery"], ["Eksik teslimat", "Short delivery"], ["Açık ve gecikmiş", "Open and overdue"],
    ["Geç teslimat", "Late delivery"], ["Malzeme uyuşmazlığı", "Material mismatch"], ["Siparişsiz kabul", "Receipt without order"],
    ["İrsaliyesiz fatura", "Invoice without delivery note"], ["Fazla fatura miktarı", "Over-invoiced quantity"], ["Çift fatura", "Duplicate invoice"],
    ["Siparişsiz fatura", "Invoice without order"], ["Faturalanmamış teslim", "Uninvoiced delivery"],
    // Sabah raporu, açık kalem mutabakatı
    ["Açık kalem mutabakatı", "Open-item reconciliation"], ["Sabah raporu", "Morning report"], ["Bugünün ilk 5 bulgusu, atlanan analizler, dünden beri", "Today's top 5 findings, skipped analyses, since yesterday"],
    ["Sabah raporunu aç", "Open the morning report"], ["Bugünün ilk 5 bulgusu", "Today's top 5 findings"],
    ["Deneme paketindeki sentetik SAP dosyalarıyla bugünün ilk 5 bulgusu, atlanan analizler ve ertesi sabah “dünden beri” farkı.",
      "Today's top 5 findings from the trial package's synthetic SAP files, the skipped analyses and the next-morning “since yesterday” difference."],
    ["Satıcı mutabakat bulgusu", "Vendor reconciliation findings"], ["sipariş toplamına katılmaz", "not included in the order total"],
    ["Deneme paketindeki sentetik SAP dosyaları yüklenmiş gibi: Kule dosyaları tanır, üç analizi çalıştırır (stok, sipariş anomalisi, açık kalem mutabakatı), girdisi olmayanları atlar. Dosya yükleme bu demoda yoktur.",
      "As if the trial package's synthetic SAP files were uploaded: Kule recognises the files, runs three analyses (inventory, order anomalies, open-item reconciliation) and skips those with no input. There is no file upload in this demo."],
    ["Sentetik SAP deneme paketi (ORNEK VERI); gerçek SAP çıktısı değildir.", "Synthetic SAP trial package (ORNEK VERI); not real SAP output."],
    ["2. günü yükle (ertesi sabah)", "Load day 2 (next morning)"], ["1. güne dön", "Back to day 1"],
    ["Bugünün bulgusu", "Today's findings"], ["Atlanan analiz", "Skipped analyses"], ["girdi dosyası yok", "input file missing"],
    ["Girdi kalitesi", "Input quality"], ["sentetik paket", "synthetic package"],
    ["Dünden beri", "Since yesterday"], ["İlk rapor, karşılaştırma yok.", "First report, no comparison."],
    ["“Dünden beri” farkı, ertesi sabah ikinci dosya yüklenince hesaplanır; bugün için yeni, çözülen ya da değişen sayısı yazılmaz.",
      "The “since yesterday” difference is calculated when the second file is uploaded the next morning; no new, resolved or changed count is shown for today."],
    ["Sahibi bekleyen", "Awaiting owner"], ["sahip atanmamış bulgu", "finding with no owner assigned"],
    ["bugün ilk kez çıktı", "first seen today"], ["artık çıkmıyor", "no longer appears"], ["tutarı değişti", "amount changed"], ["aynen sürüyor", "unchanged"],
    ["Tutar değişti", "Amount changed"],
    ["Sıra: önem ve puan. Parasal etki yalnız bulgunun kendi tutarıdır.", "Order: severity and score. The financial impact is only the finding's own amount."],
    ["Atlanan analizler ve nedenleri", "Skipped analyses and their reasons"],
    ["Girdisi olmayan analiz sessizce boş geçilmez, burada nedeniyle birlikte listelenir.", "An analysis with no input is not silently left empty; it is listed here with its reason."],
    ["Karar motoru", "Decision engine"], ["SAP’ta:", "In SAP:"],
    ["uretim.csv: COOIS (üretim siparişleri ve bildirimleri) ya da CO14 (bildirim listesi)", "uretim.csv: COOIS (production orders and confirmations) or CO14 (confirmation list)"],
    ["talep_gecmis.csv: MB51 aylık çıkış geçmişi (SAP eşlemesinde yok)", "talep_gecmis.csv: MB51 monthly issue history (not in the SAP mapping)"],
    ["tedarikci_teslimat.csv: ME2N + EKET (teslim tarihi) ve MB51 (mal girişi); SAP eşlemesinde yok",
      "tedarikci_teslimat.csv: ME2N + EKET (delivery date) and MB51 (goods receipt); not in the SAP mapping"],
    ["irsaliye.csv: VL06I (gelen teslimat monitörü) ya da SE16N: LIPS (gelen teslimat kalemi); faturalar.txt: MIR5 (fatura belgeleri listesi) ya da SE16N: RBKP / RSEG; SAP eşlemesinde yok, Kule biçiminde verilir",
      "irsaliye.csv: VL06I (inbound delivery monitor) or SE16N: LIPS (inbound delivery item); faturalar.txt: MIR5 (invoice document list) or SE16N: RBKP / RSEG; not in the SAP mapping, supplied in Kule's format"],
    ["SAP dosya biçimleri", "SAP file formats"],
    ["Kule ALV ve SE16N dışa aktarımlarını okur: Türkçe ve İngilizce başlıklar; UTF-8, UTF-16 (BOM’lu ya da BOM’suz) ve ANSI (Windows-1254) kodlamalar.",
      "Kule reads ALV and SE16N exports: Turkish and English headers; UTF-8, UTF-16 (with or without BOM) and ANSI (Windows-1254) encodings."],
    ["Ayraç sekme, noktalı virgül, virgül ya da dikey çizgi (|) olabilir; ayraç başlık satırından seçilir. Çerçeveli “Unconverted” görünümü de okunur.",
      "The delimiter can be tab, semicolon, comma or vertical bar (|); it is chosen from the header row. The framed “Unconverted” view is also read."],
    ["ALV üst bilgisi (başlık ve tarih satırları) ile Toplam satırı atlanır.", "The ALV header (title and date rows) and the Total row are skipped."],
    ["Deneme paketindeki beş dosya bu biçimleri taklit eder: MARD.xlsx (ALV üst bilgisi, Toplam satırı), EKPO.csv (UTF-16, sekme), MSEG.csv (ANSI, noktalı virgül, ALV üst bilgisi), FBL1N.csv (UTF-8, noktalı virgül), EKSTRE.csv (tedarikçinin ekstresi; SAP çıktısı değil).",
      "The five files in the trial package imitate these formats: MARD.xlsx (ALV header, Total row), EKPO.csv (UTF-16, tab), MSEG.csv (ANSI, semicolon, ALV header), FBL1N.csv (UTF-8, semicolon), EKSTRE.csv (the supplier's statement; not SAP output)."],
    ["Bu biçimler sentetiktir; gerçek bir SAP sistemiyle denenmedi.", "These formats are synthetic; they have not been tried against a real SAP system."],
    ["Bu demoda dosya yüklenmez, sonuç önceden hesaplanmıştır.", "No file is uploaded in this demo; the result is precomputed."],
    ["Açık kalem", "Open items"], ["yalnız TL kalemleri", "TL items only"], ["Belge / satıcı-referans", "Document / vendor reference"], ["Gecikme (gün)", "Delay (days)"],
    ["Kısmi ödeme kuralı bu örnek çıktıda tetiklenmez; Sabah raporunun deneme paketinde görünür.",
      "The partial payment rule is not triggered in this sample output; it appears in the Morning report's trial package."],
    ["Vadesi geçmiş", "Past due"], ["Çift açık kalem", "Duplicate open item"], ["Ödenmiş ama açık kalem", "Paid but still open"],
    ["Tutar uyuşmazlığı", "Amount mismatch"], ["Bakiye farkı", "Balance difference"], ["Kısmi ödeme", "Partial payment"], ["Kritik stok", "Critical stock"],
    ["Hidrolik hortum", "Hydraulic hose"], ["Conta seti", "Gasket set"],
    // örnek verinin metinleri
    ["Kapsama = stok ÷ günlük sevk; kritik < 7 gün, fazla > 180 gün; ABC sevk değerine göre.",
      "Cover = stock ÷ daily shipments; critical < 7 days, excess > 180 days; ABC by shipment value."],
    ["Sipariş–mal kabul eşleştirme; 102 iptalleri düşülür, 7 kural.", "Order–goods receipt matching; movement type 102 reversals are excluded, 7 rules."],
    ["Toplamsal Holt-Winters (52 hafta mevsimsellik); parametreler ızgaradan seçilir; güven aralığı sigma × sqrt(h) yaklaşımı.",
      "Additive Holt-Winters (52-week seasonality); parameters chosen by grid search; confidence interval from the sigma × sqrt(h) approximation."],
    ["Ağırlıklı skor: zamanında teslim %40, kalite (red) %35, fiyat uyumu %25.", "Weighted score: on-time delivery 40%, quality (rejects) 35%, price compliance 25%."],
    ["Sipariş–irsaliye–fatura kalem eşleştirme; fatura satırları düzenli metin kalıbıyla çıkarılır (OCR yok); fiyat toleransı %1.",
      "Order–delivery note–invoice line matching; invoice lines are extracted with a regular text pattern (no OCR); price tolerance 1%."],
    ["OEE = kullanılabilirlik × performans × kalite; duruş Pareto'su; kök neden önerisi kural tabanlıdır (öneri, kanıt değil).",
      "OEE = availability × performance × quality; downtime Pareto; the root cause suggestion is rule-based (a suggestion, not evidence)."],
    ["Cümleler kural çıktısındaki sayılardan şablonla doldurulmuştur; dil modeli yoktur.", "The sentences are filled from the rule output's numbers with a template; there is no language model."],
    ["Girdi sentetik örnek veridir (ORNEK_VERI); sonuçlar gerçek bir şirketi temsil etmez.", "The input is synthetic sample data (ORNEK_VERI); the results do not represent a real company."],
    ["Güven aralıkları yaklaşıktır; gerçek kapsama oranı geriye dönük test değerleridir.", "The confidence intervals are approximate; the real coverage rate is the backtest value."],
    ["Şablon özeti: dil modeli kullanılmadı; cümleler kural çıktısından doldurulmuştur.", "Template summary: no language model was used; the sentences are filled from the rule output."],
    ["Ayar ve hazırlık süreleri (ör. SMED) incelenmeli; sık tekrarlanan ayarlar standartlaştırılmalı.",
      "Review setup and changeover times (e.g. SMED); standardise frequently repeated setups."],
    ["Bakım planı ve arıza geçmişi incelenmeli; kritik parçaların önleyici bakımı gözden geçirilmeli.",
      "Review the maintenance plan and breakdown history; check preventive maintenance of critical parts."],
    ["Streç film 23 mikron", "Stretch film 23 micron"], ["Koli 40x30x30", "Carton box 40x30x30"], ["Euro palet 80x120", "Euro pallet 80x120"],
    ["Koli bandı 45mm", "Packing tape 45mm"], ["Çember (PET) 12mm", "Strapping (PET) 12mm"], ["Etiket rulosu 100x150", "Label roll 100x150"],
    ["Köşebent karton 35mm", "Cardboard corner guard 35mm"], ["Hava yastığı dolgu", "Air cushion fill"], ["Ahşap kasa 120x100", "Wooden crate 120x100"],
    ["Big bag 1 ton", "Big bag 1 t"], ["Palet örtü naylonu", "Pallet cover film"], ["Plastik kasa 60x40", "Plastic crate 60x40"]
  ];
  const kac = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const PH = PHRASES.slice().sort((a, b) => b[0].length - a[0].length)
    .map(([a, b]) => [new RegExp("(?<![" + L + "])" + kac(a) + "(?![" + L + "])", "g"), b]);

  function core(s) {
    const n = norm(s);
    if (Object.prototype.hasOwnProperty.call(EXACT, n)) return EXACT[n];
    let out = n;
    for (const [re, rep] of RULES) out = out.replace(re, rep);
    for (const [re, rep] of PH) out = out.replace(re, () => rep);
    for (const [re, rep] of UNITS) out = out.replace(re, rep);
    out = out.replace(/(^|[\s(:/])(-?)%(\d+(?:[.,]\d+)*)/g, "$1$2$3%");  // Türkçe "%80" → "80%"
    return out;
  }
  function tr(s) {
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const n = norm(m[2]);
    if (!n) return null;
    const out = core(n);
    return out === n ? null : m[1] + out + m[3];
  }

  /* ---------- DOM (sitenin assets/i18n.js düzeniyle aynı) ---------- */
  const ATTRS = ["title", "aria-label", "placeholder", "alt"];
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "PRE", "CODE", "TEXTAREA"]);
  const origText = new Map(), outText = new Map(), attrEls = new Set();
  let lang = "tr", obs = null, titleTr = "", descEl = null, descTr = "";

  function doText(node) {
    if (node.parentNode && SKIP.has(node.parentNode.nodeName)) return;
    const cur = node.data;
    if (outText.get(node) === cur) return;
    const t = tr(cur);
    if (t !== null) { origText.set(node, cur); outText.set(node, t); node.data = t; }
    else { origText.delete(node); outText.delete(node); }
  }
  function doAttrs(el) {
    for (const a of ATTRS) {
      if (!el.hasAttribute || !el.hasAttribute(a)) continue;
      const cur = el.getAttribute(a);
      const st = el.__i18n || (el.__i18n = {});
      if (st[a] && st[a].out === cur) continue;
      const t = tr(cur);
      if (t !== null) { st[a] = { orig: cur, out: t }; el.setAttribute(a, t); attrEls.add(el); }
      else delete st[a];
    }
  }
  function walk(root) {
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doAttrs(root);
    for (const el of root.querySelectorAll("*")) doAttrs(el);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (tw.nextNode()) nodes.push(tw.currentNode);
    for (const n of nodes) doText(n);
  }
  function restore() {
    for (const [node, o] of origText) if (node.isConnected && node.data === outText.get(node)) node.data = o;
    origText.clear(); outText.clear();
    for (const el of attrEls) {
      const st = el.__i18n || {};
      for (const a of Object.keys(st)) if (el.getAttribute(a) === st[a].out) el.setAttribute(a, st[a].orig);
      el.__i18n = {};
    }
    attrEls.clear();
  }
  function observe() {
    if (obs) obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  // Panel her ekranda başlığı yeniden yazar; başlığı Türkçe hâliyle tutup çeviririz.
  function doTitle() {
    if (document.title !== titleOut) titleTr = document.title;
    titleOut = lang === "en" ? (tr(titleTr) || titleTr) : titleTr;
    if (document.title !== titleOut) document.title = titleOut;
  }
  let titleOut = "";
  function onMutations(records) {
    if (lang !== "en") { doTitle(); return; }
    obs.disconnect();
    for (const r of records) {
      if (r.type === "childList") r.addedNodes.forEach(walk);
      else if (r.type === "characterData") doText(r.target);
      else if (r.type === "attributes") doAttrs(r.target);
    }
    doTitle();
    observe();
  }

  function paintSwitch() {
    for (const b of document.querySelectorAll("#lang-switch button")) b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  }
  function setLang(l) {
    lang = l === "en" ? "en" : "tr";
    try { localStorage.setItem("lang", lang); } catch (_) { /* depolama yoksa devam */ }
    document.documentElement.lang = lang;
    if (obs) obs.disconnect();
    if (lang === "en") {
      walk(document.body);
      if (descEl) { const d = tr(descTr); if (d !== null) descEl.setAttribute("content", d); }
    } else {
      restore();
      if (descEl) descEl.setAttribute("content", descTr);
    }
    doTitle();
    observe();
    paintSwitch();
  }

  function buildSwitch() {
    const st = document.createElement("style");
    st.textContent =
      "#lang-switch{position:fixed;right:12px;bottom:12px;z-index:9999;display:flex;border:1px solid var(--rule-strong,var(--rule,#b7b0a1));" +
      "border-radius:999px;overflow:hidden;background:var(--surface,#fbfaf6);box-shadow:0 1px 4px rgba(0,0,0,.18);font:600 12px/1 var(--mono,ui-monospace,Consolas,monospace)}" +
      "#lang-switch button{all:unset;cursor:pointer;padding:10px 14px;min-width:44px;text-align:center;color:var(--ink,#1b1d1f)}" +
      "#lang-switch button[aria-pressed=true]{background:var(--ink,#1b1d1f);color:var(--paper,var(--surface,#fff))}" +
      "#lang-switch button:focus-visible{outline:2px solid var(--accent,#d08a00);outline-offset:-4px}" +
      "@media print{#lang-switch{display:none}}";
    document.head.append(st);
    const box = document.createElement("div");
    box.id = "lang-switch";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language / Dil");
    for (const [code, label, name] of [["tr", "TR", "Türkçe"], ["en", "EN", "English"]]) {
      const b = document.createElement("button");
      b.type = "button"; b.dataset.lang = code; b.textContent = label; b.title = name;
      b.addEventListener("click", () => setLang(code));
      box.append(b);
    }
    document.body.append(box);
  }

  function initialLang() {
    try { const p = new URLSearchParams(location.search).get("lang"); if (p === "en" || p === "tr") return p; } catch (_) { /* yok say */ }
    try { const s = localStorage.getItem("lang"); if (s === "en" || s === "tr") return s; } catch (_) { /* yok say */ }
    return (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";
  }

  function init() {
    titleTr = document.title;
    descEl = document.querySelector('meta[name="description"]');
    descTr = descEl ? descEl.getAttribute("content") : "";
    obs = new MutationObserver(onMutations);
    // Panel ekran değişince yalnız <title> metnini değiştirir; onu da izle.
    new MutationObserver(doTitle).observe(document.querySelector("title"), { childList: true, characterData: true, subtree: true });
    buildSwitch();
    setLang(initialLang());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.KuleDemoCeviri = core;  // doğrulama betiği için
})();
