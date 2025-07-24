'use client'

import { useQuery } from '@tanstack/react-query';
import statsService from '@/services/statsService';

export const useApplicationStats = () => {
  return useQuery({
    queryKey: ['applicationStats'],
    queryFn: () => statsService.getApplicationStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInterviewStats = () => {
  return useQuery({
    queryKey: ['interviewStats'],
    queryFn: () => statsService.getInterviewStats(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDocumentStats = () => {
  return useQuery({
    queryKey: ['documentStats'],
    queryFn: () => statsService.getDocumentStats(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useNotificationStats = () => {
  return useQuery({
    queryKey: ['notificationStats'],
    queryFn: () => statsService.getNotificationStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes pour les notifications
  });
};

export const useRecentApplications = (limit: number = 5) => {
  return useQuery({
    queryKey: ['recentApplications', limit],
    queryFn: () => statsService.getRecentApplications(limit),
    staleTime: 2 * 60 * 1000,
  });
};

export const useUpcomingInterviews = (limit: number = 5) => {
  return useQuery({
    queryKey: ['upcomingInterviews', limit],
    queryFn: () => statsService.getUpcomingInterviews(limit),
    staleTime: 2 * 60 * 1000,
  });
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => statsService.getDashboardData(),
    staleTime: 5 * 60 * 1000,
  });
};