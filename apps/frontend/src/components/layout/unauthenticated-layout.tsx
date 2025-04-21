import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Outlet } from '@tanstack/react-router'

export function UnauthenticatedLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
