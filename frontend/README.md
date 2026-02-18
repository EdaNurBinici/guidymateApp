# 🎯 AI-Powered Career Assistant

A full-stack web application that helps users plan their career path with AI-powered personalized recommendations, goal tracking, and productivity tools.

## 🌟 Features

### 🤖 AI Career Coach
- Personalized career advice using AI (Groq API)
- Interactive chat interface for career guidance
- Context-aware recommendations based on user profile

### 📊 Smart Roadmap System
- AI-generated learning paths tailored to your goals
- Progress tracking with visual indicators
- Level-based progression system
- Adaptive task generation based on user progress

### 📝 Note-Taking System
- Create and manage career-related notes
- Search functionality
- Organized note cards with timestamps

### ⏱️ Focus Timer (Pomodoro)
- Customizable work and break intervals
- Multiple background themes (gradients & images)
- Fullscreen mode for distraction-free focus
- Visual and audio notifications

### 👤 User Profile Management
- Comprehensive profile system
- Education and work experience tracking
- Goal setting and interests

### 🎨 Theme System
- Light mode (default)
- Dark mode
- Autumn mode
- Persistent theme selection

### 🔐 Authentication
- Email/password registration and login
- Google OAuth integration
- JWT-based authentication
- Secure password hashing

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **CSS3** - Styling with custom themes
- **React Markdown** - Markdown rendering
- **Google OAuth** - Social authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Groq SDK** - AI integration
- **bcrypt** - Password hashing

### Deployment
- **Frontend**: Custom hosting
- **Backend**: Render.com
- **Database**: Render PostgreSQL

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Backend Setup

```bash
cd web-app-api
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_client_id

# Run database migrations
psql -d your_database < database/schema.sql

# Start server
npm start
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Start development server
npm run dev

# Build for production
npm run build
```

## 🚀 Usage

1. **Register/Login**: Create an account or sign in with Google
2. **Complete Profile**: Fill in your education, work experience, and career goals
3. **Get AI Advice**: Receive personalized career recommendations
4. **Chat with AI Coach**: Ask questions and get guidance
5. **Follow Roadmap**: Complete tasks to progress through levels
6. **Take Notes**: Document your learning journey
7. **Use Focus Timer**: Stay productive with Pomodoro technique

## 📱 Responsive Design

- Fully responsive layout
- Mobile-optimized interface
- Touch-friendly controls
- Bottom navigation for mobile devices

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Secure HTTP-only cookies
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🎨 UI/UX Highlights

- Clean, modern interface
- Smooth animations and transitions
- Intuitive navigation
- Visual feedback for user actions
- Accessible design patterns
- Multiple theme options

## 📊 Database Schema

- **users**: User accounts and authentication
- **users_profiles**: Detailed user profiles
- **ai_advices**: AI-generated career advice history
- **coach_sessions**: Chat conversation sessions
- **coach_messages**: Individual chat messages
- **roadmap_items**: User's learning tasks
- **notes**: User's personal notes

## 🌐 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /auth/google` - Google OAuth

### Profile
- `GET /profile/:user_id` - Get user profile
- `POST /profile` - Create/update profile

### AI Features
- `POST /get-ai-advice` - Get AI career advice
- `POST /coach/start` - Start AI chat session
- `POST /coach/reply` - Send message to AI coach

### Roadmap
- `GET /roadmap` - Get user's roadmap
- `POST /roadmap/generate` - Generate new roadmap
- `POST /roadmap/levelup` - Progress to next level

### Notes
- `GET /notes` - Get all notes
- `POST /notes` - Create new note
- `DELETE /notes/:id` - Delete note

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

Private project - All rights reserved

## 👨‍💻 Developer

**Eda Nur Binici**
- GitHub: [@EdaNurBinici](https://github.com/EdaNurBinici)

## 🙏 Acknowledgments

- Groq AI for powerful language models
- Google OAuth for authentication
- Render.com for hosting
- React community for excellent tools

---

**Note**: This project demonstrates full-stack development skills including:
- Frontend development with React
- Backend API development with Node.js
- Database design and management
- AI integration
- Authentication and security
- Responsive design
- State management
- API consumption
- Deployment and DevOps
