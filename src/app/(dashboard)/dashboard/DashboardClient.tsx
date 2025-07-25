'use client'

import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useStats';
import { StatsCard } from '@/components/charts/StatsCard';
import { ApplicationStatusChart } from '@/components/charts/ApplicationStatusChart';
import { InterviewTypeChart } from '@/components/charts/InterviewTypeChart';
import { RecentApplications } from '@/components/features/RecentApplications';
import { UpcomingInterviews } from '@/components/features/UpcomingInterviews';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Briefcase,
  Calendar,
  FileText,
  Bell,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { ApplicationStatus, InterviewType } from '@/types';
import { QuickInsights } from '@/components/features/QuickInsights';
import { UpcomingInterviewsWidget } from '@/components/features/UpcomingInterviewsWidget';
import { InterviewCalendar } from '@/components/features/InterviewCalendar';

export const DashboardClient: React.FC = () => {

  const navigate = useRouter();

  const defaultApplicationStatusData: Record<ApplicationStatus, number> = {
    APPLIED: 0,
    UNDER_REVIEW: 0,
    INTERVIEW_SCHEDULED: 0,
    INTERVIEWED: 0,
    REJECTED: 0,
    WITHDRAWN: 0,
    ACCEPTED: 0,
    OFFER_RECEIVED: 0,
  };

  const defaultInterviewTypeData: Record<InterviewType, number> = {
    PHONE: 0,
    VIDEO: 0,
    ONSITE: 0,
    TECHNICAL: 0,
    HR: 0,
    FINAL: 0,
  };

  const { user } = useAuth();
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useDashboardData();

  // Fonction pour obtenir le message de bienvenue selon l'heure
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  // Calculer les métriques principales
  const getMainMetrics = () => {
    if (!dashboardData) return null;

    const {
      applicationStats,
      interviewStats,
      notificationStats,
    } = dashboardData;

    return {
      totalApplications: applicationStats.total,
      successRate: applicationStats.successRate,
      upcomingInterviews: interviewStats.upcoming,
      unreadNotifications: notificationStats.unread,
      thisWeekApplications: applicationStats.thisWeek,
      thisWeekInterviews: interviewStats.thisWeek,
    };
  };

  const metrics = getMainMetrics();

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Erreur lors du chargement des données du dashboard.
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
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
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Voici un aperçu de vos candidatures et entretiens
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`}
            />
            Actualiser
          </Button>
          <Button onClick={() => navigate.push('/applications/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle candidature
          </Button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total candidatures"
          value={metrics?.totalApplications || 0}
          description="Toutes vos candidatures"
          icon={<Briefcase className="h-4 w-4" />}
          trend={{
            value: metrics?.thisWeekApplications || 0,
            label: 'cette semaine',
          }}
          loading={isLoading}
        />

        <StatsCard
          title="Taux de succès"
          value={`${metrics?.successRate || 0}%`}
          description="Offres / Candidatures"
          icon={<Target className="h-4 w-4" />}
          loading={isLoading}
        />

        <StatsCard
          title="Entretiens à venir"
          value={metrics?.upcomingInterviews || 0}
          description="Prochains entretiens"
          icon={<Calendar className="h-4 w-4" />}
          trend={{
            value: metrics?.thisWeekInterviews || 0,
            label: 'cette semaine',
          }}
          loading={isLoading}
        />

        <StatsCard
          title="Notifications"
          value={metrics?.unreadNotifications || 0}
          description="Non lues"
          icon={<Bell className="h-4 w-4" />}
          loading={isLoading}
        />
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Métriques additionnelles */}
        <div className="space-y-4">
          <StatsCard
            title="Ce mois-ci"
            value={dashboardData?.applicationStats.thisMonth || 0}
            description="Nouvelles candidatures"
            icon={<TrendingUp className="h-4 w-4" />}
            loading={isLoading}
          />

          <StatsCard
            title="Documents"
            value={dashboardData?.documentStats.total || 0}
            description={`${Math.round(
              (dashboardData?.documentStats.totalSize || 0) / 1024 / 1024
            )} MB utilisés`}
            icon={<FileText className="h-4 w-4" />}
            loading={isLoading}
          />

          <StatsCard
            title="Durée moyenne"
            value={
              dashboardData?.interviewStats.averageDuration
                ? `${dashboardData.interviewStats.averageDuration} min`
                : 'N/A'
            }
            description="Durée des entretiens"
            icon={<Clock className="h-4 w-4" />}
            loading={isLoading}
          />
        </div>

        {/* Graphiques */}
        <ApplicationStatusChart
          data={
            dashboardData?.applicationStats.byStatus ||
            defaultApplicationStatusData
          }
          loading={isLoading}
        />

        <InterviewTypeChart
          data={
            dashboardData?.interviewStats.byType || defaultInterviewTypeData
          }
          loading={isLoading}
        />
      </div>

      {dashboardData && (
        <QuickInsights
          applicationStats={dashboardData.applicationStats}
          interviewStats={dashboardData.interviewStats}
        />
      )}

      {/* Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentApplications
          applications={dashboardData?.recentApplications || []}
          loading={isLoading}
        />

        <UpcomingInterviews
          interviews={dashboardData?.upcomingInterviews || []}
          loading={isLoading}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
        <UpcomingInterviewsWidget limit={3} />
        <InterviewCalendar />
      </div>

      {/* Actions rapides */}
      {!isLoading && dashboardData && (
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Raccourcis vers les actions les plus courantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                <span className="text-sm">Nouvelle candidature</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Programmer entretien</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">Ajouter document</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col">
                <CheckCircle className="h-6 w-6 mb-2" />
                <span className="text-sm">Mettre à jour statut</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer avec dernière mise à jour */}
      {!isLoading && (
        <div className="text-center text-sm text-gray-500">
          Dernière mise à jour:{' '}
          {formatDistanceToNow(new Date(), { addSuffix: true, locale: fr })}
        </div>
      )}
    </div>
  );
};

export default DashboardClient;