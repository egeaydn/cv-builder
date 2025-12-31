import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const ModernProfessionalTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills, extras } = cv;

  return (
    <View style={styles.container}>
      {/* Header with accent */}
      <View style={styles.header}>
        <View style={styles.headerAccent} />
        <View style={styles.headerContent}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
          <View style={styles.contactInfo}>
            {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contact}> • {personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contact}> • {personalInfo.location}</Text>}
          </View>
        </View>
      </View>

      {/* Summary */}
      {personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.sectionContent}>{personalInfo.summary}</Text>
        </View>
      )}

      {/* Experience - Prioritized */}
      {experience && experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemHeaderLeft}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                </View>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate || ''}
                </Text>
              </View>
              {exp.description && <Text style={styles.itemDescription}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemHeaderLeft}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>{edu.school}</Text>
                </View>
                <Text style={styles.itemDate}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate || ''}
                </Text>
              </View>
              {edu.field && <Text style={styles.itemDescription}>{edu.field}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill) => (
              <View key={skill.id} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {projects.map((project) => (
            <View key={project.id} style={styles.item}>
              <Text style={styles.itemTitle}>{project.title}</Text>
              {project.description && <Text style={styles.itemDescription}>{project.description}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    minHeight: 800,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  headerAccent: {
    width: 4,
    backgroundColor: '#FF3838',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#050E3C',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: '#002455',
    marginBottom: 8,
    fontWeight: '500',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contact: {
    fontSize: 13,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#050E3C',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  item: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemHeaderLeft: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#050E3C',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#002455',
    marginTop: 2,
  },
  itemDate: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginTop: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 13,
    color: '#050E3C',
    fontWeight: '500',
  },
});

