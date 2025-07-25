import TwoFactorVerificationClient from "./Verify2FaClient";

import { Metadata } from 'next';

export const twoFactorMetadata: Metadata = {
  title: 'Vérification en deux étapes',
  description: 'Finalisez votre connexion sécurisée avec la vérification en deux étapes. Saisissez le code reçu pour accéder à votre espace Candi Tracker.',
  keywords: [
    'vérification deux étapes',
    '2FA',
    'authentification forte',
    'sécurité compte',
    'code vérification',
    'double authentification',
    'sécurité renforcée'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Vérification sécurisée | Candi Tracker',
    description: 'Dernière étape de sécurisation : validez votre identité avec le code de vérification.',
    images: [{ url: '/og-auth.jpg', width: 1200, height: 630 }],
  }
}

export default function TwoFactorVerificationPage () {
  return <TwoFactorVerificationClient/>
}