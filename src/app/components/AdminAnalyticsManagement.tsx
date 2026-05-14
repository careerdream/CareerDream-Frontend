import React, { useState, useEffect } from 'react';
import { 
  BarChart2, PieChart as PieIcon, TrendingUp, Users, Briefcase, BookOpen, 
  Target, Activity, Download, Calendar, Filter, FileText, Settings, Loader2,
  AlertTriangle, RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export function AdminAnalyticsManagement({ defaultSection = 'overview' }: { defaultSection?: 'overview' | 'users' | 'jobs' | 'courses' | 'assessments' | 'reports' }) {
  const [activeSection, setActiveSection] = useState<'overview' | 'users' | 'jobs' | 'courses' | 'assessments' | 'reports'>(defaultSection);
  const [dateRange, setDateRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [overview, setOverview] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [jobData, setJobData] = useState<any>(null);
  const [courseData, setCourseData] = useState<any>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [systemData, setSystemData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllAnalytics();
  }, [dateRange]);

  const fetchAllAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ov, us, jo, co, as, sy] = await Promise.all([
        api.get('/admin/analytics/overview'),
        api.get('/admin/analytics/users'),
        api.get('/admin/analytics/jobs'),
        api.get('/admin/analytics/courses'),
        api.get('/admin/analytics/assessments'),
        api.get('/admin/analytics/system')
      ]);
      setOverview(ov);
      setUserData(us);
      setJobData(jo);
      setCourseData(co);
      setAssessmentData(as);
      setSystemData(sy);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Failed to load analytics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format: string) => {
    try {
      const data = await api.post('/admin/analytics/export', { format, reportType: activeSection });
      alert(data.message || `Exporting ${activeSection} report as ${format.toUpperCase()}...`);
    } catch (e) {
      console.error(e);
      alert('Export failed');
    }
  };

  const StatCard = ({ title, value, icon, trend }: { title: string, value: string | number, icon: any, trend?: string }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
      </div>
      {trend && (
        <div className={`text-xs mt-4 flex items-center ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          <TrendingUp size={12} className={`mr-1 ${trend.startsWith('+') ? '' : 'rotate-180'}`} />
          {trend} vs last period
        </div>
      )}
    </div>
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded shadow-lg border border-slate-700">
          <p className="font-bold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>;
  }
  
  if (error || !overview) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-xl border border-rose-200 dark:border-rose-800 text-center max-w-md">
          <AlertTriangle className="mx-auto text-rose-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analytics Error</h2>
          <p className="text-slate-500 text-sm mb-6">{error || "The analytics data could not be retrieved at this time."}</p>
          <Button onClick={fetchAllAnalytics} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw size={16} className="mr-2" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center"><BarChart2 className="mr-2" /> Global Analytics Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">System-wide performance, engagement, and reporting.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]"><Calendar size={16} className="mr-2 text-slate-400" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport('pdf')}><FileText size={16} className="mr-2" /> PDF Report</Button>
          <Button variant="outline" onClick={() => exportReport('csv')}><Download size={16} className="mr-2" /> Export CSV</Button>
        </div>
      </div>

      {/* Analytics Navigation */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar border-b border-slate-200 dark:border-slate-700">
        <div className="flex space-x-2">
          {[
            { id: 'overview', label: 'Overview', icon: <Activity size={16} /> },
            { id: 'users', label: 'User Analytics', icon: <Users size={16} /> },
            { id: 'jobs', label: 'Jobs & Applications', icon: <Briefcase size={16} /> },
            { id: 'courses', label: 'Learning Hub', icon: <BookOpen size={16} /> },
            { id: 'assessments', label: 'Assessments', icon: <Target size={16} /> },
            { id: 'reports', label: 'Custom Reports', icon: <Filter size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center px-4 py-2.5 rounded-t-lg font-medium text-sm transition-colors ${
                activeSection === tab.id
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-500'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      {activeSection === 'overview' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Active Users" value={overview.metrics.totalActiveUsers.toLocaleString()} icon={<Users size={64} />} trend="+12.5%" />
            <StatCard title="Active Jobs" value={overview.metrics.totalActiveJobs.toLocaleString()} icon={<Briefcase size={64} />} trend="+5.2%" />
            <StatCard title="Course Enrollments" value={overview.metrics.totalCourseEnrollments.toLocaleString()} icon={<BookOpen size={64} />} trend="+18.1%" />
            <StatCard title="System Uptime" value={`${overview.metrics.systemHealth}%`} icon={<Activity size={64} />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">User Growth Trend (30 Days)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overview.trends.userGrowth} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Job Applications (Weekly)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overview.trends.jobApplications} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.1}} />
                    <Bar dataKey="apps" name="Applications" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USER ANALYTICS SECTION */}
      {activeSection === 'users' && userData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">User Registrations (Monthly)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userData.monthlyRegistrations} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="count" name="New Users" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6', strokeWidth: 2}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">User Roles Distribution</h3>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={userData.roles} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                      {userData.roles.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Custom Legend */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {userData.roles.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                      <div className="w-3 h-3 rounded-full mr-1.5" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                      {entry.name} ({entry.value})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JOBS ANALYTICS SECTION */}
      {activeSection === 'jobs' && jobData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Application Status Pipeline</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobData.applicationStatus} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                    <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.1}} />
                    <Bar dataKey="value" name="Candidates" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                      {jobData.applicationStatus.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Categories by Volume</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={jobData.categories} cx="50%" cy="50%" outerRadius={100} labelLine={false} dataKey="count" stroke="none" label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {jobData.categories.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ASSESSMENTS ANALYTICS SECTION */}
      {activeSection === 'assessments' && assessmentData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Popular Assessments (Attempts vs Score)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assessmentData.popular} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => val.split(' ')[0]} />
                    <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.1}} />
                    <Bar yAxisId="left" dataKey="attempts" name="Total Attempts" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="score" name="Avg Score (%)" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Difficulty Distribution</h3>
              <div className="h-72 flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={assessmentData.difficultyDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none" label>
                        {assessmentData.difficultyDistribution.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <RechartsTooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM REPORT BUILDER */}
      {activeSection === 'reports' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center"><Settings className="mr-2" /> Custom Report Builder</h2>
            <p className="text-slate-500 text-sm mb-8">Select the parameters below to generate a highly granular platform report.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <div>
                  <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Data Source</label>
                  <Select defaultValue="users">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">User Profiles & Skills</SelectItem>
                      <SelectItem value="jobs">Job Postings & Pipelines</SelectItem>
                      <SelectItem value="courses">Learning Hub Enrollments</SelectItem>
                      <SelectItem value="assessments">Assessment Performance</SelectItem>
                      <SelectItem value="revenue">Financial / Premium</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div>
                  <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Date Range</label>
                  <Select defaultValue="last_month">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="last_week">Last 7 Days</SelectItem>
                      <SelectItem value="last_month">Last 30 Days</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Range...</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div>
                  <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Granularity</label>
                  <Select defaultValue="daily">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div>
                  <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Export Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                      <SelectItem value="excel">Excel Workbook</SelectItem>
                      <SelectItem value="json">Raw JSON</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 mb-8">
               <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Metrics to Include</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Total Count', 'Growth Rate', 'Geographic Distribution', 'Device Usage', 'Role Breakdown', 'Referral Sources', 'Time on Platform', 'Completion Rates'].map((metric, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300" defaultChecked={i < 3} />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{metric}</span>
                    </label>
                  ))}
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-700 gap-4">
              <Button variant="outline" className="w-full sm:w-auto"><Calendar className="mr-2" size={16} /> Schedule Email Delivery</Button>
              <div className="flex gap-3 w-full sm:w-auto">
                 <Button variant="outline" className="flex-1 sm:flex-none">Preview</Button>
                 <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700">Generate Report</Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
