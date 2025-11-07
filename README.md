# Sportify - Sports & Lifestyle Mobile App

**Student Index:** 225024  
**Domain:** Sports & Lifestyle (Last digit 4)

## Overview

Sportify is a cross-platform mobile application built with React Native (Expo) that allows users to browse sports, leagues, and teams. Users can save their favorite items and switch between light and dark themes.

## Features

✅ **User Authentication**

- Login and Registration with form validation
- Persistent authentication state using AsyncStorage
- User profile display

✅ **Navigation**

- Stack Navigator for authentication flow
- Bottom Tab Navigator for main app sections
- Smooth navigation between screens

✅ **Home Screen**

- Browse all sports from TheSportsDB API
- Browse leagues by sport
- Card-based UI with images
- Pull-to-refresh functionality
- Tab switching between Sports and Leagues

✅ **Details Screen**

- Detailed information for each item
- Add/Remove from favourites
- Dynamic content based on item type

✅ **Favourites**

- Mark items as favourites
- Persistent storage with AsyncStorage
- Dedicated favourites screen
- Easy removal of favourites

✅ **State Management**

- Redux Toolkit for global state
- Separate slices for auth, sports, favourites, and theme

✅ **Dark Mode (Bonus Feature)**

- Toggle between light and dark themes
- Theme persistence
- Consistent theming across all screens

✅ **UI/UX**

- Clean and responsive design
- Feather Icons throughout the app
- Consistent color scheme
- Smooth animations and transitions

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** React Navigation (Stack & Bottom Tabs)
- **State Management:** Redux Toolkit
- **Data Persistence:** AsyncStorage
- **API:** TheSportsDB (https://www.thesportsdb.com/api.php)
- **Icons:** Feather Icons (@expo/vector-icons)
- **HTTP Client:** Axios

## Project Structure

```
Sportify/
├── src/
│   ├── components/
│   │   ├── Card.tsx
│   │   └── Loading.tsx
│   ├── navigation/
│   │   ├── AuthNavigator.tsx
│   │   ├── BottomTabNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── sportsSlice.ts
│   │   │   ├── favouritesSlice.ts
│   │   │   └── themeSlice.ts
│   │   └── store.ts
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DetailsScreen.tsx
│   │   ├── FavouritesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/
│   │   └── sportsAPI.ts
│   ├── theme/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── storage.ts
│       └── validation.ts
├── App.tsx
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

### Steps

1. **Clone or extract the project**

   ```bash
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

   or

   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator or `i` for iOS simulator

## Usage

1. **Register/Login**

   - Create a new account or login with existing credentials
   - Form validation ensures proper input

2. **Browse Sports & Leagues**

   - Switch between Sports and Leagues tabs
   - Tap on any item to view details
   - Add items to favourites

3. **View Details**

   - See detailed information about sports, leagues, or teams
   - Toggle favourite status

4. **Manage Favourites**

   - Access favourites from the bottom tab
   - Remove items by tapping the heart icon

5. **Profile & Settings**
   - View user information (Index: 225024)
   - Toggle Dark Mode
   - Clear all favourites
   - Logout

## API Integration

The app uses **TheSportsDB API** (Free tier):

- **All Sports:** `https://www.thesportsdb.com/api/v1/json/3/all_sports.php`
- **All Leagues:** `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Search Teams:** `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t={teamName}`

## Best Practices Implemented

✅ TypeScript for type safety  
✅ Redux Toolkit for state management  
✅ Component reusability (Card, Loading)  
✅ Proper folder structure  
✅ Form validation with custom validators  
✅ Persistent storage for auth, favourites, and theme  
✅ Error handling for API calls  
✅ Responsive design  
✅ Clean and maintainable code  
✅ Consistent coding standards

## Screenshots

Please refer to the `screenshots/` folder for app screenshots showing:

- Login Screen
- Registration Screen
- Home Screen (Sports & Leagues)
- Details Screen
- Favourites Screen
- Profile Screen
- Dark Mode

## Demo Video

A demo video (≤2 minutes) is included showing the complete app flow from registration to browsing and managing favourites.

## Known Issues / Future Enhancements

- Add search functionality
- Implement team details and player information
- Add match schedules and scores
- Offline mode with cached data
- Push notifications for favourite teams

## Author

**Student Index:** 225024  
**Course:** IN3210 Mobile Applications Development  
**Assignment:** Cross-Platform Mobile Development with React Native

## License

This project is created for educational purposes as part of the IN3210 course assignment.
