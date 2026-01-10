# CV Builder

CV Builder, modern teknolojilerle geliştirilen ve kullanıcılara kolayca özgeçmiş (CV) oluşturma imkanı sunan **çapraz platform (Android, iOS, Web)** destekli bir mobil/web uygulamasıdır. Bu proje ile kullanıcılar; kişisel bilgilerini, eğitim geçmişlerini ve iş tecrübelerini özelleştirilebilir ve şık bir arayüz ile rahatça kaydedebilir, yönetebilir ve dışa aktarabilirler.

## Özellikler

- Dinamik ve kullanıcı dostu bir arayüz
- Çoklu dil desteği
- Koyu/açık tema arasında geçiş
- Firebase tabanlı kimlik doğrulama
- Özgeçmiş düzenleme ve önizleme
- PDF veya paylaşılabilir formatlarda dışa aktarma
- Platformlar arası (iOS + Android + Web) çalışma
- Dosya tabanlı routing yapısı ve bileşen tabanlı mimari

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Uygulamayı başlatın:
   ```bash
   npx expo start
   ```

3. Çıkan seçenekler ile Android/iOS emülatörde, cihazda veya web üzerinde uygulamayı görüntüleyebilirsiniz.

> Not: Çevre değişkenleri için `.env.example` dosyasını inceleyip, kendi `.env` dosyanızı oluşturmayı unutmayın.

## Dosya & Klasör Yapısı

```
cv-builder/
├── app/               # Expo Router ile sayfa ve ekranlar (örn: _layout.tsx ile ana kapsayıcı)
├── assets/            # Görseller ve statik dosyalar
├── components/        # Yeniden kullanılabilir React bileşenleri
├── constants/         # Sabitler
├── docs/              # Dokümantasyonlar
├── hooks/             # Özel React Hook’ları
├── scripts/           # Yardımcı script dosyaları
├── src/               # Navigasyon, tema, i18n ve iş mantığı
├── .env.example       # Ortam değişkenleri örnek dosyası
├── package.json       # Proje bağımlılıkları ve script’ler
└── ...                # Diğer config ve kök dosyalar
```

### `app/_layout.tsx` Nasıl çalışır?
Uygulamanın bütün ana sağlayıcılarını (`I18nProvider`, `AuthProvider`, `ThemeProvider`) sarar ve React Navigation altyapısı ile ekranlar arasındaki geçişi sağlar. Dosya tabanlı route yapısı sayesinde yeni bir ekran eklemek oldukça kolaydır.

## Teknolojiler & Kullanılan Araçlar

- Expo ve React Native
- TypeScript
- React Navigation
- Firebase Auth
- Expo Router
- Temalandırma sistemi & çoklu dil desteği (i18n)
- Modern UI bileşenleri (Tamagui, vector-icons, modal vs.)

## Katkıda Bulunma

Her türlü PR ve issue için katkılarınızı bekleriz!

1. Fork’layın
2. Yeni bir branch oluşturun
3. Değişikliklerinizi yapıp commit’leyin
4. PR gönderin

## Lisans

MIT

---

Daha fazlası ve detaylı dokümantasyon için:  
➡️ [Proje ana dizinindeki kodlara bakmak için GitHub'a göz atabilirsiniz.](https://github.com/egeaydn/cv-builder)
