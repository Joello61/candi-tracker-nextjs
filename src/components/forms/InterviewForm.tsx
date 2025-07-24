'use client'

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  InterviewType,
  type InterviewForm as InterviewFormType,
} from '@/types';
import {
  interviewSchema,
  type InterviewFormData,
} from '@/utils/interviewSchemas';
import { cn } from '@/lib/utils';

interface InterviewFormProps {
  initialData?: Partial<InterviewFormType>;
  onSubmit: (data: InterviewFormType) => Promise<void>;
  loading?: boolean;
  submitLabel?: string;
  applications?: Array<{ id: string; company: string; position: string }>;
}

const typeOptions = [
  { value: InterviewType.PHONE, label: 'Téléphonique' },
  { value: InterviewType.VIDEO, label: 'Visioconférence' },
  { value: InterviewType.ONSITE, label: 'Sur site' },
  { value: InterviewType.TECHNICAL, label: 'Technique' },
  { value: InterviewType.HR, label: 'RH' },
  { value: InterviewType.FINAL, label: 'Final' },
];

const durationOptions = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 heure' },
  { value: 90, label: '1h 30min' },
  { value: 120, label: '2 heures' },
  { value: 180, label: '3 heures' },
  { value: 240, label: '4 heures' },
];

export const InterviewForm: React.FC<InterviewFormProps> = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = 'Enregistrer',
  applications = [],
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<InterviewFormData>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      applicationId: initialData?.applicationId || '',
      type: initialData?.type || InterviewType.PHONE,
      scheduledAt: initialData?.scheduledAt || '',
      duration: initialData?.duration || 60,
      notes: initialData?.notes || '',
      feedback: initialData?.feedback || '',
      interviewers:
        initialData?.interviewers && initialData.interviewers.length > 0
          ? initialData.interviewers
          : [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: control as any, // Temporaire
    name: 'interviewers',
  });

  const scheduledAt = watch('scheduledAt');
  const selectedDate = scheduledAt ? new Date(scheduledAt) : undefined;

  const onFormSubmit = async (data: InterviewFormData) => {
    // Filtrer les intervieweurs vides
    const cleanedData = {
      ...data,
      interviewers: data.interviewers.filter((name) => name.trim() !== ''),
    };
    await onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Informations principales */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de l&apos;entretien</CardTitle>
          <CardDescription>Détails de base sur l&apos;entretien</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Candidature associée */}
            <div className="space-y-2">
              <Label>Candidature *</Label>
              <Select
                value={watch('applicationId')}
                onValueChange={(value) => setValue('applicationId', value)}
              >
                <SelectTrigger
                  className={errors.applicationId ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Sélectionner une candidature" />
                </SelectTrigger>
                <SelectContent>
                  {applications.map((app) => (
                    <SelectItem key={app.id} value={app.id}>
                      {app.position} - {app.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.applicationId && (
                <p className="text-sm text-red-500">
                  {errors.applicationId.message}
                </p>
              )}
            </div>

            {/* Type d'entretien */}
            <div className="space-y-2">
              <Label>Type d&apos;entretien *</Label>
              <Select
                value={watch('type')}
                onValueChange={(value) =>
                  setValue('type', value as InterviewType)
                }
              >
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date et heure */}
            <div className="space-y-2">
              <Label>Date et heure *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !selectedDate && 'text-muted-foreground',
                      errors.scheduledAt && 'border-red-500'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(selectedDate, "dd/MM/yyyy 'à' HH:mm")
                      : 'Sélectionner date et heure'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        // Garder l'heure existante ou définir 14:00 par défaut
                        const existingTime = selectedDate
                          ? {
                              hours: selectedDate.getHours(),
                              minutes: selectedDate.getMinutes(),
                            }
                          : { hours: 14, minutes: 0 };

                        date.setHours(existingTime.hours, existingTime.minutes);
                        setValue('scheduledAt', date.toISOString());
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                  <div className="p-3 border-t">
                    <Label>Heure</Label>
                    <Input
                      type="time"
                      value={
                        selectedDate ? format(selectedDate, 'HH:mm') : '14:00'
                      }
                      onChange={(e) => {
                        if (selectedDate) {
                          const [hours, minutes] = e.target.value.split(':');
                          const newDate = new Date(selectedDate);
                          newDate.setHours(parseInt(hours), parseInt(minutes));
                          setValue('scheduledAt', newDate.toISOString());
                        } else {
                          // Si pas de date sélectionnée, créer une nouvelle date pour aujourd'hui
                          const [hours, minutes] = e.target.value.split(':');
                          const newDate = new Date();
                          newDate.setHours(parseInt(hours), parseInt(minutes));
                          setValue('scheduledAt', newDate.toISOString());
                        }
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              {errors.scheduledAt && (
                <p className="text-sm text-red-500">
                  {errors.scheduledAt.message}
                </p>
              )}
            </div>

            {/* Durée */}
            <div className="space-y-2">
              <Label>Durée estimée</Label>
              <Select
                value={watch('duration')?.toString()}
                onValueChange={(value) => setValue('duration', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une durée" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intervieweurs */}
      <Card>
        <CardHeader>
          <CardTitle>Intervieweurs</CardTitle>
          <CardDescription>
            Personnes qui participeront à l&apos;entretien
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  {...register(`interviewers.${index}`)}
                  placeholder="Nom de l'intervieweur"
                  className={
                    errors.interviewers?.[index] ? 'border-red-500' : ''
                  }
                />
                {errors.interviewers?.[index] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.interviewers[index]?.message}
                  </p>
                )}
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append('')}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un intervieweur
          </Button>

          {errors.interviewers &&
            typeof errors.interviewers.message === 'string' && (
              <p className="text-sm text-red-500">
                {errors.interviewers.message}
              </p>
            )}
        </CardContent>
      </Card>

      {/* Notes et feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Notes et feedback</CardTitle>
          <CardDescription>
            Informations complémentaires sur l&apos;entretien
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes de préparation</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Points à aborder, questions à poser, préparation..."
              rows={3}
              className={errors.notes ? 'border-red-500' : ''}
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback post-entretien</Label>
            <Textarea
              id="feedback"
              {...register('feedback')}
              placeholder="Impressions, points positifs/négatifs, prochaines étapes..."
              rows={4}
              className={errors.feedback ? 'border-red-500' : ''}
            />
            {errors.feedback && (
              <p className="text-sm text-red-500">{errors.feedback.message}</p>
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
