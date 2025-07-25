'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Metadata } from 'next';

export const errorMetadata: Metadata = {
  title: 'Erreur - Une erreur s\'est produite',
  description: 'Une erreur inattendue s\'est produite sur Candi Tracker. Notre équipe technique a été informée et travaille à résoudre le problème rapidement.',
  keywords: [
    'erreur',
    'problème technique',
    'error page',
    'incident',
    'maintenance',
    'problème serveur'
  ],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Erreur technique | Candi Tracker',
    description: 'Une erreur temporaire empêche l\'accès à cette page. Nous travaillons à la résoudre.',
    images: [{ url: '/og-error.jpg', width: 1200, height: 630 }],
  }
}

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const navigate = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oups ! Une erreur est survenue
          </h1>
          <p className="text-gray-600 mb-4">
            {error?.message || 'Une erreur inattendue s\'est produite'}
          </p>
          {process.env.NODE_ENV === 'development' && error?.stack && (
            <details className="text-left bg-gray-100 p-4 rounded text-sm text-gray-700 mb-4">
              <summary className="cursor-pointer font-medium">
                Détails techniques
              </summary>
              <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
            </details>
          )}
        </div>
        
        <div className="space-x-4">
          <Button 
            onClick={reset}
            variant="outline"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Recharger
          </Button>
          <Button 
            onClick={() => navigate.push('/dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Button>
        </div>
      </div>
    </div>
  );
};