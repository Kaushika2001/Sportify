// Login Screen

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { loginSuccess } from '../redux/slices/authSlice';
import { validateLoginForm } from '../utils/validation';
import { storageService } from '../utils/storage';
import { lightTheme, darkTheme } from '../theme';

const LoginScreen = ({ navigation }: any) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loginError, setLoginError] = useState('');

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleLogin = async () => {
    // Clear any previous errors
    setErrors({});
    setLoginError('');
    
    // Basic validation
    if (!emailOrUsername.trim()) {
      setLoginError('Please enter your email or username');
      return;
    }
    
    if (!password.trim()) {
      setLoginError('Please enter your password');
      return;
    }

    try {
      // Get all registered users
      const registeredUsers = await storageService.getRegisteredUsers();
      console.log('Registered users:', registeredUsers);
      console.log('Checking login with:', emailOrUsername);
      
      // Find user by email or username
      let foundUser = null;
      const inputLower = emailOrUsername.toLowerCase().trim();
      
      // Check if input matches email
      if (registeredUsers[inputLower]) {
        foundUser = registeredUsers[inputLower];
        console.log('Found by email');
      } else {
        // Search by username
        for (const email in registeredUsers) {
          if (registeredUsers[email].username?.toLowerCase() === inputLower) {
            foundUser = registeredUsers[email];
            console.log('Found by username');
            break;
          }
        }
      }
      
      if (!foundUser) {
        console.log('User does not exist');
        setLoginError('No account found with this email or username. Please register first.');
        return;
      }

      // Validate password
      console.log('User exists, validating password');
      if (foundUser.password !== password) {
        console.log('Password incorrect');
        setLoginError('Incorrect password. Please try again.');
        return;
      }

      console.log('Login successful');
      const user = {
        id: foundUser.id || 'user-' + Date.now(),
        username: foundUser.username,
        email: foundUser.email,
        fullName: foundUser.fullName,
      };

      await storageService.saveUser(user);
      dispatch(loginSuccess(user));
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Failed to login. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Sportify</Text>
        </View>

        {loginError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{loginError}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Email or Username</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="Enter your email or username"
              placeholderTextColor={theme.colors.textSecondary}
              value={emailOrUsername}
              onChangeText={(text) => {
                setEmailOrUsername(text);
                setLoginError('');
              }}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setLoginError('');
              }}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.link, { color: theme.colors.primary }]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  errorMessage: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
