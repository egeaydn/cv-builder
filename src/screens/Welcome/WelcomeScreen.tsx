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
import { CV_TEMPLATES } from '../../data/templates';
import i18n from '../../i18n';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export const WelcomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleCreateCV = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {i18n.t('welcome.title')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {i18n.t('welcome.subtitle')}
          </Text>
        </View>

        {/* Template Preview Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            decelerationRate="fast"
            contentContainerStyle={styles.carousel}
          >
            {CV_TEMPLATES.map((template, index) => (
              <View
                key={template.id}
                style={[
                  styles.templateCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                {/* Placeholder for template preview image */}
                <View
                  style={[
                    styles.templatePreview,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <Text style={[styles.previewText, { color: colors.textSecondary }]}>
                    {template.name}
                  </Text>
                </View>

                {/* Template Info */}
                <View style={styles.templateInfo}>
                  <Text style={[styles.templateName, { color: colors.text }]}>
                    {i18n.t(template.nameKey)}
                  </Text>
                  {template.isATS && (
                    <View
                      style={[
                        styles.atsTag,
                        { backgroundColor: colors.success + '20' },
                      ]}
                    >
                      <Text style={[styles.atsText, { color: colors.success }]}>
                        {i18n.t('home.atsTag')}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            onPress={handleCreateCV}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaText}>{i18n.t('welcome.createButton')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 40,
  },
  carousel: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
  },
  templateCard: {
    width: CARD_WIDTH,
    marginHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    flexWrap: 'wrap',
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
  ctaContainer: {
    paddingHorizontal: 24,
  },
  ctaButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
