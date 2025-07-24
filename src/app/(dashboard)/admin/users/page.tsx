'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  UserCog,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  useAdminUsers,
  useDeleteUser,
  useToggleUserStatus,
  useChangeUserRole,
  useBulkUserAction,
} from '@/hooks/useAdmin';
import { UserRole, type UserFilters } from '@/types';

const ITEMS_PER_PAGE = 20;

export const AdminUsersPage: React.FC = () => {
  const navigate = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: ITEMS_PER_PAGE,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const { data: usersData, isLoading } = useAdminUsers(filters);
  const deleteUser = useDeleteUser();
  const toggleUserStatus = useToggleUserStatus();
  const changeUserRole = useChangeUserRole();
  const bulkUserAction = useBulkUserAction();

  const users = usersData?.users || [];
  const pagination = usersData?.pagination;

  const handleFiltersChange = (newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleDelete = async () => {
    if (deleteUserId) {
      await deleteUser.mutateAsync(deleteUserId);
      setDeleteUserId(null);
    }
  };

  const handleBulkAction = async () => {
    if (selectedUsers.length > 0 && bulkAction) {
      await bulkUserAction.mutateAsync({
        userIds: selectedUsers,
        action: bulkAction as 'activate' | 'deactivate' | 'delete',
      });
      setSelectedUsers([]);
      setBulkAction('');
      setShowBulkConfirm(false);
    }
  };

  const getRoleLabel = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'Administrateur' : 'Utilisateur';
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'default' : 'secondary';
  };

  const getBulkActionLabel = (action: string) => {
    const labels = {
      activate: 'Activer',
      deactivate: 'Désactiver',
      delete: 'Supprimer',
    };
    return labels[action as keyof typeof labels] || action;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Administration des utilisateurs
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez tous les utilisateurs de la plateforme
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Inviter un utilisateur
          </Button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={filters.search}
                onChange={(e) =>
                  handleFiltersChange({ search: e.target.value })
                }
                className="pl-10"
              />
            </div>

            <Select
              value={filters.role || 'all'}
              onValueChange={(value) =>
                handleFiltersChange({
                  role: value === 'all' ? undefined : (value as UserRole),
                })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value={UserRole.USER}>Utilisateur</SelectItem>
                <SelectItem value={UserRole.ADMIN}>Administrateur</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.isActive?.toString() || 'all'}
              onValueChange={(value) =>
                handleFiltersChange({
                  isActive: value === 'all' ? undefined : value === 'true',
                })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="true">Actifs</SelectItem>
                <SelectItem value="false">Inactifs</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres avancés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions en lot */}
      {selectedUsers.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedUsers.length} utilisateur(s) sélectionné(s)
              </span>
              <div className="flex items-center space-x-2">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activate">Activer</SelectItem>
                    <SelectItem value="deactivate">Désactiver</SelectItem>
                    <SelectItem value="delete">Supprimer</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  disabled={!bulkAction}
                  onClick={() => setShowBulkConfirm(true)}
                >
                  Appliquer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUsers([])}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Utilisateurs</span>
          </CardTitle>
          <CardDescription>
            {pagination && `${pagination.total} utilisateur(s) au total`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-gray-500">
                Aucun utilisateur ne correspond à vos critères de recherche.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* En-tête avec sélection globale */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                />
                <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                  <div className="col-span-4">Utilisateur</div>
                  <div className="col-span-2">Rôle</div>
                  <div className="col-span-2">Statut</div>
                  <div className="col-span-2">Activité</div>
                  <div className="col-span-1">Candidatures</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>

              {/* Liste des utilisateurs */}
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) =>
                      handleSelectUser(user.id, !!checked)
                    }
                  />

                  <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                    {/* Utilisateur */}
                    <div className="col-span-4 flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    {/* Rôle */}
                    <div className="col-span-2">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </div>

                    {/* Statut */}
                    <div className="col-span-2">
                      <Badge
                        variant={user.isActive ? 'default' : 'destructive'}
                      >
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                      {user.emailVerified && (
                        <Badge
                          variant="outline"
                          className="ml-1 text-green-600"
                        >
                          Vérifié
                        </Badge>
                      )}
                    </div>

                    {/* Activité */}
                    <div className="col-span-2 text-sm text-gray-500">
                      <div>
                        Inscrit{' '}
                        {formatDistanceToNow(new Date(user.createdAt), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </div>
                      {user.lastLoginAt && (
                        <div>
                          Connexion{' '}
                          {formatDistanceToNow(new Date(user.lastLoginAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </div>
                      )}
                    </div>

                    {/* Candidatures */}
                    <div className="col-span-1 text-center">
                      <span className="font-medium">
                        {user._count.applications}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate.push(`/admin/users/${user.id}`)
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              changeUserRole.mutate({
                                id: user.id,
                                role:
                                  user.role === UserRole.ADMIN
                                    ? UserRole.USER
                                    : UserRole.ADMIN,
                              })
                            }
                          >
                            <UserCog className="h-4 w-4 mr-2" />
                            {user.role === UserRole.ADMIN
                              ? 'Retirer admin'
                              : 'Promouvoir admin'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toggleUserStatus.mutate({
                                id: user.id,
                                isActive: !user.isActive,
                              })
                            }
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
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteUserId(user.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            showInfo={true}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
          />
        </div>
      )}

      {/* Dialog de confirmation de suppression */}
      <AlertDialog
        open={!!deleteUserId}
        onOpenChange={() => setDeleteUserId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l&apos;utilisateur</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
              est irréversible et supprimera également toutes ses données
              (candidatures, entretiens, documents).
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

      {/* Dialog de confirmation d'action en lot */}
      <AlertDialog open={showBulkConfirm} onOpenChange={setShowBulkConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Action en lot</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir{' '}
              {getBulkActionLabel(bulkAction).toLowerCase()}{' '}
              {selectedUsers.length} utilisateur(s) ?
              {bulkAction === 'delete' && ' Cette action est irréversible.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkAction}
              className={
                bulkAction === 'delete' ? 'bg-red-600 hover:bg-red-700' : ''
              }
              disabled={bulkUserAction.isPending}
            >
              {bulkUserAction.isPending
                ? 'En cours...'
                : getBulkActionLabel(bulkAction)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsersPage;