'use client'

import type { ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRouteClient: React.FC<ProtectedRouteProps> = ({ 
  children 
}) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Sauvegarder la route actuelle pour la redirection après connexion
      const returnUrl = encodeURIComponent(pathname)
      router.push(`/login?returnUrl=${returnUrl}`)
    }
  }, [isAuthenticated, isLoading, router, pathname])

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    )
  }

  // Ne rien afficher si non authentifié (la redirection est gérée par useEffect)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}