import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { signOut } from '../../services/auth';
import { useAuth } from '../../services/AuthContext';
import { useI18n } from '../../i18n/I18nContext';
import { ActionSheet } from '../../components/ActionSheet';
import { Modal } from '../../components/Modal';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

interface SettingItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  onPress,
  rightComponent,
  showArrow = true,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingItemContent}>
        <View style={styles.settingItemText}>
          <Text style={[styles.settingItemTitle, { color: colors.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingItemSubtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightComponent && <View style={styles.settingItemRight}>{rightComponent}</View>}
      </View>
    </TouchableOpacity>
  );
};

export const SettingsScreen: React.FC = () => {
  const { colors, selectedScheme, setColorScheme, isDark } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const { user, isAuthenticated } = useAuth();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [languageSheetVisible, setLanguageSheetVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<'en' | 'tr' | null>(null);

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || 'User');
      setUserEmail(user.email || 'user@example.com');
    } else {
      setUserName('User');
      setUserEmail('user@example.com');
    }
  }, [user]);

  const handleLanguagePress = () => {
    setLanguageSheetVisible(true);
  };

  const handleLanguageSelect = (newLocale: 'en' | 'tr') => {
    if (locale !== newLocale) {
      setPendingLocale(newLocale);
      setConfirmModalVisible(true);
    }
    setLanguageSheetVisible(false);
  };

  const handleConfirmLanguageChange = () => {
    if (pendingLocale) {
      setLocale(pendingLocale);
      setPendingLocale(null);
      // Navigate to Main instead of Welcome
      navigation.navigate('Main');
    }
    setConfirmModalVisible(false);
  };

  const handleCancelLanguageChange = () => {
    setPendingLocale(null);
    setConfirmModalVisible(false);
  };

  const handleSystemTheme = () => {
    setColorScheme('system');
  };

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await signOut();
      setLogoutModalVisible(false);
    } catch (error) {
      setLogoutModalVisible(false);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Login Prompt Section (if not authenticated) */}
      {!isAuthenticated && (
        <View style={[styles.section, { backgroundColor: colors.primary + '20' }]}>
          <View style={styles.loginPrompt}>
            <Text style={[styles.loginPromptTitle, { color: colors.text }]}>
              {t('settings.loginRequired')}
            </Text>
            <Text style={[styles.loginPromptMessage, { color: colors.textSecondary }]}>
              {t('settings.loginRequiredMessage')}
            </Text>
            <TouchableOpacity
              style={[styles.loginPromptButton, { backgroundColor: colors.primary }]}
              onPress={handleLoginPress}
              activeOpacity={0.8}
            >
              <Text style={styles.loginPromptButtonText}>{t('auth.login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Profile Section (if authenticated) */}
      {isAuthenticated && (
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.profileSection}>
            <View style={[styles.profileAvatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.profileAvatarText}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {userName}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                {userEmail}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Language Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.language')}
        </Text>
        <SettingItem
          title={t('settings.language')}
          subtitle={locale === 'en' ? t('settings.english') : t('settings.turkish')}
          onPress={handleLanguagePress}
          rightComponent={
            <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
          }
        />
      </View>

      {/* Theme Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.theme')}
        </Text>
        <SettingItem
          title={t('settings.lightMode')}
          onPress={() => setColorScheme('light')}
          rightComponent={
            <View
              style={[
                styles.radioButton,
                selectedScheme === 'light' && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
            />
          }
        />
        <SettingItem
          title={t('settings.darkMode')}
          onPress={() => setColorScheme('dark')}
          rightComponent={
            <View
              style={[
                styles.radioButton,
                selectedScheme === 'dark' && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
            />
          }
        />
        <SettingItem
          title={t('settings.system')}
          subtitle="Follow system settings"
          onPress={handleSystemTheme}
          rightComponent={
            <View
              style={[
                styles.radioButton,
                selectedScheme === 'system' && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
            />
          }
        />
      </View>

      {/* Logout Section (if authenticated) */}
      {isAuthenticated && (
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error }]}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>{t('settings.logout')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Language Action Sheet */}
      <ActionSheet
        visible={languageSheetVisible}
        onClose={() => setLanguageSheetVisible(false)}
        title={t('settings.selectLanguage')}
        options={[
          {
            label: t('settings.english'),
            onPress: () => handleLanguageSelect('en'),
          },
          {
            label: t('settings.turkish'),
            onPress: () => handleLanguageSelect('tr'),
          },
        ]}
        cancelLabel={t('common.cancel')}
      />

      {/* Confirm Language Change Modal */}
      <Modal
        visible={confirmModalVisible}
        onClose={handleCancelLanguageChange}
        title={t('settings.confirmLanguageChange')}
        message={t('settings.confirmLanguageChangeMessage')}
        buttons={[
          {
            text: t('common.cancel'),
            onPress: handleCancelLanguageChange,
            style: 'cancel',
          },
          {
            text: t('common.done'),
            onPress: handleConfirmLanguageChange,
            style: 'default',
          },
        ]}
      />

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        title={t('settings.logout')}
        message="Are you sure you want to logout?"
        buttons={[
          {
            text: t('common.cancel'),
            onPress: () => setLogoutModalVisible(false),
            style: 'cancel',
          },
          {
            text: t('settings.logout'),
            onPress: handleConfirmLogout,
            style: 'destructive',
          },
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  settingItem: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  settingItemText: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingItemSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  settingItemRight: {
    marginLeft: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  arrow: {
    fontSize: 24,
    fontWeight: '300',
  },
  logoutButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginPrompt: {
    padding: 20,
    alignItems: 'center',
  },
  loginPromptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginPromptMessage: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginPromptButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginPromptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
