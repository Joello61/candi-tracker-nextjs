import type { Toggle2FARequest, Toggle2FAResponse, UserSecuritySettings } from '@/types/auth';
import api, { extractData, handleApiError } from './api';
import type {
  User,
  UserSettings,
  UpdateProfileForm,
  ChangePasswordForm,
  UpdateUserSettingsForm,
  AvatarUploadResult,
  ApiResponse,
} from '@/types';

class UserService {
  // Récupérer le profil utilisateur
  async getProfile(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<{ user: User }>>('/users/profile');
      return extractData(response).user;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Mettre à jour le profil
  async updateProfile(data: UpdateProfileForm): Promise<User> {
    try {
      const response = await api.put<ApiResponse<{ user: User }>>('/users/profile', data);
      return extractData(response).user;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Changer le mot de passe
  async changePassword(data: ChangePasswordForm): Promise<void> {
    try {
      await api.post<ApiResponse<void>>('/users/change-password', data);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer les paramètres utilisateur
  async getSettings(): Promise<UserSettings> {
    try {
      const response = await api.get<ApiResponse<{ settings: UserSettings }>>('/users/settings');
      return extractData(response).settings;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Mettre à jour les paramètres
  async updateSettings(data: UpdateUserSettingsForm): Promise<UserSettings> {
    try {
      const response = await api.put<ApiResponse<{ settings: UserSettings }>>('/users/settings', data);
      return extractData(response).settings;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // NOUVELLE MÉTHODE : Récupérer les paramètres de sécurité
  async getSecuritySettings(): Promise<UserSecuritySettings> {
    try {
      const response = await api.get<ApiResponse<{ security: UserSecuritySettings }>>('/users/security');
      return extractData(response).security;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // NOUVELLE MÉTHODE : Activer/désactiver la 2FA
  async toggle2FA(data: Toggle2FARequest): Promise<Toggle2FAResponse> {
    try {
      const response = await api.post<ApiResponse<Toggle2FAResponse>>('/users/toggle-2fa', data);
      return extractData(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Upload d'avatar
  async uploadAvatar(file: File): Promise<AvatarUploadResult> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post<ApiResponse<{ avatar: AvatarUploadResult }>>(
        '/users/upload-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return extractData(response).avatar;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer l'avatar
  async deleteAvatar(): Promise<void> {
    try {
      await api.delete<ApiResponse<void>>('/users/avatar');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer le compte
  async deleteAccount(): Promise<void> {
    try {
      await api.delete<ApiResponse<void>>('/users/account');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Rechercher des utilisateurs
  async searchUsers(query: string, limit: number = 10): Promise<User[]> {
    try {
      const response = await api.get<ApiResponse<{ users: User[] }>>(
        `/users/search?q=${encodeURIComponent(query)}&limit=${limit}`
      );
      return extractData(response).users;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Vérifier la disponibilité d'un email
  async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    try {
      const response = await api.get<ApiResponse<{ email: string; available: boolean }>>(
        `/users/check-email?email=${encodeURIComponent(email)}`
      );
      return { available: extractData(response).available };
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const userService = new UserService();
export default userService;