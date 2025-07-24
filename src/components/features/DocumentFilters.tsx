'use client'

import { useState } from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { DocumentType } from '@/types';

type DocumentFilters = {
  type: string;
  applicationId: string;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

interface DocumentFiltersProps {
  filters: DocumentFilters;
  onFiltersChange: (filters: Partial<DocumentFilters>) => void;
  onReset: () => void;
  applications?: Array<{ id: string; company: string; position: string }>;
}

const typeOptions = [
  { value: 'all', label: 'Tous les types' },
  { value: DocumentType.CV, label: 'CV' },
  { value: DocumentType.COVER_LETTER, label: 'Lettre de motivation' },
  { value: DocumentType.PORTFOLIO, label: 'Portfolio' },
  { value: DocumentType.CERTIFICATE, label: 'Certificat' },
  { value: DocumentType.OTHER, label: 'Autre' },
];

const sortOptions = [
  { value: 'name', label: 'Nom' },
  { value: 'type', label: 'Type' },
  { value: 'createdAt', label: 'Date de création' },
  { value: 'size', label: 'Taille' },
];

export const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
  applications = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

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
    onFiltersChange({ type: value === 'all' ? '' : value });
  };

  const handleApplicationChange = (value: string) => {
    onFiltersChange({ applicationId: value === 'all' ? '' : value });
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
                  placeholder="Rechercher par nom, candidature..."
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
              {/* Type de document */}
              <div className="space-y-2">
                <Label>Type de document</Label>
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

              {/* Candidature */}
              <div className="space-y-2">
                <Label>Candidature</Label>
                <Select
                  value={filters.applicationId || 'all'}
                  onValueChange={handleApplicationChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les candidatures" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les candidatures</SelectItem>
                    {applications.map((app) => (
                      <SelectItem key={app.id} value={app.id}>
                        {app.position} - {app.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              {/* Espace libre pour une 4ème colonne si nécessaire */}
              <div></div>
            </div>

            {/* Filtres rapides */}
            <div className="mt-4 pt-4 border-t">
              <Label className="text-sm font-medium">Filtres rapides</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant={filters.type === DocumentType.CV ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ type: filters.type === DocumentType.CV ? '' : DocumentType.CV })}
                >
                  CV
                </Button>
                <Button
                  variant={filters.type === DocumentType.COVER_LETTER ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ type: filters.type === DocumentType.COVER_LETTER ? '' : DocumentType.COVER_LETTER })}
                >
                  Lettres de motivation
                </Button>
                <Button
                  variant={filters.type === DocumentType.PORTFOLIO ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ type: filters.type === DocumentType.PORTFOLIO ? '' : DocumentType.PORTFOLIO })}
                >
                  Portfolios
                </Button>
                <Button
                  variant={filters.type === DocumentType.CERTIFICATE ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ type: filters.type === DocumentType.CERTIFICATE ? '' : DocumentType.CERTIFICATE })}
                >
                  Certificats
                </Button>
              </div>
            </div>

            {/* Raccourcis de tri */}
            <div className="mt-4 pt-4 border-t">
              <Label className="text-sm font-medium">Tri rapide</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFiltersChange({ sortBy: 'createdAt', sortOrder: 'desc' })}
                >
                  Plus récents
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFiltersChange({ sortBy: 'name', sortOrder: 'asc' })}
                >
                  Par nom A-Z
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFiltersChange({ sortBy: 'size', sortOrder: 'desc' })}
                >
                  Plus volumineux
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFiltersChange({ sortBy: 'type', sortOrder: 'asc' })}
                >
                  Par type
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};