import AdminDashboardClient from "./AdminDashboardClient";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau de bord Admin',
  description: 'Interface d\'administration de Candi Tracker. Gérez les utilisateurs, surveillez les statistiques et administrez la plateforme de suivi de candidatures.',
  keywords: [
    'admin dashboard',
    'administration',
    'gestion utilisateurs',
    'statistiques plateforme',
    'tableau de bord admin',
    'monitoring',
    'analytics admin'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Administration | Candi Tracker',
    description: 'Interface d\'administration pour la gestion de la plateforme Candi Tracker.',
    images: [{ url: '/og-admin.jpg', width: 1200, height: 630 }],
  }
}

export default function AdminDashboardPage () {
  return <AdminDashboardClient/>
}