import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const AcademicCVTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills } = cv;

  return (
    <View style={styles.container}>
      {/* Academic Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
      </View>

      {/* Contact Information Bar */}
      <View style={styles.contactBar}>
        {personalInfo.email && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email:</Text>
            <Text style={styles.contactValue}>{personalInfo.email}</Text>
          </View>
        )}
        {personalInfo.phone && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Phone:</Text>
            <Text style={styles.contactValue}>{personalInfo.phone}</Text>
          </View>
        )}
        {personalInfo.location && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Address:</Text>
            <Text style={styles.contactValue}>{personalInfo.location}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {/* Research Interests / Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Interests</Text>
            <Text style={styles.text}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.academicItem}>
                <View style={styles.itemRow}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.dateRange}>{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</Text>
                </View>
                <Text style={styles.institution}>{edu.school}</Text>
                {edu.field && <Text style={styles.detail}>Field: {edu.field}</Text>}
                {edu.gpa && <Text style={styles.detail}>GPA: {edu.gpa}</Text>}
                {edu.description && <Text style={styles.description}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Academic Experience / Teaching */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academic Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.academicItem}>
                <View style={styles.itemRow}>
                  <Text style={styles.position}>{exp.position}</Text>
                  <Text style={styles.dateRange}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                <Text style={styles.institution}>{exp.company}</Text>
                {exp.location && <Text style={styles.detail}>{exp.location}</Text>}
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Research Projects / Publications */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research & Projects</Text>
            {projects.map((project) => (
              <View key={project.id} style={styles.academicItem}>
                <Text style={styles.publicationTitle}>{project.title}</Text>
                {project.description && <Text style={styles.description}>{project.description}</Text>}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.detail}>Methods/Tools: {project.technologies.join(', ')}</Text>
                )}
                {project.link && <Text style={styles.link}>{project.link}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills & Competencies */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            <View style={styles.skillsGrid}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>• {skill.name}</Text>
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
  header: {
    backgroundColor: '#E8E8E8',
    padding: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#4A4A4A',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B2A2A',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    color: '#555555',
    fontStyle: 'italic',
  },
  contactBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 30,
    paddingVertical: 12,
    gap: 20,
  },
  contactItem: {
    flexDirection: 'row',
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4A4A4A',
    marginRight: 6,
  },
  contactValue: {
    fontSize: 11,
    color: '#2B2A2A',
  },
  content: {
    padding: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B2A2A',
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  text: {
    fontSize: 12,
    color: '#2B2A2A',
    lineHeight: 18,
  },
  academicItem: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  degree: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2B2A2A',
  },
  position: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2B2A2A',
  },
  dateRange: {
    fontSize: 11,
    color: '#666666',
    fontStyle: 'italic',
  },
  institution: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 3,
  },
  detail: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: '#2B2A2A',
    lineHeight: 16,
    marginTop: 4,
  },
  publicationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2B2A2A',
    marginBottom: 4,
  },
  link: {
    fontSize: 10,
    color: '#4A90E2',
    marginTop: 2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillItem: {
    fontSize: 11,
    color: '#2B2A2A',
  },
});

