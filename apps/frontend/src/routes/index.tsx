import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChartBarIcon, PieChartIcon, StarIcon, WalletIcon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index
})

interface FeatureCardProps {
  description: string
  icon: React.ReactNode
  title: string
}

interface TestimonialCardProps {
  content: string
  name: string
  rating: number
  role: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center space-y-4">
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function Index() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-20 pb-16">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-16 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Manage <span className="text-primary">Finances</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Take control of your financial future with intuitive tracking, budgeting, and planning
            tools
          </p>

          {isAuthenticated ? (
            <Button asChild size="lg">
              <Link to="/">Go to Dashboard</Link>
            </Button>
          ) : null}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            description="Easily track your expenses and categorize your spending habits in one place."
            icon={<WalletIcon className="h-10 w-10 text-primary" />}
            title="Expense Tracking"
          />
          <FeatureCard
            description="Create and manage budgets that help you meet your financial goals."
            icon={<ChartBarIcon className="h-10 w-10 text-primary" />}
            title="Budget Management"
          />
          <FeatureCard
            description="Get personalized insights and recommendations based on your spending patterns."
            icon={<PieChartIcon className="h-10 w-10 text-primary" />}
            title="Financial Insights"
          />
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Trusted by Me (still in development)
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what my imaginary friends have to say about their experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              content="This app has completely transformed how I manage my business finances. The insights are invaluable!"
              name="Alex Johnson"
              rating={5}
              role="Small Business Owner"
            />
            <TestimonialCard
              content="I've tried many finance apps, but this one stands out with its intuitive interface and powerful features."
              name="Sarah Miller"
              rating={5}
              role="Freelance Designer"
            />
            <TestimonialCard
              content="As a student on a tight budget, this app has helped me stay on track and save more than I thought possible."
              name="Michael Chen"
              rating={4}
              role="Graduate Student"
            />
          </div>
        </div>
      </section>

      {isAuthenticated ? null : (
        <section className="container mx-auto px-4 text-center">
          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <h2 className="text-3xl font-bold">Ready to take control of your finances?</h2>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Join and be the first find bugs and lose all your peace of mind.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="mx-auto mt-4" size="lg">
                <Link to="/signup">Get Started for Free</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      )}
    </div>
  )
}

function TestimonialCard({ name, role, content, rating }: TestimonialCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-muted'}`}
            fill={i < rating ? 'currentColor' : 'none'}
            key={i}
          />
        ))}
      </CardHeader>
      <CardContent className="text-muted-foreground">{content}</CardContent>
      <CardFooter>
        <div className="mt-6 pt-4 border-t border-border">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
