# Mobile Journaling App

A React Native journaling application built with Expo, featuring user authentication, themed UI, and affirmation galleries. This app provides a peaceful and inspiring environment for daily journaling and mindfulness practices.

## Features

- 📱 **Cross-platform** - Runs on iOS, Android, and Web
- 🔐 **User Authentication** - Secure login and registration
- 📝 **Journal Entries** - Create and manage personal journal entries
- 🌙 **Dark/Light Theme** - Toggle between light and dark modes
- 🧘 **Affirmation Gallery** - Categorized positive affirmations with beautiful imagery
- 🎵 **Audio Support** - Meditation audio integration
- 📊 **State Management** - Zustand for efficient state handling

## Tech Stack

- **Framework**: Expo SDK 53
- **Router**: Expo Router v5
- **UI Library**: React Native Paper v5
- **State Management**: Zustand v5
- **Audio**: Expo Audio
- **Language**: JavaScript/JSX

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For iOS development:
- Xcode (Mac only)
- iOS Simulator

For Android development:
- Android Studio
- Android SDK

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TECH-3620-FALL-2025/mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## Development Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## Project Structure

```
mobile/
├── app/                          # App screens (Expo Router)
│   ├── _layout.jsx              # Root layout with theme provider
│   ├── index.jsx                # Home screen
│   └── settings.jsx             # Settings screen
├── src/
│   ├── components/              # Reusable components
│   │   ├── ThemedView.jsx       # Theme-aware view wrapper
│   │   └── ThemeToggle.jsx      # Dark/light mode toggle
│   ├── constants/               # App constants and data
│   │   ├── affirmation-gallery.js    # Affirmation content
│   │   ├── affirmation-images.js     # Image imports
│   │   └── meditation-images.js      # Meditation images
│   ├── store/                   # State management
│   │   └── useAppStore.js       # Zustand store
│   └── utils/                   # Utility functions
│       └── theme.js             # Theme configurations
├── assets/                      # Static assets
│   ├── affirmation-images/      # Affirmation gallery images
│   ├── meditation-images/       # Meditation background images
│   └── audio/                   # Audio files
└── package.json
```

## Key Components

### Theme System
The app uses React Native Paper's Material Design 3 theming with custom color schemes:

```javascript
import { lightTheme, darkTheme } from '../src/utils/theme';
```

### State Management
Global app state is managed with Zustand:

```javascript
import { useAppStore } from '../src/store/useAppStore';

const { user, theme, setUser, setTheme } = useAppStore();
```

### Affirmation Gallery
Categorized positive affirmations with beautiful background images:

- **Categories**: Positivity, Reduce Anxiety, Success, Self-Belief, Mental Health, Law of Attraction, Limiting Beliefs
- **Images**: High-quality nature photographs from California, mountains, rivers, etc.

## Backend Integration

This mobile app is designed to work with the backend API located in [`../backend/`](../backend/). The backend provides:

- User authentication (register/login)
- JWT token management
- Journal entry CRUD operations
- Password reset functionality

### API Endpoints
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /journals` - Fetch user journals
- `POST /journals` - Create new journal entry
- `POST /request-password` - Password reset request

## Configuration

### Environment Setup
The app uses Expo's built-in configuration. Key settings in [`app.json`](app.json):

```json
{
  "expo": {
    "name": "mobile",
    "slug": "mobile",
    "version": "1.0.0",
    "plugins": ["expo-router", "expo-audio"]
  }
}
```

### Theme Customization
Modify colors in [`src/utils/theme.js`](src/utils/theme.js) to customize the app's appearance.

## Development Tips

1. **Hot Reloading**: The Expo development server supports hot reloading for faster development
2. **Device Testing**: Use Expo Go app on your device for real-device testing
3. **State Debugging**: Zustand integrates well with React Developer Tools
4. **Asset Management**: Place images in the `assets/` directory and import them in the constants files

## Building for Production

1. **Configure app.json** with production settings
2. **Build for platforms**:
   ```bash
   expo build:android
   expo build:ios
   ```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **Dependency conflicts**: Delete `node_modules` and run `npm install`
3. **iOS simulator not launching**: Ensure Xcode is properly installed
4. **Android build errors**: Check Android SDK configuration

### Getting Help

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper Docs](https://callstack.github.io/react-native-paper/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the TECH-3620 Fall 2025 course.
