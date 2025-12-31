export const Colors = {
  light: {
    primary: '#050E3C', // Main brand dark blue
    primaryLight: '#002455', // Lighter dark blue
    secondary: '#FF3838', // Accent red
    secondaryDark: '#DC0000', // Darker red
    background: '#FFFFFF', // White background
    surface: '#F8F9FA', // Light gray surface
    card: '#FFFFFF',
    text: '#050E3C', // Dark text
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#DC0000',
    errorLight: '#FF3838',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#002455',
    // ATS Friendly colors
    atsBlue: '#050E3C',
    atsGray: '#6B7280',
    atsLightGray: '#F3F4F6',
  },
  dark: {
    primary: '#FF3838', // Main brand red (for dark mode)
    primaryLight: '#DC0000', // Darker red
    secondary: '#002455', // Accent blue
    secondaryDark: '#050E3C', // Darker blue
    background: '#050E3C', // Dark blue background
    surface: '#002455', // Darker blue surface
    card: '#002455',
    text: '#FFFFFF', // Light text
    textSecondary: '#D1D5DB',
    border: '#1F2937',
    error: '#FF3838',
    errorLight: '#DC0000',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#60A5FA',
    // ATS Friendly colors
    atsBlue: '#60A5FA',
    atsGray: '#9CA3AF',
    atsLightGray: '#1F2937',
  },
};

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;
