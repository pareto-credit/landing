import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import App from './App'
import LegalDocumentPage from './pages/LegalDocumentPage'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <main className="mx-auto flex min-h-screen w-[min(1024px,calc(100vw-2rem))] flex-col items-start justify-center gap-4">
      <h1 className="text-3xl font-bold text-white">Page not found</h1>
      <Link
        to="/"
        className="font-mono text-xs uppercase tracking-[0.14em] text-[#70B19E] hover:underline"
      >
        Back to Home
      </Link>
    </main>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-service',
  component: () => <LegalDocumentPage documentType="terms" />,
})

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: () => <LegalDocumentPage documentType="privacy" />,
})

const routeTree = rootRoute.addChildren([homeRoute, termsRoute, privacyRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
