'use client'

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

import {
  Calendar,
  Clock,
  Building2,
  Users,
  Plus,
  ArrowRight,
  Phone,
  Video,
  MapPin,
  FileText,
} from 'lucide-react';

import { useUpcomingInterviews } from '@/hooks/useInterviews';
import { InterviewType } from '@/types';
import { formatDateTime, getTimeUntil } from '@/utils/dateUtils';

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

interface UpcomingInterviewsWidgetProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

export const UpcomingInterviewsWidget: React.FC<
  UpcomingInterviewsWidgetProps
> = ({ limit = 5, showHeader = true, className }) => {
  const navigate = useRouter();
  const { data: interviews, isLoading, error } = useUpcomingInterviews(limit);

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertDescription>
              Erreur lors du chargement des entretiens à venir.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Entretiens à venir</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate.push('/interviews/new')}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate.push('/interviews')}
            >
              Voir tout
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
      )}

      <CardContent className={showHeader ? 'pt-0' : 'p-6'}>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-3 rounded-lg border"
              >
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : !interviews || interviews.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun entretien planifié
            </h3>
            <p className="text-gray-500 mb-4">
              Vous n&apos;avez aucun entretien à venir dans les prochains jours.
            </p>
            <Button onClick={() => navigate.push('/interviews/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Planifier un entretien
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {interviews.map((interview) => {
              const TypeIcon = typeIcons[interview.type];
              const timeUntil = getTimeUntil(interview.scheduledAt);
              const isUrgent =
                new Date(interview.scheduledAt).getTime() -
                  new Date().getTime() <
                24 * 60 * 60 * 1000; // Dans les 24h

              return (
                <div
                  key={interview.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                    isUrgent
                      ? 'border-orange-200 bg-orange-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => navigate.push(`/interviews/${interview.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    {/* Icône du type */}
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                        isUrgent
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      <TypeIcon className="h-5 w-5" />
                    </div>

                    {/* Informations principales */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={typeVariants[interview.type]}
                          className="text-xs"
                        >
                          {typeLabels[interview.type]}
                        </Badge>
                        {isUrgent && (
                          <Badge
                            variant="outline"
                            className="text-xs text-orange-600 border-orange-200 bg-orange-50"
                          >
                            Urgent
                          </Badge>
                        )}
                      </div>

                      {/* Candidature */}
                      {interview.application && (
                        <h4 className="font-medium text-gray-900 mt-1 truncate">
                          {interview.application.position}
                        </h4>
                      )}

                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        {/* Date et heure */}
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDateTime(interview.scheduledAt)}</span>
                        </div>

                        {/* Entreprise */}
                        {interview.application && (
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span className="truncate">
                              {interview.application.company}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Intervieweurs */}
                      {interview.interviewers.length > 0 && (
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                          <Users className="h-3 w-3" />
                          <span className="truncate">
                            Avec:{' '}
                            {interview.interviewers.slice(0, 2).join(', ')}
                            {interview.interviewers.length > 2 &&
                              ` +${interview.interviewers.length - 2}`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Temps restant */}
                    <div className="flex-shrink-0 text-right">
                      <div
                        className={`text-sm font-medium ${
                          isUrgent ? 'text-orange-600' : 'text-gray-900'
                        }`}
                      >
                        {timeUntil}
                      </div>
                      {interview.duration && (
                        <div className="text-xs text-gray-500 mt-1">
                          {interview.duration} min
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes preview */}
                  {interview.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        📝 {interview.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Lien vers tous les entretiens */}
            {interviews.length >= limit && (
              <div className="pt-3 border-t">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate.push('/interviews?upcoming=true')}
                >
                  Voir tous les entretiens à venir
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
