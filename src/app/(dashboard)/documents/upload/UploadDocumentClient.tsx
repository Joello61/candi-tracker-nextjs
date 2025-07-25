'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import { useApplications } from '@/hooks/useApplications';
import { DocumentUploadForm } from '@/components/forms/DocumentUploadForm';

export const UploadDocumentClient: React.FC = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const preselectedApplicationId = searchParams.get('applicationId');

  // Récupérer les candidatures pour le sélecteur
  const { data: applicationsData } = useApplications({
    limit: 100,
    sortBy: 'company',
    sortOrder: 'asc',
  });

  const applications = applicationsData?.items || [];

  const handleSuccess = () => {
    // Rediriger vers les documents ou vers la candidature associée
    if (preselectedApplicationId) {
      navigate.push(`/applications/${preselectedApplicationId}`);
    } else {
      navigate.push('/documents');
    }
  };

  const handleCancel = () => {
    if (preselectedApplicationId) {
      navigate.push(`/applications/${preselectedApplicationId}`);
    } else {
      navigate.push('/documents');
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
            Uploader des documents
          </h1>
          <p className="text-gray-600">
            Ajoutez des documents à vos candidatures
          </p>
        </div>
      </div>

      {/* Formulaire d'upload */}
      <DocumentUploadForm
        applicationId={preselectedApplicationId || ''}
        applications={applications.map((app) => ({
          id: app.id,
          company: app.company,
          position: app.position,
        }))}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        className="max-w-4xl mx-auto"
      />
    </div>
  );
};

export default UploadDocumentClient;