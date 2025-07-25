import { Metadata } from 'next';
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Rejoignez Candi Tracker gratuitement ! Créez votre compte pour commencer à organiser et suivre efficacement toutes vos candidatures d\'emploi.',
  keywords: [
    'créer compte',
    'inscription',
    'register',
    's\'inscrire',
    'nouveau compte',
    'inscription gratuite',
    'commencer suivi candidatures',
    'rejoindre candi tracker'
  ],
  openGraph: {
    title: 'Créer votre compte gratuit | Candi Tracker',
    description: 'Démarrez votre recherche d\'emploi organisée ! Inscrivez-vous gratuitement et bénéficiez d\'outils puissants pour vos candidatures.',
    images: [{ url: '/og-register.jpg', width: 1200, height: 630 }],
  }
} 

export default function RegisterPage () {
  return <RegisterClient/>
}