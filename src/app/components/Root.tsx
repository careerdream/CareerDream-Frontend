import { Outlet, useLocation } from "react-router";
import { useEffect, Suspense } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AppProvider } from "../context/AppContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';

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
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><Outlet /></Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><Outlet /></Suspense>
      </main>
      <Footer />
    </div>
  );
}

export function Root() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <HelmetProvider>
          <AppShell />
          <Toaster richColors position="top-right" />
        </HelmetProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  );
}
