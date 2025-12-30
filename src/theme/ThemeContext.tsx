import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { Colors, ColorScheme, ThemeColors } from './colors';

interface ThemeContextType {
  colorScheme: ColorScheme;
  selectedScheme: ColorScheme | 'system';
  colors: ThemeColors;
  setColorScheme: (scheme: ColorScheme | 'system') => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme | 'system'>('system');

  const colorScheme: ColorScheme =
    selectedScheme === 'system' 
      ? (deviceColorScheme || 'light') 
      : selectedScheme;

  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  const value: ThemeContextType = {
    colorScheme,
    selectedScheme,
    colors,
    setColorScheme: setSelectedScheme,
    isDark,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
