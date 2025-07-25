'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { fr } from 'date-fns/locale';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ChevronLeft, ChevronRight, Calendar, Plus, Clock } from 'lucide-react';

import { useUpcomingInterviews } from '@/hooks/useInterviews';
import { InterviewType, type CalendarEvent } from '@/types';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

const typeColors = {
  [InterviewType.PHONE]: 'bg-blue-500',
  [InterviewType.VIDEO]: 'bg-purple-500',
  [InterviewType.ONSITE]: 'bg-green-500',
  [InterviewType.TECHNICAL]: 'bg-orange-500',
  [InterviewType.HR]: 'bg-pink-500',
  [InterviewType.FINAL]: 'bg-red-500',
};

interface InterviewCalendarProps {
  className?: string;
}

export const interviewCalendarMetadata: Metadata = {
  title: 'Calendrier des entretiens',
  description: 'Visualisez tous vos entretiens d\'embauche dans un calendrier interactif. Planifiez et organisez vos rendez-vous professionnels sur Candi Tracker.',
  keywords: [
    'calendrier entretiens',
    'planning interviews',
    'agenda entretiens',
    'vue calendrier',
    'organisation entretiens',
    'rendez-vous emploi',
    'planning recherche emploi'
  ],
  openGraph: {
    title: 'Calendrier des entretiens | Candi Tracker',
    description: 'Votre agenda personnalisé pour ne manquer aucun entretien et optimiser votre planning.',
    images: [{ url: '/og-calendar.jpg', width: 1200, height: 630 }],
  }
}

export const InterviewCalendarPage: React.FC<InterviewCalendarProps> = ({
  className,
}) => {
  const navigate = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Lundi
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  // Utiliser le hook qui fonctionne dans le dashboard
  const { data: upcomingInterviews, isLoading } = useUpcomingInterviews(50); // Plus d'entretiens pour le calendrier

  // Convertir les entretiens en événements calendrier
  const events: CalendarEvent[] =
    upcomingInterviews?.map((interview) => ({
      id: interview.id,
      title: `${interview.application?.company || ''} - ${
        interview.application?.position || ''
      }`,
      start: interview.scheduledAt,
      end: interview.scheduledAt, // Pas de durée dans le type Interview
      type: interview.type,
      company: interview.application?.company || '',
      position: interview.application?.position || '',
      notes: interview.notes,
      interviewers: interview.interviewers,
    })) || [];

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getEventsForDay = (day: Date): CalendarEvent[] => {
    return events.filter((event) => isSameDay(new Date(event.start), day));
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
              <div
                key={index}
                className="text-center font-medium text-gray-500 text-sm p-2"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Calendrier des entretiens</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Aujourd&apos;hui
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate.push('/interviews/new')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {format(currentDate, 'MMMM yyyy', { locale: fr })}
            </h3>
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* En-têtes des jours */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(
              (day, index) => (
                <div
                  key={index}
                  className="text-center font-medium text-gray-500 text-sm p-2"
                >
                  {day}
                </div>
              )
            )}
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={index}
                  className={cn(
                    'min-h-[80px] p-1 border rounded-lg transition-colors hover:bg-gray-50',
                    !isCurrentMonth && 'bg-gray-50 text-gray-400',
                    isToday && 'border-blue-500 bg-blue-50'
                  )}
                >
                  <div
                    className={cn(
                      'text-sm font-medium mb-1',
                      isToday && 'text-blue-600'
                    )}
                  >
                    {format(day, 'd')}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <Tooltip key={event.id}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              'text-xs p-1 rounded text-white cursor-pointer truncate',
                              typeColors[event.type]
                            )}
                            onClick={() =>
                              navigate.push(`/interviews/${event.id}`)
                            }
                          >
                            <div className="flex items-center space-x-1">
                              <Clock className="h-2 w-2" />
                              <span className="truncate">
                                {format(new Date(event.start), 'HH:mm')}
                              </span>
                            </div>
                            <div className="truncate font-medium">
                              {event.company}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="space-y-1">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm">
                              {event.position} chez {event.company}
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(event.start), 'HH:mm')}
                            </div>
                            {event.interviewers.length > 0 && (
                              <div className="text-xs">
                                Avec: {event.interviewers.join(', ')}
                              </div>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}

                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayEvents.length - 2} autre
                        {dayEvents.length - 2 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Légende */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Types d&apos;entretiens
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(typeColors).map(([type, color]) => {
                const labels = {
                  [InterviewType.PHONE]: 'Téléphonique',
                  [InterviewType.VIDEO]: 'Visioconférence',
                  [InterviewType.ONSITE]: 'Sur site',
                  [InterviewType.TECHNICAL]: 'Technique',
                  [InterviewType.HR]: 'RH',
                  [InterviewType.FINAL]: 'Final',
                };

                return (
                  <div key={type} className="flex items-center space-x-2">
                    <div className={cn('w-3 h-3 rounded', color)}></div>
                    <span className="text-xs text-gray-600">
                      {labels[type as InterviewType]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statistiques rapides du mois */}
          {events && events.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Entretiens à venir ({events.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  events.reduce((acc, event) => {
                    acc[event.type] = (acc[event.type] || 0) + 1;
                    return acc;
                  }, {} as Record<InterviewType, number>)
                ).map(([type, count]) => {
                  const labels = {
                    [InterviewType.PHONE]: 'Téléphonique',
                    [InterviewType.VIDEO]: 'Visioconférence',
                    [InterviewType.ONSITE]: 'Sur site',
                    [InterviewType.TECHNICAL]: 'Technique',
                    [InterviewType.HR]: 'RH',
                    [InterviewType.FINAL]: 'Final',
                  };

                  return (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {count} {labels[type as InterviewType]}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default InterviewCalendarPage;