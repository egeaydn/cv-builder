import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const CreativeBoldTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills } = cv;

  return (
    <View style={styles.container}>
      {/* Colorful Header */}
      <View style={styles.header}>
        <View style={styles.colorBand}>
          <View style={[styles.bandSection, { backgroundColor: '#E63946' }]} />
          <View style={[styles.bandSection, { backgroundColor: '#F1FAEE' }]} />
          <View style={[styles.bandSection, { backgroundColor: '#A8DADC' }]} />
          <View style={[styles.bandSection, { backgroundColor: '#457B9D' }]} />
          <View style={[styles.bandSection, { backgroundColor: '#1D3557' }]} />
        </View>
        <View style={styles.headerContent}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{personalInfo.fullName.charAt(0)}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
            <View style={styles.contactRow}>
              {personalInfo.email && <Text style={styles.contact}>✉ {personalInfo.email}</Text>}
              {personalInfo.phone && <Text style={styles.contact}>☎ {personalInfo.phone}</Text>}
              {personalInfo.location && <Text style={styles.contact}>📍 {personalInfo.location}</Text>}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.twoColumn}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* About */}
            {personalInfo.summary && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>ABOUT ME</Text>
                </View>
                <Text style={styles.text}>{personalInfo.summary}</Text>
              </View>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>SKILLS</Text>
                </View>
                <View style={styles.skillsContainer}>
                  {skills.map((skill) => (
                    <View key={skill.id} style={styles.skillBadge}>
                      <Text style={styles.skillText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience */}
            {experience && experience.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                </View>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.item}>
                    <View style={styles.timeline} />
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{exp.position}</Text>
                      <Text style={styles.itemCompany}>{exp.company}</Text>
                      <Text style={styles.itemDate}>{exp.startDate} - {exp.current ? 'Now' : exp.endDate}</Text>
                      {exp.description && <Text style={styles.itemDescription}>{exp.description}</Text>}
                    </View>
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
                    <View style={styles.timeline} />
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{project.title}</Text>
                      {project.description && <Text style={styles.itemDescription}>{project.description}</Text>}
                      {project.technologies && project.technologies.length > 0 && (
                        <Text style={styles.tech}>🔧 {project.technologies.join(', ')}</Text>
                      )}
                    </View>
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
                    <View style={styles.timeline} />
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{edu.degree}</Text>
                      <Text style={styles.itemCompany}>{edu.school}</Text>
                      <Text style={styles.itemDate}>{edu.startDate} - {edu.current ? 'Now' : edu.endDate}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
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
    backgroundColor: '#F8F9FA',
  },
  colorBand: {
    flexDirection: 'row',
    height: 12,
  },
  bandSection: {
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    padding: 30,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#457B9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#457B9D',
    marginBottom: 12,
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contact: {
    fontSize: 12,
    color: '#666666',
  },
  content: {
    padding: 30,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 30,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    backgroundColor: '#E63946',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  text: {
    fontSize: 13,
    color: '#2B2A2A',
    lineHeight: 19,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#A8DADC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 12,
    color: '#1D3557',
    fontWeight: '500',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeline: {
    width: 4,
    backgroundColor: '#457B9D',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 2,
  },
  itemCompany: {
    fontSize: 12,
    color: '#457B9D',
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  itemDescription: {
    fontSize: 12,
    color: '#2B2A2A',
    lineHeight: 17,
  },
  tech: {
    fontSize: 11,
    color: '#E63946',
    marginTop: 4,
  },
});

