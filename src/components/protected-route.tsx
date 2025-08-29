import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthCookie } from '@/hooks/use-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAuthCookie } = useAuthCookie();
  const auth = getAuthCookie();

  useEffect(() => {
    if (!auth?.token) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [auth, navigate, location]);

  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
