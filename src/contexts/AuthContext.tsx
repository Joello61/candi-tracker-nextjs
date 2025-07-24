'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { 
  type User, 
  type LoginForm, 
  type RegisterForm,
} from '@/types';
import authService from '@/services/authService';
import { toast } from 'sonner';
import { type AuthFlowState, AuthStep, type LoginResponse, type AuthResponse, type TwoFactorResponse, type EmailVerificationResponse, type RegisterResponse, type ForgotPasswordForm, type ForgotPasswordResponse, type ResetPasswordForm, type ResetPasswordResponse } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authFlow: AuthFlowState;
  login: (data: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  // Méthodes 2FA
  setAuthFlow: (flow: AuthFlowState) => void;
  clearAuthFlow: () => void;
  
  forgotPassword: (data: ForgotPasswordForm) => Promise<ForgotPasswordResponse>;
  resetPassword: (data: ResetPasswordForm) => Promise<ResetPasswordResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authFlow, setAuthFlowState] = useState<AuthFlowState>({
    step: AuthStep.LOGIN
  });

  // Initialiser l'état d'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setAuthFlowState({ step: AuthStep.COMPLETED });
          } else {
            // Récupérer le profil depuis l'API si pas dans le localStorage
            const profile = await authService.getProfile();
            setUser(profile);
            setAuthFlowState({ step: AuthStep.COMPLETED });
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Token invalide, nettoyer
        authService.logout();
        setAuthFlowState({ step: AuthStep.LOGIN });
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Gestion du flux d'authentification
  const setAuthFlow = (flow: AuthFlowState) => {
    setAuthFlowState(flow);
  };

  const clearAuthFlow = () => {
    setAuthFlowState({ step: AuthStep.LOGIN });
  };

  // Connexion (peut déclencher différents flux)
  const login = async (data: LoginForm): Promise<void> => {
    try {
      setIsLoading(true);
      setAuthFlowState({ step: AuthStep.LOGIN, isLoading: true });

      const response: LoginResponse = await authService.login(data);

      // Analyser le type de réponse
      if ('user' in response.data && 'token' in response.data) {
        // Connexion directe réussie
        const authData = response.data as AuthResponse;
        setUser(authData.user);
        setAuthFlowState({ step: AuthStep.COMPLETED });
        toast.success('Connexion réussie !');
        
      } else if ('requires2FA' in response.data) {
        // 2FA requis
        const twoFactorData = response.data as TwoFactorResponse;
        setAuthFlowState({
          step: AuthStep.TWO_FACTOR_AUTH,
          userId: twoFactorData.userId,
          email: twoFactorData.email,
          requires2FA: true
        });
        toast.info('Code de vérification 2FA envoyé par email');
        
      } else if ('requiresEmailVerification' in response.data) {
        // Email non vérifié lors de la connexion
        const emailData = response.data as EmailVerificationResponse;
        setAuthFlowState({
          step: AuthStep.EMAIL_VERIFICATION,
          userId: emailData.userId,
          email: emailData.email,
          requiresEmailVerification: true
        });
        toast.info('Votre email n\'est pas vérifié. Un code de vérification a été envoyé.');
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Gestion spéciale pour EMAIL_NOT_VERIFIED
      if (error.code === 'EMAIL_NOT_VERIFIED' && error.data) {
        setAuthFlowState({
          step: AuthStep.EMAIL_VERIFICATION,
          userId: error.data.userId,
          email: error.data.email,
          requiresEmailVerification: true
        });
        toast.info('Votre email n\'est pas vérifié. Un code de vérification a été envoyé.');
        return; // Ne pas throw l'erreur
      } else {
        setAuthFlowState({ step: AuthStep.LOGIN });
        toast.error(error.error || 'Erreur de connexion');
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Inscription (peut déclencher vérification email)
  const register = async (data: RegisterForm): Promise<void> => {
    try {
      setIsLoading(true);
      setAuthFlowState({ step: AuthStep.LOGIN, isLoading: true });

      const response: RegisterResponse = await authService.register(data);

      // Analyser le type de réponse
      if ('user' in response.data && 'token' in response.data) {
        // Inscription + connexion directe (ancien comportement)
        const authData = response.data as AuthResponse;
        setUser(authData.user);
        setAuthFlowState({ step: AuthStep.COMPLETED });
        toast.success('Compte créé avec succès !');
        
      } else if ('requiresEmailVerification' in response.data) {
        // Vérification email requise (nouveau comportement)
        const emailData = response.data as EmailVerificationResponse;
        setAuthFlowState({
          step: AuthStep.EMAIL_VERIFICATION,
          userId: emailData.userId,
          email: emailData.email,
          requiresEmailVerification: true
        });
        toast.success('Compte créé ! Veuillez vérifier votre email.');
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAuthFlowState({ step: AuthStep.LOGIN });
      toast.error(error.error || 'Erreur lors de la création du compte');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (data: ForgotPasswordForm): Promise<ForgotPasswordResponse> => {
    try {
      const response = await authService.forgotPassword(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (data: ResetPasswordForm): Promise<ResetPasswordResponse> => {
    try {
      const response = await authService.resetPassword(data);
      
      // Si la réinitialisation réussit, l'utilisateur est automatiquement connecté
      if (response.data.user && response.data.token) {
        setUser(response.data.user);
        setAuthFlowState({ step: AuthStep.COMPLETED });
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Déconnexion
  const logout = (): void => {
    authService.logout();
    setUser(null);
    setAuthFlowState({ step: AuthStep.LOGIN });
    toast.success('Déconnexion réussie');
  };

  // Rafraîchir les données utilisateur
  const refreshUser = async (): Promise<void> => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du profil:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    authFlow,
    login,
    register,
    logout,
    refreshUser,
    setAuthFlow,
    clearAuthFlow,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le context d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};