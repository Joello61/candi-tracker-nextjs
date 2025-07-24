import api, { extractData, handleApiError } from './api';
import type {
    DocumentWithApplication,
    DocumentStats,
    DocumentFilters,
    ApiResponse,
    PaginatedResponse
} from '@/types';

class DocumentService {
  // Récupérer tous les documents avec filtres
  async getDocuments(params?: Partial<DocumentFilters & {
    page?: number;
    limit?: number;
  }>): Promise<PaginatedResponse<DocumentWithApplication>> {
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
      const response = await api.get<ApiResponse<{ documents: DocumentWithApplication[], pagination: any }>>(
        `/documents?${searchParams.toString()}`
      );
      
      const data = extractData(response);
      
      return {
        items: data.documents,
        pagination: data.pagination
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer un document par ID
  async getDocumentById(id: string): Promise<DocumentWithApplication> {
    try {
      const response = await api.get<ApiResponse<{ document: DocumentWithApplication }>>(`/documents/${id}`);
      return extractData(response).document;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Upload de documents
  async uploadDocuments(files: FileList, applicationId: string, options?: {
    name?: string;
    type?: string;
  }): Promise<{ documents: DocumentWithApplication[], errors: string[] }> {
    try {
      const formData = new FormData();
      
      // Ajouter les fichiers
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
      
      // Ajouter les métadonnées
      formData.append('applicationId', applicationId);
      if (options?.name) {
        formData.append('name', options.name);
      }
      if (options?.type) {
        formData.append('type', options.type);
      }

      const response = await api.post<ApiResponse<{ documents: DocumentWithApplication[], errors: string[] }>>(
        '/documents/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return extractData(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Mettre à jour un document
  async updateDocument(id: string, data: { name?: string; type?: string }): Promise<DocumentWithApplication> {
    try {
      const response = await api.put<ApiResponse<{ document: DocumentWithApplication }>>(`/documents/${id}`, data);
      return extractData(response).document;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer un document
  async deleteDocument(id: string): Promise<void> {
    try {
      await api.delete(`/documents/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Supprimer plusieurs documents
  async deleteDocuments(ids: string[]): Promise<void> {
    try {
      await api.delete('/documents', {
        data: { ids }
      });
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Télécharger un document
  async downloadDocument(id: string): Promise<Blob> {
    try {
      const response = await api.get(`/documents/${id}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Récupérer les statistiques des documents
  async getStats(): Promise<DocumentStats> {
    try {
      const response = await api.get<ApiResponse<{ stats: DocumentStats }>>('/documents/stats');
      return extractData(response).stats;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Documents d'une candidature spécifique
  async getDocumentsByApplication(applicationId: string): Promise<DocumentWithApplication[]> {
    try {
      const response = await api.get<ApiResponse<{ documents: DocumentWithApplication[] }>>(
        `/documents/application/${applicationId}`
      );
      return extractData(response).documents;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const documentService = new DocumentService();
export default documentService;