import { Metadata } from "next";
import ApplicationsClient from "./ApplicationsClient";

export const metadata: Metadata = {
  title: 'Mes candidatures',
  description: 'Consultez et gérez toutes vos candidatures d\'emploi sur Candi Tracker. Tableau de bord complet pour suivre vos opportunités et organiser votre recherche.',
  keywords: [
    'mes candidatures',
    'liste candidatures',
    'suivi applications',
    'tableau de bord candidatures',
    'gestion candidatures',
    'job applications',
    'recherche emploi',
    'opportunités emploi'
  ],
  openGraph: {
    title: 'Tableau de bord candidatures | Candi Tracker',
    description: 'Votre espace centralisé pour suivre et organiser toutes vos candidatures d\'emploi efficacement.',
    images: [{ url: '/og-dashboard.jpg', width: 1200, height: 630 }],
  }
}


export default function ApplicationsPage () {
  return <ApplicationsClient/>
}