import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
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
    // TODO: Navigate to CV Wizard with selected template
    console.log('Selected template:', templateId);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t('home.title')}
        </Text>
      </View>

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
                activeOpacity={0.8}
              >
                {/* Template Preview */}
                <View
                  style={[
                    styles.templatePreview,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <Text
                    style={[styles.previewText, { color: colors.textSecondary }]}
                  >
                    {t(template.nameKey)}
                  </Text>
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
                        { backgroundColor: colors.success + '20' },
                      ]}
                    >
                      <Text style={[styles.atsText, { color: colors.success }]}>
                        {t('home.atsTag')}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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
    maxHeight: 280,
  },
  templatePreview: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 18,
    fontWeight: '600',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  atsText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
