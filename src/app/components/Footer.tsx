import { Link } from 'react-router';
import { useState } from 'react';
import { Briefcase, BookOpen, ClipboardCheck, Brain, ArrowRight, MapPin, Mail, CheckCircle, Loader } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { api } from '../utils/api';

const footerLinks = {
  Platform: [
    { label: 'Browse Jobs', to: '/jobs' },
    { label: 'Learning Hub', to: '/learn' },
    { label: 'Assessments', to: '/assessments' },
    { label: 'AI Resume Match', to: '/ai-match' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
  Categories: [
    { label: 'Remote Jobs', to: '/jobs?type=Remote' },
    { label: 'Government Jobs', to: '/jobs?type=Government' },
    { label: 'Abroad Opportunities', to: '/jobs?type=Abroad' },
    { label: 'AI/ML Courses', to: '/learn?category=AI/ML' },
    { label: 'Cloud Courses', to: '/learn?category=Cloud' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Blog', to: '/news' },
    { label: 'Report Issues', to: '/report-issue' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
    { label: 'Cookie Policy', to: '/cookie-policy' },
    { label: 'Security', to: '/security' },
    { label: 'Fraud Alert', to: '/fraud-alert' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubStatus('loading');
    try {
      await api.post('/subscribe', { email });
      setSubStatus('success');
      setEmail('');
      setTimeout(() => setSubStatus('idle'), 4000);
    } catch {
      setSubStatus('error');
      setTimeout(() => setSubStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary to-accent py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Ready to Launch Your IT Career?</h3>
            <p className="text-white/80 text-sm">Join 200,000+ professionals building their dreams on CareerDream.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/jobs"
              className="px-5 py-2.5 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-white/90 transition-all shadow-lg flex items-center gap-2"
            >
              Browse Jobs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/learn"
              className="px-5 py-2.5 bg-white/10 border border-white/30 text-white rounded-xl text-sm font-semibold hover:bg-white/20 transition-all"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CareerDream
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              The all-in-one platform for IT professionals. Find jobs, learn skills, take assessments, and advance your career.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
              <MapPin className="w-3 h-3" />
              San Francisco, CA &amp; Bengaluru, India
            </div>

            {/* Newsletter - Wired up */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={subStatus === 'loading' || subStatus === 'success'}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-border bg-white text-black placeholder-gray-500 focus:border-primary focus:outline-none transition-colors disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subStatus === 'loading' || subStatus === 'success'}
                  className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-1"
                >
                  {subStatus === 'loading' ? <Loader className="w-3 h-3 animate-spin" /> : subStatus === 'success' ? <CheckCircle className="w-3 h-3" /> : null}
                  {subStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
              {subStatus === 'success' && <p className="text-xs text-green-500 mt-1">Thank you for subscribing! Please check your email.</p>}
              {subStatus === 'error' && <p className="text-xs text-red-500 mt-1">Invalid email or already subscribed.</p>}
            </form>
          </div>

          {/* Links - Mobile Accordions */}
          <div className="lg:hidden space-y-4">
            {Object.entries(footerLinks).map(([section, links]) => (
              <details key={section} className="border-b border-border pb-2">
                <summary className="font-semibold text-sm mb-2 cursor-pointer select-none">
                  {section}
                </summary>
                <ul className="space-y-1.5 ml-2">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          {/* Links - Desktop Grid */}
          <div className="hidden lg:grid grid-cols-4 lg:col-span-4 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-semibold text-sm mb-4">{section}</h4>
                <ul className="space-y-2.5">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CareerDream. All rights reserved. Built for IT professionals worldwide.
          </p>
          <div className="flex items-center gap-4">
            <SocialLinks variant="icon" size="md" />
          </div>
        </div>
      </div>
    </footer>
  );
}
