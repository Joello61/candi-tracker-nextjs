'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  Bell,
  Calendar,
  FileText,
  AlertTriangle,
  TrendingUp,
  Settings,
  Trophy,
  Mail,
  MoreHorizontal,
  Eye,
  Trash2,
  ExternalLink,
} from 'lucide-react';

import { type Notification, NotificationType, NotificationPriority } from '@/types';
import { useMarkAsRead, useDeleteNotification } from '@/hooks/useNotifications';

interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
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
  [NotificationType.INTERVIEW_REMINDER]: 'text-blue-600 bg-blue-50',
  [NotificationType.APPLICATION_FOLLOW_UP]: 'text-green-600 bg-green-50',
  [NotificationType.DEADLINE_ALERT]: 'text-red-600 bg-red-50',
  [NotificationType.STATUS_UPDATE]: 'text-purple-600 bg-purple-50',
  [NotificationType.WEEKLY_REPORT]: 'text-indigo-600 bg-indigo-50',
  [NotificationType.SYSTEM_NOTIFICATION]: 'text-gray-600 bg-gray-50',
  [NotificationType.ACHIEVEMENT]: 'text-yellow-600 bg-yellow-50',
};

const priorityVariants = {
  [NotificationPriority.LOW]: { variant: 'secondary' as const, color: 'bg-gray-500' },
  [NotificationPriority.NORMAL]: { variant: 'default' as const, color: 'bg-blue-500' },
  [NotificationPriority.HIGH]: { variant: 'destructive' as const, color: 'bg-orange-500' },
  [NotificationPriority.URGENT]: { variant: 'destructive' as const, color: 'bg-red-500' },
};

const priorityLabels = {
  [NotificationPriority.LOW]: 'Faible',
  [NotificationPriority.NORMAL]: 'Normal',
  [NotificationPriority.HIGH]: 'Élevée',
  [NotificationPriority.URGENT]: 'Urgente',
};

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading,
}) => {
  const navigate = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const markAsRead = useMarkAsRead();
  const deleteNotification = useDeleteNotification();

  const handleMarkAsRead = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead.mutateAsync(notification.id);
    }
    // Naviguer vers l'URL d'action si elle existe
    if (notification.actionUrl) {
      navigate.push(notification.actionUrl);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteNotification.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune notification
          </h3>
          <p className="text-gray-500">
            Vous n&apos;avez aucune notification pour le moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {notifications.map((notification) => {
          const IconComponent = typeIcons[notification.type] || Bell;
          const iconColorClass = typeColors[notification.type] || 'text-gray-600 bg-gray-50';

          return (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !notification.isRead 
                  ? 'border-l-4 border-l-blue-500 bg-blue-50/30' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleMarkAsRead(notification)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  {/* Icône de type */}
                  <div className={`p-2 rounded-lg ${iconColorClass}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Contenu principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          !notification.isRead ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {notification.message}
                        </p>
                      </div>

                      {/* Menu actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!notification.isRead && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead.mutateAsync(notification.id);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Marquer comme lu
                            </DropdownMenuItem>
                          )}
                          {notification.actionUrl && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate.push(notification.actionUrl!);
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Voir les détails
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(notification.id);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Métadonnées */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        {/* Priorité */}
                        <div className="flex items-center space-x-1">
                          <div 
                            className={`w-2 h-2 rounded-full ${priorityVariants[notification.priority].color}`}
                          />
                          <span className="text-xs text-gray-500">
                            {priorityLabels[notification.priority]}
                          </span>
                        </div>

                        {/* Date */}
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>

                      {/* Indicateur non lu */}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>

                    {/* Données supplémentaires si présentes */}
                    {notification.data && Object.keys(notification.data).length > 0 && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                        {notification.type === NotificationType.INTERVIEW_REMINDER && notification.data.company && (
                          <span>📅 {notification.data.company} - {notification.data.type}</span>
                        )}
                        {notification.type === NotificationType.APPLICATION_FOLLOW_UP && notification.data.company && (
                          <span>🏢 {notification.data.company}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la notification</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette notification ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteNotification.isPending}
            >
              {deleteNotification.isPending ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};