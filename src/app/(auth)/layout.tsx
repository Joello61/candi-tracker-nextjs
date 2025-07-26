import AuthLayoutClient from "@/components/layout/AuthLayoutClient"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Candi Tracker',
    default: 'Authentification'
  },
  description: 'Connectez-vous à votre espace de suivi de candidatures intelligent. Accédez à vos candidatures, entretiens et documents en toute sécurité.',
  keywords: [
    'connexion candi tracker',
    'login emploi',
    'authentification candidature',
    'compte job tracker',
    'inscription recherche emploi',
    'connexion sécurisée',
    'oauth google linkedin',
    'mot de passe oublié',
    'vérification email',
    'authentification 2FA'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Authentification | Candi Tracker',
    description: 'Accédez à votre espace de suivi de candidatures intelligent et optimisez votre recherche d\'emploi.',
    type: 'website',
    images: [{ 
      url: '/api/og?title=Connexion&description=Accédez à votre espace candidatures&type=default',
      width: 1200, 
      height: 630 
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentification | Candi Tracker',
    description: 'Connectez-vous à votre espace de suivi de candidatures intelligent.',
    images: ['/api/og?title=Connexion&description=Accédez à votre espace candidatures&type=default'],
  },
  alternates: {
    canonical: '/login'
  }
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>
}