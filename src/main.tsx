import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register.tsx'
import AuthLayout from './components/layouts/AuthLayout.tsx'
import Home from './pages/Home.tsx'
import MainLayout from './components/layouts/MainLayout.tsx'
import Auctions from './pages/Auctions.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/auctions', element: <Auctions /> },

        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/signin', element: <Register /> },
        ],
      },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)