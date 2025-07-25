'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ArrowLeft } from 'lucide-react';

import { InterviewForm } from '@/components/forms/InterviewForm';
import { useApplications } from '@/hooks/useApplications';
import type { InterviewForm as InterviewFormType } from '@/types';
import { useCreateInterview } from '@/hooks/useInterviews';

export const CreateInterviewClient: React.FC = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const preselectedApplicationId = searchParams.get('applicationId');

  const createInterview = useCreateInterview();

  // Récupérer les candidatures pour le sélecteur
  const { data: applicationsData } = useApplications({
    limit: 100, // Récupérer toutes les candidatures actives
    sortBy: 'company',
    sortOrder: 'asc',
  });

  const applications = applicationsData?.items || [];

  const handleSubmit = async (data: InterviewFormType) => {
    await createInterview.mutateAsync(data);

    // Rediriger vers la liste des entretiens ou vers la candidature associée
    if (preselectedApplicationId) {
      navigate.push(`/applications/${preselectedApplicationId}`);
    } else {
      navigate.push('/interviews');
    }
  };

  const handleCancel = () => {
    if (preselectedApplicationId) {
      navigate.push(`/applications/${preselectedApplicationId}`);
    } else {
      navigate.push('/interviews');
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Planifier un entretien
          </h1>
          <p className="text-gray-600">
            Ajoutez un nouvel entretien à votre calendrier
          </p>
        </div>
      </div>

      {/* Instructions si aucune candidature */}
      {applications.length === 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-sm text-amber-800">
                <strong>Aucune candidature trouvée.</strong> Vous devez d&apos;abord
                créer une candidature avant de pouvoir planifier un entretien.
              </p>
            </div>
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate.push('/applications/new')}
              >
                Créer une candidature
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulaire */}
      {applications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Détails de l&apos;entretien</CardTitle>
            <CardDescription>
              Remplissez les informations de votre entretien ci-dessous.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterviewForm
              initialData={{
                applicationId: preselectedApplicationId || '',
                type: undefined,
                scheduledAt: '',
                duration: 60,
                notes: '',
                feedback: '',
                interviewers: [''],
              }}
              onSubmit={handleSubmit}
              loading={createInterview.isPending}
              submitLabel="Planifier l'entretien"
              applications={applications.map((app) => ({
                id: app.id,
                company: app.company,
                position: app.position,
              }))}
            />
          </CardContent>
        </Card>
      )}

      {/* Custom cancel button override */}
      <style>{`
        .space-y-6 form .flex.justify-end button[type="button"] {
          display: none;
        }
      `}</style>

      {/* Custom action buttons */}
      {applications.length > 0 && (
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateInterviewClient;
