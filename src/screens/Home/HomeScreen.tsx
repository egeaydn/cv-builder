import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TEMPLATE_CATEGORIES } from '../../data/templates';
import { useI18n } from '../../i18n/I18nContext';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_MARGIN = 10;

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleTemplateSelect = (templateId: string) => {
    navigation.navigate('CVWizard', { templateId });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight || colors.primary]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>
          {t('home.title', { defaultValue: 'Choose Your Template' })}
        </Text>
        <Text style={styles.headerSubtitle}>
          {t('home.subtitle', { defaultValue: 'Select a professional CV template' })}
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

      {/* Categories with Horizontal Carousels */}
      {TEMPLATE_CATEGORIES.map((category) => (
        <View key={category.id} style={styles.categorySection}>
          {/* Category Header */}
          <View style={styles.categoryHeader}>
            <Text style={[styles.categoryIcon, { color: colors.text }]}>
              {category.icon}
            </Text>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>
              {t(`home.categories.${category.id}`)}
            </Text>
          </View>

          {/* Horizontal Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
            snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
            decelerationRate="fast"
          >
            {category.templates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleTemplateSelect(template.id)}
                activeOpacity={0.85}
              >
                {/* Template Preview */}
                <View
                  style={[
                    styles.templatePreview,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Image
                    source={template.previewImage}
                    style={styles.previewImage}
                    resizeMode="cover"
                  />
                  <View style={styles.previewOverlay}>
                    <Ionicons name="eye-outline" size={24} color="#FFFFFF" />
                  </View>
                </View>

                {/* Template Info */}
                <View style={styles.templateInfo}>
                  <Text
                    style={[styles.templateName, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {t(template.nameKey)}
                  </Text>
                  {template.isATS && (
                    <View
                      style={[
                        styles.atsTag,
                        { backgroundColor: colors.secondary + '15' },
                      ]}
                    >
                      <Ionicons name="checkmark-circle" size={14} color={colors.secondary} />
                      <Text style={[styles.atsText, { color: colors.secondary }]}>
                        {t('home.atsTag', { defaultValue: 'ATS Friendly' })}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 24,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  carousel: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  templateCard: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    maxHeight: 320,
  },
  templatePreview: {
    height: 220,
    position: 'relative',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  atsTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  atsText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
