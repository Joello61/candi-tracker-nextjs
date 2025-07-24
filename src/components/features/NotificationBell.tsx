'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  Bell,
  Calendar,
  FileText,
  AlertTriangle,
  TrendingUp,
  Settings,
  Trophy,
  Mail,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';

import { type Notification, NotificationType } from '@/types';
import { useNotifications, useMarkAsRead, useUnreadNotifications } from '@/hooks/useNotifications';

interface NotificationBellProps {
  className?: string;
}

const typeIcons = {
  [NotificationType.INTERVIEW_REMINDER]: Calendar,
  [NotificationType.APPLICATION_FOLLOW_UP]: FileText,
  [NotificationType.DEADLINE_ALERT]: AlertTriangle,
  [NotificationType.STATUS_UPDATE]: TrendingUp,
  [NotificationType.WEEKLY_REPORT]: Mail,
  [NotificationType.SYSTEM_NOTIFICATION]: Settings,
  [NotificationType.ACHIEVEMENT]: Trophy,
};

const typeColors = {
  [NotificationType.INTERVIEW_REMINDER]: 'text-blue-600',
  [NotificationType.APPLICATION_FOLLOW_UP]: 'text-green-600',
  [NotificationType.DEADLINE_ALERT]: 'text-red-600',
  [NotificationType.STATUS_UPDATE]: 'text-purple-600',
  [NotificationType.WEEKLY_REPORT]: 'text-indigo-600',
  [NotificationType.SYSTEM_NOTIFICATION]: 'text-gray-600',
  [NotificationType.ACHIEVEMENT]: 'text-yellow-600',
};

export const NotificationBell: React.FC<NotificationBellProps> = ({ className }) => {
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Récupérer les notifications récentes (non lues + 5 dernières lues)
  const { data: notificationsData } = useNotifications({ 
    limit: 10, 
    sortBy: 'createdAt', 
    sortOrder: 'desc' 
  });
  const { unreadCount, hasUnread } = useUnreadNotifications();
  const markAsRead = useMarkAsRead();

  const notifications = notificationsData?.items || [];
  //const unreadNotifications = notifications.filter(n => !n.isRead);
  const recentNotifications = notifications.slice(0, 8); // Afficher max 8 notifications

  const handleNotificationClick = async (notification: Notification) => {
    // Marquer comme lue si non lue
    if (!notification.isRead) {
      await markAsRead.mutateAsync(notification.id);
    }
    
    // Fermer le dropdown
    setIsOpen(false);
    
    // Naviguer vers l'URL d'action si elle existe
    if (notification.actionUrl) {
      navigate.push(notification.actionUrl);
    }
  };

  const handleMarkAsRead = async (notification: Notification, e: React.MouseEvent) => {
    e.stopPropagation();
    await markAsRead.mutateAsync(notification.id);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    navigate.push('/notifications');
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className}`}>
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 animate-pulse"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {hasUnread && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {recentNotifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Aucune notification</p>
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="space-y-1">
              {recentNotifications.map((notification) => {
                const IconComponent = typeIcons[notification.type] || Bell;
                const iconColor = typeColors[notification.type] || 'text-gray-600';

                return (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`px-4 py-3 cursor-pointer focus:bg-gray-50 ${
                      !notification.isRead ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      {/* Icône */}
                      <div className={`mt-0.5 ${iconColor}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </p>
                        <p className={`text-xs mt-1 line-clamp-2 ${
                          !notification.isRead ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(notification.createdAt), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </span>
                          
                          {/* Actions */}
                          <div className="flex items-center space-x-1">
                            {notification.actionUrl && (
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            )}
                            
                            {!notification.isRead ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-gray-200"
                                onClick={(e) => handleMarkAsRead(notification, e)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            ) : (
                              <EyeOff className="h-3 w-3 text-gray-300" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Indicateur non lu */}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </ScrollArea>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          className="px-4 py-3 cursor-pointer justify-center font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={handleViewAll}
        >
          Voir toutes les notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};