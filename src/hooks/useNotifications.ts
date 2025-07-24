'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import notificationService, { type NotificationFilters, type CreateNotificationData } from '@/services/notificationService';

// Query keys pour une gestion optimale du cache
export const notificationQueryKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationQueryKeys.all, 'list'] as const,
  list: (filters: NotificationFilters) => [...notificationQueryKeys.lists(), filters] as const,
  stats: () => [...notificationQueryKeys.all, 'stats'] as const,
  settings: () => [...notificationQueryKeys.all, 'settings'] as const,
};

// Hook pour récupérer les notifications
export const useNotifications = (filters?: NotificationFilters) => {
  return useQuery({
    queryKey: notificationQueryKeys.list(filters || {}),
    queryFn: () => notificationService.getNotifications(filters),
    staleTime: 30 * 1000, // 30 secondes
    refetchInterval: 60 * 1000, // Refetch toutes les minutes
    select: (data) => ({
      // Adapter la structure de réponse du backend
      items: data.notifications,
      pagination: data.pagination,
    }),
  });
};

// Hook pour les statistiques des notifications
export const useNotificationStats = () => {
  return useQuery({
    queryKey: notificationQueryKeys.stats(),
    queryFn: () => notificationService.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch toutes les 2 minutes
  });
};

// Hook pour créer une notification
export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotificationData) => notificationService.createNotification(data),
    onSuccess: () => {
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
      toast.success('Notification créée avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la création de la notification');
    },
  });
};

// Hook pour marquer une notification comme lue
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour');
    },
  });
};

// Hook pour marquer toutes les notifications comme lues
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
      toast.success(`${data.count} notification(s) marquée(s) comme lue(s)`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour');
    },
  });
};

// Hook pour supprimer une notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
      toast.success('Notification supprimée');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression');
    },
  });
};

// Hook pour nettoyer les anciennes notifications
export const useCleanupNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (days: number = 30) => notificationService.cleanupOldNotifications(days),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
      toast.success(`${data.count} notification(s) supprimée(s)`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors du nettoyage');
    },
  });
};

// Hook pour les paramètres de notifications
export const useNotificationSettings = () => {
  return useQuery({
    queryKey: notificationQueryKeys.settings(),
    queryFn: () => notificationService.getSettings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour mettre à jour les paramètres
export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => notificationService.updateSettings(data),
    onSuccess: (updatedSettings) => {
      // Mettre à jour le cache
      queryClient.setQueryData(notificationQueryKeys.settings(), updatedSettings);
      toast.success('Paramètres mis à jour avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour des paramètres');
    },
  });
};

// Hook personnalisé pour l'état des notifications non lues
export const useUnreadNotifications = () => {
  const { data: stats } = useNotificationStats();
  return {
    unreadCount: stats?.unread || 0,
    hasUnread: (stats?.unread || 0) > 0,
  };
};