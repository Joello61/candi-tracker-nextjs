import { Metadata } from "next";
import DocumentsClient from "./DocumentsClient";

export const documentsMetadata: Metadata = {
  title: 'Mes documents',
  description: 'Gérez tous vos documents professionnels sur Candi Tracker. CV, lettres de motivation, certificats - tout votre dossier candidature organisé.',
  keywords: [
    'mes documents',
    'gestion documents',
    'CV lettres motivation',
    'documents professionnels',
    'dossier candidature',
    'fichiers emploi',
    'portfolio documents',
    'organisation documents'
  ],
  openGraph: {
    title: 'Gestionnaire de documents | Candi Tracker',
    description: 'Votre bibliothèque personnalisée de documents professionnels, toujours à portée de main.',
    images: [{ url: '/og-documents.jpg', width: 1200, height: 630 }],
  }
}

export default function DocumentsPage () {
  return <DocumentsClient/>
}