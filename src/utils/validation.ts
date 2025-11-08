// Form validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3;
};

export const validateFullName = (fullName: string): boolean => {
  return fullName.trim().length >= 2;
};

export interface ValidationErrors {
  email?: string;
  password?: string;
  username?: string;
  fullName?: string;
  confirmPassword?: string;
}

export const validateLoginForm = (email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateRegisterForm = (
  fullName: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!fullName) {
    errors.fullName = 'Full name is required';
  } else if (!validateFullName(fullName)) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  if (!username) {
    errors.username = 'Username is required';
  } else if (!validateUsername(username)) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
