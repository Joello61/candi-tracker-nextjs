import SettingsClient from "./SettingsClient";

import { Metadata } from 'next';

export const settingsMetadata: Metadata = {
  title: 'Paramètres',
  description: 'Configurez votre compte Candi Tracker. Personnalisez vos préférences, notifications, sécurité et paramètres de confidentialité.',
  keywords: [
    'paramètres',
    'settings',
    'configuration compte',
    'préférences utilisateur',
    'paramètres notifications',
    'sécurité compte',
    'confidentialité',
    'personnalisation'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Paramètres du compte | Candi Tracker',
    description: 'Personnalisez votre expérience et configurez votre compte selon vos préférences.',
    images: [{ url: '/og-settings.jpg', width: 1200, height: 630 }],
  }
}

export default function SettingsPage () {
  return <SettingsClient/>
}