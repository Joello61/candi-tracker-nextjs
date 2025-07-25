'use client';

import { useState } from 'react';
import { User, Settings, Bell, Shield, Users } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { ProfileSettings } from '@/components/features/ProfileSettings';
import { UserSettingsForm } from '@/components/features/UserSettingsForm';
import { NotificationSettings } from '@/components/features/NotificationSettings';
import { SecuritySettings } from '@/components/features/SecuritySettings'; // 🆕 NOUVEAU IMPORT
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { AdminDashboard } from '@/components/features/AdminDashboard';

export const SettingsClient: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Paramètres
        </h1>
        <p className="text-gray-600 mt-1">
          Gérez votre profil, vos préférences et vos paramètres de compte
        </p>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
    <TabsTrigger value="profile" className="flex items-center space-x-2 cursor-pointer">
      <User className="h-4 w-4" />
      <span className="hidden sm:inline">Profil</span>
    </TabsTrigger>
    <TabsTrigger value="preferences" className="flex items-center space-x-2 cursor-pointer">
      <Settings className="h-4 w-4" />
      <span className="hidden sm:inline">Préférences</span>
    </TabsTrigger>
    <TabsTrigger value="notifications" className="flex items-center space-x-2 cursor-pointer">
      <Bell className="h-4 w-4" />
      <span className="hidden sm:inline">Notifications</span>
    </TabsTrigger>
    <TabsTrigger value="security" className="flex items-center space-x-2 cursor-pointer">
      <Shield className="h-4 w-4" />
      <span className="hidden sm:inline">Sécurité</span>
    </TabsTrigger>
    {isAdmin && (
      <TabsTrigger value="admin" className="flex items-center space-x-2 cursor-pointer">
        <Users className="h-4 w-4" />
        <span className="hidden sm:inline">Administration</span>
      </TabsTrigger>
    )}
  </TabsList>

  {/* Contenu des onglets */}
  <TabsContent value="profile" className="space-y-6">
    <ProfileSettings />
  </TabsContent>

  <TabsContent value="preferences" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Préférences d&apos;interface</CardTitle>
        <CardDescription>
          Personnalisez votre expérience utilisateur
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserSettingsForm />
      </CardContent>
    </Card>
  </TabsContent>

  <TabsContent value="notifications" className="space-y-6">
    <NotificationSettings />
  </TabsContent>

  {/* 🆕 NOUVEL ONGLET SÉCURITÉ AVEC COMPOSANT 2FA */}
  <TabsContent value="security" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Sécurité du compte</CardTitle>
        <CardDescription>
          Gérez la sécurité de votre compte et l&apos;authentification à deux facteurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SecuritySettings />
      </CardContent>
    </Card>
  </TabsContent>

  {isAdmin && (
    <TabsContent value="admin" className="space-y-6">
      <AdminDashboard />
    </TabsContent>
  )}
</Tabs>
    </div>
  );
};

export default SettingsClient;