const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

module.exports = (pool) => {
  // Kayıt olma
  router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const checkUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
      if (checkUser.rows.length > 0) {
        return res.status(400).json({ message: "Bu email kayıtlı!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, hashedPassword]
      );
      res.json({ message: "Kayıt başarılı!" });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  // Giriş yapma
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ message: "Email bulunamadı" });
      }
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: "Şifre yanlış" });
      }
      const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        message: "Giriş başarılı!",
        token,
        userId: user.rows[0].id,
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  return router;
};
