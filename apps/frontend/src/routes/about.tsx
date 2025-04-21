import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { BadgeCheckIcon, BrainCircuitIcon, HeartHandshakeIcon, ShieldCheckIcon } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About
})

interface TeamMemberProps {
  bio: string
  imageUrl: string
  name: string
  role: string
}

function About() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About FinanceTracker</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
            Our mission is to empower individuals and businesses to achieve financial freedom
            through smart tracking, budgeting, and financial planning.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At FinanceTracker, we believe that financial wellness should be accessible to
              everyone. Our goal is to demystify personal finance and provide tools that make it
              easy for anyone to take control of their financial future.
            </p>
            <p className="text-lg text-muted-foreground">
              We've built a platform that combines powerful tracking capabilities with intuitive
              visualizations and actionable insights, all designed to help you make smarter
              financial decisions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col items-center p-6 text-center">
              <HeartHandshakeIcon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-medium">Accessibility</h3>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <ShieldCheckIcon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-medium">Security</h3>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <BrainCircuitIcon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-medium">Innovation</h3>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <BadgeCheckIcon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-medium">Transparency</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Team</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <TeamMember
              bio="Former fintech executive with 15+ years of experience in personal finance management."
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              name="Jennifer Lee"
              role="CEO & Co-Founder"
            />
            <TeamMember
              bio="Software engineer passionate about creating tools that make finance accessible to everyone."
              imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D"
              name="David Rodriguez"
              role="CTO & Co-Founder"
            />
            <TeamMember
              bio="Product manager specializing in user-centered design and financial technology."
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              name="Michael Wong"
              role="Head of Product"
            />
            <TeamMember
              bio="UX/UI designer focused on creating intuitive and accessible financial interfaces."
              imageUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D"
              name="Aisha Johnson"
              role="Lead Designer"
            />
          </div>
        </div>
      </section>

      {/* Join us section */}
      <section className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold">Join Our Financial Community</h2>
          <p className="text-lg text-muted-foreground">
            Start your journey towards financial freedom today. Join thousands of users who have
            transformed their relationship with money using FinanceTracker.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/signup">Create Free Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function TeamMember({ name, role, bio, imageUrl }: TeamMemberProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full overflow-hidden">
        <img
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          src={imageUrl}
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm font-medium text-primary">{role}</p>
        <p className="mt-2 text-sm text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  )
}
