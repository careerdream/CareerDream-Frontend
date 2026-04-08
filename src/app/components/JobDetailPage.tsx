import { useParams, Link } from 'react-router';
import { MapPin, Briefcase, DollarSign, Clock, Building, Users, TrendingUp, Bookmark, Share2, ArrowLeft, CheckCircle, Plus, ExternalLink, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export function JobDetailPage() {
  const { id } = useParams();
  const { savedJobIds, toggleSaveJob, applyToJob, appliedJobIds, jobs, isLoading } = useApp();
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  if (isLoading || jobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      </div>
    );
  }

  const job = jobs.find(j => j.id === Number(id));
  
  if (!job) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Job Not Found</div>;
  }
  const isSaved = savedJobIds.includes(job.id);
  const isApplied = appliedJobIds.includes(job.id) || applied;
  const related = jobs.filter(j => j.id !== job.id && (j.category === job.category || j.type === job.type)).slice(0, 3);

  const handleApply = () => {
    applyToJob(job.id);
    setApplied(true);
    setShowApply(false);
  };

  const typeColor: Record<string, string> = {
    Remote: 'bg-green-500/20 text-green-600 dark:text-green-400',
    'Full-time': 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
    Contract: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
    Government: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
    Abroad: 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex items-start gap-5 flex-1">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl shadow-xl flex-shrink-0">
                {job.logo}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColor[job.type] ?? 'bg-muted text-muted-foreground'}`}>{job.type}</span>
                  {job.featured && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">Featured</span>}
                  {job.urgent && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">Urgent Hiring</span>}
                </div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1.5"><Building className="w-4 h-4" />{job.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{job.experience}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />Posted {job.posted}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-stretch lg:w-52">
              {isApplied ? (
                <div className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-green-500/20 text-green-600 dark:text-green-400 font-semibold border border-green-500/30">
                  <CheckCircle className="w-5 h-5" /> Applied!
                </div>
              ) : (
                <button
                  onClick={() => setShowApply(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-primary/30 font-semibold"
                >
                  Apply Now
                </button>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${isSaved ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary'}`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button className="p-3 rounded-xl border border-border hover:border-primary transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">About the Role</h2>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to Have */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">Nice to Have</h2>
              <ul className="space-y-2">
                {job.niceToHave.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Plus className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">Benefits & Perks</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-muted/30">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">About {job.company}</h2>
              <p className="text-muted-foreground leading-relaxed">{job.aboutCompany}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary Card */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-4">Job Summary</h3>
              <div className="space-y-4">
                {[
                  { icon: DollarSign, label: 'Salary', value: job.salary },
                  { icon: MapPin, label: 'Location', value: job.location },
                  { icon: Briefcase, label: 'Job Type', value: job.type },
                  { icon: TrendingUp, label: 'Experience', value: job.experience },
                  { icon: Users, label: 'Applicants', value: `${job.applicants} applied` },
                  { icon: Clock, label: 'Posted', value: job.posted },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-semibold text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm rounded-xl bg-primary/10 text-primary border border-primary/20 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
              <h3 className="font-bold text-lg mb-2">Ready to Apply?</h3>
              <p className="text-sm opacity-90 mb-4">Join the team and work on exciting projects that matter.</p>
              {isApplied ? (
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle className="w-5 h-5" /> Application Submitted!
                </div>
              ) : (
                <button
                  onClick={() => setShowApply(true)}
                  className="w-full py-3 bg-white text-primary rounded-xl hover:bg-white/90 transition-all font-bold shadow-lg"
                >
                  Apply for this Position
                </button>
              )}
            </div>

            {/* Similar Jobs */}
            {related.length > 0 && (
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-bold mb-4">Similar Jobs</h3>
                <div className="space-y-3">
                  {related.map(rel => (
                    <Link key={rel.id} to={`/jobs/${rel.id}`} className="block p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
                          {rel.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{rel.title}</p>
                          <p className="text-xs text-muted-foreground">{rel.company}</p>
                          <p className="text-xs text-primary">{rel.salary}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowApply(false)} />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold mb-1">Apply: {job.title}</h2>
            <p className="text-muted-foreground text-sm mb-5">{job.company} • {job.location}</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Cover Letter</label>
                <textarea
                  rows={5}
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Tell us why you're a great fit for this role..."
                  className="w-full p-3 rounded-xl border border-border bg-input-background resize-none focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowApply(false)} className="flex-1 py-3 rounded-xl border border-border hover:border-primary transition-colors text-sm font-medium">
                  Cancel
                </button>
                <button onClick={handleApply} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-all text-sm font-semibold shadow-lg">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
