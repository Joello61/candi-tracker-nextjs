'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { toast } from 'sonner';
import type {
  ForgotPasswordForm,
  ResetPasswordForm,
  VerifyResetCodeForm,
  ForgotPasswordFlowState,
} from '@/types/auth';

interface UseForgotPasswordReturn {
  flowState: ForgotPasswordFlowState;
  isLoading: boolean;
  requestResetCode: (data: ForgotPasswordForm) => Promise<void>;
  verifyCode: (data: VerifyResetCodeForm) => Promise<boolean>;
  resetPassword: (data: ResetPasswordForm) => Promise<void>;
  setFlowState: (state: Partial<ForgotPasswordFlowState>) => void;
  resetFlow: () => void;
}

export const useForgotPassword = (): UseForgotPasswordReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [flowState, setFlowStateInternal] = useState<ForgotPasswordFlowState>({
    step: 'email',
  });
  const navigate = useRouter();

  const setFlowState = (state: Partial<ForgotPasswordFlowState>) => {
    setFlowStateInternal((prev) => ({ ...prev, ...state }));
  };

  const resetFlow = () => {
    setFlowStateInternal({ step: 'email' });
  };

  /**
   * Étape 1: Demander un code de réinitialisation
   */
  const requestResetCode = async (data: ForgotPasswordForm): Promise<void> => {
    try {
      setIsLoading(true);
      setFlowState({ isLoading: true });

      const response = await authService.forgotPassword(data);

      // Toujours un succès pour éviter l'énumération d'emails
      setFlowState({
        step: 'code',
        email: data.email,
        codeRequested: true,
        isLoading: false,
      });

      toast.success(response.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFlowState({ isLoading: false });
      toast.error(
        error.error || 'Erreur lors de la demande de réinitialisation'
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Étape 2: Vérifier le code (optionnel, pour UX)
   */
  const verifyCode = async (data: VerifyResetCodeForm): Promise<boolean> => {
    try {
      setIsLoading(true);

      const response = await authService.verifyResetCode(data);

      if (response.data.valid) {
        setFlowState({
          step: 'password',
          codeVerified: true,
        });
        toast.success('Code vérifié avec succès');
        return true;
      } else {
        toast.error('Code invalide ou expiré');
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.error || 'Code invalide ou expiré');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Étape 3: Réinitialiser le mot de passe
   */
  const resetPassword = async (data: ResetPasswordForm): Promise<void> => {
    try {
      setIsLoading(true);
      setFlowState({ isLoading: true });

      const response = await authService.resetPassword(data);

      // L'utilisateur est automatiquement connecté
      setFlowState({
        step: 'completed',
        isLoading: false,
      });

      toast.success(response.message);

      // Rediriger vers le dashboard après un court délai
      setTimeout(() => {
        navigate.replace('/dashboard');
      }, 1500);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFlowState({ isLoading: false });

      // Gestion des erreurs spécifiques
      if (error.code === 'INVALID_RESET_CODE') {
        toast.error(
          'Code invalide ou expiré. Veuillez demander un nouveau code.'
        );
        setFlowState({ step: 'email' });
      } else if (error.code === 'TOO_MANY_ATTEMPTS') {
        toast.error('Trop de tentatives. Veuillez demander un nouveau code.');
        setFlowState({ step: 'email' });
      } else {
        toast.error(error.error || 'Erreur lors de la réinitialisation');
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    flowState,
    isLoading,
    requestResetCode,
    verifyCode,
    resetPassword,
    setFlowState,
    resetFlow,
  };
};
