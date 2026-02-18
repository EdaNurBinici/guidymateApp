# Sorun Giderme Rehberi

## Kayıt/Giriş Çalışmıyor

### 1. Backend Çalışıyor mu Kontrol Et

**Test 1: Backend'in çalıştığını kontrol et**
```bash
# Terminal'de backend klasöründe:
cd backend
npm start
```

Çıktıda şunu görmelisin:
```
Server 5000 portunda çalışıyor... 🚀
```

**Test 2: Browser'da test et**
Tarayıcıda şu adresi aç: `http://localhost:5000`

Şöyle bir JSON görmelisin:
```json
{
  "status": "Server çalışıyor! ✅",
  "endpoints": { ... }
}
```

### 2. Database Bağlantısı Kontrol Et

**Hata:** `connection refused` veya `ECONNREFUSED`

**Çözüm:**
1. PostgreSQL çalışıyor mu kontrol et
2. `backend/.env` dosyasındaki database bilgilerini kontrol et:
   ```env
   DB_USER=postgres
   DB_PASS=your_password
   DB_NAME=ai_career_db
   DB_HOST=localhost
   DB_PORT=5432
   ```
3. Database'in oluşturulduğundan emin ol:
   ```bash
   psql -U postgres
   CREATE DATABASE ai_career_db;
   \q
   ```
4. Tabloları oluştur:
   ```bash
   psql -U postgres -d ai_career_db -f backend/database/schema.sql
   ```

### 3. CORS Hatası

**Hata:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Çözüm:**
Backend'de CORS zaten aktif ama eğer sorun devam ediyorsa:

1. `backend/server.js` dosyasında CORS ayarlarını kontrol et:
   ```javascript
   app.use(cors());
   ```

2. Spesifik origin eklemek istersen:
   ```javascript
   app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
   }));
   ```

### 4. Frontend API URL Hatası

**Hata:** `Failed to fetch` veya `Network error`

**Çözüm:**
1. `frontend/.env` dosyasını kontrol et:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

2. `frontend/src/config.js` dosyasını kontrol et:
   ```javascript
   export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

3. Frontend'i yeniden başlat:
   ```bash
   cd frontend
   npm run dev
   ```

### 5. "Bu email kayıtlı!" Hatası

**Durum:** Kayıt olurken bu hatayı alıyorsan, email zaten kullanılıyor.

**Çözüm:**
- Farklı bir email kullan
- Veya giriş yap (zaten hesabın var)
- Veya database'den kullanıcıyı sil:
  ```sql
  DELETE FROM users WHERE email = 'your@email.com';
  ```

### 6. "Email bulunamadı" veya "Şifre yanlış"

**Çözüm:**
1. Email'i doğru yazdığından emin ol
2. Şifreyi doğru yazdığından emin ol
3. Önce kayıt ol, sonra giriş yap
4. Database'de kullanıcının olduğunu kontrol et:
   ```sql
   SELECT * FROM users WHERE email = 'your@email.com';
   ```

## Google ile Giriş Çalışmıyor

### 1. Google Butonu Görünmüyor

**Çözüm:**
1. `frontend/.env` dosyasında `VITE_GOOGLE_CLIENT_ID` var mı kontrol et
2. Frontend'i yeniden başlat
3. Browser console'da hata var mı kontrol et (F12)

### 2. "Google ile giriş başarısız"

**Çözüm:**
1. `backend/.env` dosyasında `GOOGLE_CLIENT_ID` var mı kontrol et
2. Client ID'nin doğru olduğundan emin ol
3. Google Cloud Console'da:
   - Authorized JavaScript origins: `http://localhost:5173` ekli mi?
   - Authorized redirect URIs: `http://localhost:5173` ekli mi?

### 3. "redirect_uri_mismatch" Hatası

**Çözüm:**
Google Cloud Console > Credentials > OAuth 2.0 Client IDs > Edit:
- Authorized JavaScript origins'e ekle: `http://localhost:5173`
- Authorized redirect URIs'e ekle: `http://localhost:5173`

## Filezilla ile Sunucuya Yüklerken Sorunlar

### 1. Backend Çalışmıyor

**Kontrol Et:**
1. `.env` dosyası yüklendi mi?
2. `node_modules` klasörü var mı? (Yoksa sunucuda `npm install` çalıştır)
3. Port açık mı? (5000 veya başka bir port)
4. PM2 veya başka bir process manager kullanıyor musun?

**Sunucuda çalıştır:**
```bash
cd backend
npm install
npm start
# veya PM2 ile:
pm2 start server.js --name kariyer-backend
```

### 2. Frontend Çalışmıyor

**Kontrol Et:**
1. `dist` klasörünün içindekiler yüklendi mi?
2. `.env` dosyası production URL'leri içeriyor mu?
3. Nginx veya Apache config'i doğru mu?

**Build et ve yükle:**
```bash
cd frontend
npm run build
# dist klasörünün içindekileri Filezilla ile yükle
```

### 3. API Bağlantısı Çalışmıyor

**Çözüm:**
1. `frontend/.env` dosyasında `VITE_API_URL` production backend URL'ini gösteriyor mu?
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

2. Backend CORS ayarlarında production domain var mı?
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
     credentials: true
   }));
   ```

3. HTTPS kullanıyorsan, backend de HTTPS olmalı (mixed content hatası)

## Genel Sorunlar

### 1. "Sunucuya bağlanılamıyor"

**Çözüm:**
1. Backend çalışıyor mu? (`http://localhost:5000` test et)
2. Port doğru mu? (5000)
3. Firewall port'u engelliyor mu?

### 2. "Token geçersiz" veya "Unauthorized"

**Çözüm:**
1. Çıkış yap ve tekrar giriş yap
2. Browser'ın localStorage'ını temizle:
   ```javascript
   // Browser console'da (F12):
   localStorage.clear();
   ```
3. `JWT_SECRET` backend'de set edilmiş mi?

### 3. Database Tabloları Yok

**Çözüm:**
```bash
psql -U postgres -d ai_career_db -f backend/database/schema.sql
```

### 4. Port Zaten Kullanılıyor

**Hata:** `EADDRINUSE: address already in use :::5000`

**Çözüm:**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

## Test Komutları

### Backend Test
```bash
# Backend'i başlat
cd backend
npm start

# Başka bir terminal'de test et:
curl http://localhost:5000
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","password":"123456"}'
```

### Frontend Test
```bash
cd frontend
npm run dev
# Browser'da http://localhost:5173 aç
```

### Database Test
```bash
psql -U postgres -d ai_career_db
SELECT * FROM users;
\q
```

## Yardım Al

Eğer sorun devam ediyorsa:

1. **Backend console'u kontrol et:** Hata mesajları var mı?
2. **Frontend console'u kontrol et:** Browser'da F12 > Console
3. **Network tab'ı kontrol et:** F12 > Network > XHR/Fetch
4. **Database'i kontrol et:** Tablolar oluşturulmuş mu?

---

**İpucu:** Sorunları adım adım çöz. Önce backend'in çalıştığından emin ol, sonra frontend'i test et.
