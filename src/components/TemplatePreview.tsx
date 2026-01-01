import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TemplatePreviewProps {
  templateId: string;
  width?: number;
  height?: number;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  templateId,
  width = 200,
  height = 280,
}) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'student-clean':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#FFFFFF' }]}>
            <View style={[styles.header, { backgroundColor: '#5A7ACD', height: height * 0.15 }]}>
              <View style={[styles.avatar, { width: 40, height: 40 }]} />
            </View>
            <View style={styles.content}>
              <View style={[styles.line, { width: '60%', backgroundColor: '#2B2A2A' }]} />
              <View style={[styles.line, { width: '40%', backgroundColor: '#999' }]} />
              <View style={[styles.section, { marginTop: 12 }]}>
                <View style={[styles.line, { width: '80%', backgroundColor: '#5A7ACD' }]} />
                <View style={[styles.line, { width: '90%', backgroundColor: '#DDD' }]} />
                <View style={[styles.line, { width: '85%', backgroundColor: '#DDD' }]} />
              </View>
              <View style={styles.section}>
                <View style={[styles.line, { width: '80%', backgroundColor: '#5A7ACD' }]} />
                <View style={[styles.line, { width: '90%', backgroundColor: '#DDD' }]} />
              </View>
            </View>
          </View>
        );

      case 'junior-tech':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#1A1A2E' }]}>
            <View style={[styles.header, { backgroundColor: '#16213E', height: height * 0.12, paddingLeft: 12 }]}>
              <View style={[styles.line, { width: '50%', backgroundColor: '#FEB05D' }]} />
            </View>
            <View style={[styles.content, { padding: 12 }]}>
              <View style={[styles.line, { width: '70%', backgroundColor: '#FEB05D' }]} />
              <View style={[styles.line, { width: '50%', backgroundColor: '#AAA' }]} />
              <View style={[styles.section, { marginTop: 8 }]}>
                <View style={[styles.line, { width: '60%', backgroundColor: '#FEB05D', height: 3 }]} />
                <View style={[styles.line, { width: '90%', backgroundColor: '#555' }]} />
                <View style={[styles.line, { width: '85%', backgroundColor: '#555' }]} />
              </View>
            </View>
          </View>
        );

      case 'modern-professional':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#FFFFFF', flexDirection: 'row' }]}>
            <View style={{ width: '35%', backgroundColor: '#F5F2F2', padding: 8 }}>
              <View style={[styles.avatar, { width: 50, height: 50, marginBottom: 8 }]} />
              <View style={[styles.line, { width: '80%', backgroundColor: '#5A7ACD' }]} />
              <View style={[styles.line, { width: '90%', backgroundColor: '#999' }]} />
            </View>
            <View style={{ flex: 1, padding: 8 }}>
              <View style={[styles.line, { width: '80%', backgroundColor: '#2B2A2A', height: 4 }]} />
              <View style={[styles.line, { width: '60%', backgroundColor: '#999' }]} />
              <View style={[styles.section, { marginTop: 8 }]}>
                <View style={[styles.line, { width: '90%', backgroundColor: '#5A7ACD' }]} />
                <View style={[styles.line, { width: '95%', backgroundColor: '#DDD' }]} />
              </View>
            </View>
          </View>
        );

      case 'corporate-classic':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#FFFFFF' }]}>
            <View style={[styles.header, { height: 8, backgroundColor: '#2B2A2A' }]} />
            <View style={styles.content}>
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <View style={[styles.line, { width: '60%', backgroundColor: '#2B2A2A', height: 4 }]} />
                <View style={[styles.line, { width: '40%', backgroundColor: '#999' }]} />
              </View>
              <View style={[styles.section]}>
                <View style={[styles.line, { width: '70%', backgroundColor: '#2B2A2A', height: 3 }]} />
                <View style={[styles.line, { width: '90%', backgroundColor: '#DDD' }]} />
                <View style={[styles.line, { width: '85%', backgroundColor: '#DDD' }]} />
              </View>
            </View>
          </View>
        );

      case 'creative-minimal':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#FAFAFA' }]}>
            <View style={[styles.content, { alignItems: 'flex-start' }]}>
              <View style={[styles.line, { width: '70%', backgroundColor: '#FEB05D', height: 6 }]} />
              <View style={[styles.line, { width: '50%', backgroundColor: '#2B2A2A' }]} />
              <View style={[styles.section, { marginTop: 12 }]}>
                <View style={{ flexDirection: 'row', gap: 4, marginBottom: 4 }}>
                  <View style={{ width: 4, height: 20, backgroundColor: '#5A7ACD' }} />
                  <View style={[styles.line, { width: '70%', backgroundColor: '#2B2A2A' }]} />
                </View>
                <View style={[styles.line, { width: '90%', backgroundColor: '#CCC', marginLeft: 8 }]} />
              </View>
            </View>
          </View>
        );

      case 'creative-bold':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#FFFFFF' }]}>
            <View style={[styles.header, { backgroundColor: '#FEB05D', height: height * 0.2, justifyContent: 'center', alignItems: 'center' }]}>
              <View style={[styles.avatar, { width: 50, height: 50, borderWidth: 3, borderColor: '#FFFFFF' }]} />
            </View>
            <View style={styles.content}>
              <View style={[styles.line, { width: '80%', backgroundColor: '#5A7ACD', height: 5 }]} />
              <View style={[styles.section, { marginTop: 8 }]}>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#5A7ACD' }} />
                  <View style={{ flex: 1 }}>
                    <View style={[styles.line, { width: '70%', backgroundColor: '#2B2A2A' }]} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        );

      case 'international-simple':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#FFFFFF' }]}>
            <View style={styles.content}>
              <View style={{ alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#DDD' }}>
                <View style={[styles.line, { width: '60%', backgroundColor: '#2B2A2A', height: 4 }]} />
                <View style={[styles.line, { width: '50%', backgroundColor: '#999' }]} />
              </View>
              <View style={[styles.section]}>
                <View style={[styles.line, { width: '70%', backgroundColor: '#2B2A2A', height: 3 }]} />
                <View style={[styles.line, { width: '90%', backgroundColor: '#DDD' }]} />
              </View>
              <View style={[styles.section]}>
                <View style={[styles.line, { width: '65%', backgroundColor: '#2B2A2A', height: 3 }]} />
                <View style={[styles.line, { width: '85%', backgroundColor: '#DDD' }]} />
              </View>
            </View>
          </View>
        );

      case 'academic-cv':
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#FFFFFF' }]}>
            <View style={[styles.header, { height: height * 0.12, backgroundColor: '#F5F2F2', justifyContent: 'center', paddingLeft: 12 }]}>
              <View style={[styles.line, { width: '70%', backgroundColor: '#2B2A2A', height: 4 }]} />
              <View style={[styles.line, { width: '50%', backgroundColor: '#5A7ACD' }]} />
            </View>
            <View style={styles.content}>
              <View style={[styles.section]}>
                <View style={[styles.line, { width: '60%', backgroundColor: '#5A7ACD', height: 3 }]} />
                <View style={[styles.line, { width: '95%', backgroundColor: '#DDD', height: 2 }]} />
                <View style={[styles.line, { width: '90%', backgroundColor: '#DDD', height: 2 }]} />
              </View>
              <View style={[styles.section]}>
                <View style={[styles.line, { width: '55%', backgroundColor: '#5A7ACD', height: 3 }]} />
                <View style={[styles.line, { width: '92%', backgroundColor: '#DDD', height: 2 }]} />
              </View>
            </View>
          </View>
        );

      default:
        return (
          <View style={[styles.container, { width, height, backgroundColor: '#F5F2F2' }]}>
            <View style={styles.content}>
              <View style={[styles.line, { width: '70%', backgroundColor: '#5A7ACD' }]} />
              <View style={[styles.line, { width: '50%', backgroundColor: '#999' }]} />
            </View>
          </View>
        );
    }
  };

  return renderTemplate();
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  avatar: {
    borderRadius: 999,
    backgroundColor: '#DDD',
  },
  line: {
    height: 3,
    borderRadius: 1.5,
    marginBottom: 4,
  },
  section: {
    marginTop: 6,
    marginBottom: 6,
  },
});
