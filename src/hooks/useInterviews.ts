'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import interviewService from '@/services/interviewService';
import type { InterviewForm, InterviewFilters, InterviewWithApplication } from '@/types';

// Hook pour récupérer les entretiens
export const useInterviews = (params?: Partial<InterviewFilters & {
  page?: number;
  limit?: number;
}>) => {
  return useQuery({
    queryKey: ['interviews', params],
    queryFn: () => interviewService.getInterviews(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook pour récupérer un entretien par ID
export const useInterview = (id: string) => {
  return useQuery({
    queryKey: ['interview', id],
    queryFn: () => interviewService.getInterviewById(id),
    enabled: !!id,
  });
};

// Hook pour récupérer les statistiques des entretiens
export const useInterviewStats = () => {
  return useQuery({
    queryKey: ['interviewStats'],
    queryFn: () => interviewService.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour récupérer les entretiens à venir
export const useUpcomingInterviews = (limit: number = 5) => {
  return useQuery({
    queryKey: ['upcomingInterviews', limit],
    queryFn: () => interviewService.getUpcomingInterviews(limit),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Hook pour récupérer les événements du calendrier
export const useCalendarEvents = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['calendarEvents', startDate, endDate],
    queryFn: () => interviewService.getCalendarEvents(startDate, endDate),
    enabled: !!startDate && !!endDate && startDate !== '' && endDate !== '',
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Hook pour vérifier les conflits
export const useCheckConflicts = (params: {
  scheduledAt: string;
  duration?: number;
  excludeInterviewId?: string;
}) => {
  return useQuery({
    queryKey: ['checkConflicts', params],
    queryFn: () => interviewService.checkConflicts(params),
    enabled: !!params.scheduledAt,
    staleTime: 0, // Toujours fresh pour les conflits
  });
};

// Hook pour créer un entretien
export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InterviewForm) => interviewService.createInterview(data),
    onSuccess: (newInterview: InterviewWithApplication) => {
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      queryClient.invalidateQueries({ queryKey: ['interviewStats'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingInterviews'] });
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      
      // Mettre à jour le cache de l'application associée
      if (newInterview.applicationId) {
        queryClient.invalidateQueries({ 
          queryKey: ['application', newInterview.applicationId] 
        });
        queryClient.invalidateQueries({ queryKey: ['applications'] });
      }
      
      toast.success('Entretien créé avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la création de l\'entretien');
    },
  });
};

// Hook pour mettre à jour un entretien
export const useUpdateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InterviewForm> }) =>
      interviewService.updateInterview(id, data),
    onSuccess: (updatedInterview: InterviewWithApplication) => {
      // Mettre à jour le cache pour cet entretien spécifique
      queryClient.setQueryData(
        ['interview', updatedInterview.id],
        updatedInterview
      );
      
      // Invalider les queries connexes
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      queryClient.invalidateQueries({ queryKey: ['interviewStats'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingInterviews'] });
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      
      // Mettre à jour l'application associée
      if (updatedInterview.applicationId) {
        queryClient.invalidateQueries({ 
          queryKey: ['application', updatedInterview.applicationId] 
        });
        queryClient.invalidateQueries({ queryKey: ['applications'] });
      }
      
      toast.success('Entretien mis à jour avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour');
    },
  });
};

// Hook pour supprimer un entretien
export const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => interviewService.deleteInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      queryClient.invalidateQueries({ queryKey: ['interviewStats'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingInterviews'] });
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      
      toast.success('Entretien supprimé avec succès !');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression');
    },
  });
};