import { Metadata } from "next";
import TermsOfUseClient from "./TermsOfUseClient";

export const metadata: Metadata = {
  title: 'Conditions d\'utilisation',
  description: 'Consultez les conditions générales d\'utilisation de Candi Tracker. Droits, obligations et règles d\'usage de notre plateforme de suivi de candidatures.',
  keywords: [
    'conditions utilisation',
    'CGU',
    'terms of use',
    'conditions générales',
    'règles utilisation',
    'accord utilisateur',
    'conditions service',
    'légal'
  ],
  openGraph: {
    title: 'Conditions d\'utilisation | Candi Tracker',
    description: 'Les règles et conditions qui régissent l\'utilisation de notre plateforme de suivi de candidatures.',
    images: [{ url: '/og-legal.jpg', width: 1200, height: 630 }],
  }
}

export default function TermsOfUsePage () {
  return <TermsOfUseClient/>
}