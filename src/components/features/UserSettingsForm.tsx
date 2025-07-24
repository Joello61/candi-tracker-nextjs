'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Loader2, RotateCcw } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

import { useUserSettings, useUpdateUserSettings } from '@/hooks/useUsers';

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  dateFormat: z.enum(['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd']).optional(),
  timeFormat: z.enum(['24h', '12h']).optional(),
  sidebarCollapsed: z.boolean().optional(),
  itemsPerPage: z.number().min(5).max(100).optional(),
  defaultApplicationView: z.enum(['list', 'grid', 'cards']).optional(),
  showWelcomeMessage: z.boolean().optional(),
  defaultDashboardTab: z.string().optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const themeOptions = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'system', label: 'Système' },
];

const languageOptions = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

const timezoneOptions = [
  { value: 'Europe/Paris', label: 'Paris (UTC+1)' },
  { value: 'Europe/London', label: 'Londres (UTC+0)' },
  { value: 'America/New_York', label: 'New York (UTC-5)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (UTC-8)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
];

const dateFormatOptions = [
  { value: 'dd/MM/yyyy', label: '31/12/2024 (DD/MM/YYYY)' },
  { value: 'MM/dd/yyyy', label: '12/31/2024 (MM/DD/YYYY)' },
  { value: 'yyyy-MM-dd', label: '2024-12-31 (YYYY-MM-DD)' },
];

const timeFormatOptions = [
  { value: '24h', label: '24 heures (14:30)' },
  { value: '12h', label: '12 heures (2:30 PM)' },
];

const itemsPerPageOptions = [
  { value: 5, label: '5 éléments' },
  { value: 10, label: '10 éléments' },
  { value: 20, label: '20 éléments' },
  { value: 50, label: '50 éléments' },
];

const applicationViewOptions = [
  { value: 'list', label: 'Liste' },
  { value: 'grid', label: 'Grille' },
  { value: 'cards', label: 'Cartes' },
];

const dashboardTabOptions = [
  { value: 'overview', label: "Vue d'ensemble" },
  { value: 'applications', label: 'Candidatures' },
  { value: 'interviews', label: 'Entretiens' },
  { value: 'documents', label: 'Documents' },
];

export const UserSettingsForm: React.FC = () => {
  const { data: settings, isLoading: settingsLoading } = useUserSettings();
  const updateSettings = useUpdateUserSettings();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      theme: (settings?.theme as 'light' | 'dark' | 'system') || 'system',
      language: settings?.language || 'fr',
      timezone: settings?.timezone || 'Europe/Paris',
      dateFormat:
        (settings?.dateFormat as 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd') ||
        'dd/MM/yyyy',
      timeFormat: (settings?.timeFormat as '24h' | '12h') || '24h',
      sidebarCollapsed: settings?.sidebarCollapsed ?? false,
      itemsPerPage: settings?.itemsPerPage ?? 10,
      defaultApplicationView:
        (settings?.defaultApplicationView as 'list' | 'grid' | 'cards') ||
        'list',
      showWelcomeMessage: settings?.showWelcomeMessage ?? true,
      defaultDashboardTab: settings?.defaultDashboardTab || 'overview',
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    // Filtrer les valeurs undefined
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined)
    ) as Partial<SettingsFormData>;

    await updateSettings.mutateAsync(filteredData);
  };

  const handleReset = () => {
    form.reset();
  };

  if (settingsLoading) {
    return (
      <Card>
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
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Apparence */}
      <Card>
        <CardHeader>
          <CardTitle>Apparence</CardTitle>
          <CardDescription>
            Personnalisez l&apos;apparence de l&apos;interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Thème</Label>
              <Select
                value={form.watch('theme')}
                onValueChange={(value) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  form.setValue('theme', value as any, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un thème" />
                </SelectTrigger>
                <SelectContent>
                  {themeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Langue</Label>
              <Select
                value={form.watch('language')}
                onValueChange={(value) =>
                  form.setValue('language', value, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Fuseau horaire</Label>
              <Select
                value={form.watch('timezone')}
                onValueChange={(value) =>
                  form.setValue('timezone', value, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un fuseau" />
                </SelectTrigger>
                <SelectContent>
                  {timezoneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format de date</Label>
              <Select
                value={form.watch('dateFormat')}
                onValueChange={(value) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  form.setValue('dateFormat', value as any, {
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Format de date" />
                </SelectTrigger>
                <SelectContent>
                  {dateFormatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format d&apos;heure</Label>
              <Select
                value={form.watch('timeFormat')}
                onValueChange={(value) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  form.setValue('timeFormat', value as any, {
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Format d'heure" />
                </SelectTrigger>
                <SelectContent>
                  {timeFormatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Interface</CardTitle>
          <CardDescription>
            Configurez le comportement de l&apos;interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Éléments par page</Label>
              <Select
                value={form.watch('itemsPerPage')?.toString()}
                onValueChange={(value) =>
                  form.setValue('itemsPerPage', parseInt(value), {
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nombre d'éléments" />
                </SelectTrigger>
                <SelectContent>
                  {itemsPerPageOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Vue par défaut des candidatures</Label>
              <Select
                value={form.watch('defaultApplicationView')}
                onValueChange={(value) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  form.setValue('defaultApplicationView', value as any, {
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vue par défaut" />
                </SelectTrigger>
                <SelectContent>
                  {applicationViewOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">
                  Sidebar réduite par défaut
                </Label>
                <p className="text-sm text-gray-500">
                  La barre latérale sera réduite au démarrage
                </p>
              </div>
              <Switch
                checked={form.watch('sidebarCollapsed')}
                onCheckedChange={(checked) =>
                  form.setValue('sidebarCollapsed', checked, {
                    shouldDirty: true,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">
                  Afficher le message de bienvenue
                </Label>
                <p className="text-sm text-gray-500">
                  Afficher le message de bienvenue sur le dashboard
                </p>
              </div>
              <Switch
                checked={form.watch('showWelcomeMessage')}
                onCheckedChange={(checked) =>
                  form.setValue('showWelcomeMessage', checked, {
                    shouldDirty: true,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Personnalisez votre tableau de bord</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Onglet par défaut</Label>
            <Select
              value={form.watch('defaultDashboardTab')}
              onValueChange={(value) =>
                form.setValue('defaultDashboardTab', value, {
                  shouldDirty: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Onglet par défaut" />
              </SelectTrigger>
              <SelectContent>
                {dashboardTabOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={!form.formState.isDirty}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>

        <Button
          type="submit"
          disabled={updateSettings.isPending || !form.formState.isDirty}
        >
          {updateSettings.isPending && (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          )}
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les paramètres
        </Button>
      </div>
    </form>
  );
};
