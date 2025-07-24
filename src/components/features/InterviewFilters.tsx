'use client'

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Filter, RotateCcw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { InterviewType } from '@/types';
import { cn } from '@/lib/utils';

type Filters = {
  type: string;
  applicationId: string;
  startDate: string;
  endDate: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  upcoming?: boolean;
  past?: boolean;
  search?: string;
};

interface InterviewFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
  onReset: () => void;
}

const typeOptions = [
  { value: 'all', label: 'Tous les types' },
  { value: InterviewType.PHONE, label: 'Téléphonique' },
  { value: InterviewType.VIDEO, label: 'Visioconférence' },
  { value: InterviewType.ONSITE, label: 'Sur site' },
  { value: InterviewType.TECHNICAL, label: 'Technique' },
  { value: InterviewType.HR, label: 'RH' },
  { value: InterviewType.FINAL, label: 'Final' },
];

const sortOptions = [
  { value: 'scheduledAt', label: 'Date d\'entretien' },
  { value: 'type', label: 'Type' },
  { value: 'createdAt', label: 'Date de création' },
];

export const InterviewFilters: React.FC<InterviewFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const startDate = filters.startDate ? new Date(filters.startDate) : undefined;
  const endDate = filters.endDate ? new Date(filters.endDate) : undefined;

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'page' || key === 'limit' || key === 'sortBy' || key === 'sortOrder') return false;
    return value !== '' && value !== undefined;
  });

  const handleSearch = () => {
    onFiltersChange({ search: searchTerm });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTypeChange = (value: string) => {
    if (value === 'all') {
      onFiltersChange({ type: '' });
    } else {
      onFiltersChange({ type: value });
    }
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4">
          {/* Barre de recherche et bouton filtres */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par candidature, notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                  )}
                </Button>
              </CollapsibleTrigger>
              
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={onReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              )}
            </div>
          </div>
        </div>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type d'entretien */}
              <div className="space-y-2">
                <Label>Type d&apos;entretien</Label>
                <Select
                  value={filters.type || 'all'}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date de début */}
              <div className="space-y-2">
                <Label>Date de début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Date de début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        onFiltersChange({ 
                          startDate: date ? date.toISOString() : '' 
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date de fin */}
              <div className="space-y-2">
                <Label>Date de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Date de fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        onFiltersChange({ 
                          endDate: date ? date.toISOString() : '' 
                        });
                      }}
                      disabled={(date) => startDate ? date < startDate : false}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Tri */}
              <div className="space-y-2">
                <Label>Trier par</Label>
                <div className="flex space-x-2">
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => onFiltersChange({ sortBy: value })}
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
                    value={filters.sortOrder}
                    onValueChange={(value: 'asc' | 'desc') => onFiltersChange({ sortOrder: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">↑ Asc</SelectItem>
                      <SelectItem value="desc">↓ Desc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Filtres rapides */}
            <div className="mt-4 pt-4 border-t">
              <Label className="text-sm font-medium">Filtres rapides</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant={(!filters.upcoming && !filters.past) ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ upcoming: undefined, past: undefined })}
                >
                  Tous les entretiens
                </Button>
                <Button
                  variant={filters.upcoming ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ upcoming: true, past: undefined })}
                >
                  À venir uniquement
                </Button>
                <Button
                  variant={filters.past ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ past: true, upcoming: undefined })}
                >
                  Passés uniquement
                </Button>
              </div>
            </div>

            {/* Raccourcis de dates */}
            <div className="mt-4 pt-4 border-t">
              <Label className="text-sm font-medium">Raccourcis de dates</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    onFiltersChange({
                      startDate: today.toISOString(),
                      endDate: today.toISOString()
                    });
                  }}
                >
                  Aujourd&apos;hui
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const nextWeek = new Date();
                    nextWeek.setDate(today.getDate() + 7);
                    onFiltersChange({
                      startDate: today.toISOString(),
                      endDate: nextWeek.toISOString()
                    });
                  }}
                >
                  7 prochains jours
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const nextMonth = new Date();
                    nextMonth.setMonth(today.getMonth() + 1);
                    onFiltersChange({
                      startDate: today.toISOString(),
                      endDate: nextMonth.toISOString()
                    });
                  }}
                >
                  30 prochains jours
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onFiltersChange({
                      startDate: '',
                      endDate: ''
                    });
                  }}
                >
                  Toutes les dates
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};