export const Colors = {
  light: {
    primary: '#5A7ACD', // Main brand blue
    secondary: '#FEB05D', // Accent orange
    background: '#F5F2F2', // Light gray background
    surface: '#FFFFFF', // White surface
    card: '#FFFFFF',
    text: '#2B2A2A', // Dark text
    textSecondary: '#6B6B6B',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#5A7ACD',
    // ATS Friendly colors
    atsBlue: '#2C3E50',
    atsGray: '#7F8C8D',
    atsLightGray: '#ECF0F1',
  },
  dark: {
    primary: '#5A7ACD', // Main brand blue
    secondary: '#FEB05D', // Accent orange
    background: '#2B2A2A', // Dark background
    surface: '#3A3939',
    card: '#3A3939',
    text: '#F5F2F2', // Light text
    textSecondary: '#B0B0B0',
    border: '#4A4A4A',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FF9F0A',
    info: '#5A7ACD',
    // ATS Friendly colors
    atsBlue: '#3498DB',
    atsGray: '#95A5A6',
    atsLightGray: '#34495E',
  },
};

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;
