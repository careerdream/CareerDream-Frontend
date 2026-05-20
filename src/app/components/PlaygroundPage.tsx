import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, CheckCircle2, Trophy, ChevronDown, ChevronUp, Clock, Target } from 'lucide-react';
import { api } from '../utils/api';

export function PlaygroundPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeDomain, setActiveDomain] = useState('All Topics');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await api.get('/playground/problems?limit=1000');
      setProblems(res.problems || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const domains = ['All Topics', 'Algorithms', 'Database', 'Shell', 'Concurrency', 'JavaScript', 'Pandas'];
  
  // Extract all unique tags and counts
  const tagCounts = problems.reduce((acc, p) => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, 14);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? [] : [tag]
    );
  };

  const filteredProblems = problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDomain = activeDomain === 'All Topics' || p.category === activeDomain;
    const matchTags = activeTags.length === 0 || activeTags.every(tag => p.tags?.includes(tag));
    return matchSearch && matchDomain && matchTags;
  });

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-500';
      case 'Medium': return 'text-amber-500';
      case 'Hard': return 'text-rose-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#eff1f6] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Tags Area */}
        <div className="bg-[#282828] rounded-2xl p-6 shadow-xl border border-white/5 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="text-blue-500" /> Coding Challenges
            </h1>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#333333] border border-white/10 rounded-full focus:outline-none focus:border-blue-500 transition-colors text-sm text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Tags Cloud */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {visibleTags.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeTags.includes(tag)
                      ? 'bg-blue-600 text-white border border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'bg-[#333333] text-gray-300 hover:bg-[#404040] border border-white/5'
                  }`}
                >
                  {tag} <span className="opacity-50 font-normal">({count})</span>
                </button>
              ))}
              {sortedTags.length > 14 && (
                <button 
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 bg-[#333333]/50 hover:bg-[#404040]"
                >
                  {showAllTags ? <><ChevronUp className="w-3 h-3" /> Show Less</> : <><ChevronDown className="w-3 h-3" /> Expand</>}
                </button>
              )}
            </div>
          </div>

          {/* Domains Tabs */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-1 border-b border-white/10">
            {domains.map(dom => (
              <button
                key={dom}
                onClick={() => setActiveDomain(dom)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                  activeDomain === dom 
                    ? 'border-blue-500 text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-t-lg'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Problem List */}
        <div className="bg-[#282828] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-[#333333]/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Tags</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-1 text-right">Points</div>
          </div>
          
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-gray-400 text-sm animate-pulse">Loading challenges...</p>
              </div>
            ) : filteredProblems.length > 0 ? (
              filteredProblems.map((prob, index) => (
                <Link 
                  to={`/playground/${prob.slug}`} 
                  key={prob.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#333333] transition-colors group"
                >
                  <div className="col-span-1 flex justify-center">
                    {prob.userProgress && prob.userProgress.length > 0 && prob.userProgress[0].solved ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : prob.userProgress && prob.userProgress.length > 0 && prob.userProgress[0].attempts > 0 ? (
                      <Clock className="w-4 h-4 text-amber-500" />
                    ) : (
                      <div className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="col-span-6 font-medium text-gray-200 group-hover:text-blue-400 transition-colors truncate pr-4">
                    {index + 1}. {prob.title}
                  </div>
                  
                  <div className="col-span-2 flex items-center gap-1 overflow-hidden">
                    {prob.tags && prob.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 truncate">
                        {tag}
                      </span>
                    ))}
                    {prob.tags && prob.tags.length > 2 && (
                      <span className="text-[10px] text-gray-500">+{prob.tags.length - 2}</span>
                    )}
                  </div>

                  <div className="col-span-2 flex items-center">
                    <span className={`text-sm font-medium ${getDifficultyColor(prob.difficulty)}`}>
                      {prob.difficulty}
                    </span>
                  </div>
                  
                  <div className="col-span-1 flex items-center justify-end gap-1 text-sm font-medium text-gray-300">
                    {prob.points} <Trophy className="w-3 h-3 text-amber-500/70" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-16 text-center">
                <Target className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-gray-300">No challenges found</h3>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                {activeTags.length > 0 && (
                  <button 
                    onClick={() => setActiveTags([])}
                    className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                  >
                    Clear Tag Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
