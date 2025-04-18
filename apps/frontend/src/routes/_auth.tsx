import { useAuth } from '@/contexts/auth-context'
import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      redirect({
        search: {
          redirect: location.href
        },
        throw: true,
        to: '/login'
      })
    }
  },
  component: AuthLayout
})

function AuthLayout() {
  const router = useRouter()
  const navigate = Route.useNavigate()
  const auth = useAuth()

  async function handleLogout() {
    if (globalThis.confirm('Are you sure you want to logout?')) {
      await auth.logout()
      await router.invalidate()
      await navigate({ to: '/' })
    }
  }

  return (
    <div className="h-full p-2">
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="flex gap-2 py-2">
        <li>
          <Link className="hover:underline data-[status='active']:font-semibold" to="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="hover:underline data-[status='active']:font-semibold" to="/">
            Invoices
          </Link>
        </li>
        <li>
          <button className="hover:underline" onClick={() => handleLogout} type="button">
            Logout
          </button>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
