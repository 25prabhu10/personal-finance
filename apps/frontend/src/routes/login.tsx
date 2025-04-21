import { LoginForm } from '@/components/blocks/login-form'
// import { useAuth } from '@/contexts/auth-context'
import { createFileRoute, redirect } from '@tanstack/react-router'
// import React from 'react'
import { z } from 'zod'

const fallback = '/dashboard'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: ({ context, search }) => {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    if (context.auth.isAuthenticated) {
      redirect({ throw: true, to: search.redirect ?? fallback })
    }
  },
  component: Login
})

function Login() {
  // const auth = useAuth()
  // const router = useRouter()
  // const isLoading = useRouterState({ select: (s) => s.isLoading })
  // const navigate = Route.useNavigate()
  // const [isSubmitting, setIsSubmitting] = React.useState(false)

  // const search = Route.useSearch()

  // const onFormSubmit = async (formData: FormData) => {
  //   setIsSubmitting(true)
  //   try {
  //     const fieldValue = formData.get('email') as null | string

  //     if (!fieldValue) return
  //     const username = fieldValue.toString()
  //     await auth.login(username)

  //     await router.invalidate()

  //     // This is just a hack being used to wait for the auth state to update
  //     // in a real app, you'd want to use a more robust solution
  //     await new Promise((resolve) => setTimeout(resolve, 5000))

  //     await navigate({ to: search.redirect ?? fallback })
  //   } catch (error) {
  //     console.error('Error logging in:', error)
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  // const isLoggingIn = isLoading || isSubmitting

  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <div className="mx-auto w-full max-w-md">
        <LoginForm />
      </div>
    </section>
  )
}
