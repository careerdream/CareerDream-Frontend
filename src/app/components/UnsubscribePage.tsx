import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { api } from '../utils/api';
import { CheckCircle, XCircle } from 'lucide-react';

export function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!email) {
      setStatus('error');
      return;
    }

    const unsubscribe = async () => {
      try {
        await api.get(`/subscribe/unsubscribe?email=${encodeURIComponent(email)}`);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };

    unsubscribe();
  }, [email]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-card rounded-2xl border border-border p-8 shadow-sm">
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <h1 className="text-2xl font-bold">Unsubscribing...</h1>
            <p className="text-muted-foreground">Please wait while we process your request.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold">Successfully Unsubscribed</h1>
            <p className="text-muted-foreground">
              We're sorry to see you go! You will no longer receive newsletter updates from CareerDream.
            </p>
            <Link to="/" className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
              Return to Home
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground">
              We couldn't process your unsubscription. Please try again or contact support.
            </p>
            <Link to="/" className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
