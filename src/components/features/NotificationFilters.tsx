'use client'

import { useState } from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { NotificationType, NotificationPriority } from '@/types';
import type { NotificationFilters as NotificationFiltersType } from '@/services/notificationService';

interface NotificationFiltersProps {
  filters: NotificationFiltersType;
  onFiltersChange: (filters: Partial<NotificationFiltersType>) => void;
  onReset: () => void;
}

const typeOptions = [
  { value: NotificationType.INTERVIEW_REMINDER, label: 'Rappel d\'entretien' },
  { value: NotificationType.APPLICATION_FOLLOW_UP, label: 'Suivi de candidature' },
  { value: NotificationType.DEADLINE_ALERT, label: 'Alerte échéance' },
  { value: NotificationType.STATUS_UPDATE, label: 'Mise à jour statut' },
  { value: NotificationType.WEEKLY_REPORT, label: 'Rapport hebdomadaire' },
  { value: NotificationType.SYSTEM_NOTIFICATION, label: 'Notification système' },
  { value: NotificationType.ACHIEVEMENT, label: 'Réussite' },
];

const priorityOptions = [
  { value: NotificationPriority.LOW, label: 'Faible', color: 'bg-gray-500' },
  { value: NotificationPriority.NORMAL, label: 'Normal', color: 'bg-blue-500' },
  { value: NotificationPriority.HIGH, label: 'Élevée', color: 'bg-orange-500' },
  { value: NotificationPriority.URGENT, label: 'Urgente', color: 'bg-red-500' },
];

const sortOptions = [
  { value: 'createdAt', label: 'Date de création' },
  { value: 'priority', label: 'Priorité' },
  { value: 'type', label: 'Type' },
];

const sortOrderOptions = [
  { value: 'desc', label: 'Plus récent' },
  { value: 'asc', label: 'Plus ancien' },
];

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Compter les filtres actifs
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'page' || key === 'limit') return false;
    if (key === 'sortBy' && value === 'createdAt') return false;
    if (key === 'sortOrder' && value === 'desc') return false;
    if (key === 'type' && value === 'all') return false;
    if (key === 'priority' && value === 'all') return false;
    return value !== undefined && value !== '' && value !== 'all';
  }).length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof NotificationFiltersType, value: any) => {
    onFiltersChange({ [key]: value });
  };

  const clearFilter = (key: keyof NotificationFiltersType) => {
    onFiltersChange({ [key]: undefined });
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardContent className="p-4">
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Filtres</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm">
                {isOpen ? 'Masquer' : 'Afficher'}
              </Button>
            </div>
          </CardContent>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Filtres rapides */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filters.unreadOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('unreadOnly', filters.unreadOnly ? undefined : true)}
                >
                  Non lues uniquement
                </Button>
              </div>

              {/* Filtres détaillés */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Type */}
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={filters.type || 'all'}
                    onValueChange={(value) => handleFilterChange('type', value === 'all' ? undefined : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priorité */}
                <div className="space-y-2">
                  <Label>Priorité</Label>
                  <Select
                    value={filters.priority || 'all'}
                    onValueChange={(value) => handleFilterChange('priority', value === 'all' ? undefined : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les priorités" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les priorités</SelectItem>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${option.color}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tri */}
                <div className="space-y-2">
                  <Label>Trier par</Label>
                  <Select
                    value={filters.sortBy || 'createdAt'}
                    onValueChange={(value) => handleFilterChange('sortBy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ordre */}
                <div className="space-y-2">
                  <Label>Ordre</Label>
                  <Select
                    value={filters.sortOrder || 'desc'}
                    onValueChange={(value) => handleFilterChange('sortOrder', value as 'asc' | 'desc')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOrderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filtres actifs */}
              {activeFiltersCount > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Filtres actifs :</Label>
                  <div className="flex flex-wrap gap-2">
                    {filters.type && filters.type !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Type: {typeOptions.find(t => t.value === filters.type)?.label}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => clearFilter('type')}
                        />
                      </Badge>
                    )}
                    {filters.priority && filters.priority !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Priorité: {priorityOptions.find(p => p.value === filters.priority)?.label}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => clearFilter('priority')}
                        />
                      </Badge>
                    )}
                    {filters.unreadOnly && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Non lues uniquement
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => clearFilter('unreadOnly')}
                        />
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onReset}
                  disabled={activeFiltersCount === 0}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};