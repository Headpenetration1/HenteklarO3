import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { mockChildren } from '../data/mockData';
import { Button, Card, Avatar, Badge } from '../components';
import { colors } from '../theme';

const ChildProfileScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { id } = route.params;
  const [child, setChild] = useState(mockChildren.find((c) => c.id === id));

  if (!child) {
    return (
      <View style={styles.container}>
        <Card style={styles.notFoundCard}>
          <Text style={styles.notFoundText}>{t('childProfile.notFound')}</Text>
          <Button
            title={t('childProfile.backToOverview')}
            variant="primary"
            onPress={() => navigation.goBack()}
          />
        </Card>
      </View>
    );
  }

  const toggleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setChild((prev) => ({
      ...prev,
      isCheckedIn: !prev.isCheckedIn,
      ...(prev.isCheckedIn
        ? { checkedOutAt: timeString, checkedInAt: undefined }
        : { checkedInAt: timeString, checkedOutAt: undefined }),
    }));
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.neutral[600]} />
          <Text style={styles.backButtonText}>{t('back')}</Text>
        </TouchableOpacity>

        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Avatar
                initials={child.avatar}
                size="xlarge"
                variant={child.isCheckedIn ? 'success' : 'neutral'}
              />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{child.name}</Text>
                <Text style={styles.profileAge}>
                  {child.age} {t('dashboard.years')} • {child.group}
                </Text>
                <View style={styles.statusBadge}>
                  {child.isCheckedIn ? (
                    <Badge
                      variant="success"
                      icon={
                        <Ionicons
                          name="time-outline"
                          size={14}
                          color={colors.success[700]}
                        />
                      }
                    >
                      {t('childProfile.inSince')} {child.checkedInAt}
                    </Badge>
                  ) : (
                    <Badge variant="neutral">
                      {t('dashboard.pickedUp')} {child.checkedOutAt}
                    </Badge>
                  )}
                </View>
              </View>
            </View>

            <Button
              title={
                child.isCheckedIn
                  ? t('checkInOut.checkOut')
                  : t('checkInOut.checkIn')
              }
              variant={child.isCheckedIn ? 'danger' : 'success'}
              size="large"
              onPress={toggleCheckIn}
              icon={
                <Ionicons
                  name={child.isCheckedIn ? 'log-out-outline' : 'log-in-outline'}
                  size={20}
                  color={colors.white}
                />
              }
            />
          </View>
        </Card>

        {/* Contact Information */}
        <Card style={styles.contactCard} padding={false}>
          <View style={styles.contactHeader}>
            <Text style={styles.contactTitle}>{t('childProfile.contactInfo')}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={16} color={colors.neutral[600]} />
              <Text style={styles.editButtonText}>{t('edit')}</Text>
            </TouchableOpacity>
          </View>

          {child.parents.map((parent) => (
            <View key={parent.id} style={styles.parentItem}>
              <View style={styles.parentHeader}>
                <Avatar initials={parent.name.split(' ').map((n) => n[0]).join('')} size="medium" variant="accent" />
                <View style={styles.parentInfo}>
                  <View style={styles.parentNameRow}>
                    <Text style={styles.parentName}>{parent.name}</Text>
                    {parent.isPrimary && (
                      <Badge variant="success" style={styles.primaryBadge}>
                        {t('childProfile.primary')}
                      </Badge>
                    )}
                  </View>
                  <Text style={styles.parentRelation}>{parent.relation}</Text>
                </View>
              </View>

              <View style={styles.parentActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCall(parent.phone)}
                >
                  <Ionicons name="call-outline" size={16} color={colors.neutral[700]} />
                  <Text style={styles.actionButtonText}>{parent.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEmail(parent.email)}
                >
                  <Ionicons name="mail-outline" size={16} color={colors.neutral[700]} />
                  <Text style={styles.actionButtonText}>{t('childProfile.sendEmail')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>{t('childProfile.quickActions')}</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="person-outline" size={16} color={colors.neutral[700]} />
              <Text style={styles.quickActionText}>{t('childProfile.editProfile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="time-outline" size={16} color={colors.neutral[700]} />
              <Text style={styles.quickActionText}>{t('childProfile.viewHistory')}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    padding: 16,
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  notFoundCard: {
    padding: 48,
    alignItems: 'center',
  },
  notFoundText: {
    color: colors.neutral[500],
    fontSize: 16,
    marginBottom: 16,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    gap: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  profileAge: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 4,
  },
  statusBadge: {
    marginTop: 8,
  },
  contactCard: {
    marginBottom: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.neutral[50],
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  parentItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  parentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  parentInfo: {
    flex: 1,
  },
  parentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  parentName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[800],
  },
  primaryBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  parentRelation: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 2,
  },
  parentActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: colors.neutral[700],
  },
  actionsCard: {
    marginBottom: 32,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[700],
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: colors.neutral[700],
  },
});

export default ChildProfileScreen;
