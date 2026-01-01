import { Template } from '../types';

export const CV_TEMPLATES: Template[] = [
  // 🎓 Students & Juniors
  {
    id: 'student-clean',
    name: 'Student Clean',
    nameKey: 'templates.studentClean',
    category: 'student',
    isATS: true,
    previewImage: require('../../assets/templates/cv1.png'),
    description: 'Clean and professional template for students and entry-level positions',
  },
  {
    id: 'junior-tech',
    name: 'Junior Tech',
    nameKey: 'templates.juniorTech',
    category: 'student',
    isATS: true,
    previewImage: require('../../assets/templates/cv2.png'),
    description: 'Tech-focused template for junior developers and IT professionals',
  },
  
  // 💼 Professionals
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    nameKey: 'templates.modernProfessional',
    category: 'professional',
    isATS: true,
    previewImage: require('../../assets/templates/cv3.png'),
    description: 'Modern and sleek design for experienced professionals',
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    nameKey: 'templates.corporateClassic',
    category: 'professional',
    isATS: true,
    previewImage: require('../../assets/templates/cv4.png'),
    description: 'Traditional corporate style for formal industries',
  },
  
  // 🎨 Creative
  {
    id: 'creative-minimal',
    name: 'Creative Minimal',
    nameKey: 'templates.creativeMinimal',
    category: 'creative',
    isATS: false,
    previewImage: require('../../assets/templates/cv5.png'),
    description: 'Minimalist design for creative professionals',
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    nameKey: 'templates.creativeBold',
    category: 'creative',
    isATS: false,
    previewImage: require('../../assets/templates/cv6.png'),
    description: 'Bold and eye-catching design for portfolios',
  },
  
  // 🌍 Academic / Global
  {
    id: 'international-simple',
    nameKey: 'templates.internationalSimple',
    name: 'International Simple',
    category: 'academic',
    isATS: true,
    previewImage: require('../../assets/templates/cv7.png'),
    description: 'Simple and universal format for international applications',
  },
  {
    id: 'academic-cv',
    nameKey: 'templates.academicCV',
    name: 'Academic CV',
    category: 'academic',
    isATS: true,
    previewImage: require('../../assets/templates/cv8.png'),
    description: 'Comprehensive format for academic and research positions',
  },
];

export const TEMPLATE_CATEGORIES = [
  {
    id: 'student',
    name: 'Students & Juniors',
    icon: '🎓',
    templates: CV_TEMPLATES.filter(t => t.category === 'student'),
  },
  {
    id: 'professional',
    name: 'Professionals',
    icon: '💼',
    templates: CV_TEMPLATES.filter(t => t.category === 'professional'),
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: '🎨',
    templates: CV_TEMPLATES.filter(t => t.category === 'creative'),
  },
  {
    id: 'academic',
    name: 'Academic',
    icon: '🌍',
    templates: CV_TEMPLATES.filter(t => t.category === 'academic'),
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return CV_TEMPLATES.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return CV_TEMPLATES.filter(template => template.category === category);
};
