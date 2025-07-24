import api, { extractData, handleApiError } from './api';
import type {
  Notification,
  NotificationSetting,
  NotificationStats,
  ApiResponse,
} from '@/types';

export interface NotificationFilters {
  page?: number;
  limit?: number;
  type?: string;
  priority?: string;
  unreadOnly?: boolean;
  sortBy?: 'createdAt' | 'priority' | 'type';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedNotifications {
  notifications: Notification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateNotificationData {
  type: string;
  title: string;
  message: string;
  priority?: string;
  actionUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

class NotificationService {
  // Récupérer toutes les notifications avec filtres
  async getNotifications(params?: NotificationFilters): Promise<PaginatedNotifications> {
    try {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            searchParams.append(key, value.toString());
          }
        });
      }

      const response = await api.get<ApiResponse<PaginatedNotifications>>(
        `/notifications?${searchParams.toString()}`
      );
      return extractData(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer les statistiques des notifications
  async getStats(): Promise<NotificationStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: NotificationStats }>>('/notifications/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Créer une notification
  async createNotification(data: CreateNotificationData): Promise<void> {
    try {
      await api.post<ApiResponse<void>>('/notifications', data);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Marquer une notification comme lue
  async markAsRead(id: string): Promise<void> {
    try {
      await api.patch<ApiResponse<void>>(`/notifications/${id}/read`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Marquer toutes les notifications comme lues
  async markAllAsRead(): Promise<{ count: number }> {
    try {
      const response = await api.patch<ApiResponse<{ count: number }>>('/notifications/read-all');
      return extractData(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer une notification
  async deleteNotification(id: string): Promise<void> {
    try {
      await api.delete(`/notifications/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Nettoyer les anciennes notifications
  async cleanupOldNotifications(days: number = 30): Promise<{ count: number }> {
    try {
      const response = await api.delete<ApiResponse<{ count: number }>>(`/notifications/cleanup?days=${days}`);
      return extractData(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer les paramètres de notifications
  async getSettings(): Promise<NotificationSetting> {
    try {
      const response = await api.get<ApiResponse<{ settings: NotificationSetting }>>('/notifications/settings');
      return extractData(response).settings;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Mettre à jour les paramètres de notifications
  async updateSettings(data: Partial<NotificationSetting>): Promise<NotificationSetting> {
    try {
      const response = await api.put<ApiResponse<{ settings: NotificationSetting }>>('/notifications/settings', data);
      return extractData(response).settings;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const notificationService = new NotificationService();
export default notificationService;