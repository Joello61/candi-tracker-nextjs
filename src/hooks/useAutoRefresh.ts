'use client'

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useAutoRefresh = (interval: number = 5 * 60 * 1000) => { // 5 minutes par défaut
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setInterval(() => {
      // Rafraîchir les données du dashboard
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['notificationStats'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingInterviews'] });
    }, interval);

    return () => clearInterval(timer);
  }, [queryClient, interval]);
};