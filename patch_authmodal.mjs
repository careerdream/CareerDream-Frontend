import fs from 'fs';

let code = fs.readFileSync('src/app/components/AuthModal.tsx', 'utf8');

// 1. Update View type
code = code.replace(
  "type View = 'login' | 'signup' | 'forgot' | 'success_login' | 'success_signup';",
  "type View = 'login' | 'signup' | 'forgot' | 'success_login' | 'success_signup' | 'verify_email' | 'verify_mfa';"
);

// 2. Add OTP state and useApp methods
code = code.replace(
  "const [password, setPassword] = useState('');",
  "const [password, setPassword] = useState('');\n  const [otp, setOtp] = useState('');"
);

code = code.replace(
  "const { login, signup, loginWithGoogle, loginWithGitHub, forgotPassword, user, isAdmin } = useApp();",
  "const { login, signup, loginWithGoogle, loginWithGitHub, forgotPassword, verifyEmail, verifyMfa, user, isAdmin } = useApp();"
);

// 3. Clear OTP on open
code = code.replace(
  "setShowPass(false);",
  "setShowPass(false);\n      setOtp('');"
);

// 4. Update handleLogin
const handleLoginRegex = /const handleLogin = async \\(e: React\\.FormEvent\\) => \\{[\\s\\S]*?\\};/m;
const newHandleLogin = \`const handleLogin = async (e: React.FormEvent) => {
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
  };\`;
code = code.replace(handleLoginRegex, newHandleLogin);

// 5. Update handleSignup
const handleSignupRegex = /const handleSignup = async \\(e: React\\.FormEvent\\) => \\{[\\s\\S]*?\\};/m;
const newHandleSignup = \`const handleSignup = async (e: React.FormEvent) => {
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
  };\`;
code = code.replace(handleSignupRegex, newHandleSignup);

// 6. Add handleVerifyEmail and handleVerifyMfa
const handleForgotPasswordRegex = /const handleForgotPassword = async \\(e: React\\.FormEvent\\) => \\{/;
const newVerifyHandlers = \`const handleVerifyEmail = async (e: React.FormEvent) => {
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

  const handleForgotPassword = async (e: React.FormEvent) => {\`;
code = code.replace(handleForgotPasswordRegex, newVerifyHandlers);

// 7. Add UI for verify_email and verify_mfa
const forgotPasswordFormRegex = /\\{\\/\\* ── Forgot Password Form ── \\*\\/\\}/;
const newForms = \`{/* ── Verify OTP Form ── */}
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

          {/* ── Forgot Password Form ── */}\`;
code = code.replace(forgotPasswordFormRegex, newForms);

// 8. Update header titles for verify views
code = code.replace(
  "{view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Get Started' : 'Reset Password'}",
  "{view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Get Started' : (view === 'verify_email' || view === 'verify_mfa') ? 'Verification Required' : 'Reset Password'}"
);
code = code.replace(
  "{view === 'login' ? 'Enter your details to access your account' \n              : view === 'signup' ? 'Create an account to track your career progress'\n              : 'Enter your email and we\\'ll send you a reset link'}",
  "{view === 'login' ? 'Enter your details to access your account' \n              : view === 'signup' ? 'Create an account to track your career progress' \n              : (view === 'verify_email' || view === 'verify_mfa') ? 'Check your email for the verification code'\n              : 'Enter your email and we\\'ll send you a reset link'}"
);

fs.writeFileSync('src/app/components/AuthModal.tsx', code);
console.log('Successfully patched AuthModal.tsx');
