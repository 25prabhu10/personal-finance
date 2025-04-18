import type { AuthContext } from '@/contexts/auth-context'

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<{
  auth: AuthContext
}>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
    </>
  )
})
