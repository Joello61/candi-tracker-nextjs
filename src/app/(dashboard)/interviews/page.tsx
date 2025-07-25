'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar as CalendarIcon, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { InterviewList } from '@/components/features/InterviewList';
import { InterviewFilters } from '@/components/features/InterviewFilters';
import { Pagination } from '@/components/ui/pagination';
import { StatsCard } from '@/components/charts/StatsCard';

import { useInterviews } from '@/hooks/useInterviews';
import { useInterviewStats } from '@/hooks/useInterviews';
import { InterviewType } from '@/types';
import { Metadata } from 'next';

const ITEMS_PER_PAGE = 10;

// Type pour les filtres de la page
type PageFilters = {
  page: number;
  limit: number;
  type: string;
  applicationId: string;
  startDate: string;
  endDate: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  upcoming?: boolean;
  past?: boolean;
  search: string;
};

export const interviewsMetadata: Metadata = {
  title: 'Mes entretiens',
  description: 'Gérez tous vos entretiens d\'embauche sur Candi Tracker. Vue d\'ensemble de vos rendez-vous, préparation et suivi des interviews.',
  keywords: [
    'mes entretiens',
    'liste entretiens',
    'gestion interviews',
    'suivi entretiens',
    'rendez-vous emploi',
    'planning entretiens',
    'entretiens embauche',
    'interviews job'
  ],
  openGraph: {
    title: 'Gestion des entretiens | Candi Tracker',
    description: 'Votre centre de contrôle pour tous vos entretiens d\'embauche et rendez-vous professionnels.',
    images: [{ url: '/og-interviews.jpg', width: 1200, height: 630 }],
  }
}

export const InterviewsPage: React.FC = () => {
  const navigate = useRouter();

  // États pour les filtres et pagination
  const [filters, setFilters] = useState<PageFilters>({
    page: 1,
    limit: ITEMS_PER_PAGE,
    type: '',
    applicationId: '',
    startDate: '',
    endDate: '',
    sortBy: 'scheduledAt',
    sortOrder: 'asc',
    upcoming: undefined,
    past: undefined,
    search: '',
  });

  const [activeTab, setActiveTab] = useState('all');

  // Convertir les filtres pour le hook useInterviews
  const apiFilters = {
    page: filters.page,
    limit: filters.limit,
    type: filters.type ? (filters.type as InterviewType) : undefined,
    applicationId: filters.applicationId || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
    sortBy: filters.sortBy as 'scheduledAt' | 'type' | 'createdAt',
    sortOrder: filters.sortOrder,
    upcoming: filters.upcoming,
    past: filters.past,
    search: filters.search || undefined,
  };

  // Hooks pour les données
  const { data: interviewsData, isLoading, error } = useInterviews(apiFilters);
  const { data: statsData, isLoading: statsLoading } = useInterviewStats();

  const interviews = interviewsData?.items || [];
  const pagination = interviewsData?.pagination;

  // Gestion des filtres
  const handleFiltersChange = (newFilters: Partial<PageFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset page when filters change
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: ITEMS_PER_PAGE,
      type: '',
      applicationId: '',
      startDate: '',
      endDate: '',
      sortBy: 'scheduledAt',
      sortOrder: 'asc',
      upcoming: undefined,
      past: undefined,
      search: '',
    });
    setActiveTab('all');
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newFilters = { ...filters, page: 1 };

    switch (tab) {
      case 'upcoming':
        newFilters.upcoming = true;
        newFilters.past = undefined;
        break;
      case 'past':
        newFilters.past = true;
        newFilters.upcoming = undefined;
        break;
      default:
        newFilters.upcoming = undefined;
        newFilters.past = undefined;
    }

    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement des entretiens. Veuillez réessayer.
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
          <h1 className="text-2xl font-bold text-gray-900">Mes entretiens</h1>
          <p className="text-gray-600 mt-1">
            Planifiez et suivez tous vos entretiens d&apos;embauche
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate.push('/interviews/calendar')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Vue calendrier
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={() => navigate.push('/interviews/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel entretien
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total"
          value={statsData?.total || 0}
          description="Tous entretiens"
          loading={statsLoading}
        />
        <StatsCard
          title="À venir"
          value={statsData?.upcoming || 0}
          description="Entretiens planifiés"
          loading={statsLoading}
        />
        <StatsCard
          title="Cette semaine"
          value={statsData?.thisWeek || 0}
          description="Entretiens prévus"
          loading={statsLoading}
        />
        <StatsCard
          title="Durée moyenne"
          value={
            statsData?.averageDuration ? `${statsData.averageDuration}min` : '-'
          }
          description="Temps par entretien"
          loading={statsLoading}
        />
      </div>

      {/* Répartition par type */}
      {statsData && !statsLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Répartition par type</CardTitle>
            <CardDescription>Types d&apos;entretiens planifiés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(statsData.byType).map(([type, count]) => {
                const typeLabels = {
                  [InterviewType.PHONE]: 'Téléphoniques',
                  [InterviewType.VIDEO]: 'Visioconférences',
                  [InterviewType.ONSITE]: 'Sur site',
                  [InterviewType.TECHNICAL]: 'Techniques',
                  [InterviewType.HR]: 'RH',
                  [InterviewType.FINAL]: 'Finaux',
                };

                return (
                  <div
                    key={type}
                    className="text-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() =>
                      handleFiltersChange({
                        type: type === filters.type ? '' : type,
                      })
                    }
                  >
                    <div className="text-2xl font-bold text-gray-900">
                      {count}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {typeLabels[type as InterviewType]}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="upcoming">
            À venir ({statsData?.upcoming || 0})
          </TabsTrigger>
          <TabsTrigger value="past">
            Passés ({statsData?.completed || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Filtres */}
          <InterviewFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />

          {/* Liste des entretiens */}
          <InterviewList interviews={interviews} loading={isLoading} />

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

          {/* Message si aucun entretien */}
          {!isLoading &&
            interviews.length === 0 &&
            Object.values(filters).every(
              (v) =>
                !v ||
                v === 1 ||
                v === ITEMS_PER_PAGE ||
                v === 'scheduledAt' ||
                v === 'asc'
            ) && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                    <CalendarIcon className="h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Planifiez votre premier entretien
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Commencez à organiser vos entretiens d&apos;embauche pour un
                    meilleur suivi.
                  </p>
                  <Button onClick={() => navigate.push('/interviews/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Planifier mon premier entretien
                  </Button>
                </CardContent>
              </Card>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewsPage;