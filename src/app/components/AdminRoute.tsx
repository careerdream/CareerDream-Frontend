import { Navigate } from 'react-router';
import { useApp } from '../context/AppContext';

/**
 * AdminRoute — Protects admin-only pages.
 * Redirects unauthenticated users to home, non-admins to dashboard.
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAdmin, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
