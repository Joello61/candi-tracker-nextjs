export const ApplicationStatus = {
  APPLIED: 'APPLIED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEWED: 'INTERVIEWED',
  OFFER_RECEIVED: 'OFFER_RECEIVED',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
  WITHDRAWN: 'WITHDRAWN'
} as const;
export type ApplicationStatus = typeof ApplicationStatus[keyof typeof ApplicationStatus];

export const InterviewType = {
  PHONE: 'PHONE',
  VIDEO: 'VIDEO',
  ONSITE: 'ONSITE',
  TECHNICAL: 'TECHNICAL',
  HR: 'HR',
  FINAL: 'FINAL'
} as const;
export type InterviewType = typeof InterviewType[keyof typeof InterviewType];

export const DocumentType = {
  CV: 'CV',
  COVER_LETTER: 'COVER_LETTER',
  PORTFOLIO: 'PORTFOLIO',
  CERTIFICATE: 'CERTIFICATE',
  OTHER: 'OTHER'
} as const;
export type DocumentType = typeof DocumentType[keyof typeof DocumentType];

export const NotificationType = {
  INTERVIEW_REMINDER: 'INTERVIEW_REMINDER',
  APPLICATION_FOLLOW_UP: 'APPLICATION_FOLLOW_UP',
  DEADLINE_ALERT: 'DEADLINE_ALERT',
  STATUS_UPDATE: 'STATUS_UPDATE',
  WEEKLY_REPORT: 'WEEKLY_REPORT',
  SYSTEM_NOTIFICATION: 'SYSTEM_NOTIFICATION',
  ACHIEVEMENT: 'ACHIEVEMENT'
} as const;
export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

export const NotificationPriority = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
} as const;
export type NotificationPriority = typeof NotificationPriority[keyof typeof NotificationPriority];

// Interfaces principales
export interface Application {
  id: string;
  userId: string;
  company: string;
  position: string;
  status: ApplicationStatus; // Corrigé : pas typeof
  appliedAt: string;
  notes?: string;
  salary?: string;
  location?: string;
  jobUrl?: string;
  contactName?: string;
  contactEmail?: string;
  interviews: Interview[];
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  type: InterviewType;
  scheduledAt: string;
  duration?: number;
  notes?: string;
  feedback?: string;
  interviewers: string[];
  createdAt: string;
  updatedAt: string;
  application?: {
    id: string;
    company: string;
    position: string;
    status: string;
  };
}

export interface InterviewWithApplication extends Interview {
  application: {
    id: string;
    company: string;
    position: string;
    status: string;
  };
}

export interface Document {
  id: string;
  applicationId: string;
  name: string;
  type: DocumentType;
  url: string;
  size?: number;
  createdAt: string;
  updatedAt: string;
  application?: {
    id: string;
    company: string;
    position: string;
    status: string;
  };
}

export interface DocumentWithApplication extends Document {
  application: {
    id: string;
    company: string;
    position: string;
    status: string;
  };
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  priority: NotificationPriority;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSetting {
  id: string;
  userId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  interviewReminders: boolean;
  applicationFollowUps: boolean;
  weeklyReports: boolean;
  deadlineAlerts: boolean;
  statusUpdates: boolean;
  reminderTiming1: number;
  reminderTiming2: number;
  reminderTiming3: number;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiError {
  error: string;
  code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Types pour les statistiques
export interface ApplicationStats {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
  thisMonth: number;
  thisWeek: number;
  averageResponseTime?: number;
  successRate: number;
}

export interface InterviewStats {
  total: number;
  upcoming: number;
  completed: number;
  byType: Record<InterviewType, number>;
  thisWeek: number;
  nextWeek: number;
  averageDuration: number | null;
}

export interface DocumentStats {
  total: number;
  byType: Record<DocumentType, number>;
  totalSize: number;
  averageSize: number;
  thisMonth: number;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
  thisWeek: number;
}

// Types pour les événements du calendrier
export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: InterviewType;
  company: string;
  position: string;
  notes?: string;
  interviewers: string[];
}

// Types pour les filtres
export interface InterviewFilters {
  type?: InterviewType;
  applicationId?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'scheduledAt' | 'type' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  upcoming?: boolean;
  past?: boolean;
}

export interface DocumentFilters {
  type?: DocumentType;
  applicationId?: string;
  search?: string;
  sortBy?: 'name' | 'type' | 'createdAt' | 'size';
  sortOrder?: 'asc' | 'desc';
}

// Types pour les formulaires
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApplicationForm {
  company: string;
  position: string;
  status?: ApplicationStatus; // Corrigé : pas typeof
  appliedAt?: string;
  notes?: string;
  salary?: string;
  location?: string;
  jobUrl?: string;
  contactName?: string;
  contactEmail?: string;
}

export interface InterviewForm {
  applicationId: string;
  type: InterviewType;
  scheduledAt: string;
  duration?: number;
  notes?: string;
  feedback?: string;
  interviewers: string[];
}

// Exports des types utilisateur (corriger la syntaxe)
export { UserRole } from './user'; // Export de la valeur
export type { 
  UserRole as UserRoleType, // Export du type avec un alias
  User, 
  UserWithCounts, 
  UserSettings,
  UpdateProfileForm,
  ChangePasswordForm,
  UpdateUserSettingsForm,
  AdminUpdateUserForm,
  UserFilters,
  PaginatedUsers,
  AdminStats,
  UserActivity,
  AvatarUploadResult
} from './user';