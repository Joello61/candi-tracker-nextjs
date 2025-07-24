import axios, { type AxiosResponse } from 'axios';
import type { ApiResponse, ApiError } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Configuration d'axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper pour extraire les données des réponses
export const extractData = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  return response.data.data;
};

// Helper pour gérer les erreurs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any): ApiError => {
  if (error.response?.data) {
    return error.response.data;
  }
  return {
    error: error.message || 'Une erreur est survenue',
    code: 'NETWORK_ERROR',
  };
};

export default api;
