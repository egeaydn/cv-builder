import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { CVWizardScreen } from '../screens/CVWizard/CVWizardScreen';
import { PreviewScreen } from '../screens/Preview/PreviewScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { WelcomeScreen } from '../screens/Welcome/WelcomeScreen';
import { useTheme } from '../theme';
import { TabNavigator } from './TabNavigator';
import { CV } from '../types';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  CVWizard: { templateId: string };
  Preview: { cv: CV };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CVWizard"
        component={CVWizardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Preview"
        component={PreviewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
