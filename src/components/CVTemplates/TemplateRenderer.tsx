import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';
import { StudentCleanTemplate } from './StudentCleanTemplate';
import { ModernProfessionalTemplate } from './ModernProfessionalTemplate';
import { CorporateClassicTemplate } from './CorporateClassicTemplate';
import { JuniorTechTemplate } from './JuniorTechTemplate';
import { CreativeMinimalTemplate } from './CreativeMinimalTemplate';
import { CreativeBoldTemplate } from './CreativeBoldTemplate';
import { InternationalSimpleTemplate } from './InternationalSimpleTemplate';
import { AcademicCVTemplate } from './AcademicCVTemplate';

interface TemplateRendererProps {
  cv: CV;
  templateId: string;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ cv, templateId }) => {
  // Template'e göre doğru component'i render et
  switch (templateId) {
    case 'student-clean':
      return <StudentCleanTemplate cv={cv} />;
    case 'junior-tech':
      return <JuniorTechTemplate cv={cv} />;
    case 'modern-professional':
      return <ModernProfessionalTemplate cv={cv} />;
    case 'corporate-classic':
      return <CorporateClassicTemplate cv={cv} />;
    case 'creative-minimal':
      return <CreativeMinimalTemplate cv={cv} />;
    case 'creative-bold':
      return <CreativeBoldTemplate cv={cv} />;
    case 'international-simple':
      return <InternationalSimpleTemplate cv={cv} />;
    case 'academic-cv':
      return <AcademicCVTemplate cv={cv} />;
    default:
      return (
        <View style={styles.defaultContainer}>
          <Text style={styles.defaultText}>Template not found</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultText: {
    fontSize: 16,
    color: '#666',
  },
});

