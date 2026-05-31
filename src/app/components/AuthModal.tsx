import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Briefcase, Github, Chrome, AlertCircle, Loader2, CheckCircle2, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useGoogleLogin } from '@react-oauth/google';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

type View = 'login' | 'signup' | 'forgot' | 'success_login' | 'success_signup' | 'verify_email' | 'verify_mfa';

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: Props) {
  const [view, setView] = useState<View>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, signup, loginWithGoogle, loginWithGitHub, forgotPassword, verifyEmail, verifyMfa, user, isAdmin } = useApp();

  // Sync view with defaultTab and reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setView(defaultTab);
      setError('');
      setSuccess('');
      setEmail('');
      setPassword('');
      setName('');
      setLoading(false);
      setShowPass(false);
      setOtp('');
    }
  }, [isOpen, defaultTab]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      try {
        const ok = await loginWithGoogle(tokenResponse.access_token);
        if (ok) setView('success_login');
        else setError('Google login failed. Please try again.');
      } catch (err: any) {
        setError(err?.message || 'Google login failed. Check your connection.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google login was cancelled.'),
  });

  if (!isOpen) return null;

  // ── Handlers ───────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }

    setLoading(true);
    try {
      const result = await login(email, password, rememberMe);
      if (result.mfaRequired) {
        setView('verify_mfa');
      } else if (result.requiresVerification) {
        setView('verify_email');
      } else if (result.success) {
        setView('success_login');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err: any) {
      console.warn('Login attempt failed:', err);
      // Check if it's a network/connectivity error or a server-side 5xx error
      const isNetworkError = err.message.toLowerCase().includes('fetch') || 
                             err.message.toLowerCase().includes('network') ||
                             err.message.includes('API Error: 5');
      
      if (isNetworkError) {
        setError('Server is currently in maintenance mode. Would you like to continue as a Guest?');
      } else {
        setError(err.message || 'Invalid email or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name) { setError('Please enter your full name.'); return; }
    if (!email) { setError('Please enter your email address.'); return; }
    if (!password || password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    try {
      const result = await signup(name, email, password);
      if (result.requiresVerification) {
        setView('verify_email');
      } else if (result.success) {
        setView('success_signup');
      } else {
        setError('This email is already registered. Try logging in instead.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to create account. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otp || otp.length !== 6) { setError('Please enter a valid 6-digit OTP.'); return; }
    setLoading(true);
    try {
      await verifyEmail(email, otp);
      setView('success_signup');
    } catch (err: any) {
      setError(err?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otp || otp.length !== 6) { setError('Please enter a valid 6-digit OTP.'); return; }
    setLoading(true);
    try {
      await verifyMfa(email, otp, rememberMe);
      setView('success_login');
    } catch (err: any) {
      setError(err?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) { setError('Please enter your email address.'); return; }

    setLoading(true);
    try {
      const msg = await forgotPassword(email);
      setSuccess(msg);
    } catch {
      setError('Unable to send reset email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    if (provider === 'Google') {
      handleGoogleLogin();
    } else {
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      const redirectUri = window.location.origin + window.location.pathname;
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    }
  };


  // ── Render ─────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {view === 'forgot' && (
                <button onClick={() => { setView('login'); setError(''); setSuccess(''); }} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 mr-1" aria-label="Back to login">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CareerDream</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Get Started' : (view === 'verify_email' || view === 'verify_mfa') ? 'Verification Required' : 'Reset Password'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {view === 'login' ? 'Enter your details to access your account' 
              : view === 'signup' ? 'Create an account to track your career progress'
              : (view === 'verify_email' || view === 'verify_mfa') ? 'Check your email for the verification code'
              : 'Enter your email and we\'ll send you a reset link'}
          </p>

          {/* Tabs (only for login/signup) */}
          {(view === 'login' || view === 'signup') && (
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl mb-6">
              {(['login', 'signup'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setView(t); setError(''); setSuccess(''); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === t 
                      ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                  aria-label={t === 'login' ? 'Log In tab' : 'Sign Up tab'}
                >
                  {t === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 pt-0">
          {/* Social Login (login & signup only) */}
          {(view === 'login' || view === 'signup') && (
            <>
              <div className="flex gap-3 mb-6">
                <button 
                  onClick={() => handleSocialLogin('Google')}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/30 transition-all disabled:opacity-50"
                  aria-label="Continue with Google"
                >
                  <Chrome className="w-4 h-4 text-red-500" /> Google
                </button>
                <button 
                  onClick={() => handleSocialLogin('GitHub')}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/30 transition-all disabled:opacity-50"
                  aria-label="Continue with GitHub"
                >
                  <Github className="w-4 h-4" /> GitHub
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-medium">Or continue with</span>
                </div>
              </div>
            </>
          )}

          {/* ── Login Form ── */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="login-email" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none text-sm transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="login-password" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="login-password" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none text-sm transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label={showPass ? 'Hide password' : 'Show password'}>
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" />
                  <span className="text-xs text-slate-500 group-hover:text-slate-700 dark:text-slate-400 transition-colors">Remember me</span>
                </label>
                <button type="button" onClick={() => { setView('forgot'); setError(''); setSuccess(''); }} className="text-xs text-primary hover:underline font-medium">Forgot password?</button>
              </div>

              {error && <ErrorBanner message={error} />}

              <SubmitButton loading={loading} label="Sign In" />
            </form>
          )}

          {/* ── Signup Form ── */}
          {view === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="signup-name" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="signup-name" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} autoComplete="name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none text-sm transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="signup-email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="signup-email" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none text-sm transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="signup-password" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="signup-password" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none text-sm transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label={showPass ? 'Hide password' : 'Show password'}>
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <ErrorBanner message={error} />}

              <SubmitButton loading={loading} label="Create Account" />
            </form>
          )}

          {/* ── Verify OTP Form ── */}
          {(view === 'verify_email' || view === 'verify_mfa') && (
            <form onSubmit={view === 'verify_email' ? handleVerifyEmail : handleVerifyMfa} className="space-y-4">
              <div className="text-sm text-slate-500 mb-4 text-center">
                We've sent a 6-digit OTP to <strong>{email}</strong>. Please enter it below.
              </div>
              <div className="space-y-1.5">
                <label htmlFor="otp-input" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">One-Time Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="otp-input" type="text" placeholder="123456" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none text-center tracking-widest text-lg font-mono transition-all" />
                </div>
              </div>

              {error && <ErrorBanner message={error} />}

              <SubmitButton loading={loading} label="Verify Account" />
            </form>
          )}

          {/* ── Forgot Password Form ── */}
          {view === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="forgot-email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="forgot-email" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none text-sm transition-all" />
                </div>
              </div>

              {error && <ErrorBanner message={error} />}

              {success && (
                <div className="flex gap-2 px-3 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              <SubmitButton loading={loading} label="Send Reset Link" />
            </form>
          )}

          {/* ── Success Login ── */}
          {view === 'success_login' && (
            <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back, {user?.name}!</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">You have successfully logged into your account.</p>
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                {isAdmin && (
                  <button 
                    onClick={() => { onClose(); window.location.href = '/admin/dashboard'; }}
                    className="w-full py-3.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 dark:shadow-none flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-5 h-5" /> Go to Admin Dashboard
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue to Website
                </button>
              </div>
            </div>
          )}

          {/* ── Success Signup ── */}
          {view === 'success_signup' && (
            <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Account Created!</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome to CareerDream. Let's build your future together.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                Get Started <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          )}


          {/* Footer toggle */}
          {(view === 'login' || view === 'signup') && (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              {view === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setError(''); }} className="text-primary hover:underline font-bold">
                {view === 'login' ? 'Sign Up for Free' : 'Log In'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ────────────────────────

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex gap-2 px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs animate-in slide-in-from-top-1" role="alert">
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Please wait...</>) : label}
    </button>
  );
}
