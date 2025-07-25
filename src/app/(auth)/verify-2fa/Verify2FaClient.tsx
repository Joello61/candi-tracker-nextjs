'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Loader2, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VerificationCodeInput } from '@/components/auth/VerificationCodeInput';

import { useAuth } from '@/contexts/AuthContext';
import authService from '@/services/authService';
import { AuthStep } from '@/types/auth';

export const TwoFactorVerificationClient: React.FC = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const { authFlow, setAuthFlow, clearAuthFlow, refreshUser } = useAuth();
  const navigate = useRouter();

  // Rediriger si pas dans le bon état
  useEffect(() => {
    if (authFlow.step !== AuthStep.TWO_FACTOR_AUTH || !authFlow.userId) {
      navigate.replace('/auth/login');
    }
  }, [authFlow.step, authFlow.userId, navigate]);

  // Gérer le cooldown de renvoi
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify2FA = async (verificationCode: string) => {
    if (!authFlow.userId || verificationCode.length !== 6) return;

    try {
      setIsVerifying(true);
      setError(null);

      await authService.verify2FA({
        userId: authFlow.userId,
        code: verificationCode
      });

      // Rafraîchir les données utilisateur
      await refreshUser();

      // Marquer comme complété et laisser useAuthForm gérer la navigation
      setAuthFlow({ step: AuthStep.COMPLETED });
      toast.success('Authentification 2FA réussie !');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.error || 'Code 2FA invalide');
      setCode(''); // Vider le code en cas d'erreur
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!authFlow.userId || resendCooldown > 0) return;

    try {
      setIsResending(true);
      setError(null);

      await authService.resendCode({
        userId: authFlow.userId,
        type: 'TWO_FACTOR_AUTH'
      });

      toast.success('Code 2FA renvoyé par email');
      setResendCooldown(60); // 60 secondes de cooldown

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.error || 'Erreur lors du renvoi du code');
      
      // Si rate limited, extraire le temps d'attente
      if (error.code === 'RATE_LIMITED' && error.data?.nextAllowedAt) {
        const nextAllowed = new Date(error.data.nextAllowedAt);
        const now = new Date();
        const cooldownSeconds = Math.ceil((nextAllowed.getTime() - now.getTime()) / 1000);
        
        if (cooldownSeconds > 0) {
          setResendCooldown(cooldownSeconds);
        }
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    clearAuthFlow();
    navigate.push('/auth/login');
  };

  const maskEmail = (email: string) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) {
      return `${localPart[0]}*@${domain}`;
    }
    return `${localPart.substring(0, 2)}****@${domain}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Authentification à deux facteurs
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Nous avons envoyé un code de sécurité à
        </p>
        <p className="text-sm font-medium text-gray-900">
          {maskEmail(authFlow.email || '')}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Code de sécurité 2FA
          </label>
          <VerificationCodeInput
            value={code}
            onChange={setCode}
            onComplete={handleVerify2FA}
            disabled={isVerifying}
            autoFocus
          />
          <p className="text-xs text-gray-500 text-center">
            Saisissez le code à 6 chiffres reçu par email
          </p>
        </div>

        <Button
          onClick={() => handleVerify2FA(code)}
          disabled={code.length !== 6 || isVerifying}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Vérification en cours...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Vérifier le code
            </>
          )}
        </Button>
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600">
          Vous n&apos;avez pas reçu le code ?
        </p>
        
        <Button
          variant="outline"
          onClick={handleResendCode}
          disabled={isResending || resendCooldown > 0}
          className="w-full"
        >
          {isResending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Renvoi en cours...
            </>
          ) : resendCooldown > 0 ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Renvoyer dans {resendCooldown}s
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Renvoyer le code
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Button>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-green-700">
            <p className="font-medium">Sécurité renforcée</p>
            <p className="mt-1">
              Votre compte est protégé par l&apos;authentification à deux facteurs. 
              Ce code expire dans 5 minutes pour votre sécurité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorVerificationClient;