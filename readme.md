# TECH-3620 Fall 2025 - Mobile Journaling Application

A full-stack mobile journaling application featuring a React Native frontend and Node.js backend. This project provides users with a secure, feature-rich platform for digital journaling, mindfulness practices, and personal reflection.

## 🌟 Project Overview

This application combines modern mobile development with robust backend services to create a seamless journaling experience. Users can create accounts, write journal entries, explore affirmations, and enjoy a beautifully themed interface across iOS, Android, and web platforms.

### Key Features

- 📱 **Cross-Platform Mobile App** - Built with Expo and React Native
- 🔐 **Secure Authentication** - JWT-based user registration and login
- 📝 **Journal Management** - Create, read, update, and delete personal entries
- 🌙 **Dark/Light Themes** - Customizable UI themes for user preference
- 🧘 **Affirmation Gallery** - Categorized positive affirmations with beautiful imagery
- 📧 **Password Reset** - Email-based password recovery system
- 🎵 **Audio Integration** - Meditation audio support
- 🗄️ **Local-First Architecture** - SQLite database for fast, reliable data storage

## 🏗️ Project Structure

```
TECH-3620-FALL-2025/
├── backend/                     # Node.js API server
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── db/                 # Database schema and helpers
│   │   ├── middleware/         # Authentication and CORS
│   │   └── constants/          # HTTP status codes
│   ├── .env                    # Environment variables
│   └── package.json
├── mobile/                      # React Native mobile app
│   ├── app/                    # Expo Router screens
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── store/              # Zustand state management
│   │   ├── constants/          # App data and configurations
│   │   └── utils/              # Theme and utility functions
│   ├── assets/                 # Images and audio files
│   └── package.json
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone <repository-url>
cd TECH-3620-FALL-2025
```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   JWT_SECRET=your-super-secret-jwt-key
   RESEND_KEY=your-resend-api-key
   PORT=3000
   ```

4. **Initialize database**
   ```bash
   npm run db:setup
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```

### Mobile App Setup

1. **Navigate to mobile directory**
   ```bash
   cd ../mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   ```

## 📱 Mobile Application

**Tech Stack:**
- Expo SDK 53
- React Native with Expo Router
- React Native Paper (Material Design 3)
- Zustand for state management
- Expo Audio for meditation features

**Features:**
- User authentication and registration
- Journal entry creation and management
- Affirmation galleries with categorized content
- Dark/light theme switching
- Audio meditation integration
- Cross-platform compatibility (iOS, Android, Web)

[📱 Mobile Documentation](./mobile/README.md)

## ⚙️ Backend API

**Tech Stack:**
- Node.js with Hono framework
- TypeScript
- SQLite with better-sqlite3
- JWT authentication
- Bcrypt password hashing
- Resend email service

**API Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/request-password` - Password reset request
- `GET /journals` - Fetch user journals
- `POST /journals` - Create journal entry
- `PUT /journals/:id` - Update journal entry
- `DELETE /journals/:id` - Delete journal entry

[⚙️ Backend Documentation](./backend/README.md)

## 🔐 Security Features

- **Password Hashing**: Bcrypt with salt for secure password storage
- **JWT Authentication**: Stateless authentication with token expiration
- **Input Validation**: Request validation on all endpoints
- **CORS Protection**: Configured for secure cross-origin requests
- **SQL Injection Prevention**: Parameterized database queries

## 🧪 Development

### Running Both Services

You can run both the backend and mobile app simultaneously:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Mobile
cd mobile && npm start
```

### Testing

```bash
# Backend tests
cd backend && npm test

# Mobile app testing
cd mobile && npm test
```

### Environment Variables

**Backend (.env):**
```env
JWT_SECRET=your-jwt-secret
RESEND_KEY=your-resend-api-key
PORT=3000
```

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- Heroku
- Vercel
- Railway
- DigitalOcean

### Mobile App Deployment
- **iOS**: App Store via Expo Application Services (EAS)
- **Android**: Google Play Store via EAS
- **Web**: Netlify, Vercel, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Assignment Context

This project is part of TECH-3620 Fall 2025, demonstrating:
- Full-stack mobile application development
- Modern JavaScript/TypeScript ecosystem
- RESTful API design
- Mobile-first user experience
- Database design and management
- Authentication and security best practices

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**: Check environment variables and database initialization
2. **Mobile app build errors**: Clear cache with `expo start -c`
3. **Authentication issues**: Verify JWT_SECRET is consistent between backend and mobile
4. **Database errors**: Ensure SQLite file permissions are correct

### Getting Help

- Check individual README files in `/backend/` and `/mobile/` directories
- Review error logs in development console
- Refer to official documentation for Expo and Hono

## 📄 License

This project is part of the TECH-3620 Fall 2025 coursework.

---

**Course**: TECH-3620 Fall 2025  
**Project**: Mobile Journaling Application  
**Technologies**: React Native, Expo, Node.js, Hono, SQLite, TypeScript