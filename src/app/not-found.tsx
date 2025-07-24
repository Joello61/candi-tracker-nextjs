'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Page non trouvée
          </h2>
          <p className="text-gray-600 mb-8">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="space-x-4">
          <Button 
            onClick={() => navigate.back()}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
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

export default NotFoundPage;