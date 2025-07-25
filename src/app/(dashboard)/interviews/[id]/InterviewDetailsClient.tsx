'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Calendar,
  Clock,
  Users,
  FileText,
  Building2,
  ExternalLink,
  Video,
  Phone,
  MapPin,
} from 'lucide-react';

import { InterviewType } from '@/types';
import {
  formatDateTime,
  formatRelativeTime,
  getTimeUntil,
} from '@/utils/dateUtils';
import { useDeleteInterview, useInterview } from '@/hooks/useInterviews';

const typeIcons = {
  [InterviewType.PHONE]: Phone,
  [InterviewType.VIDEO]: Video,
  [InterviewType.ONSITE]: MapPin,
  [InterviewType.TECHNICAL]: FileText,
  [InterviewType.HR]: Users,
  [InterviewType.FINAL]: Building2,
};

const typeLabels = {
  [InterviewType.PHONE]: 'Téléphonique',
  [InterviewType.VIDEO]: 'Visioconférence',
  [InterviewType.ONSITE]: 'Sur site',
  [InterviewType.TECHNICAL]: 'Technique',
  [InterviewType.HR]: 'RH',
  [InterviewType.FINAL]: 'Final',
};

const typeVariants = {
  [InterviewType.PHONE]: 'default' as const,
  [InterviewType.VIDEO]: 'secondary' as const,
  [InterviewType.ONSITE]: 'outline' as const,
  [InterviewType.TECHNICAL]: 'default' as const,
  [InterviewType.HR]: 'secondary' as const,
  [InterviewType.FINAL]: 'destructive' as const,
};

export const InterviewDetailsClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: interview, isLoading, error } = useInterview(id!);
  const deleteInterview = useDeleteInterview();

  const handleDelete = async () => {
    if (id) {
      await deleteInterview.mutateAsync(id);
      navigate.push('/interviews');
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement de l&apos;entretien. Veuillez réessayer.
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

  if (!interview) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>Entretien non trouvé.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const TypeIcon = typeIcons[interview.type];
  const isUpcoming = new Date(interview.scheduledAt) > new Date();
  const timeUntil = getTimeUntil(interview.scheduledAt);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate.push('/interviews')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <TypeIcon className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Entretien {typeLabels[interview.type]}
              </h1>
              {interview.application && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>
                    {interview.application.position} chez{' '}
                    {interview.application.company}
                  </span>
                  <button
                    onClick={() =>
                      navigate.push(`/applications/${interview.application?.id}`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant={typeVariants[interview.type]}>
            {typeLabels[interview.type]}
          </Badge>

          {isUpcoming && (
            <Badge
              variant="outline"
              className="text-green-600 border-green-200 bg-green-50"
            >
              {timeUntil}
            </Badge>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate.push(`/interviews/${id}/edit`)}
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

      {/* Status alert */}
      {isUpcoming && (
        <Alert className="border-blue-200 bg-blue-50">
          <Calendar className="h-4 w-4" />
          <AlertDescription>
            <strong>Entretien à venir</strong> - {timeUntil}
          </AlertDescription>
        </Alert>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations principales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Détails de l&apos;entretien</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Type
                  </label>
                  <div className="mt-1">
                    <Badge variant={typeVariants[interview.type]}>
                      {typeLabels[interview.type]}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date et heure
                  </label>
                  <p className="text-sm text-gray-900 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDateTime(interview.scheduledAt)}</span>
                  </p>
                </div>

                {interview.duration && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Durée estimée
                    </label>
                    <p className="text-sm text-gray-900">
                      {interview.duration} minutes
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Statut
                  </label>
                  <p className="text-sm text-gray-900">
                    {isUpcoming ? 'À venir' : 'Passé'}
                  </p>
                </div>
              </div>

              {interview.interviewers.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Intervieweurs
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {interview.interviewers.map((interviewer, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          <Users className="h-3 w-3 mr-1" />
                          {interviewer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {interview.notes && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Notes de préparation
                    </label>
                    <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">
                      {interview.notes}
                    </p>
                  </div>
                </>
              )}

              {interview.feedback && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Feedback post-entretien
                    </label>
                    <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">
                      {interview.feedback}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Candidature associée */}
          {interview.application && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Candidature associée</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() =>
                    navigate.push(`/applications/${interview.application?.id}`)
                  }
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {interview.application.company.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {interview.application.position}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {interview.application.company}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          )}
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
                  Créé le
                </label>
                <p className="text-sm text-gray-900">
                  {formatDateTime(interview.createdAt)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Modifié le
                </label>
                <p className="text-sm text-gray-900">
                  {formatDateTime(interview.updatedAt)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Planifié
                </label>
                <p className="text-sm text-gray-900">
                  {formatRelativeTime(interview.scheduledAt)}
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
                onClick={() => navigate.push(`/interviews/${id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier l&apos;entretien
              </Button>

              {interview.application && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    navigate.push(`/applications/${interview.application?.id}`)
                  }
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Voir la candidature
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  navigate.push(
                    `/interviews/new?applicationId=${interview.applicationId}`
                  )
                }
              >
                <Calendar className="h-4 w-4 mr-2" />
                Planifier un autre entretien
              </Button>
            </CardContent>
          </Card>

          {/* Rappel */}
          {isUpcoming && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-base text-amber-800">
                  Rappel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700">
                  N&apos;oubliez pas de vous préparer pour cet entretien. Relisez vos
                  notes et préparez vos questions.
                </p>

                {interview.notes && (
                  <div className="mt-3 p-2 bg-white rounded border border-amber-200">
                    <p className="text-xs text-amber-600 font-medium">
                      Vos notes :
                    </p>
                    <p className="text-xs text-amber-700 mt-1 line-clamp-3">
                      {interview.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l&apos;entretien</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet entretien ? Cette action
              est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteInterview.isPending}
            >
              {deleteInterview.isPending ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InterviewDetailsClient;