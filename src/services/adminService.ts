import api, { extractData, handleApiError } from './api';
import type {
  UserWithCounts,
  UserFilters,
  PaginatedUsers,
  AdminStats,
  UserActivity,
  AdminUpdateUserForm,
  UserRole,
  ApiResponse
} from '@/types';

class AdminService {
  // Récupérer tous les utilisateurs
  async getAllUsers(filters?: UserFilters): Promise<PaginatedUsers> {
    try {
      const searchParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            searchParams.append(key, value.toString());
          }
        });
      }

      const response = await api.get<ApiResponse<PaginatedUsers>>(
        `/admin/users?${searchParams.toString()}`
      );
      return extractData(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer un utilisateur par ID
  async getUserById(id: string): Promise<UserWithCounts> {
    try {
      const response = await api.get<ApiResponse<{ user: UserWithCounts }>>(`/admin/users/${id}`);
      return extractData(response).user;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Mettre à jour un utilisateur
  async updateUser(id: string, data: AdminUpdateUserForm): Promise<UserWithCounts> {
    try {
      const response = await api.put<ApiResponse<{ user: UserWithCounts }>>(`/admin/users/${id}`, data);
      return extractData(response).user;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer un utilisateur
  async deleteUser(id: string): Promise<void> {
    try {
      await api.delete<ApiResponse<void>>(`/admin/users/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Changer le rôle d'un utilisateur
  async changeUserRole(id: string, role: UserRole): Promise<UserWithCounts> {
    try {
      const response = await api.put<ApiResponse<{ user: UserWithCounts }>>(
        `/admin/users/${id}/role`,
        { role }
      );
      return extractData(response).user;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Activer/désactiver un utilisateur
  async toggleUserStatus(id: string, isActive: boolean): Promise<UserWithCounts> {
    try {
      const response = await api.put<ApiResponse<{ user: UserWithCounts }>>(
        `/admin/users/${id}/status`,
        { isActive }
      );
      return extractData(response).user;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer les statistiques d'administration
  async getAdminStats(): Promise<AdminStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: AdminStats }>>('/admin/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer l'activité récente
  async getRecentActivity(limit: number = 10): Promise<UserActivity[]> {
    try {
      const response = await api.get<ApiResponse<{ activity: UserActivity[] }>>(
        `/admin/activity?limit=${limit}`
      );
      return extractData(response).activity;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Actions en lot
  async bulkUserAction(userIds: string[], action: 'activate' | 'deactivate' | 'delete'): Promise<{ count: number }> {
    try {
      const response = await api.post<ApiResponse<{ count: number; action: string }>>(
        '/admin/users/bulk-action',
        { userIds, action }
      );
      return { count: extractData(response).count };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Recherche avancée
  async searchUsersAdvanced(filters: {
    query?: string;
    roles?: UserRole[];
    isActive?: boolean;
    createdAfter?: Date;
    createdBefore?: Date;
    lastLoginAfter?: Date;
    lastLoginBefore?: Date;
    limit?: number;
  }): Promise<UserWithCounts[]> {
    try {
      const searchParams = new URLSearchParams();
      
      if (filters.query) searchParams.append('query', filters.query);
      if (filters.roles) searchParams.append('roles', filters.roles.join(','));
      if (filters.isActive !== undefined) searchParams.append('isActive', filters.isActive.toString());
      if (filters.createdAfter) searchParams.append('createdAfter', filters.createdAfter.toISOString());
      if (filters.createdBefore) searchParams.append('createdBefore', filters.createdBefore.toISOString());
      if (filters.lastLoginAfter) searchParams.append('lastLoginAfter', filters.lastLoginAfter.toISOString());
      if (filters.lastLoginBefore) searchParams.append('lastLoginBefore', filters.lastLoginBefore.toISOString());
      if (filters.limit) searchParams.append('limit', filters.limit.toString());

      const response = await api.get<ApiResponse<{ users: UserWithCounts[] }>>(
        `/admin/users/search?${searchParams.toString()}`
      );
      return extractData(response).users;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const adminService = new AdminService();
export default adminService;