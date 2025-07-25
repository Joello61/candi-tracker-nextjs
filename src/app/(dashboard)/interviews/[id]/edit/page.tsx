import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { ArrowLeft } from 'lucide-react';

import { InterviewForm } from '@/components/forms/InterviewForm';
import { useInterview, useUpdateInterview } from '@/hooks/useInterviews';
import { useApplications } from '@/hooks/useApplications';
import type { InterviewForm as InterviewFormType } from '@/types';
import { Metadata } from 'next';

export const editInterviewMetadata: Metadata = {
  title: 'Modifier entretien',
  description: 'Modifiez les détails de votre entretien d\'embauche sur Candi Tracker. Mettez à jour l\'horaire, les notes et les informations importantes.',
  keywords: [
    'modifier entretien',
    'éditer interview',
    'mettre à jour entretien',
    'edit interview',
    'modification rendez-vous',
    'update entretien',
    'gestion entretiens'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Modification d\'entretien | Candi Tracker',
    description: 'Actualisez toutes les informations de votre entretien pour rester organisé.',
    images: [{ url: '/og-interviews.jpg', width: 1200, height: 630 }],
  }
}

export const EditInterviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();

  const { data: interview, isLoading, error } = useInterview(id!);
  const updateInterview = useUpdateInterview();

  // Récupérer les candidatures pour le sélecteur
  const { data: applicationsData } = useApplications({
    limit: 100,
    sortBy: 'company',
    sortOrder: 'asc',
  });

  const applications = applicationsData?.items || [];

  const handleSubmit = async (data: InterviewFormType) => {
    if (id) {
      await updateInterview.mutateAsync({ id, data });
      navigate.push(`/interviews/${id}`);
    }
  };

  const handleCancel = () => {
    navigate.push(`/interviews/${id}`);
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement de l&apos;entretien. Veuillez réessayer.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Form skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>Entretien non trouvé.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate.push(`/interviews/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Modifier l&apos;entretien
          </h1>
          {interview.application && (
            <p className="text-gray-600">
              {interview.application.position} chez{' '}
              {interview.application.company}
            </p>
          )}
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Détails de l&apos;entretien</CardTitle>
          <CardDescription>
            Modifiez les informations de votre entretien ci-dessous.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InterviewForm
            initialData={{
              applicationId: interview.applicationId,
              type: interview.type,
              scheduledAt: interview.scheduledAt,
              duration: interview.duration || 60,
              notes: interview.notes || '',
              feedback: interview.feedback || '',
              interviewers:
                interview.interviewers.length > 0
                  ? interview.interviewers
                  : [''],
            }}
            onSubmit={handleSubmit}
            loading={updateInterview.isPending}
            submitLabel="Mettre à jour"
            applications={applications.map((app) => ({
              id: app.id,
              company: app.company,
              position: app.position,
            }))}
          />
        </CardContent>
      </Card>

      {/* Boutons d'action personnalisés */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default EditInterviewPage;
