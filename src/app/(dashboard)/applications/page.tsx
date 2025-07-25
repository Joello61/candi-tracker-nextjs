'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Download, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { ApplicationFilters } from '@/components/features/ApplicationFilters';
import { ApplicationList } from '@/components/features/ApplicationList';
import { Pagination } from '@/components/ui/pagination';
import { StatsCard } from '@/components/charts/StatsCard';

import { useApplications } from '@/hooks/useApplications';
import { useApplicationStats } from '@/hooks/useStats';
import { ApplicationStatus } from '@/types';
import { Metadata } from 'next';

const ITEMS_PER_PAGE = 10;

export const applicationsMetadata: Metadata = {
  title: 'Mes candidatures',
  description: 'Consultez et gérez toutes vos candidatures d\'emploi sur Candi Tracker. Tableau de bord complet pour suivre vos opportunités et organiser votre recherche.',
  keywords: [
    'mes candidatures',
    'liste candidatures',
    'suivi applications',
    'tableau de bord candidatures',
    'gestion candidatures',
    'job applications',
    'recherche emploi',
    'opportunités emploi'
  ],
  openGraph: {
    title: 'Tableau de bord candidatures | Candi Tracker',
    description: 'Votre espace centralisé pour suivre et organiser toutes vos candidatures d\'emploi efficacement.',
    images: [{ url: '/og-dashboard.jpg', width: 1200, height: 630 }],
  }
}

export const ApplicationsPage: React.FC = () => {
  const navigate = useRouter();
  
  // États pour les filtres et pagination
  const [filters, setFilters] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE,
    search: '',
    status: '',
    company: '',
    startDate: '',
    endDate: '',
    sortBy: 'appliedAt',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  // Hooks pour les données
  const { data: applicationsData, isLoading, error } = useApplications(filters);
  const { data: statsData, isLoading: statsLoading } = useApplicationStats();

  const applications = applicationsData?.items || [];
  const pagination = applicationsData?.pagination;

  // Gestion des filtres
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFiltersChange = (newFilters: any) => {
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
      search: '',
      status: '',
      company: '',
      startDate: '',
      endDate: '',
      sortBy: 'appliedAt',
      sortOrder: 'desc',
    });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement des candidatures. Veuillez réessayer.
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
            Mes candidatures
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez et suivez toutes vos candidatures d&apos;emploi
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button onClick={() => navigate.push('/applications/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle candidature
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total"
          value={statsData?.total || 0}
          description="Toutes candidatures"
          loading={statsLoading}
        />
        <StatsCard
          title="Ce mois"
          value={statsData?.thisMonth || 0}
          description="Nouvelles candidatures"
          loading={statsLoading}
        />
        <StatsCard
          title="Cette semaine"
          value={statsData?.thisWeek || 0}
          description="Candidatures envoyées"
          loading={statsLoading}
        />
        <StatsCard
          title="Taux de succès"
          value={`${statsData?.successRate || 0}%`}
          description="Offres / Total"
          loading={statsLoading}
        />
      </div>

      {/* Répartition par statut */}
      {statsData && !statsLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Répartition par statut</CardTitle>
            <CardDescription>
              État actuel de vos candidatures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(statsData.byStatus).map(([status, count]) => {
                const statusLabels = {
                  [ApplicationStatus.APPLIED]: 'Envoyées',
                  [ApplicationStatus.UNDER_REVIEW]: 'En cours',
                  [ApplicationStatus.INTERVIEW_SCHEDULED]: 'Entretien programmé',
                  [ApplicationStatus.INTERVIEWED]: 'Entretien passé',
                  [ApplicationStatus.OFFER_RECEIVED]: 'Offre reçue',
                  [ApplicationStatus.ACCEPTED]: 'Acceptées',
                  [ApplicationStatus.REJECTED]: 'Refusées',
                  [ApplicationStatus.WITHDRAWN]: 'Retirées',
                };
                
                return (
                  <div 
                    key={status}
                    className="text-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleFiltersChange({ status: status === filters.status ? '' : status })}
                  >
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {statusLabels[status as ApplicationStatus]}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres */}
      <ApplicationFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {/* Liste des candidatures */}
      <ApplicationList 
        applications={applications}
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

      {/* Message si aucune candidature */}
      {!isLoading && applications.length === 0 && Object.values(filters).every(v => !v || v === 1 || v === ITEMS_PER_PAGE || v === 'appliedAt' || v === 'desc') && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <Plus className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Commencez votre recherche d&apos;emploi
            </h3>
            <p className="text-gray-500 mb-6">
              Ajoutez votre première candidature pour commencer à suivre vos opportunités d&apos;emploi.
            </p>
            <Button onClick={() => navigate.push('/applications/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter ma première candidature
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsPage;