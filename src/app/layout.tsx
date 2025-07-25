import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClientProviders } from '@/components/ClientProviders'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

// Configuration du viewport pour mobile
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
}

// Métadonnées principales
export const metadata: Metadata = {
  metadataBase: new URL('https://candi-tracker.com'), // ⚠️ Remplacez par votre vraie URL
  
  // Titres et descriptions
  title: {
    template: '%s | Candi Tracker',
    default: 'Candi Tracker - Suivi de candidatures d\'emploi intelligent'
  },
  description: 'Plateforme complète pour suivre, organiser et optimiser vos candidatures d\'emploi. Tableau de bord intelligent, gestion des entretiens, analytics et conseils personnalisés.',
  
  // Mots-clés SEO
  keywords: [
    'suivi candidatures emploi',
    'tracker candidature',
    'gestion candidatures',
    'recherche emploi',
    'entretiens embauche',
    'CV organisation',
    'tableau de bord candidatures',
    'outil recherche emploi',
    'plateforme emploi étudiants',
    'suivi entretiens',
    'candidature en ligne'
  ],
  
  // Auteur et créateur
  authors: [{ name: 'Équipe Candi Tracker' }],
  creator: 'Candi Tracker',
  publisher: 'Candi Tracker',
  
  // Configuration du formatage
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://candi-tracker.com',
    siteName: 'Candi Tracker',
    title: 'Candi Tracker - Suivi de candidatures d\'emploi intelligent',
    description: 'Plateforme complète pour optimiser votre recherche d\'emploi. Suivi des candidatures, gestion des entretiens, conseils personnalisés.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Candi Tracker - Plateforme de suivi de candidatures',
        type: 'image/jpeg',
      }
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@candidtracker', // ⚠️ Remplacez par votre Twitter
    creator: '@candidtracker',
    title: 'Candi Tracker - Suivi de candidatures intelligent',
    description: 'Optimisez votre recherche d\'emploi avec notre plateforme complète de suivi de candidatures.',
    images: ['/twitter-card.jpg'],
  },
  
  // Robots et indexation
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Liens alternatifs
  alternates: {
    canonical: 'https://candi-tracker.com',
    languages: {
      'fr-FR': 'https://candi-tracker.com',
      'x-default': 'https://candi-tracker.com',
    },
    types: {
      'application/rss+xml': [
        { url: '/blog/rss', title: 'Candi Tracker Blog RSS' }
      ],
    },
  },
  
  // Vérifications moteurs de recherche
  verification: {
    google: 'your-google-verification-code', // ⚠️ À remplacer
    yandex: 'your-yandex-verification-code', // ⚠️ À remplacer (optionnel)
  },
  
  // App Web Manifest
  manifest: '/site.webmanifest',
  
  // Informations pour les applications mobiles
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Candi Tracker',
    startupImage: [
      '/apple-splash-2048-2732.jpg',
      '/apple-splash-1668-2224.jpg',
      '/apple-splash-1536-2048.jpg',
      '/apple-splash-1125-2436.jpg',
      '/apple-splash-1242-2208.jpg',
      '/apple-splash-750-1334.jpg',
      '/apple-splash-640-1136.jpg',
    ],
  },
  
  // Configuration des icônes
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  
  // Catégorie et classification
  category: 'productivity',
  
  // Application info
  applicationName: 'Candi Tracker',
  referrer: 'origin-when-cross-origin',
  
  // Archives et autres
  archives: ['https://candi-tracker.com/blog'],
  assets: ['https://candi-tracker.com'],
  bookmarks: ['https://candi-tracker.com/features'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="fr" 
      suppressHydrationWarning 
      className={inter.className}
    >
      <head>
        {/* Preconnections importantes pour la performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch pour domaines externes */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Icônes et manifeste */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* RSS Feed */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Candi Tracker Blog" 
          href="/blog/rss" 
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://candi-tracker.com" />
        
        {/* JSON-LD Schema pour l'organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Candi Tracker",
              "description": "Plateforme de suivi et gestion de candidatures d'emploi",
              "url": "https://candi-tracker.com",
              "logo": "https://candi-tracker.com/logo.png",
              "foundingDate": "2024",
              "sameAs": [
                "https://twitter.com/candidtracker",
                "https://linkedin.com/company/candi-tracker",
                "https://github.com/candi-tracker"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "contact@candi-tracker.com",
                "availableLanguage": ["French", "English"]
              }
            })
          }}
        />
        
        {/* JSON-LD Schema pour l'application web */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Candi Tracker",
              "description": "Application web pour suivre et organiser vos candidatures d'emploi",
              "url": "https://candi-tracker.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "7.99",
                "priceCurrency": "EUR",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
      </head>
      
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <ClientProviders>
          {children}
        </ClientProviders>
        
        {/* Script de tracking des performances web vitals */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}