'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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
  ArrowLeft,
  Edit,
  Trash2,
  MoreHorizontal,
  Building2,
  MapPin,
  ExternalLink,
  Mail,
  User,
  Clock,
  Euro,
  FileText,
  Calendar,
  Plus,
  Download,
  Eye,
} from 'lucide-react';

import { ApplicationStatus, InterviewType, DocumentType } from '@/types';
import { useApplication, useDeleteApplication } from '@/hooks/useApplications';
import {
  formatDate,
  formatDateTime,
  formatRelativeTime,
} from '@/utils/dateUtils';

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
  [ApplicationStatus.UNDER_REVIEW]: "En cours d'examen",
  [ApplicationStatus.INTERVIEW_SCHEDULED]: 'Entretien programmé',
  [ApplicationStatus.INTERVIEWED]: 'Entretien passé',
  [ApplicationStatus.OFFER_RECEIVED]: 'Offre reçue',
  [ApplicationStatus.ACCEPTED]: 'Acceptée',
  [ApplicationStatus.REJECTED]: 'Refusée',
  [ApplicationStatus.WITHDRAWN]: 'Retirée',
};

const interviewTypeLabels = {
  [InterviewType.PHONE]: 'Téléphonique',
  [InterviewType.VIDEO]: 'Visioconférence',
  [InterviewType.ONSITE]: 'Sur site',
  [InterviewType.TECHNICAL]: 'Technique',
  [InterviewType.HR]: 'RH',
  [InterviewType.FINAL]: 'Final',
};

const documentTypeLabels = {
  [DocumentType.CV]: 'CV',
  [DocumentType.COVER_LETTER]: 'Lettre de motivation',
  [DocumentType.PORTFOLIO]: 'Portfolio',
  [DocumentType.CERTIFICATE]: 'Certificat',
  [DocumentType.OTHER]: 'Autre',
};

export const ApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: application, isLoading, error } = useApplication(id!);
  const deleteApplication = useDeleteApplication();

  const handleDelete = async () => {
    if (id) {
      await deleteApplication.mutateAsync(id);
      navigate.push('/applications');
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement de la candidature. Veuillez réessayer.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>Candidature non trouvée.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate.push('/applications')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-4">
            <div
              className={`h-12 w-12 rounded-lg ${
                statusVariants[application.status].color
              } flex items-center justify-center text-white font-semibold text-lg`}
            >
              {application.company.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {application.position}
              </h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{application.company}</span>
                {application.jobUrl && (
                  <ExternalLink
                    className="h-4 w-4 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => window.open(application.jobUrl, '_blank')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant={statusVariants[application.status].variant}>
            {statusLabels[application.status]}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate.push(`/applications/${id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="interviews">
                Entretiens ({application.interviews.length})
              </TabsTrigger>
              <TabsTrigger value="documents">
                Documents ({application.documents.length})
              </TabsTrigger>
            </TabsList>

            {/* Détails de la candidature */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Informations générales</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Entreprise
                      </label>
                      <p className="text-sm text-gray-900">
                        {application.company}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Poste
                      </label>
                      <p className="text-sm text-gray-900">
                        {application.position}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Statut
                      </label>
                      <div className="mt-1">
                        <Badge
                          variant={statusVariants[application.status].variant}
                        >
                          {statusLabels[application.status]}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Date de candidature
                      </label>
                      <p className="text-sm text-gray-900 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(application.appliedAt)}</span>
                      </p>
                    </div>
                    {application.location && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Localisation
                        </label>
                        <p className="text-sm text-gray-900 flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{application.location}</span>
                        </p>
                      </div>
                    )}
                    {application.salary && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Salaire
                        </label>
                        <p className="text-sm text-gray-900 flex items-center space-x-1">
                          <Euro className="h-3 w-3" />
                          <span>{application.salary}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {application.jobUrl && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          URL de l&apos;offre
                        </label>
                        <p className="text-sm">
                          <a
                            href={application.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                          >
                            <span>Voir l&apos;offre</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </p>
                      </div>
                    </>
                  )}

                  {(application.contactName || application.contactEmail) && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Contact
                        </label>
                        <div className="mt-1 space-y-1">
                          {application.contactName && (
                            <p className="text-sm text-gray-900 flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{application.contactName}</span>
                            </p>
                          )}
                          {application.contactEmail && (
                            <p className="text-sm">
                              <a
                                href={`mailto:${application.contactEmail}`}
                                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                              >
                                <Mail className="h-3 w-3" />
                                <span>{application.contactEmail}</span>
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {application.notes && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Notes
                        </label>
                        <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">
                          {application.notes}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Entretiens */}
            <TabsContent value="interviews" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Entretiens</h3>
                <Button
                  size="sm"
                  onClick={() =>
                    navigate.push(`/interviews/new?applicationId=${id}`)
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un entretien
                </Button>
              </div>

              {application.interviews.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun entretien planifié
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Ajoutez votre premier entretien pour cette candidature.
                    </p>
                    <Button
                      onClick={() =>
                        navigate.push(`/interviews/new?applicationId=${id}`)
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Planifier un entretien
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {application.interviews.map((interview) => (
                    <Card
                      key={interview.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {interviewTypeLabels[interview.type]}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {formatDateTime(interview.scheduledAt)}
                              </span>
                            </div>

                            {interview.duration && (
                              <p className="text-sm text-gray-600 mt-1">
                                Durée: {interview.duration} minutes
                              </p>
                            )}

                            {interview.interviewers.length > 0 && (
                              <p className="text-sm text-gray-600 mt-1">
                                Intervieweurs:{' '}
                                {interview.interviewers.join(', ')}
                              </p>
                            )}

                            {interview.notes && (
                              <p className="text-sm text-gray-600 mt-2">
                                {interview.notes}
                              </p>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate.push(`/interviews/${interview.id}`)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Documents */}
            <TabsContent value="documents" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Documents</h3>
                <Button
                  size="sm"
                  onClick={() => navigate.push(`/documents?applicationId=${id}`)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>

              {application.documents.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun document attaché
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Ajoutez des documents (CV, lettre de motivation, etc.) à
                      cette candidature.
                    </p>
                    <Button
                      onClick={() =>
                        navigate.push(`/documents?applicationId=${id}`)
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un document
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {application.documents.map((document) => (
                    <Card
                      key={document.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-gray-400" />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {document.name}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Badge variant="secondary" className="text-xs">
                                  {documentTypeLabels[document.type]}
                                </Badge>
                                {document.size && (
                                  <span>
                                    {(document.size / 1024 / 1024).toFixed(2)}{' '}
                                    MB
                                  </span>
                                )}
                                <span>
                                  {formatRelativeTime(document.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `/api/documents/${document.id}/download`,
                                '_blank'
                              )
                            }
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Quick info */}
        <div className="space-y-6">
          {/* Métadonnées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Métadonnées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Créée le
                </label>
                <p className="text-sm text-gray-900">
                  {formatDateTime(application.createdAt)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Modifiée le
                </label>
                <p className="text-sm text-gray-900">
                  {formatDateTime(application.updatedAt)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Temps écoulé
                </label>
                <p className="text-sm text-gray-900">
                  {formatRelativeTime(application.appliedAt)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate.push(`/applications/${id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier la candidature
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  navigate.push(`/interviews/new?applicationId=${id}`)
                }
              >
                <Calendar className="h-4 w-4 mr-2" />
                Planifier un entretien
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate.push(`/documents?applicationId=${id}`)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Ajouter un document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
    </div>
  );
};

export default ApplicationDetailsPage;