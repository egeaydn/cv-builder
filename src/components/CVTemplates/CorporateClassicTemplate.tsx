import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const CorporateClassicTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills } = cv;

  return (
    <View style={styles.container}>
      {/* Top Accent Border */}
      <View style={styles.topBorder} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
        <View style={styles.contactRow}>
          {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.dot}> • </Text>}
          {personalInfo.phone && <Text style={styles.contact}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.dot}> • </Text>}
          {personalInfo.location && <Text style={styles.contact}>{personalInfo.location}</Text>}
        </View>
      </View>

      <View style={styles.content}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <View style={styles.sectionDivider} />
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            <View style={styles.sectionDivider} />
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.sectionDivider} />
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.school}>{edu.school}</Text>
                    {edu.field && <Text style={styles.field}>{edu.field}</Text>}
                  </View>
                  <Text style={styles.dateRange}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KEY PROJECTS</Text>
            <View style={styles.sectionDivider} />
            {projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                {project.description && <Text style={styles.description}>{project.description}</Text>}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.technologies}>Technologies: {project.technologies.join(', ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CORE COMPETENCIES</Text>
            <View style={styles.sectionDivider} />
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}{index < skills.length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    minHeight: 800,
  },
  topBorder: {
    height: 8,
    backgroundColor: '#1E3A5F',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 6,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contact: {
    fontSize: 12,
    color: '#666666',
  },
  dot: {
    fontSize: 12,
    color: '#666666',
  },
  content: {
    padding: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A5F',
    letterSpacing: 1.5,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: '#1E3A5F',
    marginTop: 4,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 13,
    color: '#2B2A2A',
    lineHeight: 19,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 18,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  position: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  company: {
    fontSize: 13,
    color: '#555555',
    marginTop: 2,
  },
  dateRange: {
    fontSize: 11,
    color: '#777777',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 12,
    color: '#2B2A2A',
    lineHeight: 17,
  },
  educationItem: {
    marginBottom: 14,
  },
  degree: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  school: {
    fontSize: 13,
    color: '#555555',
    marginTop: 2,
  },
  field: {
    fontSize: 12,
    color: '#777777',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 14,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  technologies: {
    fontSize: 11,
    color: '#777777',
    marginTop: 4,
    fontStyle: 'italic',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    fontSize: 12,
    color: '#2B2A2A',
  },
});

