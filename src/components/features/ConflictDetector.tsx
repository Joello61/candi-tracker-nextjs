'use client'

import { useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, Clock, Building2 } from 'lucide-react';

import { useCheckConflicts } from '@/hooks/useInterviews';
import { formatDateTime } from '@/utils/dateUtils';
import { InterviewType } from '@/types';

interface ConflictDetectorProps {
  scheduledAt: string;
  duration?: number;
  excludeInterviewId?: string;
  onConflictChange?: (hasConflicts: boolean) => void;
}

const typeLabels = {
  [InterviewType.PHONE]: 'Téléphonique',
  [InterviewType.VIDEO]: 'Visioconférence',
  [InterviewType.ONSITE]: 'Sur site',
  [InterviewType.TECHNICAL]: 'Technique',
  [InterviewType.HR]: 'RH',
  [InterviewType.FINAL]: 'Final',
};

export const ConflictDetector: React.FC<ConflictDetectorProps> = ({
  scheduledAt,
  duration,
  excludeInterviewId,
  onConflictChange,
}) => {
  const { data: conflictData, isLoading } = useCheckConflicts({
    scheduledAt,
    duration,
    excludeInterviewId,
  });

  useEffect(() => {
    if (conflictData && onConflictChange) {
      onConflictChange(conflictData.hasConflicts);
    }
  }, [conflictData, onConflictChange]);

  // Ne rien afficher si pas de date ou en cours de chargement
  if (!scheduledAt || isLoading) {
    return null;
  }

  // Pas de conflits
  if (!conflictData?.hasConflicts) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <Calendar className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          ✅ Aucun conflit détecté pour ce créneau
        </AlertDescription>
      </Alert>
    );
  }

  // Conflits détectés
  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-3">
          <div className="font-medium text-red-800">
            ⚠️ Conflit détecté ! Vous avez déjà {conflictData.conflicts.length} entretien{conflictData.conflicts.length > 1 ? 's' : ''} programmé{conflictData.conflicts.length > 1 ? 's' : ''} à ce moment :
          </div>
          
          <div className="space-y-2">
            {conflictData.conflicts.map((conflict) => (
              <div key={conflict.id} className="bg-white p-3 rounded border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {typeLabels[conflict.type]}
                      </Badge>
                      <span className="text-sm font-medium">
                        {formatDateTime(conflict.scheduledAt)}
                      </span>
                      {conflict.duration && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{conflict.duration} min</span>
                        </div>
                      )}
                    </div>
                    
                    {conflict.application && (
                      <div className="flex items-center space-x-1 mt-1 text-sm text-gray-600">
                        <Building2 className="h-3 w-3" />
                        <span>{conflict.application.position} chez {conflict.application.company}</span>
                      </div>
                    )}
                    
                    {conflict.interviewers.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Avec: {conflict.interviewers.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-red-700">
            💡 <strong>Suggestions :</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Choisissez un autre créneau horaire</li>
              <li>Modifiez la durée de l&apos;entretien</li>
              <li>Reprogrammez l&apos;un des entretiens en conflit</li>
            </ul>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};