import { Metadata } from "next";
import AdminUsersClient from "./AdminUsersClient";

export const metadata: Metadata = {
  title: 'Gestion des utilisateurs - Admin',
  description: 'Gérez tous les utilisateurs de Candi Tracker. Consultez la liste complète, modifiez les statuts et administrez les comptes utilisateurs.',
  keywords: [
    'gestion utilisateurs',
    'liste utilisateurs',
    'administration comptes',
    'modération utilisateurs',
    'users management',
    'admin users',
    'utilisateurs plateforme'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Liste des utilisateurs | Admin Candi Tracker',
    description: 'Interface complète de gestion des utilisateurs de la plateforme.',
    images: [{ url: '/og-admin.jpg', width: 1200, height: 630 }],
  }
}

export default function AdminUsersPage () {
  return <AdminUsersClient/>
}