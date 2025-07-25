import LoginClient from "./LoginClient";

import { Metadata } from 'next';

export const metadata: Metadata = {
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

export default function LoginPage () {
  return <LoginClient/>
}