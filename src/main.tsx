import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import { router } from './router'
import { ApiClientProvider } from './providers/ApiClientProvider'
import { QueryProvider } from './providers/QueryProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ApiClientProvider>
        <RouterProvider router={router} />
      </ApiClientProvider>
    </QueryProvider>
  </StrictMode>,
)
