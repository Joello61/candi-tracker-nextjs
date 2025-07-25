import { Metadata } from 'next';
import ForgotPasswordClient from "./ForgotPasswordClient";

export const forgotPasswordMetadata: Metadata = {
  title: 'Mot de passe oublié',
  description: 'Réinitialisez votre mot de passe Candi Tracker en toute sécurité. Recevez un lien de récupération par email pour retrouver l\'accès à votre compte.',
  keywords: [
    'mot de passe oublié',
    'réinitialiser mot de passe',
    'récupération compte',
    'reset password',
    'oubli identifiants',
    'récupération email'
  ],
  openGraph: {
    title: 'Récupération de mot de passe | Candi Tracker',
    description: 'Réinitialisez votre mot de passe en quelques clics et retrouvez l\'accès à votre espace de suivi de candidatures.',
    images: [{ url: '/og-auth.jpg', width: 1200, height: 630 }],
  }
}

export default function ForgotPasswordPage () {
  return <ForgotPasswordClient/>
}