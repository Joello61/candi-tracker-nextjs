import type { UserRole } from "./user";

// src/types/auth.ts - Nouveaux types pour la 2FA
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string | null;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// === NOUVEAUX TYPES POUR LA 2FA ===

// Réponse d'authentification traditionnelle (connexion directe)
export interface AuthResponse {
  user: User;
  token: string;
}

// Réponse lors de l'inscription nécessitant une vérification email
export interface EmailVerificationResponse {
  requiresEmailVerification: boolean;
  email: string;
  userId: string;
}

// Réponse lors de la connexion avec 2FA activée
export interface TwoFactorResponse {
  requires2FA: boolean;
  userId: string;
  email: string;
  step: '2FA_VERIFICATION';
}

// Réponse unifiée du login selon le cas
export type LoginResponse = 
  | { message: string; data: AuthResponse }                    // Connexion directe
  | { message: string; data: TwoFactorResponse }               // 2FA requis
  | { message: string; data: EmailVerificationResponse }       // Email non vérifié

// Réponse unifiée du register
export type RegisterResponse = 
  | { message: string; data: AuthResponse }                    // Ancien comportement (direct)
  | { message: string; data: EmailVerificationResponse }       // Nouveau comportement (email requis)

// Requêtes de vérification
export interface VerifyEmailRequest {
  userId: string;
  code: string;
}

export interface Verify2FARequest {
  userId: string;
  code: string;
}

export interface ResendCodeRequest {
  userId: string;
  type: 'EMAIL_VERIFICATION' | 'TWO_FACTOR_AUTH';
}

// Réponses de vérification
export interface VerificationSuccessResponse {
  message: string;
  data: AuthResponse;
}

export interface ResendCodeResponse {
  message: string;
  data?: {
    nextAllowedAt?: string;
  };
}

// État du flux d'authentification
export interface AuthFlowState {
  step: AuthStep;
  userId?: string;
  email?: string;
  requires2FA?: boolean;
  requiresEmailVerification?: boolean;
  isLoading?: boolean;
}

// src/types/auth.ts - Nouveaux types pour la 2FA
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string | null;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// === NOUVEAUX TYPES POUR LA 2FA ===

// États d'authentification possibles
export const AuthStep = {
  LOGIN: 'LOGIN',
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  TWO_FACTOR_AUTH: 'TWO_FACTOR_AUTH',
  COMPLETED: 'COMPLETED',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',        // NOUVEAU
  RESET_PASSWORD: 'RESET_PASSWORD', 
} as const;
export type AuthStep = (typeof AuthStep)[keyof typeof AuthStep];

// Réponse d'authentification traditionnelle (connexion directe)
export interface AuthResponse {
  user: User;
  token: string;
}

// Réponse lors de l'inscription nécessitant une vérification email
export interface EmailVerificationResponse {
  requiresEmailVerification: boolean;
  email: string;
  userId: string;
}

// Réponse lors de la connexion avec 2FA activée
export interface TwoFactorResponse {
  requires2FA: boolean;
  userId: string;
  email: string;
  step: '2FA_VERIFICATION';
}

// Requêtes de vérification
export interface VerifyEmailRequest {
  userId: string;
  code: string;
}

export interface Verify2FARequest {
  userId: string;
  code: string;
}

export interface ResendCodeRequest {
  userId: string;
  type: 'EMAIL_VERIFICATION' | 'TWO_FACTOR_AUTH';
}

// Réponses de vérification
export interface VerificationSuccessResponse {
  message: string;
  data: AuthResponse;
}

export interface ResendCodeResponse {
  message: string;
  data?: {
    nextAllowedAt?: string;
  };
}

// État du flux d'authentification
export interface AuthFlowState {
  step: AuthStep;
  userId?: string;
  email?: string;
  requires2FA?: boolean;
  requiresEmailVerification?: boolean;
  isLoading?: boolean;
}

// Codes d'erreur spécifiques à l'authentification
export const AuthErrorCode = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',  // 🆕 IMPORTANT pour la gestion côté frontend
  SOCIAL_ACCOUNT_ONLY: 'SOCIAL_ACCOUNT_ONLY',
  INVALID_VERIFICATION_CODE: 'INVALID_VERIFICATION_CODE',
  INVALID_2FA_CODE: 'INVALID_2FA_CODE',
  TWO_FACTOR_SEND_ERROR: 'TWO_FACTOR_SEND_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;
export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

// 🆕 Type d'erreur API avec données additionnelles
export interface ApiError {
  error: string;
  code?: AuthErrorCode;
  data?: {
    userId?: string;
    email?: string;
    requiresEmailVerification?: boolean;
    nextAllowedAt?: string;
  };
}

// Formulaires d'authentification
export interface LoginForm {
  email: string;
  password: string;
  recaptchaToken?: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  recaptchaToken?: string;
}

// === TYPES POUR LES PARAMÈTRES DE SÉCURITÉ ===

export interface UserSecuritySettings {
  enabled2FA: boolean;
  hasPassword: boolean;
  linkedAccounts: {
    google: boolean;
    linkedin: boolean;
  };
  lastLoginAt: Date | null;
  emailVerified: boolean;
}

export interface Toggle2FARequest {
  enabled: boolean;
}

export interface Toggle2FAResponse {
  enabled2FA: boolean;
}

// Formulaires d'authentification
export interface LoginForm {
  email: string;
  password: string;
  recaptchaToken?: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  recaptchaToken?: string;
}

// === TYPES POUR LES PARAMÈTRES DE SÉCURITÉ ===

export interface UserSecuritySettings {
  enabled2FA: boolean;
  hasPassword: boolean;
  linkedAccounts: {
    google: boolean;
    linkedin: boolean;
  };
  lastLoginAt: Date | null;
  emailVerified: boolean;
}

export interface Toggle2FARequest {
  enabled: boolean;
}

export interface Toggle2FAResponse {
  enabled2FA: boolean;
}

// === AJOUTS DANS src/types/auth.ts ===

// Ajouter ces nouveaux types aux types existants :

// === TYPES POUR FORGOT PASSWORD ===

// Requêtes
export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyResetCodeForm {
  email: string;
  code: string;
}

// Réponses du backend
export interface ForgotPasswordResponse {
  message: string;
  data: {
    email: string;
    codeRequested: boolean;
  };
}

export interface ResetPasswordResponse {
  message: string;
  data: AuthResponse; // L'utilisateur est automatiquement connecté
}

export interface VerifyResetCodeResponse {
  message: string;
  data: {
    valid: boolean;
    expiresAt: string;
    remainingAttempts: number;
  };
}

// États du flow forgot password
export interface ForgotPasswordFlowState {
  step: 'email' | 'code' | 'password' | 'completed';
  email?: string;
  codeRequested?: boolean;
  codeVerified?: boolean;
  isLoading?: boolean;
}

// Codes d'erreur spécifiques au reset password
export const PasswordResetErrorCode = {
  INVALID_RESET_CODE: 'INVALID_RESET_CODE',
  TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
} as const;
export type PasswordResetErrorCode = (typeof PasswordResetErrorCode)[keyof typeof PasswordResetErrorCode];