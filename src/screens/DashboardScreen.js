import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { mockChildren } from '../data/mockData';
import { Card, Avatar, Badge } from '../components';
import { colors } from '../theme';

const { width } = Dimensions.get('window');

const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: { bg: colors.primary[50], text: colors.primary[600] },
    green: { bg: colors.success[50], text: colors.success[600] },
    orange: { bg: colors.accent[50], text: colors.accent[600] },
  };

  return (
    <Card style={styles.statCard}>
      <View style={styles.statContent}>
        <View style={[styles.statIconContainer, { backgroundColor: colorMap[color].bg }]}>
          <Ionicons name={icon} size={24} color={colorMap[color].text} />
        </View>
        <View>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statLabel}>{label}</Text>
        </View>
      </View>
    </Card>
  );
};

const ChildListItem = ({ child, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.childItem} onPress={onPress}>
      <View style={styles.childItemContent}>
        <Avatar
          initials={child.avatar}
          size="medium"
          variant={child.isCheckedIn ? 'success' : 'neutral'}
        />
        <View style={styles.childInfo}>
          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.childAge}>{child.age} {t('dashboard.years')}</Text>
        </View>
      </View>
      <View style={styles.childStatus}>
        {child.isCheckedIn ? (
          <Badge
            variant="success"
            icon={<Ionicons name="time-outline" size={14} color={colors.success[700]} />}
          >
            {t('dashboard.inSince')} {child.checkedInAt}
          </Badge>
        ) : (
          <Badge variant="neutral">
            {t('dashboard.pickedUp')} {child.checkedOutAt}
          </Badge>
        )}
        <Ionicons name="chevron-forward" size={20} color={colors.neutral[300]} />
      </View>
    </TouchableOpacity>
  );
};

const DashboardScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChildren = mockChildren.filter((child) =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkedInCount = mockChildren.filter((c) => c.isCheckedIn).length;
  const checkedOutCount = mockChildren.filter((c) => !c.isCheckedIn).length;

  const today = new Date().toLocaleDateString('nb-NO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('dashboard.title')}</Text>
        <Text style={styles.date}>{today}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <StatCard
          icon="people-outline"
          label={t('dashboard.totalChildren')}
          value={mockChildren.length}
          color="blue"
        />
        <StatCard
          icon="checkmark-circle-outline"
          label={t('dashboard.checkedIn')}
          value={checkedInCount}
          color="green"
        />
        <StatCard
          icon="exit-outline"
          label={t('dashboard.checkedOut')}
          value={checkedOutCount}
          color="orange"
        />
      </View>

      {/* Children List Header */}
      <Card style={styles.listCard} padding={false}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>{t('dashboard.allChildren')}</Text>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.neutral[400]}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={t('dashboard.searchChildren')}
              placeholderTextColor={colors.neutral[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredChildren}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <ChildListItem
            child={item}
            onPress={() => navigation.navigate('ChildProfile', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('dashboard.noChildrenFound')}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  date: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 4,
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: width > 500 ? 'row' : 'column',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: width > 500 ? 1 : undefined,
    padding: 16,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  statLabel: {
    fontSize: 14,
    color: colors.neutral[500],
  },
  listCard: {
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  listHeader: {
    flexDirection: width > 500 ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: width > 500 ? 'center' : 'flex-start',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: width > 500 ? 250 : '100%',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.neutral[800],
  },
  childItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.neutral[100],
  },
  childItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[800],
  },
  childAge: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 2,
  },
  childStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  emptyText: {
    color: colors.neutral[500],
    fontSize: 16,
  },
});

export default DashboardScreen;
