import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Plus, LogOut, Briefcase, Users, TrendingUp, CheckCircle, Eye, Download, Archive, Trash2, Bell, ChevronDown, PieChart, BarChart3, FileUp, FileDown, Loader2, Search, MapPin, Award } from 'lucide-react';
import * as XLSX from 'xlsx';
import { api } from '../utils/api';

export function RecruiterDashboard() {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState<any>(null);
  const [postedJobs, setPostedJobs] = useState<any[]>([]);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'candidates'>('overview');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState({ skill: '', location: '', title: '' });
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const recruiterAuth = localStorage.getItem('recruiterAuth');
    if (!recruiterAuth) {
      navigate('/recruiter/login');
      return;
    }
    const parsed = JSON.parse(recruiterAuth);
    setRecruiter(parsed);

    const fetchJobs = async () => {
      try {
        const data = await api.get(`/jobs?employerId=${parsed.employer?.id}`);
        setPostedJobs(data);
      } catch (err) {
        console.error('Fetch jobs error:', err);
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('recruiterAuth');
    navigate('/recruiter/login');
  };

  const deleteJob = async (jobId: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        setPostedJobs(prev => prev.filter(j => j.id !== jobId));
      } catch (err) {
        console.error('Delete job error:', err);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        title: 'Software Engineer',
        companyName: 'CareerDream',
        location: 'Bangalore, India',
        locationType: 'Remote',
        description: 'Job description here...',
        skills: 'React, Node.js, TypeScript',
        experienceLevel: '2-5 years',
        salaryMin: 800000,
        salaryMax: 1500000,
        externalUrl: 'https://careerdream.in/apply',
        applicantEmail: 'hiring@careerdream.in'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Jobs Template');
    XLSX.writeFile(wb, 'CareerDream_Job_Template.xlsx');
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        const newJobs = data.map((item: any) => ({
          title: item.title || 'Untitled Role',
          companyName: item.companyName || recruiter.company || 'Unknown Company',
          location: item.location || 'Remote',
          locationType: item.locationType || 'Remote',
          description: item.description || '',
          skills: typeof item.skills === 'string' ? item.skills.split(',').map((s: string) => s.trim()) : [],
          experienceLevel: item.experienceLevel || 'Fresher',
          salaryMin: item.salaryMin || '',
          salaryMax: item.salaryMax || '',
          externalUrl: item.externalUrl || '',
          applicantEmail: item.applicantEmail || recruiter.email,
        }));

        // Send to backend
        const response = await api.post('/jobs/bulk', { jobs: newJobs });
        
        // Refresh local list if needed or just fetch from backend
        // For now, let's just show success
        alert(response.message || `Successfully uploaded ${newJobs.length} jobs!`);
        
        // Optionally fetch updated jobs from backend here
      } catch (err) {
        console.error('Error parsing/uploading Excel:', err);
        alert('Failed to upload jobs. Please check your network and Excel format.');
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsBinaryString(file);
  };

  const searchCandidates = async () => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.skill) params.append('skill', searchQuery.skill);
      if (searchQuery.location) params.append('location', searchQuery.location);
      if (searchQuery.title) params.append('title', searchQuery.title);
      
      const data = await api.get(`/recruiter/candidates?${params.toString()}`);
      setCandidates(data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  if (!recruiter) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Calculate metrics
  const totalApplications = postedJobs.reduce((sum, job) => sum + (job.stats?.applicants_count || job.applicants || 0), 0);
  const activeJobs = postedJobs.length;
  const avgApplications = activeJobs > 0 ? Math.round(totalApplications / activeJobs) : 0;

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: activeJobs, color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'Total Applications', value: totalApplications, color: 'from-purple-500 to-pink-500' },
    { icon: CheckCircle, label: 'Hired', value: Math.floor(totalApplications * 0.15), color: 'from-green-500 to-teal-500' },
    { icon: TrendingUp, label: 'Avg Applications/Job', value: avgApplications, color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f18]">
      {/* Header */}
      <div className="bg-[#111827] border-b border-border/40 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-white">Recruiter Dashboard</h1>
              <p className="text-sm text-muted-foreground">{recruiter.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm font-medium border border-border/50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Overview', icon: PieChart },
            { id: 'jobs', label: 'Job Listings', icon: Briefcase },
            { id: 'candidates', label: 'Candidate Discovery', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all whitespace-nowrap font-medium ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            {/* Top Action */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold">Welcome back!</h2>
                <p className="text-muted-foreground">Manage your job listings and track applications</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleBulkUpload}
                    className="hidden"
                    accept=".xlsx, .xls"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-5 py-3 border border-border bg-card hover:border-primary transition-all rounded-xl font-semibold"
                  >
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileUp className="w-5 h-5 text-primary" />}
                    Bulk Upload
                  </button>
                </div>
                <button
                  onClick={() => navigate('/recruiter/post-job')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <Plus className="w-5 h-5" /> Post Job
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                );
              })}
            </div>

            {/* Quick Tips & Bulk Template */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                  <FileDown className="w-5 h-5" /> Bulk Job Template
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300 mb-4">
                  Have multiple roles to fill? Download our Excel template, fill in the job details, and upload it to post all jobs at once.
                </p>
                <button
                  onClick={downloadTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Template (.xlsx)
                </button>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-6">
                <h3 className="font-bold mb-3 text-amber-900 dark:text-amber-100">💡 Pro Tips for Better Hiring</h3>
                <ul className="text-sm space-y-2 text-amber-800 dark:text-amber-300">
                  <li>• Use specific job titles and clear descriptions</li>
                  <li>• List 5-8 key skills to help candidates self-assess</li>
                  <li>• Set realistic salary ranges to attract serious applicants</li>
                  <li>• Reply to applications within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-bold">Your Job Postings</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  title="Bulk Upload"
                >
                  <FileUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/recruiter/post-job')}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-semibold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Post New
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {postedJobs.length === 0 ? (
                <div className="p-12 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">No jobs posted yet</p>
                  <button
                    onClick={() => navigate('/recruiter/post-job')}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Post Your First Job
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {postedJobs.map(job => (
                    <div key={job.id} className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold mb-1">{job.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{job.company || job.companyName} • {job.location} • {job.type || job.locationType}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.slice(0, 3).map((skill: string, i: number) => (
                              <span key={i} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-primary mb-1">{job.stats?.applicants_count || job.applicants || 0}</div>
                          <p className="text-xs text-muted-foreground mb-4">applications</p>
                          <button
                            onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {expandedJob === job.id && (
                        <div className="pt-4 border-t border-border space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">Experience Level</p>
                              <p className="font-medium">{job.experience || job.experienceLevel}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Salary Range</p>
                              <p className="font-medium">
                                {job.salary || (job.salaryMin && job.salaryMax ? `₹${job.salaryMin} - ₹${job.salaryMax}` : 'Not specified')}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors font-medium">
                              <Eye className="w-4 h-4" /> View Applications
                            </button>
                            <button
                              onClick={() => deleteJob(job.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Find Talent</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search Skill (e.g. React)"
                    value={searchQuery.skill}
                    onChange={(e) => setSearchQuery({ ...searchQuery, skill: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={searchQuery.location}
                    onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <button
                  onClick={searchCandidates}
                  disabled={isSearching}
                  className="bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-all font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Search Candidates
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {candidates.map((can) => (
                <div key={can.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
                          {can.avatar && (can.avatar.startsWith('http') || can.avatar.startsWith('data:')) ? (
                            <img src={can.avatar} alt={can.name} className="w-full h-full object-cover" />
                          ) : (
                            can.avatar || '👤'
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg truncate">{can.name}</h4>
                        <p className="text-sm text-primary font-medium truncate">{can.title || 'IT Professional'}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" /> {can.location || 'Not specified'}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(can.skills || []).slice(0, 4).map((skill: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
                      <div className="bg-muted/50 p-2 rounded-lg border border-border/50 text-center">
                        <p className="text-muted-foreground mb-0.5">Profile Match</p>
                        <p className="font-bold text-primary">{can.profileCompletion}%</p>
                      </div>
                      <div className="bg-muted/50 p-2 rounded-lg border border-border/50 text-center">
                        <p className="text-muted-foreground mb-0.5">Assessment</p>
                        <p className="font-bold text-green-600">
                          {can.testResults?.length > 0 ? `${can.testResults[0].score}%` : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-muted hover:bg-primary hover:text-white transition-all rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" /> View Full Profile
                    </button>
                  </div>
                </div>
              ))}
              {candidates.length === 0 && !isSearching && (
                <div className="col-span-full py-12 text-center bg-muted/20 rounded-xl border border-dashed border-border">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">Search to discover top candidates for your roles</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
