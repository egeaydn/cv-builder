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
import { EducationFormModal } from '../../components/EducationFormModal';
import { ExperienceFormModal } from '../../components/ExperienceFormModal';
import { ProjectFormModal } from '../../components/ProjectFormModal';
import { getTemplateById } from '../../data/templates';
import { useI18n } from '../../i18n/I18nContext';
import { RootStackParamList } from '../../navigation';
import { createCV } from '../../services/firestore';
import { useTheme } from '../../theme';
import { CV, Education, Experience, Extras, PersonalInfo, Project, Skill } from '../../types';

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

  // Modal states
  const [educationModalVisible, setEducationModalVisible] = useState(false);
  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | undefined>(undefined);
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>(undefined);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

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

    setLoading(true);

    try {
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

      // Save to Firebase
      await createCV(cv);

      // Show success message
      Alert.alert(
        t('wizard.success.title', { defaultValue: 'Success' }),
        t('wizard.success.message', { defaultValue: 'Your CV has been saved successfully!' }),
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to Preview
              navigation.navigate('Preview', { cv });
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error saving CV:', error);
      Alert.alert(
        t('wizard.error.title', { defaultValue: 'Error' }),
        t('wizard.error.message', { defaultValue: 'Failed to save CV. Please try again.' })
      );
    } finally {
      setLoading(false);
    }
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
      case 2:
        // Education
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text, fontSize: 20, marginBottom: 16 }]}>
              {t('wizard.education.title', { defaultValue: 'Education' })}
            </Text>
            {education.map((edu, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => {
                  setEditingEducation(edu);
                  setEducationModalVisible(true);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{edu.school}</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{edu.degree}</Text>
                  {edu.field && (
                    <Text style={[styles.cardSubtitle, { color: colors.textSecondary, fontSize: 13, marginTop: 2 }]}>
                      {edu.field}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setEducation(education.filter((_, i) => i !== index));
                  }}
                  style={{ padding: 8 }}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.error || '#FF3B30'} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.addButton, { borderColor: colors.primary }]}
              onPress={() => {
                setEditingEducation(undefined);
                setEducationModalVisible(true);
              }}
            >
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                {t('wizard.education.addEducation', { defaultValue: 'Add Education' })}
              </Text>
            </TouchableOpacity>

            <EducationFormModal
              visible={educationModalVisible}
              education={editingEducation}
              onSave={(newEducation) => {
                if (editingEducation) {
                  setEducation(education.map((e) => (e.id === editingEducation.id ? newEducation : e)));
                } else {
                  setEducation([...education, newEducation]);
                }
                setEditingEducation(undefined);
              }}
              onClose={() => {
                setEducationModalVisible(false);
                setEditingEducation(undefined);
              }}
            />
          </View>
        );

      case 3:
        // Experience
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text, fontSize: 20, marginBottom: 16 }]}>
              {t('wizard.experience.title', { defaultValue: 'Experience' })}
            </Text>
            {experience.map((exp, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => {
                  setEditingExperience(exp);
                  setExperienceModalVisible(true);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{exp.position}</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{exp.company}</Text>
                  {exp.location && (
                    <Text style={[styles.cardSubtitle, { color: colors.textSecondary, fontSize: 13, marginTop: 2 }]}>
                      {exp.location}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setExperience(experience.filter((_, i) => i !== index));
                  }}
                  style={{ padding: 8 }}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.error || '#FF3B30'} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.addButton, { borderColor: colors.primary }]}
              onPress={() => {
                setEditingExperience(undefined);
                setExperienceModalVisible(true);
              }}
            >
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                {t('wizard.experience.addExperience', { defaultValue: 'Add Experience' })}
              </Text>
            </TouchableOpacity>

            <ExperienceFormModal
              visible={experienceModalVisible}
              experience={editingExperience}
              onSave={(newExperience) => {
                if (editingExperience) {
                  setExperience(experience.map((e) => (e.id === editingExperience.id ? newExperience : e)));
                } else {
                  setExperience([...experience, newExperience]);
                }
                setEditingExperience(undefined);
              }}
              onClose={() => {
                setExperienceModalVisible(false);
                setEditingExperience(undefined);
              }}
            />
          </View>
        );

      case 4:
        // Projects
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text, fontSize: 20, marginBottom: 16 }]}>
              {t('wizard.projects.title', { defaultValue: 'Projects' })}
            </Text>
            {projects.map((proj, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => {
                  setEditingProject(proj);
                  setProjectModalVisible(true);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{proj.title}</Text>
                  {proj.description && (
                    <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]} numberOfLines={2}>
                      {proj.description}
                    </Text>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <Text style={[styles.cardSubtitle, { color: colors.primary, fontSize: 12, marginTop: 4 }]}>
                      {proj.technologies.join(', ')}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setProjects(projects.filter((_, i) => i !== index));
                  }}
                  style={{ padding: 8 }}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.error || '#FF3B30'} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.addButton, { borderColor: colors.primary }]}
              onPress={() => {
                setEditingProject(undefined);
                setProjectModalVisible(true);
              }}
            >
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                {t('wizard.projects.addProject', { defaultValue: 'Add Project' })}
              </Text>
            </TouchableOpacity>

            <ProjectFormModal
              visible={projectModalVisible}
              project={editingProject}
              onSave={(newProject) => {
                if (editingProject) {
                  setProjects(projects.map((p) => (p.id === editingProject.id ? newProject : p)));
                } else {
                  setProjects([...projects, newProject]);
                }
                setEditingProject(undefined);
              }}
              onClose={() => {
                setProjectModalVisible(false);
                setEditingProject(undefined);
              }}
            />
          </View>
        );

      case 5:
        // Skills
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text, fontSize: 20, marginBottom: 16 }]}>
              {t('wizard.skills.title', { defaultValue: 'Skills' })}
            </Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder={t('wizard.skills.itemsPlaceholder', { defaultValue: 'e.g., JavaScript, Python, React' })}
              placeholderTextColor={colors.textSecondary}
              value={skills.map(s => s.name).join(', ')}
              onChangeText={(text) => {
                const skillNames = text.split(',').map(s => s.trim()).filter(s => s);
                const newSkills: Skill[] = skillNames.map((name, i) => ({
                  id: `skill_${i}`,
                  name,
                }));
                setSkills(newSkills);
              }}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        );

      case 6:
        // Languages
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text, fontSize: 20, marginBottom: 16 }]}>
              {t('wizard.extras.languages', { defaultValue: 'Languages' })}
            </Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder="e.g., English (Fluent), Turkish (Native)"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        );

      case 7:
        // Final Step - Review
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text, fontSize: 20, marginBottom: 16 }]}>
              {t('wizard.review', { defaultValue: 'Review & Finish' })}
            </Text>
            <Text style={[styles.reviewText, { color: colors.textSecondary }]}>
              Review your information and click Finish to create your CV.
            </Text>
            <View style={[styles.reviewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.reviewLabel, { color: colors.textSecondary }]}>Name</Text>
              <Text style={[styles.reviewValue, { color: colors.text }]}>{personalInfo.fullName || 'Not provided'}</Text>
              
              <Text style={[styles.reviewLabel, { color: colors.textSecondary, marginTop: 12 }]}>Email</Text>
              <Text style={[styles.reviewValue, { color: colors.text }]}>{personalInfo.email || 'Not provided'}</Text>
              
              <Text style={[styles.reviewLabel, { color: colors.textSecondary, marginTop: 12 }]}>Education</Text>
              <Text style={[styles.reviewValue, { color: colors.text }]}>{education.length} items</Text>
              
              <Text style={[styles.reviewLabel, { color: colors.textSecondary, marginTop: 12 }]}>Experience</Text>
              <Text style={[styles.reviewValue, { color: colors.text }]}>{experience.length} items</Text>
            </View>
          </View>
        );

      default:
        return null;
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
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 20,
  },
  reviewCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  reviewLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});

