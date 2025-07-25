'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { AdminDashboard } from '@/components/features/AdminDashboard';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const AdminDashboardClient: React.FC = () => {
  const navigate = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  const isAdmin = user?.role === 'ADMIN';

  // Redirection si non authentifié
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate.push('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Redirection si pas admin
  useEffect(() => {
    if (!isLoading && isAuthenticated && !isAdmin) {
      navigate.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);

  // États de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6 space-y-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Vérification des permissions
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertDescription>
                Vous devez être connecté pour accéder à cette page.
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => navigate.push('/login')} className="flex-1">
                Se connecter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate.push('/')}
                className="flex-1"
              >
                Accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Accès refusé. Vous n&apos;avez pas les permissions administrateur requises.
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate.push('/dashboard')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au tableau de bord
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Rendu principal
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b border-gray-200 bg-white">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-indigo-600" />
                  <span>Administration</span>
                </h1>
                <p className="text-gray-600 mt-1">
                  Gestion des utilisateurs et supervision du système
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate.push('/dashboard')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                
                <Button onClick={() => navigate.push('/admin/users')}>
                  Gestion des utilisateurs
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <AdminDashboard />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardClient;