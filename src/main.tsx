import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Register from './pages/Register.tsx'
import AuthLayout from './components/layouts/AuthLayout.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import Home from './pages/Home.tsx'
import MainLayout from './components/layouts/MainLayout.tsx'
import ProfileSettings from './components/popups/ProfileSettings.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            // path: 'profilesettings',
            // element: <ProfileSettings />,
            // children: [],
          },
        ],
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'signin', element: <Register /> },
        ],
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)