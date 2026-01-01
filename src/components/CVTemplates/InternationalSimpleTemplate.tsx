import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const InternationalSimpleTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, education, experience, projects, skills } = cv;

  return (
    <View style={styles.container}>
      {/* Centered Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
        <View style={styles.divider} />
        <View style={styles.contactContainer}>
          {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contact}> | {personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contact}> | {personalInfo.location}</Text>}
        </View>
      </View>

      <View style={styles.content}>
        {/* Profile */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFILE</Text>
            <View style={styles.underline} />
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            <View style={styles.underline} />
            {experience.map((exp, index) => (
              <View key={exp.id}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemPosition}>{exp.position}</Text>
                    <Text style={styles.itemCompany}>{exp.company}</Text>
                  </View>
                  <Text style={styles.itemDate}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                {exp.description && <Text style={styles.itemDescription}>{exp.description}</Text>}
                {index < experience.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.underline} />
            {education.map((edu, index) => (
              <View key={edu.id}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemPosition}>{edu.degree}</Text>
                    <Text style={styles.itemCompany}>{edu.school}</Text>
                    {edu.field && <Text style={styles.itemField}>{edu.field}</Text>}
                  </View>
                  <Text style={styles.itemDate}>{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</Text>
                </View>
                {index < education.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            <View style={styles.underline} />
            {projects.map((project, index) => (
              <View key={project.id}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                {project.description && <Text style={styles.itemDescription}>{project.description}</Text>}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.techStack}>Technologies: {project.technologies.join(', ')}</Text>
                )}
                {index < projects.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.underline} />
            <Text style={styles.skillsList}>{skills.map((s) => s.name).join(', ')}</Text>
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
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    color: '#555555',
    marginTop: 6,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#000000',
    marginVertical: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contact: {
    fontSize: 12,
    color: '#666666',
  },
  content: {
    paddingHorizontal: 50,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1.5,
  },
  underline: {
    width: 40,
    height: 1,
    backgroundColor: '#000000',
    marginTop: 4,
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 13,
    color: '#2B2A2A',
    lineHeight: 19,
    textAlign: 'justify',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemLeft: {
    flex: 1,
  },
  itemPosition: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  itemCompany: {
    fontSize: 12,
    color: '#555555',
    marginTop: 2,
  },
  itemField: {
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  itemDate: {
    fontSize: 11,
    color: '#777777',
    textAlign: 'right',
  },
  itemDescription: {
    fontSize: 12,
    color: '#2B2A2A',
    lineHeight: 17,
    marginBottom: 8,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  techStack: {
    fontSize: 11,
    color: '#777777',
    marginTop: 4,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  skillsList: {
    fontSize: 12,
    color: '#2B2A2A',
    lineHeight: 18,
  },
});

