import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Plus, LogOut, Briefcase, Users, TrendingUp, CheckCircle, Eye, Edit2, Download, Archive, Trash2, Bell, ChevronDown, PieChart, BarChart3, FileUp, FileDown, Loader2, Search, MapPin, Award, X, Settings } from 'lucide-react';
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

  // Notifications state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [recruiterNotifications, setRecruiterNotifications] = useState([
    { id: 1, title: 'New Application Received', message: 'Vish has applied for Software Engineer', date: new Date().toISOString(), read: false, type: 'job' },
    { id: 2, title: 'Job Approved', message: 'Your job posting "Frontend Developer" is now live.', date: new Date(Date.now() - 86400000).toISOString(), read: true, type: 'feature' }
  ]);
  const unreadCount = recruiterNotifications.filter(n => !n.read).length;

  // Settings state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({ name: '', companyName: '', email: '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [showOtpView, setShowOtpView] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  // Bulk Upload Preview state
  const [bulkPreviewJobs, setBulkPreviewJobs] = useState<any[]>([]);
  const [showBulkPreviewModal, setShowBulkPreviewModal] = useState(false);
  const [isBulkPublishing, setIsBulkPublishing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleToggleJob = async (jobId: number, field: 'status' | 'featured', value: any) => {
    try {
      await api.patch(`/jobs/${jobId}/toggle`, { [field]: value });
      setPostedJobs(prev => prev.map(job => job.id === jobId ? { ...job, [field]: value } : job));
    } catch (err) {
      console.error(`Failed to toggle ${field}:`, err);
      alert(`Failed to update job ${field}.`);
    }
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

        setBulkPreviewJobs(newJobs);
        setShowBulkPreviewModal(true);
        
      } catch (err) {
        console.error('Error parsing Excel:', err);
        alert('Failed to parse jobs. Please check your Excel format.');
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

  const exportRecruiterData = () => {
    try {
      const applicationsData = globalApplications.map(app => ({
        'Job Title': app.job?.title || 'Unknown',
        'Candidate Name': app.candidate?.name || 'Unknown',
        'Candidate Email': app.candidate?.email || 'N/A',
        'Status': app.status || 'Pending',
        'Applied Date': app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A',
        'Candidate Location': app.candidate?.location || 'Unknown',
        'Candidate Experience': app.candidate?.experience || 'N/A'
      }));

      const jobsData = postedJobs.map(job => ({
        'Job Title': job.title,
        'Location': job.location,
        'Type': job.locationType,
        'Experience Level': job.experienceLevel,
        'Posted Date': job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'
      }));

      let rejected = 0, shortlisted = 0, interviewed = 0, hired = hiredCount;
      globalApplications.forEach(app => {
        if (app.status === 'Rejected') rejected++;
        if (app.status === 'Shortlisted') shortlisted++;
        if (app.status === 'Interviewing' || app.status === 'Interviewed') interviewed++;
      });

      const analyticsData = [
        { Metric: 'Total Applications', Value: globalApplications.length },
        { Metric: 'Hired', Value: hired },
        { Metric: 'Interviewed', Value: interviewed },
        { Metric: 'Shortlisted', Value: shortlisted },
        { Metric: 'Rejected', Value: rejected }
      ];

      const wb = XLSX.utils.book_new();
      
      const wsAnalytics = XLSX.utils.json_to_sheet(analyticsData);
      XLSX.utils.book_append_sheet(wb, wsAnalytics, 'Analytics Reports');
      
      const wsApps = XLSX.utils.json_to_sheet(applicationsData);
      XLSX.utils.book_append_sheet(wb, wsApps, 'Application Details');
      
      const wsJobs = XLSX.utils.json_to_sheet(jobsData);
      XLSX.utils.book_append_sheet(wb, wsJobs, 'Job Details');

      XLSX.writeFile(wb, `Recruiter_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export data');
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
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <Bell className={`w-6 h-6 ${unreadCount > 0 ? 'text-primary' : ''}`} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-[#111827]"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                    <h3 className="font-bold text-foreground">Notifications</h3>
                    <button 
                      onClick={() => setRecruiterNotifications([])}
                      className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {recruiterNotifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-20" />
                        <p className="text-sm text-muted-foreground">All caught up!</p>
                      </div>
                    ) : (
                      recruiterNotifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => {
                            setRecruiterNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-4 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors relative group ${!notif.read ? 'bg-primary/5' : ''}`}
                        >
                          {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                          <div className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              notif.type === 'job' ? 'bg-green-500/10 text-green-600' :
                              'bg-purple-500/10 text-purple-600'
                            }`}>
                              {notif.type === 'job' ? <Briefcase className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate pr-4 text-foreground">{notif.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{notif.message}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] text-muted-foreground">
                                  {new Date(notif.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setEditProfileData({ 
                  name: recruiter?.name || '', 
                  companyName: recruiter?.employer?.companyName || '',
                  email: recruiter?.email || ''
                });
                setShowOtpView(false);
                setOtpInput('');
                setOtpError('');
                setShowSettingsModal(true);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm font-medium border border-border/50"
            >
              <Settings className="w-4 h-4" />
              Settings
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

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleBulkUpload}
          className="hidden"
          accept=".xlsx, .xls"
        />

        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            {/* Top Action */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold">Welcome back!</h2>
                <p className="text-muted-foreground">Manage your job listings and track applications</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={exportRecruiterData}
                  className="flex items-center gap-2 px-5 py-3 border border-border bg-card hover:border-green-500/50 hover:text-green-500 transition-all rounded-xl font-semibold"
                >
                  <Download className="w-5 h-5" /> Export Data
                </button>
                <div className="relative">
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

            <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
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
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="p-4 w-12">
                        <input 
                          type="checkbox" 
                          className="rounded border-border"
                          onChange={handleSelectAll}
                          checked={postedJobs.length > 0 && selectedJobs.length === postedJobs.length}
                        />
                      </th>
                      <th className="p-4 font-medium">Job Info</th>
                      <th className="p-4 font-medium">Status & Badges</th>
                      <th className="p-4 font-medium">Details</th>
                      <th className="p-4 font-medium">Stats</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {postedJobs.map(job => (
                      <tr key={job.id} className="hover:bg-muted/20 transition-colors group">
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            checked={selectedJobs.includes(job.id)}
                            onChange={() => handleSelectJob(job.id)}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                          />
                        </td>
                        <td className="p-4">
                          <h4 className="text-base font-bold text-foreground mb-1">{job.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {job.company || job.companyName} • {job.location} • {job.type || job.locationType}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-primary/10 text-primary">
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="px-2 py-0.5 text-[10px] rounded bg-muted text-muted-foreground">
                                +{job.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 space-y-2">
                          <select
                            value={job.status || 'active'}
                            onChange={(e) => handleToggleJob(job.id, 'status', e.target.value)}
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border cursor-pointer focus:outline-none appearance-none block w-max ${
                              job.status === 'active' || !job.status ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                              job.status === 'draft' ? 'bg-slate-500/10 text-slate-600 border-slate-500/20' :
                              'bg-red-500/10 text-red-600 border-red-500/20'
                            }`}
                            style={{ paddingRight: '0.5rem' }}
                          >
                            <option value="active">ACTIVE</option>
                            <option value="draft">DRAFT</option>
                            <option value="expired">EXPIRED</option>
                          </select>
                          <label className="flex items-center gap-1.5 cursor-pointer bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded-full hover:bg-amber-500/20 transition-colors w-max">
                            <input 
                              type="checkbox" 
                              checked={job.featured || false} 
                              onChange={(e) => handleToggleJob(job.id, 'featured', e.target.checked)}
                              className="w-3 h-3 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                            />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Featured</span>
                          </label>
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          <div className="mb-1">
                            <span className="font-semibold text-foreground">Exp:</span> {job.experience || job.experienceLevel}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">Pay:</span> {job.salary || (job.salaryMin && job.salaryMax ? `₹${job.salaryMin} - ₹${job.salaryMax}` : 'N/A')}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{job.stats?.applicants_count || job.applicants || 0}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleViewApplications(job)}
                              title="View Applications"
                              className="p-1.5 text-blue-600 bg-blue-500/10 rounded hover:bg-blue-500/20 transition-colors flex items-center gap-1.5"
                            >
                              <Eye className="w-4 h-4" /> 
                              <span className="text-xs font-semibold">Apps</span>
                            </button>
                            <button 
                              onClick={() => handleFindMatches(job)}
                              title="Find Matches"
                              className="p-1.5 text-purple-600 bg-purple-500/10 rounded hover:bg-purple-500/20 transition-colors flex items-center gap-1.5"
                            >
                              ✨ <span className="text-xs font-semibold">Match</span>
                            </button>
                            <button
                              onClick={() => navigate(`/recruiter/edit-job/${job.id}`)}
                              title="Edit Job"
                              className="p-1.5 text-amber-600 bg-amber-500/10 rounded hover:bg-amber-500/20 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteJob(job.id)}
                              title="Delete Job"
                              className="p-1.5 text-red-600 bg-red-500/10 rounded hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-white text-2xl font-bold shadow-lg relative overflow-hidden shrink-0">
                        <span className="absolute z-0 uppercase">{(can.name || 'U').charAt(0)}</span>
                        {can.avatar && (can.avatar.startsWith('http') || can.avatar.startsWith('data:')) && (
                          <img 
                            src={can.avatar} 
                            alt={can.name} 
                            className="w-full h-full object-cover relative z-10"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        )}
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
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-white font-bold relative overflow-hidden shrink-0 border border-border">
                            <span className="absolute z-0 uppercase text-lg">{(app.user?.name || 'U').charAt(0)}</span>
                            {app.user?.avatar && (
                              <img 
                                src={app.user.avatar} 
                                alt={app.user?.name} 
                                className="w-full h-full object-cover relative z-10"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            )}
                          </div>
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
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-white font-bold relative overflow-hidden border-2 border-border shrink-0">
                              <span className="absolute z-0 uppercase text-xl">{(candidate.name || 'C').charAt(0)}</span>
                              {candidate.avatar && (
                                <img 
                                  src={candidate.avatar} 
                                  alt={candidate.name} 
                                  className="w-full h-full object-cover relative z-10"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                              )}
                            </div>
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

                          {candidate.aiReasoning && (
                            <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/20 relative animate-in fade-in slide-in-from-bottom-2">
                              <div className="absolute -top-3 left-4 bg-background px-3 py-0.5 text-xs font-black text-primary flex items-center gap-1.5 border border-primary/20 rounded-full shadow-sm">
                                <Brain className="w-3.5 h-3.5" /> AI Insight
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed italic mt-1 font-medium">"{candidate.aiReasoning}"</p>
                            </div>
                          )}

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
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-white font-bold relative overflow-hidden border-2 border-primary/20 shrink-0 shadow-lg">
                    <span className="absolute z-0 uppercase text-4xl">{(selectedCandidate.name || 'A').charAt(0)}</span>
                    {selectedCandidate.avatar && (
                      <img 
                        src={selectedCandidate.avatar} 
                        alt={selectedCandidate.name} 
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                  </div>
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

        {/* Settings Modal */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Profile Settings</h2>
                  <p className="text-sm text-muted-foreground">Update your personal and company information</p>
                </div>
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {showOtpView ? (
                  <div className="text-center py-4">
                    <h3 className="font-bold text-lg mb-2">Verify New Email</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      We've sent a 6-digit code to <span className="font-semibold text-foreground">{editProfileData.email}</span>
                    </p>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value);
                        setOtpError('');
                      }}
                      className="w-full max-w-[200px] text-center bg-background border border-border rounded-xl px-4 py-3 text-2xl tracking-[0.25em] font-bold focus:outline-none focus:border-primary transition-colors mx-auto block"
                      placeholder="000000"
                    />
                    {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editProfileData.name}
                        onChange={(e) => setEditProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Company Name</label>
                      <input
                        type="text"
                        value={editProfileData.companyName}
                        onChange={(e) => setEditProfileData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:border-primary transition-colors"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                      <input
                        type="email"
                        value={editProfileData.email}
                        onChange={(e) => setEditProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:border-primary transition-colors"
                        placeholder="your.email@company.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Changing your email requires OTP verification.</p>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/20">
                <button
                  onClick={() => {
                    if (showOtpView) {
                      setShowOtpView(false);
                      setOtpInput('');
                    } else {
                      setShowSettingsModal(false);
                    }
                  }}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                  {showOtpView ? 'Back' : 'Cancel'}
                </button>
                <button
                  onClick={async () => {
                    if (showOtpView) {
                      // Verify OTP & Save all changes
                      if (otpInput.length !== 6) {
                        setOtpError('Please enter a 6-digit OTP');
                        return;
                      }
                      setIsUpdatingProfile(true);
                      setOtpError('');
                      try {
                        // 1. Verify Email
                        await api.put('/recruiter/verify-email-update', {
                          newEmail: editProfileData.email,
                          otp: otpInput
                        });
                        
                        // 2. Update Profile
                        await api.put('/recruiter/profile', {
                          name: editProfileData.name,
                          companyName: editProfileData.companyName
                        });

                        // 3. Update local state
                        const updatedRecruiter = {
                          ...recruiter,
                          name: editProfileData.name,
                          email: editProfileData.email,
                          employer: {
                            ...recruiter.employer,
                            companyName: editProfileData.companyName
                          }
                        };
                        localStorage.setItem('recruiterAuth', JSON.stringify(updatedRecruiter));
                        setRecruiter(updatedRecruiter);
                        setShowSettingsModal(false);
                        alert('Profile and email updated successfully!');
                      } catch (error: any) {
                        setOtpError(error.message || 'Invalid OTP or server error');
                      } finally {
                        setIsUpdatingProfile(false);
                      }
                    } else {
                      // Standard Save (Check if email changed)
                      if (!editProfileData.name || !editProfileData.companyName || !editProfileData.email) return;
                      setIsUpdatingProfile(true);
                      
                      try {
                        if (editProfileData.email !== recruiter.email) {
                          // Email changed, request OTP
                          await api.post('/recruiter/request-email-update', { newEmail: editProfileData.email });
                          setShowOtpView(true);
                        } else {
                          // Standard profile update
                          await api.put('/recruiter/profile', {
                            name: editProfileData.name,
                            companyName: editProfileData.companyName
                          });
                          
                          const updatedRecruiter = {
                            ...recruiter,
                            name: editProfileData.name,
                            employer: {
                              ...recruiter.employer,
                              companyName: editProfileData.companyName
                            }
                          };
                          localStorage.setItem('recruiterAuth', JSON.stringify(updatedRecruiter));
                          setRecruiter(updatedRecruiter);
                          setShowSettingsModal(false);
                        }
                      } catch (error: any) {
                        console.error('Update error:', error);
                        alert(error.message || 'Failed to update profile');
                      } finally {
                        setIsUpdatingProfile(false);
                      }
                    }
                  }}
                  disabled={isUpdatingProfile || !editProfileData.name || !editProfileData.companyName || !editProfileData.email}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isUpdatingProfile ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {showOtpView ? 'Verifying...' : 'Saving...'}</>
                  ) : (showOtpView ? 'Verify & Save' : 'Save Changes')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Job Preview Modal */}
        {showBulkPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-auto flex flex-col max-h-full">
              <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center bg-muted/20 sticky top-0 z-10">
                <div className="flex items-center gap-2 text-primary">
                  <Eye className="w-5 h-5" />
                  <h2 className="text-xl font-bold">Bulk Job Preview</h2>
                </div>
                <button 
                  onClick={() => setShowBulkPreviewModal(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <p className="mb-4 text-muted-foreground text-sm">
                  Please review the <strong>{bulkPreviewJobs.length}</strong> jobs parsed from your Excel file before publishing.
                </p>
                <div className="border border-border rounded-xl overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                      <tr>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Experience</th>
                        <th className="px-4 py-3">Skills Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {bulkPreviewJobs.map((job, idx) => (
                        <tr key={idx} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium">{job.title}</td>
                          <td className="px-4 py-3">{job.location}</td>
                          <td className="px-4 py-3">{job.locationType}</td>
                          <td className="px-4 py-3">{job.experienceLevel}</td>
                          <td className="px-4 py-3">{job.skills?.length || 0} skills</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-border flex justify-end gap-3 bg-muted/20 mt-auto sticky bottom-0 z-10">
                <button
                  onClick={() => setShowBulkPreviewModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
                  disabled={isBulkPublishing}
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setIsBulkPublishing(true);
                    try {
                      const response = await api.post('/jobs/bulk', { jobs: bulkPreviewJobs });
                      alert(response.message || `Successfully uploaded ${bulkPreviewJobs.length} jobs!`);
                      setShowBulkPreviewModal(false);
                      // Optionally, re-fetch posted jobs here
                    } catch (error: any) {
                      console.error('Bulk Publish Error:', error);
                      alert(error.message || 'Failed to publish bulk jobs');
                    } finally {
                      setIsBulkPublishing(false);
                    }
                  }}
                  disabled={isBulkPublishing}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  {isBulkPublishing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
                  ) : (
                    <>Publish {bulkPreviewJobs.length} Jobs</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
