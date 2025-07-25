import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, Linkedin, Mail, MapPin, GraduationCap, Code, Heart, Users, Target, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez l\'histoire de Candi Tracker, créé par un développeur fullstack passionné étudiant en Master 2 à l\'Université de Toulouse Jean Jaurès.',
  keywords: [
    'développeur fullstack',
    'étudiant master toulouse',
    'candi tracker créateur',
    'application suivi candidatures',
    'portfolio développeur',
    'compétences développement web'
  ],
  openGraph: {
    title: 'À propos de Candi Tracker',
    description: 'L\'histoire derrière l\'application de suivi de candidatures créée par un développeur étudiant passionné.',
    images: [{ url: '/og-about.jpg', width: 1200, height: 630 }],
  }
}

export default function AboutPage() {
  const technologies = [
    'Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4',
    'Node.js', 'PostgreSQL', 'Prisma', 'React Query',
    'NextAuth.js', 'Zod', 'React Hook Form'
  ]

  const stats = [
    { label: 'Étudiants aidés', value: '500+', icon: GraduationCap },
    { label: 'Candidatures suivies', value: '2,500+', icon: Target },
    { label: 'Heures développées', value: '200+', icon: Code },
    { label: 'Retours positifs', value: '98%', icon: Heart }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu principal */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Étudiant Master 2 • Développeur Fullstack
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Salut, je suis le créateur de{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Candi Tracker
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Développeur fullstack passionné et étudiant en Master 2 à l&apos;Université de Toulouse Jean Jaurès, 
                  j&apos;ai créé Candi Tracker pour résoudre un problème que tous les étudiants et jeunes professionnels rencontrent : 
                  <strong> organiser et suivre efficacement leurs candidatures.</strong>
                </p>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Toulouse, France</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>Master 2 • UT2J</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link href="/register">
                    <Users className="w-5 h-5 mr-2" />
                    Rejoindre Candi Tracker
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link href="https://github.com/votre-username" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    Voir le code
                  </Link>
                </Button>
              </div>
            </div>

            {/* Photo/Avatar */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-1">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    {/* Remplace par ta vraie photo */}
                    <div className="w-72 h-72 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                          <Code className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-gray-600 text-sm">Votre photo ici</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Éléments décoratifs */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="py-8">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              L&apos;histoire derrière Candi Tracker
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="space-y-12">
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Le problème</h3>
                  <p className="text-gray-700 leading-relaxed">
                    En tant qu&apos;étudiant en Master 2, j&apos;ai vécu comme beaucoup d&apos;autres la galère de la recherche de stage et d&apos;emploi. 
                    Entre les CVs envoyés, les relances à faire, les entretiens programmés et les réponses à suivre, c&apos;était le chaos total. 
                    Les feuilles Excel ne suffisaient plus, et les solutions existantes étaient soit trop complexes, soit hors de prix pour un étudiant.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">La solution</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Plutôt que de subir, j&apos;ai décidé de créer la solution. Candi Tracker est né de cette frustration et de ma passion pour le développement. 
                    L&apos;objectif était simple : créer une application intuitive, moderne et <strong>gratuite</strong> qui aide vraiment les étudiants et jeunes professionnels 
                    à organiser leur recherche d&apos;emploi.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Double objectif</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ce projet me permet de combiner l&apos;utile à l&apos;agréable : aider ma communauté étudiante tout en démontrant mes compétences techniques. 
                    Candi Tracker est autant un outil d&apos;aide que une vitrine de mes capacités en développement fullstack avec les technologies les plus récentes.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Technologies utilisées
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Candi Tracker est développé avec les technologies les plus modernes pour offrir 
            une expérience utilisateur optimale et des performances maximales.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Ma mission avec Candi Tracker
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Aider la communauté</h3>
              <p className="text-gray-600">
                Offrir un outil gratuit et efficace à tous les étudiants et jeunes professionnels 
                pour optimiser leur recherche d&apos;emploi.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Montrer mes compétences</h3>
              <p className="text-gray-600">
                Démontrer ma maîtrise du développement fullstack moderne à travers 
                un projet concret et utile.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Créer de l&apos;impact</h3>
              <p className="text-gray-600">
                Transformer une frustration personnelle en solution qui impacte 
                positivement la vie de centaines d&apos;utilisateurs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Connectons-nous !
          </h2>
          <p className="text-xl mb-12 text-blue-100">
            Étudiant, recruteur, développeur ou simplement curieux ? 
            Je serais ravi d&apos;échanger avec vous !
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="mailto:votre.email@exemple.com">
                <Mail className="w-5 h-5 mr-2" />
                Me contacter
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="https://github.com/votre-username" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}