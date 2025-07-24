'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  Building2,
  MapPin,
  ExternalLink,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Euro,
  Clock,
} from 'lucide-react';

import { type Application, ApplicationStatus } from '@/types';
import { useDeleteApplication } from '@/hooks/useApplications';

interface ApplicationListProps {
  applications: Application[];
  loading?: boolean;
}

const statusVariants = {
  [ApplicationStatus.APPLIED]: {
    variant: 'default' as const,
    color: 'bg-blue-500',
  },
  [ApplicationStatus.UNDER_REVIEW]: {
    variant: 'secondary' as const,
    color: 'bg-yellow-500',
  },
  [ApplicationStatus.INTERVIEW_SCHEDULED]: {
    variant: 'outline' as const,
    color: 'bg-purple-500',
  },
  [ApplicationStatus.INTERVIEWED]: {
    variant: 'outline' as const,
    color: 'bg-indigo-500',
  },
  [ApplicationStatus.OFFER_RECEIVED]: {
    variant: 'default' as const,
    color: 'bg-green-500',
  },
  [ApplicationStatus.ACCEPTED]: {
    variant: 'default' as const,
    color: 'bg-emerald-500',
  },
  [ApplicationStatus.REJECTED]: {
    variant: 'destructive' as const,
    color: 'bg-red-500',
  },
  [ApplicationStatus.WITHDRAWN]: {
    variant: 'secondary' as const,
    color: 'bg-gray-500',
  },
};

const statusLabels = {
  [ApplicationStatus.APPLIED]: 'Envoyée',
  [ApplicationStatus.UNDER_REVIEW]: 'En cours',
  [ApplicationStatus.INTERVIEW_SCHEDULED]: 'Entretien programmé',
  [ApplicationStatus.INTERVIEWED]: 'Entretien passé',
  [ApplicationStatus.OFFER_RECEIVED]: 'Offre reçue',
  [ApplicationStatus.ACCEPTED]: 'Acceptée',
  [ApplicationStatus.REJECTED]: 'Refusée',
  [ApplicationStatus.WITHDRAWN]: 'Retirée',
};

export const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  loading,
}) => {
  const navigate = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteApplication = useDeleteApplication();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteApplication.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune candidature trouvée
          </h3>
          <p className="text-gray-500 mb-6">
            Aucune candidature ne correspond à vos critères de recherche.
          </p>
          <Button onClick={() => navigate.push('/applications/new')}>
            Ajouter une candidature
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {applications.map((application) => (
          <Card
            key={application.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                {/* Logo/Avatar de l'entreprise */}
                <div className="flex-shrink-0">
                  <div
                    className={`h-12 w-12 rounded-lg ${
                      statusVariants[application.status].color
                    } flex items-center justify-center text-white font-semibold text-lg`}
                  >
                    {application.company.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Informations principales */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3
                      className="text-lg font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600"
                      onClick={() => navigate.push(`s/${application.id}`)}
                    >
                      {application.position}
                    </h3>
                    {application.jobUrl && (
                      <ExternalLink
                        className="h-4 w-4 text-gray-400 cursor-pointer hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(application.jobUrl, '_blank');
                        }}
                      />
                    )}
                  </div>

                  <div className="flex items-center space-x-2 mt-1">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {application.company}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    {application.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{application.location}</span>
                      </div>
                    )}

                    {application.salary && (
                      <div className="flex items-center space-x-1">
                        <Euro className="h-3 w-3" />
                        <span>{application.salary}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(application.appliedAt), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Statistiques rapides */}
                  <div className="flex items-center space-x-4 mt-2">
                    {application.interviews.length > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {application.interviews.length} entretien(s)
                        </span>
                      </div>
                    )}

                    {application.documents.length > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <FileText className="h-3 w-3" />
                        <span>{application.documents.length} document(s)</span>
                      </div>
                    )}
                  </div>

                  {/* Notes (preview) */}
                  {application.notes && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {application.notes}
                    </p>
                  )}
                </div>

                {/* Statut */}
                <div className="flex-shrink-0">
                  <Badge
                    variant={statusVariants[application.status].variant}
                    className="text-xs"
                  >
                    {statusLabels[application.status]}
                  </Badge>
                </div>

                {/* Menu actions */}
                <div className="flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate.push(`/applications/${application.id}`)
                        }
                      >
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate.push(`/applications/${application.id}/edit`)
                        }
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteId(application.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la candidature</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette candidature ? Cette
              action est irréversible et supprimera également tous les
              entretiens et documents associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteApplication.isPending}
            >
              {deleteApplication.isPending ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
