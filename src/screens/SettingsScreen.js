import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { Card, Avatar } from '../components';
import { colors } from '../theme';

const SettingsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'nb' ? 'en' : 'nb';
    i18n.changeLanguage(newLang);
  };

  const settingsSections = [
    {
      title: t('settings.account'),
      items: [
        {
          icon: 'person-outline',
          label: t('settings.profile'),
          description: t('settings.profileDesc'),
          action: () => {},
        },
        {
          icon: 'shield-checkmark-outline',
          label: t('settings.security'),
          description: t('settings.securityDesc'),
          action: () => {},
        },
      ],
    },
    {
      title: t('settings.preferences'),
      items: [
        {
          icon: 'notifications-outline',
          label: t('settings.notifications'),
          description: t('settings.notificationsDesc'),
          action: () => {},
        },
        {
          icon: 'globe-outline',
          label: t('settings.language'),
          description: i18n.language === 'nb' ? 'Norsk (Bokmål)' : 'English',
          action: toggleLanguage,
        },
        {
          icon: 'moon-outline',
          label: t('settings.appearance'),
          description: t('settings.appearanceDesc'),
          action: () => {},
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings.title')}</Text>
          <Text style={styles.subtitle}>{t('settings.subtitle')}</Text>
        </View>

        {/* User Card */}
        <Card style={styles.userCard}>
          <View style={styles.userContent}>
            <Avatar initials={user?.avatar} size="large" />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>
                  {user?.role === 'staff'
                    ? t('settings.staff')
                    : t('settings.parent')}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <Card key={section.title} style={styles.sectionCard} padding={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.settingItem,
                  index < section.items.length - 1 && styles.settingItemBorder,
                ]}
                onPress={item.action}
              >
                <View style={styles.settingItemContent}>
                  <View style={styles.settingIconContainer}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={colors.neutral[600]}
                    />
                  </View>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Text style={styles.settingDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.neutral[300]}
                />
              </TouchableOpacity>
            ))}
          </Card>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.red[600]} />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Henteklar {t('settings.version')}</Text>
          <Text style={styles.appInfoText}>© 2024 FrostByte AS</Text>
        </View>
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
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 4,
  },
  userCard: {
    marginBottom: 24,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  userEmail: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 2,
  },
  roleBadge: {
    backgroundColor: colors.success[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.success[700],
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[800],
  },
  settingDescription: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.red[50],
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.red[600],
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appInfoText: {
    fontSize: 14,
    color: colors.neutral[400],
  },
});

export default SettingsScreen;
