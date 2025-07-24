export const UserRole ={
  USER : 'USER',
  ADMIN : 'ADMIN'
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string | null;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithCounts extends User {
  _count: {
    applications: number;
    notifications: number;
  };
}

export interface UserSettings {
  id: string;
  userId: string;
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  sidebarCollapsed: boolean;
  itemsPerPage: number;
  defaultApplicationView: string;
  showWelcomeMessage: boolean;
  defaultDashboardTab: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileForm {
  name?: string;
  email?: string;
  avatar?: string | null;
}

export interface ChangePasswordForm {
  currentPassword? : string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateUserSettingsForm {
  theme?: string;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  sidebarCollapsed?: boolean;
  itemsPerPage?: number;
  defaultApplicationView?: string;
  showWelcomeMessage?: boolean;
  defaultDashboardTab?: string;
}

export interface AdminUpdateUserForm {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  emailVerified?: boolean;
  avatar?: string | null;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  sortBy?: 'createdAt' | 'name' | 'email' | 'lastLoginAt' | 'role';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedUsers {
  users: UserWithCounts[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
  newUsersThisWeek: number;
  lastLoginStats: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  usersByRole: Record<UserRole, number>;
}

export interface UserActivity {
  id: string;
  name: string;
  email: string;
  lastLoginAt?: Date | null;
  applicationsCount: number;
  notificationsCount: number;
  createdAt: Date;
}

export interface AvatarUploadResult {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}