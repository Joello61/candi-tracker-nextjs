import EmailVerificationClient from "./VerifyEmailClient";

import { Metadata } from 'next';

export const emailVerificationMetadata: Metadata = {
  title: 'Vérification email',
  description: 'Confirmez votre adresse email pour activer votre compte Candi Tracker et accéder à toutes les fonctionnalités de suivi de candidatures.',
  keywords: [
    'vérification email',
    'confirmer email',
    'activation compte',
    'valider adresse email',
    'email confirmation',
    'vérifier compte',
    'finaliser inscription'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Vérification de votre email | Candi Tracker',
    description: 'Dernière étape : confirmez votre adresse email pour débloquer toutes les fonctionnalités de votre espace candidatures.',
    images: [{ url: '/og-auth.jpg', width: 1200, height: 630 }],
  }
}

export default function EmailVerificationPage () {
  return <EmailVerificationClient/>
}