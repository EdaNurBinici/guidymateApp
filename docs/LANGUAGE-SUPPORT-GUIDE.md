# 🌍 Dil Desteği Eklendi - Kullanım Rehberi

## ✅ Yapılan Değişiklikler

### 1. Backend (web-app-api/server.js)
- ✅ `SYSTEM_PROMPTS` objesi oluşturuldu (Türkçe ve İngilizce)
- ✅ `/coach/start` endpoint'ine `language` parametresi eklendi
- ✅ `/coach/reply` endpoint'ine `language` parametresi eklendi
- ✅ `/get-ai-advice` endpoint'ine `language` parametresi eklendi

### 2. Frontend
- ✅ `frontend/src/i18n/translations.js` - Tüm çeviriler
- ✅ `frontend/src/components/LanguageToggle.jsx` - Dil seçici komponent
- ✅ `frontend/src/components/LanguageToggle.css` - Dil seçici stilleri
- ✅ `frontend/src/App.jsx` - Dil desteği entegrasyonu

---

## 🚀 Nasıl Kullanılır?

### Kullanıcı Tarafı

1. **Dil Seçici Butonu**
   - Sağ üst köşede bayrak ikonu (🇹🇷 TR veya 🇬🇧 EN)
   - Tıklayınca dropdown açılır
   - Türkçe veya İngilizce seçebilirsiniz

2. **Otomatik Kayıt**
   - Seçilen dil `localStorage`'a kaydedilir
   - Sayfa yenilendiğinde seçilen dil korunur

3. **AI Dil Desteği**
   - AI Koç seçilen dilde cevap verir
   - Analiz & Tavsiye seçilen dilde gelir
   - Tüm AI yanıtları seçilen dile göre oluşturulur

---

## 📝 Kalan İşler (Manuel Güncelleme Gerekli)

App.jsx dosyasında tüm metinleri `t.key` formatına çevirmeniz gerekiyor.

### Örnek Değişiklikler:

**Öncesi:**
```jsx
<button>Yolculuğa Başla</button>
```

**Sonrası:**
```jsx
<button>{t.startButton}</button>
```

### Değiştirilmesi Gereken Yerler:

1. **Landing Page**
   - ✅ Hero title ve subtitle (yapıldı)
   - ⏳ Feature kartları
   - ⏳ CTA butonları

2. **Auth Pages**
   - ⏳ Login/Register formları
   - ⏳ Hata mesajları
   - ⏳ Başarı mesajları

3. **Dashboard**
   - ⏳ Sidebar menü öğeleri
   - ⏳ Profil formu
   - ⏳ AI Koç arayüzü
   - ⏳ Yol Haritası
   - ⏳ Not Defteri
   - ⏳ Focus Modu

---

## 🔧 Hızlı Güncelleme Scripti

Tüm metinleri otomatik olarak güncellemek için şu adımları izleyin:

### 1. Sidebar Menü
```jsx
// Öncesi:
<div>👤 Profilim</div>

// Sonrası:
<div>{t.profile}</div>
```

### 2. Butonlar
```jsx
// Öncesi:
<button>Güncelle ✅</button>

// Sonrası:
<button>{t.updateButton}</button>
```

### 3. Toast Mesajları
```jsx
// Öncesi:
showToast("Profil Kaydedildi! ✅");

// Sonrası:
showToast(t.profileSaved);
```

### 4. Placeholder'lar
```jsx
// Öncesi:
<input placeholder="Email" />

// Sonrası:
<input placeholder={t.email} />
```

---

## 🎯 Test Etme

### 1. Backend'i Başlat
```bash
cd web-app-api
npm start
```

### 2. Frontend'i Başlat
```bash
cd frontend
npm run dev
```

### 3. Test Senaryoları

**Dil Değiştirme:**
1. Sağ üst köşedeki bayrak ikonuna tıkla
2. İngilizce seç
3. Sayfa içeriği İngilizce'ye dönmeli

**AI Koç:**
1. İngilizce seç
2. "AI Coach" sekmesine git
3. "New Chat" butonuna tıkla
4. AI İngilizce cevap vermeli

**Analiz & Tavsiye:**
1. İngilizce seç
2. "Get Analysis & Advice Now" butonuna tıkla
3. AI İngilizce analiz vermeli

---

## 🐛 Sorun Giderme

### AI Türkçe Cevap Veriyor (İngilizce Seçili)

**Sebep:** Backend'e `language` parametresi gönderilmiyor

**Çözüm:**
```jsx
// startNewChat fonksiyonunu kontrol et
const result = await apiCall("/coach/start", "POST", { 
  userName: authData.name, 
  language  // ← Bu olmalı
});
```

### Dil Seçici Görünmüyor

**Sebep:** LanguageToggle import edilmemiş

**Çözüm:**
```jsx
import LanguageToggle from "./components/LanguageToggle";

// JSX'te:
<LanguageToggle language={language} setLanguage={setLanguage} />
```

### Çeviriler Çalışmıyor

**Sebep:** `t` objesi tanımlı değil

**Çözüm:**
```jsx
import { useTranslation } from "./i18n/translations";

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'tr';
  });
  const t = useTranslation(language);
  // ...
}
```

---

## 📚 Çeviri Ekleme

Yeni bir çeviri eklemek için:

### 1. translations.js'e Ekle
```javascript
export const translations = {
  tr: {
    // ...
    myNewKey: "Türkçe Metin",
  },
  en: {
    // ...
    myNewKey: "English Text",
  }
};
```

### 2. Kullan
```jsx
<div>{t.myNewKey}</div>
```

---

## ✅ Tamamlanma Durumu

- ✅ Backend dil desteği
- ✅ Dil seçici komponent
- ✅ Çeviri dosyası
- ✅ AI Koç dil desteği
- ✅ Analiz & Tavsiye dil desteği
- ✅ Landing page başlangıç
- ⏳ Tüm UI metinlerinin çevirisi (manuel güncelleme gerekli)

---

## 🎉 Sonuç

Dil desteği altyapısı hazır! Şimdi sadece App.jsx'teki tüm metinleri `t.key` formatına çevirmeniz gerekiyor.

**Örnek:**
```jsx
// Tüm "Giriş Yap" metinlerini bul ve değiştir:
"Giriş Yap" → {t.login}

// Tüm "Kayıt Ol" metinlerini bul ve değiştir:
"Kayıt Ol" → {t.register}
```

Bu işlemi tüm metinler için tekrarlayın!
