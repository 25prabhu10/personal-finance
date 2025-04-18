import { useAuth } from '@/contexts/auth-context'
import { createFileRoute, redirect, useRouter, useRouterState } from '@tanstack/react-router'
import React from 'react'
import { z } from 'zod'

const fallback = '/dashboard'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      redirect({ throw: true, to: search.redirect ?? fallback })
    }
  },
  component: Login
})

function Login() {
  const auth = useAuth()
  const router = useRouter()
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  const navigate = Route.useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const search = Route.useSearch()

  const onFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const fieldValue = formData.get('email') as null | string

      if (!fieldValue) return
      const username = fieldValue.toString()
      await auth.login(username)

      await router.invalidate()

      // This is just a hack being used to wait for the auth state to update
      // in a real app, you'd want to use a more robust solution
      await new Promise((resolve) => setTimeout(resolve, 5000))

      await navigate({ to: search.redirect ?? fallback })
    } catch (error) {
      console.error('Error logging in:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoggingIn = isLoading || isSubmitting

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

      {/* {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )} */}

      <form action={onFormSubmit} className="space-y-4">
        <fieldset className="grid w-full gap-2" disabled={isLoggingIn}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="email"
              name="email"
              required
              type="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="password"
              required
              type="password"
            />
          </div>

          <div>
            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              disabled={isLoading}
              type="submit">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a className="text-blue-600 hover:underline" href="/signup">
              Sign up
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
