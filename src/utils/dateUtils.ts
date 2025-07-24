import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy') => {
  return format(new Date(date), formatStr, { locale: fr });
};

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), 'dd/MM/yyyy à HH:mm', { locale: fr });
};

export const formatRelativeTime = (date: string | Date) => {
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return `Aujourd'hui à ${format(dateObj, 'HH:mm')}`;
  }
  
  if (isTomorrow(dateObj)) {
    return `Demain à ${format(dateObj, 'HH:mm')}`;
  }
  
  if (isYesterday(dateObj)) {
    return `Hier à ${format(dateObj, 'HH:mm')}`;
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: fr });
};

export const getTimeUntil = (date: string | Date): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = targetDate.getTime() - now.getTime();
  
  if (diffMs < 0) return 'Passé';
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) return `Dans ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  if (diffHours > 0) return `Dans ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  if (diffMinutes > 0) return `Dans ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  
  return 'Maintenant';
};