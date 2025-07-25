import UploadDocumentClient from "./UploadDocumentClient";

import { Metadata } from 'next';

export const uploadDocumentMetadata: Metadata = {
  title: 'Importer document',
  description: 'Ajoutez vos documents professionnels à Candi Tracker. Téléchargez CV, lettres de motivation, certificats et organisez votre dossier candidature.',
  keywords: [
    'importer document',
    'upload CV',
    'télécharger lettre motivation',
    'ajouter document',
    'upload document',
    'import fichiers',
    'dossier candidature'
  ],
  openGraph: {
    title: 'Import de documents | Candi Tracker',
    description: 'Centralisez tous vos documents professionnels pour des candidatures plus efficaces.',
    images: [{ url: '/og-documents.jpg', width: 1200, height: 630 }],
  }
}

export default function UploadDocumentPage () {
  return <UploadDocumentClient/>
}