'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InterviewType } from '@/types';

interface InterviewTypeChartProps {
  data: Record<InterviewType, number>;
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

export const InterviewTypeChart: React.FC<InterviewTypeChartProps> = ({ 
  data, 
  loading 
}) => {
  const chartData = Object.entries(data)
    .map(([type, value]) => ({
      name: typeLabels[type as InterviewType],
      value,
    }))
    .filter(item => item.value > 0);

  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Types d&apos;entretiens</CardTitle>
          <CardDescription>
            Répartition par type
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
          <CardTitle>Types d&apos;entretiens</CardTitle>
          <CardDescription>
            Répartition par type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground">
              Aucun entretien pour le moment
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Types d&apos;entretiens</CardTitle>
        <CardDescription>
          Répartition par type ({total} entretiens)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};