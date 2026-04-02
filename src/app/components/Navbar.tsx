import { Link, useLocation } from 'react-router';
import { Briefcase, BookOpen, ClipboardCheck, LayoutDashboard, Moon, Sun, Menu, X, Brain, User, LogOut, Settings, ChevronDown, Bell } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/assessments', label: 'Assessments', icon: ClipboardCheck },
    { path: '/ai-match', label: 'AI Match', icon: Brain },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const openLogin = () => { setAuthTab('login'); setAuthOpen(true); };
  const openSignup = () => { setAuthTab('signup'); setAuthOpen(true); };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-all duration-300">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
              CareerDream
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-all ${
                  location.pathname.startsWith(path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {path === '/ai-match' && (
                  <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold">AI</span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Notifications (logged in) */}
            {isLoggedIn && (
              <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
              </button>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Auth */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:border-primary/50 bg-card transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden" onClick={() => setProfileOpen(false)}>
                    <div className="p-4 border-b border-border bg-muted/30">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 text-sm transition-colors">
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 text-sm transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 text-sm transition-colors">
                          <Settings className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-sm text-red-500 transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={openLogin}
                  className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={openSignup}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow-primary/30 hover:shadow-md"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname.startsWith(path)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="flex gap-2 pt-2 border-t border-border">
                  <button onClick={openLogin} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-primary transition-colors">
                    Log In
                  </button>
                  <button onClick={openSignup} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
    </>
  );
}
