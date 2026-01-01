import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getTemplateById } from '../../data/templates';
import { useI18n } from '../../i18n/I18nContext';
import { RootStackParamList } from '../../navigation';
import { deleteCV, getUserCVs } from '../../services/firestore';
import { useTheme } from '../../theme';
import { CV } from '../../types';

type MyCVsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyCVsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const navigation = useNavigation<MyCVsScreenNavigationProp>();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCVs = async () => {
    try {
      setLoading(true);
      // TODO: Get actual userId from auth context
      const userId = 'temp_user';
      const fetchedCVs = await getUserCVs(userId);
      setCvs(fetchedCVs);
    } catch (error: any) {
      console.error('Error loading CVs:', error);
      // Set empty array so UI shows "No CVs" message instead of error
      setCvs([]);
      // Optionally show a toast or subtle error message
      // Alert.alert(
      //   t('myCVs.error.title', { defaultValue: 'Error' }),
      //   t('myCVs.error.loadFailed', { defaultValue: 'Failed to load your CVs. Please try again.' })
      // );
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCVs();
    setRefreshing(false);
  }, []);

  // Reload CVs when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadCVs();
    }, [])
  );

  const handleDeleteCV = async (cvId: string, cvName: string) => {
    if (!cvId) {
      Alert.alert(
        t('myCVs.error.title', { defaultValue: 'Error' }),
        'CV ID is missing. Cannot delete.'
      );
      return;
    }

    Alert.alert(
      t('myCVs.delete.title', { defaultValue: 'Delete CV' }),
      t('myCVs.delete.message', { defaultValue: 'Are you sure you want to delete this CV?' }) + ` (${cvName})`,
      [
        {
          text: t('common.cancel', { defaultValue: 'Cancel' }),
          style: 'cancel',
        },
        {
          text: t('common.delete', { defaultValue: 'Delete' }),
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('Deleting CV with ID:', cvId);
              await deleteCV(cvId);
              // Update local state to remove the deleted CV
              setCvs(prevCvs => prevCvs.filter((cv) => cv.id !== cvId));
              console.log('CV deleted successfully');
            } catch (error: any) {
              console.error('Error deleting CV:', error);
              Alert.alert(
                t('myCVs.error.title', { defaultValue: 'Error' }),
                t('myCVs.error.deleteFailed', { defaultValue: 'Failed to delete CV. Please try again.' }) + '\n' + (error?.message || '')
              );
            }
          },
        },
      ]
    );
  };

  const renderCVItem = ({ item }: { item: CV }) => {
    const template = getTemplateById(item.templateId);
    const formattedDate = new Date(item.updatedAt).toLocaleDateString();

    return (
      <TouchableOpacity
        style={[styles.cvCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => navigation.navigate('Preview', { cv: item })}
      >
        <View style={styles.cvPreviewContainer}>
          <Image
            source={template?.previewImage || require('../../../assets/templates/placeholder.png')}
            style={styles.cvPreview}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cvInfo}>
          <Text style={[styles.cvName, { color: colors.text }]}>
            {item.personalInfo.fullName || t('myCVs.untitled', { defaultValue: 'Untitled CV' })}
          </Text>
          <Text style={[styles.cvTemplate, { color: colors.textSecondary }]}>
            {t(`templates.${template?.nameKey}`, { defaultValue: template?.name || 'Unknown Template' })}
          </Text>
          <Text style={[styles.cvDate, { color: colors.textSecondary }]}>
            {t('myCVs.lastUpdated', { defaultValue: 'Updated' })}: {formattedDate}
          </Text>
        </View>
        <View style={styles.cvActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              handleDeleteCV(item.id, item.personalInfo.fullName || 'Untitled');
            }}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error || '#FF3B30'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>
          {t('tabs.myCVs', { defaultValue: 'My CVs' })}
        </Text>
      </View>

      {cvs.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={80} color={colors.textSecondary} />
          <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
            {t('myCVs.empty.title', { defaultValue: 'No CVs Yet' })}
          </Text>
          <Text style={[styles.emptyStateMessage, { color: colors.textSecondary }]}>
            {t('myCVs.empty.message', { defaultValue: 'Create your first CV to get started' })}
          </Text>
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.createButtonText}>
              {t('myCVs.createFirst', { defaultValue: 'Create CV' })}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cvs}
          renderItem={renderCVItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  cvCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cvPreviewContainer: {
    width: 60,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cvPreview: {
    width: '100%',
    height: '100%',
  },
  cvInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  cvName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cvTemplate: {
    fontSize: 14,
    marginBottom: 4,
  },
  cvDate: {
    fontSize: 12,
  },
  cvActions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
