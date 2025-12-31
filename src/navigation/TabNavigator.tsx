import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { MyCVsScreen } from '../screens/MyCVs/MyCVsScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { useTheme } from '../theme';

export type TabParamList = {
  Home: undefined;
  MyCVs: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyCVs') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';

          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyCVs"
        component={MyCVsScreen}
        options={{
          tabBarLabel: t('tabs.myCVs'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('tabs.settings'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
