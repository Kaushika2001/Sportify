// Profile Screen with Dark Mode toggle
// Student Index: 225024

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { clearFavourites } from '../redux/slices/favouritesSlice';
import { storageService } from '../utils/storage';
import { lightTheme, darkTheme } from '../theme';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const favouritesCount = useSelector((state: RootState) => state.favourites.items.length);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleLogout = async () => {
    console.log('Logout button pressed');
    
    try {
      console.log('Logging out...');
      // Clear storage
      await storageService.removeUser();
      console.log('User removed from storage');
      // Dispatch logout action
      dispatch(logout());
      console.log('Logout action dispatched');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const handleClearFavourites = () => {
    Alert.alert(
      'Clear Favourites',
      'Are you sure you want to remove all favourites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            dispatch(clearFavourites());
            await storageService.saveFavourites([]);
          },
        },
      ]
    );
  };

  const handleToggleTheme = async () => {
    dispatch(toggleTheme());
    await storageService.saveTheme(!isDarkMode);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
          <View style={styles.userInfo}>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {user?.fullName || 'User'}
            </Text>
            <Text style={[styles.username, { color: theme.colors.textSecondary }]}>
              @{user?.username || 'username'}
            </Text>
            <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
              {user?.email || 'email@example.com'}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>
          
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>Dark Mode</Text>
            <Switch
              value={Boolean(isDarkMode)}
              onValueChange={handleToggleTheme}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Statistics</Text>
          
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Favourites
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {favouritesCount}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.error }]}
          onPress={handleClearFavourites}
        >
          <Text style={styles.buttonText}>Clear All Favourites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 8,
  },
  index: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingText: {
    fontSize: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 'auto',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
