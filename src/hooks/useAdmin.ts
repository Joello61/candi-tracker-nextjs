'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '@/services/adminService';
import type {
  UserFilters,
  AdminUpdateUserForm,
  UserRole
} from '@/types';

// Query keys
export const adminQueryKeys = {
  all: ['admin'] as const,
  users: (filters: UserFilters) => [...adminQueryKeys.all, 'users', filters] as const,
  user: (id: string) => [...adminQueryKeys.all, 'user', id] as const,
  stats: () => [...adminQueryKeys.all, 'stats'] as const,
  activity: (limit: number) => [...adminQueryKeys.all, 'activity', limit] as const,
};

// Hook pour récupérer tous les utilisateurs
export const useAdminUsers = (filters: UserFilters) => {
  return useQuery({
    queryKey: adminQueryKeys.users(filters),
    queryFn: () => adminService.getAllUsers(filters),
    staleTime: 30 * 1000, // 30 secondes
  });
};

// Hook pour récupérer un utilisateur par ID
export const useAdminUser = (id: string) => {
  return useQuery({
    queryKey: adminQueryKeys.user(id),
    queryFn: () => adminService.getUserById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook pour mettre à jour un utilisateur
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUpdateUserForm }) =>
      adminService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Mettre à jour le cache de l'utilisateur spécifique
      queryClient.setQueryData(adminQueryKeys.user(updatedUser.id), updatedUser);
      
      // Invalider la liste des utilisateurs
      queryClient.invalidateQueries({ queryKey: [...adminQueryKeys.all, 'users'] });
      
      toast.success('Utilisateur mis à jour avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour de l\'utilisateur');
    },
  });
};

// Hook pour supprimer un utilisateur
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...adminQueryKeys.all, 'users'] });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats() });
      toast.success('Utilisateur supprimé avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression de l\'utilisateur');
    },
  });
};

// Hook pour changer le rôle d'un utilisateur
export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      adminService.changeUserRole(id, role),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(adminQueryKeys.user(updatedUser.id), updatedUser);
      queryClient.invalidateQueries({ queryKey: [...adminQueryKeys.all, 'users'] });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats() });
      toast.success('Rôle utilisateur modifié avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors du changement de rôle');
    },
  });
};

// Hook pour activer/désactiver un utilisateur
export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminService.toggleUserStatus(id, isActive),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(adminQueryKeys.user(updatedUser.id), updatedUser);
      queryClient.invalidateQueries({ queryKey: [...adminQueryKeys.all, 'users'] });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats() });
      toast.success(`Utilisateur ${updatedUser.isActive ? 'activé' : 'désactivé'} avec succès`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors du changement de statut');
    },
  });
};

// Hook pour les statistiques d'administration
export const useAdminStats = () => {
  return useQuery({
    queryKey: adminQueryKeys.stats(),
    queryFn: () => adminService.getAdminStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch toutes les 5 minutes
  });
};

// Hook pour l'activité récente
export const useRecentActivity = (limit: number = 10) => {
  return useQuery({
    queryKey: adminQueryKeys.activity(limit),
    queryFn: () => adminService.getRecentActivity(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch toutes les 2 minutes
  });
};

// Hook pour les actions en lot
export const useBulkUserAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userIds, action }: { userIds: string[]; action: 'activate' | 'deactivate' | 'delete' }) =>
      adminService.bulkUserAction(userIds, action),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: [...adminQueryKeys.all, 'users'] });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats() });
      
      const actionLabels = {
        activate: 'activés',
        deactivate: 'désactivés',
        delete: 'supprimés'
      };
      
      toast.success(`${result.count} utilisateur(s) ${actionLabels[variables.action]} avec succès`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de l\'action en lot');
    },
  });
};

// Hook pour la recherche avancée
export const useAdvancedUserSearch = () => {
  return useMutation({
    mutationFn: (filters: Parameters<typeof adminService.searchUsersAdvanced>[0]) =>
      adminService.searchUsersAdvanced(filters),
  });
};