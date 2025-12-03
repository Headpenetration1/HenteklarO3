import { StyleSheet, Platform } from 'react-native';
import colors from './colors';

export const typography = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    web: 'DM Sans, system-ui, sans-serif',
  }),
  displayFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    web: 'Nunito, system-ui, sans-serif',
  }),
};

export const shadows = {
  soft: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 15,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    },
  }),
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    },
  }),
};

export const commonStyles = StyleSheet.create({
  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    ...shadows.card,
  },
  cardHover: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    ...shadows.card,
  },

  // Buttons
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primary[400],
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  btnSecondaryText: {
    color: colors.neutral[700],
    fontSize: 16,
    fontWeight: '500',
  },
  btnSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.success[500],
  },
  btnSuccessText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  btnDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.red[500],
  },
  btnDangerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  btnSmall: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnLarge: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },

  // Inputs
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    fontSize: 16,
    color: colors.neutral[800],
  },

  // Badges
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeSuccess: {
    backgroundColor: colors.success[100],
  },
  badgeSuccessText: {
    color: colors.success[700],
    fontSize: 14,
    fontWeight: '500',
  },
  badgeNeutral: {
    backgroundColor: colors.neutral[100],
  },
  badgeNeutralText: {
    color: colors.neutral[600],
    fontSize: 14,
    fontWeight: '500',
  },

  // Avatar
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: colors.primary[100],
  },
  avatarText: {
    color: colors.primary[700],
    fontWeight: '600',
  },
  avatarSm: {
    width: 32,
    height: 32,
  },
  avatarMd: {
    width: 40,
    height: 40,
  },
  avatarLg: {
    width: 56,
    height: 56,
  },
});

export default { colors, typography, shadows, commonStyles };
