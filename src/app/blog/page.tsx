import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Calendar, Clock, User, ArrowRight, Search, 
  BookOpen, TrendingUp, Star, Heart,
  MessageSquare, Eye,
  ChevronRight, Tag, Rss
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { LandingHeader } from '@/components/layout/LandingHeader'
import { LandingFooter } from '@/components/layout/LandingFooter'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Conseils, guides et astuces pour réussir votre recherche d\'emploi. Articles sur les candidatures, entretiens, CV et stratégies de carrière.',
  keywords: [
    'blog emploi',
    'conseils candidature',
    'guide entretien',
    'astuces CV',
    'recherche emploi',
    'conseils carrière',
    'stratégie job search',
    'motivation candidature'
  ],
  openGraph: {
    title: 'Blog - Conseils emploi et carrière | Candi Tracker',
    description: 'Découvrez nos guides et conseils d\'experts pour optimiser votre recherche d\'emploi et décrocher le poste de vos rêves.',
    images: [{ url: '/og-blog.jpg', width: 1200, height: 630 }],
  }
}

export default function BlogPage() {

    const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'JobTracker';

  // Articles fictifs - à remplacer par vos vraies données
  const featuredArticle = {
    id: 'guide-complet-recherche-emploi-2025',
    title: 'Guide complet : Recherche d\'emploi en 2025',
    excerpt: 'Découvrez toutes les stratégies modernes pour optimiser votre recherche d\'emploi dans un marché en constante évolution. De la rédaction du CV parfait aux techniques d\'entretien qui marchent.',
    content: 'Dans un marché du travail en constante évolution, les méthodes traditionnelles de recherche d\'emploi ne suffisent plus...',
    author: 'Équipe Candi Tracker',
    publishedAt: '2025-01-15',
    readTime: '12 min',
    category: 'Guide',
    tags: ['recherche emploi', 'stratégie', 'CV', 'entretien'],
    image: '/blog/guide-recherche-emploi-2025.jpg',
    views: 2847,
    likes: 156,
    comments: 23,
    featured: true
  }

  const articles = [
    {
      id: 'optimiser-cv-2025',
      title: '10 astuces pour optimiser son CV en 2025',
      excerpt: 'Les recruteurs passent 6 secondes sur un CV. Découvrez comment faire la différence avec ces techniques éprouvées.',
      author: 'Marie Dubois',
      publishedAt: '2025-01-12',
      readTime: '6 min',
      category: 'CV',
      tags: ['CV', 'optimisation', 'recrutement'],
      image: '/blog/optimiser-cv-2025.jpg',
      views: 1524,
      likes: 89,
      comments: 12
    },
    {
      id: 'preparer-entretien-virtuel',
      title: 'Comment réussir son entretien en visioconférence',
      excerpt: 'L\'entretien virtuel est devenu la norme. Maîtrisez tous les aspects techniques et relationnels pour décrocher le poste.',
      author: 'Thomas Martin',
      publishedAt: '2025-01-10',
      readTime: '8 min',
      category: 'Entretien',
      tags: ['entretien', 'visioconférence', 'remote'],
      image: '/blog/entretien-virtuel.jpg',
      views: 987,
      likes: 67,
      comments: 8
    },
    {
      id: 'negocier-salaire-junior',
      title: 'Négocier son salaire quand on est junior',
      excerpt: 'Même sans expérience, vous pouvez négocier. Découvrez les techniques pour valoriser votre profil et obtenir le salaire que vous méritez.',
      author: 'Sophie Leroux',
      publishedAt: '2025-01-08',
      readTime: '7 min',
      category: 'Négociation',
      tags: ['salaire', 'négociation', 'junior'],
      image: '/blog/negocier-salaire-junior.jpg',
      views: 1876,
      likes: 134,
      comments: 19
    },
    {
      id: 'erreurs-candidature-eviter',
      title: '7 erreurs fatales à éviter dans vos candidatures',
      excerpt: 'Ces erreurs peuvent ruiner vos chances avant même l\'entretien. Identifiez-les et corrigez-les dès maintenant.',
      author: 'Paul Durand',
      publishedAt: '2025-01-05',
      readTime: '5 min',
      category: 'Candidature',
      tags: ['candidature', 'erreurs', 'conseils'],
      image: '/blog/erreurs-candidature.jpg',
      views: 2156,
      likes: 98,
      comments: 15
    },
    {
      id: 'linkedin-recherche-emploi',
      title: 'Utiliser LinkedIn efficacement pour sa recherche d\'emploi',
      excerpt: 'LinkedIn n\'est pas qu\'un réseau social. C\'est votre meilleur allié pour décrocher des opportunités cachées.',
      author: 'Emma Rousseau',
      publishedAt: '2025-01-03',
      readTime: '9 min',
      category: 'Réseautage',
      tags: ['LinkedIn', 'networking', 'opportunités'],
      image: '/blog/linkedin-recherche-emploi.jpg',
      views: 1345,
      likes: 76,
      comments: 11
    },
    {
      id: 'motivation-recherche-emploi',
      title: 'Garder sa motivation pendant une recherche d\'emploi longue',
      excerpt: 'La recherche d\'emploi peut être décourageante. Voici comment maintenir votre énergie et votre confiance sur la durée.',
      author: 'Julie Moreau',
      publishedAt: '2025-01-01',
      readTime: '6 min',
      category: 'Motivation',
      tags: ['motivation', 'persévérance', 'mental'],
      image: '/blog/motivation-recherche-emploi.jpg',
      views: 892,
      likes: 54,
      comments: 7
    }
  ]

  const categories = [
    { name: 'Tous', count: 24, active: true },
    { name: 'Guide', count: 6, active: false },
    { name: 'CV', count: 5, active: false },
    { name: 'Entretien', count: 4, active: false },
    { name: 'Négociation', count: 3, active: false },
    { name: 'Candidature', count: 4, active: false },
    { name: 'Motivation', count: 2, active: false }
  ]

  const popularTags = [
    'recherche emploi', 'CV', 'entretien', 'candidature', 'motivation',
    'LinkedIn', 'négociation', 'junior', 'conseils', 'stratégie'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <LandingHeader applicationName={applicationName} />
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
            <BookOpen className="w-4 h-4 mr-2" />
            Conseils d&apos;experts • Guides pratiques
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Conseils & guides pour 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {' '}réussir{' '}
            </span>
            votre carrière
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos articles, guides pratiques et conseils d&apos;experts pour optimiser 
            votre recherche d&apos;emploi et décrocher le poste de vos rêves.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher un article, un sujet..."
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/register">
                <Heart className="w-5 h-5 mr-2" />
                Essai gratuit 30 jours
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/blog/rss" target="_blank">
                <Rss className="w-5 h-5 mr-2" />
                S&apos;abonner au RSS
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              Article vedette
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          </div>

          <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Image article vedette</p>
                  </div>
                </div>
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Vedette
                </Badge>
              </div>
              
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {featuredArticle.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">{featuredArticle.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featuredArticle.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {featuredArticle.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {featuredArticle.comments}
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full lg:w-auto">
                  <Link href={`/blog/${featuredArticle.id}`}>
                    Lire l&apos;article complet
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Articles Grid with Sidebar */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Derniers articles</h2>
                
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={category.active ? "default" : "outline"}
                      size="sm"
                      className={category.active ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      {category.name}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, index) => (
                  <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <div className="text-center">
                          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">Image article</p>
                        </div>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 hover:bg-white">
                        {article.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 text-sm">{article.author}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {article.likes}
                          </div>
                        </div>
                      </div>

                      <Button asChild variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200">
                        <Link href={`/blog/${article.id}`}>
                          Lire l&apos;article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Charger plus d&apos;articles
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Newsletter */}
                <Card className="p-6 border-0 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Newsletter
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Recevez nos derniers conseils emploi directement dans votre boîte mail.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Input placeholder="Votre email" />
                    <Button className="w-full">
                      S&apos;abonner
                    </Button>
                  </div>
                </Card>

                {/* Popular Tags */}
                <Card className="p-6 border-0 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags populaires
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Most Popular */}
                <Card className="p-6 border-0 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Articles populaires
                  </h3>
                  <div className="space-y-4">
                    {articles.slice(0, 3).map((article, index) => (
                      <div key={index}>
                        <Link 
                          href={`/blog/${article.id}`}
                          className="block hover:text-blue-600 transition-colors"
                        >
                          <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            {article.views.toLocaleString()}
                          </div>
                        </Link>
                        {index < 2 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* CTA */}
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <div className="text-center">
                    <Star className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                    <h3 className="text-lg font-bold mb-2">
                      Prêt à passer à l&apos;action ?
                    </h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Mettez en pratique nos conseils avec Candi Tracker !
                    </p>
                    <Button asChild variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                      <Link href="/register">
                        Essai gratuit 30 jours
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter applicationName={applicationName} />
    </div>
  )
}