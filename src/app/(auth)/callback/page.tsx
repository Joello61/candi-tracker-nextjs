import OAuthCallbackClient from "./CallbackClient";

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

export default function OAuthCallbackPage () {
  return <OAuthCallbackClient/>
}