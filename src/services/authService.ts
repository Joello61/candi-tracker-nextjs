import type { RegisterResponse, AuthResponse, LoginResponse, VerifyEmailRequest, VerificationSuccessResponse, Verify2FARequest, ResendCodeRequest, ResendCodeResponse, VerifyResetCodeForm, VerifyResetCodeResponse, ResetPasswordResponse, ResetPasswordForm, ForgotPasswordForm, ForgotPasswordResponse } from '@/types/auth';
import api, { extractData, handleApiError } from './api';
import type { 
  User, 
  LoginForm, 
  RegisterForm, 
  ApiResponse,
} from '@/types';

class AuthService {
  // Méthode utilitaire pour stocker les données d'authentification
  private storeAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Inscription (peut retourner une demande de vérification email)
  async register(data: RegisterForm): Promise<RegisterResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = data;
      const response = await api.post<RegisterResponse>('/auth/register', registerData);
      
      // Vérifier le type de réponse
      if ('user' in response.data.data && 'token' in response.data.data) {
        // Ancien comportement : connexion directe
        const authData = response.data.data as AuthResponse;
        this.storeAuthData(authData.token, authData.user);
      }
      // Sinon : vérification email requise, ne pas stocker de token
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Connexion (peut retourner différents types selon 2FA/email)
  async login(data: LoginForm): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', data);
      
      // Vérifier le type de réponse
      if ('user' in response.data.data && 'token' in response.data.data) {
        // Connexion directe réussie
        const authData = response.data.data as AuthResponse;
        this.storeAuthData(authData.token, authData.user);
      }
      // Sinon : 2FA ou vérification email requis, ne pas stocker de token
      
      return response.data;
    } catch (error) {
      // IMPORTANT : Ne pas modifier l'erreur, la laisser telle quelle 
      // pour que le contexte puisse accéder aux données (userId, email)
      throw handleApiError(error);
    }
  }

  // Vérifier le code email après inscription
  async verifyEmail(data: VerifyEmailRequest): Promise<VerificationSuccessResponse> {
    try {
      const response = await api.post<VerificationSuccessResponse>('/auth/verify-email', data);
      const authData = extractData(response);
      
      // Stocker le token et les données utilisateur
      this.storeAuthData(authData.token, authData.user);
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Vérifier le code 2FA lors de la connexion
  async verify2FA(data: Verify2FARequest): Promise<VerificationSuccessResponse> {
    try {
      const response = await api.post<VerificationSuccessResponse>('/auth/verify-2fa', data);
      const authData = extractData(response);
      
      // Stocker le token et les données utilisateur
      this.storeAuthData(authData.token, authData.user);
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Renvoyer un code de vérification
  async resendCode(data: ResendCodeRequest): Promise<ResendCodeResponse> {
    try {
      const response = await api.post<ResendCodeResponse>('/auth/resend-code', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Récupérer le profil
  async getProfile(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<{ user: User }>>('/auth/profile');
      return extractData(response).user;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Rafraîchir le token
  async refreshToken(): Promise<string> {
    try {
      const response = await api.post<ApiResponse<{ token: string }>>('/auth/refresh');
      const { token } = extractData(response);
      
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Récupérer les données utilisateur du localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  async forgotPassword(data: ForgotPasswordForm): Promise<ForgotPasswordResponse> {
    try {
      const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Vérifier un code de réinitialisation (optionnel, pour UX)
   */
  async verifyResetCode(data: VerifyResetCodeForm): Promise<VerifyResetCodeResponse> {
    try {
      const response = await api.post<VerifyResetCodeResponse>('/auth/verify-reset-code', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Réinitialiser le mot de passe avec le code
   */
  async resetPassword(data: ResetPasswordForm): Promise<ResetPasswordResponse> {
    try {
      const response = await api.post<ResetPasswordResponse>('/auth/reset-password', {
        email: data.email,
        code: data.code,
        newPassword: data.newPassword
      });

      // Stocker automatiquement le token et l'utilisateur
      if (response.data.data.token && response.data.data.user) {
      this.storeAuthData(response.data.data.token, response.data.data.user);
    }

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const authService = new AuthService();
export default authService;