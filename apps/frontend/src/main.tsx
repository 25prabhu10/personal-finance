import '@/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import the generated route tree
import { AuthProvider, useAuth } from '@/contexts/auth-context'
import { routeTree } from '@/routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'

// Set up the router
const router = createRouter({
  routeTree,
  // defaultPreload: 'intent',
  // scrollRestoration: true,
  context: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    auth: undefined!
  }
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider context={{ auth }} router={router} />
}

const container = document.getElementById('root')

if (container !== null) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
