# 📱 CV BUILDER MOBILE APP - Proje Dokümantasyonu

## 0️⃣ Büyük Resim

- Mobil CV oluşturma uygulaması
- Expo (React Native) ile
- Firebase backend
- İngilizce + Türkçe
- Reklam yok
- Abonelik yok
- UX öncelikli
- Play Store'da yayınlanacak

## 1️⃣ Kullanıcı Akışı (UX – SON HALİ)

### App açılışı
- Welcome / Preview Screen
- CV şablonları görünüyor
- "Create your CV" butonu
- ❌ Direkt login yok (drop rate öldürür)

### CV oluşturma başlatınca
- Login / Register
- Email + Google
- Firebase Auth

### Ana yapı
Bottom Tab Navigation:
- 🏠 Home
- 📄 My CVs
- ⚙️ Settings

## 2️⃣ Home Screen (en kritik ekran)

**Amaç:** Boşluk hissi yok, güven veriyor.

**Yapı:**
- Vertical scroll + horizontal carousels

**Kategoriler:**
- 🎓 Students & Juniors
- 💼 Professionals
- 🎨 Creative
- 🌍 Academic

**Her kart:**
- Template thumbnail
- Template adı
- "ATS Friendly" etiketi (varsa)

## 3️⃣ 8 CV ŞABLONU (net liste)

### 🎓 Öğrenci / Junior
1. Student Clean
2. Junior Tech

### 💼 Profesyonel
3. Modern Professional
4. Corporate Classic

### 🎨 Kreatif
5. Creative Minimal
6. Creative Bold

### 🌍 Akademik / Global
7. International Simple
8. Academic CV

**⚠️ İlk versiyon = sadece bu 8'i**  
"Sonra ekleriz" tuzağına düşmek YASAK

## 4️⃣ CV Oluşturma Akışı (Wizard)

Tek uzun form yok. Step by step.

**Adımlar:**
1. Personal Info
2. Title & Summary
3. Education
4. Experience
5. Projects
6. Skills
7. Extras (Languages, Certificates, Links)

- Her adım opsiyonel
- "Skip" butonu var
- UX rahat

## 5️⃣ CV Preview & PDF

**Dopamin anı**

Özellikler:
- Gerçek CV görünümü
- Zoom
- Sayfa düzeni

**Alt butonlar:**
- 💾 Save
- 📄 Download PDF
- ❌ Kapat yok (güvensizlik yaratır)

## 6️⃣ My CVs Screen

**Login'in anlamı burada.**

Görüntülenen:
- Kullanıcının tüm CV'leri
- Oluşturulma tarihi
- Template adı
- PDF indir
- Düzenle

## 7️⃣ Settings

- 🌐 Dil (EN / TR)
- 🌙 Dark / Light mode
- 👤 Profil fotoğrafı
- 🚪 Logout

## 8️⃣ Backend – Firebase

**NEDEN FIREBASE?**  
Solo dev + genç yaş = minimum sürtünme

**Kullanılan servisler:**
- Firebase Auth
- Firestore
- Firebase Storage

### Firestore Yapısı

#### users
```javascript
users {
  uid
  email
  name
  photoURL
  createdAt
}
```

#### cvs
```javascript
cvs {
  id
  userId
  templateId
  language
  personalInfo
  education[]
  experience[]
  projects[]
  skills[]
  extras
  createdAt
  updatedAt
}
```

#### templates
```javascript
templates {
  id
  category
  isATS
  previewImage
}
```

## 9️⃣ PDF Oluşturma (KRİTİK KARAR)

- ❌ Server-side yok
- ❌ Extra maliyet yok
- ✅ expo-print
- Client-side PDF
- Offline çalışır
- Play Store için güvenli

## 🔤 Dil Desteği (i18n)

İlk günden doğru kurulum

**Kütüphaneler:**
- i18n-js
- expo-localization

**Tüm metinler:**
- `src/i18n/en.json`
- `src/i18n/tr.json`

**Varsayılan:**
- Sistem dili
- Ayarlardan değiştirilebilir

## 🎨 UI / Theme

**Tema:**
- Light & Dark
- Minimal
- ATS uyumlu renkler

**Kütüphaneler:**
- react-native-paper veya
- custom components + StyleSheet
- (şişirme UI library YOK)

## 🧱 Klasör Yapısı (NET)

```
src/
 ├─ components/
 ├─ screens/
 │   ├─ Welcome
 │   ├─ Auth
 │   ├─ Home
 │   ├─ CVWizard
 │   ├─ Preview
 │   ├─ MyCVs
 │   └─ Settings
 ├─ services/
 │   ├─ firebase.ts
 │   ├─ auth.ts
 │   └─ pdf.ts
 ├─ i18n/
 ├─ theme/
 └─ data/
```

## 🧰 Kullanılan Kütüphaneler (Özet)

| Amaç | Kütüphane |
|------|-----------|
| App | Expo |
| Navigation | @react-navigation |
| Auth | Firebase Auth |
| DB | Firestore |
| Storage | Firebase Storage |
| PDF | expo-print |
| Dil | i18n-js |
| Tema | custom / paper |

## 🖼️ CV Şablonları NEREDEN?

En mantıklı yol:
- Figma Community ("ATS Resume", "CV Template")
- Dribbble (ilham)
- Pinterest (layout)

**⚠️ Birebir kopya yok**  
Layout ilham → kendi component'lerin
