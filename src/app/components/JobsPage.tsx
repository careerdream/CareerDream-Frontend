import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Filter, MapPin, DollarSign, Briefcase, Clock, Bookmark, Search, ChevronDown, X, SlidersHorizontal, Loader2, Share2, Check, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { JobType, ExperienceLevel } from '../data/jobs';
import { useApp } from '../context/AppContext';

const JOB_TYPES: JobType[] = ['Remote', 'Full-time', 'Contract', 'Government', 'Abroad', 'Internship'];
const EXP_LEVELS: ExperienceLevel[] = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'];
const CATEGORIES = ['All', 'AI/ML', 'Cloud', 'Full Stack', 'Data Science', 'Data Engineering', 'Backend', 'Frontend', 'Mobile', 'DevOps', 'Cybersecurity', 'Product', 'Government'];
const SORT_OPTIONS = ['Most Recent', 'Salary: High to Low', 'Salary: Low to High', 'Most Applicants'];

const difficultyColor: Record<string, string> = {
  Remote: 'bg-green-500/20 text-green-600 dark:text-green-400',
  'Full-time': 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  Contract: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
  Government: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
  Abroad: 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
  Internship: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
};

export function JobsPage() {
  const { savedJobIds, appliedJobIds, toggleSaveJob, jobs, isLoading, isLoggedIn } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedLevels, setSelectedLevels] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterMode, setFilterMode] = useState<'all' | 'saved' | 'applied'>('all');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 8;

  const toggleSet = (set: Set<string>, setFn: (s: Set<string>) => void, val: string) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setFn(next);
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...jobs];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        (Array.isArray(j.skills) && j.skills.some(s => s.toLowerCase().includes(q))) ||
        j.location.toLowerCase().includes(q)
      );
    }
    if (selectedTypes.size > 0) result = result.filter(j => selectedTypes.has(j.type));
    if (selectedLevels.size > 0) result = result.filter(j => selectedLevels.has(j.experience));
    if (selectedCategory !== 'All') result = result.filter(j => j.category === selectedCategory || j.type === selectedCategory);
    
    if (filterMode === 'saved') result = result.filter(j => savedJobIds.includes(j.id));
    if (filterMode === 'applied') result = result.filter(j => appliedJobIds.includes(j.id));

    switch (sortBy) {
      case 'Salary: High to Low': 
        result.sort((a, b) => {
          const valA = parseInt(a.salary.replace(/[^0-9]/g, '')) || 0;
          const valB = parseInt(b.salary.replace(/[^0-9]/g, '')) || 0;
          return valB - valA;
        }); 
        break;
      case 'Salary: Low to High': 
        result.sort((a, b) => {
          const valA = parseInt(a.salary.replace(/[^0-9]/g, '')) || 0;
          const valB = parseInt(b.salary.replace(/[^0-9]/g, '')) || 0;
          return valA - valB;
        }); 
        break;
      case 'Most Applicants': 
        result.sort((a, b) => (b.stats?.applicants_count || 0) - (a.stats?.applicants_count || 0)); 
        break;
      default: 
        result.sort((a, b) => {
          const dateA = a.posted_at ? new Date(a.posted_at).getTime() : 0;
          const dateB = b.posted_at ? new Date(b.posted_at).getTime() : 0;
          return dateB - dateA;
        });
    }
    return result;
  }, [searchQuery, selectedTypes, selectedLevels, selectedCategory, sortBy, filterMode, savedJobIds, appliedJobIds]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const clearFilters = () => {
    setSelectedTypes(new Set());
    setSelectedLevels(new Set());
    setSelectedCategory('All');
    setSearchQuery('');
    setFilterMode('all');
    setCurrentPage(1);
  };

  const activeFilterCount = selectedTypes.size + selectedLevels.size + (selectedCategory !== 'All' ? 1 : 0) + (filterMode !== 'all' ? 1 : 0);

  const handleShare = async (job: any) => {
    const shareData = {
      title: job.title,
      text: `Check out this job at ${job.company} on CareerDream!`,
      url: `${window.location.origin}/jobs/${job.id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Job link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20 border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block">
                World-Class Opportunities
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6">
                Your Next Big <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">Career Move</span> Starts Here.
              </h1>
              <p className="text-xl text-muted-foreground font-medium mb-10 max-w-2xl">
                Connect with elite tech companies. Filter through {jobs.length}+ premium roles tailored to your expertise.
              </p>
            </motion.div>

            {/* Premium Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 p-2 bg-card backdrop-blur-xl border border-border rounded-[2.5rem] shadow-2xl"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title, skill, or company..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-14 pr-6 py-5 bg-transparent focus:outline-none text-lg font-medium"
                />
              </div>
              <div className="hidden md:block w-px h-10 bg-muted my-auto" />
              <button
                onClick={clearFilters}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-[2rem] font-bold transition-all ${
                  activeFilterCount > 0
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-muted text-foreground border border-border'
                }`}
              >
                <X className="w-4 h-4" />
                Clear Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 w-6 h-6 rounded-full bg-foreground text-primary text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
  <button onClick={() => setShowFilters(true)} className="lg:hidden mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
    Filters
  </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className={`lg:col-span-1 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'} ${showFilters ? 'fixed inset-0 z-40 bg-background/95 backdrop-blur p-4 overflow-y-auto lg:static lg:bg-transparent lg:p-0' : ''}`}>
            <div className="flex justify-between items-center mb-4 lg:hidden">
  <button onClick={() => setShowFilters(false)} className="text-sm font-medium text-primary">Close</button>
</div>
<div className="space-y-10 sticky top-32">
              {/* Filter Modes */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">My Activity</h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { setFilterMode('all'); setCurrentPage(1); }}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all font-bold text-sm ${filterMode === 'all' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                  >
                    <Briefcase className="w-4 h-4" /> All Jobs
                  </button>
                  <button
                    onClick={() => { setFilterMode('saved'); setCurrentPage(1); }}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all font-bold text-sm ${filterMode === 'saved' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                  >
                    <Bookmark className="w-4 h-4" /> Saved Jobs
                    {savedJobIds.length > 0 && <span className="ml-auto text-xs opacity-60">{savedJobIds.length}</span>}
                  </button>
                  <button
                    onClick={() => { setFilterMode('applied'); setCurrentPage(1); }}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all font-bold text-sm ${filterMode === 'applied' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                  >
                    <Check className="w-4 h-4" /> Applied Jobs
                    {appliedJobIds.length > 0 && <span className="ml-auto text-xs opacity-60">{appliedJobIds.length}</span>}
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        selectedCategory === cat 
                          ? 'bg-accent/20 border-accent text-accent shadow-lg shadow-accent/10' 
                          : 'bg-card border-border/50 hover:border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Types */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Work Arrangement</h3>
                <div className="space-y-3">
                  {JOB_TYPES.map(type => (
                    <div key={type} onClick={() => toggleSet(selectedTypes, setSelectedTypes, type)} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedTypes.has(type) ? 'bg-primary border-primary' : 'bg-card border-border group-hover:border-primary'}`}
                      >
                        {selectedTypes.has(type) && <Check className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${selectedTypes.has(type) ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Levels */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Experience Level</h3>
                <div className="space-y-3">
                  {EXP_LEVELS.map(level => (
                    <div key={level} onClick={() => toggleSet(selectedLevels, setSelectedLevels, level)} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedLevels.has(level) ? 'bg-primary border-primary' : 'bg-card border-border group-hover:border-primary'}`}
                      >
                        {selectedLevels.has(level) && <Check className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${selectedLevels.has(level) ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-4">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">
                  {filterMode === 'saved' ? 'Your Saved Roles' : filterMode === 'applied' ? 'Applications Sent' : 'Featured Opportunities'}
                </h2>
                <p className="text-muted-foreground text-sm font-medium mt-1">
                  Showing {filtered.length} curated matches
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Sort By</span>
                 <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-card border border-border rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer pr-10 relative"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                >
                  {SORT_OPTIONS.map(o => <option key={o} value={o} className="bg-popover">{o}</option>)}
                </select>
              </div>
            </div>

            {paginated.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-card border border-dashed border-border rounded-[3rem]"
              >
                <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-2xl font-black mb-2">No roles match your criteria</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 transition-all">
                  Reset Search
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {paginated.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group p-8 rounded-[2.5rem] bg-card border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex flex-col md:flex-row gap-8 relative z-10">
                      {/* Logo Section */}
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-border flex items-center justify-center text-4xl shadow-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        {job.logo}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Link to={`/jobs/${job.id}`} className="text-2xl font-black tracking-tight hover:text-primary transition-colors leading-tight">
                                {job.title}
                              </Link>
                              {appliedJobIds.includes(job.id) && (
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/30 flex items-center gap-1.5">
                                  <Check className="w-3 h-3" /> Applied
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground font-bold flex items-center gap-2">
                              {job.company} <span className="w-1 h-1 rounded-full bg-muted-foreground/20" /> {job.location}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                                savedJobIds.includes(job.id)
                                  ? 'bg-primary border-primary text-foreground shadow-lg shadow-primary/20'
                                  : 'bg-card border-border hover:border-primary text-muted-foreground hover:text-primary'
                              }`}
                            >
                              <Bookmark className={`w-5 h-5 ${savedJobIds.includes(job.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => handleShare(job)}
                              className="w-12 h-12 rounded-2xl bg-card border border-border hover:border-border text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
                            >
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/50 text-xs font-bold">
                            <Briefcase className="w-3.5 h-3.5 text-primary" /> {job.type}
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/50 text-xs font-bold">
                            <DollarSign className="w-3.5 h-3.5 text-accent" /> {job.salary}
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/50 text-xs font-bold text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" /> {job.posted_at ? `Posted ${Math.floor((Date.now() - new Date(job.posted_at).getTime()) / (1000 * 60 * 60 * 24))} days ago` : job.posted}
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/50 text-xs font-bold text-muted-foreground">
                            <Users className="w-3.5 h-3.5" /> {job.stats?.applicants_count ?? job.applicants} Applied
                          </div>
                          {job.matchScore && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-black">
                              <TrendingUp className="w-3.5 h-3.5" /> {job.matchScore}% Match
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(job.skills) && job.skills.slice(0, 4).map(skill => (
                              <span key={skill} className="px-4 py-1.5 rounded-full bg-card border border-border/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                                {skill}
                              </span>
                            ))}
                            {Array.isArray(job.skills) && job.skills.length > 4 && (
                              <span className="px-3 py-1.5 text-[10px] font-black text-muted-foreground">+{job.skills.length - 4} More</span>
                            )}
                          </div>
                          <Link
                            to={`/jobs/${job.id}`}
                            className="ml-auto px-8 py-3 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all transform group-hover:translate-x-1 shadow-xl whitespace-nowrap"
                          >
                            View Role Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center gap-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-14 h-14 rounded-2xl font-black text-sm transition-all border ${
                      page === currentPage
                        ? 'bg-primary border-primary text-foreground shadow-xl shadow-primary/20'
                        : 'bg-card border-border text-muted-foreground hover:border-border hover:text-foreground'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

