import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
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
  const [selectedTemplate, setSelectedTemplate] = useState(CV_TEMPLATES[0].id);

  const handleCreateCV = () => {
    navigation.navigate('CVWizard', { templateId: selectedTemplate });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight || colors.primary]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>
          {i18n.t('welcome.title')}
        </Text>
        <Text style={styles.headerSubtitle}>
          {i18n.t('welcome.subtitle')}
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Template Preview Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            decelerationRate="fast"
            contentContainerStyle={styles.carousel}
          >
            {CV_TEMPLATES.map((template, index) => {
              const isSelected = selectedTemplate === template.id;
              return (
                <TouchableOpacity
                  key={template.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedTemplate(template.id)}
                  style={[
                    styles.templateCard,
                    {
                      backgroundColor: isSelected ? colors.primary + '10' : colors.surface,
                      borderColor: isSelected ? colors.primary : colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
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
                    <Text style={[styles.templateName, { color: colors.text }]}>
                      {i18n.t(template.nameKey)}
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
                          {i18n.t('home.atsTag')}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.secondary }]}
            onPress={handleCreateCV}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>{i18n.t('welcome.createButton')}</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.ctaIcon} />
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
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  scrollContent: {
    paddingVertical: 24,
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
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
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
    flexWrap: 'wrap',
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
  ctaContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  ctaButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ctaIcon: {
    marginLeft: 4,
  },
});
