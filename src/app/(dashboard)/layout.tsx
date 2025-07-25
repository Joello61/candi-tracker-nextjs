import { ProtectedRouteClient } from '@/components/layout/ProtectedRouteClient'
import { MainLayout } from '@/components/layout/MainLayout'
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: {
   template: '%s | Candi Tracker',
   default: 'Tableau de bord | Candi Tracker'
 },
 description: 'Gérez efficacement vos candidatures, suivez vos entretiens et analysez vos performances. Votre centre de contrôle pour une recherche d\'emploi réussie.',
 keywords: [
   'tableau de bord candidatures',
   'gestion candidatures emploi',
   'suivi entretiens',
   'statistiques recherche emploi',
   'dashboard job tracker',
   'applications emploi',
   'calendrier entretiens',
   'documents candidature',
   'notifications emploi',
   'analytics candidatures'
 ],
 robots: 'noindex, nofollow', // Pages privées - ne pas indexer
 openGraph: {
   title: 'Tableau de bord | Candi Tracker',
   description: 'Votre espace personnel pour gérer et optimiser votre recherche d\'emploi. Candidatures, entretiens, documents et statistiques.',
   type: 'website',
   images: [{ 
     url: '/api/og?title=Tableau de bord&description=Gérez vos candidatures efficacement&type=feature',
     width: 1200, 
     height: 630 
   }],
 },
 twitter: {
   card: 'summary_large_image',
   title: 'Tableau de bord | Candi Tracker',
   description: 'Votre centre de contrôle pour une recherche d\'emploi réussie.',
   images: ['/api/og?title=Tableau de bord&description=Gérez vos candidatures efficacement&type=feature'],
 }
};

export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <ProtectedRouteClient>
     <MainLayout>
       {children}
     </MainLayout>
   </ProtectedRouteClient>
 )
}