'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const applicationName = process.env.NEXT_PUBLIC_APP_NAME || "Candi Tracker"

  // Rediriger vers le dashboard si déjà authentifié
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // Afficher un loader pendant la vérification d'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-gray-600">Vérification en cours...</p>
        </div>
      </div>
    )
  }

  // Ne pas afficher le contenu si l'utilisateur est authentifié (redirection en cours)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-gray-600">Redirection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {applicationName}
          </h1>
          <p className="text-gray-600">
            Suivez vos candidatures d&apos;emploi facilement
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-6">
          {children}
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          © 2025 {applicationName}. Tous droits réservés.
        </div>
      </div>
    </div>
  )
}