import React from 'react';
import { CV } from '../../types';
import { StudentCleanTemplate } from './StudentCleanTemplate';

interface TemplateProps {
  cv: CV;
}

export const CreativeMinimalTemplate: React.FC<TemplateProps> = ({ cv }) => {
  return <StudentCleanTemplate cv={cv} />; // Geçici olarak aynı template
};

