import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Bell, User, LogOut, ChevronDown, Briefcase, BookOpen, ClipboardCheck, Brain, LayoutDashboard, Settings, Trash2, Clock, Info, FileText, Moon, Sun, TrendingUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useApp } from '../context/AppContext';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, isAdmin, logout, notifications, markAsRead, clearNotifications } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/assessments', label: 'Assessments', icon: ClipboardCheck },
    { path: '/ai-match', label: 'AI Match', icon: Brain, badge: 'AI' },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setIsNotificationsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-all duration-300">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block text-muted-foreground group-hover:text-foreground group-hover:drop-shadow-lg transition-all">
              CareerDream
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-full hover:bg-muted transition-colors group"
                >
                  <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'text-primary' : 'text-muted-foreground'} group-hover:scale-110 transition-transform`} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-background animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                      <h3 className="font-bold">Notifications</h3>
                      <button 
                        onClick={clearNotifications}
                        className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Clear All
                      </button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-20" />
                          <p className="text-sm text-muted-foreground">All caught up!</p>
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              markAsRead(notif.id);
                              navigate(notif.link);
                              setIsNotificationsOpen(false);
                            }}
                            className={`p-4 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors relative group ${!notif.read ? 'bg-primary/5' : ''}`}
                          >
                            {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                            <div className="flex gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                notif.type === 'job' ? 'bg-green-500/10 text-green-600' :
                                notif.type === 'news' ? 'bg-blue-500/10 text-blue-600' :
                                notif.type === 'feature' ? 'bg-purple-500/10 text-purple-600' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {notif.type === 'job' ? <Briefcase className="w-4 h-4" /> :
                                 notif.type === 'news' ? <FileText className="w-4 h-4" /> :
                                 notif.type === 'feature' ? <TrendingUp className="w-4 h-4" /> :
                                 <Info className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate pr-4">{notif.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{notif.message}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Clock className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-[10px] text-muted-foreground">
                                    {new Date(notif.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-border text-center bg-muted/30">
                        <Link to="/dashboard" className="text-xs font-bold text-primary hover:underline">View All Activities</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors mr-2"
              aria-label="Toggle theme"
            >
              <Sun className="w-5 h-5 text-muted-foreground" />
            </button>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 pl-2 rounded-full border border-border bg-card hover:bg-muted transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                    {user?.avatar && (user.avatar.startsWith('http') || user.avatar.startsWith('data:')) ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user?.avatar || '👤'
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground mr-1" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2.5 hover:bg-rose-500/10 text-rose-500 transition-colors text-sm font-bold">
                      <LayoutDashboard className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 hover:bg-muted transition-colors text-sm">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 hover:bg-muted transition-colors text-sm">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-muted transition-colors text-sm text-red-500 border-t border-border"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const recruiterAuth = localStorage.getItem('recruiterAuth');
                    if (recruiterAuth) {
                      navigate('/recruiter/dashboard');
                    } else {
                      navigate('/recruiter/login');
                    }
                  }}
                  className="hidden md:flex items-center px-4 py-1.5 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-all"
                >
                  Recruiter
                </button>
                <button
                  onClick={() => { setAuthTab('login'); setAuthOpen(true); }}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => { setAuthTab('signup'); setAuthOpen(true); }}
                  className="px-6 py-2 rounded-full bg-primary text-white hover:shadow-lg hover:shadow-primary/30 transition-all font-bold text-sm"
                >
                  Get Started
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background lg:hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-bold text-xl">Menu</span>
            <button onClick={() => setMobileOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted transition-colors font-medium text-lg"
              >
                <Icon className="w-6 h-6" />
                {label}
              </Link>
            ))}
            {!isLoggedIn && (
              <button
                onClick={() => { setAuthTab('login'); setAuthOpen(true); setMobileOpen(false); }}
                className="w-full p-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg mt-8"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        defaultTab={authTab}
      />

    </>
  );
}
