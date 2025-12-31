import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getTemplateById } from '../../data/templates';
import { useI18n } from '../../i18n/I18nContext';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';
import { PersonalInfo, CV, Education, Experience, Project, Skill, Extras } from '../../types';

type CVWizardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CVWizard'
>;

type RouteParams = {
  templateId: string;
};

export const CVWizardScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const navigation = useNavigation<CVWizardScreenNavigationProp>();
  const route = useRoute();
  const { templateId } = (route.params as RouteParams) || {};

  const template = getTemplateById(templateId || '');

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
  });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [extras, setExtras] = useState<Extras>({});

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleFinish = async () => {
    if (!personalInfo.fullName || !personalInfo.email) {
      Alert.alert(
        t('wizard.validation.title', { defaultValue: 'Validation Error' }),
        t('wizard.validation.required', { defaultValue: 'Please fill in required fields' })
      );
      return;
    }

    if (!templateId) {
      Alert.alert(
        t('wizard.validation.title', { defaultValue: 'Error' }),
        'Template not found'
      );
      return;
    }

    // Create CV object
    const cv: CV = {
      id: `cv_${Date.now()}`,
      userId: 'temp_user', // TODO: Get from auth context
      templateId: templateId,
      language: 'en', // TODO: Get from i18n context
      personalInfo,
      education,
      experience,
      projects,
      skills,
      extras,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Navigate to Preview
    navigation.navigate('Preview', { cv });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              {t('wizard.personalInfo.fullName')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder={t('wizard.personalInfo.fullName')}
              placeholderTextColor={colors.textSecondary}
              value={personalInfo.fullName}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, fullName: text })}
            />

            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              {t('wizard.personalInfo.email')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder={t('wizard.personalInfo.email')}
              placeholderTextColor={colors.textSecondary}
              value={personalInfo.email}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              {t('wizard.personalInfo.phone')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder={t('wizard.personalInfo.phone')}
              placeholderTextColor={colors.textSecondary}
              value={personalInfo.phone}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, phone: text })}
              keyboardType="phone-pad"
            />

            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              {t('wizard.personalInfo.location')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder={t('wizard.personalInfo.location')}
              placeholderTextColor={colors.textSecondary}
              value={personalInfo.location}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, location: text })}
            />

            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              {t('wizard.personalInfo.title')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder={t('wizard.personalInfo.title')}
              placeholderTextColor={colors.textSecondary}
              value={personalInfo.title}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, title: text })}
            />

            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              {t('wizard.personalInfo.summary')}
            </Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder={t('wizard.personalInfo.summary')}
              placeholderTextColor={colors.textSecondary}
              value={personalInfo.summary}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, summary: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        );
      default:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              {t('wizard.steps.education', { defaultValue: 'Education' })}
            </Text>
            <Text style={[styles.comingSoon, { color: colors.textSecondary }]}>
              {t('wizard.comingSoon', { defaultValue: 'Coming soon...' })}
            </Text>
          </View>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight || colors.primary]}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            {template ? t(template.nameKey) : t('wizard.title', { defaultValue: 'Create CV' })}
          </Text>
          <Text style={styles.headerSubtitle}>
            {t('wizard.step', { step: currentStep, total: totalSteps, defaultValue: `Step ${currentStep} of ${totalSteps}` })}
          </Text>
        </View>
      </LinearGradient>

      {/* Progress Bar */}
      <View style={[styles.progressContainer, { backgroundColor: colors.surface }]}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${(currentStep / totalSteps) * 100}%`,
              backgroundColor: colors.secondary,
            },
          ]}
        />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>

      {/* Footer Buttons */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={[styles.footerButton, styles.backButtonFooter, { borderColor: colors.border }]}
            onPress={handleBack}
          >
            <Text style={[styles.footerButtonText, { color: colors.text }]}>
              {t('common.back', { defaultValue: 'Back' })}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.footerButton,
            styles.nextButton,
            {
              backgroundColor: colors.secondary,
              flex: currentStep === 1 ? 1 : undefined,
            },
          ]}
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.nextButtonText}>
              {currentStep === totalSteps
                ? t('wizard.finish', { defaultValue: 'Finish' })
                : t('common.next', { defaultValue: 'Next' })}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  progressContainer: {
    height: 4,
    width: '100%',
  },
  progressBar: {
    height: '100%',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 4,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 4,
  },
  comingSoon: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    gap: 12,
  },
  footerButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  backButtonFooter: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  nextButton: {
    flex: 1,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

