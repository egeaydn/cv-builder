import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const CreativeMinimalTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills } = cv;

  return (
    <View style={styles.container}>
      {/* Minimal Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
        <View style={styles.contactContainer}>
          {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contact}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contact}>{personalInfo.location}</Text>}
        </View>
      </View>

      <View style={styles.content}>
        {/* About */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.accentLine} />
              <Text style={styles.sectionTitle}>About</Text>
            </View>
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.accentLine} />
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</Text>
                {exp.description && <Text style={styles.itemText}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.accentLine} />
              <Text style={styles.sectionTitle}>Projects</Text>
            </View>
            {projects.map((project) => (
              <View key={project.id} style={styles.item}>
                <Text style={styles.itemTitle}>{project.title}</Text>
                {project.description && <Text style={styles.itemText}>{project.description}</Text>}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.techText}>{project.technologies.join(' · ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.accentLine} />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemSubtitle}>{edu.school}</Text>
                <Text style={styles.itemDate}>{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.accentLine} />
              <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            <Text style={styles.skillsText}>
              {skills.map((skill) => skill.name).join(' · ')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    minHeight: 800,
  },
  header: {
    padding: 40,
    paddingBottom: 30,
  },
  name: {
    fontSize: 36,
    fontWeight: '300',
    color: '#2B2A2A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    fontWeight: '300',
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  contact: {
    fontSize: 12,
    color: '#888888',
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  accentLine: {
    width: 4,
    height: 20,
    backgroundColor: '#2B2A2A',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2A2A',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summaryText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
    fontWeight: '300',
  },
  item: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2B2A2A',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  itemText: {
    fontSize: 12,
    color: '#555555',
    lineHeight: 18,
    fontWeight: '300',
  },
  techText: {
    fontSize: 11,
    color: '#888888',
    marginTop: 6,
  },
  skillsText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
    fontWeight: '300',
  },
});

