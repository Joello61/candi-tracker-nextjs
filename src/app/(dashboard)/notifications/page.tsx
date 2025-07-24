'use client';

import { useState } from 'react';
import { CheckCheck, Settings, Trash2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { NotificationFilters } from '@/components/features/NotificationFilters';
import { NotificationList } from '@/components/features/NotificationList';
import { NotificationSettings } from '@/components/features/NotificationSettings';
import { Pagination } from '@/components/ui/pagination';
import { StatsCard } from '@/components/charts/StatsCard';

import {
  useNotifications,
  useNotificationStats,
  useMarkAllAsRead,
  useCleanupNotifications,
  useCreateNotification,
} from '@/hooks/useNotifications';
import type { NotificationFilters as NotificationFiltersType } from '@/services/notificationService';

const ITEMS_PER_PAGE = 20;

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  
  // États pour les filtres et pagination
  const [filters, setFilters] = useState<NotificationFiltersType>({
    page: 1,
    limit: ITEMS_PER_PAGE,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Hooks pour les données
  const { data: notificationsData, isLoading, error } = useNotifications(filters);
  const { data: statsData, isLoading: statsLoading } = useNotificationStats();
  const markAllAsRead = useMarkAllAsRead();
  const cleanupNotifications = useCleanupNotifications();
  const createNotification = useCreateNotification();

  const notifications = notificationsData?.items || [];
  const pagination = notificationsData?.pagination;

  // Gestion des filtres
  const handleFiltersChange = (newFilters: Partial<NotificationFiltersType>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset page when filters change
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: ITEMS_PER_PAGE,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  // Actions
  const handleMarkAllAsRead = async () => {
    await markAllAsRead.mutateAsync();
  };

  const handleCleanup = async (days: number) => {
    await cleanupNotifications.mutateAsync(days);
  };

  const handleCreateTestNotification = async () => {
    await createNotification.mutateAsync({
      type: 'SYSTEM_NOTIFICATION',
      title: 'Notification de test',
      message: 'Ceci est une notification de test pour vérifier le système.',
      priority: 'NORMAL',
    });
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement des notifications. Veuillez réessayer.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez vos notifications et paramètres de communication
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateTestNotification}
            disabled={createNotification.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            Test
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={markAllAsRead.isPending || !statsData?.unread}
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Nettoyer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Nettoyer les anciennes notifications</AlertDialogTitle>
                <AlertDialogDescription>
                  Supprimer les notifications lues de plus de 30 jours ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleCleanup(30)}
                  disabled={cleanupNotifications.isPending}
                >
                  {cleanupNotifications.isPending ? 'Nettoyage...' : 'Nettoyer'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total"
          value={statsData?.total || 0}
          description="Toutes notifications"
          loading={statsLoading}
        />
        <StatsCard
          title="Non lues"
          value={statsData?.unread || 0}
          description="À traiter"
          loading={statsLoading}
          className={statsData?.unread ? "border-blue-200 bg-blue-50" : ""}
        />
        <StatsCard
          title="Cette semaine"
          value={statsData?.thisWeek || 0}
          description="Nouvelles notifications"
          loading={statsLoading}
        />
        <StatsCard
          title="Urgentes"
          value={statsData?.byPriority?.URGENT || 0}
          description="Priorité urgente"
          loading={statsLoading}
          className={statsData?.byPriority?.URGENT ? "border-red-200 bg-red-50" : ""}
        />
      </div>

      {/* Répartition par type et priorité */}
      {statsData && !statsLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Par type */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition par type</CardTitle>
              <CardDescription>
                Types de notifications reçues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(statsData.byType).map(([type, count]) => {
                  const typeLabels = {
                    INTERVIEW_REMINDER: 'Rappels d\'entretien',
                    APPLICATION_FOLLOW_UP: 'Suivi de candidatures',
                    DEADLINE_ALERT: 'Alertes échéances',
                    STATUS_UPDATE: 'Mises à jour statut',
                    WEEKLY_REPORT: 'Rapports hebdomadaires',
                    SYSTEM_NOTIFICATION: 'Notifications système',
                    ACHIEVEMENT: 'Réussites',
                  };
                  
                  return (
                    <div key={type} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                      <span className="text-sm text-gray-700">
                        {typeLabels[type as keyof typeof typeLabels] || type}
                      </span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Par priorité */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition par priorité</CardTitle>
              <CardDescription>
                Niveaux de priorité des notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(statsData.byPriority).map(([priority, count]) => {
                  const priorityLabels = {
                    LOW: 'Faible',
                    NORMAL: 'Normal',
                    HIGH: 'Élevée',
                    URGENT: 'Urgente',
                  };
                  
                  const colors = {
                    LOW: 'bg-gray-500',
                    NORMAL: 'bg-blue-500',
                    HIGH: 'bg-orange-500',
                    URGENT: 'bg-red-500',
                  };
                  
                  return (
                    <div key={priority} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${colors[priority as keyof typeof colors]}`} />
                        <span className="text-sm text-gray-700">
                          {priorityLabels[priority as keyof typeof priorityLabels] || priority}
                        </span>
                      </div>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filtres */}
          <NotificationFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />

          {/* Liste des notifications */}
          <NotificationList 
            notifications={notifications}
            loading={isLoading}
          />

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                showInfo={true}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
              />
            </div>
          )}

          {/* Message si aucune notification */}
          {!isLoading && notifications.length === 0 && Object.values(filters).every(v => !v || v === 1 || v === ITEMS_PER_PAGE || v === 'createdAt' || v === 'desc') && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <CheckCheck className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune notification
                </h3>
                <p className="text-gray-500 mb-6">
                  Vous êtes à jour ! Aucune notification en attente.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;