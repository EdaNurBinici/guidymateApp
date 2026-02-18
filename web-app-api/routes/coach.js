const express = require("express");
const router = express.Router();

const SYSTEM_PROMPT = `
Sen "KariyerAsistanı" adında kıdemli bir mentörsün.
KURALLAR:
1. KESİNLİKLE "Bunu mu demek istediniz?", "Hangi konuda?" gibi karşı sorular sorma. Kullanıcı ne dediyse doğrudan cevap ver.
2. Kullanıcı "Siber güvenlik projesi" derse; "Chatbot kullan" deme. "Python ile Port Tarayıcı yaz", "Keylogger yap", "Wireshark ile paket analizi yap" gibi TEKNİK ve SOMUT proje fikirleri ver.
3. Asla İngilizce kelime kullanma (Experience -> Deneyim, Background -> Geçmiş).
4. Kullanıcı "Soru sorma" dediyse sadece bilgi ver, konuyu kapat.
5. Cevapların kısa paragraflar ve maddeler halinde olsun. Okunabilir olsun.
`;

async function saveMsg(pool, { userId, sessionId, role, content }) {
  await pool.query(
    "INSERT INTO coach_messages (session_id, user_id, role, content) VALUES ($1,$2,$3,$4)",
    [sessionId, userId, role, content]
  );
}

module.exports = (pool, authMiddleware, groq) => {
  // Yeni sohbet başlatma
  router.post("/start", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
      const profRes = await pool.query(
        "SELECT * FROM users_profiles WHERE user_id = $1",
        [userId]
      );
      const p = profRes.rows[0] || {};

      const s = await pool.query(
        "INSERT INTO coach_sessions (user_id, state, title) VALUES ($1, 'active', 'Yeni Sohbet') RETURNING id",
        [userId]
      );
      const sessionId = s.rows[0].id;

      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Kullanıcının HEDEFİ: ${p.interests}. Merhaba de ve doğrudan bir ipucu ver.`,
        },
      ];

      const chat = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.4,
      });

      const msg = chat.choices[0]?.message?.content;
      await saveMsg(pool, { userId, sessionId, role: "assistant", content: msg });

      res.json({ sessionId, message: msg });
    } catch (err) {
      console.error("Coach start error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Sohbete cevap gönderme
  router.post("/reply", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
      const { sessionId, userMessage } = req.body;

      await saveMsg(pool, { userId, sessionId, role: "user", content: userMessage });
      await pool.query("UPDATE coach_sessions SET created_at = NOW() WHERE id = $1", [
        sessionId,
      ]);

      const historyRes = await pool.query(
        "SELECT role, content FROM coach_messages WHERE session_id = $1 ORDER BY id ASC LIMIT 15",
        [sessionId]
      );
      const messages = historyRes.rows.map((m) => ({ role: m.role, content: m.content }));
      messages.unshift({ role: "system", content: SYSTEM_PROMPT });

      const chat = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.3,
      });

      const reply = chat.choices[0]?.message?.content;
      await saveMsg(pool, { userId, sessionId, role: "assistant", content: reply });

      res.json({ message: reply });
    } catch (err) {
      console.error("Coach reply error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Sohbet geçmişini getirme
  router.get("/history/:sessionId", authMiddleware, async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT role, content FROM coach_messages WHERE session_id = $1 ORDER BY id ASC",
        [req.params.sessionId]
      );
      res.json({ messages: result.rows });
    } catch (err) {
      console.error("Coach history error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Tüm sohbetleri listeleme
  router.get("/sessions", authMiddleware, async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, title FROM coach_sessions WHERE user_id = $1 ORDER BY created_at DESC",
        [req.userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error("Coach sessions error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Sohbet silme
  router.delete("/sessions/:id", authMiddleware, async (req, res) => {
    try {
      await pool.query("DELETE FROM coach_messages WHERE session_id = $1", [req.params.id]);
      await pool.query("DELETE FROM coach_sessions WHERE id = $1 AND user_id = $2", [
        req.params.id,
        req.userId,
      ]);
      res.json({ success: true });
    } catch (err) {
      console.error("Delete session error:", err);
      res.status(500).json({ message: "Silinemedi" });
    }
  });

  // Sohbet adını güncelleme
  router.put("/sessions/:id", authMiddleware, async (req, res) => {
    try {
      const { title } = req.body;
      await pool.query(
        "UPDATE coach_sessions SET title = $1 WHERE id = $2 AND user_id = $3",
        [title, req.params.id, req.userId]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("Update session error:", err);
      res.status(500).json({ message: "Güncellenemedi" });
    }
  });

  return router;
};
