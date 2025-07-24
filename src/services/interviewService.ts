import api, { extractData, handleApiError } from './api';
import type {
    InterviewWithApplication,
    InterviewForm,
    InterviewStats,
    InterviewFilters,
    CalendarEvent,
    ApiResponse,
    PaginatedResponse
} from '@/types';

class InterviewService {
  // Récupérer tous les entretiens avec filtres
  async getInterviews(params?: Partial<InterviewFilters & {
    page?: number;
    limit?: number;
  }>): Promise<PaginatedResponse<InterviewWithApplication>> {
    try {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            searchParams.append(key, value.toString());
          }
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await api.get<ApiResponse<{ interviews: InterviewWithApplication[], pagination: any }>>(
        `/interviews?${searchParams.toString()}`
      );
      
      const data = extractData(response);
      
      return {
        items: data.interviews,
        pagination: data.pagination
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer un entretien par ID
  async getInterviewById(id: string): Promise<InterviewWithApplication> {
    try {
      const response = await api.get<ApiResponse<{ interview: InterviewWithApplication }>>(`/interviews/${id}`);
      return extractData(response).interview;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Créer un nouvel entretien
  async createInterview(data: InterviewForm): Promise<InterviewWithApplication> {
    try {
      const response = await api.post<ApiResponse<{ interview: InterviewWithApplication }>>('/interviews', data);
      return extractData(response).interview;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Mettre à jour un entretien
  async updateInterview(id: string, data: Partial<InterviewForm>): Promise<InterviewWithApplication> {
    try {
      const response = await api.put<ApiResponse<{ interview: InterviewWithApplication }>>(`/interviews/${id}`, data);
      return extractData(response).interview;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer un entretien
  async deleteInterview(id: string): Promise<void> {
    try {
      await api.delete(`/interviews/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer les statistiques des entretiens
  async getStats(): Promise<InterviewStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: InterviewStats }>>('/interviews/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Entretiens à venir
  async getUpcomingInterviews(limit: number = 5): Promise<InterviewWithApplication[]> {
    try {
      const response = await api.get<ApiResponse<{ interviews: InterviewWithApplication[] }>>(`/interviews/upcoming?limit=${limit}`);
      return extractData(response).interviews;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Événements du calendrier
  async getCalendarEvents(startDate: string, endDate: string): Promise<CalendarEvent[]> {
    try {
      // Validation des paramètres
      if (!startDate || !endDate) {
        throw new Error('Les dates de début et de fin sont requises');
      }

      // Debug des paramètres
      console.log('Calendar API call:', { startDate, endDate });

      // Construire l'URL avec les paramètres de dates
      const searchParams = new URLSearchParams();
      searchParams.append('startDate', startDate);
      searchParams.append('endDate', endDate);

      const url = `/interviews/calendar?${searchParams.toString()}`;
      console.log('Calendar API URL:', url);

      const response = await api.get<ApiResponse<{ events: CalendarEvent[] }>>(url);
      return extractData(response).events;
    } catch (error) {
      console.error('Calendar API error:', error);
      throw handleApiError(error);
    }
  }

  // Vérifier les conflits de planning
  async checkConflicts(params: {
    scheduledAt: string;
    duration?: number;
    excludeInterviewId?: string;
  }): Promise<{ hasConflicts: boolean; conflicts: InterviewWithApplication[] }> {
    try {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, value.toString());
        }
      });

      const response = await api.get<ApiResponse<{ hasConflicts: boolean; conflicts: InterviewWithApplication[] }>>(
        `/interviews/check-conflicts?${searchParams.toString()}`
      );
      return extractData(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const interviewService = new InterviewService();
export default interviewService;