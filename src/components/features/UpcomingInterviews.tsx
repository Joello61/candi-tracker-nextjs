'use client'

import { format, formatDistanceToNow, isPast, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { type Interview, InterviewType } from '@/types';
import { useRouter } from 'next/navigation';

interface UpcomingInterviewsProps {
  interviews: Interview[];
  loading?: boolean;
}

const typeLabels = {
  [InterviewType.PHONE]: 'Téléphone',
  [InterviewType.VIDEO]: 'Visio',
  [InterviewType.ONSITE]: 'Sur site',
  [InterviewType.TECHNICAL]: 'Technique',
  [InterviewType.HR]: 'RH',
  [InterviewType.FINAL]: 'Final',
};

const typeColors = {
  [InterviewType.PHONE]: 'bg-blue-500',
  [InterviewType.VIDEO]: 'bg-green-500',
  [InterviewType.ONSITE]: 'bg-purple-500',
  [InterviewType.TECHNICAL]: 'bg-orange-500',
  [InterviewType.HR]: 'bg-pink-500',
  [InterviewType.FINAL]: 'bg-red-500',
};

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({
  interviews,
  loading,
}) => {
  const navigate = useRouter();

  const getInterviewStatus = (scheduledAt: string) => {
    const interviewDate = new Date(scheduledAt);
    const now = new Date();

    if (isPast(interviewDate)) {
      return { label: 'Passé', variant: 'secondary' as const };
    }

    if (isSameDay(interviewDate, now)) {
      return { label: "Aujourd'hui", variant: 'destructive' as const };
    }

    const hoursUntil =
      (interviewDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursUntil < 24) {
      return { label: 'Demain', variant: 'default' as const };
    }

    return { label: 'À venir', variant: 'outline' as const };
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Entretiens à venir</CardTitle>
          <CardDescription>Vos prochains entretiens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Entretiens à venir</CardTitle>
          <CardDescription>Vos prochains entretiens</CardDescription>
        </div>
        <Button size="sm" onClick={() => navigate.push('/interviews/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau
        </Button>
      </CardHeader>
      <CardContent>
        {interviews.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun entretien planifié
            </h3>
            <p className="text-gray-500 mb-4">
              Vos entretiens apparaîtront ici une fois programmés
            </p>
            <Button onClick={() => navigate.push('/interviews/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Programmer un entretien
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => {
              const status = getInterviewStatus(interview.scheduledAt);
              const isUrgent =
                status.label === "Aujourd'hui" || status.label === 'Demain';

              return (
                <div
                  key={interview.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg border transition-colors cursor-pointer ${
                    isUrgent
                      ? 'border-orange-200 bg-orange-50 hover:bg-orange-100'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => navigate.push(`/interviews/${interview.id}`)}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`h-10 w-10 rounded-lg ${
                        typeColors[interview.type]
                      } flex items-center justify-center text-white text-xs font-semibold`}
                    >
                      {typeLabels[interview.type].charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {interview.application?.company} -{' '}
                        {interview.application?.position}
                      </h3>
                      {isUrgent && (
                        <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {typeLabels[interview.type]}
                      </Badge>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {format(
                            new Date(interview.scheduledAt),
                            'dd/MM/yyyy à HH:mm',
                            { locale: fr }
                          )}
                        </span>
                      </div>
                    </div>

                    {interview.duration && (
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-xs text-gray-500">
                          Durée: {interview.duration} min
                        </span>
                      </div>
                    )}

                    {interview.interviewers &&
                      interview.interviewers.length > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {interview.interviewers.join(', ')}
                          </span>
                        </div>
                      )}

                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(interview.scheduledAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <Badge variant={status.variant} className="text-xs">
                      {status.label}
                    </Badge>
                  </div>
                </div>
              );
            })}

            {interviews.length >= 5 && (
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate.push('/interviews')}
                >
                  Voir tous les entretiens
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
