import type React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../app/store';

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [searchParams] = useSearchParams();

  if (isAuthenticated) {
    const redirect = searchParams.get('redirect');
    return <Navigate to={redirect ? `/${redirect}` : '/'} replace />;
  }

  return <>{children}</>;
}
