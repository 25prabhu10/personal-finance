import type { AuthContext } from '@/contexts/auth-context'

import { UnauthenticatedLayout } from '@/components/layout/unauthenticated-layout'
import { useAuth } from '@/contexts/auth-context'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<{
  auth: AuthContext
}>()({
  component: RootComponent
})

function RootComponent() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {isAuthenticated ? (
        // Authenticated layout will be implemented later
        <Outlet />
      ) : (
        // Unauthenticated layout
        <UnauthenticatedLayout />
      )}
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
    </>
  )
}
