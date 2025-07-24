'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import type { ApplicationStats, InterviewStats } from '@/types';

interface QuickInsightsProps {
  applicationStats: ApplicationStats;
  interviewStats: InterviewStats;
}

export const QuickInsights: React.FC<QuickInsightsProps> = ({
  applicationStats,
  interviewStats
}) => {
  const insights = [];

  // Analyser les tendances
  if (applicationStats.thisWeek > applicationStats.thisMonth / 4) {
    insights.push({
      type: 'positive',
      icon: <TrendingUp className="h-4 w-4" />,
      title: 'Activité en hausse',
      description: 'Vous avez envoyé plus de candidatures cette semaine que la moyenne mensuelle',
    });
  }

  if (applicationStats.successRate > 15) {
    insights.push({
      type: 'positive',
      icon: <CheckCircle className="h-4 w-4" />,
      title: 'Bon taux de succès',
      description: `Votre taux de succès de ${applicationStats.successRate}% est excellent`,
    });
  }

  if (interviewStats.upcoming > 3) {
    insights.push({
      type: 'warning',
      icon: <AlertCircle className="h-4 w-4" />,
      title: 'Semaine chargée',
      description: `${interviewStats.upcoming} entretiens à venir, préparez-vous bien !`,
    });
  }

  if (applicationStats.thisWeek === 0 && applicationStats.total > 0) {
    insights.push({
      type: 'neutral',
      icon: <TrendingDown className="h-4 w-4" />,
      title: 'Activité calme',
      description: 'Peut-être temps de chercher de nouvelles opportunités ?',
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: 'neutral',
      icon: <CheckCircle className="h-4 w-4" />,
      title: 'Tout va bien',
      description: 'Continuez sur cette lancée !',
    });
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>
          Analyse de votre activité
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.slice(0, 3).map((insight, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">
                  {insight.title}
                </h4>
                <p className="text-sm opacity-80 mt-1">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};