import PrivacyPolicyClient from "./PrivacyPolicyClient";

import { Metadata } from 'next';

  export const metadata: Metadata = {
    title: 'Politique de confidentialité',
    description: 'Découvrez comment Candi Tracker protège vos données personnelles et respecte votre vie privée. Notre engagement transparent envers la sécurité de vos informations.',
    keywords: [
      'politique confidentialité',
      'protection données',
      'vie privée',
      'RGPD',
      'sécurité données',
      'privacy policy',
      'confidentialité utilisateur',
      'données personnelles'
    ],
    openGraph: {
      title: 'Politique de confidentialité | Candi Tracker',
      description: 'Notre engagement pour la protection de vos données personnelles et le respect de votre vie privée.',
      images: [{ url: '/og-legal.jpg', width: 1200, height: 630 }],
    }
  }

export default function PrivacyPolicyPage () {
  return <PrivacyPolicyClient/>
}