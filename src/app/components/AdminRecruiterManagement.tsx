import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Edit, Trash2, Eye, Download, Users, Mail, AlertTriangle, 
  Ban, ShieldAlert, CheckCircle, Shield, MoreVertical, Loader2, MapPin, Activity, 
  Building2, Briefcase, Globe, Phone, FileText, XCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

export function AdminRecruiterManagement() {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Views: 'list', 'details'
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');
  const [selectedRecruiter, setSelectedRecruiter] = useState<any>(null);
  const [jobsPosted, setJobsPosted] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  
  useEffect(() => {
    if (currentView === 'list') {
      fetchRecruiters();
    }
  }, [page, statusFilter, verificationFilter, currentView]);

  const fetchRecruiters = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(verificationFilter !== 'all' && { verification: verificationFilter }),
        ...(search && { search })
      });
      const data = await api.get(`/admin/recruiters?${params}`);
      setRecruiters(data.data || data.recruiters || []);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} recruiters? This cannot be undone.`)) return;
    try {
      await api.post('/admin/recruiters/bulk-delete', { ids: selectedIds });
      setSelectedIds([]);
      fetchRecruiters();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDetails = async (id: number) => {
    try {
      const [recData, jobsData, actData, appData] = await Promise.all([
        api.get(`/admin/recruiters/${id}`),
        api.get(`/admin/recruiters/${id}/jobs`),
        api.get(`/admin/recruiters/${id}/activity`),
        api.get(`/admin/recruiters/${id}/applications`)
      ]);
      setSelectedRecruiter(recData);
      setJobsPosted(jobsData);
      setActivityLog(actData);
      setApplications(appData);
      setCurrentView('details');
    } catch (e) {
      console.error("Failed to load details");
    }
  };

  const handleVerification = async (id: number, status: string, reason?: string) => {
    const checklist = { website: true, domain: true, phone: true, manual: true };
    await api.put(`/admin/recruiters/${id}/verify`, { status, checklist, reason });
    if (currentView === 'details') fetchDetails(id);
    else fetchRecruiters();
  };

  const toggleStatus = async (id: number, newStatus: string) => {
    await api.put(`/admin/recruiters/${id}/status`, { status: newStatus });
    if (currentView === 'details') fetchDetails(id);
    else fetchRecruiters();
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400',
      suspended: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400',
      banned: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-400',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.inactive}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const VerificationBadge = ({ status }: { status: string }) => {
    if (status === 'verified') return <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded uppercase tracking-wider flex items-center w-fit"><ShieldCheckIcon size={12} className="mr-1" /> Verified</span>;
    if (status === 'rejected') return <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 rounded uppercase tracking-wider flex items-center w-fit"><XCircle size={12} className="mr-1" /> Rejected</span>;
    return <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 rounded uppercase tracking-wider flex items-center w-fit"><AlertTriangle size={12} className="mr-1" /> Pending</span>;
  };

  // ShieldCheckIcon helper
  const ShieldCheckIcon = (props: any) => <Shield {...props} />;

  if (currentView === 'list') {
    return (
      <div className="max-w-7xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Recruiter Management</h1>
          <div className="flex space-x-3">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 size={16} className="mr-2" /> Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button variant="outline" onClick={() => api.download('/admin/recruiters/export', 'recruiters_export.csv')}>
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <Input 
                placeholder="Search company, recruiter name, email..." 
                className="pl-10" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchRecruiters()}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Verification" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verifications</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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
                          const newIds = recruiters.map(r => r.id).filter(id => !selectedIds.includes(id));
                          setSelectedIds([...selectedIds, ...newIds]);
                        } else {
                          const pageIds = recruiters.map(r => r.id);
                          setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
                        }
                      }}
                      checked={recruiters.length > 0 && recruiters.every(r => selectedIds.includes(r.id))}
                    />
                  </th>
                  <th className="p-4 font-medium">Company / Recruiter</th>
                  <th className="p-4 font-medium">Verification</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Jobs Posted</th>
                  <th className="p-4 font-medium">Joined Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                ) : recruiters.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-500">No recruiters found.</td></tr>
                ) : recruiters.map((recruiter) => (
                  <tr key={recruiter.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300"
                        checked={selectedIds.includes(recruiter.id)}
                        onChange={(e) => setSelectedIds(e.target.checked ? [...selectedIds, recruiter.id] : selectedIds.filter(id => id !== recruiter.id))}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                          {recruiter.company?.company_name?.charAt(0) || <Building2 size={20} />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{recruiter.company?.company_name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{recruiter.name} • {recruiter.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <VerificationBadge status={recruiter.company?.verificationStatus || 'pending'} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={recruiter.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-slate-900 dark:text-slate-200">{recruiter.jobsPosted} Total</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{recruiter.activeJobs} Active</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-600 dark:text-slate-300">
                      {new Date(recruiter.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => fetchDetails(recruiter.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" title="View Profile"><Eye size={18} /></button>
                        {recruiter.company?.verificationStatus !== 'verified' && (
                           <button onClick={() => handleVerification(recruiter.id, 'verified')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded" title="Approve Verification"><CheckCircle size={18} /></button>
                        )}
                        <button onClick={() => toggleStatus(recruiter.id, recruiter.status === 'suspended' ? 'active' : 'suspended')} className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded" title={recruiter.status === 'suspended' ? 'Reactivate' : 'Suspend'}>
                          <Ban size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

  if (currentView === 'details' && selectedRecruiter) {
    const company = selectedRecruiter.employer || {};
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back</Button>
          <div className="flex-1"></div>
          {company.verificationStatus !== 'verified' ? (
             <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleVerification(selectedRecruiter.id, 'verified')}><ShieldCheckIcon size={16} className="mr-2" /> Verify Recruiter</Button>
          ) : (
             <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleVerification(selectedRecruiter.id, 'rejected', 'Verification Revoked by Admin')}><XCircle size={16} className="mr-2" /> Revoke Verification</Button>
          )}
          {selectedRecruiter.status !== 'suspended' ? (
             <Button variant="destructive" onClick={() => toggleStatus(selectedRecruiter.id, 'suspended')}><Ban size={16} className="mr-2" /> Suspend Account</Button>
          ) : (
             <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => toggleStatus(selectedRecruiter.id, 'active')}>Reactivate Account</Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
               {company.verificationStatus === 'verified' && (
                 <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">Verified</div>
               )}
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Building2 size={32} />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{company.company_name || 'No Company Name'}</h2>
                    <p className="text-sm text-slate-500">{company.industry || 'Industry not set'}</p>
                 </div>
               </div>
               
               <div className="space-y-3 text-sm">
                  <div className="flex items-center"><Globe size={16} className="text-slate-400 mr-3" /> <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{company.website || 'No website'}</a></div>
                  <div className="flex items-center"><MapPin size={16} className="text-slate-400 mr-3" /> <span className="text-slate-700 dark:text-slate-300">{selectedRecruiter.location || 'Location not set'}</span></div>
               </div>
               
               <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center"><Users size={16} className="mr-2" /> Primary Recruiter</h3>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <p><strong className="text-slate-900 dark:text-white">Name:</strong> {selectedRecruiter.name}</p>
                    <p><strong className="text-slate-900 dark:text-white">Email:</strong> {selectedRecruiter.email}</p>
                    <p><strong className="text-slate-900 dark:text-white">Phone:</strong> {selectedRecruiter.phone || 'N/A'}</p>
                    <p><strong className="text-slate-900 dark:text-white">Status:</strong> <StatusBadge status={selectedRecruiter.status} /></p>
                  </div>
               </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-blue-600">{selectedRecruiter.analytics.totalJobs}</div>
                 <div className="text-xs text-slate-500 mt-1 font-medium">TOTAL JOBS</div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-emerald-600">{selectedRecruiter.analytics.activeJobs}</div>
                 <div className="text-xs text-slate-500 mt-1 font-medium">ACTIVE JOBS</div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-purple-600">{selectedRecruiter.analytics.totalApplications}</div>
                 <div className="text-xs text-slate-500 mt-1 font-medium">APPLICATIONS</div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-amber-500">{selectedRecruiter.analytics.avgAppsPerJob}</div>
                 <div className="text-xs text-slate-500 mt-1 font-medium">AVG APPS/JOB</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Jobs Posted */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
               <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center"><Briefcase size={16} className="mr-2 text-slate-500" /> Jobs Posted</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                     <tr>
                       <th className="p-4 font-medium">Title</th>
                       <th className="p-4 font-medium">Status</th>
                       <th className="p-4 font-medium">Posted</th>
                       <th className="p-4 font-medium text-right">Applicants</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                     {jobsPosted.length === 0 ? (
                       <tr><td colSpan={4} className="p-6 text-center text-slate-500">No jobs posted yet.</td></tr>
                     ) : jobsPosted.map(job => (
                       <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                         <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{job.title}</td>
                         <td className="p-4"><span className={`px-2 py-0.5 text-xs rounded border ${job.status === 'active' || !job.status ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}>{job.status || 'Active'}</span></td>
                         <td className="p-4 text-slate-500">{new Date(job.posted_at).toLocaleDateString()}</td>
                         <td className="p-4 text-right font-medium text-blue-600 dark:text-blue-400">{job._count?.appliedBy || 0}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Recent Applications Received */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
               <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center"><FileText size={16} className="mr-2 text-slate-500" /> Recent Applications Received</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                     <tr>
                       <th className="p-4 font-medium">Candidate</th>
                       <th className="p-4 font-medium">Applied For</th>
                       <th className="p-4 font-medium">Date</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                     {applications.length === 0 ? (
                       <tr><td colSpan={3} className="p-6 text-center text-slate-500">No applications received.</td></tr>
                     ) : applications.slice(0, 5).map(app => (
                       <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                         <td className="p-4">
                           <div className="font-medium text-slate-900 dark:text-slate-200">{app.user?.name}</div>
                           <div className="text-xs text-slate-500">{app.user?.email}</div>
                         </td>
                         <td className="p-4 text-slate-700 dark:text-slate-300">{app.job?.title}</td>
                         <td className="p-4 text-slate-500 text-xs">{new Date(app.applied_at).toLocaleString()}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
