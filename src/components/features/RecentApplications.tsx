'use client'

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Building2, MapPin, ExternalLink } from 'lucide-react';
import { type Application, ApplicationStatus } from '@/types';
import { useRouter } from 'next/navigation';

interface RecentApplicationsProps {
  applications: Application[];
  loading?: boolean;
}

const statusVariants = {
  [ApplicationStatus.APPLIED]: 'default',
  [ApplicationStatus.UNDER_REVIEW]: 'secondary',
  [ApplicationStatus.INTERVIEW_SCHEDULED]: 'outline',
  [ApplicationStatus.INTERVIEWED]: 'outline',
  [ApplicationStatus.OFFER_RECEIVED]: 'default',
  [ApplicationStatus.ACCEPTED]: 'default',
  [ApplicationStatus.REJECTED]: 'destructive',
  [ApplicationStatus.WITHDRAWN]: 'secondary',
} as const;

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

export const RecentApplications: React.FC<RecentApplicationsProps> = ({ 
  applications, 
  loading 
}) => {
  const navigate = useRouter();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Candidatures récentes</CardTitle>
          <CardDescription>
            Vos dernières candidatures
          </CardDescription>
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
          <CardTitle>Candidatures récentes</CardTitle>
          <CardDescription>
            Vos dernières candidatures
          </CardDescription>
        </div>
        <Button
          size="sm"
          onClick={() => navigate.push('/applications/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle
        </Button>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune candidature
            </h3>
            <p className="text-gray-500 mb-4">
              Commencez par ajouter votre première candidature
            </p>
            <Button onClick={() => navigate.push('/applications/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une candidature
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate.push(`/applications/${application.id}`)}
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {application.company.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {application.position}
                    </h3>
                    {application.jobUrl && (
                      <ExternalLink 
                        className="h-3 w-3 text-gray-400 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(application.jobUrl, '_blank');
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600">
                      {application.company}
                    </span>
                    {application.location && (
                      <>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {application.location}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(application.appliedAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Badge 
                    variant={statusVariants[application.status]}
                    className="text-xs"
                  >
                    {statusLabels[application.status]}
                  </Badge>
                </div>
              </div>
            ))}
            
            {applications.length >= 5 && (
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate.push('/applications')}
                >
                  Voir toutes les candidatures
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};