import { ProtectedRouteClient } from '@/components/layout/ProtectedRouteClient'
import { MainLayout } from '@/components/layout/MainLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRouteClient>
      <MainLayout>
        {children}
      </MainLayout>
    </ProtectedRouteClient>
  )
}