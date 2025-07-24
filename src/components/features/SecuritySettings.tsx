'use client'

import React, { useState } from 'react';
import { Shield, Smartphone, Mail, Check, X, Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

import userService from '@/services/userService';
import type { UserSecuritySettings } from '@/types/auth';
import { GoogleIcon, LinkedInIcon } from '../auth/OAuthButtons';

export const SecuritySettings: React.FC = () => {
  const [isToggling2FA, setIsToggling2FA] = useState(false);
  const queryClient = useQueryClient();

  // Récupérer les paramètres de sécurité
  const {
    data: securitySettings,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user', 'security'],
    queryFn: () => userService.getSecuritySettings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation pour basculer la 2FA
  const toggle2FAMutation = useMutation({
    mutationFn: (enabled: boolean) => userService.toggle2FA({ enabled }),
    onSuccess: (data) => {
      // Mettre à jour le cache
      queryClient.setQueryData(['user', 'security'], (old: UserSecuritySettings | undefined) => {
        if (!old) return old;
        return { ...old, enabled2FA: data.enabled2FA };
      });
      
      toast.success(
        data.enabled2FA 
          ? 'Authentification à deux facteurs activée avec succès !' 
          : 'Authentification à deux facteurs désactivée avec succès !'
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.error || 'Erreur lors de la modification des paramètres 2FA');
    },
    onSettled: () => {
      setIsToggling2FA(false);
    }
  });

  // Handlers
  const handle2FAToggle = async (enabled: boolean) => {
    setIsToggling2FA(true);
    toggle2FAMutation.mutate(enabled);
  };

  // Utilitaires
  const getLastLoginText = () => {
    if (!securitySettings?.lastLoginAt) return 'Jamais connecté';
    
    const lastLogin = new Date(securitySettings.lastLoginAt);
    const now = new Date();
    const diffMs = now.getTime() - lastLogin.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Aujourd'hui";
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return lastLogin.toLocaleDateString('fr-FR');
    }
  };

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sécurité du compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sécurité du compte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              Erreur lors du chargement des paramètres de sécurité
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!securitySettings) return null;

  return (
    <div className="space-y-6">
      {/* Authentification à deux facteurs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Authentification à deux facteurs (2FA)
              </CardTitle>
              <CardDescription>
                Ajoutez une couche de sécurité supplémentaire à votre compte
              </CardDescription>
            </div>
            {securitySettings.enabled2FA ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Check className="h-3 w-3 mr-1" />
                Activée
              </Badge>
            ) : (
              <Badge variant="outline">
                <X className="h-3 w-3 mr-1" />
                Désactivée
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Vérification par email</p>
                <p className="text-sm text-gray-600">
                  Recevez un code de sécurité par email lors de la connexion
                </p>
              </div>
            </div>
            <Switch
              checked={securitySettings.enabled2FA}
              onCheckedChange={handle2FAToggle}
              disabled={isToggling2FA || toggle2FAMutation.isPending}
            />
          </div>

          {securitySettings.enabled2FA && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                La 2FA est activée. Vous recevrez un code de vérification par email 
                à chaque connexion pour sécuriser votre compte.
              </AlertDescription>
            </Alert>
          )}

          {isToggling2FA && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Mise à jour des paramètres de sécurité...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Méthodes de connexion */}
      <Card>
        <CardHeader>
          <CardTitle>Méthodes de connexion</CardTitle>
          <CardDescription>
            Gérez les différentes façons de vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
  {/* Mot de passe */}
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <Lock className="h-4 w-4 text-gray-600" />
      </div>
      <div>
        <p className="font-medium">Mot de passe</p>
        <p className="text-sm text-gray-600">
          Connexion traditionnelle avec email et mot de passe
        </p>
      </div>
    </div>
    {securitySettings.hasPassword ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        <Check className="h-3 w-3 mr-1" />
        Configuré
      </Badge>
    ) : (
      <Badge variant="outline">
        Non configuré
      </Badge>
    )}
  </div>

  {/* Google */}
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <GoogleIcon />
      </div>
      <div>
        <p className="font-medium">Google</p>
        <p className="text-sm text-gray-600">
          Connexion avec votre compte Google
        </p>
      </div>
    </div>
    {securitySettings.linkedAccounts?.google ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        <Check className="h-3 w-3 mr-1" />
        Lié
      </Badge>
    ) : (
      <Badge variant="outline">
        Non lié
      </Badge>
    )}
  </div>

  {/* LinkedIn */}
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <LinkedInIcon />
      </div>
      <div>
        <p className="font-medium">LinkedIn</p>
        <p className="text-sm text-gray-600">
          Connexion avec votre compte LinkedIn
        </p>
      </div>
    </div>
    {securitySettings.linkedAccounts?.linkedin ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        <Check className="h-3 w-3 mr-1" />
        Lié
      </Badge>
    ) : (
      <Badge variant="outline">
        Non lié
      </Badge>
    )}
  </div>
</CardContent>
      </Card>

      {/* Informations de sécurité */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de sécurité</CardTitle>
          <CardDescription>
            État actuel de la sécurité de votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Statut email */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Vérification email</span>
              </div>
              {securitySettings.emailVerified ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Email vérifié</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-orange-600">
                  <X className="h-4 w-4" />
                  <span className="text-sm">Email non vérifié</span>
                </div>
              )}
            </div>

            {/* Dernière connexion */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-4 w-4" />
                <span className="font-medium">Dernière connexion</span>
              </div>
              <p className="text-sm text-gray-600">
                {getLastLoginText()}
              </p>
            </div>
          </div>

          {/* Score de sécurité */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Score de sécurité</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Mot de passe configuré</span>
                {securitySettings.hasPassword ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Email vérifié</span>
                {securitySettings.emailVerified ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>2FA activée</span>
                {securitySettings.enabled2FA ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Compte social lié</span>
                {(securitySettings.linkedAccounts?.google || securitySettings.linkedAccounts?.linkedin) ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommandations de sécurité */}
      {(!securitySettings.enabled2FA || !securitySettings.emailVerified) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Recommandations de sécurité</CardTitle>
            <CardDescription>
              Améliorez la sécurité de votre compte en suivant ces recommandations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!securitySettings.emailVerified && (
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  <strong>Vérifiez votre email :</strong> Un email vérifié est essentiel pour 
                  la récupération de compte et les notifications de sécurité.
                </AlertDescription>
              </Alert>
            )}
            
            {!securitySettings.enabled2FA && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Activez la 2FA :</strong> L&apos;authentification à deux facteurs 
                  réduit considérablement les risques de piratage de votre compte.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};