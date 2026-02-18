const express = require("express");
const router = express.Router();

module.exports = (pool, authMiddleware, groq) => {
  // Yol haritası oluşturma
  router.post("/generate", authMiddleware, async (req, res) => {
    const userId = req.userId;
    let currentLevel = 1;

    try {
      const profRes = await pool.query(
        "SELECT * FROM users_profiles WHERE user_id = $1",
        [userId]
      );
      const p = profRes.rows[0];

      if (!p) {
        return res.json({
          success: false,
          message: "Lütfen önce 'Profilim' sekmesinden hedefini kaydet!",
        });
      }

      const userGoal = p.interests && p.interests.length > 2 ? p.interests : "Genel Başarı";
      currentLevel = p.current_level || 1;

      if (currentLevel > 5) {
        return res.json({
          success: true,
          finished: true,
          message: "Tebrikler! Hedefine ulaştın.",
        });
      }

      // ========================================
      // 🧠 AKILLI HEDEF TESPİTİ
      // ========================================
      
      // Hedef kategorisini belirle
      let goalCategory = "genel";
      let categoryContext = "";
      
      const goalLower = userGoal.toLowerCase();
      
      // Sınav/Akademik
      if (goalLower.match(/yks|tyt|ayt|kpss|dgs|lgs|ales|ydt|sınav|üniversite|hazırlık|kazanmak|okumak|test|deneme/)) {
        goalCategory = "sınav";
        categoryContext = "Bu bir SINAV HAZIRLIĞI hedefi. Soru çözme, deneme, konu tekrarı gibi akademik görevler ver.";
      }
      // Programlama/Yazılım
      else if (goalLower.match(/yazılım|programlama|kod|developer|frontend|backend|fullstack|react|python|javascript|java|web|mobil|uygulama geliştir|software/)) {
        goalCategory = "yazılım";
        categoryContext = "Bu bir YAZILIM/PROGRAMLAMA hedefi. Kod yazmak, proje geliştirmek, teknoloji öğrenmekle ilgili görevler ver.";
      }
      // Spor/Fitness
      else if (goalLower.match(/spor|fitness|kilo|kas|koşu|antrenman|egzersiz|vücut|sağlık|zayıfla|form|gym|jimnastik/)) {
        goalCategory = "spor";
        categoryContext = "Bu bir SPOR/FİTNESS hedefi. Antrenman, beslenme, fiziksel aktivite ile ilgili görevler ver.";
      }
      // Dil Öğrenme
      else if (goalLower.match(/ingilizce|almanca|fransızca|ispanyolca|dil öğren|yabancı dil|toefl|ielts|kelime|gramer|konuşma/)) {
        goalCategory = "dil";
        categoryContext = "Bu bir DİL ÖĞRENME hedefi. Kelime, gramer, dinleme, konuşma pratiği ile ilgili görevler ver.";
      }
      // Sanat/Müzik
      else if (goalLower.match(/müzik|enstrüman|gitar|piyano|resim|çizim|sanat|fotoğraf|tasarım|grafik|illüstrasyon/)) {
        goalCategory = "sanat";
        categoryContext = "Bu bir SANAT/MÜZİK hedefi. Pratik yapma, eser üretme, teknik geliştirme ile ilgili görevler ver.";
      }
      // İş/Kariyer (genel)
      else if (goalLower.match(/iş|kariyer|terfi|maaş|pozisyon|şirket|girişim|startup|işe gir|cv|özgeçmiş|mülakat/)) {
        goalCategory = "kariyer";
        categoryContext = "Bu bir KARİYER/İŞ hedefi. CV, networking, beceri geliştirme, iş başvurusu ile ilgili görevler ver.";
      }
      // Matematik
      else if (goalLower.match(/matematik|geometri|analiz|integral|türev|limit|sayısal|problem çöz/)) {
        goalCategory = "matematik";
        categoryContext = "Bu bir MATEMATİK hedefi. Problem çözme, konu pekiştirme, formül ezber ile ilgili görevler ver.";
      }
      // İş Kurma/Girişimcilik
      else if (goalLower.match(/girişim|startup|iş kur|şirket kur|ürün geliştir|pazar|müşteri|satış|pazarlama/)) {
        goalCategory = "girişim";
        categoryContext = "Bu bir GİRİŞİMCİLİK hedefi. Ürün geliştirme, pazar araştırması, müşteri bulma ile ilgili görevler ver.";
      }
      // Okuma/Yazma
      else if (goalLower.match(/kitap|okuma|yazar|roman|makale|blog|yazı yaz|edebiyat/)) {
        goalCategory = "okuma-yazma";
        categoryContext = "Bu bir OKUMA/YAZMA hedefi. Kitap okuma, yazı yazma, analiz yapma ile ilgili görevler ver.";
      }
      
      // ========================================
      // 📊 SEVİYE MANTIĞI (Kategoriye Göre)
      // ========================================
      
      let specificPrompt = "";
      let forbiddenWords = "";
      
      if (currentLevel === 1) {
        // Seviye 1: Temel Atma
        if (goalCategory === "sınav") {
          specificPrompt = "Bu aşama: 'TEMEL ATMA'. Konu listesi çıkar, kaynak seç, çalışma programı yap.";
          forbiddenWords = "ASLA 'CV', 'İş başvurusu', 'Staj', 'Mülakat' deme.";
        } else if (goalCategory === "yazılım") {
          specificPrompt = "Bu aşama: 'TEMEL ATMA'. Hangi dili/framework'ü öğreneceğine karar ver, temel syntax öğren, küçük projeler yap.";
          forbiddenWords = "ASLA 'İş başvurusu', 'CV', 'LinkedIn' deme.";
        } else if (goalCategory === "spor") {
          specificPrompt = "Bu aşama: 'TEMEL ATMA'. Hedef belirle (kilo/kas), program oluştur, beslenme planı yap.";
          forbiddenWords = "ASLA 'Yarışma', 'Profesyonel' deme.";
        } else if (goalCategory === "dil") {
          specificPrompt = "Bu aşama: 'TEMEL ATMA'. Temel kelime listesi oluştur, gramer kurallarını öğren, günlük pratik planı yap.";
          forbiddenWords = "ASLA 'Sınav', 'Sertifika' deme.";
        } else if (goalCategory === "sanat") {
          specificPrompt = "Bu aşama: 'TEMEL ATMA'. Temel teknikleri öğren, araç-gereç edin, günlük pratik planı yap.";
          forbiddenWords = "ASLA 'Sergi', 'Satış', 'Profesyonel' deme.";
        } else if (goalCategory === "kariyer") {
          specificPrompt = "Bu aşama: 'TEMEL ATMA'. Hedef pozisyon belirle, eksik becerileri tespit et, öğrenme planı yap.";
          forbiddenWords = "ASLA 'Başvur', 'Mülakat' deme.";
        } else {
          specificPrompt = "Bu aşama: 'TEMEL ATMA'. Hedefini netleştir, kaynak bul, plan yap.";
          forbiddenWords = "";
        }
      } else if (currentLevel === 2) {
        // Seviye 2: Pratik
        if (goalCategory === "sınav") {
          specificPrompt = "Bu aşama: 'PRATİK'. Günlük soru çöz, konu tekrarı yap, zayıf konuları güçlendir.";
          forbiddenWords = "ASLA 'CV', 'İş' deme.";
        } else if (goalCategory === "yazılım") {
          specificPrompt = "Bu aşama: 'PRATİK'. Her gün kod yaz, küçük projeler bitir, GitHub'a yükle.";
          forbiddenWords = "ASLA 'İş başvurusu', 'Mülakat' deme.";
        } else if (goalCategory === "spor") {
          specificPrompt = "Bu aşama: 'PRATİK'. Düzenli antrenman yap, beslenmeye dikkat et, ilerlemeyi ölç.";
          forbiddenWords = "ASLA 'Yarışma' deme.";
        } else if (goalCategory === "dil") {
          specificPrompt = "Bu aşama: 'PRATİK'. Her gün kelime öğren, dinleme/okuma yap, basit cümleler kur.";
          forbiddenWords = "ASLA 'Sınav', 'Sertifika' deme.";
        } else if (goalCategory === "sanat") {
          specificPrompt = "Bu aşama: 'PRATİK'. Her gün pratik yap, farklı teknikler dene, eser üret.";
          forbiddenWords = "ASLA 'Sergi', 'Satış' deme.";
        } else {
          specificPrompt = "Bu aşama: 'PRATİK'. Düzenli çalış, pratik yap, ilerlemeyi takip et.";
          forbiddenWords = "";
        }
      } else if (currentLevel === 3) {
        // Seviye 3: Zorlanma/Proje
        if (goalCategory === "sınav") {
          specificPrompt = "Bu aşama: 'ZORLANMA'. Branş denemeleri çöz, zor sorulara odaklan, hız çalış.";
          forbiddenWords = "";
        } else if (goalCategory === "yazılım") {
          specificPrompt = "Bu aşama: 'PROJE'. Orta-büyük bir proje bitir, API entegrasyonu yap, veritabanı kullan.";
          forbiddenWords = "ASLA 'Temel öğren' deme.";
        } else if (goalCategory === "spor") {
          specificPrompt = "Bu aşama: 'ZORLANMA'. Ağırlık/tempo artır, yeni egzersizler ekle, sınırlarını zorla.";
          forbiddenWords = "";
        } else if (goalCategory === "dil") {
          specificPrompt = "Bu aşama: 'ZORLANMA'. Uzun metinler oku, film izle, konuşma pratiği yap.";
          forbiddenWords = "";
        } else if (goalCategory === "sanat") {
          specificPrompt = "Bu aşama: 'PROJE'. Büyük bir eser üret, farklı stiller dene, portfolyo oluştur.";
          forbiddenWords = "";
        } else if (goalCategory === "kariyer") {
          specificPrompt = "Bu aşama: 'PROJE'. Somut projeler bitir, becerilerini kanıtla, portfolyo oluştur.";
          forbiddenWords = "";
        } else {
          specificPrompt = "Bu aşama: 'ZORLANMA'. Kendini zorla, büyük hedefler koy, proje bitir.";
          forbiddenWords = "";
        }
      } else if (currentLevel === 4) {
        // Seviye 4: Portfolyo/Deneme
        if (goalCategory === "sınav") {
          specificPrompt = "Bu aşama: 'SINAV PROVASI'. Genel denemeler çöz, sınav stratejisi geliştir, zaman yönetimi yap.";
          forbiddenWords = "";
        } else if (goalCategory === "yazılım") {
          specificPrompt = "Bu aşama: 'PORTFOLYO'. GitHub'ı düzenle, CV hazırla, LinkedIn profilini güncelle.";
          forbiddenWords = "";
        } else if (goalCategory === "spor") {
          specificPrompt = "Bu aşama: 'PERFORMANS'. Hedefine yaklaştın, son rötuşlar yap, performansı optimize et.";
          forbiddenWords = "";
        } else if (goalCategory === "dil") {
          specificPrompt = "Bu aşama: 'AKICILIK'. Akıcı konuş, karmaşık metinler yaz, sınav hazırlığı yap.";
          forbiddenWords = "";
        } else if (goalCategory === "sanat") {
          specificPrompt = "Bu aşama: 'PORTFOLYO'. En iyi eserlerini seç, portfolyo hazırla, sosyal medyada paylaş.";
          forbiddenWords = "";
        } else if (goalCategory === "kariyer") {
          specificPrompt = "Bu aşama: 'BAŞVURU'. CV hazırla, LinkedIn'i güncelle, iş başvurusu yap.";
          forbiddenWords = "";
        } else {
          specificPrompt = "Bu aşama: 'PORTFOLYO'. Yaptıklarını göster, CV/portfolyo hazırla, başvuru yap.";
          forbiddenWords = "";
        }
      } else {
        // Seviye 5: Final
        if (goalCategory === "sınav") {
          specificPrompt = "Bu aşama: 'FİNAL'. Son tekrarlar, motivasyon, sınav günü hazırlığı.";
          forbiddenWords = "";
        } else if (goalCategory === "yazılım") {
          specificPrompt = "Bu aşama: 'FİNAL'. Mülakat hazırlığı, algoritma çalış, iş başvurusu yap.";
          forbiddenWords = "";
        } else if (goalCategory === "spor") {
          specificPrompt = "Bu aşama: 'FİNAL'. Hedefine ulaştın, yeni hedef belirle, alışkanlığı sürdür.";
          forbiddenWords = "";
        } else if (goalCategory === "dil") {
          specificPrompt = "Bu aşama: 'FİNAL'. Sınava gir, sertifika al, dili kullanmaya devam et.";
          forbiddenWords = "";
        } else if (goalCategory === "sanat") {
          specificPrompt = "Bu aşama: 'FİNAL'. Sergi aç, satış yap, profesyonel ol.";
          forbiddenWords = "";
        } else {
          specificPrompt = "Bu aşama: 'FİNAL'. Son dokunuşlar, hedefine ulaş, yeni hedef belirle.";
          forbiddenWords = "";
        }
      }

      const messages = [
        {
          role: "system",
          content: `Sen dünyanın en iyi koçusun. 
            
            HEDEF: ${userGoal}
            KATEGORİ: ${goalCategory.toUpperCase()}
            SEVİYE: ${currentLevel}
            
            ${categoryContext}
            
            GÖREV: Bu seviye için 5 adet ÇOK SOMUT, KISA ve NET görev yaz.
            ${specificPrompt}
            ${forbiddenWords ? `YASAKLAR: ${forbiddenWords}` : ''}
            
            ÖNEMLİ: Görevler MUTLAKA hedefin kategorisine uygun olmalı. Örneğin:
            - Spor hedefi varsa → antrenman, beslenme, ölçüm
            - Yazılım hedefi varsa → kod yazma, proje, GitHub
            - Sınav hedefi varsa → soru çözme, konu tekrarı, deneme
            - Dil hedefi varsa → kelime, gramer, konuşma pratiği
            
            ÇIKTI FORMATI: Sadece saf JSON Array ver. Başka hiçbir şey yazma. 
            Örn: ["Günde 50 soru çöz", "X konusunu bitir"]`,
        },
      ];

      const chat = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.3,
      });

      let content = chat.choices[0]?.message?.content || "[]";
      const match = content.match(/\[[\s\S]*?\]/);
      if (match) {
        content = match[0];
      }

      let tasks = [];
      try {
        tasks = JSON.parse(content);
        if (tasks.length > 0 && typeof tasks[0] === "object") {
          tasks = tasks.map((t) => Object.values(t)[0] || "Görev");
        }
      } catch (e) {
        console.log("JSON Parse Hatası:", e);
        tasks = [
          "Hedefine odaklan ve çalış",
          "Eksik konularını belirle",
          "Pratik yap",
          "Kendini test et",
          "Planını güncelle",
        ];
      }

      await pool.query("DELETE FROM roadmap_items WHERE user_id = $1", [userId]);
      for (const task of tasks) {
        if (task && typeof task === "string" && task.trim() !== "") {
          await pool.query("INSERT INTO roadmap_items (user_id, task) VALUES ($1, $2)", [
            userId,
            String(task),
          ]);
        }
      }

      const newRoadmap = await pool.query(
        "SELECT * FROM roadmap_items WHERE user_id = $1 ORDER BY id ASC",
        [userId]
      );
      res.json({
        success: true,
        message: `Seviye ${currentLevel} planı hazır!`,
        roadmap: newRoadmap.rows,
        currentLevel: currentLevel,
      });
    } catch (err) {
      console.error("Roadmap Server Hatası:", err);
      res.json({
        success: false,
        message: "Sunucuda bir hata oluştu, lütfen tekrar dene.",
      });
    }
  });

  // Yol haritasını getirme
  router.get("/", authMiddleware, async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM roadmap_items WHERE user_id = $1 ORDER BY id ASC",
        [req.userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error("Get roadmap error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Görev durumunu güncelleme
  router.put("/:id", authMiddleware, async (req, res) => {
    try {
      await pool.query(
        "UPDATE roadmap_items SET is_completed = $1 WHERE id = $2 AND user_id = $3",
        [req.body.is_completed, req.params.id, req.userId]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("Update task error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Seviye atlama
  router.post("/levelup", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
      const checkTasks = await pool.query(
        "SELECT count(*) FROM roadmap_items WHERE user_id = $1 AND is_completed = false",
        [userId]
      );
      if (parseInt(checkTasks.rows[0].count) > 0) {
        return res.status(400).json({ message: "Önce tüm görevleri bitir!" });
      }

      await pool.query(
        "UPDATE users_profiles SET current_level = COALESCE(current_level, 1) + 1 WHERE user_id = $1",
        [userId]
      );
      await pool.query("DELETE FROM roadmap_items WHERE user_id = $1", [userId]);

      const newLevelRes = await pool.query(
        "SELECT current_level FROM users_profiles WHERE user_id = $1",
        [userId]
      );
      res.json({
        success: true,
        newLevel: newLevelRes.rows[0].current_level,
        message: "Tebrikler! Seviye Atladın!",
      });
    } catch (err) {
      console.error("Level up error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Yol haritasını sıfırlama
  router.post("/reset", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
      await pool.query("UPDATE users_profiles SET current_level = 1 WHERE user_id = $1", [
        userId,
      ]);
      await pool.query("DELETE FROM roadmap_items WHERE user_id = $1", [userId]);
      res.json({ success: true, message: "Sıfırlandı!" });
    } catch (err) {
      console.error("Reset roadmap error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Mevcut seviyeyi getirme
  router.get("/level", authMiddleware, async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT current_level FROM users_profiles WHERE user_id = $1",
        [req.userId]
      );
      res.json({ level: result.rows[0]?.current_level || 1 });
    } catch (err) {
      console.error("Get level error:", err);
      res.status(500).json({ level: 1 });
    }
  });

  return router;
};
