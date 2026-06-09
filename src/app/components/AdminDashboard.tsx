import React, { useState, useEffect } from 'react';
import {
  Home,
  Briefcase,
  BookOpen,
  ClipboardList,
  Users,
  Building2,
  Newspaper,
  BarChart3,
  FileText,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Activity,
  AlertTriangle,
  Plus,
  RefreshCw,
  Terminal
} from 'lucide-react';
import { AdminJobManagement } from './AdminJobManagement';
import { AdminCourseManagement } from './AdminCourseManagement';
import { AdminAssessmentManagement } from './AdminAssessmentManagement';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminRecruiterManagement } from './AdminRecruiterManagement';
import { AdminBlogManagement } from './AdminBlogManagement';
import { AdminAnalyticsManagement } from './AdminAnalyticsManagement';
import { AdminSettingsManagement } from './AdminSettingsManagement';
import { AdminBulkOperations } from './AdminBulkOperations';
import { AdminRBACManagement } from './AdminRBACManagement';
import { AdminIssuesPage } from './AdminIssuesPage';
import { AdminPlaygroundManagement } from './AdminPlaygroundManagement';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { api } from '../utils/api';

interface DashboardStats {
  totalUsers: number;
  activeRecruiters: number;
  totalJobs: number;
  totalCourses: number;
  totalAssessments: number;
  totalBlogs: number;
  systemHealth: string;
}

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success';
}

export function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [jobApps, setJobApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Example admin info - in a real app this would come from auth context
  const adminName = "Super Admin";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, actData, ugData, jaData] = await Promise.all([
        api.get('/admin/dashboard/stats?t=' + Date.now()),
        api.get('/admin/dashboard/activity?t=' + Date.now()),
        api.get('/admin/dashboard/charts/user-growth?t=' + Date.now()),
        api.get('/admin/dashboard/charts/job-applications?t=' + Date.now())
      ]);

      setStats(statsData);
      setActivities(actData);
      setUserGrowth(ugData);
      setJobApps(jaData);
    } catch (error: any) {
      console.error("Failed to fetch admin dashboard data:", error);
      setError(error.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Job Management', icon: Briefcase },
    { id: 'playground', label: 'Playground Mgmt', icon: Terminal },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'recruiters', label: 'Recruiters', icon: Building2 },
    { id: 'blog', label: 'Blog/News', icon: Newspaper },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'User Reports', icon: AlertTriangle },
    { id: 'bulk', label: 'Bulk & Export', icon: FileText },
    { id: 'rbac', label: 'Access Control', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          {isSidebarOpen && (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AdminPanel
            </span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${isSidebarOpen ? 'justify-start px-3' : 'justify-center'} py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <Icon size={20} className={isSidebarOpen ? 'mr-3' : ''} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button className={`w-full flex items-center ${isSidebarOpen ? 'justify-start px-3' : 'justify-center'} py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors`}>
            <LogOut size={20} className={isSidebarOpen ? 'mr-3' : ''} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Home size={16} className="mr-2" />
            <span>Admin</span>
            <ChevronRight size={16} className="mx-1" />
            <span className="capitalize font-medium text-slate-900 dark:text-white">
              {navItems.find(i => i.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-700 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            <button onClick={() => alert("No new notifications at this time.")} className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                {adminName.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-900 dark:text-white leading-tight">{adminName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 p-6 text-center">
              <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-2xl border border-rose-200 dark:border-rose-800 max-w-md">
                <AlertTriangle className="mx-auto text-rose-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Error</h2>
                <p className="text-slate-500 text-sm mb-6">{error}</p>
                <button 
                  onClick={fetchDashboardData}
                  className="flex items-center mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <RefreshCw size={16} className="mr-2" /> Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-6">
              {activeTab === 'dashboard' ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <div className="flex space-x-3">
                      <button onClick={() => setActiveTab('jobs')} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                        <Plus size={16} className="mr-2" /> Post Job
                      </button>
                      <button onClick={() => setActiveTab('analytics')} className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium transition-colors">
                        <FileText size={16} className="mr-2" /> Generate Report
                      </button>
                    </div>
                  </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-500/10' },
              { label: 'Active Recruiters', value: stats?.activeRecruiters || 0, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
              { label: 'Total Jobs Posted', value: stats?.totalJobs || 0, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-500/10' },
              { label: 'System Health', value: stats?.systemHealth || 'Unknown', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default group">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} mr-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                      <TrendingUp size={20} className="mr-2 text-blue-500" />
                      User Growth (30 Days)
                    </h3>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowth}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Applications</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={jobApps}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          cursor={{fill: '#334155', opacity: 0.1}}
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        />
                        <Bar dataKey="apps" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Activity Feed & Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity (Audit Log)</h3>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors border-l-4 border-blue-500">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-slate-600 dark:text-slate-300">
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900 dark:text-slate-200">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <AlertTriangle size={20} className="mr-2 text-amber-500" />
                    System Alerts
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">High API Latency</p>
                      <p className="text-xs text-amber-700 dark:text-amber-500 mt-1">Jobs API response time &gt; 500ms over the last 10 minutes.</p>
                    </div>
                    <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-lg">
                      <p className="text-sm font-semibold text-rose-800 dark:text-rose-400">Failed Logins Spike</p>
                      <p className="text-xs text-rose-700 dark:text-rose-500 mt-1">Detected 45 failed login attempts from IP 192.168.1.5</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            ) : activeTab === 'jobs' ? (
            <AdminJobManagement />
          ) : activeTab === 'playground' ? (
            <AdminPlaygroundManagement />
          ) : activeTab === 'courses' ? (
            <AdminCourseManagement />
          ) : activeTab === 'assessments' ? (
            <AdminAssessmentManagement />
          ) : activeTab === 'users' ? (
            <AdminUserManagement />
          ) : activeTab === 'recruiters' ? (
            <AdminRecruiterManagement />
          ) : activeTab === 'blog' ? (
            <AdminBlogManagement />
          ) : activeTab === 'analytics' ? (
            <AdminAnalyticsManagement />
          ) : activeTab === 'reports' ? (
            <AdminIssuesPage />
          ) : activeTab === 'settings' ? (
            <AdminSettingsManagement />
          ) : activeTab === 'bulk' ? (
            <AdminBulkOperations />
          ) : activeTab === 'rbac' ? (
            <AdminRBACManagement />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
              <div className="text-center">
                <Settings size={48} className="mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-medium mb-2">Module Under Construction</h2>
                <p>The {navItems.find(i => i.id === activeTab)?.label} module is currently being developed.</p>
              </div>
            </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
