import { Link } from 'react-router';
import { Briefcase, BookOpen, ClipboardCheck, Brain, Twitter, Linkedin, Github, Mail, ArrowRight, MapPin } from 'lucide-react';

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
    { label: 'About Us', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'Press Kit', to: '/' },
    { label: 'Contact', to: '/' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Cookie Policy', to: '/' },
    { label: 'Security', to: '/' },
  ],
};

export function Footer() {
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
              San Francisco, CA & Bengaluru, India
            </div>

            {/* Newsletter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-border bg-input-background focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <button className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
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

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CareerDream. All rights reserved. Built for IT professionals worldwide.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              {[
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Github, href: '#', label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
