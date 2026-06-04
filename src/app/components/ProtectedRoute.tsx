import { Navigate, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, setUnlockModalOpen, isLoading } = useApp();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setUnlockModalOpen(true);
    }
  }, [isLoading, isLoggedIn, setUnlockModalOpen]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isLoggedIn) {
    // Redirect to home and we'll show the unlock modal (triggered by the useEffect)
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
