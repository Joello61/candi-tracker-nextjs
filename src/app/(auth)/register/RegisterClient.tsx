'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, UserPlus, Check, X, Shield } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { OAuthButtons } from '@/components/auth/OAuthButtons';

import { useAuthForm } from '@/hooks/useAuthForm';
import {
  registerSchema,
  type RegisterFormData,
} from '@/utils/validationSchemas';

export const RegisterClient: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { isLoading, handleRegister } = useAuthForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'Candi Tracker';

  // Validation de la force du mot de passe
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, checks: [] };

    const checks = [
      { text: 'Au moins 8 caractères', valid: password.length >= 8 },
      { text: 'Une minuscule', valid: /[a-z]/.test(password) },
      { text: 'Une majuscule', valid: /[A-Z]/.test(password) },
      { text: 'Un chiffre', valid: /\d/.test(password) },
    ];

    const score = checks.filter((check) => check.valid).length;
    return { score, checks };
  };

  const passwordStrength = getPasswordStrength(password || '');

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

  const onSubmit = async (data: RegisterFormData) => {
    if (!acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation");
      return;
    }

    if (!recaptchaToken) {
      setError('Veuillez compléter la vérification de sécurité');
      return;
    }

    try {
      setError(null);

      const dataWithRecaptcha = {
        ...data,
        recaptchaToken,
      };

      await handleRegister(dataWithRecaptcha);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.error || 'Une erreur est survenue lors de la création du compte'
      );

      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  // Vérifier si reCAPTCHA est configuré
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_APP_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    console.warn('NEXT_PUBLIC_APP_RECAPTCHA_SITE_KEY manquante');
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
        <p className="mt-2 text-sm text-gray-600">
          Rejoignez {applicationName} pour suivre vos candidatures
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
              Ou créer un compte avec
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            type="text"
            placeholder="Votre nom complet"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@exemple.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
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
              placeholder="Créer un mot de passe"
              {...register('password')}
              className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
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

          {/* Password strength indicator */}
          {password && (
            <div className="space-y-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${
                      passwordStrength.score >= level
                        ? passwordStrength.score <= 2
                          ? 'bg-red-500'
                          : passwordStrength.score === 3
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="space-y-1">
                {passwordStrength.checks.map((check, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-xs"
                  >
                    {check.valid ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-gray-400" />
                    )}
                    <span
                      className={
                        check.valid ? 'text-green-600' : 'text-gray-500'
                      }
                    >
                      {check.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmer votre mot de passe"
              {...register('confirmPassword')}
              className={
                errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'
              }
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
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* RECAPTCHA SECTION */}
        {recaptchaSiteKey && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              Vérification de sécurité
            </Label>
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
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

        {/* Terms and conditions */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              J&apos;accepte les{' '}
              <Link
                href="/terms"
                className="text-indigo-600 hover:text-indigo-500"
              >
                conditions d&apos;utilisation
              </Link>{' '}
              et la{' '}
              <Link
                href="/privacy-policy"
                className="text-indigo-600 hover:text-indigo-500"
              >
                politique de confidentialité
              </Link>
            </label>
          </div>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !acceptTerms || !recaptchaToken}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création du compte...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Créer mon compte
            </>
          )}
        </Button>
      </form>

      {/* INDICATEUR DE SÉCURITÉ */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Shield className="h-4 w-4" />
          <span>Formulaire protégé par Google reCAPTCHA</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Déjà un compte ?</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterClient;