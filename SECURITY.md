# Güvenlik politikası

**Dil / Language:** Türkçe (bu sayfa) · [English](#english)

## Güvenlik açığı bildirimi

Güvenlik açığını herkese açık bir issue ile paylaşmayın. Bunun yerine GitHub'ın özel güvenlik bildirimini kullanın:

**https://github.com/Sahinoglu0/ai-otomasyon-portfoy/security/advisories/new**

Kişisel e-posta adresi bildirim kanalı değildir. Bildirimde şunları yazın: etkilenen dosya ya da sayfa, adımlar, beklenen ve gözlenen davranış.

Bildirimde gerçek SAP verisi, müşteri adı, belirteç (token, parola, API anahtarı) ya da kişisel veri yapıştırmayın. Gerekiyorsa sentetik bir örnek kullanın.

Bu proje kişisel bir projedir. Yanıt süresi garanti edilmez.

## Desteklenen sürümler

| Sürüm | Güvenlik düzeltmesi |
|---|---|
| 0.7.0 (yayın hazırlığında, henüz etiketlenmedi) | Evet |
| 0.6.0 ve öncesi | Hayır |

## Kapsam

- Bu depoda Kule'nin kaynak kodu yoktur. Depo; statik sayfaları, demoyu, test kanıtını, belgeleri ve ajan izlerini içerir. Bildirimler bu içerik için de kabul edilir.
- Kule demo ve pilot kurulum için tasarlanmıştır. Üretim düzeyi güvenlik (TLS, tek oturum açma vb.) bu yayının kapsamı dışındadır.
- Örnek veriler sentetiktir. Ölçümler sentetik ve herkese açık DataCo verisiyle yapılmıştır; gerçek bir SAP dışa aktarımıyla denenmedi. Kule'yi üretim verisiyle kullanmadan önce kendi ortamınızda doğrulama yapın.

## SAP anonimleştirme aracının sınırları

Araç Kule kaynağında bulunur, bu depoda yoktur. Kullanıcı aracı kendi makinesinde çalıştırır.

- Araç yalnız standart kütüphane kullanır ve ağ modülü içermez.
- Tedarikçi, müşteri, malzeme adı ve unvan alanlarını değiştirir. Serbest metin, kolon dışındaki alanlar ve sayısal kimlikler tam olarak yakalanmayabilir. Çıktıyı paylaşmadan önce kendiniz gözden geçirin.
- Yazmadan önce bilinen gerçek değerler çıktıda aranır; bulunursa çıkış kodu 3 olur. Bu tarama yalnız bilinen değerleri kapsar.
- Eşleme dosyası gerçek değerleri içerir. Eşleme dosyasını paylaşmayın.

---

<a id="english"></a>

## Security policy (English)

**Reporting a vulnerability:** do not open a public issue. Use GitHub's private security advisory form:
**https://github.com/Sahinoglu0/ai-otomasyon-portfoy/security/advisories/new**
A personal email address is not a reporting channel. Do not paste real SAP data, customer names, tokens, passwords or API keys into a report; use a synthetic example instead. This is a personal project and no response time is guaranteed.

**Supported versions:** 0.7.0 (release in preparation, not yet tagged). Versions 0.6.0 and earlier are not supported.

**Scope:** this repository holds static pages, the demo, test evidence, documentation and agent traces. Kule's source code is not in this repository. Kule is designed for demo and pilot setups; production-grade security is out of scope. The sample data is synthetic and has not been tested against a real SAP export. Validate in your own environment before using it with production data.

**Anonymisation tool:** it lives in the Kule source, not in this repository. It runs locally, uses only the standard library and has no network module. It replaces supplier, customer, material name and title fields. It does not catch every personal or commercial detail, so review the output before sharing it. Before writing, it searches the output for known real values and exits with code 3 if it finds any; this check only covers values it already knows. The mapping file contains real values and must not be shared.
