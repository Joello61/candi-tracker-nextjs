'use client'

import React from 'react';
import { ArrowLeft, Scale, Shield, AlertTriangle, FileText, CheckCircle, XCircle, Euro, Info, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const termsOfUseMetadata: Metadata = {
  title: 'Conditions d\'utilisation',
  description: 'Consultez les conditions générales d\'utilisation de Candi Tracker. Droits, obligations et règles d\'usage de notre plateforme de suivi de candidatures.',
  keywords: [
    'conditions utilisation',
    'CGU',
    'terms of use',
    'conditions générales',
    'règles utilisation',
    'accord utilisateur',
    'conditions service',
    'légal'
  ],
  openGraph: {
    title: 'Conditions d\'utilisation | Candi Tracker',
    description: 'Les règles et conditions qui régissent l\'utilisation de notre plateforme de suivi de candidatures.',
    images: [{ url: '/og-legal.jpg', width: 1200, height: 630 }],
  }
}
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';

export const TermsOfUsePage: React.FC = () => {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lastUpdated = "13 juillet 2025";
  const effectiveDate = "13 juillet 2025";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Scale className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Candi Tracker</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              Mise à jour : {lastUpdated}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Candi Tracker - Plateforme de suivi des candidatures d&apos;emploi
          </p>
          <p className="text-sm text-gray-500">
            Contrat juridiquement contraignant • Dernière mise à jour : {lastUpdated} • Effective depuis : {effectiveDate}
          </p>
        </div>

        {/* Legal Alert */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Gavel className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">⚖️ Document Juridiquement Contraignant</h3>
                <p className="text-red-800 text-sm">
                  Ces conditions constituent un <strong>contrat légal</strong> entre vous et Candi Tracker SAS. 
                  En utilisant nos services, vous acceptez intégralement ces conditions. Si vous n&apos;acceptez pas ces termes, 
                  vous devez cesser immédiatement d&apos;utiliser nos services et supprimer votre compte.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary */}
        <Card className="mb-8 border-emerald-200 bg-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-900 mb-2">📋 Résumé Exécutif</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-800">
                  <div>
                    <p><strong>Service :</strong> Plateforme SaaS de suivi de candidatures</p>
                    <p><strong>Utilisateurs :</strong> Demandeurs d&apos;emploi 16+ ans</p>
                    <p><strong>Modèle :</strong> Freemium avec abonnements premium</p>
                  </div>
                  <div>
                    <p><strong>Responsabilité :</strong> Limitée selon la loi française</p>
                    <p><strong>Données :</strong> Protégées selon RGPD</p>
                    <p><strong>Support :</strong> Email et documentation en ligne</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              Table des Matières
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {[
                { id: 'section1', title: '1. Définitions et Objet', icon: '📖' },
                { id: 'section2', title: '2. Acceptation des Conditions', icon: '✅' },
                { id: 'section3', title: '3. Description du Service', icon: '🎯' },
                { id: 'section4', title: '4. Inscription et Compte', icon: '👤' },
                { id: 'section5', title: '5. Utilisation du Service', icon: '🖥️' },
                { id: 'section6', title: '6. Tarifs et Paiements', icon: '💳' },
                { id: 'section7', title: '7. Propriété Intellectuelle', icon: '©️' },
                { id: 'section8', title: '8. Données et Confidentialité', icon: '🔒' },
                { id: 'section9', title: '9. Responsabilités et Garanties', icon: '⚖️' },
                { id: 'section10', title: '10. Suspension et Résiliation', icon: '🚫' },
                { id: 'section11', title: '11. Force Majeure', icon: '⛈️' },
                { id: 'section12', title: '12. Dispositions Générales', icon: '📄' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left p-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Définitions */}
        <section id="section1" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                Définitions et Objet du Contrat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">📖 Définitions</h3>
                <div className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p><strong>&quot;Société&quot; ou &quot;Nous&quot; :</strong> Candi Tracker SAS, société par actions simplifiée au capital de [X] euros, immatriculée au RCS de Toulouse sous le numéro [X], dont le siège social est situé 21 Rue du Cher, 31100 Toulouse, France.</p>
                      
                      <p><strong>&quot;Utilisateur&quot; ou &quot;Vous&quot; :</strong> Toute personne physique ou morale qui accède et utilise le Service, qu&apos;elle soit inscrite ou non.</p>
                      
                      <p><strong>&quot;Client&quot; :</strong> Utilisateur ayant souscrit à un abonnement payant.</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>&quot;Service&quot; ou &quot;Plateforme&quot; :</strong> L&apos;ensemble des fonctionnalités, contenus et services proposés par Candi Tracker, accessibles via le site web et les applications mobiles.</p>
                      
                      <p><strong>&quot;Compte&quot; :</strong> Espace personnel de l&apos;Utilisateur créé après inscription, permettant l&apos;accès aux fonctionnalités du Service.</p>
                      
                      <p><strong>&quot;Contenu Utilisateur&quot; :</strong> Toutes les données, informations, fichiers et contenus téléchargés, saisis ou créés par l&apos;Utilisateur.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-900 mb-2">🎯 Objet du Contrat</h3>
                <p className="text-emerald-800 text-sm">
                  Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour objet de définir les modalités et conditions 
                  d&apos;utilisation du service Candi Tracker, ainsi que les droits et obligations des parties dans ce cadre. 
                  Elles constituent un contrat entre l&apos;Utilisateur et la Société.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">🌍 Champ d&apos;Application</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Application web accessible via navigateur internet</li>
                  <li>• Applications mobiles iOS et Android</li>
                  <li>• API et services connexes</li>
                  <li>• Documentation et support client</li>
                  <li>• Tous services futurs développés par la Société</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: Acceptation */}
        <section id="section2" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Acceptation des Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Acceptation Obligatoire
                </h3>
                <div className="text-red-800 text-sm space-y-2">
                  <p><strong>Condition préalable :</strong> L&apos;utilisation du Service implique l&apos;acceptation pleine et entière des présentes CGU.</p>
                  <p><strong>Moment de l&apos;acceptation :</strong> Lvacceptation intervient dès le premier accès au Service, même sans inscription.</p>
                  <p><strong>Acceptation expresse :</strong> Lors de l&apos;inscription, l&apos;Utilisateur doit cocher une case confirmant avoir lu et accepté les CGU.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">📋 Modalités d&apos;Acceptation</h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Lecture préalable obligatoire</li>
                    <li>• Case à cocher explicite</li>
                    <li>• Double opt-in par email</li>
                    <li>• Horodatage de l&apos;acceptation</li>
                    <li>• Conservation de la preuve</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">⚖️ Capacité Juridique</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Âge minimum : 16 ans révolus</li>
                    <li>• Capacité juridique pleine</li>
                    <li>• Autorisation parentale pour les mineurs</li>
                    <li>• Pouvoir de représentation pour les personnes morales</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔄 Modifications des CGU</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Droit de modification :</strong> La Société se réserve le droit de modifier les présentes CGU à tout moment.</p>
                  <p><strong>Notification :</strong> Toute modification sera notifiée aux Utilisateurs par email et notification in-app 30 jours avant son entrée en vigueur.</p>
                  <p><strong>Acceptation tacite :</strong> La poursuite de l&apos;utilisation du Service après notification vaut acceptation des nouvelles conditions.</p>
                  <p><strong>Droit de refus :</strong> En cas de refus, l&apos;Utilisateur peut résilier son compte avant l&apos;entrée en vigueur des nouvelles conditions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Description du Service */}
        <section id="section3" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                Description du Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-900 mb-3">🎯 Nature du Service</h3>
                <p className="text-emerald-800 text-sm mb-3">
                  Candi Tracker est une plateforme SaaS (Software as a Service) dédiée au suivi et à la gestion des candidatures d&apos;emploi. 
                  Le Service permet aux demandeurs d&apos;emploi de centraliser, organiser et suivre leurs démarches de recherche d&apos;emploi.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">✅ Fonctionnalités Incluses</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 p-3 rounded">
                      <h5 className="font-medium text-green-900 mb-1">📝 Gestion des Candidatures</h5>
                      <ul className="text-green-800 text-xs space-y-1">
                        <li>• Création et suivi des candidatures</li>
                        <li>• Statuts personnalisables</li>
                        <li>• Historique complet des démarches</li>
                        <li>• Notes et commentaires privés</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                      <h5 className="font-medium text-blue-900 mb-1">📅 Gestion des Entretiens</h5>
                      <ul className="text-blue-800 text-xs space-y-1">
                        <li>• Planification et rappels automatiques</li>
                        <li>• Synchronisation calendrier externe</li>
                        <li>• Préparation d&apos;entretien guidée</li>
                        <li>• Feedback post-entretien</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 p-3 rounded">
                      <h5 className="font-medium text-purple-900 mb-1">📊 Analyse et Rapports</h5>
                      <ul className="text-purple-800 text-xs space-y-1">
                        <li>• Statistiques de candidatures</li>
                        <li>• Taux de réponse et succès</li>
                        <li>• Rapports hebdomadaires automatiques</li>
                        <li>• Tableaux de bord personnalisés</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">📦 Fonctionnalités Premium</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                      <h5 className="font-medium text-yellow-900 mb-1">🎨 Personnalisation Avancée</h5>
                      <ul className="text-yellow-800 text-xs space-y-1">
                        <li>• Templates de CV et lettres personnalisés</li>
                        <li>• Champs personnalisés illimités</li>
                        <li>• Automatisations avancées</li>
                        <li>• Intégrations tierces (LinkedIn, Indeed)</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 p-3 rounded">
                      <h5 className="font-medium text-orange-900 mb-1">📈 Analytics Avancées</h5>
                      <ul className="text-orange-800 text-xs space-y-1">
                        <li>• Analyses prédictives IA</li>
                        <li>• Benchmarking sectoriel</li>
                        <li>• Recommandations personnalisées</li>
                        <li>• Export données avancé</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-3 rounded">
                      <h5 className="font-medium text-red-900 mb-1">🎓 Support Priority</h5>
                      <ul className="text-red-800 text-xs space-y-1">
                        <li>• Support prioritaire 24/7</li>
                        <li>• Conseiller dédié</li>
                        <li>• Sessions de coaching incluses</li>
                        <li>• Accès anticipé aux nouvelles fonctionnalités</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🔧 Évolution du Service</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Améliorations continues :</strong> Le Service fait l&apos;objet d&apos;améliorations et mises à jour régulières pour optimiser l&apos;expérience utilisateur.</p>
                  <p><strong>Nouvelles fonctionnalités :</strong> De nouvelles fonctionnalités peuvent être ajoutées sans préavis, certaines pouvant être réservées aux abonnements premium.</p>
                  <p><strong>Maintenance :</strong> Des interruptions programmées peuvent avoir lieu pour maintenance, notifiées 48h à l&apos;avance.</p>
                  <p><strong>Compatibilité :</strong> Le Service est optimisé pour les navigateurs modernes et appareils récents. Les versions obsolètes peuvent ne pas être supportées.</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">⚠️ Limitations du Service</h4>
                <ul className="text-amber-800 text-sm space-y-1">
                  <li>• Le Service ne garantit pas l&apos;obtention d&apos;un emploi</li>
                  <li>• Nous ne sommes pas un cabinet de recrutement</li>
                  <li>• Les conseils fournis sont à titre informatif uniquement</li>
                  <li>• L&apos;Utilisateur reste seul responsable de ses candidatures</li>
                  <li>• Aucune mise en relation directe avec les employeurs</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Inscription et Compte */}
        <section id="section4" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                Inscription et Gestion du Compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">📝 Conditions d&apos;Inscription</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Âge minimum requis : 16 ans révolus</li>
                      <li>• Fourniture d&apos;informations exactes et à jour</li>
                      <li>• Adresse email valide et accessible</li>
                      <li>• Acceptation des CGU et Politique de Confidentialité</li>
                      <li>• Un seul compte par personne physique</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Processus d&apos;Inscription</h4>
                    <ol className="text-green-800 text-sm space-y-1 list-decimal list-inside">
                      <li>Saisie des informations obligatoires</li>
                      <li>Vérification de l&apos;adresse email</li>
                      <li>Activation du compte par lien email</li>
                      <li>Configuration du profil utilisateur</li>
                      <li>Acceptation des conditions d&apos;utilisation</li>
                    </ol>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">🔐 Sécurité du Compte</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Mot de passe fort obligatoire (8+ caractères)</li>
                      <li>• Authentification à deux facteurs recommandée</li>
                      <li>• Responsabilité de la confidentialité des identifiants</li>
                      <li>• Notification obligatoire en cas de compromission</li>
                      <li>• Déconnexion automatique après inactivité</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">⚙️ Gestion du Compte</h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Modification des informations personnelles</li>
                      <li>• Paramétrage des notifications</li>
                      <li>• Gestion des préférences de confidentialité</li>
                      <li>• Export des données personnelles</li>
                      <li>• Suppression définitive du compte</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-3">🚫 Comptes Interdits</h3>
                <div className="text-red-800 text-sm space-y-2">
                  <p><strong>Sont strictement interdits :</strong></p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1">
                      <li>• Comptes multiples pour une même personne</li>
                      <li>• Utilisation d&apos;identité fictive ou usurpée</li>
                      <li>• Comptes créés par des robots/scripts</li>
                      <li>• Comptes à des fins commerciales non autorisées</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Partage de compte entre plusieurs personnes</li>
                      <li>• Revente ou transfert de compte</li>
                      <li>• Contournement des mesures de sécurité</li>
                      <li>• Utilisation à des fins malveillantes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📧 Communications Relatives au Compte</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Emails transactionnels :</strong> Confirmation d&apos;inscription, réinitialisation de mot de passe, notifications de sécurité (non désactivables).</p>
                  <p><strong>Notifications produit :</strong> Nouvelles fonctionnalités, mises à jour importantes, conseils d&apos;utilisation (paramétrable).</p>
                  <p><strong>Communications marketing :</strong> Newsletter, offres spéciales, contenus éditoriaux (opt-in explicite requis).</p>
                  <p><strong>Support client :</strong> Réponses aux demandes d&apos;assistance, enquêtes de satisfaction (dans le cadre du support).</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Utilisation du Service */}
        <section id="section5" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                Règles d&apos;Utilisation du Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Utilisations Autorisées
                    </h4>

                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Gestion personnelle de recherche d&apos;emploi</li>
                      <li>• Suivi de candidatures et entretiens</li>
                      <li>• Stockage de documents professionnels</li>
                      <li>• Utilisation des fonctionnalités prévues</li>
                      <li>• Partage limité avec conseillers emploi</li>
                      <li>• Export de ses propres données</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">📋 Bonnes Pratiques</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Maintenir ses informations à jour</li>
                      <li>• Utiliser des mots de passe sécurisés</li>
                      <li>• Respecter la confidentialité des autres utilisateurs</li>
                      <li>• Signaler les bugs et problèmes techniques</li>
                      <li>• Fournir des retours constructifs</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Utilisations Strictement Interdites
                    </h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Revente ou redistribution du service</li>
                      <li>• Utilisation commerciale non autorisée</li>
                      <li>• Tentative de piratage ou intrusion</li>
                      <li>• Contournement des limitations techniques</li>
                      <li>• Création de comptes multiples</li>
                      <li>• Spam ou envoi de contenu malveillant</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-3">⚠️ Contenus Interdits</h4>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Contenus illégaux ou diffamatoires</li>
                      <li>• Informations discriminatoires</li>
                      <li>• Données personnelles de tiers non autorisées</li>
                      <li>• Contenus pornographiques ou violents</li>
                      <li>• Virus, malwares ou codes malveillants</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-3">🛡️ Obligations de l&apos;Utilisateur</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
                  <div>
                    <h4 className="font-medium mb-2">Responsabilités Techniques :</h4>
                    <ul className="space-y-1">
                      <li>• Maintenir ses équipements et logiciels à jour</li>
                      <li>• Disposer d&apos;une connexion internet stable</li>
                      <li>• Utiliser des navigateurs supportés</li>
                      <li>• Effectuer des sauvegardes de ses données importantes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Responsabilités Légales :</h4>
                    <ul className="space-y-1">
                      <li>• Respecter la législation applicable</li>
                      <li>• Ne pas porter atteinte aux droits de tiers</li>
                      <li>• Assumer la responsabilité de ses contenus</li>
                      <li>• Collaborer en cas d&apos;enquête judiciaire</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">🔍 Surveillance et Modération</h4>
                <p className="text-amber-800 text-sm mb-2">
                  La Société se réserve le droit, sans obligation, de surveiller l&apos;utilisation du Service et de modérer les contenus :
                </p>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Surveillance automatisée par algorithmes de détection</li>
                  <li>• Contrôles manuels aléatoires ou suite à signalement</li>
                  <li>• Suppression immédiate des contenus non conformes</li>
                  <li>• Suspension ou résiliation des comptes contrevenants</li>
                  <li>• Signalement aux autorités compétentes si nécessaire</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 6: Tarifs et Paiements */}
        <section id="section6" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                Tarifs et Conditions de Paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                  <Euro className="h-5 w-5" />
                  Modèle Tarifaire
                </h3>
                <p className="text-emerald-800 text-sm">
                  Candi Tracker propose un modèle freemium avec des fonctionnalités de base gratuites et des abonnements premium 
                  pour des fonctionnalités avancées. Les tarifs sont exprimés en euros, toutes taxes comprises.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">🆓 Plan Gratuit</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Prix :</strong> 0 € / mois</p>
                    <p><strong>Candidatures :</strong> Jusqu&apos;à 50</p>
                    <p><strong>Stockage :</strong> 100 MB</p>
                    <p><strong>Support :</strong> Email uniquement</p>
                    <p><strong>Fonctionnalités :</strong> Basiques</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">⭐ Plan Premium</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p><strong>Prix :</strong> 9,99 € / mois</p>
                    <p><strong>Candidatures :</strong> Illimitées</p>
                    <p><strong>Stockage :</strong> 5 GB</p>
                    <p><strong>Support :</strong> Prioritaire</p>
                    <p><strong>Fonctionnalités :</strong> Toutes incluses</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🏢 Plan Entreprise</h4>
                  <div className="text-sm text-purple-800 space-y-2">
                    <p><strong>Prix :</strong> Sur devis</p>
                    <p><strong>Candidatures :</strong> Illimitées</p>
                    <p><strong>Stockage :</strong> Illimité</p>
                    <p><strong>Support :</strong> Dédié 24/7</p>
                    <p><strong>Fonctionnalités :</strong> + API et SSO</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">💳 Modalités de Paiement</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Paiement par carte bancaire (Visa, Mastercard)</li>
                      <li>• Prélèvement SEPA pour les résidents UE</li>
                      <li>• PayPal accepté</li>
                      <li>• Facture B2B sur demande (virement)</li>
                      <li>• Paiement sécurisé via Stripe</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">📅 Facturation et Renouvellement</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Facturation mensuelle ou annuelle</li>
                      <li>• Renouvellement automatique sauf résiliation</li>
                      <li>• Facture envoyée par email</li>
                      <li>• Remise 20% pour l&apos;abonnement annuel</li>
                      <li>• Pas de remboursement au prorata</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">🔄 Modifications Tarifaires</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Notification 60 jours avant augmentation</li>
                      <li>• Application au prochain cycle de facturation</li>
                      <li>• Droit de résiliation sans frais</li>
                      <li>• Conditions existantes maintenues jusqu&apos;à résiliation</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">❌ Défaut de Paiement</h4>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Suspension du compte après 7 jours</li>
                      <li>• Relances automatiques par email</li>
                      <li>• Frais de relance : 15 € par incident</li>
                      <li>• Suppression des données après 90 jours</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">🚫 Politique de Remboursement</h4>
                <div className="text-red-800 text-sm space-y-2">
                  <p><strong>Principe général :</strong> Aucun remboursement n&apos;est accordé pour les abonnements entamés, sauf cas exceptionnels.</p>
                  <p><strong>Période d&apos;essai :</strong> 14 jours gratuits pour le plan Premium (nouveau utilisateur uniquement).</p>
                  <p><strong>Exceptions :</strong> Dysfonctionnement majeur du service {'>'} 72h consécutives, facturation erronée prouvée.</p>
                  <p><strong>Procédure :</strong> Demande par email avec justificatifs, traitement sous 15 jours ouvrés.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📄 Obligations Fiscales</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>TVA :</strong> TVA française applicable (20%) pour les particuliers résidents UE.</p>
                  <p><strong>Auto-liquidation :</strong> Entreprises UE avec numéro TVA valide (reverse charge).</p>
                  <p><strong>Pays tiers :</strong> Pas de TVA française, taxes locales à la charge du client.</p>
                  <p><strong>Justificatifs :</strong> Factures disponibles dans l&apos;espace client, archivage 10 ans.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 7: Propriété Intellectuelle */}
        <section id="section7" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</div>
                Propriété Intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">© Droits de la Société</h3>
                <div className="text-blue-800 text-sm space-y-2">
                  <p><strong>Propriété exclusive :</strong> La Société détient l&apos;intégralité des droits de propriété intellectuelle sur le Service, incluant sans limitation :</p>
                  <ul className="grid md:grid-cols-2 gap-2 mt-2">
                    <li>• Code source et architecture logicielle</li>
                    <li>• Design, interfaces et ergonomie</li>
                    <li>• Marques, logos et identité visuelle</li>
                    <li>• Documentation et contenus éditoriaux</li>
                    <li>• Algorithmes et processus métier</li>
                    <li>• Bases de données et structures</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Droits Accordés à l&apos;Utilisateur</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Licence d&apos;utilisation non-exclusive</li>
                      <li>• Usage personnel et professionnel limité</li>
                      <li>• Accès aux fonctionnalités souscrites</li>
                      <li>• Droit de consulter et télécharger ses données</li>
                      <li>• Utilisation conforme aux présentes CGU</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">📄 Droits sur le Contenu Utilisateur</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• L&apos;Utilisateur conserve ses droits de propriété</li>
                      <li>• Licence d&apos;exploitation accordée à la Société</li>
                      <li>• Droit de traitement pour fourniture du service</li>
                      <li>• Anonymisation pour amélioration du produit</li>
                      <li>• Pas d&apos;utilisation commerciale sans accord</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">🚫 Interdictions Formelles</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Reproduction ou copie du Service</li>
                      <li>• Rétro-ingénierie ou décompilation</li>
                      <li>• Création d&apos;œuvres dérivées</li>
                      <li>• Utilisation des marques sans autorisation</li>
                      <li>• Revente ou sublicence à des tiers</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">⚖️ Sanctions en cas de Violation</h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Suspension immédiate du compte</li>
                      <li>• Résiliation définitive du service</li>
                      <li>• Dommages et intérêts</li>
                      <li>• Action en contrefaçon</li>
                      <li>• Signalement aux autorités compétentes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-3">🔗 Contenus de Tiers</h4>
                <div className="text-orange-800 text-sm space-y-2">
                  <p><strong>Intégrations tierces :</strong> Le Service peut intégrer des contenus ou technologies de tiers (Google, LinkedIn, etc.).</p>
                  <p><strong>Licences spécifiques :</strong> Ces éléments restent soumis aux licences de leurs propriétaires respectifs.</p>
                  <p><strong>Responsabilité limitée :</strong> La Société n&apos;est pas responsable des violations de droits par des contenus tiers.</p>
                  <p><strong>Signalement :</strong> Toute violation présumée doit être signalée à legal@candi-tracker.com.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📝 Procédure DMCA</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Signalement :</strong> Les titulaires de droits peuvent signaler les violations présumées via notre formulaire dédié.</p>
                  <p><strong>Informations requises :</strong> Identification du contenu, preuve de propriété, coordonnées complètes.</p>
                  <p><strong>Traitement :</strong> Retrait sous 72h si la demande est recevable, notification à l&apos;utilisateur concerné.</p>
                  <p><strong>Contre-notification :</strong> Possibilité de contester le retrait avec justification légale.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 8: Données et Confidentialité */}
        <section id="section8" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">8</div>
                Protection des Données et Confidentialité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Renvoi à la Politique de Confidentialité
                </h3>
                <p className="text-blue-800 text-sm">
                  Le traitement des données personnelles est régi par notre <strong>Politique de Confidentialité</strong>, 
                  qui fait partie intégrante des présentes CGU. Elle détaille nos pratiques de collecte, 
                  traitement, stockage et protection de vos données personnelles en conformité avec le RGPD.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🔐 Engagements de Sécurité</h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Chiffrement AES-256 pour toutes les données</li>
                    <li>• Transmission sécurisée par TLS 1.3</li>
                    <li>• Authentification multi-facteurs</li>
                    <li>• Sauvegardes chiffrées quotidiennes</li>
                    <li>• Audits de sécurité réguliers</li>
                    <li>• Hébergement en Union Européenne</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">👤 Vos Droits RGPD</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Droit d&apos;accès à vos données</li>
                    <li>• Droit de rectification</li>
                    <li>• Droit à l&apos;effacement</li>
                    <li>• Droit à la portabilité</li>
                    <li>• Droit d&apos;opposition</li>
                    <li>• Droit de limitation du traitement</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">📊 Utilisation des Données</h4>
                <div className="text-yellow-800 text-sm space-y-2">
                  <p><strong>Données anonymisées :</strong> Nous pouvons utiliser des données anonymisées et agrégées pour :</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    <li>• Amélioration du service</li>
                    <li>• Analyses statistiques</li>
                    <li>• Recherche et développement</li>
                    <li>• Benchmarks sectoriels anonymes</li>
                  </ul>
                  <p className="text-xs mt-2"><strong>Important :</strong> Ces données ne permettent aucune réidentification individuelle.</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">🚨 Gestion des Incidents</h4>
                <div className="text-red-800 text-sm space-y-2">
                  <p><strong>Notification d&apos;incident :</strong> En cas de violation de données personnelles :</p>
                  <ul className="space-y-1">
                    <li>• Notification à la CNIL sous 72h</li>
                    <li>• Information des utilisateurs concernés si risque élevé</li>
                    <li>• Mise en place de mesures correctives immédiates</li>
                    <li>• Investigation approfondie et rapport détaillé</li>
                    <li>• Amélioration des mesures de sécurité</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📞 Contact DPO</h4>
                <div className="text-sm text-gray-700">
                  <p>Pour toute question relative à la protection de vos données personnelles :</p>
                  <p><strong>Délégué à la Protection des Données (DPO) :</strong> dpo@candi-tracker.com</p>
                  <p><strong>Adresse postale :</strong> DPO Candi Tracker, 21 Rue du Cher, 31100 Toulouse, France</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 9: Responsabilités */}
        <section id="section9" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">9</div>
                Responsabilités et Garanties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Limitation de Responsabilité
                </h3>
                <p className="text-amber-800 text-sm mb-2">
                  <strong>Principe général :</strong> La responsabilité de la Société est limitée dans les conditions prévues par la loi française.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Engagements de la Société</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Fourniture du service conforme à la description</li>
                      <li>• Disponibilité visée : 99,5% (hors maintenance)</li>
                      <li>• Correction des bugs critiques sous 72h</li>
                      <li>• Support client en français</li>
                      <li>• Respect de la confidentialité des données</li>
                      <li>• Conformité RGPD et réglementations applicables</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">🎯 Obligations de Moyens</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Mise en œuvre des moyens raisonnables</li>
                      <li>• Respect des bonnes pratiques techniques</li>
                      <li>• Maintenance préventive régulière</li>
                      <li>• Formation continue des équipes</li>
                      <li>• Veille technologique et sécuritaire</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">🚫 Exclusions de Responsabilité</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Dommages indirects ou imprévus</li>
                      <li>• Perte de bénéfices ou d&apos;opportunités</li>
                      <li>• Interruptions dues à la force majeure</li>
                      <li>• Dysfonctionnements de tiers (Internet, etc.)</li>
                      <li>• Utilisation non conforme du service</li>
                      <li>• Contenu généré par les utilisateurs</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">💰 Plafonnement de Responsabilité</h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Dommages directs limités aux sommes payées</li>
                      <li>• Maximum : 12 mois d&apos;abonnement</li>
                      <li>• Plan gratuit : limitation à 100 €</li>
                      <li>• Exception : faute intentionnelle prouvée</li>
                      <li>• Assurance responsabilité civile professionnelle</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-3">⚖️ Responsabilités de l&apos;Utilisateur</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
                  <div>
                    <h5 className="font-medium mb-2">Obligations Techniques :</h5>
                    <ul className="space-y-1">
                      <li>• Maintenir ses équipements à jour</li>
                      <li>• Sécuriser ses accès et identifiants</li>
                      <li>• Effectuer des sauvegardes personnelles</li>
                      <li>• Respecter les limitations d&apos;usage</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Obligations Légales :</h5>
                    <ul className="space-y-1">
                      <li>• Respecter les droits de propriété intellectuelle</li>
                      <li>• Ne pas porter atteinte aux droits de tiers</li>
                      <li>• Assumer la responsabilité de ses contenus</li>
                      <li>• Indemniser la Société en cas de réclamation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">⚠️ Avertissements Importants</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Service d&apos;aide :</strong> Candi Tracker est un outil d&apos;aide à la recherche d&apos;emploi, il ne garantit pas l&apos;obtention d&apos;un poste.</p>
                  <p><strong>Conseils informatifs :</strong> Les conseils et recommandations fournis sont à titre informatif et ne constituent pas du conseil en carrière personnalisé.</p>
                  <p><strong>Responsabilité personnelle :</strong> L&apos;utilisateur reste seul responsable de ses candidatures, entretiens et décisions professionnelles.</p>
                  <p><strong>Vérification :</strong> Il appartient à l&apos;utilisateur de vérifier l&apos;exactitude des informations saisies et des conseils appliqués.</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">🛡️ Garanties Légales</h4>
                <div className="text-emerald-800 text-sm space-y-2">
                  <p><strong>Conformité :</strong> Le service est fourni conforme à sa description et aux fonctionnalités annoncées.</p>
                  <p><strong>Défauts :</strong> Correction gratuite des défauts de conformité signalés dans un délai raisonnable.</p>
                  <p><strong>Mise à jour :</strong> Mises à jour de sécurité et corrections critiques incluses dans l&apos;abonnement.</p>
                  <p><strong>Support :</strong> Assistance technique fournie selon le niveau d&apos;abonnement souscrit.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer légal */}
        <div className="bg-gray-900 text-white p-8 rounded-lg">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Candi Tracker SAS</h3>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-gray-300 text-sm">
                Ces Conditions Générales d&apos;Utilisation constituent un contrat légalement contraignant entre vous et Candi Tracker SAS. 
                Elles sont régies par le droit français et soumises à la juridiction des tribunaux de Toulouse.
              </p>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Informations Légales</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p><strong>Société :</strong> Candi Tracker SAS</p>
                    <p><strong>Capital :</strong> [À compléter] €</p>
                    <p><strong>RCS :</strong> Toulouse [À compléter]</p>
                    <p><strong>SIRET :</strong> [À compléter]</p>
                  </div>
                  <div>
                    <p><strong>Adresse :</strong> 21 Rue du Cher, 31100 Toulouse</p>
                    <p><strong>TVA :</strong> FR[À compléter]</p>
                    <p><strong>Hébergeur :</strong> OVH SAS</p>
                    <p><strong>Assurance :</strong> [Compagnie] Police n°[À compléter]</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span>© 2025 Candi Tracker SAS</span>
              <span>•</span>
              <span>Tous droits réservés</span>
              <span>•</span>
              <span>Version 2.1 - {lastUpdated}</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="mailto:legal@candi-tracker.com" className="text-emerald-400 hover:text-emerald-300">
                Questions Juridiques
              </a>
              <a href="mailto:dpo@candi-tracker.com" className="text-emerald-400 hover:text-emerald-300">
                Protection des Données
              </a>
              <a href="/privacy-policy" className="text-emerald-400 hover:text-emerald-300">
                Politique de Confidentialité
              </a>
              <a href="/cookies" className="text-emerald-400 hover:text-emerald-300">
                Politique Cookies
              </a>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                Document rédigé par des juristes spécialisés en droit du numérique et régulièrement mis à jour 
                pour maintenir sa conformité avec l&apos;évolution législative et jurisprudentielle française et européenne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;