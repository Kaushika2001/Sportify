// Root Navigator
// Student Index: 225024

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { loginSuccess } from '../redux/slices/authSlice';
import { setFavourites } from '../redux/slices/favouritesSlice';
import { setTheme } from '../redux/slices/themeSlice';
import { storageService } from '../utils/storage';
import { lightTheme, darkTheme } from '../theme';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      // Clear any corrupted theme data first
      const rawTheme = await AsyncStorage.getItem('@sportify_theme');
      if (rawTheme && (rawTheme === 'true' || rawTheme === 'false' || rawTheme === '"true"' || rawTheme === '"false"')) {
        console.log('Clearing corrupted theme data:', rawTheme);
        await AsyncStorage.removeItem('@sportify_theme');
      }

      // Load user
      const user = await storageService.getUser();
      if (user) {
        dispatch(loginSuccess(user));
      }

      // Load favourites
      const favourites = await storageService.getFavourites();
      if (favourites.length > 0) {
        dispatch(setFavourites(favourites));
      }

      // Load theme
      const savedTheme = await storageService.getTheme();
      dispatch(setTheme(savedTheme === true));
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={isAuthenticated ? 'authenticated' : 'unauthenticated'}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator} 
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen 
              name="Main" 
              component={BottomTabNavigator} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Details" 
              component={DetailsScreen}
              options={{ title: 'Details' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
