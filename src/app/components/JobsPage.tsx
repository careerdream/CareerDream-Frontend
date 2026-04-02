import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Filter, MapPin, DollarSign, Briefcase, Clock, Bookmark, Search, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { jobs, JobType, ExperienceLevel } from '../data/jobs';
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
  const { savedJobIds, toggleSaveJob } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedLevels, setSelectedLevels] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');
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
        j.skills.some(s => s.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q)
      );
    }
    if (selectedTypes.size > 0) result = result.filter(j => selectedTypes.has(j.type));
    if (selectedLevels.size > 0) result = result.filter(j => selectedLevels.has(j.experience));
    if (selectedCategory !== 'All') result = result.filter(j => j.category === selectedCategory || j.type === selectedCategory);

    switch (sortBy) {
      case 'Salary: High to Low': result.sort((a, b) => b.salaryMax - a.salaryMax); break;
      case 'Salary: Low to High': result.sort((a, b) => a.salaryMin - b.salaryMin); break;
      case 'Most Applicants': result.sort((a, b) => b.applicants - a.applicants); break;
      default: result.sort((a, b) => a.postedDays - b.postedDays);
    }
    return result;
  }, [searchQuery, selectedTypes, selectedLevels, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const clearFilters = () => {
    setSelectedTypes(new Set());
    setSelectedLevels(new Set());
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFilterCount = selectedTypes.size + selectedLevels.size + (selectedCategory !== 'All' ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-2">Find Your Dream IT Job</h1>
          <p className="text-muted-foreground mb-6">Discover {jobs.length}+ opportunities from top companies worldwide</p>

          {/* Search */}
          <div className="flex gap-3 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by job title, skills, or company..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 font-medium transition-all ${showFilters ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:border-primary'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-background/80 border border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 space-y-6">
              <div className="p-5 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Filters</h3>
                  </div>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-destructive hover:underline flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-sm mb-3">Job Type</h4>
                    <div className="space-y-2">
                      {JOB_TYPES.map(type => (
                        <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedTypes.has(type)}
                            onChange={() => toggleSet(selectedTypes, setSelectedTypes, type)}
                            className="w-4 h-4 rounded border-border text-primary"
                          />
                          <span className="text-sm group-hover:text-primary transition-colors">{type}</span>
                          <span className={`ml-auto px-1.5 py-0.5 rounded-full text-xs ${difficultyColor[type] ?? 'bg-muted text-muted-foreground'}`}>
                            {jobs.filter(j => j.type === type).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="font-medium text-sm mb-3">Experience Level</h4>
                    <div className="space-y-2">
                      {EXP_LEVELS.map(level => (
                        <label key={level} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedLevels.has(level)}
                            onChange={() => toggleSet(selectedLevels, setSelectedLevels, level)}
                            className="w-4 h-4 rounded border-border text-primary"
                          />
                          <span className="text-sm group-hover:text-primary transition-colors">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                <h3 className="font-semibold mb-1">Upload Resume</h3>
                <p className="text-xs opacity-90 mb-3">Get AI-matched to jobs that fit your skills perfectly.</p>
                <Link to="/ai-match" className="block w-full py-2 text-center bg-white text-primary rounded-xl text-sm font-semibold hover:bg-white/90 transition-all">
                  Try AI Match →
                </Link>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <p className="text-muted-foreground text-sm">
                <span className="font-semibold text-foreground">{filtered.length}</span> jobs found
                {searchQuery && <span> for "{searchQuery}"</span>}
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="pl-4 pr-8 py-2 rounded-xl border border-border bg-card text-sm focus:border-primary focus:outline-none appearance-none cursor-pointer"
                >
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {paginated.map(job => (
                  <div
                    key={job.id}
                    className="group p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform">
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <Link to={`/jobs/${job.id}`} className="text-lg font-bold hover:text-primary transition-colors">
                              {job.title}
                            </Link>
                            <p className="text-muted-foreground text-sm">{job.company}</p>
                          </div>
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                              savedJobIds.includes(job.id)
                                ? 'bg-primary border-primary text-white shadow-md shadow-primary/30'
                                : 'border-border hover:border-primary hover:text-primary'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${savedJobIds.includes(job.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.experience}</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.posted}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${difficultyColor[job.type] ?? 'bg-muted text-muted-foreground'}`}>
                            {job.type}
                          </span>
                          {job.featured && <span className="px-2.5 py-1 text-xs rounded-full bg-accent/20 text-accent font-medium">Featured</span>}
                          {job.urgent && <span className="px-2.5 py-1 text-xs rounded-full bg-destructive/20 text-destructive font-medium">Urgent</span>}
                          {job.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground">{skill}</span>
                          ))}
                          {job.skills.length > 3 && <span className="text-xs text-muted-foreground">+{job.skills.length - 3}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{job.applicants} applicants</span>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                        : 'border border-border hover:border-primary hover:text-primary'
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
