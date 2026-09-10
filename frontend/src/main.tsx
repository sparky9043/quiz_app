import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind-config.css'
import './reset.css'
import AppRoutes from './AppRoutes.tsx'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRoutes} />
    </QueryClientProvider>
  </StrictMode>,
)
