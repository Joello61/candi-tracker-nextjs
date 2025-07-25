import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://candi-tracker.com' // ⚠️ Remplacez par votre vraie URL
  const currentDate = new Date()

  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate, 
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2024-12-01'), // Date de dernière mise à jour
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date('2024-12-01'), // Date de dernière mise à jour  
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Articles de blog dynamiques
  try {
    const blogArticles = await getBlogArticles()
    const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
    
    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error)
    return staticPages
  }
}

// Fonction pour récupérer les articles de blog
async function getBlogArticles() {
  // Simulation - remplacez par votre vraie logique de base de données
  return [
    {
      slug: 'guide-complet-recherche-emploi-2025',
      updatedAt: '2025-01-15T10:00:00.000Z'
    },
    {
      slug: 'optimiser-cv-2025', 
      updatedAt: '2025-01-12T14:30:00.000Z'
    },
    {
      slug: 'preparer-entretien-virtuel',
      updatedAt: '2025-01-10T09:15:00.000Z'
    },
    {
      slug: 'negocier-salaire-junior',
      updatedAt: '2025-01-08T16:45:00.000Z'
    },
    {
      slug: 'erreurs-candidature-eviter',
      updatedAt: '2025-01-05T11:20:00.000Z'
    },
    {
      slug: 'linkedin-recherche-emploi',
      updatedAt: '2025-01-03T13:10:00.000Z'
    },
    {
      slug: 'motivation-recherche-emploi',
      updatedAt: '2025-01-01T08:00:00.000Z'
    }
  ]
}

/*
 * NOTES POUR LA PRODUCTION :
 * 
 * 1. Remplacez getBlogArticles() par une vraie requête à votre base de données
 * 2. Ajoutez d'autres contenus dynamiques si nécessaire (pages produits, etc.)
 * 3. Configurez les priorités selon l'importance de vos pages
 * 4. Mettez à jour les changeFrequency selon la fréquence réelle de modification
 * 5. Pour de gros sites (>50k URLs), considérez un sitemap index
 */