// Storage utility using AsyncStorage
// Student Index: 225024

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@sportify_user',
  FAVOURITES: '@sportify_favourites',
  THEME: '@sportify_theme',
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
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  // Get theme preference
  getTheme: async () => {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      return theme ? JSON.parse(theme) : false;
    } catch (error) {
      console.error('Error getting theme:', error);
      return false;
    }
  },
};
