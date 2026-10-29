# Yol haritası

Sıradaki işler. Tarih verilmez; işler bittikçe [CHANGELOG.md](CHANGELOG.md) dosyasına tarihli satır olarak girer.
Tamamlanan maddeler silinmedi; her birinin başında **Tamamlandı** yazılır ve ne yapıldığı eklenir.

## Yakın işler

- **Canlı noindex doğrulaması.** Push'tan sonra üç sayfada `robots` etiketinin yayında olduğu kontrol edilir. `robots.txt` eklenmez.
  **Tamamlandı (kaynak):** `noindex` üç HTML sayfasında (`42c5af4`, v0.2.0) ve yayın kapısında (kontrol 3). **Açık:** canlı sayfada kontrol, push sonrası.
- **Demoya giriş bağlantısı.** Statik panel demosu (`demo/`) kök sayfadan bağlanmıyor. Karar: bağlantı eklensin mi.
- **Demo için yayın kapısı.** Push öncesi kapı kontrolü `demo/` klasörünü de kapsamalı.
  **Not:** yayın kapısı kopyanın tamamını tarıyor (kontrol 4 ve 5 `demo/` dahil); demo'ya özel bir kontrol hâlâ yok.
- **O2 bandı.** Demonun önceden hesaplanmış veri kaynağı olarak O2 bandı henüz kullanılmadı.
- **Node testi.** Kanıt klasörü bulunmayan geçici kopyada KULE-E6 testi atlanıyor. Kanıt klasörünün yayın kopyasına alınıp alınmayacağı kararı bekliyor.
- **Eval çizimleri ve README sayıları tek kaynaktan.**
  **Tamamlandı (A2):** `yayin_uret.py` çizimleri, README sayı bloklarını ve kanıt özetlerini `eval-sonuc.json`'dan üretiyor (`--kontrol` ile denetlenir). Eval 46 vaka: 41/41 ölçüt geçti, 5 bilinen açık gözlendi.
- **Gerçek SAP dışa aktarımıyla ilk deneme.** Anonim küçük bir liste, üç biçim (Unconverted, Text with Tabs, Spreadsheet), ilk baytlar ve kodlama/BOM kararı. Biçimler şimdiye dek yalnız sentetik dosyalarla sınandı (KULE-R5, R5b).
- **Sabit rapor tarihi.** **Tamamlandı (S9, S12):** sipariş anomalisi ve FBL1N kuralları rapor tarihini istekten ya da sunucunun bugününden alıyor; sabit örnek tarih yalnız bütün girdiler örnek veri olduğunda kullanılıyor ve ekranda etiketli.
- **ROI kayıt bağlantısındaki bayat değer.** **Tamamlandı (S10):** hesaptaki süre yeni kayıtlarla eşitleniyor, tek tahmin "kullanıcı tahmini" etiketli. Açık: kayıtlar pilot ölçümü değil; ROI "kısmen kayıtlı" diye anlatılır.
- **Sabah ekranında `.xlsx`.** Panel `.xlsx` kabul etmiyor (yalnız `.csv`, `.txt`); sunucu yalnız disk klasöründen okuyor. Kabul etmek küçük bir değişiklik, ama bir ürün kararı (KULE-R7).

## Açık kararlar

- **Körlemesine onay modu.** `--onay-ver` modunda onay özeti denetlenmiyor; bu açık kapanmadı. Karar: modun kaldırılması ya da sıkılaştırılması.
  **Tamamlandı (G2b):** körlemesine onay yolu kapatıldı; bayrak yalnız senaryoya özgü özetle yazmayı açar. Karar bekliyor: bayrağın tamamen kaldırılması ya da sıkılaştırılması.
- **Kanıt klasörü izleme durumu.** Kule deposunda `docs/agent-results/` izlenmiyor. Karar: izlensin mi, yayından ayrı mı tutulsun.
- **Düz metindeki sayı bağlamı (bilinen açık).** Denetçi düz metindeki sayının bağlamını denetlemiyor. Eval'de üç açık vaka duruyor (`KACAK-duz-metin-*`). Karar: bağlam denetimi ölçüte çevrilsin mi, ayrı bir ön-kayıtla mı ölçülsün.
- **BPI adaptörünün yeniden tasarımı.** Fatura hattı düzeltmesi (V6, V7, V9) enjekte sınamayı 20/20'ye çıkardı; ama sınamalar kendi tohumumuzla yapıldı. Bağımsız yeniden sınama ve adaptör varsayımlarının gözden geçirilmesi bekliyor; sonuç doğruluk ölçümü olarak sunulmaz.
- **Tedarikçi ekstresinin biçimi.** Ekstre Kule CSV biçiminde; PDF ekstre OCR yok kuralıyla çelişiyor (KULE-R6). Karar: hangi ekstre biçimleri desteklensin.

## Sonraki ölçümler

- **Gerçek model koşuları.** Tamamlandı (O1, `claude-haiku-5-5`): 40 planlanan koşunun 38'i kaydedildi, 37'si tamamlandı, 1'i kotada kesildi; soruşturmada 20 koşunun 16'sı kabul edildi. Denetçi ve orkestratör için tam koşu ölçümü hâlâ eksik; bu iş C3 kapsamında (kota kararı patronun).
- **Paraphrase sızıntısı.** Tamamlandı (eval): yeniden ifade edilmiş sızıntı iki açık vaka olarak eval'e girdi (`KACAK-enjeksiyon-anlamsal-parafraz`, `KACAK-enjeksiyon-parafraz-varsayilan-kapali`). Son yanıttaki birebir kopya kontrolü bu sınıfı yakalamıyor; bilinen açık olarak duruyor. Varsayılanda 0/6 yakalandı.
- **Sürüm etiketi.** İlk yayın etiketi ve README cümlesi lider tarafından eklenir.
- **Enjekte anomali duyarlılık ölçümü.** Bağımsız tohumla, kabul ölçütü önceden yazılı.
- **Tam M5 talep koşusu.** Makinede bellek azlığı nedeniyle tamamlanamadı (KULE-V8); daha büyük bellekte yeniden koşulacak.
