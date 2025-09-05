import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthCookie } from '@/hooks/use-cookie';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component prevents authenticated users from accessing auth pages
 * like login, register, forgot-password, and reset-password
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAuthCookie } = useAuthCookie();
  const auth = getAuthCookie();

  // If user is authenticated, redirect to dashboard
  useEffect(() => {
    if (auth?.token) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth, navigate]);

  if (auth?.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;
