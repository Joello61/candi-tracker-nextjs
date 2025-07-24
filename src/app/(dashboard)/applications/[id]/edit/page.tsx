'use client'

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { ArrowLeft } from 'lucide-react';

import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { useApplication, useUpdateApplication } from '@/hooks/useApplications';
import type { ApplicationForm as ApplicationFormType } from '@/types';

export const EditApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();

  const { data: application, isLoading, error } = useApplication(id!);
  const updateApplication = useUpdateApplication();

  const handleSubmit = async (data: ApplicationFormType) => {
    if (id) {
      await updateApplication.mutateAsync({ id, data });
      navigate.push(`/applications/${id}`);
    }
  };

  const handleCancel = () => {
    navigate.push(`/applications/${id}`);
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement de la candidature. Veuillez réessayer.
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

  if (!application) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>
            Candidature non trouvée.
          </AlertDescription>
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
          onClick={() => navigate.push(`/applications/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Modifier la candidature
          </h1>
          <p className="text-gray-600">
            {application.position} chez {application.company}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de la candidature</CardTitle>
          <CardDescription>
            Modifiez les détails de votre candidature ci-dessous.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm
            initialData={{
              company: application.company,
              position: application.position,
              status: application.status,
              appliedAt: application.appliedAt,
              notes: application.notes || '',
              salary: application.salary || '',
              location: application.location || '',
              jobUrl: application.jobUrl || '',
              contactName: application.contactName || '',
              contactEmail: application.contactEmail || '',
            }}
            onSubmit={handleSubmit}
            loading={updateApplication.isPending}
            submitLabel="Mettre à jour"
          />
        </CardContent>
      </Card>

      {/* Custom cancel button override */}
      <style>{`
        .space-y-6 form .flex.justify-end button[type="button"] {
          display: none;
        }
      `}</style>
      
      {/* Custom action buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default EditApplicationPage;