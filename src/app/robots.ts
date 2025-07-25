import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://candi-tracker.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/features',
          '/pricing',
          '/blog',
          '/blog/*',
          '/terms',
          '/privacy-policy',
        ],
        disallow: [
          '/api/*',              // API endpoints
          '/dashboard/*',        // Pages privées dashboard
          '/admin/*',            // Administration
          '/login',              // Pages d'authentification
          '/register',
          '/forgot-password',
          '/verify-email',
          '/verify-2fa',
          '/callback',
          '/*.json$',            // Fichiers JSON
          '/*?*utm_*',           // URLs avec paramètres UTM
          '/*?*fbclid*',         // Paramètres Facebook
          '/*?*gclid*',          // Paramètres Google Ads
          '/search?*',           // Pages de recherche avec paramètres
          '/*/edit',             // Pages d'édition
          '/*/new',              // Pages de création
          '/upload',             // Upload de fichiers
          '/settings',           // Paramètres utilisateur
          '/notifications',      // Notifications privées
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/about',
          '/features', 
          '/pricing',
          '/blog',
          '/blog/*',
          '/terms',
          '/privacy-policy',
        ],
        disallow: [
          '/api/*',
          '/dashboard/*',
          '/admin/*',
          '/login',
          '/register',
          '/forgot-password',
          '/verify-email',
          '/verify-2fa',
          '/callback',
        ],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/about',
          '/features',
          '/pricing', 
          '/blog',
          '/blog/*',
          '/terms',
          '/privacy-policy',
        ],
        disallow: [
          '/api/*',
          '/dashboard/*',
          '/admin/*',
          '/login',
          '/register',
          '/forgot-password',
          '/verify-email',
          '/verify-2fa',
          '/callback',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: [
          '/',
          '/about',
          '/features',
          '/pricing',
          '/blog',
          '/blog/*',
        ],
        disallow: [
          '/api/*',
          '/dashboard/*',
          '/admin/*',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: [
          '/',
          '/about', 
          '/features',
          '/pricing',
          '/blog',
          '/blog/*',
        ],
        disallow: [
          '/api/*',
          '/dashboard/*',
          '/admin/*',
        ],
      },
      // Bloquer les bots indésirables
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot', 
          'MJ12bot',
          'DotBot',
          'AspiegelBot',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  }
}