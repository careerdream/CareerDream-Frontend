import { Mail, MapPin, Clock, Users, Zap, Heart, Globe, Award, ArrowRight, Briefcase, BookOpen, Code, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const openRoles = [
  {
    title: 'Frontend Developer Intern',
    department: 'Engineering',
    type: 'Internship · 3–6 months',
    location: 'Remote / Bengaluru',
    skills: ['React', 'TypeScript', 'TailwindCSS'],
    icon: Code,
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Content & Blog Writer Intern',
    department: 'Marketing',
    type: 'Internship · 3 months',
    location: 'Remote',
    skills: ['Technical Writing', 'SEO', 'IT Knowledge'],
    icon: BookOpen,
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Business Development Associate',
    department: 'Growth',
    type: 'Full-time',
    location: 'Bengaluru / Remote',
    skills: ['Sales', 'Communication', 'CRM'],
    icon: Briefcase,
    bg: 'bg-emerald-500/10',
  },
];

const perks = [
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere in India. We trust our team.' },
  { icon: Zap, title: 'Fast Growth', desc: 'Join early and grow with the platform as it scales.' },
  { icon: Heart, title: 'Mission-Driven', desc: 'Helping millions of IT professionals find their dream jobs.' },
  { icon: Award, title: 'Learn & Earn', desc: 'Access all courses on CareerDream for free while you work with us.' },
  { icon: Users, title: 'Great Team', desc: 'Work alongside passionate engineers, designers, and marketers.' },
  { icon: Clock, title: 'Flexible Hours', desc: 'Async-friendly culture. Deliver great work on your schedule.' },
];

export function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">We're Hiring</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Build the Future of
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              IT Careers in India
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join CareerDream's passionate team and help millions of IT professionals find jobs, learn skills, and advance their careers. We're a remote-first startup building India's most comprehensive career platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:info@careerdream.in?subject=Job Application - CareerDream"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              <Mail className="w-5 h-5" />
              Apply Now — info@careerdream.in
            </a>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border rounded-xl font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              Browse Jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Open Positions</h2>
            <p className="text-muted-foreground">Internships and full-time roles across engineering, marketing, and growth.</p>
          </div>
          <div className="space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${role.bg} flex items-center justify-center shrink-0`}>
                      <role.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{role.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{role.department}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{role.type}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`mailto:info@careerdream.in?subject=Application: ${role.title}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all shrink-0"
                  >
                    Apply <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Generic Apply */}
          <div className="mt-8 p-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 text-center">
            <h3 className="font-bold mb-2">Don't see your role?</h3>
            <p className="text-muted-foreground text-sm mb-4">We're always looking for talented people. Send us your resume and tell us how you can contribute.</p>
            <a
              href="mailto:info@careerdream.in?subject=Open Application - CareerDream"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              <Mail className="w-4 h-4" /> Send Open Application
            </a>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why CareerDream?</h2>
            <p className="text-muted-foreground">We build a culture where great work is rewarded and people grow fast.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <perk.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{perk.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-muted-foreground mb-8">Email your resume and a brief introduction to our team. We'll get back within 3 business days.</p>
            <a
              href="mailto:info@careerdream.in?subject=Career Opportunity at CareerDream"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <Mail className="w-5 h-5" />
              info@careerdream.in
            </a>
            <p className="text-xs text-muted-foreground mt-4">We respond to every application personally.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
