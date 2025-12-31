import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const StudentCleanTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills, extras } = cv;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
        <View style={styles.contactInfo}>
          {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contact}> • {personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contact}> • {personalInfo.location}</Text>}
        </View>
      </View>

      {/* Summary */}
      {personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.sectionContent}>{personalInfo.summary}</Text>
        </View>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemDate}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate || ''}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>{edu.school}</Text>
              {edu.field && <Text style={styles.itemDescription}>{edu.field}</Text>}
              {edu.gpa && <Text style={styles.itemDescription}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate || ''}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              {exp.location && <Text style={styles.itemDescription}>{exp.location}</Text>}
              {exp.description && <Text style={styles.itemDescription}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((project) => (
            <View key={project.id} style={styles.item}>
              <Text style={styles.itemTitle}>{project.title}</Text>
              {project.description && <Text style={styles.itemDescription}>{project.description}</Text>}
              {project.technologies && project.technologies.length > 0 && (
                <Text style={styles.itemDescription}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill) => (
              <View key={skill.id} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Languages */}
      {extras?.languages && extras.languages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {extras.languages.map((lang) => (
            <View key={lang.id} style={styles.item}>
              <Text style={styles.itemTitle}>
                {lang.name} - {lang.level}
              </Text>
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
    borderBottomWidth: 2,
    borderBottomColor: '#050E3C',
    paddingBottom: 16,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#050E3C',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: '#002455',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contact: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#050E3C',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  item: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#050E3C',
    flex: 1,
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  itemSubtitle: {
    fontSize: 15,
    color: '#002455',
    marginBottom: 4,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: '#050E3C',
  },
});

