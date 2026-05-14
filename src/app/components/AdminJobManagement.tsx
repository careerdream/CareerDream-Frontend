import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Download, CheckCircle, 
  XCircle, Clock, Star, Users, BarChart2, MoreVertical, X, Loader2 
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AdminJobManagement() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Views: 'list', 'edit', 'details'
  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'details'>('list');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  
  useEffect(() => {
    if (currentView === 'list') {
      fetchJobs();
    }
  }, [page, statusFilter, currentView]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(search && { search })
      });
      const data = await api.get(`/admin/jobs?${params}`);
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetails = async (id: number) => {
    try {
      const [job, applicants, analytics] = await Promise.all([
        api.get(`/admin/jobs/${id}`),
        api.get(`/admin/jobs/${id}/applicants`),
        api.get(`/admin/jobs/${id}/analytics`)
      ]);
      setSelectedJob(job);
      setApplicants(applicants);
      setAnalytics(analytics);
      setCurrentView('details');
    } catch (e) {
      console.error("Failed to load details");
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} jobs?`)) return;
    try {
      await api.post('/admin/jobs/bulk-delete', { ids: selectedIds });
      setSelectedIds([]);
      fetchJobs();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'expired' : 'active';
    await api.put(`/admin/jobs/${id}/status`, { status: newStatus });
    fetchJobs();
  };

  const toggleFeature = async (id: number, featured: boolean) => {
    await api.put(`/admin/jobs/${id}/feature`, { featured: !featured });
    fetchJobs();
  };

  const deleteJob = async (id: number) => {
    if (!window.confirm('Delete this job?')) return;
    await api.delete(`/admin/jobs/${id}`);
    if (currentView === 'details') setCurrentView('list');
    else fetchJobs();
  };

  const StatusBadge = ({ status, featured }: { status: string, featured?: boolean }) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400',
      expired: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400',
    };
    return (
      <div className="flex gap-2">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.draft}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {featured && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 flex items-center">
            <Star size={12} className="mr-1 fill-blue-500" /> Featured
          </span>
        )}
      </div>
    );
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Management</h1>
          <div className="flex space-x-3">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 size={16} className="mr-2" /> Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button variant="outline" onClick={() => api.download('/admin/jobs/export', 'jobs_export.csv')}>
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
            <Button onClick={() => { setSelectedJob(null); setCurrentView('edit'); }} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" /> Create Job
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <Input 
                placeholder="Search jobs, company, location..." 
                className="pl-10" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchJobs()}
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter size={16} className="mr-2 text-slate-400" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="p-4 w-12">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newIds = jobs.map(j => j.id).filter(id => !selectedIds.includes(id));
                          setSelectedIds([...selectedIds, ...newIds]);
                        } else {
                          const pageIds = jobs.map(j => j.id);
                          setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
                        }
                      }}
                      checked={jobs.length > 0 && jobs.every(j => selectedIds.includes(j.id))}
                    />
                  </th>
                  <th className="p-4 font-medium">Job Info</th>
                  <th className="p-4 font-medium">Status & Badges</th>
                  <th className="p-4 font-medium">Stats</th>
                  <th className="p-4 font-medium">Posted</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                ) : jobs.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-500">No jobs found.</td></tr>
                ) : jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300"
                        checked={selectedIds.includes(job.id)}
                        onChange={(e) => setSelectedIds(e.target.checked ? [...selectedIds, job.id] : selectedIds.filter(id => id !== job.id))}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{job.title}</p>
                      <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={job.status || 'active'} featured={job.featured} />
                    </td>
                    <td className="p-4 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-3">
                        <span title="Applications"><Users size={14} className="inline mr-1" />{job._count?.appliedBy || 0}</span>
                        <span title="Views"><Eye size={14} className="inline mr-1" />{job.stats?.views_count || 0}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(job.posted_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => fetchJobDetails(job.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" title="View Analytics & Applicants"><BarChart2 size={18} /></button>
                        <button onClick={() => { setSelectedJob(job); setCurrentView('edit'); }} className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded" title="Edit"><Edit size={18} /></button>
                        <button onClick={() => toggleFeature(job.id, job.featured)} className={`p-1.5 rounded ${job.featured ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-400 hover:bg-slate-100'}`} title="Toggle Featured"><Star size={18} /></button>
                        <button onClick={() => deleteJob(job.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
            <p className="text-slate-500">Showing page {page} of {totalPages || 1}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DETAILS / ANALYTICS VIEW
  if (currentView === 'details' && selectedJob && analytics) {
    const pieData = Object.entries(analytics.statusDistribution).map(([name, value]) => ({ name, value }));

    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back to Jobs</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex-1">{selectedJob.title} - {selectedJob.company}</h1>
          <StatusBadge status={selectedJob.status} featured={selectedJob.featured} />
          <Button variant="outline" onClick={() => { setCurrentView('edit'); }}><Edit size={16} className="mr-2" /> Edit Job</Button>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{analytics.views}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Total Applications</h3>
            <p className="text-3xl font-bold text-blue-600">{analytics.applications}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
             <div className="w-full h-24">
                {analytics.applications > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} paddingAngle={2} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-sm text-slate-500 mt-8">No applications yet</p>
                )}
             </div>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Applicants ({applicants.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                <tr>
                  <th className="p-4 font-medium">Candidate</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Top Skills</th>
                  <th className="p-4 font-medium">Applied At</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {applicants.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No applicants yet.</td></tr>
                ) : applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <p className="font-semibold">{app.user?.name || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">{app.user?.email}</p>
                    </td>
                    <td className="p-4">{app.user?.location || 'N/A'}</td>
                    <td className="p-4 max-w-xs truncate text-xs">
                       {Array.isArray(app.user?.skills) ? app.user.skills.slice(0,3).join(', ') : 'N/A'}
                    </td>
                    <td className="p-4">{new Date(app.applied_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // CREATE / EDIT FORM VIEW (Simplified for integration)
  if (currentView === 'edit') {
    const isEdit = !!selectedJob;
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView(isEdit ? 'details' : 'list')}>← Back</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{isEdit ? 'Edit Job' : 'Create New Job'}</h1>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 mb-8">This would embed the full JobFormModal with all fields pre-populated for ID: {selectedJob?.id}. For brevity in this system integration, click "Save" to simulate saving.</p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div><label className="text-sm font-medium">Job Title</label><Input id="job-title-input" defaultValue={selectedJob?.title} className="mt-1" placeholder="Job Title" /></div>
            <div><label className="text-sm font-medium">Company</label><Input id="job-company-input" defaultValue={selectedJob?.company} className="mt-1" placeholder="Company" /></div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select id="job-status-select" defaultValue={selectedJob?.status || 'active'}>
                <SelectTrigger className="mt-1"><SelectValue id="job-status-value" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
               <label className="flex items-center gap-2 mt-8 cursor-pointer">
                 <input id="job-featured-check" type="checkbox" defaultChecked={selectedJob?.featured} className="w-4 h-4 rounded" />
                 <span className="text-sm font-medium">Featured Job</span>
               </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
             <Button variant="outline" onClick={() => setCurrentView(isEdit ? 'details' : 'list')} disabled={loading}>Cancel</Button>
             <Button 
               className="bg-blue-600 hover:bg-blue-700" 
               disabled={loading}
               onClick={async () => {
                setLoading(true);
                try {
                  const jobData = {
                    title: (document.getElementById('job-title-input') as HTMLInputElement)?.value,
                    company: (document.getElementById('job-company-input') as HTMLInputElement)?.value,
                    status: selectedJob?.status || 'active', // Simplified for this demo
                    featured: (document.getElementById('job-featured-check') as HTMLInputElement)?.checked
                  };

                  if (isEdit) {
                    await api.put(`/admin/jobs/${selectedJob.id}`, jobData);
                  } else {
                    await api.post('/admin/jobs', jobData);
                  }
                  setCurrentView('list');
                  fetchJobs();
                } catch (e) {
                  console.error("Save failed", e);
                } finally {
                  setLoading(false);
                }
             }}>
               {loading && <Loader2 size={16} className="animate-spin mr-2" />}
               {isEdit ? 'Update Job' : 'Create Job'}
             </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
