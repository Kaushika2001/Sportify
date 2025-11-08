// Theme configuration for Sportify app

export const lightTheme = {
  colors: {
    primary: '#222831',
    primaryVariant: '#393E46',
    secondary: '#DFD0B8',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#222831',
    textSecondary: '#393E46',
    border: '#DFD0B8',
    error: '#B00020',
    success: '#34C759',
    shadow: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fonts: {
    regular: 'Nunito_400Regular',
    semiBold: 'Nunito_600SemiBold',
    bold: 'Nunito_700Bold',
  },
};

export const darkTheme = {
  colors: {
    primary: '#DFD0B8',
    primaryVariant: '#393E46',
    secondary: '#222831',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#DFD0B8',
    border: '#393E46',
    error: '#B00020',
    success: '#32D74B',
    shadow: '#000000',
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  fontSize: lightTheme.fontSize,
  fonts: lightTheme.fonts,
};

export type Theme = typeof lightTheme;
