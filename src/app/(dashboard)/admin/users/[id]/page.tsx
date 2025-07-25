import { Metadata } from "next";
import AdminUserDetailsClient from "./AdminUserDetailsClient";

export const metadata: Metadata = {
  title: 'Détails utilisateur - Admin',
  description: 'Consultez et gérez les informations détaillées d\'un utilisateur de Candi Tracker. Modifiez les permissions et suivez l\'activité.',
  keywords: [
    'détails utilisateur',
    'gestion compte utilisateur',
    'profil utilisateur admin',
    'permissions utilisateur',
    'administration compte',
    'modération utilisateur'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Gestion utilisateur | Admin Candi Tracker',
    description: 'Interface de gestion détaillée des comptes utilisateurs.',
    images: [{ url: '/og-admin.jpg', width: 1200, height: 630 }],
  }
}

export default function AdminUserDetailsPage () {
  return <AdminUserDetailsClient/>
}