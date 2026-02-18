# 🔧 Kurulum Rehberi

Bu rehber, Kariyer Asistanı projesini sıfırdan kurmak için adım adım talimatlar içerir.

## 📋 Ön Gereksinimler

Sisteminizde aşağıdaki yazılımların kurulu olması gerekir:

- **Node.js** v16 veya üzeri ([İndir](https://nodejs.org/))
- **PostgreSQL** v12 veya üzeri ([İndir](https://www.postgresql.org/download/))
- **npm** veya **yarn** (Node.js ile birlikte gelir)
- **Git** (opsiyonel, projeyi klonlamak için)

## 🗄️ Veritabanı Kurulumu

### 1. PostgreSQL'i Başlatın

Windows'ta PostgreSQL servisinin çalıştığından emin olun:
- Services uygulamasını açın (Win + R → `services.msc`)
- "postgresql" servisini bulun ve başlatın

### 2. Veritabanı Oluşturun

PostgreSQL komut satırını (psql) veya pgAdmin'i açın:

```sql
-- Yeni veritabanı oluştur
CREATE DATABASE ai_career_db;

-- Veritabanına bağlan
\c ai_career_db
```

### 3. Şemayı Yükleyin

Proje klasöründe terminal açın ve şu komutu çalıştırın:

```bash
psql -U postgres -d ai_career_db -f backend/database/schema.sql
```

Veya pgAdmin kullanıyorsanız:
1. `ai_career_db` veritabanını seçin
2. Query Tool'u açın
3. `backend/database/schema.sql` dosyasının içeriğini yapıştırın
4. Execute edin

### 4. Veritabanı Bağlantısını Test Edin

```bash
psql -U postgres -d ai_career_db -c "SELECT * FROM users;"
```

Boş bir tablo görmelisiniz (hata almamalısınız).

## 🔑 API Anahtarları

### Groq API Anahtarı Alma

1. [Groq Console](https://console.groq.com) adresine gidin
2. Hesap oluşturun (ücretsiz)
3. Dashboard'dan "API Keys" bölümüne gidin
4. "Create API Key" butonuna tıklayın
5. Anahtarı kopyalayın (bir daha gösterilmeyecek!)

## ⚙️ Backend Kurulumu

### 1. Backend Klasörüne Gidin

```bash
cd backend
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Dosyasını Oluşturun

`.env.example` dosyasını kopyalayın:

```bash
copy .env.example .env
```

### 4. .env Dosyasını Düzenleyin

`.env` dosyasını bir metin editörü ile açın ve bilgilerinizi girin:

```env
# Veritabanı Bilgileri
DB_USER=postgres
DB_PASS=sizin_postgresql_sifreniz
DB_NAME=ai_career_db
DB_HOST=localhost
DB_PORT=5432

# JWT Secret (güçlü bir şifre oluşturun)
JWT_SECRET=cok_gizli_ve_guclu_bir_anahtar_123456

# Groq API Key
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Önemli Notlar:**
- `DB_PASS`: PostgreSQL kurulumu sırasında belirlediğiniz şifre
- `JWT_SECRET`: Rastgele, güçlü bir string (en az 32 karakter önerilir)
- `GROQ_API_KEY`: Groq Console'dan aldığınız API anahtarı

### 5. Backend'i Test Edin

```bash
npm start
```

Şu mesajı görmelisiniz:
```
Server 5000 portunda çalışıyor... 🚀
```

Tarayıcıda `http://localhost:5000` adresine gidin. "Server çalışıyor! ✅" mesajını görmelisiniz.

## 🎨 Frontend Kurulumu

### 1. Yeni Bir Terminal Açın

Backend çalışırken, yeni bir terminal penceresi açın.

### 2. Frontend Klasörüne Gidin

```bash
cd frontend
```

### 3. Bağımlılıkları Yükleyin

```bash
npm install
```

### 4. Environment Dosyasını Oluşturun

```bash
copy .env.example .env
```

`.env` dosyası zaten doğru ayarlarla gelir:
```env
VITE_API_URL=http://localhost:5000
```

### 5. Frontend'i Başlatın

```bash
npm run dev
```

Şu mesajı görmelisiniz:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

## 🚀 Uygulamayı Kullanma

1. Tarayıcınızda `http://localhost:5173` adresine gidin
2. "Yolculuğa Başla" butonuna tıklayın
3. Yeni bir hesap oluşturun
4. Profil bilgilerinizi doldurun
5. AI özelliklerini kullanmaya başlayın!

## 🔄 Modüler Backend Kullanımı (Opsiyonel)

Yeni modüler backend yapısını kullanmak isterseniz:

```bash
cd backend
npm run start:new
```

Bu, route'ları ayrı dosyalara bölünmüş yeni `server-new.js` dosyasını çalıştırır.

## 🐛 Sorun Giderme

### Backend Başlamıyor

**Hata:** `Error: connect ECONNREFUSED`
- PostgreSQL servisinin çalıştığından emin olun
- `.env` dosyasındaki veritabanı bilgilerini kontrol edin

**Hata:** `JWT_SECRET is not defined`
- `.env` dosyasının `backend` klasöründe olduğundan emin olun
- Dosya adının tam olarak `.env` olduğunu kontrol edin (`.env.txt` değil)

### Frontend API'ye Bağlanamıyor

**Hata:** `Failed to fetch`
- Backend'in çalıştığından emin olun (`http://localhost:5000`)
- `frontend/.env` dosyasında `VITE_API_URL` değerini kontrol edin
- CORS hatası alıyorsanız, backend'de `cors` middleware'inin aktif olduğunu kontrol edin

### Groq API Hatası

**Hata:** `Invalid API key`
- Groq API anahtarınızın doğru kopyalandığından emin olun
- Anahtarın başında/sonunda boşluk olmadığını kontrol edin
- Groq Console'da anahtarın aktif olduğunu doğrulayın

### Veritabanı Şeması Yüklenemiyor

**Hata:** `relation "users" does not exist`
- `schema.sql` dosyasının doğru veritabanına yüklendiğinden emin olun
- Şemayı manuel olarak yüklemeyi deneyin (pgAdmin ile)

## 📝 Geliştirme Notları

### Port Değiştirme

**Backend portu değiştirmek için:**
1. `backend/.env` dosyasına `PORT=3000` ekleyin
2. `frontend/.env` dosyasında `VITE_API_URL=http://localhost:3000` yapın

**Frontend portu değiştirmek için:**
1. `frontend/vite.config.js` dosyasını açın
2. Server ayarlarına port ekleyin:
```js
export default defineConfig({
  server: {
    port: 3001
  }
})
```

### Production Build

**Frontend için:**
```bash
cd frontend
npm run build
```

Build dosyaları `frontend/dist` klasöründe oluşur.

## ✅ Kurulum Tamamlandı!

Artık Kariyer Asistanı uygulamanız çalışıyor! 🎉

Sorularınız için GitHub'da issue açabilirsiniz.
