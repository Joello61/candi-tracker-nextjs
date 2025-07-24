import api, { extractData, handleApiError } from './api';
import type {
    Application,
    ApplicationForm,
    ApplicationStats,
    ApiResponse,
    PaginatedResponse
} from '@/types';

class ApplicationService {
  // Récupérer toutes les candidatures avec filtres
  async getApplications(params?: {
    page?: number;
    limit?: number;
    status?: string;
    company?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<Application>> {
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
      const response = await api.get<ApiResponse<{ applications: Application[], pagination: any }>>(
        `/applications?${searchParams.toString()}`
      );
      
      const data = extractData(response);
      
      // Transformer la structure pour correspondre à PaginatedResponse
      return {
        items: data.applications,
        pagination: data.pagination
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer une candidature par ID
  async getApplicationById(id: string): Promise<Application> {
    try {
      const response = await api.get<ApiResponse<{ application: Application }>>(`/applications/${id}`);
      return extractData(response).application;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Créer une nouvelle candidature
  async createApplication(data: ApplicationForm): Promise<Application> {
    try {
      const response = await api.post<ApiResponse<{ application: Application }>>('/applications', data);
      return extractData(response).application;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Mettre à jour une candidature
  async updateApplication(id: string, data: Partial<ApplicationForm>): Promise<Application> {
    try {
      const response = await api.put<ApiResponse<{ application: Application }>>(`/applications/${id}`, data);
      return extractData(response).application;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer une candidature
  async deleteApplication(id: string): Promise<void> {
    try {
      await api.delete(`/applications/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer les statistiques
  async getStats(): Promise<ApplicationStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: ApplicationStats }>>('/applications/stats');
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
}

export const applicationService = new ApplicationService();
export default applicationService;