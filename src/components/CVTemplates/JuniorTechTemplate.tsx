import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const JuniorTechTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills } = cv;

  return (
    <View style={styles.container}>
      {/* Dark Header with Accent */}
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
        <View style={styles.contactRow}>
          {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contact}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contact}>{personalInfo.location}</Text>}
        </View>
      </View>

      <View style={styles.content}>
        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>PROFILE</Text>
            </View>
            <Text style={styles.text}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.map((skill) => (
                <View key={skill.id} style={styles.skillTag}>
                  <Text style={styles.skillText}>→ {skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            </View>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemDate}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
            </View>
            {projects.map((project) => (
              <View key={project.id} style={styles.item}>
                <Text style={styles.itemTitle}>{project.title}</Text>
                {project.description && <Text style={styles.description}>{project.description}</Text>}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.tech}>{project.technologies.join(' • ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
            </View>
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
                </View>
                <Text style={styles.company}>{edu.school}</Text>
                {edu.field && <Text style={styles.description}>{edu.field}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A2E',
    minHeight: 800,
  },
  header: {
    backgroundColor: '#16213E',
    padding: 30,
    position: 'relative',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: '#FEB05D',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: '#FEB05D',
    marginBottom: 12,
    fontWeight: '600',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contact: {
    fontSize: 13,
    color: '#AAAAAA',
  },
  content: {
    padding: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#FEB05D',
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FEB05D',
    letterSpacing: 1,
  },
  text: {
    fontSize: 14,
    color: '#DDDDDD',
    lineHeight: 20,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    paddingVertical: 4,
  },
  skillText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
  item: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  itemDate: {
    fontSize: 12,
    color: '#FEB05D',
    fontStyle: 'italic',
  },
  company: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 18,
  },
  tech: {
    fontSize: 12,
    color: '#FEB05D',
    marginTop: 6,
    fontFamily: 'monospace',
  },
});

