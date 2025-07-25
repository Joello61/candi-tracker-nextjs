'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  Activity,
  FileText,
  Bell,
  Save,
  Loader2,
  Trash2,
  UserCheck,
  UserX,
  Camera,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useAdminUser, useUpdateUser, useDeleteUser, useToggleUserStatus, useChangeUserRole } from '@/hooks/useAdmin';
import { UserRole } from '@/types';

const userUpdateSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50),
  email: z.string().email('Email invalide'),
  role: z.nativeEnum(UserRole),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
});

type UserUpdateFormData = z.infer<typeof userUpdateSchema>;

export const AdminUserDetailsClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  const { data: user, isLoading, error } = useAdminUser(id || '');
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const toggleStatus = useToggleUserStatus();
  const changeRole = useChangeUserRole();

  const form = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema),
    values: user ? {
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
    } : undefined,
  });

  if (!id) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>ID utilisateur manquant</AlertDescription>
        </Alert>
      </div>
    );
  }

  const onSubmit = async (data: UserUpdateFormData) => {
    await updateUser.mutateAsync({ id, data });
  };

  const handleDelete = async () => {
    await deleteUser.mutateAsync(id);
    navigate.push('/admin/users');
  };

  const handleToggleStatus = async () => {
    if (user) {
      await toggleStatus.mutateAsync({ id, isActive: !user.isActive });
    }
  };

  const handleRoleChange = async (newRole: UserRole) => {
    await changeRole.mutateAsync({ id, role: newRole });
  };

  const getRoleLabel = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'Administrateur' : 'Utilisateur';
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'default' : 'secondary';
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
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

  if (error || !user) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement de l&apos;utilisateur ou utilisateur non trouvé.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate.push('/admin/users')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="text-lg">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {getRoleLabel(user.role)}
                </Badge>
                <Badge variant={user.isActive ? "default" : "destructive"}>
                  {user.isActive ? 'Actif' : 'Inactif'}
                </Badge>
                {user.emailVerified && (
                  <Badge variant="outline" className="text-green-600">
                    Email vérifié
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleToggleStatus}
            disabled={toggleStatus.isPending}
          >
            {user.isActive ? (
              <>
                <UserX className="h-4 w-4 mr-2" />
                Désactiver
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Activer
              </>
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer l&apos;utilisateur</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer {user.name} ? Cette action est irréversible
                  et supprimera également toutes ses données.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={deleteUser.isPending}
                >
                  {deleteUser.isPending ? 'Suppression...' : 'Supprimer'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Candidatures</p>
                <p className="text-2xl font-bold">{user._count.applications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Notifications</p>
                <p className="text-2xl font-bold">{user._count.notifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Membre depuis</p>
                <p className="text-sm font-bold">
                  {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true, locale: fr })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Dernière connexion</p>
                <p className="text-sm font-bold">
                  {user.lastLoginAt 
                    ? formatDistanceToNow(new Date(user.lastLoginAt), { addSuffix: true, locale: fr })
                    : 'Jamais'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informations personnelles</span>
              </CardTitle>
              <CardDescription>
                Modifiez les informations de base de l&apos;utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      className={form.formState.errors.name ? 'border-red-500' : ''}
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      className={form.formState.errors.email ? 'border-red-500' : ''}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Rôle</Label>
                    <Select
                      value={form.watch('role')}
                      onValueChange={(value) => {
                        form.setValue('role', value as UserRole, { shouldDirty: true });
                        handleRoleChange(value as UserRole);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.USER}>Utilisateur</SelectItem>
                        <SelectItem value={UserRole.ADMIN}>Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Compte actif</Label>
                        <p className="text-sm text-gray-500">
                          L&apos;utilisateur peut se connecter et utiliser l&apos;application
                        </p>
                      </div>
                      <Switch
                        checked={form.watch('isActive')}
                        onCheckedChange={(checked) => {
                          form.setValue('isActive', checked, { shouldDirty: true });
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email vérifié</Label>
                        <p className="text-sm text-gray-500">
                          L&apos;adresse email a été vérifiée
                        </p>
                      </div>
                      <Switch
                        checked={form.watch('emailVerified')}
                        onCheckedChange={(checked) => {
                          form.setValue('emailVerified', checked, { shouldDirty: true });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updateUser.isPending || !form.formState.isDirty}
                  >
                    {updateUser.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Avatar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Photo de profil</span>
              </CardTitle>
              <CardDescription>
                Gérez l&apos;avatar de l&apos;utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar || undefined} />
                  <AvatarFallback className="text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    L&apos;utilisateur peut gérer son avatar depuis ses paramètres.
                  </p>
                  {user.avatar && (
                    <p className="text-xs text-gray-500">
                      Avatar actuel: {user.avatar}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique d&apos;activité</CardTitle>
              <CardDescription>
                Aperçu de l&apos;activité de l&apos;utilisateur sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Inscription</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleString('fr-FR')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Il y a {formatDistanceToNow(new Date(user.createdAt), { locale: fr })}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Dernière connexion</h4>
                  {user.lastLoginAt ? (
                    <>
                      <p className="text-sm text-gray-600">
                        {new Date(user.lastLoginAt).toLocaleString('fr-FR')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Il y a {formatDistanceToNow(new Date(user.lastLoginAt), { locale: fr })}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Aucune connexion enregistrée</p>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Candidatures</h4>
                  <p className="text-2xl font-bold text-blue-600">{user._count.applications}</p>
                  <p className="text-xs text-gray-500 mt-1">Total des candidatures créées</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Notifications</h4>
                  <p className="text-2xl font-bold text-green-600">{user._count.notifications}</p>
                  <p className="text-xs text-gray-500 mt-1">Total des notifications reçues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Sécurité du compte</span>
              </CardTitle>
              <CardDescription>
                Informations et actions de sécurité pour ce compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Statut du compte</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Actif:</span>
                      <Badge variant={user.isActive ? "default" : "destructive"}>
                        {user.isActive ? 'Oui' : 'Non'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email vérifié:</span>
                      <Badge variant={user.emailVerified ? "default" : "secondary"}>
                        {user.emailVerified ? 'Oui' : 'Non'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Rôle et permissions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rôle:</span>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {user.role === UserRole.ADMIN 
                        ? 'Accès complet à l\'administration' 
                        : 'Accès utilisateur standard'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Actions de sécurité</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Réinitialiser le mot de passe</h5>
                    <p className="text-sm text-gray-600 mb-3">
                      Envoyez un email de réinitialisation à l&apos;utilisateur
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer le lien (À implémenter)
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Sessions actives</h5>
                    <p className="text-sm text-gray-600 mb-3">
                      Gérer les sessions de connexion actives
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      <Activity className="h-4 w-4 mr-2" />
                      Voir les sessions (À implémenter)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUserDetailsClient;