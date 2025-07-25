import EditInterviewClient from "./EditInterviewClient";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modifier entretien',
  description: 'Modifiez les détails de votre entretien d\'embauche sur Candi Tracker. Mettez à jour l\'horaire, les notes et les informations importantes.',
  keywords: [
    'modifier entretien',
    'éditer interview',
    'mettre à jour entretien',
    'edit interview',
    'modification rendez-vous',
    'update entretien',
    'gestion entretiens'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Modification d\'entretien | Candi Tracker',
    description: 'Actualisez toutes les informations de votre entretien pour rester organisé.',
    images: [{ url: '/og-interviews.jpg', width: 1200, height: 630 }],
  }
}

export default function EditInterviewPage () {
  return <EditInterviewClient/>
}