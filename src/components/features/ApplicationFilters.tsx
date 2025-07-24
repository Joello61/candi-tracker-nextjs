'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Filter, X, RotateCcw } from 'lucide-react';
import { ApplicationStatus } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ApplicationFiltersProps {
  filters: {
    search?: string;
    status?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
}

const statusOptions = [
  { value: ApplicationStatus.APPLIED, label: 'Envoyées' },
  { value: ApplicationStatus.UNDER_REVIEW, label: 'En cours' },
  { value: ApplicationStatus.INTERVIEW_SCHEDULED, label: 'Entretien programmé' },
  { value: ApplicationStatus.INTERVIEWED, label: 'Entretien passé' },
  { value: ApplicationStatus.OFFER_RECEIVED, label: 'Offre reçue' },
  { value: ApplicationStatus.ACCEPTED, label: 'Acceptées' },
  { value: ApplicationStatus.REJECTED, label: 'Refusées' },
  { value: ApplicationStatus.WITHDRAWN, label: 'Retirées' },
];

const sortOptions = [
  { value: 'appliedAt', label: 'Date de candidature' },
  { value: 'company', label: 'Entreprise' },
  { value: 'position', label: 'Poste' },
  { value: 'status', label: 'Statut' },
  { value: 'createdAt', label: 'Date de création' },
];

export const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.startDate ? new Date(filters.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    filters.endDate ? new Date(filters.endDate) : undefined
  );

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const handleStatusChange = (value: string) => {
    // Handle the special "all" case
    if (value === 'all') {
      onFiltersChange({
        ...filters,
        status: undefined,
      });
    } else {
      onFiltersChange({
        ...filters,
        status: value,
      });
    }
  };

  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    if (type === 'start') {
      setStartDate(date);
      onFiltersChange({
        ...filters,
        startDate: date ? date.toISOString() : undefined,
      });
    } else {
      setEndDate(date);
      onFiltersChange({
        ...filters,
        endDate: date ? date.toISOString() : undefined,
      });
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(Boolean).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Filtrer et trier vos candidatures
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={onReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Filter className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {/* Recherche */}
          <div className="space-y-2">
            <Label htmlFor="search">Rechercher</Label>
            <Input
              id="search"
              placeholder="Entreprise, poste, notes..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Statut */}
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select
                value={filters.status || 'all'}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Entreprise */}
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                placeholder="Nom de l'entreprise"
                value={filters.company || ''}
                onChange={(e) => handleFilterChange('company', e.target.value)}
              />
            </div>

            {/* Tri */}
            <div className="space-y-2">
              <Label>Trier par</Label>
              <div className="flex space-x-2">
                <Select
                  value={filters.sortBy || 'appliedAt'}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <SelectTrigger className="flex-1">
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
                <Select
                  value={filters.sortOrder || 'desc'}
                  onValueChange={(value) => handleFilterChange('sortOrder', value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">↓</SelectItem>
                    <SelectItem value="asc">↑</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Période */}
            <div className="space-y-2">
              <Label>Période</Label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {startDate ? format(startDate, 'dd/MM', { locale: fr }) : 'Début'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => handleDateChange('start', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {endDate ? format(endDate, 'dd/MM', { locale: fr }) : 'Fin'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => handleDateChange('end', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Filtres actifs */}
          {activeFiltersCount > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>Filtres actifs</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <span>Recherche: {filters.search}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleFilterChange('search', '')}
                      />
                    </Badge>
                  )}
                  {filters.status && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <span>Statut: {statusOptions.find(s => s.value === filters.status)?.label}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleStatusChange('all')}
                      />
                    </Badge>
                  )}
                  {filters.company && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <span>Entreprise: {filters.company}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleFilterChange('company', '')}
                      />
                    </Badge>
                  )}
                  {startDate && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <span>Depuis: {format(startDate, 'dd/MM/yyyy', { locale: fr })}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleDateChange('start', undefined)}
                      />
                    </Badge>
                  )}
                  {endDate && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <span>Jusqu&apos;au: {format(endDate, 'dd/MM/yyyy', { locale: fr })}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleDateChange('end', undefined)}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};