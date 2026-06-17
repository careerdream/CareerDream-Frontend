import { useParams, Link } from 'react-router';
import { MapPin, Briefcase, DollarSign, Clock, Building, Users, TrendingUp, Bookmark, Share2, ArrowLeft, CheckCircle, Plus, ExternalLink, Loader2, MessageCircle, Linkedin, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useData } from '../hooks/useData';
import { Job } from '../data/jobs';
import { getWatermark, formatShareMessage } from '../utils/watermark';
import { toast } from 'sonner';

export function JobDetailPage() {
  const { id } = useParams();
  const { user, savedJobIds, toggleSaveJob, applyToJob, appliedJobIds, isLoggedIn, setUnlockModalOpen } = useApp();
  const { data: fetchedJobs, loading: isLoading } = useData<Job[]>('/jobs');
  const jobs = fetchedJobs || [];
  const [showApply, setShowApply] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  if (isLoading || jobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const job = jobs.find(j => j.id === Number(id));
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-3xl font-black mb-4">Job Not Found</h2>
        <Link to="/jobs" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Jobs
        </Link>
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = appliedJobIds.includes(job.id);
  const related = jobs.filter(j => j.id !== job.id && (j.category === job.category || j.type === job.type)).slice(0, 3);

  const handleOpenApplyModal = () => {
    if (!isLoggedIn) {
      setUnlockModalOpen(true);
      return;
    }
    if (job.externalUrl) {
      window.open(job.externalUrl, '_blank');
      applyToJob(job.id);
      return;
    }
    setShowApply(true);
  };

  const handleApply = async () => {

    if (job.externalUrl) {
      window.open(job.externalUrl, '_blank');
      applyToJob(job.id);
      return;
    }
    
    // Application with watermark logic
    const watermarkText = getWatermark(user?.name || 'Candidate');
    console.log('Applying with watermark:', watermarkText);
    
    await applyToJob(job.id);
    setShowApply(false);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header / Progress Scroll could go here */}
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/jobs" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-all text-sm font-bold">
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to All Roles
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-border flex items-center justify-center text-5xl md:text-6xl shadow-2xl">
                {job.logo}
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                    {job.type}
                  </span>
                  {job.featured && (
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest border border-destructive/20">
                      Urgent Hiring
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-bold text-sm">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {job.posted_at ? `Posted ${Math.floor((Date.now() - new Date(job.posted_at).getTime()) / (1000 * 60 * 60 * 24))} days ago` : `Posted ${job.posted}`}</span>
                  <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> {job.stats?.applicants_count ?? job.applicants} Applied</span>
                  {job.stats?.views_count && <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> {job.stats.views_count} Views</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4">
              {job.externalUrl ? (
                <a
                  href={job.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (!isApplied) {
                      applyToJob(job.id);
                    }
                  }}
                  className="px-10 py-4 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2 text-center whitespace-nowrap w-full sm:w-auto"
                >
                  Apply on company site <ExternalLink className="w-4 h-4" />
                </a>
              ) : isApplied ? (
                <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20 font-black text-xs uppercase tracking-widest whitespace-nowrap w-full sm:w-auto">
                  <CheckCircle className="w-5 h-5 shrink-0" /> Application Received
                </div>
              ) : (
                <button
                  onClick={handleOpenApplyModal}
                  className="px-10 py-4 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
                >
                  Apply Now
                </button>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                    isSaved 
                      ? 'bg-primary border-primary text-foreground shadow-xl shadow-primary/20' 
                      : 'bg-card border-border hover:border-primary text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="w-14 h-14 rounded-2xl bg-card border border-border hover:border-border text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tighter">About the Opportunity</h2>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                {job.description}
              </p>
            </section>

            <section className="space-y-8">
              <h3 className="text-2xl font-black tracking-tighter">Responsibilities</h3>
              <div className="grid gap-4">
                {(job.responsibilities || []).map((item: string, i: number) => (
                  <div key={i} className="flex gap-4 p-6 rounded-3xl bg-card border border-border/50 hover:border-border transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                       <CheckCircle className="w-5 h-5" />
                    </div>
                    <p className="text-muted-foreground font-bold leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-2xl font-black tracking-tighter">Requirements</h3>
              <div className="space-y-4">
                {(job.requirements || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs font-black text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all">
                      {i + 1}
                    </div>
                    <p className="text-muted-foreground font-bold">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-border">
               <h3 className="text-2xl font-black tracking-tighter mb-8">Perks & Benefits</h3>
               <div className="grid md:grid-cols-2 gap-4">
                  {(job.benefits || []).map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="font-bold text-sm">{benefit}</span>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <aside className="space-y-10">
            <div className="p-8 rounded-[2.5rem] bg-card border border-border space-y-8">
              <h3 className="text-xl font-black tracking-tight">Role Summary</h3>
              <div className="space-y-6">
                {[
                  { icon: DollarSign, label: 'Annual Compensation', value: job.salary },
                  { icon: Briefcase, label: 'Job Category', value: job.category },
                  { icon: TrendingUp, label: 'Experience Level', value: job.experience },
                  { icon: Users, label: 'Total Applicants', value: `${job.stats?.applicants_count ?? job.applicants} Applied` },
                  { icon: TrendingUp, label: 'Total Views', value: `${job.stats?.views_count ?? 0} Views` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                      <p className="font-black text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-border/50">
                 <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Required Expertise</h4>
                 <div className="flex flex-wrap gap-2">
                    {(job.skills || []).map((skill: string) => (
                      <span key={skill} className="px-3 py-1.5 rounded-xl bg-card border border-border/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                 </div>
              </div>
            </div>

            {/* Quick Apply Card */}
            {(job.externalUrl || !isApplied) && (
              <div className="p-8 rounded-[2.5rem] bg-foreground text-background shadow-2xl space-y-6">
                <h3 className="text-2xl font-black tracking-tighter">Ready to join?</h3>
                <p className="font-bold text-sm leading-relaxed opacity-70">
                  {job.company} is actively looking for candidates with your profile. Apply today to start the conversation.
                </p>
                {job.externalUrl ? (
                  <a
                    href={job.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (!isApplied) {
                        applyToJob(job.id);
                      }
                    }}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/20 block text-center"
                  >
                    Apply on company site
                  </a>
                ) : (
                  <button 
                    onClick={handleOpenApplyModal}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/20"
                  >
                    Send Application
                  </button>
                )}
              </div>
            )}

            {/* Similar Roles */}
            {related.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-black tracking-tight">Similar Opportunities</h3>
                <div className="grid gap-4">
                  {related.map(rel => (
                    <Link key={rel.id} to={`/jobs/${rel.id}`} className="group p-5 rounded-[2rem] bg-card border border-border hover:border-primary/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {rel.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm truncate group-hover:text-primary transition-colors">{rel.title}</p>
                          <p className="text-xs text-muted-foreground font-bold">{rel.company}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Premium Apply Modal */}
      {showApply && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowApply(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-2xl bg-popover border border-border rounded-[3rem] p-10 shadow-2xl overflow-hidden"
          >
            {/* Modal Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter">Join {job.company}</h2>
                  <p className="text-muted-foreground font-bold text-sm mt-1">Role: {job.title}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-3xl">
                   {job.logo}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Official Resume</label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={e => setResume(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full py-12 border-2 border-dashed border-border rounded-[2rem] bg-card flex flex-col items-center justify-center gap-4 group-hover:border-primary/50 transition-all">
                      <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all">
                        <Plus className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-sm uppercase tracking-widest mb-1">
                          {resume ? resume.name : 'Select Document'}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-bold">PDF or DOCX • Max 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Candidate Pitch (Optional)</label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={e => setCoverLetter(e.target.value)}
                    placeholder="Briefly tell the hiring team why you are the perfect fit..."
                    className="w-full p-6 rounded-[2rem] bg-card border border-border focus:border-primary/50 focus:outline-none text-sm font-medium resize-none transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowApply(false)} 
                    className="flex-1 py-4 rounded-2xl border border-border font-black text-xs uppercase tracking-widest hover:bg-card transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={handleApply} 
                    disabled={!resume && !job.externalUrl}
                    className="flex-[2] py-4 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Submit Application
                  </button>
                </div>
                
                <p className="text-center text-[10px] text-muted-foreground font-bold opacity-50">
                  By applying, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowShareModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-sm bg-[#0a0a1a] border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Share this Job</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'WhatsApp', icon: MessageCircle, color: 'hover:text-green-500', url: `https://wa.me/?text=${encodeURIComponent(`${job.title}\n\n🌐 Job posted on CareerDream.in : ${window.location.href}\n\nStay connected with us:\n\n🌐 Website https://www.CareerDream.in\n🎥 YouTube https://lnkd.in/gfwz2Pg6\n📢 WhatsApp Channel https://lnkd.in/g3jVSK3S\n🔗 LinkedIn https://lnkd.in/gFhQEQZm`)}` },
                { name: 'LinkedIn', icon: Linkedin, color: 'hover:text-blue-600', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                { name: 'Twitter', icon: Twitter, color: 'hover:text-sky-400', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${job.title}\n\n🌐 Job posted on CareerDream.in : ${window.location.href}\n\nStay connected with us:\n\n🌐 Website https://www.CareerDream.in\n🎥 YouTube https://lnkd.in/gfwz2Pg6\n📢 WhatsApp Channel https://lnkd.in/g3jVSK3S\n🔗 LinkedIn https://lnkd.in/gFhQEQZm`)}` },
                { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-700', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
              ].map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all ${link.color} text-white`}
                >
                  <link.icon className="w-8 h-8" />
                  <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                </a>
              ))}
              
              <button
                onClick={() => {
                  const skillsText = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || 'N/A';
                  const fullText = `*${job.title}*\n🏢 ${job.company}\n📍 ${job.location}\n💰 ${job.salary}\n\n*Requirements:*\n- Experience: ${job.experience}\n- Job Type: ${job.type}\n- Skills: ${skillsText}\n\n*Description:*\n${job.description}\n\n🌐 Apply here: ${window.location.href}\n\nStay connected with us:\n\n🌐 Website https://www.CareerDream.in\n🎥 YouTube https://lnkd.in/gfwz2Pg6\n📢 WhatsApp Channel https://lnkd.in/g3jVSK3S\n🔗 LinkedIn https://lnkd.in/gFhQEQZm`;
                  navigator.clipboard.writeText(fullText);
                  toast.success("Full job details copied successfully! Go ahead and paste it on LinkedIn, WhatsApp, or Facebook.");
                }}
                className="col-span-2 flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-white hover:opacity-90 transition-all"
              >
                <Share2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">Copy Full Details & Share</span>
              </button>

              <button
                onClick={() => {
                  const shareMsg = `${job.title}\n\n🌐 Job posted on CareerDream.in : ${window.location.href}\n\nStay connected with us:\n\n🌐 Website https://www.CareerDream.in\n🎥 YouTube https://lnkd.in/gfwz2Pg6\n📢 WhatsApp Channel https://lnkd.in/g3jVSK3S\n🔗 LinkedIn https://lnkd.in/gFhQEQZm`;
                  navigator.clipboard.writeText(shareMsg);
                  toast.success('Link & Socials copied to clipboard!');
                }}
                className="col-span-2 flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Copy Job Link</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

