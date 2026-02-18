require("dotenv").config();
const { Pool } = require("pg");

// .env dosyasındaki Render adresini alıp bağlanıyoruz
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const tablolar = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    google_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    age VARCHAR(50),
    city VARCHAR(100),
    is_student BOOLEAN,
    grade VARCHAR(50),
    university VARCHAR(255),
    uni_type VARCHAR(50),
    department VARCHAR(255),
    is_working BOOLEAN,
    sector VARCHAR(255),
    position VARCHAR(255),
    interests TEXT,
    study_hours VARCHAR(50),
    current_level INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS roadmap_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    task TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS ai_advices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    advice TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coach_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    state VARCHAR(50),
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coach_messages (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES coach_sessions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    content TEXT
);
`;

async function veritabaniniKur() {
  try {
    console.log("🚀 Almanya'daki Render veritabanına uçuluyor...");
    await pool.query(tablolar);
    console.log("✅ BÜTÜN TABLOLAR KUSURSUZCA KURULDU! ZAFER BİZİM!");
  } catch (err) {
    console.error("❌ Bir hata oluştu:", err);
  } finally {
    pool.end(); // İşimiz bitince bağlantıyı kapatıyoruz
  }
}

veritabaniniKur();