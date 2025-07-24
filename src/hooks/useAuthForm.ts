'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import type { LoginForm, RegisterForm } from '@/types';
import { AuthStep } from '@/types/auth';

interface UseAuthFormReturn {
  isLoading: boolean;
  handleLogin: (data: LoginForm) => Promise<void>;
  handleRegister: (data: RegisterForm) => Promise<void>;
}

export const useAuthForm = (): UseAuthFormReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, authFlow } = useAuth();
  const navigate = useRouter();

  // Écouter les changements d'authFlow pour naviguer automatiquement
  useEffect(() => {
    // Ne pas naviguer si on est en cours de chargement
    if (authFlow.isLoading) return;

    switch (authFlow.step) {
      case AuthStep.EMAIL_VERIFICATION:
        navigate.replace('/verify-email');
        break;
      case AuthStep.TWO_FACTOR_AUTH:
        navigate.replace('/verify-2fa');
        break;
      case AuthStep.COMPLETED:
        navigate.replace('/dashboard');
        break;
      case AuthStep.LOGIN:
      default:
        // Rester sur la page de login
        break;
    }
  }, [authFlow.step, authFlow.isLoading, navigate]);

  const handleLogin = async (data: LoginForm): Promise<void> => {
    setIsLoading(true);
    try {
      await login(data);
      // La navigation sera gérée automatiquement par l'useEffect=
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterForm): Promise<void> => {
    setIsLoading(true);
    try {
      await register(data);
      // La navigation sera gérée automatiquement par l'useEffect
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
    handleRegister,
  };
};