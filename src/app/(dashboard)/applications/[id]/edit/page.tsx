import EditApplicationClient from "./EditApplicationClient";

import { Metadata } from 'next';

export const editApplicationMetadata: Metadata = {
  title: 'Modifier candidature',
  description: 'Modifiez les détails de votre candidature sur Candi Tracker. Mettez à jour le statut, les notes et toutes les informations importantes.',
  keywords: [
    'modifier candidature',
    'éditer application',
    'mettre à jour candidature',
    'edit application',
    'modification statut',
    'update candidature',
    'gestion candidature'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Modification de candidature | Candi Tracker',
    description: 'Mettez à jour facilement toutes les informations de votre candidature.',
    images: [{ url: '/og-application.jpg', width: 1200, height: 630 }],
  }
}

export default function EditApplicationPage () {
  return <EditApplicationClient/>
}