# Tedarik krizi soruşturması

ETİKET: **GERÇEK SAĞLAYICI KAYDI** — model yanıtları yerel `claude` komut satırından (gerçek model) alındı; kayıtlar ayrı dosyada.

Soru: T-05 tedarikçisinin performansı neden zayıf? Skor, seviye ve teslim bilgisini yaz, iyileştirme öner.

Durum: **reddedildi**

## Planlayıcı

Alt görevler:
1. T-05 tedarikçisinin güncel performans skorunu ve bu skorun hesaplandığı ölçütleri belirle.
2. T-05'in performans seviyesini ve bu seviyenin tanımını kontrol et.
3. T-05'in teslim geçmişini (zamanında teslim, gecikme, eksik teslim) dönemsel olarak incele.
4. Skoru düşüren ölçütleri (teslim, kalite, fiyat, iletişim vb.) ağırlıklarıyla birlikte karşılaştır.
5. T-05'in performansını aynı kategorideki diğer tedarikçilerle kıyasla.
6. Zayıflığın tekrarlayan mı yoksa belirli bir döneme ya da siparişe özgü mü olduğunu ayırt et.
7. Skor hesaplamasında veri eksikliği veya hatalı kayıt olup olmadığını doğrula.
8. Bulguları neden-sonuç ilişkisi açısından özetle ve iyileştirme için gereken ek veriyi listele.

## Denetçi (kod doğrulayıcı)

| Deneme | Sonuç | Uyuşmazlıklar |
|---|---|---|
| 1 | reddedildi | dayanaksız sayı 25: metinde var, Kule çıktısında ve hesabında yok |
| 2 | reddedildi | iddia bloğu yok: sayısal iddialar doğrulanamaz; dayanaksız sayı 25: metinde var, Kule çıktısında ve hesabında yok |
