import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface LoginFormProps {
  onSubmit: (formData: FormData) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Enter your username and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="debt42life"
                required
                type="text"
                title="Please enter a valid username"
                maxLength={250}
                autoFocus
                autoComplete="username"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="current-password">Password</Label>
                <Link
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-primary"
                  to="/login">
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="current-password"
                  maxLength={500}
                  minLength={8}
                  name="password"
                  placeholder="********"
                  required
                  title="Password must be at least 8 characters long, with at least one lowercase and one uppercase letter"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  aria-describedby="password-constraints"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
              <p id="password-constraints" className="text-xs text-muted-foreground">
                Password must be at least 8 characters long, with at least one lowercase and one
                uppercase letter
              </p>
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link className="text-primary underline underline-offset-4" to="/signup">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
