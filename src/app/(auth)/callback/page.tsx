'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import authService from '@/services/authService';
import { Metadata } from 'next';

export const oauthCallbackMetadata: Metadata = {
  title: 'Connexion en cours...',
  description: 'Finalisation de votre connexion sécurisée à Candi Tracker. Veuillez patienter pendant la vérification de vos informations.',
  keywords: [
    'connexion oauth',
    'authentification sécurisée',
    'login google',
    'connexion linkedin',
    'authentification externe'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Connexion en cours | Candi Tracker',
    description: 'Finalisation de votre connexion sécurisée à votre espace de suivi de candidatures.',
    images: [{ url: '/og-auth.jpg', width: 1200, height: 630 }],
  }
}

export const OAuthCallbackPage: React.FC = () => {
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const { refreshUser } = useAuth();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Récupérer les paramètres de l'URL
        const token = searchParams.get('token');
        const provider = searchParams.get('provider');
        const errorParam = searchParams.get('error');
        const message = searchParams.get('message');

        // Vérifier s'il y a une erreur
        if (errorParam) {
          setStatus('error');
          let errorMessage = 'Erreur d\'authentification';
          
          switch (errorParam) {
            case 'google_auth_failed':
              errorMessage = 'Échec de l\'authentification Google';
              break;
            case 'linkedin_auth_failed':
              errorMessage = 'Échec de l\'authentification LinkedIn';
              break;
            case 'callback_error':
              errorMessage = 'Erreur lors du processus d\'authentification';
              break;
            default:
              errorMessage = message || 'Erreur d\'authentification inconnue';
          }
          
          if (message) {
            errorMessage += `: ${decodeURIComponent(message)}`;
          }
          
          setError(errorMessage);
          toast.error(errorMessage);
          return;
        }

        // Vérifier la présence du token
        if (!token) {
          setStatus('error');
          setError('Token manquant dans la réponse d\'authentification');
          toast.error('Token manquant');
          return;
        }

        // Stocker le token
        localStorage.setItem('token', token);

        // Récupérer le profil utilisateur
        const profile = await authService.getProfile();
        localStorage.setItem('user', JSON.stringify(profile));

        // Mettre à jour le contexte d'authentification
        await refreshUser();

        setStatus('success');

        // Message de succès personnalisé selon le provider
        const providerName = provider === 'google' ? 'Google' : 
                           provider === 'linkedin' ? 'LinkedIn' : 
                           'le service externe';
        
        toast.success(`Connexion réussie avec ${providerName} !`);

        // Redirection après un court délai
        setTimeout(() => {
          navigate.replace('/dashboard');
        }, 2000);

      } catch (error) {
        console.error('Erreur lors du callback OAuth:', error);
        setStatus('error');
        setError('Erreur lors de la finalisation de l\'authentification');
        toast.error('Erreur lors de la finalisation de l\'authentification');
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, refreshUser]);

  const handleRetry = () => {
    navigate.replace('/auth/login');
  };

  const handleGoToDashboard = () => {
    navigate.replace('/dashboard');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center">
              <Loader2 className="mx-auto h-12 w-12 text-blue-600 animate-spin" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                Finalisation de la connexion
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Veuillez patienter pendant que nous finalisons votre authentification...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                Connexion réussie !
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Vous allez être redirigé vers votre tableau de bord...
              </p>
              <Button 
                onClick={handleGoToDashboard}
                className="mt-4"
              >
                Aller au tableau de bord
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center">
              <XCircle className="mx-auto h-12 w-12 text-red-600" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                Échec de la connexion
              </h2>
              
              {error && (
                <Alert variant="destructive" className="mt-4 text-left">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="mt-6 space-y-3">
                <Button 
                  onClick={handleRetry}
                  className="w-full"
                >
                  Réessayer la connexion
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate.push('/')}
                  className="w-full"
                >
                  Retour à l&apos;accueil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
export default OAuthCallbackPage;