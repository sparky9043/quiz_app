import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes.tsx'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={AppRoutes} />
  </StrictMode>,
)
