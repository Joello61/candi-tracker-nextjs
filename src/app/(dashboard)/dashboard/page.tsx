import DashboardClient from "./DashboardClient";

import { Metadata } from 'next';

export const dashboardMetadata: Metadata = {
  title: 'Tableau de bord',
  description: 'Votre tableau de bord personnel Candi Tracker. Vue d\'ensemble de vos candidatures, entretiens à venir et statistiques de recherche d\'emploi.',
  keywords: [
    'tableau de bord',
    'dashboard',
    'vue d\'ensemble candidatures',
    'statistiques emploi',
    'suivi recherche emploi',
    'entretiens à venir',
    'candidatures en cours',
    'aperçu activité'
  ],
  openGraph: {
    title: 'Tableau de bord | Candi Tracker',
    description: 'Votre hub central pour suivre l\'évolution de votre recherche d\'emploi et gérer toutes vos opportunités.',
    images: [{ url: '/og-dashboard.jpg', width: 1200, height: 630 }],
  }
}

export default function DashboardPage () {
  return <DashboardClient/>
}