import { useAuth } from '@/contexts/auth-context'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Personal Finance App</h1>
        <p className="mb-8 text-xl text-gray-600">
          Take control of your finances with our powerful tracking and budgeting tools
        </p>

        {isAuthenticated ? (
          <Link to="/" className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Login
            </Link>
            <Link
              to="/"
              className="rounded border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Track Expenses"
          description="Easily record and categorize your daily expenses"
        />
        <FeatureCard
          title="Budget Management"
          description="Create and manage budgets to stay on top of your spending"
        />
        <FeatureCard
          title="Financial Goals"
          description="Set and track progress toward your financial goals"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
