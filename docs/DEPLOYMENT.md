# 🚀 Deployment Rehberi

## Docker ile Deployment

### Gereksinimler
- Docker
- Docker Compose

### Adımlar

1. **Environment dosyasını oluştur:**
```bash
cp backend/.env.example backend/.env
# .env dosyasını düzenle
```

2. **Docker Compose ile başlat:**
```bash
docker-compose up -d
```

3. **Logları kontrol et:**
```bash
docker-compose logs -f
```

4. **Durdur:**
```bash
docker-compose down
```

---

## Vercel Deployment (Frontend)

### 1. Vercel CLI Kur
```bash
npm install -g vercel
```

### 2. Deploy Et
```bash
cd frontend
vercel
```

### 3. Environment Variables Ekle
Vercel dashboard'dan:
- `VITE_API_URL` → Backend URL'ini gir

---

## Heroku Deployment (Backend)

### 1. Heroku CLI Kur
```bash
# https://devcenter.heroku.com/articles/heroku-cli
```

### 2. Login
```bash
heroku login
```

### 3. Uygulama Oluştur
```bash
cd backend
heroku create kariyer-asistani-api
```

### 4. PostgreSQL Ekle
```bash
heroku addons:create heroku-postgresql:mini
```

### 5. Environment Variables Ekle
```bash
heroku config:set JWT_SECRET=your_secret
heroku config:set GROQ_API_KEY=your_key
```

### 6. Deploy
```bash
git push heroku main
```

### 7. Database Schema Yükle
```bash
heroku pg:psql < database/schema.sql
```

---

## Railway Deployment (Full Stack)

### 1. Railway Hesabı Oluştur
https://railway.app

### 2. GitHub'a Push
```bash
git push origin main
```

### 3. Railway'de Proje Oluştur
- New Project → Deploy from GitHub
- Repository seç

### 4. PostgreSQL Ekle
- Add Service → Database → PostgreSQL

### 5. Environment Variables Ekle
Backend için:
- `DATABASE_URL` (otomatik)
- `JWT_SECRET`
- `GROQ_API_KEY`

Frontend için:
- `VITE_API_URL` → Backend URL

---

## Production Checklist

- [ ] `.env` dosyaları güvenli
- [ ] CORS ayarları yapıldı
- [ ] Rate limiting aktif
- [ ] HTTPS kullanılıyor
- [ ] Database backup planı var
- [ ] Error logging aktif
- [ ] Health check endpoint'leri çalışıyor
- [ ] Environment variables production'a uygun

---

## Monitoring

### Backend Health Check
```bash
curl http://your-backend-url/
```

### Database Connection
```bash
curl http://your-backend-url/health
```

---

## Troubleshooting

### Docker sorunları
```bash
# Container'ları yeniden başlat
docker-compose restart

# Logları kontrol et
docker-compose logs backend
docker-compose logs postgres

# Temiz başlat
docker-compose down -v
docker-compose up --build
```

### Database bağlantı sorunu
- PostgreSQL container'ının çalıştığını kontrol et
- Environment variables'ları kontrol et
- Network ayarlarını kontrol et
