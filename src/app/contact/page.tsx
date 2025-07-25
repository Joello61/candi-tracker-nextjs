import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact | Candi Tracker',
  description: 'Contactez l\'équipe Candi Tracker pour toute question, suggestion ou demande de support. Nous sommes là pour vous aider dans votre recherche d\'emploi.',
  keywords: [
    'contact candi tracker',
    'support emploi',
    'aide candidature',
    'contact équipe',
    'support technique',
    'feedback',
    'suggestions'
  ],
  openGraph: {
    title: 'Contactez-nous | Candi Tracker',
    description: 'Une question ? Un problème ? Notre équipe est là pour vous accompagner dans votre recherche d\'emploi.',
    images: [{ 
      url: '/api/og?title=Contact&description=Notre équipe est là pour vous aider&type=default',
      width: 1200, 
      height: 630 
    }],
  }
};

export default function ContactPage() {
  return <ContactClient />;
}