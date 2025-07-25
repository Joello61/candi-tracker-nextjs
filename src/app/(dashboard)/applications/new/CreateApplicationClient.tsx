'use client'

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { useCreateApplication } from '@/hooks/useApplications';
import type { ApplicationForm as ApplicationFormType } from '@/types';

export const CreateApplicationClient: React.FC = () => {
  const navigate = useRouter();
  const createApplication = useCreateApplication();

  const handleSubmit = async (data: ApplicationFormType) => {
    try {
      const newApplication = await createApplication.mutateAsync(data);
      navigate.push(`/applications/${newApplication.id}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // L'erreur est déjà gérée dans le hook
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate.push('/applications')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Nouvelle candidature
          </h1>
          <p className="text-gray-600 mt-1">
            Ajoutez une nouvelle candidature à votre suivi
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <ApplicationForm
        onSubmit={handleSubmit}
        loading={createApplication.isPending}
        submitLabel="Créer la candidature"
      />
    </div>
  );
};

export default CreateApplicationClient;