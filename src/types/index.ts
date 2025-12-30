// Core Types
export interface User {
  uid: string;
  email: string;
  name?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  photoURL?: string;
  title?: string;
  summary?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  technologies?: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface Extras {
  languages?: Language[];
  certificates?: Certificate[];
  links?: Link[];
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  link?: string;
}

export interface Link {
  id: string;
  type: 'LinkedIn' | 'GitHub' | 'Portfolio' | 'Other';
  url: string;
  label?: string;
}

export interface CV {
  id: string;
  userId: string;
  templateId: string;
  language: 'en' | 'tr';
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  extras: Extras;
  createdAt: Date;
  updatedAt: Date;
}

export type CVCategory = 'student' | 'professional' | 'creative' | 'academic';

export interface Template {
  id: string;
  name: string;
  nameKey: string; // i18n anahtarı
  category: CVCategory;
  isATS: boolean;
  previewImage: string;
  description?: string;
}
