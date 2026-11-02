# Kule Pro 0.7.0

**Dil / Language:** Türkçe · [English](#english)

Bu metin GitHub Release gövdesidir. Etiket: `v0.7.0`.

**Yayın tarihi:** 2 Kasım 2026

## Öne çıkanlar

- **Dosya başına ondalık ayarı.** Her SAP dosyası için sayıların `tr` ya da `en` biçiminde yazıldığı sihirbaz adımında seçilir. Seçilmeyen dosyada tahmin yapılmaz.
- **Yanlış ondalık ayarı uyarısı.** Seçilen ayar dosyadaki değerlerle kesin olarak çelişiyorsa uyarı çıkar. Değer değiştirilmez.
- **Belirsiz değer önizlemesi.** `1.250` gibi iki biçimde de okunabilen değerler iki okunuşla gösterilir. Kule birini seçmez.
- **"Kontrol edilemedi" bildirimi.** Bir sütunun tüm değerleri `x.xxx` biçimindeyse ve karşı kanıt yoksa sakin bir not çıkar. Değer değiştirilmez.
- **Sabah ekranında `.xlsx` kabulü.** Sunucu ilk sayfayı okur. Zip64 ve şifreli `.xlsx` dosyaları kapsam dışıdır.
- **SAP anonimleştirme aracı.** Tedarikçi, müşteri, malzeme adı ve unvan alanlarını değiştirir. Kullanıcı kendi makinesinde çalıştırır; eşleme dosyası paylaşılmamalıdır. Araç Kule kaynağındadır; bu depoda yoktur.
- **Eşleme şablonu düzeltmeleri.** `LIFNR` tablosu EKKO, `EINDT` tablosu EKET, `MENGE` tablosu EKPO olarak düzeltildi. `MAKTX`, `EISBE` ve `VERPR` "doğrulanamadı" işaretiyle bırakıldı.
- **Bellek kullanımı.** Talep tahmini akışlı okunur. Sentetik ölçümde (Windows 11, 3.000 M5 serisi) tepe bellek 556 MB'tan 34 MB'a indi; süre aynı kaldı (46,9 s).
- **Düzeltmeler.** Doğru ondalık değerleri artık reddedilmiyor (ör. TR ayarında `1.000` → `1000`). Bozuk `.xlsx` için "okunamadı" uyarısı çıkıyor. Erişilebilirlik denetiminde dört orta öncelikli bulgu düzeltildi (dokunma hedefleri, hata duyurusu, kenarlık ve odak kontrastı).

## Sayılar

- Kule Python: **559** test geçti, 0 başarısız (Python 3.14.7).
- Orkestratör Python: **120** test geçti, 0 başarısız.
- Panel (Node): **128** test geçti, 0 başarısız.

## Dürüst sınırlar

- **Kanıt sentetiktir.** Fikstürler proje üreticisiyle üretildi. Gerçek bir SAP dışa aktarımı ve gerçek bir Excel dosyasıyla doğrulanmadı.
- **Kolon adları doğrulanmadı.** `MAKTX`, `EISBE`, `VERPR` ve kolon adları birincil SAP kaynağıyla doğrulanamadı. Tablo adları ikincil kaynaktan alındı.
- **Ondalık uyarısının kapsamı dar.** Yalnız kesin çelişkide uyarı çıkar. `x.xxx` biçimli tek noktalı üç haneli sütunlar kanıtla ayrılamaz; "kontrol edilemedi" diye bildirilir.
- **Çapraz risk.** Dosya bir biçimde yazılmışken öteki biçim seçilirse bazı değerler uyarı çıkmadan yanlış okunabilir. Ölçümde 12 değer bu şekilde yanlış okundu. Sihirbaz önizlemesi riski azaltmanın tek görünür yoludur.
- **Yıl ve şirket kodu anahtarı yok.** Mali yıl ve şirket kodu (`BUKRS`) anahtara eklenmedi. Bilinen sınır.
- **Tarih hücreleri.** Excel seri numarası olarak gelen tarihli satırlar reddedilir.
- **Kanıt klasörü.** Bu yayın kopyasındaki `kanit/` klasörü 0.6.0 kataloğundadır; 0.7.0 kataloğuna henüz geçirilmedi.
- **Platform.** Windows 11 ve headless Chrome ile denendi. macOS ve Linux denenmedi.
- **Test kataloğu.** `kanit/test-katalogu.*` v0.6.0 koşusuna (580 test) aittir; 0.7.0 için henüz yenilenmedi. Güncel sayılar `kanit/` sayfasındadır.
- **Gerçek ekran okuyucu.** NVDA ve VoiceOver ile doğrulanmadı. Düşük öncelikli açıklar açık: csv ve xlsx çakışması hazırla adımında reddediliyor; üst gezinme 360 px'de yatay kaydırıyor.

## Kurulum

Bu depoda Kule'nin kaynak kodu yoktur ve bu sürümde yayınlanmadı; bu yüzden bir kurulum satırı verilmiyor. Ürün sayfası ve kanıt için: https://sahinoglu0.github.io/ai-otomasyon-portfoy/

---

<a id="english"></a>

# Kule Pro 0.7.0 (English)

This text is the GitHub Release body. Tag: `v0.7.0`. **Release date:** 2 November 2026

## Highlights

- **Decimal setting per file.** For each SAP file, the number format (`tr` or `en`) is chosen in the wizard. No guessing when it is not chosen.
- **Wrong decimal setting warning.** If the chosen setting clearly contradicts values in the file, a warning appears. Values are not changed.
- **Ambiguous value preview.** Values such as `1.250` that read either way are shown with both readings. Kule does not pick one.
- **"Could not verify" note.** If every value in a column is `x.xxx` and there is no counter-evidence, a quiet note appears. Values are not changed.
- **`.xlsx` on the morning screen.** The server reads the first sheet. Zip64 and encrypted `.xlsx` files are out of scope.
- **SAP anonymisation tool.** Replaces supplier, customer, material name and title fields. It runs on the user's machine; do not share the mapping file. The tool lives in the Kule source, not in this repository.
- **Mapping template fixes.** `LIFNR` is EKKO, `EINDT` is EKET, `MENGE` is EKPO. `MAKTX`, `EISBE` and `VERPR` are marked as unverified.
- **Memory use.** Demand forecasting reads in a stream. In a synthetic measurement (Windows 11, 3,000 M5 series) peak memory fell from 556 MB to 34 MB; run time stayed at 46.9 s.
- **Fixes.** Correct decimal values are no longer rejected (e.g. `1.000` → `1000` under the TR setting). Broken `.xlsx` files get a "could not be read" message. Four medium-priority accessibility findings were fixed (touch targets, error announcement, border and focus contrast).

## Numbers

- Kule Python: **559** tests passed, 0 failed (Python 3.14.7).
- Orchestrator Python: **120** tests passed, 0 failed.
- Panel (Node): **128** tests passed, 0 failed.

## Honest limits

- **The evidence is synthetic.** Fixtures were generated with the project's generator. Not verified against a real SAP export or a real Excel file.
- **Column names are unverified.** `MAKTX`, `EISBE`, `VERPR` and column names could not be checked against a primary SAP source. Table names come from a secondary source.
- **The decimal warning is narrow.** It only fires on clear contradictions. Single-dot, three-digit `x.xxx` columns cannot be separated by evidence and are reported as "could not verify".
- **Cross-risk.** If a file is written in one format and the other is selected, some values can be misread without a warning. In measurement, 12 values were misread this way. The wizard preview is the only visible way to reduce this risk.
- **No fiscal year or company code key.** Fiscal year and company code (`BUKRS`) were not added. Known limit.
- **Date cells.** Rows whose dates arrive as Excel serial numbers are rejected.
- **Evidence folder.** The `kanit/` folder in this release copy still uses the 0.6.0 catalogue; it has not been moved to 0.7.0.
- **Platform.** Tested on Windows 11 with headless Chrome. macOS and Linux were not tested.
- **Test catalogue.** `kanit/test-katalogu.*` belongs to the v0.6.0 run (580 tests) and has not been refreshed for 0.7.0. Current counts are on the `kanit/` page.
- **Screen readers.** Not verified with NVDA or VoiceOver. Open low-priority items: the csv and xlsx conflict is rejected at the prepare step, not at upload; top navigation scrolls horizontally at 360 px.

## Install

The Kule source code is not in this repository and was not published in this release, so there is no install line. Product page and evidence: https://sahinoglu0.github.io/ai-otomasyon-portfoy/
