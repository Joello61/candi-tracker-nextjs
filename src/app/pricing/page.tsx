import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Check,
  Star,
  Shield,
  Sparkles,
  Gift,
  ArrowRight,
  GraduationCap,
  Briefcase,
  FileText,
  HelpCircle,
  Upload,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    'Choisissez votre plan Candi Tracker : 7.99€/mois pour les étudiants ou 14.99€/mois pour les professionnels. Essai gratuit de 30 jours pour tous.',
  keywords: [
    'prix candi tracker',
    'tarif étudiant 7.99',
    'plan professionnel 14.99',
    'abonnement suivi candidatures',
    'essai gratuit 30 jours',
    'réduction étudiante',
    'pricing candidatures',
  ],
  openGraph: {
    title: 'Plans et Tarifs - Candi Tracker',
    description:
      "Essai gratuit 30 jours puis 7.99€/mois étudiants ou 14.99€/mois professionnels. Optimisez votre recherche d'emploi !",
    images: [{ url: '/og-pricing.jpg', width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'Candi Tracker';

  const plans = [
    {
      name: 'Essai Gratuit',
      price: '0€',
      duration: '30 jours',
      description: 'Découvrez toutes les fonctionnalités sans engagement',
      badge: { text: 'Essai complet', color: 'bg-green-500' },
      icon: Gift,
      features: [
        'Suivi illimité de candidatures',
        'Gestion complète des entretiens',
        'Stockage de documents (1 GB)',
        'Statistiques de base',
        'Notifications par email',
        'Support par email',
        'Accès à toutes les fonctionnalités',
      ],
      limitations: ['Limité à 30 jours', 'Stockage limité à 1 GB'],
      cta: "Commencer l'essai gratuit",
      ctaClass: 'bg-green-600 hover:bg-green-700 text-white',
      popular: false,
      highlight: false,
    },
    {
      name: 'Plan Étudiant',
      price: '5.99€',
      duration: 'par mois',
      description: 'Tarif préférentiel pour étudiants avec justificatif',
      badge: { text: 'Populaire', color: 'bg-blue-500' },
      icon: GraduationCap,
      features: [
        "Toutes les fonctionnalités de l'essai",
        'Stockage illimité de documents',
        'Statistiques avancées et analytics',
        'Templates de CV personnalisables',
        'Sauvegarde automatique cloud',
        'Support prioritaire',
        'Accès aux nouvelles fonctionnalités',
        "Formation recherche d'emploi incluse",
      ],
      requirements: [
        'Justificatif étudiant requis',
        'Carte étudiante ou certificat scolaire',
        'Vérification manuelle sous 24h',
      ],
      cta: 'Choisir le plan étudiant',
      ctaClass:
        'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white',
      popular: true,
      highlight: true,
    },
    {
      name: 'Plan Professionnel',
      price: '12.99€',
      duration: 'par mois',
      description: 'Solution complète pour professionnels en recherche active',
      badge: { text: 'Complet', color: 'bg-purple-500' },
      icon: Briefcase,
      features: [
        'Toutes les fonctionnalités étudiant',
        'Analyses de marché sectorielles',
        'Benchmarks salariaux',
        'Networking et contacts professionnels',
        "Simulation d'entretiens IA",
        'Rapports de performance détaillés',
        "API d'intégration avec LinkedIn",
        'Support téléphonique prioritaire',
        'Conseiller carrière dédié (sur demande)',
      ],
      cta: 'Choisir le plan pro',
      ctaClass:
        'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white',
      popular: false,
      highlight: false,
    },
  ];

  const faqs = [
    {
      question: 'Comment bénéficier du tarif étudiant ?',
      answer:
        "Vous devez fournir un justificatif étudiant valide (carte étudiante, certificat de scolarité ou attestation d'inscription) lors de votre inscription. La vérification se fait manuellement sous 24h.",
    },
    {
      question: 'Quels justificatifs étudiants sont acceptés ?',
      answer:
        "Carte étudiante en cours de validité, certificat de scolarité de l'année en cours, attestation d'inscription universitaire, ou carte CROUS. Le document doit clairement indiquer votre statut étudiant actuel.",
    },
    {
      question: "Que se passe-t-il après les 30 jours d'essai ?",
      answer:
        'Vous recevez un email de rappel 5 jours avant la fin. Vous pouvez alors choisir votre plan ou laisser votre compte passer en mode lecture seule (accès en consultation pendant 30 jours supplémentaires).',
    },
    {
      question: 'Puis-je changer de plan à tout moment ?',
      answer:
        'Oui ! Vous pouvez passer du plan étudiant au plan professionnel instantanément. Le passage inverse nécessite une re-vérification de votre statut étudiant.',
    },
    {
      question: 'Y a-t-il un engagement minimum ?',
      answer:
        "Aucun engagement ! Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. L'annulation prend effet à la fin de la période payée.",
    },
    {
      question: 'Les tarifs incluent-ils la TVA ?',
      answer:
        'Oui, tous les prix affichés sont TTC (TVA française incluse). Aucun coût supplémentaire ne sera ajouté lors du paiement.',
    },
  ];

  const comparison = [
    { feature: 'Suivi des candidatures', free: true, student: true, pro: true },
    { feature: 'Gestion des entretiens', free: true, student: true, pro: true },
    {
      feature: 'Stockage documents',
      free: '1 GB',
      student: 'Illimité',
      pro: 'Illimité',
    },
    {
      feature: 'Statistiques',
      free: 'Basiques',
      student: 'Avancées',
      pro: 'Complètes + IA',
    },
    { feature: 'Templates CV', free: false, student: true, pro: true },
    { feature: 'Formation emploi', free: false, student: true, pro: true },
    {
      feature: 'Analyses sectorielles',
      free: false,
      student: false,
      pro: true,
    },
    { feature: 'Benchmarks salariaux', free: false, student: false, pro: true },
    {
      feature: 'Simulation entretiens IA',
      free: false,
      student: false,
      pro: true,
    },
    {
      feature: 'Support',
      free: 'Email',
      student: 'Email prioritaire',
      pro: 'Email + Téléphone',
    },
    {
      feature: 'Conseiller carrière',
      free: false,
      student: false,
      pro: 'Sur demande',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <LandingHeader applicationName={applicationName} />
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-6 bg-blue-50 text-blue-700 border-blue-200"
          >
            <Gift className="w-4 h-4 mr-2" />
            30 jours d&apos;essai gratuit • Sans engagement
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Des tarifs adaptés à
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {' '}
              votre profil
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Commencez avec 30 jours d&apos;essai gratuit complet, puis
            choisissez le plan qui correspond à votre situation : étudiant ou
            professionnel.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plan.highlight ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge
                      className={`${plan.badge.color} text-white px-4 py-1 text-sm font-medium`}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      {plan.badge.text}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <plan.icon className="w-8 h-8 text-blue-600" />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">
                      / {plan.duration}
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-orange-800 mb-2">
                        Limitations :
                      </h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li
                            key={limitIndex}
                            className="text-sm text-orange-700 flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {plan.requirements && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Justificatif requis :
                      </h4>
                      <ul className="space-y-1">
                        {plan.requirements.map((req, reqIndex) => (
                          <li
                            key={reqIndex}
                            className="text-sm text-blue-700 flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    asChild
                    className={`w-full ${plan.ctaClass}`}
                    size="lg"
                  >
                    <Link href="/register">
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comparaison détaillée des fonctionnalités
            </h2>
            <p className="text-gray-600">
              Découvrez exactement ce qui est inclus dans chaque plan
            </p>
          </div>

          <Card className="p-8 border-0 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Fonctionnalité
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">
                      Essai Gratuit
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">
                      Plan Étudiant
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-purple-600">
                      Plan Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {item.feature}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof item.free === 'boolean' ? (
                          item.free ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 mx-auto rounded-full bg-gray-200"></div>
                          )
                        ) : (
                          <span className="text-gray-600 text-sm">
                            {item.free}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof item.student === 'boolean' ? (
                          item.student ? (
                            <Check className="w-5 h-5 text-blue-600 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 mx-auto rounded-full bg-gray-200"></div>
                          )
                        ) : (
                          <span className="text-blue-600 text-sm font-medium">
                            {item.student}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof item.pro === 'boolean' ? (
                          item.pro ? (
                            <Check className="w-5 h-5 text-purple-600 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 mx-auto rounded-full bg-gray-200"></div>
                          )
                        ) : (
                          <span className="text-purple-600 text-sm font-medium">
                            {item.pro}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Student Verification Process */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment obtenir le tarif étudiant ?
            </h2>
            <p className="text-gray-600">
              Processus simple et rapide pour bénéficier de la réduction
              étudiante
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Inscrivez-vous
              </h3>
              <p className="text-gray-600 text-sm">
                Créez votre compte et sélectionnez &quot;Plan Étudiant&quot;
                lors de l&apos;inscription
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Uploadez votre justificatif
              </h3>
              <p className="text-gray-600 text-sm">
                Carte étudiante, certificat de scolarité ou attestation
                d&apos;inscription
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Validation sous 24h
              </h3>
              <p className="text-gray-600 text-sm">
                Vérification manuelle et activation automatique de votre
                réduction
              </p>
            </Card>
          </div>

          <Alert className="mt-8 border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Confidentialité garantie :</strong> Vos documents sont
              uniquement utilisés pour la vérification et supprimés après
              validation. Conformité RGPD complète.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-600">
              Toutes les réponses sur nos plans et tarifs
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Commencez dès aujourd&apos;hui !
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            30 jours d&apos;essai gratuit complet, puis choisissez le plan
            adapté à votre profil. Aucune carte bancaire requise pour commencer.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Link href="/register">
                <Gift className="w-5 h-5 mr-2" />
                Essai gratuit 30 jours
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/features">
                <Sparkles className="w-5 h-5 mr-2" />
                Voir les fonctionnalités
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Essai complet 30 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Pas de carte bancaire</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Support réactif</span>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter applicationName={applicationName} />
    </div>
  );
}
