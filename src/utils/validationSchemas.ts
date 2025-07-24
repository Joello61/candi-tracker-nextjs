import { z } from 'zod';

// Schémas d'authentification existants
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Format d\'email invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis'),
  recaptchaToken: z
    .string()
    .optional(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Format d\'email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
    ),
  recaptchaToken: z
    .string()
    .optional(),
  confirmPassword: z
    .string()
    .min(1, 'La confirmation du mot de passe est requise'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// 🆕 NOUVEAUX SCHÉMAS POUR LA 2FA

// Schéma pour la vérification email
export const verifyEmailSchema = z.object({
  userId: z
    .string()
    .min(1, 'UserId requis'),
  code: z
    .string()
    .length(6, 'Le code doit contenir 6 chiffres')
    .regex(/^\d{6}$/, 'Le code doit être numérique'),
});

// Schéma pour la vérification 2FA
export const verify2FASchema = z.object({
  userId: z
    .string()
    .min(1, 'UserId requis'),
  code: z
    .string()
    .length(6, 'Le code doit contenir 6 chiffres')
    .regex(/^\d{6}$/, 'Le code doit être numérique'),
});

// Schéma pour le renvoi de code
export const resendCodeSchema = z.object({
  userId: z
    .string()
    .min(1, 'UserId requis'),
  type: z
    .enum(['EMAIL_VERIFICATION', 'TWO_FACTOR_AUTH'], {
      errorMap: () => ({ message: 'Type invalide. Utilisez EMAIL_VERIFICATION ou TWO_FACTOR_AUTH' })
    })
});

// Schéma pour les paramètres de sécurité 2FA
export const toggle2FASchema = z.object({
  enabled: z
    .boolean({
      required_error: 'Le paramètre "enabled" est requis',
      invalid_type_error: 'Le paramètre "enabled" doit être un booléen'
    })
});

// Schéma pour les paramètres utilisateur (AVEC enabled2FA)
export const updateUserSettingsSchema = z.object({
  theme: z
    .enum(['light', 'dark', 'system'])
    .optional(),
  language: z
    .string()
    .min(2, 'Code de langue invalide')
    .max(5, 'Code de langue trop long')
    .optional(),
  timezone: z
    .string()
    .min(1, 'Timezone requise')
    .optional(),
  dateFormat: z
    .enum(['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd'])
    .optional(),
  timeFormat: z
    .enum(['24h', '12h'])
    .optional(),
  sidebarCollapsed: z
    .boolean()
    .optional(),
  itemsPerPage: z
    .number()
    .int()
    .min(5, 'Minimum 5 éléments par page')
    .max(100, 'Maximum 100 éléments par page')
    .optional(),
  defaultApplicationView: z
    .enum(['list', 'grid', 'cards'])
    .optional(),
  showWelcomeMessage: z
    .boolean()
    .optional(),
  defaultDashboardTab: z
    .string()
    .min(1, 'Onglet par défaut requis')
    .optional(),
  // 🆕 NOUVEAU : Paramètre 2FA
  enabled2FA: z
    .boolean()
    .optional(),
});

// Schéma pour le profil utilisateur
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .optional(),
  email: z
    .string()
    .email('Format d\'email invalide')
    .optional(),
  avatar: z
    .string()
    .url('URL d\'avatar invalide')
    .optional()
    .or(z.literal(''))
    .or(z.null()),
});

// Schéma pour le changement de mot de passe
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .optional(),
  newPassword: z
    .string()
    .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
    ),
  confirmPassword: z
    .string()
    .min(1, 'La confirmation du mot de passe est requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Format d\'email invalide'),
});

// Schéma pour la réinitialisation avec code
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Format d\'email invalide'),
  code: z
    .string()
    .length(6, 'Le code doit contenir 6 chiffres')
    .regex(/^\d{6}$/, 'Le code doit être numérique'),
  newPassword: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
    ),
  confirmPassword: z
    .string()
    .min(1, 'La confirmation du mot de passe est requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// Schéma pour vérifier un code de réinitialisation
export const verifyResetCodeSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Format d\'email invalide'),
  code: z
    .string()
    .length(6, 'Le code doit contenir 6 chiffres')
    .regex(/^\d{6}$/, 'Le code doit être numérique'),
});

// Types dérivés des schémas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// 🆕 NOUVEAUX TYPES
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type Verify2FAFormData = z.infer<typeof verify2FASchema>;
export type ResendCodeFormData = z.infer<typeof resendCodeSchema>;
export type Toggle2FAFormData = z.infer<typeof toggle2FASchema>;

export type UpdateUserSettingsFormData = z.infer<typeof updateUserSettingsSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type VerifyResetCodeFormData = z.infer<typeof verifyResetCodeSchema>;