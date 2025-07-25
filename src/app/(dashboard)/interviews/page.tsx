import { Metadata } from "next";
import InterviewsClient from "./InterviewsClient";

export const interviewsMetadata: Metadata = {
  title: 'Mes entretiens',
  description: 'Gérez tous vos entretiens d\'embauche sur Candi Tracker. Vue d\'ensemble de vos rendez-vous, préparation et suivi des interviews.',
  keywords: [
    'mes entretiens',
    'liste entretiens',
    'gestion interviews',
    'suivi entretiens',
    'rendez-vous emploi',
    'planning entretiens',
    'entretiens embauche',
    'interviews job'
  ],
  openGraph: {
    title: 'Gestion des entretiens | Candi Tracker',
    description: 'Votre centre de contrôle pour tous vos entretiens d\'embauche et rendez-vous professionnels.',
    images: [{ url: '/og-interviews.jpg', width: 1200, height: 630 }],
  }
}

export default function InterviewsPage () {
  return <InterviewsClient/>
}