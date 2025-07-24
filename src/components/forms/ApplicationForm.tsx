'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ApplicationStatus, type ApplicationForm as ApplicationFormType } from '@/types';
import { applicationSchema, type ApplicationFormData } from '@/utils/applicationSchemas';
import { cn } from '@/lib/utils';

interface ApplicationFormProps {
  initialData?: Partial<ApplicationFormType>;
  onSubmit: (data: ApplicationFormType) => Promise<void>;
  loading?: boolean;
  submitLabel?: string;
}

const statusOptions = [
  { value: ApplicationStatus.APPLIED, label: 'Envoyée' },
  { value: ApplicationStatus.UNDER_REVIEW, label: 'En cours d\'examen' },
  { value: ApplicationStatus.INTERVIEW_SCHEDULED, label: 'Entretien programmé' },
  { value: ApplicationStatus.INTERVIEWED, label: 'Entretien passé' },
  { value: ApplicationStatus.OFFER_RECEIVED, label: 'Offre reçue' },
  { value: ApplicationStatus.ACCEPTED, label: 'Acceptée' },
  { value: ApplicationStatus.REJECTED, label: 'Refusée' },
  { value: ApplicationStatus.WITHDRAWN, label: 'Retirée' },
];

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = 'Enregistrer',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: initialData?.company || '',
      position: initialData?.position || '',
      status: initialData?.status || ApplicationStatus.APPLIED,
      appliedAt: initialData?.appliedAt || new Date().toISOString(),
      notes: initialData?.notes || '',
      salary: initialData?.salary || '',
      location: initialData?.location || '',
      jobUrl: initialData?.jobUrl || '',
      contactName: initialData?.contactName || '',
      contactEmail: initialData?.contactEmail || '',
    },
  });

  const appliedAt = watch('appliedAt');
  const selectedDate = appliedAt ? new Date(appliedAt) : undefined;

  const onFormSubmit = async (data: ApplicationFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Informations principales */}
      <Card>
        <CardHeader>
          <CardTitle>Informations principales</CardTitle>
          <CardDescription>
            Détails de base sur la candidature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Entreprise */}
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise *</Label>
              <Input
                id="company"
                {...register('company')}
                placeholder="Nom de l'entreprise"
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && (
                <p className="text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

            {/* Poste */}
            <div className="space-y-2">
              <Label htmlFor="position">Poste *</Label>
              <Input
                id="position"
                {...register('position')}
                placeholder="Intitulé du poste"
                className={errors.position ? 'border-red-500' : ''}
              />
              {errors.position && (
                <p className="text-sm text-red-500">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Statut */}
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select
                value={watch('status')}
                onValueChange={(value) => setValue('status', value as ApplicationStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date de candidature */}
            <div className="space-y-2">
              <Label>Date de candidature</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setValue('appliedAt', date.toISOString());
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Détails supplémentaires */}
      <Card>
        <CardHeader>
          <CardTitle>Détails supplémentaires</CardTitle>
          <CardDescription>
            Informations complémentaires sur la candidature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Localisation */}
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="Ville, région, télétravail..."
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>

            {/* Salaire */}
            <div className="space-y-2">
              <Label htmlFor="salary">Salaire</Label>
              <Input
                id="salary"
                {...register('salary')}
                placeholder="ex: 45-55k€, 3000€/mois..."
                className={errors.salary ? 'border-red-500' : ''}
              />
              {errors.salary && (
                <p className="text-sm text-red-500">{errors.salary.message}</p>
              )}
            </div>
          </div>

          {/* URL de l'offre */}
          <div className="space-y-2">
            <Label htmlFor="jobUrl">URL de l&apos;offre</Label>
            <Input
              id="jobUrl"
              type="url"
              {...register('jobUrl')}
              placeholder="https://..."
              className={errors.jobUrl ? 'border-red-500' : ''}
            />
            {errors.jobUrl && (
              <p className="text-sm text-red-500">{errors.jobUrl.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact */}
            <div className="space-y-2">
              <Label htmlFor="contactName">Nom du contact</Label>
              <Input
                id="contactName"
                {...register('contactName')}
                placeholder="Nom du recruteur ou RH"
                className={errors.contactName ? 'border-red-500' : ''}
              />
              {errors.contactName && (
                <p className="text-sm text-red-500">{errors.contactName.message}</p>
              )}
            </div>

            {/* Email contact */}
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email du contact</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
                placeholder="email@entreprise.com"
                className={errors.contactEmail ? 'border-red-500' : ''}
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Notes personnelles, points importants, prochaines étapes..."
              rows={4}
              className={errors.notes ? 'border-red-500' : ''}
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline">
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};