import { LandingFooter } from '@/components/layout/LandingFooter';
import { LandingHeader } from '@/components/layout/LandingHeader';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  FileText,
  Bell,
  Shield,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Candi Tracker - Suivi intelligent de candidatures',
  description:
    "La plateforme ultime pour organiser, suivre et optimiser votre recherche d'emploi. Centralisez vos candidatures, gérez vos entretiens et décrochez votre emploi de rêve.",
  keywords: [
    'suivi candidatures',
    'recherche emploi',
    'gestion candidatures',
    'job tracker',
    'entretiens emploi',
    'CV organisation',
    'candidature intelligente',
    'emploi recherche',
    'job hunting',
    'carrière professionnelle',
  ],
  openGraph: {
    title: 'Candi Tracker - Suivez vos candidatures comme un pro',
    description:
      "Transformez votre processus de candidature en une machine à succès. Suivi intelligent, gestion d'entretiens et analyses statistiques.",
    images: [
      {
        url: '/api/og?title=Candi Tracker&description=Suivi de candidatures intelligent',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Candi Tracker - Suivi intelligent de candidatures',
    description:
      "Organisez et optimisez votre recherche d'emploi avec notre plateforme intelligente.",
    images: [
      '/api/og?title=Candi Tracker&description=Suivi de candidatures intelligent',
    ],
  },
};

export default function HomePage() {
  const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'Candi Tracker';

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Suivi intelligent des candidatures',
      description:
        'Centralisez toutes vos candidatures et suivez leur progression en temps réel',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Gestion des entretiens',
      description:
        'Planifiez et organisez vos entretiens avec un calendrier intuitif',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Documents centralisés',
      description:
        'Stockez et organisez tous vos CV, lettres de motivation et documents',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analyses et statistiques',
      description:
        "Visualisez vos performances et optimisez votre recherche d'emploi",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Notifications intelligentes',
      description: 'Ne ratez plus jamais une échéance importante',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sécurité garantie',
      description:
        'Vos données sont protégées avec les plus hauts standards de sécurité',
    },
  ];

  const stats = [
    { value: '95%', label: 'Taux de satisfaction' },
    { value: '10k+', label: 'Candidatures suivies' },
    { value: '2.3x', label: 'Amélioration du taux de réussite' },
    { value: '24/7', label: 'Support disponible' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <LandingHeader applicationName={applicationName} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 rounded-full mb-8 border border-blue-200/50 dark:border-blue-700/50">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Optimisez votre recherche d&apos;emploi
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Suivez vos
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                candidatures
              </span>
              <br />
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                comme un pro
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              La plateforme ultime pour organiser, suivre et optimiser votre
              recherche d&apos;emploi. Transformez votre processus de
              candidature en une machine à succès.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl text-lg font-semibold flex items-center space-x-2"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 text-lg font-semibold shadow-lg hover:shadow-xl">
                Voir la démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Des outils puissants et intuitifs pour transformer votre recherche
              d&apos;emploi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à décrocher votre emploi de rêve ?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Rejoignez des milliers de candidats qui ont transformé leur
            recherche d&apos;emploi avec Candi Tracker
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group px-8 py-4 bg-white text-slate-800 rounded-xl hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg font-semibold flex items-center justify-center space-x-2"
            >
              <span>Créer mon compte</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-lg font-semibold">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      <LandingFooter applicationName={applicationName} />
    </div>
  );
}