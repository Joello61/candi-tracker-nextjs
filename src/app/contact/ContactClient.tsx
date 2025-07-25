'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  Mail,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  Loader2
} from 'lucide-react';

// Schéma de validation pour le formulaire de contact
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  category: z.enum(['support', 'bug', 'feature', 'general'], {
    required_error: 'Veuillez sélectionner une catégorie'
  }),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères')
});

type ContactFormData = z.infer<typeof contactSchema>;

const categories = [
  { value: 'support', label: 'Support technique', icon: HelpCircle },
  { value: 'bug', label: 'Signaler un bug', icon: Bug },
  { value: 'feature', label: 'Suggestion de fonctionnalité', icon: Lightbulb },
  { value: 'general', label: 'Question générale', icon: MessageCircle },
];

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'Candi Tracker';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simuler l'envoi (remplacez par votre API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous pourriez envoyer à votre API
      console.log('Contact form data:', data);
      
      toast.success('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      reset();
      
    } catch (error) {
      console.error('Erreur envoi contact:', error);
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <LandingHeader applicationName={applicationName} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Contactez-nous
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans votre recherche d&apos;emploi. 
              N&apos;hésitez pas à nous poser vos questions !
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">support@canditracker.com</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    Réponse sous 24h en semaine
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>Horaires</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-slate-600 dark:text-slate-400">
                    <p>Lundi - Vendredi: 9h - 18h</p>
                    <p>Weekend: Support par email</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <span>Support rapide</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    Pour une aide immédiate, consultez notre FAQ ou utilisez le chat en direct.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ouvrir le chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nom et Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="Jean Dupont"
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="jean@exemple.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Catégorie */}
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Select
                        value={watch('category') || ''}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onValueChange={(value) => setValue('category', value as any)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                              <SelectItem key={cat.value} value={cat.value}>
                                <div className="flex items-center space-x-2">
                                  <Icon className="h-4 w-4" />
                                  <span>{cat.label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>

                    {/* Sujet */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        placeholder="Résumé de votre demande"
                        disabled={isSubmitting}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Bouton d'envoi */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ rapide */}
      <section className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Questions fréquentes
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Trouvez rapidement des réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                question: "Comment importer mes candidatures ?",
                answer: "Utilisez la fonction d'import dans votre tableau de bord ou ajoutez-les manuellement."
              },
              {
                question: "Puis-je exporter mes données ?",
                answer: "Oui, vous pouvez exporter toutes vos données au format PDF ou Excel."
              },
              {
                question: "L'application est-elle gratuite ?",
                answer: "Nous proposons un plan gratuit avec des fonctionnalités de base et des plans premium."
              },
              {
                question: "Comment suivre mes entretiens ?",
                answer: "Le calendrier intégré vous permet de planifier et suivre tous vos entretiens."
              },
              {
                question: "Mes données sont-elles sécurisées ?",
                answer: "Oui, nous utilisons un chiffrement de niveau bancaire pour protéger vos données."
              },
              {
                question: "Puis-je accéder à l'app sur mobile ?",
                answer: "L'application est responsive et fonctionne parfaitement sur tous les appareils."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter applicationName={applicationName} />
    </div>
  );
}