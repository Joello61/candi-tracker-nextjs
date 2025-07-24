'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import {
  Users,
  UserCheck,
  Shield,
  TrendingUp,
  Activity,
  Search,
  Filter,
  MoreHorizontal,
  UserX,
  UserCog,
  Edit,
  Trash2,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from '@/components/charts/StatsCard';

import {
  useAdminStats,
  useRecentActivity,
  useAdminUsers,
} from '@/hooks/useAdmin';
import { UserRole, type UserFilters } from '@/types';

export const AdminDashboard: React.FC = () => {
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilters, setUserFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: recentActivity, isLoading: activityLoading } =
    useRecentActivity(5);
  const { data: usersData, isLoading: usersLoading } =
    useAdminUsers(userFilters);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setUserFilters((prev) => ({
      ...prev,
      search: query || undefined,
      page: 1,
    }));
  };

  const getRoleLabel = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'Admin' : 'Utilisateur';
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'default' : 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Utilisateurs totaux"
          value={stats?.totalUsers || 0}
          description="Tous les comptes"
          icon={<Users />}
          loading={statsLoading}
        />
        <StatsCard
          title="Utilisateurs actifs"
          value={stats?.activeUsers || 0}
          description="Comptes activés"
          icon={<UserCheck />}
          loading={statsLoading}
        />
        <StatsCard
          title="Administrateurs"
          value={stats?.adminUsers || 0}
          description="Droits admin"
          icon={<Shield />}
          loading={statsLoading}
        />
        <StatsCard
          title="Nouveaux ce mois"
          value={stats?.newUsersThisMonth || 0}
          description="Inscriptions récentes"
          icon={<TrendingUp />}
          loading={statsLoading}
        />
      </div>

      {/* Répartition par rôle */}
      {stats && !statsLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Répartition des utilisateurs</CardTitle>
            <CardDescription>
              Distribution des rôles et activité de connexion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Par rôle */}
              <div>
                <h4 className="font-medium mb-3">Par rôle</h4>
                <div className="space-y-2">
                  {Object.entries(stats.usersByRole).map(([role, count]) => (
                    <div
                      key={role}
                      className="flex justify-between items-center p-2 rounded hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-2">
                        <Badge variant={getRoleBadgeVariant(role as UserRole)}>
                          {getRoleLabel(role as UserRole)}
                        </Badge>
                      </div>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connexions récentes */}
              <div>
                <h4 className="font-medium mb-3">Connexions récentes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                    <span className="text-sm text-gray-600">Aujourd&apos;hui</span>
                    <span className="font-medium">
                      {stats.lastLoginStats.today}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                    <span className="text-sm text-gray-600">Cette semaine</span>
                    <span className="font-medium">
                      {stats.lastLoginStats.thisWeek}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                    <span className="text-sm text-gray-600">Ce mois</span>
                    <span className="font-medium">
                      {stats.lastLoginStats.thisMonth}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Onglets de gestion */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
          <TabsTrigger value="activity">Activité récente</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Barre de recherche et filtres */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom ou email..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                <Button onClick={() => navigate.push('/admin/users')}>
                  Voir tous les utilisateurs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs récents</CardTitle>
              <CardDescription>
                Aperçu des derniers utilisateurs inscrits
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-3 border rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {usersData?.users.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || undefined} />
                          <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{user.name}</span>
                            <Badge variant={getRoleBadgeVariant(user.role)}>
                              {getRoleLabel(user.role)}
                            </Badge>
                            {!user.isActive && (
                              <Badge variant="destructive">Inactif</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email} • {user._count.applications}{' '}
                            candidature(s)
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-gray-500 text-right">
                          <div>
                            Inscrit{' '}
                            {formatDistanceToNow(new Date(user.createdAt), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </div>
                          {user.lastLoginAt && (
                            <div>
                              Dernière connexion{' '}
                              {formatDistanceToNow(new Date(user.lastLoginAt), {
                                addSuffix: true,
                                locale: fr,
                              })}
                            </div>
                          )}
                        </div>

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
                            <DropdownMenuItem>
                              <UserCog className="h-4 w-4 mr-2" />
                              Changer le rôle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Activité récente</span>
              </CardTitle>
              <CardDescription>
                Dernières actions des utilisateurs sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activityLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity?.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-3 border rounded-lg"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {activity.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{activity.name}</span>
                          <span className="text-sm text-gray-500">
                            ({activity.email})
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {activity.applicationsCount} candidature(s) •{' '}
                          {activity.notificationsCount} notification(s)
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 text-right">
                        <div>
                          Inscrit{' '}
                          {formatDistanceToNow(new Date(activity.createdAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </div>
                        {activity.lastLoginAt && (
                          <div>
                            Dernière connexion{' '}
                            {formatDistanceToNow(
                              new Date(activity.lastLoginAt),
                              { addSuffix: true, locale: fr }
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-gray-500">
                      Aucune activité récente
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
