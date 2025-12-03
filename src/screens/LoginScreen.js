import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components';
import { colors } from '../theme';

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError(t('loginPage.fillAllFields'));
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError(t('loginPage.loginError'));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[colors.primary[50], colors.white, colors.primary[100]]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo og tittel */}
            <View style={styles.header}>
              <Image
                source={require('../../assets/mascot-large.png')}
                style={styles.mascot}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>Henteklar</Text>
              <Text style={styles.subtitle}>{t('loginPage.subtitle')}</Text>
            </View>

            {/* Login-kort */}
            <Card style={styles.card}>
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              <Input
                label={t('loginPage.email')}
                placeholder={t('loginPage.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                icon={
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.neutral[400]}
                  />
                }
                style={styles.input}
              />

              <Input
                label={t('loginPage.password')}
                placeholder={t('loginPage.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                icon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={colors.neutral[400]}
                  />
                }
                style={styles.input}
              />

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={colors.white}
                      />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    {t('loginPage.rememberMe')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>
                    {t('loginPage.forgotPassword')}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                title={isLoading ? t('loginPage.loggingIn') : t('login')}
                variant="primary"
                size="large"
                loading={isLoading}
                disabled={isLoading}
                onPress={handleLogin}
                style={styles.loginButton}
                icon={
                  !isLoading && (
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={colors.white}
                    />
                  )
                }
                iconPosition="right"
              />
            </Card>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>{t('loginPage.loginProblems')} </Text>
              <TouchableOpacity>
                <Text style={styles.footerLink}>
                  {t('loginPage.contactKindergarten')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mascot: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary[600],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[500],
  },
  card: {
    padding: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  errorContainer: {
    backgroundColor: colors.red[50],
    borderWidth: 1,
    borderColor: colors.red[200],
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: colors.red[700],
    fontSize: 14,
  },
  input: {
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  forgotPassword: {
    fontSize: 14,
    color: colors.primary[600],
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.neutral[500],
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary[600],
    fontWeight: '500',
  },
});

export default LoginScreen;
