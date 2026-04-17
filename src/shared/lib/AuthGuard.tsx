import { useAuthStore } from '@/shared/store/authStore';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  redirectTo = '/dashboard',
}: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
