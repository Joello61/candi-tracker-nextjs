import { Metadata } from "next";
import EditDocumentClient from "./EditDocumentClient";

export const metadata: Metadata = {
  title: 'Modifier document',
  description: 'Modifiez vos documents professionnels sur Candi Tracker. Mettez à jour vos CV, lettres de motivation et autres fichiers importants.',
  keywords: [
    'modifier document',
    'éditer CV',
    'mettre à jour lettre motivation',
    'edit document',
    'gestion documents',
    'modification fichiers',
    'update documents'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Modification de document | Candi Tracker',
    description: 'Éditez facilement vos documents professionnels pour optimiser vos candidatures.',
    images: [{ url: '/og-documents.jpg', width: 1200, height: 630 }],
  }
}

export default function EditDocumentPage () {
  return <EditDocumentClient/>
}