import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Register from './pages/Register.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path:'login',
    element:<Login/>
  },
  {
    path:'signin',
    element:<Register/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
