import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { TemplateRenderer } from '../../components/CVTemplates';
import { useI18n } from '../../i18n/I18nContext';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';
import { CV } from '../../types';

type PreviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Preview'
>;

type RouteParams = {
  cv: CV;
};

const { width } = Dimensions.get('window');
const CV_WIDTH = width - 48; // Padding dahil
const CV_HEIGHT = CV_WIDTH * 1.414; // A4 ratio

export const PreviewScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const navigation = useNavigation<PreviewScreenNavigationProp>();
  const route = useRoute();
  const { cv } = (route.params as RouteParams) || {};

  const [loading, setLoading] = useState(false);

  if (!cv) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          CV data not found
        </Text>
      </View>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Save to Firestore
      Alert.alert(
        t('preview.saveSuccess', { defaultValue: 'Success' }),
        t('preview.saveMessage', { defaultValue: 'CV saved successfully!' })
      );
    } catch (error) {
      Alert.alert(
        t('preview.error', { defaultValue: 'Error' }),
        t('preview.saveError', { defaultValue: 'Failed to save CV' })
      );
    } finally {
      setLoading(false);
    }
  };

  const getTemplateHTML = (cv: CV) => {
    const { personalInfo, education, experience, projects, skills } = cv;
    
    const baseStyles = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: Arial, sans-serif; }
    `;

    // Her template için özel HTML ve CSS
    switch (cv.templateId) {
      case 'junior-tech':
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                ${baseStyles}
                body { background: #1A1A2E; color: #DDDDDD; }
                .header { background: #16213E; padding: 30px; border-left: 6px solid #FEB05D; }
                .name { font-size: 32px; font-weight: bold; color: #FFFFFF; margin-bottom: 4px; }
                .title { font-size: 18px; color: #FEB05D; margin-bottom: 12px; font-weight: 600; }
                .contact { font-size: 13px; color: #AAAAAA; margin-right: 12px; }
                .content { padding: 30px; }
                .section { margin-bottom: 24px; }
                .section-title { font-size: 16px; font-weight: bold; color: #FEB05D; border-bottom: 2px solid #FEB05D; padding-bottom: 6px; margin-bottom: 12px; letter-spacing: 1px; }
                .item { margin-bottom: 16px; }
                .item-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
                .item-title { font-size: 16px; font-weight: 600; color: #FFFFFF; }
                .item-date { font-size: 12px; color: #FEB05D; font-style: italic; }
                .company { font-size: 14px; color: #AAAAAA; margin-bottom: 6px; }
                .description { font-size: 13px; color: #CCCCCC; line-height: 18px; }
                .skill { font-size: 14px; color: #FFFFFF; font-family: monospace; margin-bottom: 6px; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="name">${personalInfo.fullName}</div>
                ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
                <div>
                  ${personalInfo.email ? `<span class="contact">${personalInfo.email}</span>` : ''}
                  ${personalInfo.phone ? `<span class="contact">${personalInfo.phone}</span>` : ''}
                  ${personalInfo.location ? `<span class="contact">${personalInfo.location}</span>` : ''}
                </div>
              </div>
              <div class="content">
                ${personalInfo.summary ? `
                  <div class="section">
                    <div class="section-title">PROFILE</div>
                    <div class="description">${personalInfo.summary}</div>
                  </div>
                ` : ''}
                ${skills && skills.length > 0 ? `
                  <div class="section">
                    <div class="section-title">TECHNICAL SKILLS</div>
                    ${skills.map(s => `<div class="skill">→ ${s.name}</div>`).join('')}
                  </div>
                ` : ''}
                ${experience && experience.length > 0 ? `
                  <div class="section">
                    <div class="section-title">EXPERIENCE</div>
                    ${experience.map(exp => `
                      <div class="item">
                        <div class="item-header">
                          <div class="item-title">${exp.position}</div>
                          <div class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
                        </div>
                        <div class="company">${exp.company}</div>
                        ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                ${education && education.length > 0 ? `
                  <div class="section">
                    <div class="section-title">EDUCATION</div>
                    ${education.map(edu => `
                      <div class="item">
                        <div class="item-header">
                          <div class="item-title">${edu.degree}</div>
                          <div class="item-date">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</div>
                        </div>
                        <div class="company">${edu.school}</div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </body>
          </html>
        `;

      case 'corporate-classic':
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                ${baseStyles}
                body { background: #FFFFFF; }
                .top-border { height: 8px; background: #1E3A5F; }
                .header { text-align: center; padding: 30px 40px; border-bottom: 1px solid #CCCCCC; }
                .name { font-size: 32px; font-weight: bold; color: #1E3A5F; margin-bottom: 6px; }
                .title { font-size: 16px; color: #555555; margin-bottom: 12px; }
                .contact { font-size: 12px; color: #666666; }
                .content { padding: 40px; }
                .section { margin-bottom: 24px; }
                .section-title { font-size: 14px; font-weight: bold; color: #1E3A5F; letter-spacing: 1.5px; border-bottom: 2px solid #1E3A5F; padding-bottom: 4px; margin-bottom: 12px; }
                .item { margin-bottom: 18px; }
                .item-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
                .position { font-size: 14px; font-weight: 600; color: #1E3A5F; }
                .company { font-size: 13px; color: #555555; margin-top: 2px; }
                .date-range { font-size: 11px; color: #777777; font-style: italic; }
                .description { font-size: 12px; color: #2B2A2A; line-height: 17px; }
              </style>
            </head>
            <body>
              <div class="top-border"></div>
              <div class="header">
                <div class="name">${personalInfo.fullName}</div>
                ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
                <div class="contact">
                  ${personalInfo.email || ''} ${personalInfo.phone ? `• ${personalInfo.phone}` : ''} ${personalInfo.location ? `• ${personalInfo.location}` : ''}
                </div>
              </div>
              <div class="content">
                ${personalInfo.summary ? `
                  <div class="section">
                    <div class="section-title">PROFESSIONAL SUMMARY</div>
                    <div class="description">${personalInfo.summary}</div>
                  </div>
                ` : ''}
                ${experience && experience.length > 0 ? `
                  <div class="section">
                    <div class="section-title">PROFESSIONAL EXPERIENCE</div>
                    ${experience.map(exp => `
                      <div class="item">
                        <div class="item-header">
                          <div>
                            <div class="position">${exp.position}</div>
                            <div class="company">${exp.company}</div>
                          </div>
                          <div class="date-range">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
                        </div>
                        ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                ${education && education.length > 0 ? `
                  <div class="section">
                    <div class="section-title">EDUCATION</div>
                    ${education.map(edu => `
                      <div class="item">
                        <div class="item-header">
                          <div>
                            <div class="position">${edu.degree}</div>
                            <div class="company">${edu.school}</div>
                          </div>
                          <div class="date-range">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                ${skills && skills.length > 0 ? `
                  <div class="section">
                    <div class="section-title">CORE COMPETENCIES</div>
                    <div class="description">${skills.map(s => s.name).join(' • ')}</div>
                  </div>
                ` : ''}
              </div>
            </body>
          </html>
        `;

      // Diğer template'ler için de default StudentClean stili kullan
      default:
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                ${baseStyles}
                body { padding: 20px; color: #333; }
                .header { background: #050E3C; color: white; padding: 24px; margin-bottom: 20px; }
                .name { font-size: 28px; font-weight: bold; margin-bottom: 4px; }
                .title { font-size: 18px; color: #88AAFF; margin-bottom: 8px; }
                .contact { font-size: 14px; margin-top: 12px; }
                .section { margin-bottom: 24px; }
                .section-title { font-size: 20px; font-weight: bold; color: #050E3C; margin-bottom: 12px; border-bottom: 2px solid #050E3C; padding-bottom: 4px; }
                .item { margin-bottom: 16px; }
                .item-title { font-size: 16px; font-weight: 600; color: #050E3C; }
                .item-subtitle { font-size: 15px; color: #002455; margin-top: 4px; }
                .item-description { font-size: 14px; color: #555; line-height: 20px; margin-top: 4px; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="name">${personalInfo.fullName}</div>
                ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
                <div class="contact">
                  ${personalInfo.email || ''} ${personalInfo.phone ? ` • ${personalInfo.phone}` : ''} ${personalInfo.location ? ` • ${personalInfo.location}` : ''}
                </div>
              </div>
              ${personalInfo.summary ? `
                <div class="section">
                  <div class="section-title">Summary</div>
                  <div class="item-description">${personalInfo.summary}</div>
                </div>
              ` : ''}
              ${education && education.length > 0 ? `
                <div class="section">
                  <div class="section-title">Education</div>
                  ${education.map(edu => `
                    <div class="item">
                      <div class="item-title">${edu.degree}</div>
                      <div class="item-subtitle">${edu.school}</div>
                      <div class="item-description">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate || ''}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${experience && experience.length > 0 ? `
                <div class="section">
                  <div class="section-title">Experience</div>
                  ${experience.map(exp => `
                    <div class="item">
                      <div class="item-title">${exp.position}</div>
                      <div class="item-subtitle">${exp.company}</div>
                      <div class="item-description">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''}</div>
                      ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${skills && skills.length > 0 ? `
                <div class="section">
                  <div class="section-title">Skills</div>
                  <div class="item-description">${skills.map(s => s.name).join(', ')}</div>
                </div>
              ` : ''}
            </body>
          </html>
        `;
    }
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const html = getTemplateHTML(cv);
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri);
    } catch (error) {
      Alert.alert(
        t('preview.error', { defaultValue: 'Error' }),
        t('preview.pdfError', { defaultValue: 'Failed to generate PDF' })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('preview.title', { defaultValue: 'Preview Your CV' })}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* CV Preview */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.cvContainer, { backgroundColor: '#FFFFFF', shadowColor: '#000' }]}>
          <TemplateRenderer cv={cv} templateId={cv.templateId} />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.footerButton, styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="save-outline" size={20} color="#FFFFFF" />
              <Text style={styles.footerButtonText}>
                {t('preview.save', { defaultValue: 'Save' })}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerButton, styles.downloadButton, { backgroundColor: colors.secondary }]}
          onPress={handleDownloadPDF}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="download-outline" size={20} color="#FFFFFF" />
              <Text style={styles.footerButtonText}>
                {t('preview.download', { defaultValue: 'Download PDF' })}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  cvContainer: {
    width: CV_WIDTH,
    minHeight: CV_HEIGHT,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    gap: 12,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButton: {
    // backgroundColor set dynamically
  },
  downloadButton: {
    // backgroundColor set dynamically
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

