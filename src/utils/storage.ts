// Storage utility using AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@sportify_user',
  FAVOURITES: '@sportify_favourites',
  THEME: '@sportify_theme',
  REGISTERED_USERS: '@sportify_registered_users',
};

export const storageService = {
  // Save user data
  saveUser: async (user: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  // Get user data
  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Remove user data
  removeUser: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },

  // Save favourites
  saveFavourites: async (favourites: any[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites:', error);
    }
  },

  // Get favourites
  getFavourites: async () => {
    try {
      const favourites = await AsyncStorage.getItem(STORAGE_KEYS.FAVOURITES);
      return favourites ? JSON.parse(favourites) : [];
    } catch (error) {
      console.error('Error getting favourites:', error);
      return [];
    }
  },

  // Save theme preference
  saveTheme: async (isDarkMode: boolean) => {
    try {
      // Store as 0 or 1 to avoid string/boolean confusion
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? '1' : '0');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  // Get theme preference
  getTheme: async (): Promise<boolean> => {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      if (theme === null) return false;
      // Convert '1' to true, anything else to false
      return theme === '1';
    } catch (error) {
      console.error('Error getting theme:', error);
      return false;
    }
  },

  // Registered users management
  saveRegisteredUser: async (email: string, password: string, userData: any) => {
    try {
      const users = await storageService.getRegisteredUsers();
      users[email.toLowerCase()] = { password, ...userData };
      await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving registered user:', error);
    }
  },

  getRegisteredUsers: async () => {
    try {
      const users = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return users ? JSON.parse(users) : {};
    } catch (error) {
      console.error('Error getting registered users:', error);
      return {};
    }
  },

  validateUser: async (email: string, password: string) => {
    try {
      const users = await storageService.getRegisteredUsers();
      const user = users[email.toLowerCase()];
      return user && user.password === password ? user : null;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  },
};
