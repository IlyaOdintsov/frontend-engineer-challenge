import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { RegisterPage } from '@/pages/register.tsx';
import { LoginPage } from '@/pages/login.tsx';
import { PasswordRecoveryPage } from '@/pages/password-recovery.tsx';
import { AuthGuard } from '@/shared/lib/AuthGuard.tsx';
import { DashboardPage } from '@/pages/dashboard.tsx';
import { ProtectedRoute } from '@/shared/lib/ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <AuthGuard>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthGuard>
        <RegisterPage />
      </AuthGuard>
    ),
  },
  {
    path: '/password-recovery',
    element: <PasswordRecoveryPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
