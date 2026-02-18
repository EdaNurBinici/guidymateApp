# Kariyer Asistanı - Özellikler

## 🎨 Dark Mode (Mor Tema)
- Tam dark mode desteği (#1a1a2e, #16213e arka planlar)
- Mor aksan renkleri (#667eea, #764ba2, #a78bfa)
- Tüm bileşenler için dark mode stilleri
- Mobil ve masaüstü uyumlu
- Sohbet başlıkları okunabilir (#ffffff)
- Progress bar, roadmap, notlar için özel dark mode renkleri

## ⏱️ Timer Arka Plan Özelleştirme (YENİ!)

### Özellikler
- 🎨 **5 Hazır Gradient**: Mor, Mavi, Yeşil, Gün Batımı, Okyanus
- 🖼️ **4 Resim Seçeneği**: Orman, Dağ, Kütüphane, Uzay
- 🌈 **Özel Renk Seçici**: Color picker ile istediğin rengi seç
- 🌙 **Dark Mode Uyumlu**: Tüm arka planlar dark mode'da çalışır
- 📱 **Mobil Uyumlu**: Touch-friendly arayüz
- ⚡ **Gerçek Zamanlı Önizleme**: Anında değişiklik gör

### Nasıl Kullanılır?
1. Timer sekmesine git
2. Sağ üstteki 🎨 butonuna tıkla
3. Gradient, resim veya özel renk seç
4. Panel otomatik kapanır ve arka plan değişir

### Resim Ekleme
Resimleri `frontend/public/timer-backgrounds/` klasörüne koy:
- `forest.jpg` - Orman manzarası
- `mountain.jpg` - Dağ manzarası
- `library.jpg` - Kütüphane
- `space.jpg` - Uzay

**Detaylı bilgi**: `TIMER-BACKGROUNDS.md` dosyasına bak

## 🧠 Akıllı AI Yol Haritası Sistemi

### Hedef Kategorileri
AI artık hedefin türünü otomatik algılıyor ve ona göre görevler üretiyor:

1. **Sınav/Akademik** (YKS, TYT, AYT, KPSS, DGS, LGS, ALES, YDT)
   - Soru çözme, deneme, konu tekrarı odaklı görevler
   
2. **Yazılım/Programlama** (React, Python, JavaScript, Web, Mobil)
   - Kod yazma, proje geliştirme, GitHub odaklı görevler
   
3. **Spor/Fitness** (Kilo, Kas, Koşu, Antrenman)
   - Antrenman, beslenme, ölçüm odaklı görevler
   
4. **Dil Öğrenme** (İngilizce, Almanca, TOEFL, IELTS)
   - Kelime, gramer, konuşma pratiği odaklı görevler
   
5. **Sanat/Müzik** (Gitar, Piyano, Resim, Tasarım)
   - Pratik yapma, eser üretme odaklı görevler
   
6. **Kariyer/İş** (CV, Mülakat, Terfi)
   - Beceri geliştirme, networking, başvuru odaklı görevler
   
7. **Matematik** (Geometri, Analiz, Problem Çözme)
   - Problem çözme, formül, konu pekiştirme odaklı görevler
   
8. **Girişimcilik** (Startup, İş Kurma, Ürün Geliştirme)
   - Pazar araştırması, müşteri bulma odaklı görevler
   
9. **Okuma/Yazma** (Kitap, Blog, Makale)
   - Okuma, yazı yazma, analiz odaklı görevler

### Seviye Bazlı Görevler
Her kategori için 5 seviye:

**Seviye 1 - Temel Atma**
- Hedef belirleme, kaynak seçme, plan yapma
- Örnek (Spor): "Hedef belirle (kilo/kas), program oluştur, beslenme planı yap"
- Örnek (Yazılım): "Hangi dili öğreneceğine karar ver, temel syntax öğren"

**Seviye 2 - Pratik**
- Düzenli çalışma, pratik yapma, ilerleme takibi
- Örnek (Sınav): "Günlük soru çöz, konu tekrarı yap"
- Örnek (Dil): "Her gün kelime öğren, dinleme/okuma yap"

**Seviye 3 - Zorlanma/Proje**
- Kendini zorlama, büyük hedefler, proje bitirme
- Örnek (Yazılım): "Orta-büyük bir proje bitir, API entegrasyonu yap"
- Örnek (Spor): "Ağırlık/tempo artır, sınırlarını zorla"

**Seviye 4 - Portfolyo/Deneme**
- Gösterme, hazırlık, başvuru
- Örnek (Sınav): "Genel denemeler çöz, sınav stratejisi geliştir"
- Örnek (Yazılım): "GitHub'ı düzenle, CV hazırla, LinkedIn güncelle"

**Seviye 5 - Final**
- Son dokunuşlar, hedefine ulaşma
- Örnek (Kariyer): "Mülakat hazırlığı, iş başvurusu yap"
- Örnek (Sanat): "Sergi aç, satış yap, profesyonel ol"

### Yasaklı Kelimeler
Her seviye için kategoriye uygun olmayan kelimeler yasaklanıyor:
- Seviye 1'de "CV", "İş başvurusu", "Mülakat" yasak
- Spor hedefinde "Yarışma", "Profesyonel" erken seviyelerde yasak
- Sınav hedefinde "CV", "LinkedIn" hiç kullanılmıyor

## 🎯 Nasıl Çalışır?

1. Kullanıcı "Profilim" sekmesinde hedefini yazar
2. AI hedefi analiz eder ve kategorisini belirler
3. Seviye 1'den başlayarak kategoriye özel görevler üretir
4. Her seviye tamamlandığında bir sonraki seviyeye geçilir
5. Seviye 5 tamamlandığında tebrik mesajı gösterilir

## 📝 Örnek Senaryolar

**Senaryo 1: Spor Hedefi**
- Hedef: "10 kilo vermek istiyorum"
- Kategori: Spor
- Seviye 1 Görevleri: "Hedef kilo belirle", "Haftalık antrenman programı yap", "Kalori hesapla"
- ❌ Asla: "CV hazırla", "İş başvurusu yap"

**Senaryo 2: Yazılım Hedefi**
- Hedef: "React öğrenmek istiyorum"
- Kategori: Yazılım
- Seviye 1 Görevleri: "React dokümantasyonunu oku", "İlk component'i yaz", "Props ve State öğren"
- ❌ Asla: "Soru çöz", "Deneme yap"

**Senaryo 3: Sınav Hedefi**
- Hedef: "YKS'ye hazırlanıyorum"
- Kategori: Sınav
- Seviye 1 Görevleri: "Konu listesi çıkar", "Kaynak seç", "Çalışma programı yap"
- ❌ Asla: "Kod yaz", "Proje geliştir"

## 🚀 Avantajlar

1. **Kişiselleştirilmiş**: Her hedef türü için özel görevler
2. **Akıllı**: AI hedefi otomatik algılıyor
3. **Gerçekçi**: Seviye bazlı ilerlemeler
4. **Odaklı**: Gereksiz görevler yasaklanıyor
5. **Motivasyonel**: Her seviye tamamlandığında ilerleme hissi

## 🔧 Teknik Detaylar

- Backend: `backend/routes/roadmap.js`
- AI Model: Groq (llama-3.3-70b-versatile)
- Kategori Tespiti: Regex pattern matching
- Seviye Yönetimi: PostgreSQL database
- Görev Üretimi: Dynamic system prompts

## 📱 Kullanıcı Deneyimi

1. Kullanıcı hedefini girer
2. "Plan Oluştur" butonuna basar
3. AI 5 görev üretir
4. Görevleri tamamladıkça işaretler
5. %100 tamamlayınca "Seviye Atla" butonu çıkar
6. Seviye 5'i tamamlayınca tebrik mesajı

## 🎨 Dark Mode Detayları

### Renk Paleti
- **Arka Plan**: #1a1a2e (koyu mor-mavi)
- **İkincil Arka Plan**: #16213e (daha koyu)
- **Aksan 1**: #667eea (mor)
- **Aksan 2**: #764ba2 (koyu mor)
- **Aksan 3**: #a78bfa (açık mor)
- **Metin**: #f9fafb (beyaz)
- **İkincil Metin**: #e5e7eb (açık gri)

### Desteklenen Bileşenler
- ✅ Sidebar
- ✅ Content Card
- ✅ Inputs (text, select, textarea)
- ✅ Buttons
- ✅ Notes (kartlar)
- ✅ Chat (mesajlar, sidebar)
- ✅ Roadmap (görevler, progress bar)
- ✅ Timer
- ✅ Modal
- ✅ Session Items (sohbet başlıkları)
- ✅ AI Mode Buttons
- ✅ Profile Grid
- ✅ Mobil görünüm

## 🔄 Güncellemeler

### Son Değişiklikler
- ✅ Dark mode mor tema uygulandı
- ✅ Sohbet başlıkları okunabilir yapıldı
- ✅ Progress bar dark mode renkleri eklendi
- ✅ Akıllı hedef tespit sistemi eklendi
- ✅ 9 farklı kategori desteği
- ✅ Seviye bazlı dinamik görev üretimi
- ✅ Kategoriye özel yasaklı kelimeler
