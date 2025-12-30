import { DefaultTheme, NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { RootNavigator } from '../src/navigation';
import { I18nProvider } from '../src/i18n/I18nContext';
import { AuthProvider } from '../src/services/AuthContext';
import { ThemeProvider, useTheme } from '../src/theme';

function NavigationWrapper() {
  const { colors } = useTheme();

  return (
    <NavigationIndependentTree>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.card,
            text: colors.text,
            border: colors.border,
            notification: colors.error,
          },
        }}
      >
        <RootNavigator />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default function RootLayout() {
  return (
    <I18nProvider>
      <AuthProvider>
        <ThemeProvider>
          <NavigationWrapper />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
