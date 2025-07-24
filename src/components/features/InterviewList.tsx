'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  Calendar,
  Clock,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Phone,
  Video,
  MapPin,
  FileText,
} from 'lucide-react';

import { type Interview, InterviewType } from '@/types';
import { formatDateTime, getTimeUntil } from '@/utils/dateUtils';
import { useDeleteInterview } from '@/hooks/useInterviews';

interface InterviewListProps {
  interviews: Interview[];
  loading?: boolean;
}

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

export const InterviewList: React.FC<InterviewListProps> = ({
  interviews,
  loading,
}) => {
  const navigate = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteInterview = useDeleteInterview();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteInterview.mutateAsync(deleteId);
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

  if (interviews.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun entretien trouvé
          </h3>
          <p className="text-gray-500 mb-6">
            Aucun entretien ne correspond à vos critères de recherche.
          </p>
          <Button onClick={() => navigate.push('/interviews/new')}>
            Planifier un entretien
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {interviews.map((interview) => {
          const TypeIcon = typeIcons[interview.type];
          const isUpcoming = new Date(interview.scheduledAt) > new Date();
          const timeUntil = getTimeUntil(interview.scheduledAt);

          return (
            <Card
              key={interview.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Icône du type d'entretien */}
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <TypeIcon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Informations principales */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3
                        className="text-lg font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600"
                        onClick={() =>
                          navigate.push(`/interviews/${interview.id}`)
                        }
                      >
                        Entretien {typeLabels[interview.type]}
                      </h3>
                      <Badge
                        variant={typeVariants[interview.type]}
                        className="text-xs"
                      >
                        {typeLabels[interview.type]}
                      </Badge>
                    </div>

                    {/* Candidature associée */}
                    {interview.application && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span
                          className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            navigate.push(
                              `/applications/${interview.application?.id}`
                            )
                          }
                        >
                          {interview.application.position} -{' '}
                          {interview.application.company}
                        </span>
                      </div>
                    )}

                    {/* Informations de timing */}
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDateTime(interview.scheduledAt)}</span>
                      </div>

                      {interview.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{interview.duration} min</span>
                        </div>
                      )}

                      {isUpcoming && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{timeUntil}</span>
                        </div>
                      )}
                    </div>

                    {/* Intervieweurs */}
                    {interview.interviewers.length > 0 && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Users className="h-3 w-3 text-gray-400" />
                        <div className="flex flex-wrap gap-1">
                          {interview.interviewers
                            .slice(0, 3)
                            .map((interviewer, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {interviewer}
                              </Badge>
                            ))}
                          {interview.interviewers.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{interview.interviewers.length - 3} autres
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes preview */}
                    {interview.notes && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {interview.notes}
                      </p>
                    )}
                  </div>

                  {/* Statut temporel */}
                  <div className="flex-shrink-0">
                    {isUpcoming ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50"
                      >
                        À venir
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Passé</Badge>
                    )}
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
                            navigate.push(`/interviews/${interview.id}`)
                          }
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate.push(`/interviews/${interview.id}/edit`)
                          }
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        {interview.application && (
                          <DropdownMenuItem
                            onClick={() =>
                              navigate.push(
                                `/applications/${interview.application?.id}`
                              )
                            }
                          >
                            <Building2 className="h-4 w-4 mr-2" />
                            Voir la candidature
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(interview.id)}
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
          );
        })}
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
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
    </>
  );
};
