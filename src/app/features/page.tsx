import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  FileText, Calendar, Bell, BarChart3, Shield, 
  Zap, Heart, CheckCircle, ArrowRight, Star, 
  BookOpen, Target, Search, TrendingUp, Phone,
  Briefcase, GraduationCap, Building, Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LandingHeader } from '@/components/layout/LandingHeader'
import { LandingFooter } from '@/components/layout/LandingFooter'

export const metadata: Metadata = {
  title: 'Fonctionnalités',
  description: 'Découvrez toutes les fonctionnalités de Candi Tracker : suivi des candidatures, gestion des entretiens, documents centralisés, statistiques et bien plus.',
  keywords: [
    'suivi candidatures',
    'gestion entretiens',
    'tracker emploi',
    'organisation documents CV',
    'statistiques candidatures',
    'notifications automatiques',
    'tableau de bord candidatures',
    'outil recherche emploi'
  ],
  openGraph: {
    title: 'Toutes les fonctionnalités de Candi Tracker',
    description: 'Gérez vos candidatures comme un pro avec nos outils complets : suivi, organisation, statistiques et notifications.',
    images: [{ url: '/og-features.jpg', width: 1200, height: 630 }],
  }
}

export default function FeaturesPage() {

    const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'JobTracker';

  const mainFeatures = [
    {
      icon: Target,
      title: 'Suivi des candidatures',
      description: 'Organisez toutes vos candidatures dans un tableau de bord central. Suivez les statuts, les dates importantes et ne perdez plus jamais le fil.',
      features: [
        'Statuts personnalisables (En cours, Entretien, Refusée, Acceptée)',
        'Historique complet de chaque candidature',
        'Dates de candidature et de relance',
        'Notes et commentaires privés',
        'Pièces jointes (CV, lettre de motivation)'
      ],
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Gestion des entretiens',
      description: 'Planifiez, préparez et suivez tous vos entretiens. Recevez des rappels automatiques et gardez une trace de vos performances.',
      features: [
        'Calendrier intégré avec vue mensuelle',
        'Rappels automatiques par email',
        'Détection des conflits d\'horaires',
        'Préparation d\'entretien guidée',
        'Notes post-entretien et feedback'
      ],
      color: 'green'
    },
    {
      icon: FileText,
      title: 'Documents centralisés',
      description: 'Stockez et organisez tous vos documents (CV, lettres, certifications) dans un espace sécurisé accessible partout.',
      features: [
        'Stockage cloud sécurisé illimité',
        'Versioning automatique des CV',
        'Organisation par dossiers',
        'Aperçu instantané des documents',
        'Partage sécurisé avec les recruteurs'
      ],
      color: 'purple'
    },
    {
      icon: BarChart3,
      title: 'Statistiques et analyses',
      description: 'Analysez vos performances, identifiez les tendances et optimisez votre stratégie de recherche d\'emploi avec des données précises.',
      features: [
        'Taux de réponse par secteur',
        'Temps moyen de réponse',
        'Analyse des mots-clés performants',
        'Évolution mensuelle des candidatures',
        'Comparaison avec les moyennes du marché'
      ],
      color: 'orange'
    }
  ]

  const additionalFeatures = [
    {
      icon: Bell,
      title: 'Notifications intelligentes',
      description: 'Ne ratez plus jamais une échéance avec nos rappels personnalisés.',
      items: ['Relances automatiques', 'Rappels d\'entretiens', 'Notifications de réponse']
    },
    {
      icon: Search,
      title: 'Recherche avancée',
      description: 'Trouvez instantanément n\'importe quelle candidature ou document.',
      items: ['Filtres multiples', 'Recherche textuelle', 'Tags personnalisés']
    },
    {
      icon: Shield,
      title: 'Sécurité maximale',
      description: 'Vos données sont protégées avec les plus hauts standards de sécurité.',
      items: ['Chiffrement AES-256', 'Authentification 2FA', 'Sauvegardes automatiques']
    },
    {
      icon: Phone,
      title: 'Suivi des contacts',
      description: 'Gardez une trace de tous vos contacts professionnels.',
      items: ['Annuaire intégré', 'Historique des échanges', 'Notes sur les contacts']
    },
    {
      icon: TrendingUp,
      title: 'Tableau de bord analytique',
      description: 'Visualisez vos progrès avec des graphiques interactifs.',
      items: ['Métriques en temps réel', 'Objectifs personnalisés', 'Rapports exportables']
    },
    {
      icon: Zap,
      title: 'Interface ultrarapide',
      description: 'Application web optimisée pour une expérience fluide.',
      items: ['Chargement instantané', 'Mode hors ligne', 'Synchronisation temps réel']
    }
  ]

  const targetAudiences = [
    {
      icon: GraduationCap,
      title: 'Étudiants',
      description: 'Parfait pour votre recherche de stage, alternance ou premier emploi',
      benefits: [
        'Interface intuitive et moderne',
        'Tarif étudiant préférentiel (7,99€/mois)',
        'Guides de recherche d\'emploi intégrés',
        'Templates de CV et lettres personnalisables'
      ],
      color: 'blue'
    },
    {
      icon: Briefcase,
      title: 'Jeunes professionnels',
      description: 'Optimisez votre recherche d\'emploi et progressez dans votre carrière',
      benefits: [
        'Suivi multi-entreprises avancé',
        'Analyse de marché sectorielle',
        'Networking et contacts pros',
        'Plan complet à 14,99€/mois'
      ],
      color: 'green'
    },
    {
      icon: Building,
      title: 'Reconversion pro',
      description: 'Accompagnement spécialisé pour changer de secteur d\'activité',
      benefits: [
        'Outils de transition de carrière',
        'Mapping des compétences transférables',
        'Formations recommandées par secteur',
        'Conseiller carrière dédié (plan pro)'
      ],
      color: 'purple'
    }
  ]

  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Étudiante Master Marketing',
      content: 'Grâce à Candi Tracker, j\'ai décroché mon stage de rêve ! L\'organisation et le suivi m\'ont fait gagner un temps fou.',
      rating: 5
    },
    {
      name: 'Thomas R.',
      role: 'Développeur Junior',
      content: 'Interface super intuitive et fonctionnalités complètes. Exactly ce qu\'il me fallait pour ma recherche d\'emploi.',
      rating: 5
    },
    {
      name: 'Sophie M.',
      role: 'Chef de projet',
      content: 'Les statistiques m\'ont aidée à identifier les secteurs les plus réactifs. Très professionnel !',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <LandingHeader applicationName={applicationName} />
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
            <Star className="w-4 h-4 mr-2" />
            Fonctionnalités complètes
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tout ce dont vous avez besoin pour 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {' '}réussir{' '}
            </span>
            votre recherche d&apos;emploi
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Candi Tracker vous accompagne à chaque étape de votre recherche d&apos;emploi avec des outils professionnels, 
            une interface intuitive et des fonctionnalités pensées pour maximiser vos chances de réussite.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/register">
                <CheckCircle className="w-5 h-5 mr-2" />
                Essai gratuit 30 jours
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">
                <ArrowRight className="w-5 h-5 mr-2" />
                Voir la démo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Fonctionnalités principales
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    
                    <ul className="space-y-3">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className={`w-5 h-5 text-${feature.color}-600 flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Et bien plus encore...
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités qui font de Candi Tracker l&apos;outil le plus complet 
              pour votre recherche d&apos;emploi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Adapté à votre profil
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Que vous soyez étudiant, jeune professionnel ou en reconversion, 
              Candi Tracker s&apos;adapte à vos besoins spécifiques.
            </p>
          </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {targetAudiences.map((audience, index) => (
            <div key={index} className={`p-6 bg-white rounded-xl shadow-lg border-2 ${
              audience.color === 'blue' ? 'border-blue-200' : 
              audience.color === 'green' ? 'border-green-200' : 'border-purple-200'
            }`}>
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-${audience.color}-100 flex items-center justify-center`}>
                <audience.icon className={`w-8 h-8 text-${audience.color}-600`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{audience.title}</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{audience.description}</p>
              
              <div className="space-y-4 mb-6">
                {audience.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className={`w-5 h-5 text-${audience.color}-600 flex-shrink-0 mt-0.5`} />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link href="/register">
                    Essai gratuit 30 jours
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Puis {audience.title === 'Étudiants' ? '7.99€/mois' : '14.99€/mois'}
                  </p>
                  <Link href="/pricing" className="text-sm text-blue-600 hover:text-blue-700 underline">
                    Voir tous les tarifs
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ils ont réussi avec Candi Tracker
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Découvrez comment nos utilisateurs ont transformé leur recherche d&apos;emploi 
              et décroché le poste de leurs rêves.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 bg-white/10 backdrop-blur-sm text-white">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-blue-200 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Award className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Prêt à transformer votre recherche d&apos;emploi ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez les centaines d&apos;étudiants et professionnels qui ont déjà optimisé 
              leur recherche d&apos;emploi avec Candi Tracker.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/register">
                <Heart className="w-5 h-5 mr-2" />
                Essai gratuit 30 jours
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                <BookOpen className="w-5 h-5 mr-2" />
                En savoir plus
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Essai gratuit 30 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Aucune carte requise</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Puis à partir de 7,99€/mois</span>
            </div>
          </div>
        </div>
      </section>
      <LandingFooter applicationName={applicationName} />
    </div>
  )
}