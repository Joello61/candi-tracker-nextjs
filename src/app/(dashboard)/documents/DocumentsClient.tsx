'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Download, Upload, Archive, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { DocumentFilters } from '@/components/features/DocumentFilters';
import { DocumentList } from '@/components/features/DocumentList';
import { Pagination } from '@/components/ui/pagination';
import { StatsCard } from '@/components/charts/StatsCard';

import { useDocuments, useDeleteDocuments } from '@/hooks/useDocuments';
import { useDocumentStats } from '@/hooks/useDocuments';
import { useApplications } from '@/hooks/useApplications';
import { DocumentType } from '@/types';

const ITEMS_PER_PAGE = 12;

type PageFilters = {
  page: number;
  limit: number;
  type: string;
  applicationId: string;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

export const DocumentsClient: React.FC = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const preselectedApplicationId = searchParams.get('applicationId');

  // États pour les filtres et pagination
  const [filters, setFilters] = useState<PageFilters>({
    page: 1,
    limit: ITEMS_PER_PAGE,
    type: '',
    applicationId: preselectedApplicationId || '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // État pour la sélection multiple
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  // Convertir les filtres pour l'API
  const apiFilters = {
    page: filters.page,
    limit: filters.limit,
    type: filters.type ? (filters.type as DocumentType) : undefined,
    applicationId: filters.applicationId || undefined,
    search: filters.search || undefined,
    sortBy: filters.sortBy as 'name' | 'type' | 'createdAt' | 'size',
    sortOrder: filters.sortOrder,
  };

  // Hooks pour les données
  const { data: documentsData, isLoading, error } = useDocuments(apiFilters);
  const { data: statsData, isLoading: statsLoading } = useDocumentStats();
  const { data: applicationsData } = useApplications({ limit: 100 }); // Pour les filtres
  const deleteDocuments = useDeleteDocuments();

  const documents = documentsData?.items || [];
  const pagination = documentsData?.pagination;
  const applications = applicationsData?.items || [];

  // Gestion des filtres
  const handleFiltersChange = (newFilters: Partial<PageFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset page when filters change
    }));
    // Désélectionner tous les documents lors du changement de filtres
    setSelectedIds([]);
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: ITEMS_PER_PAGE,
      type: '',
      applicationId: preselectedApplicationId || '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    setSelectedIds([]);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSelectionChange = (newSelectedIds: string[]) => {
    setSelectedIds(newSelectedIds);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length > 0) {
      await deleteDocuments.mutateAsync(selectedIds);
      setSelectedIds([]);
    }
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedIds([]);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement des documents. Veuillez réessayer.
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
          <h1 className="text-2xl font-bold text-gray-900">Mes documents</h1>
          <p className="text-gray-600 mt-1">
            Gérez tous vos documents de candidature
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {documents.length > 0 && (
            <Button variant="outline" size="sm" onClick={toggleSelectionMode}>
              {selectionMode ? (
                <>
                  <Archive className="h-4 w-4 mr-2" />
                  Annuler sélection
                </>
              ) : (
                <>
                  <Archive className="h-4 w-4 mr-2" />
                  Sélectionner
                </>
              )}
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={() => navigate.push('/documents/upload')}>
            <Plus className="h-4 w-4 mr-2" />
            Uploader
          </Button>
        </div>
      </div>

      {/* Barre d'actions pour la sélection multiple */}
      {selectionMode && selectedIds.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedIds.length} document{selectedIds.length > 1 ? 's' : ''}{' '}
                sélectionné{selectedIds.length > 1 ? 's' : ''}
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={deleteDocuments.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer la sélection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total"
          value={statsData?.total || 0}
          description="Tous documents"
          loading={statsLoading}
        />
        <StatsCard
          title="Ce mois"
          value={statsData?.thisMonth || 0}
          description="Nouveaux documents"
          loading={statsLoading}
        />
        <StatsCard
          title="Espace utilisé"
          value={
            statsData
              ? `${Math.round(statsData.totalSize / 1024 / 1024)} MB`
              : '0 MB'
          }
          description="Stockage total"
          loading={statsLoading}
        />
        <StatsCard
          title="Taille moyenne"
          value={
            statsData
              ? `${Math.round(statsData.averageSize / 1024)} KB`
              : '0 KB'
          }
          description="Par document"
          loading={statsLoading}
        />
      </div>

      {/* Répartition par type */}
      {statsData && !statsLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Répartition par type</CardTitle>
            <CardDescription>Types de documents stockés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(statsData.byType).map(([type, count]) => {
                const typeLabels = {
                  [DocumentType.CV]: 'CV',
                  [DocumentType.COVER_LETTER]: 'Lettres',
                  [DocumentType.PORTFOLIO]: 'Portfolios',
                  [DocumentType.CERTIFICATE]: 'Certificats',
                  [DocumentType.OTHER]: 'Autres',
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
                      {typeLabels[type as DocumentType]}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres */}
      <DocumentFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
        applications={applications}
      />

      {/* Liste des documents */}
      <DocumentList
        documents={documents}
        loading={isLoading}
        selectable={selectionMode}
        selectedIds={selectedIds}
        onSelectionChange={handleSelectionChange}
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

      {/* Message si aucun document */}
      {!isLoading &&
        documents.length === 0 &&
        Object.values(filters).every(
          (v) =>
            !v ||
            v === 1 ||
            v === ITEMS_PER_PAGE ||
            v === 'createdAt' ||
            v === 'desc'
        ) && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <Upload className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Commencez à organiser vos documents
              </h3>
              <p className="text-gray-500 mb-6">
                Uploadez vos CV, lettres de motivation et autres documents pour
                les associer à vos candidatures.
              </p>
              <Button onClick={() => navigate.push('/documents/upload')}>
                <Plus className="h-4 w-4 mr-2" />
                Uploader mon premier document
              </Button>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default DocumentsClient;