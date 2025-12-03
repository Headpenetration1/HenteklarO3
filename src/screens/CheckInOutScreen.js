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
import { mockChildren as initialChildren } from '../data/mockData';
import { Card, Avatar } from '../components';
import { colors } from '../theme';

const { width } = Dimensions.get('window');
const numColumns = width > 800 ? 3 : width > 500 ? 2 : 1;

const CheckInOutScreen = () => {
  const { t } = useTranslation();
  const [children, setChildren] = useState(initialChildren);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentAction, setRecentAction] = useState(null);

  const toggleCheckIn = (childId) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setChildren((prev) =>
      prev.map((child) => {
        if (child.id === childId) {
          const newStatus = !child.isCheckedIn;
          setRecentAction({
            childName: child.name,
            action: newStatus ? 'inn' : 'ut',
            time: timeString,
          });

          setTimeout(() => setRecentAction(null), 3000);

          return {
            ...child,
            isCheckedIn: newStatus,
            ...(newStatus
              ? { checkedInAt: timeString, checkedOutAt: undefined }
              : { checkedOutAt: timeString, checkedInAt: undefined }),
          };
        }
        return child;
      })
    );
  };

  const filteredChildren = children
    .filter((child) => {
      if (filter === 'in') return child.isCheckedIn;
      if (filter === 'out') return !child.isCheckedIn;
      return true;
    })
    .filter((child) =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const checkedInCount = children.filter((c) => c.isCheckedIn).length;
  const checkedOutCount = children.filter((c) => !c.isCheckedIn).length;

  const FilterButton = ({ value, label, count, activeColor }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === value && { backgroundColor: activeColor },
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === value && styles.filterButtonTextActive,
        ]}
      >
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );

  const ChildCard = ({ child }) => (
    <TouchableOpacity
      style={[
        styles.childCard,
        child.isCheckedIn && styles.childCardCheckedIn,
      ]}
      onPress={() => toggleCheckIn(child.id)}
      activeOpacity={0.8}
    >
      <View style={styles.childCardHeader}>
        <Avatar
          initials={child.avatar}
          size="large"
          variant={child.isCheckedIn ? 'success' : 'neutral'}
        />
        <View style={styles.childCardInfo}>
          <Text style={styles.childCardName}>{child.name}</Text>
          <Text style={styles.childCardAge}>
            {child.age} {t('dashboard.years')} • {child.group}
          </Text>
        </View>
      </View>

      <View style={styles.childCardFooter}>
        <View style={styles.childCardTime}>
          <Ionicons name="time-outline" size={16} color={colors.neutral[400]} />
          <Text style={styles.childCardTimeText}>
            {child.isCheckedIn
              ? `Inn: ${child.checkedInAt}`
              : `Hentet: ${child.checkedOutAt}`}
          </Text>
        </View>

        <View
          style={[
            styles.actionButton,
            child.isCheckedIn ? styles.actionButtonOut : styles.actionButtonIn,
          ]}
        >
          <Ionicons
            name={child.isCheckedIn ? 'log-out-outline' : 'log-in-outline'}
            size={16}
            color={child.isCheckedIn ? colors.red[700] : colors.success[700]}
          />
          <Text
            style={[
              styles.actionButtonText,
              child.isCheckedIn
                ? styles.actionButtonTextOut
                : styles.actionButtonTextIn,
            ]}
          >
            {child.isCheckedIn ? t('checkInOut.checkOut') : t('checkInOut.checkIn')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('checkInOut.title')}</Text>
        <Text style={styles.subtitle}>{t('checkInOut.subtitle')}</Text>
      </View>

      {/* Success Message */}
      {recentAction && (
        <View style={styles.successMessage}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success[600]} />
          <Text style={styles.successText}>
            <Text style={styles.successBold}>{recentAction.childName}</Text>
            {' '}{recentAction.action === 'inn' ? t('checkInOut.checkedIn') : t('checkInOut.checkedOut')}{' '}
            {recentAction.time}
          </Text>
        </View>
      )}

      {/* Filter Tabs */}
      <Card style={styles.filterCard} padding={false}>
        <View style={styles.filterContainer}>
          <FilterButton
            value="all"
            label={t('checkInOut.all')}
            count={children.length}
            activeColor={colors.primary[600]}
          />
          <FilterButton
            value="in"
            label={t('checkInOut.in')}
            count={checkedInCount}
            activeColor={colors.success[500]}
          />
          <FilterButton
            value="out"
            label={t('checkInOut.out')}
            count={checkedOutCount}
            activeColor={colors.neutral[600]}
          />
        </View>
      </Card>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={colors.neutral[400]} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('dashboard.searchChildren')}
          placeholderTextColor={colors.neutral[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredChildren}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ChildCard child={item} />
          </View>
        )}
        ListEmptyComponent={
          <Card style={styles.emptyCard}>
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Ionicons name="people-outline" size={32} color={colors.neutral[400]} />
              </View>
              <Text style={styles.emptyText}>{t('checkInOut.noChildrenFound')}</Text>
            </View>
          </Card>
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
  subtitle: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 4,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.success[50],
    borderWidth: 1,
    borderColor: colors.success[200],
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  successText: {
    color: colors.success[700],
    fontSize: 14,
  },
  successBold: {
    fontWeight: '600',
  },
  filterCard: {
    marginBottom: 16,
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[600],
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    maxWidth: 400,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.neutral[800],
  },
  cardWrapper: {
    flex: 1,
    padding: 6,
    maxWidth: numColumns === 1 ? '100%' : `${100 / numColumns}%`,
  },
  childCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  childCardCheckedIn: {
    borderColor: colors.success[200],
    backgroundColor: `${colors.success[50]}80`,
  },
  childCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  childCardInfo: {
    flex: 1,
  },
  childCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  childCardAge: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 2,
  },
  childCardFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  childCardTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  childCardTimeText: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonIn: {
    backgroundColor: colors.success[100],
  },
  actionButtonOut: {
    backgroundColor: colors.red[100],
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtonTextIn: {
    color: colors.success[700],
  },
  actionButtonTextOut: {
    color: colors.red[700],
  },
  emptyCard: {
    padding: 48,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: colors.neutral[500],
    fontSize: 16,
  },
});

export default CheckInOutScreen;
