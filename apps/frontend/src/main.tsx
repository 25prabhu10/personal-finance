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
    auth: undefined!
  }
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

const container = document.getElementById('root')

if (container !== null) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
