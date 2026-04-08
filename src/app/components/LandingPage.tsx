import { Link } from 'react-router';
import { Search, ArrowRight, TrendingUp, Users, Award, Briefcase, BookOpen, Target, ChevronRight, Zap, Shield, Globe, Star, Play, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const categories = [
  { name: 'AI/ML', icon: '🤖', count: 890, color: 'from-violet-500 to-purple-600', query: 'AI/ML' },
  { name: 'Cloud', icon: '☁️', count: 1540, color: 'from-blue-500 to-cyan-500', query: 'Cloud' },
  { name: 'Full Stack', icon: '💻', count: 2100, color: 'from-green-500 to-teal-500', query: 'Full Stack' },
  { name: 'Data Science', icon: '📊', count: 1240, color: 'from-orange-500 to-yellow-500', query: 'Data Science' },
  { name: 'DevOps', icon: '⚙️', count: 720, color: 'from-red-500 to-pink-500', query: 'DevOps' },
  { name: 'Cybersecurity', icon: '🔒', count: 650, color: 'from-slate-600 to-slate-800', query: 'Cybersecurity' },
];

const stats = [
  { label: 'Jobs Posted', value: 50000, display: '50K+', icon: Briefcase, color: 'text-primary' },
  { label: 'Active Learners', value: 200000, display: '200K+', icon: Users, color: 'text-accent' },
  { label: 'Courses', value: 1500, display: '1,500+', icon: BookOpen, color: 'text-primary' },
  { label: 'Certifications', value: 500, display: '500+', icon: Award, color: 'text-accent' },
];

const howItWorks = [
  { step: '01', title: 'Upload Your Resume', desc: 'Our AI analyzes your skills and experience instantly.', icon: '📄', color: 'from-primary to-accent' },
  { step: '02', title: 'Get Matched', desc: 'Receive personalized job and course recommendations.', icon: '🎯', color: 'from-accent to-primary' },
  { step: '03', title: 'Learn & Apply', desc: 'Upskill with targeted courses, then apply with confidence.', icon: '🚀', color: 'from-primary to-accent' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'ML Engineer at Google', text: 'CareerDream helped me go from a junior developer to an ML engineer at Google in 8 months. The AI match feature is a game changer!', avatar: '👩‍💻', rating: 5 },
  { name: 'Rahul Verma', role: 'Cloud Architect at AWS', text: 'The cloud courses here are top-notch. I got AWS certified and landed a $150k job within 3 weeks of completing the program.', avatar: '👨‍💼', rating: 5 },
  { name: 'Ananya Patel', role: 'Data Scientist at Meta', text: 'The skill assessments gave me a clear picture of my gaps. After following the learning path, I cracked Meta\'s data science interview!', avatar: '👩‍🔬', rating: 5 },
];

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.round(progress * end));
            if (progress === 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs, courses, isLoading } = useApp();

  if (isLoading || jobs.length === 0 || courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const featuredJobs = jobs.filter(j => j.featured).slice(0, 3);
  const featuredCourses = courses.filter(c => c.bestseller || c.rating >= 4.8).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Join 200,000+ IT professionals building their careers</span>
              <Zap className="w-3 h-3 fill-current" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Land Your Dream
              </span>
              <br />
              <span className="text-foreground">IT Career</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover top jobs, master in-demand skills, ace technical assessments — all powered by AI that understands your unique career goals.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3 p-2 rounded-2xl border-2 border-border bg-card shadow-xl focus-within:border-primary transition-colors">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search jobs, courses, or skills..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none text-base"
                  />
                </div>
                <Link
                  to={`/jobs?q=${searchQuery}`}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2 font-medium whitespace-nowrap"
                >
                  Find Jobs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <span className="text-xs text-muted-foreground">Trending:</span>
                {['ML Engineer', 'Cloud Architect', 'React Developer', 'DevOps'].map(tag => (
                  <Link
                    key={tag}
                    to={`/jobs?q=${tag}`}
                    className="text-xs px-3 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors bg-card"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/ai-match"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-primary/40 font-semibold text-base"
              >
                <Target className="w-5 h-5" />
                Try AI Resume Match
              </Link>
              <Link
                to="/learn"
                className="flex items-center gap-2 px-8 py-4 border-2 border-border rounded-xl hover:border-primary hover:text-primary transition-all font-semibold text-base"
              >
                <Play className="w-4 h-4" />
                Explore Courses
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              {[
                { icon: Shield, text: 'Verified Employers' },
                { icon: CheckCircle, text: 'Free to Start' },
                { icon: Globe, text: 'Global Opportunities' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-card/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, display, icon: Icon, color }) => (
              <div key={label} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 ${color} mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  <AnimatedCounter end={value} />
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Explore IT Categories</h2>
            <p className="text-muted-foreground">Find opportunities in the hottest tech domains</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/jobs?category=${cat.query}`}
                className="group p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-center"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.count.toLocaleString()} jobs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
              <p className="text-muted-foreground">Hot opportunities from top companies</p>
            </div>
            <Link to="/jobs" className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                    {job.logo}
                  </div>
                  <div className="flex gap-2">
                    {job.featured && <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent font-medium">Featured</span>}
                    {job.urgent && <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive font-medium">Urgent</span>}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{job.company} • {job.location}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">{skill}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">{job.type}</span>
                  <span className="text-primary font-semibold text-sm">{job.salary}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">How CareerDream Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From resume to dream job in 3 simple steps, powered by AI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/30 to-accent/30" />
            {howItWorks.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl`}>
                  {step.icon}
                </div>
                <div className="text-xs text-muted-foreground font-mono mb-2">{step.step}</div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Courses</h2>
              <p className="text-muted-foreground">Learn from top industry experts</p>
            </div>
            <Link to="/learn" className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <Link
                key={course.id}
                to={`/learn/${course.id}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all"
              >
                <div className={`h-44 bg-gradient-to-br ${course.color} flex items-center justify-center text-6xl relative`}>
                  {course.image}
                  {course.bestseller && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                      Bestseller
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-background/90 backdrop-blur rounded-lg text-xs font-medium">
                    {course.level}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-sm">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{course.duration} • {(course.students / 1000).toFixed(0)}k students</div>
                    <span className="text-lg font-bold text-primary">{course.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Success Stories</h2>
            <p className="text-muted-foreground">See what our community has achieved</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 text-center relative">
          <Target className="w-16 h-16 mx-auto mb-6 text-white opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Dream IT Career Starts Here
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join 200,000+ IT professionals who trusted CareerDream to find jobs, learn skills, and earn certifications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/jobs"
              className="px-8 py-4 bg-white text-primary rounded-xl hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl font-bold text-lg"
            >
              Browse Jobs Now
            </Link>
            <Link
              to="/assessments"
              className="px-8 py-4 bg-white/10 backdrop-blur border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all font-bold text-lg"
            >
              Take a Free Test
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
