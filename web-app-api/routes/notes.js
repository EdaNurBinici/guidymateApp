const express = require("express");
const router = express.Router();

module.exports = (pool, authMiddleware) => {
  // Tüm notları getirme
  router.get("/", authMiddleware, async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
        [req.userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error("Get notes error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Yeni not ekleme
  router.post("/", authMiddleware, async (req, res) => {
    try {
      await pool.query("INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3)", [
        req.userId,
        req.body.title,
        req.body.content,
      ]);
      const result = await pool.query(
        "SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
        [req.userId]
      );
      res.json({ success: true, notes: result.rows });
    } catch (err) {
      console.error("Add note error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  // Not silme
  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      await pool.query("DELETE FROM notes WHERE id = $1 AND user_id = $2", [
        req.params.id,
        req.userId,
      ]);
      res.json({ success: true });
    } catch (err) {
      console.error("Delete note error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  return router;
};
