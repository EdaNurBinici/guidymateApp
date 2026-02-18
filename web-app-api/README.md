# 🔧 Career Assistant - Backend API

RESTful API backend for the AI-Powered Career Assistant application.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Groq SDK** - AI integration
- **Google Auth Library** - OAuth authentication
- **bcrypt** - Password hashing

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_client_id
```

## 🗄️ Database Setup

```bash
psql -d your_database < database/schema.sql
```

## 🏃 Running

```bash
# Development
npm start

# Production
NODE_ENV=production npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /auth/google` - Google OAuth login

### Profile
- `GET /profile/:user_id` - Get user profile
- `POST /profile` - Create/update profile (requires auth)

### AI Coach
- `POST /get-ai-advice` - Get AI career advice (requires auth)
- `POST /coach/start` - Start new chat session (requires auth)
- `POST /coach/reply` - Send message to AI (requires auth)
- `GET /coach/sessions` - Get user's chat sessions (requires auth)
- `GET /coach/history/:sessionId` - Get chat history (requires auth)
- `DELETE /coach/sessions/:id` - Delete chat session (requires auth)
- `PUT /coach/sessions/:id` - Rename chat session (requires auth)

### Roadmap
- `GET /roadmap` - Get user's roadmap (requires auth)
- `POST /roadmap/generate` - Generate new roadmap (requires auth)
- `PUT /roadmap/:id` - Update task status (requires auth)
- `POST /roadmap/levelup` - Progress to next level (requires auth)
- `POST /roadmap/reset` - Reset roadmap (requires auth)
- `GET /roadmap/level` - Get current level (requires auth)

### Notes
- `GET /notes` - Get all notes (requires auth)
- `POST /notes` - Create new note (requires auth)
- `DELETE /notes/:id` - Delete note (requires auth)

## 🔒 Authentication

Protected routes require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## 📊 Database Schema

See `database/schema.sql` for complete schema.

## 🚀 Deployment

Deployed on Render.com with PostgreSQL database.

## 👨‍💻 Developer

**Eda Nur Binici**
- GitHub: [@EdaNurBinici](https://github.com/EdaNurBinici)
