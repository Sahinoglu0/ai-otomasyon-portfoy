# Yol haritası

Sıradaki işler. Tarih verilmez; işler bittikçe [CHANGELOG.md](CHANGELOG.md) dosyasına tarihli satır olarak girer.

## Yakın işler

- **Canlı noindex doğrulaması.** Push'tan sonra üç sayfada `robots` etiketinin yayında olduğu kontrol edilir. `robots.txt` eklenmez.
- **Demoya giriş bağlantısı.** Statik panel demosu (`demo/`) kök sayfadan bağlanmıyor. Karar: bağlantı eklensin mi.
- **Demo için yayın kapısı.** Push öncesi kapı kontrolü `demo/` klasörünü de kapsamalı.
- **O2 bandı.** Demonun önceden hesaplanmış veri kaynağı olarak O2 bandı henüz kullanılmadı.
- **Node testi.** Kanıt klasörü bulunmayan geçici kopyada KULE-E6 testi atlanıyor. Kanıt klasörünün yayın kopyasına alınıp alınmayacağı kararı bekliyor.

## Açık kararlar

- **Körlemesine onay modu.** `--onay-ver` modunda onay özeti denetlenmiyor; bu açık kapanmadı. Karar: modun kaldırılması ya da sıkılaştırılması.
- **Kanıt klasörü izleme durumu.** Kule deposunda `docs/agent-results/` izlenmiyor. Karar: izlensin mi, yayından ayrı mı tutulsun.

## Sonraki ölçümler

- **Gerçek model koşuları.** Denetçi ve orkestratör için gerçek model koşusu yapılmadı; bu iş G5 ve O1 kapsamında.
- **Paraphrase sızıntısı.** Son yanıttaki birebir kopya kontrolü, yeniden ifade edilmiş enjeksiyonu yakalamaz. Bu bilinen bir açık ve ölçüm için bir vaka eklenecek.
- **Sürüm etiketi.** İlk yayın etiketi ve README cümlesi lider tarafından eklenir.
