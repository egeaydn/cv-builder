import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import i18n from '../i18n';
import { useTheme } from '../theme';
import { Education } from '../types';

interface EducationFormModalProps {
  visible: boolean;
  education?: Education;
  onSave: (education: Education) => void;
  onClose: () => void;
}

export const EducationFormModal: React.FC<EducationFormModalProps> = ({
  visible,
  education,
  onSave,
  onClose,
}) => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState<Education>(
    education || {
      id: `edu_${Date.now()}`,
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      gpa: '',
    }
  );

  const handleSave = () => {
    if (formData.school && formData.degree) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {education ? i18n.t('common.edit') : i18n.t('wizard.education.addEducation')}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <Text style={[styles.label, { color: colors.text }]}>
              {i18n.t('wizard.education.school')} *
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder="Harvard University"
              placeholderTextColor={colors.textSecondary}
              value={formData.school}
              onChangeText={(text) => setFormData({ ...formData, school: text })}
            />

            <Text style={[styles.label, { color: colors.text }]}>
              {i18n.t('wizard.education.degree')} *
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder="Bachelor of Science"
              placeholderTextColor={colors.textSecondary}
              value={formData.degree}
              onChangeText={(text) => setFormData({ ...formData, degree: text })}
            />

            <Text style={[styles.label, { color: colors.text }]}>
              {i18n.t('wizard.education.field')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder="Computer Science"
              placeholderTextColor={colors.textSecondary}
              value={formData.field}
              onChangeText={(text) => setFormData({ ...formData, field: text })}
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={[styles.label, { color: colors.text }]}>
                  {i18n.t('wizard.education.startDate')}
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                  placeholder="2020"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.startDate}
                  onChangeText={(text) => setFormData({ ...formData, startDate: text })}
                />
              </View>
              <View style={styles.halfWidth}>
                <Text style={[styles.label, { color: colors.text }]}>
                  {i18n.t('wizard.education.endDate')}
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                  placeholder="2024"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.endDate}
                  onChangeText={(text) => setFormData({ ...formData, endDate: text })}
                  editable={!formData.current}
                />
              </View>
            </View>

            <View style={[styles.switchRow, { borderColor: colors.border }]}>
              <Text style={[styles.label, { color: colors.text, marginBottom: 0 }]}>
                {i18n.t('wizard.education.current')}
              </Text>
              <Switch
                value={formData.current}
                onValueChange={(value) => setFormData({ ...formData, current: value })}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            <Text style={[styles.label, { color: colors.text }]}>
              {i18n.t('wizard.education.gpa')}
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder="3.8/4.0"
              placeholderTextColor={colors.textSecondary}
              value={formData.gpa}
              onChangeText={(text) => setFormData({ ...formData, gpa: text })}
            />

            <Text style={[styles.label, { color: colors.text }]}>
              {i18n.t('wizard.education.description')}
            </Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholder="Relevant coursework, achievements..."
              placeholderTextColor={colors.textSecondary}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </ScrollView>

          <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>
                {i18n.t('common.cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}
            >
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                {i18n.t('common.save')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
