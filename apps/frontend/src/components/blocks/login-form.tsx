import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@tanstack/react-router'

export function LoginForm() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Enter your username and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
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
              <Input
                id="current-password"
                maxLength={500}
                minLength={8}
                name="password"
                placeholder="********"
                required
                title="Password must be at least 8 characters long, with at least one lowercase and one uppercase letter"
                type="password"
                autoComplete="current-password"
                autoCorrect="off"
                autoCapitalize="off"
                aria-describedby="password-constraints"
              />
              <p id="password-constraints" className="text-xs text-muted-foreground">
                Password must be at least 8 characters long, with at least one lowercase and one
                uppercase letter
              </p>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Accept terms and conditions
                </label>
              </div>
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
