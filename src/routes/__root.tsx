import {
  Link,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";

export const Route = createRootRoute({
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
});
