import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AppProvider } from "../context/AppContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isWorkspace = pathname.startsWith('/playground/');
  const isCertificate = pathname.startsWith('/certificate/');

  if (isWorkspace || isCertificate) {
    return (
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        <ScrollToTop />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function Root() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <AppShell />
        <Toaster richColors position="top-right" />
      </AppProvider>
    </GoogleOAuthProvider>
  );
}
