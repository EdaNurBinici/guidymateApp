# Timer Arka Plan Resimleri

Bu klasöre timer için kullanılacak arka plan resimlerini koyabilirsiniz.

## 📸 Önerilen Resimler

Aşağıdaki isimlerde resimler ekleyin (veya istediğiniz isimleri kullanıp `App.jsx`'teki `backgroundOptions` dizisini güncelleyin):

1. **forest.jpg** - Orman manzarası (sakin, yeşil)
2. **mountain.jpg** - Dağ manzarası (motivasyonel)
3. **library.jpg** - Kütüphane (çalışma odaklı)
4. **space.jpg** - Uzay (odaklanma için)

## 🎨 Resim Özellikleri

- **Boyut**: 1920x1080 veya daha büyük (Full HD)
- **Format**: JPG veya PNG
- **Dosya Boyutu**: Maksimum 500KB (hızlı yükleme için)
- **Stil**: Sakin, dikkat dağıtmayan renkler

## 🔍 Ücretsiz Resim Kaynakları

- [Unsplash](https://unsplash.com/) - Ücretsiz yüksek kaliteli fotoğraflar
- [Pexels](https://pexels.com/) - Ücretsiz stok fotoğraflar
- [Pixabay](https://pixabay.com/) - Ücretsiz görseller

## 📝 Örnek Arama Terimleri

- "forest nature calm"
- "mountain landscape peaceful"
- "library study books"
- "space stars galaxy"
- "minimalist background"
- "study desk workspace"

## 🚀 Nasıl Eklenir?

1. Resmi indir
2. Bu klasöre kopyala (`frontend/public/timer-backgrounds/`)
3. Dosya adını yukarıdaki önerilen isimlerden biriyle eşleştir
4. Uygulamayı yenile

## ⚙️ Özel Resim Eklemek

Farklı bir resim eklemek istersen:

1. Resmi bu klasöre kopyala (örn: `beach.jpg`)
2. `frontend/src/App.jsx` dosyasını aç
3. `backgroundOptions` dizisine yeni bir obje ekle:

```javascript
{ 
  id: "beach", 
  name: "Sahil", 
  type: "image", 
  value: "/timer-backgrounds/beach.jpg" 
}
```

## 🎯 Mevcut Özellikler

- ✅ 5 hazır gradient renk
- ✅ 4 resim seçeneği (resimler eklendikten sonra)
- ✅ Özel renk seçici (color picker)
- ✅ Gerçek zamanlı önizleme
- ✅ Dark mode uyumlu
- ✅ Mobil uyumlu

## 💡 İpuçları

- Çok parlak veya karmaşık resimler dikkat dağıtabilir
- Sakin, pastel tonlar odaklanmaya yardımcı olur
- Timer'ın üzerindeki yazılar okunabilir olmalı (kontrast önemli)
- Dosya boyutunu küçük tut (sayfa yavaşlamasın)
