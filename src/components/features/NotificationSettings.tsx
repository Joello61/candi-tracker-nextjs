'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, Mail, MessageSquare, Bell, Clock } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useNotificationSettings, useUpdateNotificationSettings } from '@/hooks/useNotifications';

const settingsSchema = z.object({
  emailEnabled: z.boolean(),
  smsEnabled: z.boolean(),
  pushEnabled: z.boolean(),
  interviewReminders: z.boolean(),
  applicationFollowUps: z.boolean(),
  weeklyReports: z.boolean(),
  deadlineAlerts: z.boolean(),
  statusUpdates: z.boolean(),
  reminderTiming1: z.number().min(1).max(10080), // 1 minute à 1 semaine
  reminderTiming2: z.number().min(1).max(10080),
  reminderTiming3: z.number().min(1).max(10080),
  phoneNumber: z.string().optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const timingOptions = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 heure' },
  { value: 120, label: '2 heures' },
  { value: 360, label: '6 heures' },
  { value: 720, label: '12 heures' },
  { value: 1440, label: '24 heures' },
  { value: 2880, label: '2 jours' },
  { value: 10080, label: '1 semaine' },
];

export const NotificationSettings: React.FC = () => {
  const { data: settings, isLoading, error } = useNotificationSettings();
  const updateSettings = useUpdateNotificationSettings();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    values: settings ? {
      emailEnabled: settings.emailEnabled,
      smsEnabled: settings.smsEnabled,
      pushEnabled: settings.pushEnabled,
      interviewReminders: settings.interviewReminders,
      applicationFollowUps: settings.applicationFollowUps,
      weeklyReports: settings.weeklyReports,
      deadlineAlerts: settings.deadlineAlerts,
      statusUpdates: settings.statusUpdates,
      reminderTiming1: settings.reminderTiming1,
      reminderTiming2: settings.reminderTiming2,
      reminderTiming3: settings.reminderTiming3,
      phoneNumber: settings.phoneNumber || '',
    } : undefined,
  });

  const smsEnabled = watch('smsEnabled');

  const onSubmit = async (data: SettingsFormData) => {
    await updateSettings.mutateAsync(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Erreur lors du chargement des paramètres. Veuillez réessayer.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Canaux de notification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Canaux de notification</span>
          </CardTitle>
          <CardDescription>
            Choisissez comment vous souhaitez recevoir vos notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <Label className="text-base font-medium">Email</Label>
                <p className="text-sm text-gray-500">
                  Recevoir les notifications par email
                </p>
              </div>
            </div>
            <Switch
              checked={watch('emailEnabled')}
              onCheckedChange={(checked) => setValue('emailEnabled', checked)}
            />
          </div>

          <Separator />

          {/* SMS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <Label className="text-base font-medium">SMS</Label>
                  <p className="text-sm text-gray-500">
                    Recevoir les notifications urgentes par SMS
                  </p>
                </div>
              </div>
              <Switch
                checked={watch('smsEnabled')}
                onCheckedChange={(checked) => setValue('smsEnabled', checked)}
              />
            </div>

            {smsEnabled && (
              <div className="ml-8 space-y-2">
                <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                <Input
                  id="phoneNumber"
                  {...register('phoneNumber')}
                  placeholder="+33 6 12 34 56 78"
                  className={errors.phoneNumber ? 'border-red-500' : ''}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Push */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-purple-600" />
              <div>
                <Label className="text-base font-medium">Notifications push</Label>
                <p className="text-sm text-gray-500">
                  Recevoir les notifications dans l&apos;application
                </p>
              </div>
            </div>
            <Switch
              checked={watch('pushEnabled')}
              onCheckedChange={(checked) => setValue('pushEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Types de notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Types de notifications</CardTitle>
          <CardDescription>
            Activez ou désactivez des types spécifiques de notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Rappels d&apos;entretiens</Label>
                <p className="text-sm text-gray-500">
                  Notifications avant vos entretiens
                </p>
              </div>
              <Switch
                checked={watch('interviewReminders')}
                onCheckedChange={(checked) => setValue('interviewReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Suivi de candidatures</Label>
                <p className="text-sm text-gray-500">
                  Rappels pour relancer vos candidatures
                </p>
              </div>
              <Switch
                checked={watch('applicationFollowUps')}
                onCheckedChange={(checked) => setValue('applicationFollowUps', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Alertes d&apos;échéances</Label>
                <p className="text-sm text-gray-500">
                  Notifications pour les deadlines
                </p>
              </div>
              <Switch
                checked={watch('deadlineAlerts')}
                onCheckedChange={(checked) => setValue('deadlineAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Mises à jour de statut</Label>
                <p className="text-sm text-gray-500">
                  Changements dans vos candidatures
                </p>
              </div>
              <Switch
                checked={watch('statusUpdates')}
                onCheckedChange={(checked) => setValue('statusUpdates', checked)}
              />
            </div>

            <div className="flex items-center justify-between md:col-span-2">
              <div>
                <Label className="font-medium">Rapports hebdomadaires</Label>
                <p className="text-sm text-gray-500">
                  Résumé de votre activité chaque semaine
                </p>
              </div>
              <Switch
                checked={watch('weeklyReports')}
                onCheckedChange={(checked) => setValue('weeklyReports', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timing des rappels d'entretiens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Timing des rappels d&apos;entretiens</span>
          </CardTitle>
          <CardDescription>
            Configurez quand recevoir les rappels avant vos entretiens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Premier rappel</Label>
              <Select
                value={watch('reminderTiming1')?.toString()}
                onValueChange={(value) => setValue('reminderTiming1', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Deuxième rappel</Label>
              <Select
                value={watch('reminderTiming2')?.toString()}
                onValueChange={(value) => setValue('reminderTiming2', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Troisième rappel</Label>
              <Select
                value={watch('reminderTiming3')?.toString()}
                onValueChange={(value) => setValue('reminderTiming3', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-2">
        <Button
          type="submit"
          disabled={updateSettings.isPending || !isDirty}
        >
          {updateSettings.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Enregistrer les paramètres
        </Button>
      </div>
    </form>
  );
};