'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, LogIn, Shield, Check } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { OAuthButtons } from '@/components/auth/OAuthButtons';

import { useAuthForm } from '@/hooks/useAuthForm';
import { loginSchema, type LoginFormData } from '@/utils/validationSchemas';
import { Metadata } from 'next';

export const loginMetadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre espace Candi Tracker pour gérer vos candidatures, suivre vos entretiens et optimiser votre recherche d\'emploi.',
  keywords: [
    'connexion',
    'login',
    'se connecter',
    'espace personnel',
    'suivi candidatures',
    'tableau de bord emploi',
    'authentification',
    'accès compte'
  ],
  openGraph: {
    title: 'Connexion à votre espace | Candi Tracker',
    description: 'Accédez à votre tableau de bord personnalisé pour suivre toutes vos candidatures et opportunités d\'emploi.',
    images: [{ url: '/og-login.jpg', width: 1200, height: 630 }],
  }
}

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { isLoading, handleLogin } = useAuthForm();

  const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'Candi Tracker';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      setError(null);
    }
  };

  const onRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setError('reCAPTCHA expiré, veuillez le compléter à nouveau');
  };

  const onRecaptchaError = () => {
    setRecaptchaToken(null);
    setError('Erreur reCAPTCHA, veuillez réessayer');
  };

  const onSubmit = async (data: LoginFormData) => {
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_APP_RECAPTCHA_SITE_KEY;
    
    // Vérifier reCAPTCHA si configuré
    if (recaptchaSiteKey && !recaptchaToken) {
      setError('Veuillez compléter la vérification de sécurité');
      return;
    }

    try {
      setError(null);

      const dataWithRecaptcha = {
        ...data,
        ...(recaptchaToken && { recaptchaToken }),
      };

      await handleLogin(dataWithRecaptcha);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.error || 'Une erreur est survenue lors de la connexion');

      if (recaptchaRef.current) {
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
      }
    }
  };

  const handleDemoFill = () => {
    setValue('email', 'demo@example.com');
    setValue('password', 'Password123!');

    if (recaptchaRef.current) {
      setRecaptchaToken(null);
      recaptchaRef.current.reset();
    }
  };

  // Vérifier si reCAPTCHA est configuré - LOGIQUE SIMPLIFIÉE
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_APP_RECAPTCHA_SITE_KEY;
  const showRecaptcha = Boolean(recaptchaSiteKey) && (
    process.env.NODE_ENV === 'production' || 
    process.env.NODE_ENV === 'development'
  );

  // Pour debug - ajoutez temporairement ceci
  console.log('Debug reCAPTCHA:', {
    recaptchaSiteKey: !!recaptchaSiteKey,
    showRecaptcha,
    nodeEnv: process.env.NODE_ENV
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
        <p className="mt-2 text-sm text-gray-600">
          Connectez-vous à votre compte pour continuer
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* BOUTONS OAUTH */}
      <div className="space-y-4">
        <OAuthButtons isLoading={isLoading} disabled={isLoading} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Ou continuer avec
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@exemple.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Votre mot de passe"
              {...register('password')}
              className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              autoComplete="current-password"
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
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* RECAPTCHA SECTION - LOGIQUE SIMPLIFIÉE */}
        {showRecaptcha && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              Vérification de sécurité
            </Label>
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey!}
                onChange={onRecaptchaChange}
                onExpired={onRecaptchaExpired}
                onError={onRecaptchaError}
                theme="light"
                size="normal"
              />
            </div>
            {recaptchaToken && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                Vérification de sécurité complétée
              </div>
            )}
          </div>
        )}

        {/* Options */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">
              Se souvenir de moi
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || (showRecaptcha && !recaptchaToken)}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Se connecter
            </>
          )}
        </Button>
      </form>

      {/* INDICATEUR DE SÉCURITÉ */}
      {showRecaptcha && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Shield className="h-4 w-4" />
            <span>Connexion protégée par Google reCAPTCHA</span>
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            Nouveau sur {applicationName} ?
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Vous n&apos;avez pas de compte ?{' '}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Créer un compte
          </Link>
        </p>
      </div>

      {/* Demo credentials (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Mode développement
          </h4>
          <p className="text-xs text-yellow-700 mb-2">
            Vous pouvez utiliser ces identifiants de test :
          </p>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>
              <strong>Email:</strong> demo@example.com
            </div>
            <div>
              <strong>Mot de passe:</strong> Password123!
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 text-xs"
            onClick={handleDemoFill}
          >
            Remplir automatiquement
          </Button>
          {showRecaptcha && (
            <p className="text-xs text-yellow-600 mt-2">
              N&apos;oubliez pas de compléter reCAPTCHA après le remplissage
              automatique
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;