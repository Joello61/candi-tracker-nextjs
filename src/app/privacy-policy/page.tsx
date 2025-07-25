'use client'

import React from 'react';
import { ArrowLeft, Shield, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const privacyPolicyMetadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Découvrez comment Candi Tracker protège vos données personnelles et respecte votre vie privée. Notre engagement transparent envers la sécurité de vos informations.',
  keywords: [
    'politique confidentialité',
    'protection données',
    'vie privée',
    'RGPD',
    'sécurité données',
    'privacy policy',
    'confidentialité utilisateur',
    'données personnelles'
  ],
  openGraph: {
    title: 'Politique de confidentialité | Candi Tracker',
    description: 'Notre engagement pour la protection de vos données personnelles et le respect de votre vie privée.',
    images: [{ url: '/og-legal.jpg', width: 1200, height: 630 }],
  }
}

export const PrivacyPolicyPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </div>
          
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Candi Tracker
              </h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Politique de Confidentialité
            </h2>
            <p className="text-gray-600">
              Dernière mise à jour : 13 juillet 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Table des matières */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Table des Matières
            </h3>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              {[
                { id: 'summary', title: 'Résumé des Points Clés' },
                { id: 'infocollect', title: '1. Quelles Informations Collectons-Nous ?' },
                { id: 'infouse', title: '2. Comment Traitons-Nous Vos Informations ?' },
                { id: 'legalbases', title: '3. Bases Légales de Traitement' },
                { id: 'whoshare', title: '4. Partage des Informations' },
                { id: 'thirdparty', title: '5. Sites Web Tiers' },
                { id: 'cookies', title: '6. Cookies et Technologies de Suivi' },
                { id: 'sociallogins', title: '7. Connexions Sociales' },
                { id: 'retention', title: '8. Durée de Conservation' },
                { id: 'security', title: '9. Sécurité des Informations' },
                { id: 'rights', title: '10. Vos Droits sur la Vie Privée' },
                { id: 'dnt', title: '11. Contrôles Do-Not-Track' },
                { id: 'updates', title: '12. Mises à Jour de cette Politique' },
                { id: 'contact', title: '13. Comment Nous Contacter' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-blue-600 hover:text-blue-800 hover:underline p-1 rounded"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Résumé des points clés */}
        <section id="summary" className="mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                Résumé des Points Clés
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Quelles informations personnelles traitons-nous ?</strong> Lorsque vous visitez, utilisez ou naviguez sur nos Services, nous pouvons traiter des informations personnelles en fonction de la façon dont vous interagissez avec nous et les Services, des choix que vous faites et des produits et fonctionnalités que vous utilisez.
                </p>
                <p>
                  <strong>Traitons-nous des informations personnelles sensibles ?</strong> Nous pouvons traiter des informations personnelles sensibles lorsque cela est nécessaire avec votre consentement ou autrement autorisé par la loi applicable.
                </p>
                <p>
                  <strong>Collectons-nous des informations auprès de tiers ?</strong> Nous ne collectons aucune information auprès de tiers.
                </p>
                <p>
                  <strong>Comment traitons-nous vos informations ?</strong> Nous traitons vos informations pour fournir, améliorer et administrer nos Services, communiquer avec vous, pour la sécurité et la prévention de la fraude, et pour nous conformer à la loi.
                </p>
                <p>
                  <strong>Quels sont vos droits ?</strong> Selon votre lieu de résidence géographique, la loi applicable sur la confidentialité peut signifier que vous avez certains droits concernant vos informations personnelles.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 1 */}
        <section id="infocollect" className="mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                1. Quelles Informations Collectons-Nous ?
              </h2>
              
              <h3 className="text-lg font-medium mb-3">Informations personnelles que vous nous divulguez</h3>
              <p className="text-gray-700 mb-4">
                <em>En bref :</em> Nous collectons les informations personnelles que vous nous fournissez.
              </p>
              
              <p className="text-gray-700 mb-4">
                Nous collectons les informations personnelles que vous nous fournissez volontairement lorsque vous vous inscrivez sur les Services, exprimez un intérêt à obtenir des informations sur nous ou nos produits et services, lorsque vous participez à des activités sur les Services, ou autrement lorsque vous nous contactez.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Informations personnelles fournies par vous :</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Noms</li>
                  <li>• Numéros de téléphone</li>
                  <li>• Adresses e-mail</li>
                  <li>• Adresses postales</li>
                  <li>• Titres professionnels</li>
                  <li>• Noms d&apos;utilisateur</li>
                  <li>• Mots de passe</li>
                  <li>• Adresses de facturation</li>
                  <li>• Numéros de carte de débit/crédit</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Informations sensibles :</h4>
                <p className="text-sm text-gray-700">
                  Lorsque nécessaire, avec votre consentement ou autrement autorisé par la loi applicable, nous traitons les catégories suivantes d&apos;informations sensibles : données d&apos;étudiant.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Données de paiement :</h4>
                <p className="text-sm text-gray-700">
                  Nous pouvons collecter les données nécessaires pour traiter votre paiement si vous choisissez d&apos;effectuer des achats. Toutes les données de paiement sont traitées et stockées par Stripe. Vous pouvez trouver leur politique de confidentialité <a href="https://stripe.com/fr/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">ici</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2 */}
        <section id="infouse" className="mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                2. Comment Traitons-Nous Vos Informations ?
              </h2>
              <p className="text-gray-700 mb-4">
                <em>En bref :</em> Nous traitons vos informations pour fournir, améliorer et administrer nos Services, communiquer avec vous, pour la sécurité et la prévention de la fraude, et pour nous conformer à la loi.
              </p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">Faciliter la création et l&apos;authentification de compte</p>
                  <p className="text-sm text-gray-600">
                    Nous pouvons traiter vos informations pour que vous puissiez créer et vous connecter à votre compte, ainsi que maintenir votre compte en bon état de fonctionnement.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">Sauvegarder ou protéger l&apos;intérêt vital d&apos;un individu</p>
                  <p className="text-sm text-gray-600">
                    Nous pouvons traiter vos informations lorsque c&apos;est nécessaire pour sauvegarder ou protéger l&apos;intérêt vital d&apos;un individu, comme pour prévenir un préjudice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section sur la sécurité */}
        <section id="security" className="mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                9. Comment Gardons-Nous Vos Informations en Sécurité ?
              </h2>
              <p className="text-gray-700 mb-4">
                <em>En bref :</em> Nous visons à protéger vos informations personnelles grâce à un système de mesures de sécurité organisationnelles et techniques.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800">
                      <strong>Important :</strong> Nous avons mis en place des mesures de sécurité techniques et organisationnelles appropriées et raisonnables conçues pour protéger la sécurité de toute information personnelle que nous traitons. Cependant, aucune transmission électronique sur Internet ou technologie de stockage d&apos;informations ne peut être garantie à 100% sécurisée.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section droits */}
        <section id="rights" className="mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                10. Quels Sont Vos Droits sur la Vie Privée ?
              </h2>
              <p className="text-gray-700 mb-4">
                <em>En bref :</em> Selon votre état de résidence aux États-Unis ou dans certaines régions, comme l&apos;Espace économique européen (EEE), le Royaume-Uni (RU), la Suisse et le Canada, vous avez des droits qui vous permettent un plus grand accès et contrôle sur vos informations personnelles.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Dans certaines régions (comme l&apos;EEE, le RU, la Suisse et le Canada) :</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Droit de demander l&apos;accès et d&apos;obtenir une copie de vos informations personnelles</li>
                    <li>• Droit de demander la rectification ou l&apos;effacement</li>
                    <li>• Droit de restreindre le traitement de vos informations personnelles</li>
                    <li>• Si applicable, droit à la portabilité des données</li>
                    <li>• Droit de ne pas être soumis à une prise de décision automatisée</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Informations de compte :</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Si vous souhaitez à tout moment consulter ou modifier les informations de votre compte ou résilier votre compte, vous pouvez :
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Vous connecter aux paramètres de votre compte et mettre à jour votre compte utilisateur</li>
                    <li>• Nous contacter en utilisant les informations de contact fournies</li>
                    <li>• Envoyer un e-mail à onboarding@candi-tracker-mail.joeltech.dev</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section contact */}
        <section id="contact" className="mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                13. Comment Nous Contacter à Propos de Cette Politique ?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Contact par e-mail :</h4>
                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <Mail className="h-4 w-4" />
                    <a 
                      href="mailto:onboarding@candi-tracker-mail.joeltech.dev" 
                      className="text-blue-600 hover:underline"
                    >
                      onboarding@candi-tracker-mail.joeltech.dev
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Adresse postale :</h4>
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 mt-1" />
                    <div className="text-sm">
                      <p className="font-medium">Candi Tracker</p>
                      <p>21 Rue du Cher</p>
                      <p>TOULOUSE, 31100</p>
                      <p>France</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Demande d&apos;accès aux données</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Pour exercer vos droits, vous pouvez soumettre une{' '}
                  <a 
                    href="https://app.termly.io/notify/325bdb3f-053c-45c3-b86c-ec2058d4e93d" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    demande d&apos;accès aux données
                  </a>{' '}
                  ou nous contacter directement.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-8">
          <p>© 2025 Candi Tracker. Tous droits réservés.</p>
          <p className="mt-2">
            Cette politique de confidentialité est effective à partir du 13 juillet 2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;