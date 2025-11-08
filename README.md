# Sportify

A modern, cross-platform mobile application for sports enthusiasts to explore sports, leagues, teams, and players with real-time data.

![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue)
![Expo](https://img.shields.io/badge/Expo-~54.0.22-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔐 **Authentication**
- User registration and login with form validation
- Secure credential storage
- Persistent authentication state
- Login with email or username

### 🏆 **Sports & Leagues**
- Browse 18+ sports categories
- Explore leagues organized by sport
- Expandable sport sections to view associated leagues
- Status badges (Popular, Active, Upcoming)
- High-quality sport images

### 📊 **Detailed Information**
- **Info Tab**: Comprehensive details about sports and leagues
- **Matches Tab**: View upcoming and recent matches with live scores
- **Teams Tab**: Browse teams with badges and information
- **Players Tab**: Explore player profiles with photos

### ⭐ **Favourites Management**
- Mark sports and leagues as favourites
- Persistent favourites storage
- Dedicated favourites screen
- Quick add/remove with heart icon
- Bulk clear option

### 🎨 **Dark Mode**
- Toggle between light and dark themes
- Persistent theme preference
- Smooth theme transitions
- Consistent styling across all screens

### 📱 **Modern UI/UX**
- Clean, card-based design
- Responsive layout for all screen sizes
- Pull-to-refresh functionality
- Loading states and error handling
- Smooth animations and transitions
- Custom fonts (Nunito)

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State Management**: Redux Toolkit
- **Data Persistence**: AsyncStorage
- **API**: TheSportsDB
- **Icons**: Feather Icons
- **HTTP Client**: Axios
- **Fonts**: Nunito

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Expo Go app (for mobile testing)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Kaushika2001/Sportify.git
cd Sportify
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run the app**
   - Scan QR code with Expo Go (Android/iOS)
   - Press `w` for web browser
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## 📁 Project Structure

```
Sportify/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Card.tsx
│   │   └── Loading.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── AuthNavigator.tsx
│   │   ├── BottomTabNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── redux/              # State management
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── sportsSlice.ts
│   │   │   ├── favouritesSlice.ts
│   │   │   └── themeSlice.ts
│   │   └── store.ts
│   ├── screens/            # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DetailsScreen.tsx
│   │   ├── FavouritesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/           # API services
│   │   └── sportsAPI.ts
│   ├── theme/              # Theme configuration
│   │   └── index.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── utils/              # Utility functions
│       ├── storage.ts
│       └── validation.ts
├── assets/                 # Images and assets
├── App.tsx
├── index.ts
└── package.json
```

## 🎯 Usage

### Getting Started

1. **Register**: Create an account with your details
2. **Login**: Sign in using email or username
3. **Browse**: Explore sports and leagues
4. **Favourites**: Save your favourite sports/leagues
5. **Details**: View matches, teams, and players
6. **Profile**: Manage settings and toggle dark mode

### Navigation

- **Home**: Browse sports and leagues
- **Favourites**: Quick access to saved items
- **Profile**: Account settings and preferences

## 🎨 Color Scheme

**Light Mode**
- Primary: `#222831` (Dark Charcoal)
- Secondary: `#DFD0B8` (Warm Beige)
- Background: `#FFFFFF` (White)

**Dark Mode**
- Primary: `#DFD0B8` (Warm Beige)
- Secondary: `#222831` (Dark Charcoal)
- Background: `#1A1A1A` (Dark Gray)

**Status Colors**
- Popular: `#2196F3` (Blue)
- Active: `#4CAF50` (Green)
- Upcoming: `#FF9800` (Orange)

## 🔌 API Integration

Using [TheSportsDB API](https://www.thesportsdb.com/)

**Endpoints:**
- `GET /all_sports.php` - Fetch all sports
- `GET /all_leagues.php` - Fetch all leagues
- `GET /eventsnext.php?id={id}` - Get upcoming matches
- `GET /eventslast.php?id={id}` - Get recent matches
- `GET /lookup_all_players.php?id={id}` - Get team players
- `GET /searchplayers.php?p={name}` - Search players

## 📝 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run in browser
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [TheSportsDB](https://www.thesportsdb.com/) - Sports data API
- [Expo](https://expo.dev/) - Development platform
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Unsplash](https://unsplash.com/) - Sports imagery

## 📧 Contact

GitHub: [@Kaushika2001](https://github.com/Kaushika2001)

---

⭐ Star this repo if you find it helpful!
