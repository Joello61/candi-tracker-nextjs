import { Metadata } from "next";
import ApplicationDetailsClient from "./ApplicationDetailsClient";

export const metadata: Metadata = {
  title: 'Détails de candidature',
  description: 'Consultez tous les détails de votre candidature : statut, entreprise, poste, notes et historique complet sur Candi Tracker.',
  keywords: [
    'détails candidature',
    'suivi candidature',
    'historique application',
    'statut candidature',
    'informations poste',
    'notes candidature',
    'timeline candidature'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Suivi détaillé de candidature | Candi Tracker',
    description: 'Toutes les informations et l\'historique complet de votre candidature en un coup d\'œil.',
    images: [{ url: '/og-application.jpg', width: 1200, height: 630 }],
  }
}

export default function ApplicationDetailsPage () {
  return <ApplicationDetailsClient/>
}