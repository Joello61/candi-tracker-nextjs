'use client'

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { ArrowLeft, FileText, Loader2 } from 'lucide-react';

import { DocumentType } from '@/types';
import { useDocument, useUpdateDocument } from '@/hooks/useDocuments';
import {
  updateDocumentSchema,
  type UpdateDocumentFormData,
} from '@/utils/documentSchemas';
import { Metadata } from 'next';

const typeOptions = [
  { value: DocumentType.CV, label: 'CV' },
  { value: DocumentType.COVER_LETTER, label: 'Lettre de motivation' },
  { value: DocumentType.PORTFOLIO, label: 'Portfolio' },
  { value: DocumentType.CERTIFICATE, label: 'Certificat' },
  { value: DocumentType.OTHER, label: 'Autre' },
];

export const editDocumentMetadata: Metadata = {
  title: 'Modifier document',
  description: 'Modifiez vos documents professionnels sur Candi Tracker. Mettez à jour vos CV, lettres de motivation et autres fichiers importants.',
  keywords: [
    'modifier document',
    'éditer CV',
    'mettre à jour lettre motivation',
    'edit document',
    'gestion documents',
    'modification fichiers',
    'update documents'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Modification de document | Candi Tracker',
    description: 'Éditez facilement vos documents professionnels pour optimiser vos candidatures.',
    images: [{ url: '/og-documents.jpg', width: 1200, height: 630 }],
  }
}


export const EditDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();

  const { data: document, isLoading, error } = useDocument(id!);
  const updateDocument = useUpdateDocument();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateDocumentFormData>({
    resolver: zodResolver(updateDocumentSchema),
    defaultValues: {
      name: document?.name || '',
      type: document?.type || DocumentType.OTHER,
    },
  });

  // Mettre à jour les valeurs par défaut quand le document est chargé
  if (document && !watch('name')) {
    setValue('name', document.name);
    setValue('type', document.type);
  }

  const onSubmit = async (data: UpdateDocumentFormData) => {
    if (id) {
      await updateDocument.mutateAsync({ id, data });
      navigate.push('/documents');
    }
  };

  const handleCancel = () => {
    navigate.push('/documents');
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement du document. Veuillez réessayer.
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>Document non trouvé.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Modifier le document
          </h1>
          <p className="text-gray-600">
            Modifiez les informations de votre document
          </p>
        </div>
      </div>

      {/* Informations du document */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Informations du document</span>
          </CardTitle>
          <CardDescription>
            Modifiez le nom et le type de votre document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Aperçu du document actuel */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Document actuel
              </h3>
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{document.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{document.type}</span>
                    {document.size && (
                      <>
                        <span>•</span>
                        <span>{Math.round(document.size / 1024)} KB</span>
                      </>
                    )}
                  </div>
                  {document.application && (
                    <p className="text-sm text-gray-600 mt-1">
                      Associé à: {document.application.position} -{' '}
                      {document.application.company}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Formulaire d'édition */}
            <div className="space-y-4">
              {/* Nom du document */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom du document *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Nom du document"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Type de document */}
              <div className="space-y-2">
                <Label>Type de document</Label>
                <Select
                  value={watch('type')}
                  onValueChange={(value) =>
                    setValue('type', value as DocumentType)
                  }
                >
                  <SelectTrigger
                    className={errors.type ? 'border-red-500' : ''}
                  >
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button type="submit" disabled={updateDocument.isPending}>
                {updateDocument.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Mettre à jour
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDocumentPage;