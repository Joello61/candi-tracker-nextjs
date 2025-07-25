import { Metadata } from "next";
import InterviewDetailsClient from "./InterviewDetailsClient";

export const metadata: Metadata = {
  title: 'Détails entretien',
  description: 'Consultez tous les détails de votre entretien d\'embauche : horaire, entreprise, notes de préparation et suivi sur Candi Tracker.',
  keywords: [
    'détails entretien',
    'informations interview',
    'préparation entretien',
    'notes entretien',
    'suivi interview',
    'historique entretien',
    'planning entretien'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Suivi d\'entretien | Candi Tracker',
    description: 'Toutes les informations et notes de votre entretien centralisées en un endroit.',
    images: [{ url: '/og-interviews.jpg', width: 1200, height: 630 }],
  }
}

export default function InterviewDetailsPage () {
  return <InterviewDetailsClient/>
}