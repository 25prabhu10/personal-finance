import { ModeToggle } from '@/components/blocks/mode-toggle'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { WalletIcon } from 'lucide-react'

const UnauthenticatedLayoutRoute = [
  ['/', 'Home'],
  ['/about', 'About']
] as const

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 text-primary/80 hover:text-primary">
          <WalletIcon className="h-8 w-8" />
          <span className="hidden md:inline-block text-xl font-bold ">Personal Finance</span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex divide-x-1">
            {UnauthenticatedLayoutRoute.map(([to, label]) => (
              <li key={to}>
                <Link
                  activeProps={{ className: 'text-primary shadow-[0_5px_0_-2px_var(--primary)]' }}
                  className="p-4 transition-colors"
                  inactiveProps={{
                    className:
                      'text-primary/80 hover:text-primary hover:shadow-[0_5px_0_-2px_var(--primary)]'
                  }}
                  to={to}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild size="sm" variant="outline">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
