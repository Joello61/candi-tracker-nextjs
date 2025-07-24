'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import documentService from '@/services/documentService';
import type { DocumentFilters } from '@/types';

// Hook pour récupérer les documents
export const useDocuments = (
  params?: Partial<
    DocumentFilters & {
      page?: number;
      limit?: number;
    }
  >
) => {
  return useQuery({
    queryKey: ['documents', params],
    queryFn: () => documentService.getDocuments(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook pour récupérer un document par ID
export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => documentService.getDocumentById(id),
    enabled: !!id,
  });
};

// Hook pour récupérer les statistiques des documents
export const useDocumentStats = () => {
  return useQuery({
    queryKey: ['documentStats'],
    queryFn: () => documentService.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour récupérer les documents d'une candidature
export const useDocumentsByApplication = (applicationId: string) => {
  return useQuery({
    queryKey: ['documentsByApplication', applicationId],
    queryFn: () => documentService.getDocumentsByApplication(applicationId),
    enabled: !!applicationId,
    staleTime: 2 * 60 * 1000,
  });
};

// Hook pour uploader des documents
export const useUploadDocuments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      files,
      applicationId,
      options,
    }: {
      files: FileList;
      applicationId: string;
      options?: { name?: string; type?: string };
    }) => documentService.uploadDocuments(files, applicationId, options),
    onSuccess: (result, variables) => {
      console.log("Réponse complète de l'API:", result); // Debug

      // Vérifier que result est défini et a la structure attendue
      const documents = result?.documents || [];
      const errors = result?.errors || [];

      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['documentStats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });

      // Invalider les documents de l'application associée
      if (variables.applicationId) {
        queryClient.invalidateQueries({
          queryKey: ['documentsByApplication', variables.applicationId],
        });
        queryClient.invalidateQueries({
          queryKey: ['application', variables.applicationId],
        });
        queryClient.invalidateQueries({ queryKey: ['applications'] });
      }

      const successCount = documents.length;
      const errorCount = errors.length;

      if (successCount > 0) {
        toast.success(
          `${successCount} document${successCount > 1 ? 's' : ''} uploadé${
            successCount > 1 ? 's' : ''
          } avec succès !`
        );
      }

      if (errorCount > 0) {
        errors.forEach((error) => {
          toast.error(error);
        });
      }

      // Si aucun document n'a été uploadé et qu'il n'y a pas d'erreurs, afficher un message générique
      if (successCount === 0 && errorCount === 0) {
        toast.info('Upload terminé');
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error('Erreur complète:', error);
      toast.error(
        error?.message ||
          error?.error ||
          "Erreur lors de l'upload des documents"
      );
    },
  });
};

// Hook pour mettre à jour un document
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; type?: string };
    }) => documentService.updateDocument(id, data),
    onSuccess: (updatedDocument) => {
      // Mettre à jour le cache pour ce document spécifique
      queryClient.setQueryData(
        ['document', updatedDocument.id],
        updatedDocument
      );

      // Invalider les queries connexes
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['documentStats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });

      // Mettre à jour l'application associée
      if (updatedDocument.applicationId) {
        queryClient.invalidateQueries({
          queryKey: ['documentsByApplication', updatedDocument.applicationId],
        });
        queryClient.invalidateQueries({
          queryKey: ['application', updatedDocument.applicationId],
        });
        queryClient.invalidateQueries({ queryKey: ['applications'] });
      }

      toast.success('Document mis à jour avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour');
    },
  });
};

// Hook pour supprimer un document
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['documentStats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });

      toast.success('Document supprimé avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression');
    },
  });
};

// Hook pour supprimer plusieurs documents
export const useDeleteDocuments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => documentService.deleteDocuments(ids),
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['documentStats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });

      toast.success(
        `${ids.length} document${ids.length > 1 ? 's' : ''} supprimé${
          ids.length > 1 ? 's' : ''
        } avec succès !`
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression');
    },
  });
};

// Hook pour télécharger un document
export const useDownloadDocument = () => {
  return useMutation({
    mutationFn: ({ id, filename }: { id: string; filename: string }) =>
      documentService.downloadDocument(id).then((blob) => ({ blob, filename })),
    onSuccess: ({ blob, filename }) => {
      // Créer un lien de téléchargement temporaire
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Nettoyer
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Téléchargement démarré !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors du téléchargement');
    },
  });
};
