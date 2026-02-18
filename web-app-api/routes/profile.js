const express = require("express");
const router = express.Router();

module.exports = (pool, authMiddleware) => {
  // Profil getirme
  router.get("/:user_id", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users_profiles WHERE user_id = $1",
        [req.params.user_id]
      );
      if (result.rows.length === 0) {
        return res.json({ hasProfile: false });
      }
      res.json({ hasProfile: true, profile: result.rows[0] });
    } catch (err) {
      console.error("Get profile error:", err);
      res.status(500).json({ message: "Profil hatası" });
    }
  });

  // Profil kaydetme/güncelleme
  router.post("/", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
      const {
        age,
        city,
        is_student,
        grade,
        university,
        uni_type,
        department,
        is_working,
        sector,
        position,
        interests,
        study_hours,
      } = req.body;

      const existing = await pool.query(
        "SELECT id FROM users_profiles WHERE user_id = $1",
        [userId]
      );

      if (existing.rows.length > 0) {
        await pool.query(
          `UPDATE users_profiles SET 
            age=$1, city=$2, is_student=$3, grade=$4, university=$5, 
            uni_type=$6, department=$7, is_working=$8, sector=$9, 
            position=$10, interests=$11, study_hours=$12, updated_at=NOW() 
          WHERE user_id=$13`,
          [
            age,
            city,
            is_student,
            grade,
            university,
            uni_type,
            department,
            is_working,
            sector,
            position,
            interests,
            study_hours,
            userId,
          ]
        );
      } else {
        await pool.query(
          `INSERT INTO users_profiles 
            (user_id, age, city, is_student, grade, university, uni_type, 
             department, is_working, sector, position, interests, study_hours) 
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
          [
            userId,
            age,
            city,
            is_student,
            grade,
            university,
            uni_type,
            department,
            is_working,
            sector,
            position,
            interests,
            study_hours,
          ]
        );
      }
      res.json({ success: true, message: "Profil kaydedildi" });
    } catch (err) {
      console.error("Save profile error:", err);
      res.status(500).json({ message: "Hata" });
    }
  });

  return router;
};
