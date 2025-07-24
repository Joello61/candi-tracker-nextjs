'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import applicationService from '@/services/applicationService';
import type { ApplicationForm } from '@/types';

// Hook pour récupérer les candidatures
export const useApplications = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  company?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: () => applicationService.getApplications(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook pour récupérer une candidature par ID
export const useApplication = (id: string) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => applicationService.getApplicationById(id),
    enabled: !!id,
  });
};

// Hook pour créer une candidature
export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApplicationForm) => applicationService.createApplication(data),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_newApplication) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applicationStats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      
      toast.success('Candidature créée avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la création de la candidature');
    },
  });
};

// Hook pour mettre à jour une candidature
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ApplicationForm> }) =>
      applicationService.updateApplication(id, data),
    onSuccess: (updatedApplication) => {
      // Update cache for specific application
      queryClient.setQueryData(
        ['application', updatedApplication.id],
        updatedApplication
      );
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applicationStats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      
      toast.success('Candidature mise à jour avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour');
    },
  });
};

// Hook pour supprimer une candidature
export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applicationService.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applicationStats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      
      toast.success('Candidature supprimée avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression');
    },
  });
};