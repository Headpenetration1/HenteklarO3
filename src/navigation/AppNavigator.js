import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';
import {
  LandingScreen,
  LoginScreen,
  DashboardScreen,
  CheckInOutScreen,
  ChildProfileScreen,
  SettingsScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

// Custom Header with Top Navigation
const CustomHeader = ({ navigation, currentRoute }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const navItems = [
    { name: 'Dashboard', label: t('nav.overview'), icon: 'grid-outline' },
    { name: 'CheckInOut', label: t('nav.checkInOut'), icon: 'checkmark-circle-outline' },
    { name: 'Settings', label: t('nav.settings'), icon: 'settings-outline' },
  ];

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerContent}>
        {/* Logo */}
        <View style={styles.headerLogoContainer}>
          <Image
            source={require('../../assets/mascot.png')}
            style={styles.headerMascot}
            resizeMode="contain"
          />
          <Text style={styles.headerLogoText}>Henteklar</Text>
        </View>

        {/* Top Navigation */}
        <View style={styles.topNav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.navItem,
                currentRoute === item.name && styles.navItemActive,
              ]}
              onPress={() => navigation.navigate(item.name)}
            >
              <Text
                style={[
                  styles.navItemText,
                  currentRoute === item.name && styles.navItemTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* User & Logout */}
        <View style={styles.headerRight}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.avatar}</Text>
            </View>
            <View style={styles.userText}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userRole}>
                {user?.role === 'staff' ? 'Ansatt' : 'Forelder'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.neutral[500]} />
            <Text style={styles.logoutText}>Logg ut</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Main Screen Container with Top Nav
const MainScreen = ({ navigation, route }) => {
  const [currentRoute, setCurrentRoute] = useState('Dashboard');

  const renderScreen = () => {
    switch (currentRoute) {
      case 'Dashboard':
        return <DashboardScreen navigation={{ ...navigation, navigate: (name, params) => {
          if (['Dashboard', 'CheckInOut', 'Settings'].includes(name)) {
            setCurrentRoute(name);
          } else {
            navigation.navigate(name, params);
          }
        }}} />;
      case 'CheckInOut':
        return <CheckInOutScreen navigation={{ ...navigation, navigate: (name, params) => {
          if (['Dashboard', 'CheckInOut', 'Settings'].includes(name)) {
            setCurrentRoute(name);
          } else {
            navigation.navigate(name, params);
          }
        }}} />;
      case 'Settings':
        return <SettingsScreen navigation={{ ...navigation, navigate: (name, params) => {
          if (['Dashboard', 'CheckInOut', 'Settings'].includes(name)) {
            setCurrentRoute(name);
          } else {
            navigation.navigate(name, params);
          }
        }}} />;
      default:
        return <DashboardScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader 
        navigation={{ navigate: setCurrentRoute }} 
        currentRoute={currentRoute} 
      />
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
    </View>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require('../../assets/mascot-large.png')}
          style={styles.loadingMascot}
          resizeMode="contain"
        />
        <Text style={styles.loadingText}>Henteklar</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="ChildProfile"
              component={ChildProfileScreen}
              options={{
                headerShown: true,
                headerTitle: '',
                headerBackTitle: 'Tilbake',
                headerTintColor: colors.neutral[600],
                headerStyle: {
                  backgroundColor: colors.neutral[50],
                },
                headerShadowVisible: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexWrap: 'wrap',
    gap: 12,
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerMascot: {
    width: 36,
    height: 36,
  },
  headerLogoText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary[600],
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    padding: 4,
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: colors.primary[500],
  },
  navItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[600],
  },
  navItemTextActive: {
    color: colors.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary[700],
  },
  userText: {
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[800],
  },
  userRole: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.neutral[100],
  },
  logoutText: {
    fontSize: 14,
    color: colors.neutral[600],
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  screenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[50],
  },
  loadingMascot: {
    width: 120,
    height: 120,
  },
  loadingText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary[600],
    marginTop: 16,
  },
});

export default AppNavigator;
