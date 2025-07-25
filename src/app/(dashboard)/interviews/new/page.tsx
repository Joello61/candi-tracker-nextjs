import CreateInterviewClient from "./CreateInterviewClient";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nouvel entretien',
  description: 'Planifiez un nouvel entretien d\'embauche sur Candi Tracker. Ajoutez les détails, l\'horaire et préparez votre rendez-vous professionnel.',
  keywords: [
    'nouvel entretien',
    'planifier interview',
    'ajouter entretien',
    'créer rendez-vous',
    'programmer entretien',
    'new interview',
    'schedule interview'
  ],
  openGraph: {
    title: 'Planifier un entretien | Candi Tracker',
    description: 'Organisez parfaitement votre prochain entretien avec tous les détails importants.',
    images: [{ url: '/og-interviews.jpg', width: 1200, height: 630 }],
  }
}

export default function CreateInterviewPage () {
  return <CreateInterviewClient/>
}