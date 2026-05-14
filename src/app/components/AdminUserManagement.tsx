import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Edit, Trash2, Eye, Download, Users, Mail, AlertTriangle, 
  Ban, ShieldAlert, CheckCircle, Shield, MoreVertical, Loader2, MapPin, Activity, 
  Calendar, Key, Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

export function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Views: 'list', 'details', 'create'
  const [currentView, setCurrentView] = useState<'list' | 'details' | 'create'>('list');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Form State for Create/Edit
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  });
  const [loginHistory, setLoginHistory] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  
  useEffect(() => {
    if (currentView === 'list') {
      fetchUsers();
    }
  }, [page, roleFilter, statusFilter, currentView]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        ...(roleFilter !== 'all' && { role: roleFilter }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(search && { search })
      });
      const data = await api.get(`/admin/users?${params}`);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (id: number) => {
    try {
      const [user, history, activity] = await Promise.all([
        api.get(`/admin/users/${id}`),
        api.get(`/admin/users/${id}/login-history`),
        api.get(`/admin/users/${id}/activity`)
      ]);
      setSelectedUser(user);
      setLoginHistory(history);
      setActivityLog(activity);
      setCurrentView('details');
    } catch (e) {
      console.error("Failed to load details");
    }
  };

  const handleBulkAction = async (action: string, value?: string) => {
    if (!window.confirm(`Apply bulk ${action} to ${selectedIds.length} users?`)) return;
    try {
      await api.post('/admin/users/bulk-action', { ids: selectedIds, action, value });
      setSelectedIds([]);
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleStatus = async (id: number, newStatus: string) => {
    await api.put(`/admin/users/${id}/status`, { status: newStatus });
    if (currentView === 'details') fetchUserDetails(id);
    else fetchUsers();
  };

  const deleteUser = async (id: number) => {
    if (!window.confirm('Delete this user? This action is permanent and deletes all associated data.')) return;
    await api.delete(`/admin/users/${id}`);
    if (currentView !== 'list') setCurrentView('list');
    else fetchUsers();
  };

  const resetPassword = async (id: number) => {
    await api.post(`/admin/users/${id}/reset-password`, {});
    alert('Password reset link sent to user email.');
  };

  const handleCreateUser = async () => {
    if (!userForm.name || !userForm.email || !userForm.password) {
      alert('Name, Email, and Password are required.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/admin/users', userForm);
      setCurrentView('list');
      fetchUsers();
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
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

  const RoleBadge = ({ role }: { role: string }) => {
    const colors: Record<string, string> = {
      admin: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200',
      recruiter: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200',
      user: 'text-slate-600 bg-slate-50 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${colors[role] || colors.user}`}>
        {role === 'admin' ? <Shield size={10} className="inline mr-1" /> : null}
        {role}
      </span>
    );
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="max-w-7xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <div className="flex space-x-3">
            {selectedIds.length > 0 && (
              <>
                <Button variant="outline" className="text-red-600" onClick={() => handleBulkAction('status', 'banned')}>
                  <Ban size={16} className="mr-2" /> Ban Selected
                </Button>
                <Button variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 size={16} className="mr-2" /> Delete ({selectedIds.length})
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => api.download('/admin/users/export', 'users_export.csv')}>
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
            <Button onClick={() => { 
              setUserForm({ name: '', email: '', password: '', role: 'user', status: 'active' });
              setCurrentView('create'); 
            }} className="bg-blue-600 hover:bg-blue-700">
              <Users size={16} className="mr-2" /> Add User
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <Input 
                placeholder="Search by name, email, location..." 
                className="pl-10" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchUsers()}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
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
                          const newIds = users.map(u => u.id).filter(id => !selectedIds.includes(id));
                          setSelectedIds([...selectedIds, ...newIds]);
                        } else {
                          const pageIds = users.map(u => u.id);
                          setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
                        }
                      }}
                      checked={users.length > 0 && users.every(u => selectedIds.includes(u.id))}
                    />
                  </th>
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role & Status</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Joined Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-500">No users found.</td></tr>
                ) : users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300"
                        checked={selectedIds.includes(user.id)}
                        onChange={(e) => setSelectedIds(e.target.checked ? [...selectedIds, user.id] : selectedIds.filter(id => id !== user.id))}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 flex items-center justify-center font-bold">
                          {user.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-1.5">
                        <RoleBadge role={user.role} />
                        <StatusBadge status={user.status} />
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-600 dark:text-slate-300">
                      {user.location ? <><MapPin size={12} className="inline mr-1" />{user.location}</> : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-slate-900 dark:text-slate-200">{new Date(user.createdAt).toLocaleDateString()}</span>
                        <span className="text-slate-500">Profile: {user.profileCompletion}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => fetchUserDetails(user.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" title="View Profile"><Eye size={18} /></button>
                        <button onClick={() => toggleStatus(user.id, user.status === 'banned' ? 'active' : 'banned')} className={`p-1.5 rounded ${user.status === 'banned' ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`} title={user.status === 'banned' ? 'Unban User' : 'Ban User'}>
                          {user.status === 'banned' ? <CheckCircle size={18} /> : <Ban size={18} />}
                        </button>
                        <button onClick={() => deleteUser(user.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded" title="Delete"><Trash2 size={18} /></button>
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

  // DETAILS VIEW
  if (currentView === 'details' && selectedUser) {
    const stats = selectedUser._count || { appliedJobs: 0, enrolledCourses: 0, testAssessments: 0, certificates: 0 };
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back to Directory</Button>
          <div className="flex-1"></div>
          <Button variant="outline" onClick={() => resetPassword(selectedUser.id)}><Key size={16} className="mr-2" /> Reset Pass</Button>
          <Button variant="outline" onClick={() => window.open(`mailto:${selectedUser.email}`)}><Mail size={16} className="mr-2" /> Email</Button>
          {selectedUser.status !== 'banned' ? (
             <Button variant="destructive" onClick={() => toggleStatus(selectedUser.id, 'banned')}><Ban size={16} className="mr-2" /> Ban User</Button>
          ) : (
             <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => toggleStatus(selectedUser.id, 'active')}><CheckCircle size={16} className="mr-2" /> Unban User</Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {selectedUser.name?.charAt(0) || '?'}
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedUser.name}</h2>
                    <p className="text-sm text-slate-500">{selectedUser.email}</p>
                 </div>
               </div>
               
               <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 flex items-center"><Shield size={14} className="mr-2" /> Role</span>
                    <div className="flex gap-2">
                       <RoleBadge role={selectedUser.role} />
                        <Select defaultValue={selectedUser.role} onValueChange={async (v) => {
                           await api.put(`/admin/users/${selectedUser.id}/role`, { role: v });
                           fetchUserDetails(selectedUser.id);
                        }}>
                          <SelectTrigger className="w-[100px] h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                             <SelectItem value="user">User</SelectItem>
                             <SelectItem value="recruiter">Recruiter</SelectItem>
                             <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                       </Select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 flex items-center"><Activity size={14} className="mr-2" /> Status</span>
                    <div className="flex gap-2">
                       <StatusBadge status={selectedUser.status} />
                        <Select defaultValue={selectedUser.status} onValueChange={async (v) => {
                           await api.put(`/admin/users/${selectedUser.id}/status`, { status: v });
                           fetchUserDetails(selectedUser.id);
                        }}>
                          <SelectTrigger className="w-[100px] h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                             <SelectItem value="active">Active</SelectItem>
                             <SelectItem value="inactive">Inactive</SelectItem>
                             <SelectItem value="banned">Banned</SelectItem>
                          </SelectContent>
                       </Select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 flex items-center"><MapPin size={14} className="mr-2" /> Location</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedUser.location || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 flex items-center"><Calendar size={14} className="mr-2" /> Joined</span>
                    <span className="font-medium text-slate-900 dark:text-white">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                  </div>
               </div>

               <div className="mt-6">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Profile Completion</span>
                    <span className="font-bold text-blue-600">{selectedUser.profileCompletion}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedUser.profileCompletion}%` }}></div>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Professional Skills</h3>
               {selectedUser.skills && selectedUser.skills.length > 0 ? (
                 <div className="flex flex-wrap gap-2">
                   {selectedUser.skills.map((skill: string, i: number) => (
                     <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium">
                       {skill}
                     </span>
                   ))}
                 </div>
               ) : (
                 <p className="text-sm text-slate-500">No skills added yet.</p>
               )}
            </div>
          </div>

          {/* Middle/Right Column - Activity & Related Data */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-blue-600">{stats.appliedJobs}</div>
                 <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Jobs Applied</div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-emerald-600">{stats.enrolledCourses}</div>
                 <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Courses</div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-amber-500">{stats.testAssessments}</div>
                 <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Assessments</div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                 <div className="text-2xl font-bold text-purple-600">{stats.certificates}</div>
                 <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Certificates</div>
               </div>
            </div>

            {/* Login History */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
               <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center"><Clock size={16} className="mr-2 text-slate-500" /> Recent Logins</h3>
               </div>
               <div className="p-0">
                 {loginHistory.length > 0 ? (
                   <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                     {loginHistory.map((login: any, i: number) => (
                       <li key={i} className="p-4 flex justify-between items-center text-sm">
                         <div>
                           <p className="font-medium text-slate-800 dark:text-slate-200">{new Date(login.timestamp).toLocaleString()}</p>
                           <p className="text-xs text-slate-500 mt-0.5 max-w-[200px] md:max-w-md truncate" title={login.userAgent}>{login.userAgent || 'Unknown Device'}</p>
                         </div>
                         <div className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-mono">
                           {login.ip || 'Hidden IP'}
                         </div>
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <div className="p-6 text-center text-slate-500 text-sm">No recent login history found.</div>
                 )}
               </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
               <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center"><Activity size={16} className="mr-2 text-slate-500" /> User Activity Timeline</h3>
               </div>
               <div className="p-6">
                 {activityLog.length > 0 ? (
                   <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
                     {activityLog.map((act: any, i: number) => (
                       <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                         <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-700 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                           <Activity size={16} />
                         </div>
                         <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                           <div className="flex items-center justify-between space-x-2 mb-1">
                             <div className="font-bold text-slate-900 dark:text-white text-sm">{act.action}</div>
                             <time className="font-mono text-xs text-slate-500">{new Date(act.timestamp).toLocaleDateString()}</time>
                           </div>
                           <div className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{act.details || 'Performed action on platform.'}</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center text-slate-500 text-sm">No activity recorded yet.</div>
                 )}
               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // CREATE USER VIEW
  if (currentView === 'create') {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create New User</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <Input value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email Address</label>
            <Input type="email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} placeholder="john@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Initial Password</label>
            <Input type="password" value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <Select value={userForm.role} onValueChange={v => setUserForm({...userForm, role: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Standard User</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select value={userForm.status} onValueChange={v => setUserForm({...userForm, status: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
             <Button variant="outline" onClick={() => setCurrentView('list')} disabled={loading}>Cancel</Button>
             <Button onClick={handleCreateUser} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
               {loading && <Loader2 size={16} className="animate-spin mr-2" />}
               Create User Account
             </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
