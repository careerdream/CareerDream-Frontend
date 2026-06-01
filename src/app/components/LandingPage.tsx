import { Link } from 'react-router';
import { 
  Search, ArrowRight, TrendingUp, Users, 
  Award, Briefcase, BookOpen, Target, 
  ChevronRight, Zap, Shield, Globe, Star, 
  Play, CheckCircle, Loader2, Sparkles,
  MousePointer2, Laptop, Brain, Rocket, Calendar, User, Eye
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { SocialMediaBanner } from './SocialMediaBanner';

// --- Assets & Data ---
const categories = [
  { name: 'AI/ML', icon: '🤖', count: 890, color: 'from-[#8B5CF6] to-[#6D28D9]', query: 'AI/ML' },
  { name: 'Cloud', icon: '☁️', count: 1540, color: 'from-[#3B82F6] to-[#2563EB]', query: 'Cloud' },
  { name: 'Full Stack', icon: '💻', count: 2100, color: 'from-[#10B981] to-[#059669]', query: 'Full Stack' },
  { name: 'Data', icon: '📊', count: 1240, color: 'from-[#F59E0B] to-[#D97706]', query: 'Data Science' },
  { name: 'DevOps', icon: '⚙️', count: 720, color: 'from-[#EF4444] to-[#DC2626]', query: 'DevOps' },
  { name: 'Cyber', icon: '🔒', count: 650, color: 'from-[#475569] to-[#1E293B]', query: 'Cybersecurity' },
];

const stats = [
  { label: 'Annual Opportunities', value: 50000, display: '50K+', icon: Briefcase, color: 'primary' },
  { label: 'Global Talents', value: 200000, display: '200K+', icon: Users, color: 'accent' },
  { label: 'Premium Modules', value: 1500, display: '1,500+', icon: BookOpen, color: 'primary' },
  { label: 'Industry Badges', value: 500, display: '500+', icon: Award, color: 'accent' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'ML Lead at Google', text: 'CareerDream bridged the gap between my skills and industry standards. The AI-matching is eerily accurate.', avatar: '👩‍💻', rating: 5 },
  { name: 'Rahul Verma', role: 'Principal Architect at AWS', text: 'The depth of the curriculum and the quality of assessments are truly world-class. Highly recommended.', avatar: '👨‍💼', rating: 5 },
  { name: 'Ananya Patel', role: 'Staff Scientist at Meta', text: 'A completely personalized roadmap. Cracked the interviews at Meta thanks to their structured approach.', avatar: '👩‍🔬', rating: 5 },
];

// --- Sub-components ---

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const endVal = end;
          const step = (endVal / (duration * 60));
          const animate = () => {
             start += step;
             if (start < endVal) {
                setCount(Math.floor(start));
                requestAnimationFrame(animate);
             } else {
                setCount(endVal);
             }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 }
  }
};

import { fallbackPosts } from '../data/newsFallback';

// Featured Blog Posts Component
function FeaturedBlogSection() {
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await api.get('/blog/posts?limit=3');
        setFeaturedPosts(response.posts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  const postsToShow = featuredPosts.length > 0 ? featuredPosts : fallbackPosts.slice(0, 3);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading || postsToShow.length === 0) {
    return null;
  }

  return (
    <section className="py-32 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-y border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              <Sparkles className="w-3 h-3" /> Latest from IT World
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-4">Trending Tech Insights.</h2>
            <p className="text-lg text-muted-foreground font-medium">Direct updates from the global and Indian IT landscape. Stay ahead of the curve.</p>
          </div>
          <Link to="/news" className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all pb-2 border-b-2 border-primary shrink-0">
            View News Hub <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {postsToShow.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Link 
                to={`/news/${post.id}`} 
                className="group flex flex-col h-full p-8 rounded-[2.5rem] border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 shadow-md"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="space-y-3 border-t border-border/50 pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    {post.author.name === 'CareerDream Admin' ? (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-xs">CD</span>
                      </div>
                    ) : post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const nextSibling = (e.target as HTMLImageElement).nextElementSibling;
                          if (nextSibling) {
                            (nextSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
                        <span className="text-xs font-bold text-white">
                          {post.author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Fallback for broken image if needed */}
                    {post.author.name !== 'CareerDream Admin' && post.author.avatar && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent hidden items-center justify-center shadow-sm">
                        <span className="text-xs font-bold text-white">
                          {post.author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {post.author.name}
                      </p>
                      {post.author.title && (
                        <p className="text-xs text-muted-foreground">{post.author.title}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary font-semibold text-sm mt-4 group-hover:gap-3 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs, courses, isLoading } = useApp();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030213]">
         <div className="relative">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full" 
            />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
         </div>
      </div>
    );
  }

  const featuredJobs = jobs.filter(j => j.featured).slice(0, 3);
  const featuredCourses = courses.filter(c => c.bestseller || c.rating >= 4.8).slice(0, 3);

  return (
    <div className="bg-white dark:bg-[#030213] selection:bg-primary/30 scroll-smooth">
      {/* --- HERO SECTION: HIGH IMPACT --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] translate-y-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-primary/20 text-primary font-black uppercase tracking-[.25em] text-[10px] mb-10 shadow-lg">
              <Zap className="w-3 h-3 fill-current" />
              Revolutionizing Tech Careers
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-10"
            >
              Architect Your <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                Digital Destiny.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
            >
              Navigate the global IT landscape with precision. AI-curated roles, world-class learning modules, and elite performance tracking.
            </motion.p>

            {/* Premium Search Box */}
            <motion.div 
               variants={itemVariants}
               className="relative max-w-3xl mx-auto mb-16 p-2 bg-white dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] focus-within:ring-2 ring-primary/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-2">
                 <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Define your role... (e.g., Cloud Architect)"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-16 pr-6 py-5 bg-transparent focus:outline-none text-lg font-bold placeholder:text-muted-foreground/50 placeholder:font-medium"
                    />
                 </div>
                 <Link
                   to={`/jobs?q=${searchQuery}`}
                   className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-[1.8rem] font-black tracking-tight hover:shadow-[0_10px_30px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
                 >
                   <span className="relative z-10 flex items-center gap-2">Search Network <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></span>
                   <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                 </Link>
              </div>
            </motion.div>

            {/* Bottom Meta Stats */}
            <motion.div 
               variants={itemVariants}
               className="flex flex-wrap items-center justify-center gap-10 text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground/60"
            >
               <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30"><Laptop className="w-4 h-4 text-primary" /> 50K+ Active Roles</span>
               <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30"><Brain className="w-4 h-4 text-accent" /> AI Calibration</span>
               <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30"><Globe className="w-4 h-4 text-primary" /> Global Tier 1</span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Icons for Aesthetic */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-10 opacity-20 hidden lg:block"
        >
          <div className="w-20 h-20 rounded-3xl bg-primary rotate-12 flex items-center justify-center text-3xl shadow-2xl">🚀</div>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-10 opacity-20 hidden lg:block"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-accent -rotate-12 flex items-center justify-center text-4xl shadow-2xl text-white">💎</div>
        </motion.div>
      </section>

      {/* --- SOCIAL MEDIA HUB --- */}
      <SocialMediaBanner />

      {/* --- LATEST NEWS & INSIGHTS --- */}
      <FeaturedBlogSection />

      {/* --- ELITE STATS GRID --- */}
      <section className="py-24 relative overflow-hidden bg-card/10 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <motion.div 
                key={label} 
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} mb-6 group-hover:bg-${color} group-hover:text-white transition-all duration-500 shadow-xl`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2 tabular-nums whitespace-nowrap">
                  <AnimatedCounter end={value} />+
                </div>
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-loose">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TOPOLOGY CATEGORIES --- */}
      <section className="py-32 bg-white dark:bg-[#030213]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black tracking-tighter mb-4 leading-none">Sector Topologies.</h2>
              <p className="text-lg text-muted-foreground font-medium">Explore high-density opportunities across the most aggressive growth sectors in tech.</p>
            </div>
            <Link to="/jobs" className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all pb-2 border-b-2 border-primary">
              View All Sectors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link
                  to={`/jobs?category=${cat.query}`}
                  className="group block p-8 rounded-[2.5rem] border border-border bg-white dark:bg-card shadow-md hover:border-primary hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 text-center relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity`} />
                  <div className="text-5xl mb-6 scale-100 group-hover:scale-125 transition-transform duration-500">{cat.icon}</div>
                  <h3 className="font-black text-sm tracking-tight mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{cat.count} Roles</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED ROLES: PREMIUM LISTING --- */}
      <section className="py-32 bg-[#F8FAFC] dark:bg-[#05041a] border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                <Sparkles className="w-3 h-3" /> Handpicked Excellence
              </div>
              <h2 className="text-6xl font-black tracking-tighter leading-none mb-4">Premium Roles.</h2>
              <p className="text-lg text-muted-foreground font-medium">Verified opportunities from authorized partners and Tier-1 enterprises.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredJobs.map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={`/jobs/${job.id}`}
                  className="group flex flex-col h-full p-8 rounded-[3rem] border border-border bg-white dark:bg-card hover:border-primary shadow-md hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl shadow-lg ring-4 ring-primary/5">
                      {job.logo}
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-primary/10 text-primary">Priority Agent</span>
                    </div>
                  </div>
                  
                  <h3 className="font-black text-2xl tracking-tight mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="text-sm font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    {job.company} <span className="w-1 h-1 rounded-full bg-border" /> {job.location}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {job.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Package</span>
                      <span className="text-lg font-black text-foreground">{job.salary}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-md">
                        <ArrowRight className="w-5 h-5 font-bold" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/jobs" className="inline-flex items-center gap-2 px-10 py-5 bg-[#030213] dark:bg-white dark:text-[#030213] text-white rounded-[2rem] font-bold text-sm tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Access Full Pipeline <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS: PRECISION WORKFLOW --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black tracking-tighter mb-6">Execution Pipeline.</h2>
            <p className="text-muted-foreground font-medium">A systematic approach to career acceleration, optimized for the highest success velocity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Connected Line */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            
            {[
              { step: 'Phase 01', title: 'Data Ingestion', desc: 'AI analyzes your latent skills and career DNA from your professional history.', icon: '🧠', color: 'primary' },
              { step: 'Phase 02', title: 'Calibration', desc: 'Synthesize learning paths and job matches tuned to market frequency.', icon: '⚖️', color: 'accent' },
              { step: 'Phase 03', title: 'Deployment', desc: 'Direct application through priority agency channels with verified credentials.', icon: '🚢', color: 'primary' },
            ].map((p, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center relative group"
              >
                <div className="relative mb-10 w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="relative w-full h-full flex items-center justify-center text-5xl drop-shadow-2xl">
                    {p.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-[#030213] text-white flex items-center justify-center font-black text-xs border-4 border-white dark:border-[#030213] shadow-lg">
                    {p.step.split(' ')[1]}
                  </div>
                </div>
                <h3 className="font-black text-2xl tracking-tighter mb-4">{p.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed px-4">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS: REPUTATION --- */}
      <section className="py-32 bg-card/10 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
             <div className="text-primary font-black uppercase tracking-widest text-xs mb-4">Reputation Matters</div>
             <h2 className="text-5xl font-black tracking-tighter">Global Community Feedback.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white dark:bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-1 mb-8">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-bold italic text-foreground mb-10 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg ring-4 ring-primary/5">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-black text-sm">{t.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* --- FINAL CONVERSION: THE DECISION --- */}
      <section className="py-[12rem] relative bg-[#030213] overflow-hidden">
        {/* Intense Light Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-60" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="w-24 h-24 mx-auto mb-10 rounded-[2rem] bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)]">
              <Rocket className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Shift Your <br/>
              Velocity.
            </h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
              Join the ecosystem where 200,000+ pioneers are mapping the future of tech. Your next era begins with one search.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/jobs"
                className="group relative px-12 py-6 bg-white text-[#030213] rounded-[2.2rem] font-black text-lg transition-all hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">Initialize Search <ArrowRight className="w-5 h-5" /></span>
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link
                to="/assessments"
                className="px-12 py-6 bg-white/5 backdrop-blur-3xl border border-white/20 text-white rounded-[2.2rem] font-black text-lg hover:bg-white/10 transition-all"
              >
                Benchmark Skills
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
