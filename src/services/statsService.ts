import api, { extractData, handleApiError } from './api';
import type {
    ApplicationStats,
    InterviewStats,
    DocumentStats,
    NotificationStats,
    Application,
    Interview,
    ApiResponse
} from '@/types';

class StatsService {
  // Statistiques des candidatures
  async getApplicationStats(): Promise<ApplicationStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: ApplicationStats }>>('/applications/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Statistiques des entretiens
  async getInterviewStats(): Promise<InterviewStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: InterviewStats }>>('/interviews/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Statistiques des documents
  async getDocumentStats(): Promise<DocumentStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: DocumentStats }>>('/documents/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Statistiques des notifications
  async getNotificationStats(): Promise<NotificationStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: NotificationStats }>>('/notifications/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Candidatures récentes
  async getRecentApplications(limit: number = 5): Promise<Application[]> {
    try {
      const response = await api.get<ApiResponse<{ applications: Application[] }>>(`/applications/recent?limit=${limit}`);
      return extractData(response).applications;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Entretiens à venir
  async getUpcomingInterviews(limit: number = 5): Promise<Interview[]> {
    try {
      const response = await api.get<ApiResponse<{ interviews: Interview[] }>>(`/interviews/upcoming?limit=${limit}`);
      return extractData(response).interviews;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Statistiques globales combinées
  async getDashboardData() {
    try {
      const [
        applicationStats,
        interviewStats,
        documentStats,
        notificationStats,
        recentApplications,
        upcomingInterviews
      ] = await Promise.all([
        this.getApplicationStats(),
        this.getInterviewStats(),
        this.getDocumentStats(),
        this.getNotificationStats(),
        this.getRecentApplications(),
        this.getUpcomingInterviews()
      ]);

      return {
        applicationStats,
        interviewStats,
        documentStats,
        notificationStats,
        recentApplications,
        upcomingInterviews
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const statsService = new StatsService();
export default statsService;