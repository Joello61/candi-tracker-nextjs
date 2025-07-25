import { Metadata } from "next";
import InterviewCalendarClient from "./InterviewCalendarClient";

export const interviewCalendarMetadata: Metadata = {
  title: 'Calendrier des entretiens',
  description: 'Visualisez tous vos entretiens d\'embauche dans un calendrier interactif. Planifiez et organisez vos rendez-vous professionnels sur Candi Tracker.',
  keywords: [
    'calendrier entretiens',
    'planning interviews',
    'agenda entretiens',
    'vue calendrier',
    'organisation entretiens',
    'rendez-vous emploi',
    'planning recherche emploi'
  ],
  openGraph: {
    title: 'Calendrier des entretiens | Candi Tracker',
    description: 'Votre agenda personnalisé pour ne manquer aucun entretien et optimiser votre planning.',
    images: [{ url: '/og-calendar.jpg', width: 1200, height: 630 }],
  }
}

export default function InterviewCalendarPage () {
  return <InterviewCalendarClient/>
}