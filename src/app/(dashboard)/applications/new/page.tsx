import CreateApplicationClient from "./CreateApplicationClient";

import { Metadata } from 'next';

export const createApplicationMetadata: Metadata = {
  title: 'Nouvelle candidature',
  description: 'Ajoutez une nouvelle candidature à votre suivi sur Candi Tracker. Renseignez l\'entreprise, le poste et démarrez le suivi de votre application.',
  keywords: [
    'nouvelle candidature',
    'ajouter candidature',
    'créer application',
    'add application',
    'enregistrer candidature',
    'démarrer suivi',
    'candidature emploi'
  ],
  openGraph: {
    title: 'Ajouter une candidature | Candi Tracker',
    description: 'Créez facilement une nouvelle entrée pour suivre votre candidature et ne manquez aucune opportunité.',
    images: [{ url: '/og-application.jpg', width: 1200, height: 630 }],
  }
}

export default function CreateApplicationPage () {
  return <CreateApplicationClient/>
}