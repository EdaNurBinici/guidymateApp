const express = require("express");
const router = express.Router();

module.exports = (pool, authMiddleware, groq) => {
  // AI tavsiyesi alma
  router.post("/", authMiddleware, async (req, res) => {
    try {
      const userProfile = req.body;
      const userId = req.userId;

      // Geçmiş tavsiyeleri al
      const past = await pool.query(
        "SELECT advice FROM ai_advices WHERE user_id = $1 ORDER BY created_at DESC LIMIT 3",
        [userId]
      );
      const pastAdviceText = past.rows.map((r) => r.advice).join("\n");

      const messages = [
        {
          role: "system",
          content:
            "Sen kıdemli bir kariyer koçusun. Asla soru sorma. Doğrudan, maddeler halinde, somut tavsiyeler ver. Türkçe konuş.",
        },
        {
          role: "user",
          content: `Bölüm: ${userProfile.department}. Hedef: ${userProfile.interests}. Bana somut yol haritası ver. Tekrar etme: ${pastAdviceText}`,
        },
      ];

      const chat = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.3,
      });

      const adviceText = chat.choices[0]?.message?.content || "Hedefinden vazgeçme!";

      // Tavsiyeyi kaydet
      await pool.query("INSERT INTO ai_advices (user_id, advice) VALUES ($1, $2)", [
        userId,
        adviceText,
      ]);

      res.json({ advice: adviceText });
    } catch (err) {
      console.error("AI advice error:", err);
      res.json({ advice: "AI şu an meşgul." });
    }
  });

  return router;
};
