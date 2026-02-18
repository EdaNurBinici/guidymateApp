require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const Groq = require("groq-sdk");

// Middleware
let authMiddleware;
try {
  authMiddleware = require("./middleware/auth");
} catch (e) {
  authMiddleware = require("./auth");
}

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Groq AI client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Test endpoint
app.get("/", (req, res) => {
  res.send("Server çalışıyor! ✅");
});

// Routes
app.use("/", require("./routes/auth")(pool));
app.use("/profile", require("./routes/profile")(pool, authMiddleware));
app.use("/get-ai-advice", require("./routes/advice")(pool, authMiddleware, groq));
app.use("/coach", require("./routes/coach")(pool, authMiddleware, groq));
app.use("/roadmap", require("./routes/roadmap")(pool, authMiddleware, groq));
app.use("/notes", require("./routes/notes")(pool, authMiddleware));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Sunucu hatası", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor... 🚀`);
});
