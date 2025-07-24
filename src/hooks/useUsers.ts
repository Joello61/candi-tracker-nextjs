'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userService } from '@/services/userService';
import type {
  UpdateProfileForm,
  ChangePasswordForm,
  UpdateUserSettingsForm,
} from '@/types';
import type { Toggle2FARequest, UserSecuritySettings } from '@/types/auth';

// Query keys
export const userQueryKeys = {
  all: ['users'] as const,
  profile: () => [...userQueryKeys.all, 'profile'] as const,
  settings: () => [...userQueryKeys.all, 'settings'] as const,
  security: () => [...userQueryKeys.all, 'security'] as const, // 🆕 NOUVEAU
  search: (query: string) => [...userQueryKeys.all, 'search', query] as const,
};

// Hook pour récupérer le profil utilisateur
export const useUserProfile = () => {
  return useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: () => userService.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour mettre à jour le profil
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileForm) => userService.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Mettre à jour le cache du profil
      queryClient.setQueryData(userQueryKeys.profile(), updatedUser);
      
      // Invalider le cache auth si le nom ou email a changé
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      toast.success('Profil mis à jour avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour du profil');
    },
  });
};

// Hook pour changer le mot de passe
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordForm) => userService.changePassword(data),
    onSuccess: () => {
      toast.success('Mot de passe modifié avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors du changement de mot de passe');
    },
  });
};

// Hook pour récupérer les paramètres utilisateur
export const useUserSettings = () => {
  return useQuery({
    queryKey: userQueryKeys.settings(),
    queryFn: () => userService.getSettings(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook pour mettre à jour les paramètres
export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserSettingsForm) => userService.updateSettings(data),
    onSuccess: (updatedSettings) => {
      // Mettre à jour le cache
      queryClient.setQueryData(userQueryKeys.settings(), updatedSettings);
      toast.success('Paramètres mis à jour avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la mise à jour des paramètres');
    },
  });
};

// 🆕 NOUVEAU HOOK : Récupérer les paramètres de sécurité
export const useUserSecurity = () => {
  return useQuery({
    queryKey: userQueryKeys.security(),
    queryFn: () => userService.getSecuritySettings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// 🆕 NOUVEAU HOOK : Basculer la 2FA
export const useToggle2FA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Toggle2FARequest) => userService.toggle2FA(data),
    onSuccess: (response) => {
      // Mettre à jour le cache des paramètres de sécurité
      queryClient.setQueryData(userQueryKeys.security(), (old: UserSecuritySettings | undefined) => {
        if (!old) return old;
        return { ...old, enabled2FA: response.enabled2FA };
      });
      
      // Invalider aussi les autres caches liés
      queryClient.invalidateQueries({ queryKey: userQueryKeys.settings() });
      
      toast.success(
        response.enabled2FA 
          ? 'Authentification à deux facteurs activée !' 
          : 'Authentification à deux facteurs désactivée !'
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la modification des paramètres 2FA');
    },
  });
};

// Hook pour l'upload d'avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: () => {
      // Invalider le profil pour récupérer la nouvelle URL d'avatar
      queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Avatar uploadé avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de l\'upload de l\'avatar');
    },
  });
};

// Hook pour supprimer l'avatar
export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Avatar supprimé avec succès');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression de l\'avatar');
    },
  });
};

// Hook pour supprimer le compte
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.deleteAccount(),
    onSuccess: () => {
      // Nettoyer le cache et déconnecter
      queryClient.clear();
      toast.success('Compte supprimé avec succès');
      // Rediriger vers la page de connexion
      window.location.href = '/login';
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la suppression du compte');
    },
  });
};

// Hook pour rechercher des utilisateurs
export const useSearchUsers = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: userQueryKeys.search(query),
    queryFn: () => userService.searchUsers(query, 10),
    enabled: enabled && query.length > 0,
    staleTime: 30 * 1000, // 30 secondes
  });
};

// Hook pour vérifier la disponibilité d'un email
export const useCheckEmailAvailability = () => {
  return useMutation({
    mutationFn: (email: string) => userService.checkEmailAvailability(email),
  });
};