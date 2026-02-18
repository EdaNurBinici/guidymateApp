# 🚀 Hızlı Başlangıç Rehberi

## 1. Backend Kurulumu (5 dakika)

### Adım 1: Gerekli Paketleri Kur
```bash
cd backend
npm install
```

### Adım 2: Environment Variables Ayarla
`backend/.env` dosyası oluştur:

```env
DB_USER=postgres
DB_PASS=your_password
DB_NAME=ai_career_db
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_secret_key_12345
GROQ_API_KEY=your_groq_api_key
```

**ÖNEMLİ:** 
- `DB_PASS`: PostgreSQL şifreni yaz
- `JWT_SECRET`: Rastgele bir string (örn: `mySecretKey123!@#`)
- `GROQ_API_KEY`: [console.groq.com](https://console.groq.com) adresinden al

### Adım 3: Database Oluştur
```bash
# PostgreSQL'e bağlan
psql -U postgres

# Database oluştur
CREATE DATABASE ai_career_db;

# Çık
\q

# Tabloları oluştur
psql -U postgres -d ai_career_db -f database/schema.sql
```

### Adım 4: Backend'i Başlat
```bash
npm start
```

✅ Çıktıda `Server 5000 portunda çalışıyor... 🚀` görmelisin.

**Test et:** Tarayıcıda `http://localhost:5000` aç - JSON görmelisin.

---

## 2. Frontend Kurulumu (3 dakika)

### Adım 1: Gerekli Paketleri Kur
```bash
cd frontend
npm install
```

### Adım 2: Environment Variables Ayarla
`frontend/.env` dosyası oluştur:

```env
VITE_API_URL=http://localhost:5000
```

**Not:** Google ile giriş şimdilik devre dışı (isteğe bağlı özellik).

### Adım 3: Frontend'i Başlat
```bash
npm run dev
```

✅ Çıktıda `Local: http://localhost:5173` görmelisin.

**Test et:** Tarayıcıda `http://localhost:5173` aç.

---

## 3. İlk Kullanım

1. **"Yolculuğa Başla"** butonuna tıkla
2. **"Kayıt"** sekmesine geç
3. Bilgilerini gir:
   - Ad: İsmin
   - Email: Email'in
   - Şifre: En az 6 karakter
4. **"Kayıt Ol"** butonuna tıkla
5. **"Giriş"** sekmesine geç
6. Email ve şifrenle giriş yap
7. **Profil bilgilerini doldur** (önemli!)
8. Uygulamayı kullanmaya başla! 🎉

---

## 4. Özellikler

### 👤 Profilim
- Yaş, şehir, eğitim bilgileri
- Hedef belirleme
- Günlük çalışma saati

### 🤖 AI Koç
- **Analiz & Tavsiye:** Profiline göre AI tavsiyesi al
- **Sohbet:** AI ile sohbet et, sorular sor

### 🗺️ Yol Haritası
- Hedefine göre 5 seviyeli plan
- Her seviyede 5 görev
- İlerleme takibi

### 📝 Not Defteri
- Not oluştur
- Notları ara
- Notları görüntüle/sil

### ⏱️ Focus Modu
- Pomodoro timer (25 dk çalış, 5 dk mola)
- Arka plan özelleştirme
- Tam ekran modu

---

## 5. Sorun mu Yaşıyorsun?

### "Sunucuya bağlanılamıyor" Hatası
✅ Backend çalışıyor mu kontrol et: `http://localhost:5000`

### "Email bulunamadı" Hatası
✅ Önce kayıt ol, sonra giriş yap

### "Bu email kayıtlı!" Hatası
✅ Zaten hesabın var, giriş yap

### Database Hatası
✅ PostgreSQL çalışıyor mu kontrol et
✅ `.env` dosyasındaki bilgiler doğru mu?

**Daha fazla yardım:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 6. Google ile Giriş (İsteğe Bağlı)

Google ile giriş özelliğini aktif etmek istersen:
👉 [GOOGLE-OAUTH-SETUP.md](GOOGLE-OAUTH-SETUP.md) dosyasına bak

**Not:** Google olmadan da tüm özellikler çalışır!

---

## 7. Tema Değiştirme

Sağ üstteki butona tıklayarak tema değiştirebilirsin:
- ☀️ **Light Mode:** Mor gradient
- 🌙 **Dark Mode:** Koyu tema
- 🍂 **Autumn Mode:** Sonbahar (krem/kahve tonları)

---

## 8. Mobil Kullanım

Uygulama mobil uyumlu! Telefonundan da kullanabilirsin:
- Responsive tasarım
- Alt navigasyon menüsü
- Dokunmatik uyumlu

---

## 🎯 Başarılı Kurulum Kontrolü

✅ Backend çalışıyor (`http://localhost:5000`)
✅ Frontend çalışıyor (`http://localhost:5173`)
✅ Kayıt olabiliyorum
✅ Giriş yapabiliyorum
✅ Profil doldurabiliyorum
✅ AI tavsiyesi alabiliyorum

**Hepsi tamam mı? Harika! Artık kullanmaya başlayabilirsin! 🚀**

---

## 📚 Ek Kaynaklar

- [README.md](README.md) - Genel bilgiler
- [SETUP.md](SETUP.md) - Detaylı kurulum
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Sorun giderme
- [GOOGLE-OAUTH-SETUP.md](GOOGLE-OAUTH-SETUP.md) - Google OAuth kurulumu
- [DEPLOYMENT.md](DEPLOYMENT.md) - Sunucuya yükleme

---

**İyi kullanımlar! 🎉**
