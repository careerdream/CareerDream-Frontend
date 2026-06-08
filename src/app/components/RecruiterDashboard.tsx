import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Plus, LogOut, Briefcase, Users, TrendingUp, CheckCircle, Eye, Edit2, Download, Archive, Trash2, Bell, ChevronDown, PieChart, BarChart3, FileUp, FileDown, Loader2, Search, MapPin, Award, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import { api } from '../utils/api';
import { ActiveJobsView, TotalApplicationsView, HiredView, AnalyticsView } from './RecruiterDashboardViews';

export function RecruiterDashboard() {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState<any>(null);
  const [postedJobs, setPostedJobs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'candidates'>('overview');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState({ skill: '', location: '', title: '' });
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Modals state
  const [selectedJobForApps, setSelectedJobForApps] = useState<any | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [showAllApplicationsModal, setShowAllApplicationsModal] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);
  const [hiredCount, setHiredCount] = useState(0);
  const [globalApplications, setGlobalApplications] = useState<any[]>([]);
  const [overviewView, setOverviewView] = useState<'main' | 'active_jobs' | 'total_applications' | 'hired' | 'analytics'>('main');
  
  // Matching state
  const [selectedJobForMatches, setSelectedJobForMatches] = useState<any | null>(null);
  const [matchedCandidates, setMatchedCandidates] = useState<any[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

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
        const response = await api.get(`/jobs?employerId=${parsed.employer?.id}`);
        const jobs = response.data || response || [];
        setPostedJobs(jobs);

        // Calculate actual hired count and store global applications
        try {
          const appsPromises = jobs.map((job: any) => api.get(`/jobs/${job.id}/applications`));
          const appsResults = await Promise.all(appsPromises);
          let actualHired = 0;
          let allApps: any[] = [];
          appsResults.forEach((res: any[], idx: number) => {
            const jobApps = Array.isArray(res) ? res.map(app => ({ ...app, job: jobs[idx] })) : (res.data ? res.data.map((app: any) => ({ ...app, job: jobs[idx] })) : []);
            allApps = [...allApps, ...jobApps];
            jobApps.forEach((app: any) => {
              if (app.status === 'Hired') actualHired++;
            });
          });
          setHiredCount(actualHired);
          setGlobalApplications(allApps);
        } catch (err) {
          console.error('Error fetching application stats:', err);
        }
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
        setSelectedJobs(prev => prev.filter(id => id !== jobId));
      } catch (err) {
        console.error('Delete job error:', err);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  const handleSelectJob = (id: any) => {
    if (selectedJobs.includes(id)) setSelectedJobs(selectedJobs.filter(jid => jid !== id));
    else setSelectedJobs([...selectedJobs, id]);
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === postedJobs.length) setSelectedJobs([]);
    else setSelectedJobs(postedJobs.map(job => job.id));
  };

  const handleDeleteSelected = async () => {
    if (selectedJobs.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedJobs.length} jobs?`)) return;
    
    try {
      await Promise.all(selectedJobs.map(id => api.delete(`/jobs/${id}`)));
      setPostedJobs(postedJobs.filter(job => !selectedJobs.includes(job.id)));
      setSelectedJobs([]);
    } catch (err) {
      console.error('Delete jobs error:', err);
      alert('Failed to delete some jobs.');
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
        responsibilities: 'Develop features; Write tests; Code reviews',
        requirements: '3+ years experience; Strong in JS',
        benefits: 'Health insurance; Flexible hours',
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
          skills: typeof item.skills === 'string' ? item.skills.split(/[,;]/).map((s: string) => s.trim()).filter(Boolean) : [],
          responsibilities: typeof item.responsibilities === 'string' ? item.responsibilities.split(';').map((s: string) => s.trim()).filter(Boolean) : [],
          requirements: typeof item.requirements === 'string' ? item.requirements.split(';').map((s: string) => s.trim()).filter(Boolean) : [],
          benefits: typeof item.benefits === 'string' ? item.benefits.split(';').map((s: string) => s.trim()).filter(Boolean) : [],
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

  const handleViewApplications = async (job: any) => {
    setSelectedJobForApps(job);
    setLoadingApps(true);
    try {
      const data = await api.get(`/jobs/${job.id}/applications`);
      setApplications(data);
    } catch (err) {
      console.error('Fetch applications error:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  const handleFindMatches = async (job: any) => {
    setSelectedJobForMatches(job);
    setLoadingMatches(true);
    try {
      const response = await api.get(`/jobs/${job.id}/match`);
      setMatchedCandidates(Array.isArray(response) ? response : (response.data || []));
    } catch (err) {
      console.error('Fetch matches error:', err);
    } finally {
      setLoadingMatches(false);
    }
  };

  const handleUpdateApplicationStatus = async (jobId: number, appId: number, currentStatus: string, newStatus: string) => {
    try {
      await api.put(`/jobs/${jobId}/applications/${appId}/status`, { status: newStatus });
      setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
      
      // Update hired count metric roughly
      if (newStatus === 'Hired' && currentStatus !== 'Hired') setHiredCount(prev => prev + 1);
      if (currentStatus === 'Hired' && newStatus !== 'Hired') setHiredCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Update status error:', err);
      alert('Failed to update status');
    }
  };

  const handleViewAllApplications = async () => {
    setShowAllApplicationsModal(true);
    setLoadingApps(true);
    try {
      // In a real app we'd have a specific endpoint. 
      // Here we'll fetch apps for all posted jobs in parallel.
      const appsPromises = postedJobs.map(job => api.get(`/jobs/${job.id}/applications`));
      const appsResults = await Promise.all(appsPromises);
      
      // Combine and inject job info
      let allApps: any[] = [];
      appsResults.forEach((res, index) => {
        const jobApps = res.map((app: any) => ({ ...app, job: postedJobs[index] }));
        allApps = [...allApps, ...jobApps];
      });
      
      // Sort by applied date descending
      allApps.sort((a, b) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime());
      
      setApplications(allApps);
    } catch (err) {
      console.error('Fetch all applications error:', err);
    } finally {
      setLoadingApps(false);
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
    { icon: Briefcase, label: 'Active Jobs', value: activeJobs, color: 'from-blue-500 to-cyan-500', action: () => setOverviewView('active_jobs') },
    { icon: Users, label: 'Total Applications', value: totalApplications, color: 'from-purple-500 to-pink-500', action: () => setOverviewView('total_applications') },
    { icon: CheckCircle, label: 'Hired', value: hiredCount, color: 'from-green-500 to-teal-500', action: () => setOverviewView('hired') },
    { icon: TrendingUp, label: 'Avg Applications/Job', value: avgApplications, color: 'from-orange-500 to-yellow-500', action: () => setOverviewView('analytics') },
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
                  <div 
                    key={idx} 
                    onClick={stat.action}
                    className={`bg-card border border-border rounded-xl p-6 transition-all ${stat.action ? 'cursor-pointer hover:shadow-md hover:border-primary/50' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                );
              })}
            </div>

            {overviewView === 'main' && (
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
            )}

            {overviewView === 'active_jobs' && (
              <ActiveJobsView postedJobs={postedJobs} globalApplications={globalApplications} onBack={() => setOverviewView('main')} />
            )}

            {overviewView === 'total_applications' && (
              <TotalApplicationsView postedJobs={postedJobs} globalApplications={globalApplications} onBack={() => setOverviewView('main')} />
            )}

            {overviewView === 'hired' && (
              <HiredView postedJobs={postedJobs} globalApplications={globalApplications} onBack={() => setOverviewView('main')} />
            )}

            {overviewView === 'analytics' && (
              <AnalyticsView postedJobs={postedJobs} globalApplications={globalApplications} onBack={() => setOverviewView('main')} />
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <h3 className="text-xl font-bold">Your Job Postings</h3>
                {postedJobs.length > 0 && (
                  <div className="flex items-center gap-4 bg-muted/30 px-3 py-1.5 rounded-lg border border-border">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground font-medium">
                      <input 
                        type="checkbox" 
                        checked={selectedJobs.length === postedJobs.length && postedJobs.length > 0} 
                        onChange={handleSelectAll} 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      Select All
                    </label>
                    {selectedJobs.length > 0 && (
                      <button 
                        onClick={handleDeleteSelected}
                        className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete ({selectedJobs.length})
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 px-4 py-2 border border-border bg-card hover:border-primary transition-all rounded-lg font-semibold text-sm"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4 text-primary" />}
                  Bulk Upload
                </button>
                <button
                  onClick={() => navigate('/recruiter/post-job')}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-semibold flex items-center gap-2 text-sm"
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
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <input 
                                type="checkbox" 
                                checked={selectedJobs.includes(job.id)}
                                onChange={() => handleSelectJob(job.id)}
                                className="w-5 h-5 rounded border-border text-primary focus:ring-primary mt-1"
                              />
                              <h4 className="text-lg font-bold">{job.title}</h4>
                            </div>
                            <div className="md:hidden text-right">
                              <button onClick={() => handleViewApplications(job)} className="hover:bg-muted p-1 rounded-lg transition-colors flex flex-col items-end">
                                <span className="text-xl font-bold text-primary">{job.stats?.applicants_count || job.applicants || 0}</span>
                                <span className="text-xs text-muted-foreground ml-1">apps</span>
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{job.company || job.companyName} • {job.location} • {job.type || job.locationType}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.slice(0, 3).map((skill: string, i: number) => (
                              <span key={i} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-4 bg-muted/20 p-3 rounded-lg">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Experience</p>
                              <p className="font-medium">{job.experience || job.experienceLevel}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Salary Range</p>
                              <p className="font-medium">
                                {job.salary || (job.salaryMin && job.salaryMax ? `₹${job.salaryMin} - ₹${job.salaryMax}` : 'Not specified')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleViewApplications(job)}
                              className="px-4 py-1.5 text-sm bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" /> View Applications
                            </button>
                            <button 
                              onClick={() => handleFindMatches(job)}
                              className="px-4 py-1.5 text-sm bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors font-medium flex items-center gap-1.5"
                            >
                              ✨ Find Matches
                            </button>
                            <button
                              onClick={() => navigate(`/recruiter/edit-job/${job.id}`)}
                              className="px-4 py-1.5 text-sm bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => deleteJob(job.id)}
                              className="px-4 py-1.5 text-sm bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>

                        <div className="hidden md:flex flex-col items-end min-w-[120px]">
                          <button 
                            onClick={() => handleViewApplications(job)}
                            className="bg-primary/10 hover:bg-primary/20 transition-colors px-4 py-3 rounded-xl flex flex-col items-center w-full"
                          >
                            <div className="text-3xl font-bold text-primary mb-1">{job.stats?.applicants_count || job.applicants || 0}</div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold">applications</p>
                          </button>
                        </div>

                      </div>
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
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-2">
                          <MapPin className="w-3 h-3" /> {can.location || 'Not specified'}
                        </div>
                        {(() => {
                          const userApp = globalApplications.find(app => app.userId === can.id);
                          if (userApp && userApp.status && userApp.status !== 'Applied') {
                            return (
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                userApp.status === 'Hired' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                userApp.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                              }`}>
                                {userApp.status}
                              </span>
                            );
                          }
                          return null;
                        })()}
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
                    <button 
                      onClick={() => setSelectedCandidate(can)}
                      className="w-full py-2 bg-muted hover:bg-primary hover:text-white transition-all rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                    >
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

        {/* View Applications Modal */}
        {(selectedJobForApps || showAllApplicationsModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card border border-border w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                <div>
                  <h2 className="text-xl font-bold">{showAllApplicationsModal ? 'All Applications' : 'Applications'}</h2>
                  <p className="text-sm text-muted-foreground">{showAllApplicationsModal ? `Across ${postedJobs.length} active jobs` : selectedJobForApps?.title}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedJobForApps(null);
                    setShowAllApplicationsModal(false);
                  }}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                {loadingApps ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">No Applications Yet</h3>
                    <p className="text-muted-foreground">When candidates apply, they will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app: any) => (
                      <div key={app.id} className="p-5 rounded-xl border border-border bg-muted/10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="flex gap-4 items-center">
                          <img 
                            src={app.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.user?.name || 'A')}&background=random`} 
                            alt={app.user?.name} 
                            className="w-12 h-12 rounded-full object-cover border border-border"
                          />
                          <div>
                            <h4 className="font-bold">{app.user?.name}</h4>
                            <p className="text-sm text-muted-foreground">{app.user?.title || 'Professional'}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Applied: {new Date(app.applied_at).toLocaleDateString()} 
                              {showAllApplicationsModal && app.job && (
                                <span className="ml-2 font-semibold text-primary"> • For: {app.job.title}</span>
                              )}
                            </p>
                            {app.status && app.status !== 'Applied' && (
                              <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                app.status === 'Hired' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                app.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                              }`}>
                                {app.status}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 items-center">
                          <select
                            value={app.status || 'Applied'}
                            onChange={(e) => handleUpdateApplicationStatus(app.jobId, app.id, app.status || 'Applied', e.target.value)}
                            className="w-full sm:w-auto px-3 py-2 text-sm rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary outline-none"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <button 
                            onClick={() => {
                              setSelectedCandidate(app.user);
                            }}
                            className="w-full sm:w-auto px-4 py-2 border border-border hover:bg-muted hover:text-foreground transition-colors rounded-lg text-sm font-medium"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Find Matches Modal */}
        {selectedJobForMatches && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card border border-border w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">✨ AI Matchmaker</h2>
                  <p className="text-sm text-muted-foreground">Top matching candidates for: {selectedJobForMatches?.title}</p>
                </div>
                <button 
                  onClick={() => setSelectedJobForMatches(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                {loadingMatches ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">AI is scanning candidates...</p>
                  </div>
                ) : matchedCandidates.length === 0 ? (
                  <div className="text-center py-12 bg-muted/10 rounded-xl border border-dashed border-border">
                    <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-bold mb-2">No Strong Matches Found</h3>
                    <p className="text-muted-foreground">Consider broadening your job's required skills.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {matchedCandidates.map((candidate: any, index: number) => (
                      <div key={candidate.id} className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all flex flex-col sm:flex-row gap-6 justify-between items-start">
                        <div className="flex gap-4">
                          <div className="relative">
                            <img 
                              src={candidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name || 'C')}&background=random`} 
                              alt={candidate.name} 
                              className="w-14 h-14 rounded-full object-cover border-2 border-border"
                            />
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold border-2 border-card">
                              #{index + 1}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{candidate.name}</h4>
                            <p className="text-sm text-primary font-medium">{candidate.title || 'Professional'}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {candidate.location || 'Remote'}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 w-full sm:px-6">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Match Score</span>
                            <span className="text-sm font-bold text-primary">{candidate.matchPercentage}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${candidate.matchPercentage}%` }}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            {candidate.matchedSkills && candidate.matchedSkills.length > 0 && (
                              <div>
                                <span className="text-xs text-green-500 font-semibold mb-1 block">✓ Matching Skills</span>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.matchedSkills.map((s: string, i: number) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] bg-green-500/10 text-green-600 rounded-md border border-green-500/20">{s}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {candidate.missingSkills && candidate.missingSkills.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-red-500 font-semibold mb-1 block">✗ Missing Skills</span>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.missingSkills.map((s: string, i: number) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] bg-red-500/10 text-red-600 rounded-md border border-red-500/20">{s}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full sm:w-auto flex flex-col gap-2">
                          <button 
                            onClick={() => setSelectedCandidate(candidate)}
                            className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* View Full Profile Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card border border-border w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                <h2 className="text-lg font-bold">Candidate Profile</h2>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-8">
                <div className="flex items-start gap-6">
                  <img 
                    src={selectedCandidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCandidate.name || 'A')}&background=random`} 
                    alt={selectedCandidate.name} 
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedCandidate.name}</h3>
                    <p className="text-primary font-medium text-lg mb-2">{selectedCandidate.title || 'Professional'}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedCandidate.location || 'Not specified'}</span>
                      <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {selectedCandidate.profileCompletion || 0}% Profile Match</span>
                    </div>
                  </div>
                </div>

                {selectedCandidate.bio && (
                  <div>
                    <h4 className="font-bold mb-2">About</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{selectedCandidate.bio}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-bold mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(selectedCandidate.skills) && selectedCandidate.skills.length > 0 ? (
                      selectedCandidate.skills.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No skills listed</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Contact Email</p>
                    <p className="font-medium">{selectedCandidate.email || 'Not shared'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{selectedCandidate.phone || 'Not shared'}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <a 
                    href={`mailto:${selectedCandidate.email}`}
                    className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Contact Candidate
                  </a>
                  {selectedCandidate.resumeUploaded && (
                    <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-colors">
                      <Download className="w-4 h-4" /> Resume
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
