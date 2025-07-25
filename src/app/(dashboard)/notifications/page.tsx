import { Metadata } from "next";
import NotificationsClient from "./NotificationsClient";

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Consultez toutes vos notifications Candi Tracker. Alertes d\'entretiens, mises à jour de candidatures et rappels importants.',
  keywords: [
    'notifications',
    'alertes',
    'rappels entretiens',
    'notifications candidatures',
    'alerts',
    'messages système',
    'updates',
    'rappels emploi'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Centre de notifications | Candi Tracker',
    description: 'Restez informé de toute l\'activité de votre recherche d\'emploi.',
    images: [{ url: '/og-notifications.jpg', width: 1200, height: 630 }],
  }
}

export default function NotificationsPage () {
  return <NotificationsClient/>
}