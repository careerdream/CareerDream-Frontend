import { SEO } from "./SEO";
import { CheckCircle, X, ArrowRight, Zap, Target, Users, Shield } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export function PricingPage() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <SEO 
        title="Pricing & Plans | CareerDream" 
        description="Transparent pricing for both IT candidates and recruiters. Choose the plan that fits your career goals or hiring needs." 
        keywords="Pricing, Subscriptions, Recruiter Plans, Candidate Premium" 
      />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden border-b border-border/50 bg-[#030213]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6 border border-primary/20">
              Clear & Transparent
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
              Invest in Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Future.</span>
            </h1>
            <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
              Whether you are an ambitious professional or a fast-scaling tech enterprise, we have a plan designed for your velocity.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tighter mb-4">For Candidates</h2>
          <p className="text-muted-foreground font-medium max-w-xl mx-auto">Accelerate your tech career with premium insights and priority applications.</p>
        </div>

        {/* Candidate Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-32">
          {/* Free Tier */}
          <div className="p-8 rounded-[3rem] bg-card border border-border flex flex-col h-full shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-2">Basic</h3>
              <p className="text-muted-foreground text-sm">Essential tools to get started.</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-black">Free</span>
              <span className="text-muted-foreground font-medium"> / forever</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Access to all public job listings', 'Basic resume parsing', 'Free CareerDream Original courses', 'Standard application tracking'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {['Priority applications', 'AI Mock Interviews', 'Direct Recruiter Messaging'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground opacity-60">
                  <X className="w-5 h-5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/signup" className="w-full py-4 rounded-2xl bg-muted text-foreground font-bold text-center hover:bg-muted/80 transition-colors">
              Get Started Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="relative p-8 rounded-[3rem] bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary flex flex-col h-full shadow-xl shadow-primary/10 scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-2 text-primary">Pro Talent</h3>
              <p className="text-muted-foreground text-sm">For ambitious professionals seeking an edge.</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-black">₹499</span>
              <span className="text-muted-foreground font-medium"> / month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Everything in Basic', 'Priority application routing (Top 5%)', 'AI Mock Interviews & Resume Analysis', 'Direct recruiter messaging', 'Advanced skill benchmarking', 'Salary insights & negotiation guides'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/signup?plan=pro" className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-center shadow-lg hover:opacity-90 transition-opacity">
              Upgrade to Pro
            </Link>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-24" />

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl mb-4">
            <Users className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-4">For Employers & Recruiters</h2>
          <p className="text-muted-foreground font-medium max-w-xl mx-auto">Hire top-tier 1% pre-vetted tech talent with AI-driven matching.</p>
        </div>

        {/* Recruiter Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Pay As You Go */}
          <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-md">
            <h3 className="text-xl font-bold mb-2">Pay-Per-Post</h3>
            <div className="mb-6"><span className="text-3xl font-black">₹2,999</span><span className="text-muted-foreground text-sm"> / job</span></div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> 30-day listing</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Basic AI screening</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Standard visibility</li>
            </ul>
            <Link to="/recruiter/signup" className="block w-full py-3 rounded-xl border border-border text-center font-bold hover:bg-muted transition-colors">Start Hiring</Link>
          </div>

          {/* Scale */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-accent/10 to-transparent border border-accent/30 shadow-lg relative transform md:-translate-y-4">
            <div className="absolute top-0 right-0 p-4"><Zap className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-bold mb-2 text-accent">Scale</h3>
            <div className="mb-6"><span className="text-3xl font-black">₹19,999</span><span className="text-muted-foreground text-sm"> / month</span></div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0" /> Unlimited active jobs</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0" /> Priority algorithm ranking</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0" /> Access to candidate database</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0" /> Dedicated account manager</li>
            </ul>
            <Link to="/recruiter/signup" className="block w-full py-3 rounded-xl bg-accent text-white text-center font-bold shadow-md hover:bg-accent/90 transition-colors">Choose Scale</Link>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-md">
            <div className="absolute top-0 right-0 p-4"><Shield className="w-6 h-6 text-muted-foreground" /></div>
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <div className="mb-6"><span className="text-3xl font-black">Custom</span></div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Custom API integrations (ATS)</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Custom coding assessments</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Whitelabeled employer branding</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Volume discounts</li>
            </ul>
            <Link to="/contact" className="block w-full py-3 rounded-xl border border-border text-center font-bold hover:bg-muted transition-colors">Contact Sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
