'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail, Loader2, KeyRound, Eye, EyeOff, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VerificationCodeInput } from '@/components/auth/VerificationCodeInput';

import { useForgotPassword } from '@/hooks/useForgotPassword';
import { 
  forgotPasswordSchema, 
  resetPasswordSchema,
  type ForgotPasswordFormData,
  type ResetPasswordFormData 
} from '@/utils/validationSchemas';

export const ForgotPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState(''); // 🆕 État pour le code

  const {
    flowState,
    isLoading,
    requestResetCode,
    verifyCode,
    resetPassword,
    setFlowState,
  } = useForgotPassword();

  // Formulaire pour demander le code
  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Formulaire pour réinitialiser le mot de passe
  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: flowState.email || '',
    }
  });

  // Mettre à jour l'email dans le formulaire de reset quand il change
  React.useEffect(() => {
    if (flowState.email) {
      resetForm.setValue('email', flowState.email);
    }
  }, [flowState.email, resetForm]);

  // === HANDLERS ===

  const handleRequestCode = async (data: ForgotPasswordFormData) => {
    try {
      setError(null);
      await requestResetCode(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.error || 'Une erreur est survenue');
    }
  };

  const handleCodeComplete = async (code: string) => {
    if (!flowState.email) return;

    try {
      setError(null);
      const isValid = await verifyCode({ 
        email: flowState.email, 
        code 
      });
      
      if (isValid) {
        resetForm.setValue('code', code);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.error || 'Code invalide');
    }
  };

  // 🆕 Handler pour les changements du code
  const handleCodeChange = (code: string) => {
    setVerificationCode(code);
    
    // Auto-vérifier quand le code est complet
    if (code.length === 6) {
      handleCodeComplete(code);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    try {
      setError(null);
      await resetPassword(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.error || 'Une erreur est survenue');
    }
  };

  const handleBackToEmail = () => {
    setError(null);
    setVerificationCode(''); // 🆕 Reset du code
    setFlowState({ step: 'email' });
    emailForm.reset();
  };

  const handleBackToCode = () => {
    setError(null);
    setFlowState({ step: 'code' });
  };

  // === RENDU SELON L'ÉTAPE ===

  if (flowState.step === 'email') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Mot de passe oublié
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entrez votre email pour recevoir un code de réinitialisation
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={emailForm.handleSubmit(handleRequestCode)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                className={`pl-10 ${emailForm.formState.errors.email ? 'border-red-500' : ''}`}
                {...emailForm.register('email')}
                autoComplete="email"
              />
            </div>
            {emailForm.formState.errors.email && (
              <p className="text-sm text-red-500">{emailForm.formState.errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Envoyer le code
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  if (flowState.step === 'code') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Code de vérification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Un code a été envoyé à <strong>{flowState.email}</strong>
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Code de vérification</Label>
            <VerificationCodeInput
              length={6}
              value={verificationCode}
              onChange={handleCodeChange}
              onComplete={handleCodeComplete}
              disabled={isLoading}
              autoFocus
            />
            <p className="text-xs text-gray-500">
              Le code expire dans 15 minutes
            </p>
          </div>

          {flowState.codeVerified && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              Code vérifié avec succès
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBackToEmail}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <Button
            onClick={() => setFlowState({ step: 'password' })}
            disabled={!flowState.codeVerified}
            className="flex-1"
          >
            Continuer
          </Button>
        </div>
      </div>
    );
  }

  if (flowState.step === 'password') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Nouveau mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choisissez un nouveau mot de passe sécurisé
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
          {/* Email (hidden) */}
          <input type="hidden" {...resetForm.register('email')} />
          <input type="hidden" {...resetForm.register('code')} />

          {/* Nouveau mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre nouveau mot de passe"
                className={`pl-10 pr-10 ${resetForm.formState.errors.newPassword ? 'border-red-500' : ''}`}
                {...resetForm.register('newPassword')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {resetForm.formState.errors.newPassword && (
              <p className="text-sm text-red-500">{resetForm.formState.errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirmation mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmer votre mot de passe"
                className={`pl-10 pr-10 ${resetForm.formState.errors.confirmPassword ? 'border-red-500' : ''}`}
                {...resetForm.register('confirmPassword')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {resetForm.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">{resetForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToCode}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Réinitialisation...
                </>
              ) : (
                <>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Réinitialiser
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  if (flowState.step === 'completed') {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Mot de passe réinitialisé !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Votre mot de passe a été modifié avec succès.<br />
            Vous allez être redirigé vers votre tableau de bord.
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center text-sm text-green-600">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Redirection en cours...
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ForgotPasswordPage;