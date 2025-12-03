import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card } from '../components';
import { colors } from '../theme';

const { width } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: 'time-outline',
      title: t('features.quickCheckIn'),
      description: t('features.quickCheckInDesc'),
    },
    {
      icon: 'shield-checkmark-outline',
      title: t('features.secure'),
      description: t('features.secureDesc'),
    },
    {
      icon: 'phone-portrait-outline',
      title: t('features.everywhere'),
      description: t('features.everywhereDesc'),
    },
    {
      icon: 'people-outline',
      title: t('features.overview'),
      description: t('features.overviewDesc'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[colors.primary[50], colors.white, colors.primary[100]]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLogo}>
              <Image
                source={require('../../assets/mascot.png')}
                style={styles.headerMascot}
                resizeMode="contain"
              />
              <Text style={styles.headerTitle}>Henteklar</Text>
            </View>
            <Button
              title={t('login')}
              variant="primary"
              size="small"
              onPress={() => navigation.navigate('Login')}
            />
          </View>

          {/* Hero Section */}
          <View style={styles.hero}>
            {/* Large Mascot */}
            <Image
              source={require('../../assets/mascot-large.png')}
              style={styles.heroMascot}
              resizeMode="contain"
            />

            <View style={styles.tagline}>
              <Ionicons
                name="happy-outline"
                size={16}
                color={colors.primary[700]}
              />
              <Text style={styles.taglineText}>{t('landing.tagline')}</Text>
            </View>

            <Text style={styles.heroTitle}>
              {t('landing.title')}{' '}
              <Text style={styles.heroHighlight}>
                {t('landing.titleHighlight')}
              </Text>
            </Text>

            <Text style={styles.heroSubtitle}>{t('landing.subtitle')}</Text>

            <View style={styles.heroButtons}>
              <Button
                title={t('landing.getStarted')}
                variant="primary"
                size="large"
                onPress={() => navigation.navigate('Login')}
                icon={
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={colors.white}
                  />
                }
                iconPosition="right"
              />
              <Button
                title={t('landing.seeFeatures')}
                variant="secondary"
                size="large"
              />
            </View>

            {/* Stats Preview */}
            <Card style={styles.statsCard}>
              <View style={styles.statsInner}>
                <View style={styles.statsDots}>
                  <View
                    style={[styles.dot, { backgroundColor: colors.primary[300] }]}
                  />
                  <View
                    style={[styles.dot, { backgroundColor: colors.primary[400] }]}
                  />
                  <View
                    style={[styles.dot, { backgroundColor: colors.primary[500] }]}
                  />
                </View>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Barn inne</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: colors.primary[600] }]}>
                      8
                    </Text>
                    <Text style={styles.statLabel}>Sjekket inn i dag</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: colors.primary[700] }]}>
                      4
                    </Text>
                    <Text style={styles.statLabel}>Hentet</Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>{t('landing.featuresTitle')}</Text>
            <Text style={styles.featuresSubtitle}>
              {t('landing.featuresSubtitle')}
            </Text>

            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Card key={index} style={styles.featureCard}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons
                      name={feature.icon}
                      size={24}
                      color={colors.primary[500]}
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </Card>
              ))}
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <View style={styles.ctaCard}>
              <Text style={styles.ctaTitle}>{t('landing.ctaTitle')}</Text>
              <Text style={styles.ctaSubtitle}>{t('landing.ctaSubtitle')}</Text>
              <Button
                title={t('landing.loginNow')}
                style={styles.ctaButton}
                textStyle={styles.ctaButtonText}
                onPress={() => navigation.navigate('Login')}
                icon={
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={colors.primary[600]}
                  />
                }
                iconPosition="right"
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerLogo}>
              <Image
                source={require('../../assets/mascot.png')}
                style={styles.footerMascot}
                resizeMode="contain"
              />
              <Text style={styles.footerTitle}>Henteklar</Text>
            </View>
            <Text style={styles.footerText}>{t('landing.copyright')}</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerMascot: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary[600],
  },
  hero: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
  },
  heroMascot: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  tagline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary[100],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  taglineText: {
    color: colors.primary[700],
    fontSize: 14,
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: width > 600 ? 48 : 32,
    fontWeight: '700',
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: 16,
  },
  heroHighlight: {
    color: colors.primary[400],
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 24,
    marginBottom: 32,
  },
  heroButtons: {
    flexDirection: width > 500 ? 'row' : 'column',
    gap: 12,
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
  },
  statsCard: {
    width: '100%',
    maxWidth: 500,
    padding: 16,
  },
  statsInner: {
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  statsDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary[500],
  },
  statLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 4,
  },
  featuresSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: 12,
  },
  featuresSubtitle: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  featureCard: {
    width: width > 600 ? '45%' : '100%',
    maxWidth: 350,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: colors.neutral[600],
    lineHeight: 22,
  },
  ctaSection: {
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  ctaCard: {
    backgroundColor: colors.primary[400],
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: colors.primary[100],
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  ctaButtonText: {
    color: colors.primary[600],
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerMascot: {
    width: 32,
    height: 32,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[600],
  },
  footerText: {
    fontSize: 14,
    color: colors.neutral[500],
  },
});

export default LandingScreen;
