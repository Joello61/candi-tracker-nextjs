'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ApplicationStatus } from '@/types';

interface ApplicationStatusChartProps {
  data: Record<ApplicationStatus, number>;
  loading?: boolean;
}

const statusColors = {
  [ApplicationStatus.APPLIED]: '#3b82f6',
  [ApplicationStatus.UNDER_REVIEW]: '#f59e0b',
  [ApplicationStatus.INTERVIEW_SCHEDULED]: '#8b5cf6',
  [ApplicationStatus.INTERVIEWED]: '#06b6d4',
  [ApplicationStatus.OFFER_RECEIVED]: '#10b981',
  [ApplicationStatus.ACCEPTED]: '#059669',
  [ApplicationStatus.REJECTED]: '#ef4444',
  [ApplicationStatus.WITHDRAWN]: '#6b7280',
};

const statusLabels = {
  [ApplicationStatus.APPLIED]: 'Envoyées',
  [ApplicationStatus.UNDER_REVIEW]: 'En cours',
  [ApplicationStatus.INTERVIEW_SCHEDULED]: 'Entretien programmé',
  [ApplicationStatus.INTERVIEWED]: 'Entretien passé',
  [ApplicationStatus.OFFER_RECEIVED]: 'Offre reçue',
  [ApplicationStatus.ACCEPTED]: 'Acceptées',
  [ApplicationStatus.REJECTED]: 'Refusées',
  [ApplicationStatus.WITHDRAWN]: 'Retirées',
};

export const ApplicationStatusChart: React.FC<ApplicationStatusChartProps> = ({ 
  data, 
  loading 
}) => {
  const chartData = Object.entries(data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value > 0)
    .map(([status, value]) => ({
      name: statusLabels[status as ApplicationStatus],
      value,
      color: statusColors[status as ApplicationStatus],
    }));

  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Répartition des candidatures</CardTitle>
          <CardDescription>
            Distribution par statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground">Chargement...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Répartition des candidatures</CardTitle>
          <CardDescription>
            Distribution par statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground">
              Aucune candidature pour le moment
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des candidatures</CardTitle>
        <CardDescription>
          Distribution par statut ({total} candidatures)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};