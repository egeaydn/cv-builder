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

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      // HTML template for PDF
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                color: #333;
              }
              .header {
                border-bottom: 2px solid #050E3C;
                padding-bottom: 16px;
                margin-bottom: 20px;
              }
              .name {
                font-size: 28px;
                font-weight: bold;
                color: #050E3C;
                margin-bottom: 4px;
              }
              .title {
                font-size: 18px;
                color: #002455;
                margin-bottom: 8px;
              }
              .contact {
                font-size: 14px;
                color: #666;
              }
              .section {
                margin-bottom: 24px;
              }
              .section-title {
                font-size: 20px;
                font-weight: bold;
                color: #050E3C;
                margin-bottom: 12px;
                border-bottom: 1px solid #E5E7EB;
                padding-bottom: 4px;
              }
              .item {
                margin-bottom: 16px;
              }
              .item-title {
                font-size: 16px;
                font-weight: 600;
                color: #050E3C;
              }
              .item-subtitle {
                font-size: 15px;
                color: #002455;
                margin-top: 4px;
              }
              .item-description {
                font-size: 14px;
                color: #555;
                line-height: 20px;
                margin-top: 4px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="name">${cv.personalInfo.fullName}</div>
              ${cv.personalInfo.title ? `<div class="title">${cv.personalInfo.title}</div>` : ''}
              <div class="contact">
                ${cv.personalInfo.email || ''}
                ${cv.personalInfo.phone ? ` • ${cv.personalInfo.phone}` : ''}
                ${cv.personalInfo.location ? ` • ${cv.personalInfo.location}` : ''}
              </div>
            </div>
            ${cv.personalInfo.summary ? `
              <div class="section">
                <div class="section-title">Summary</div>
                <div class="item-description">${cv.personalInfo.summary}</div>
              </div>
            ` : ''}
            ${cv.education && cv.education.length > 0 ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${cv.education.map(edu => `
                  <div class="item">
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-subtitle">${edu.school}</div>
                    <div class="item-description">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate || ''}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${cv.experience && cv.experience.length > 0 ? `
              <div class="section">
                <div class="section-title">Experience</div>
                ${cv.experience.map(exp => `
                  <div class="item">
                    <div class="item-title">${exp.position}</div>
                    <div class="item-subtitle">${exp.company}</div>
                    <div class="item-description">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''}</div>
                    ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${cv.skills && cv.skills.length > 0 ? `
              <div class="section">
                <div class="section-title">Skills</div>
                <div class="item-description">${cv.skills.map(s => s.name).join(', ')}</div>
              </div>
            ` : ''}
          </body>
        </html>
      `;

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

