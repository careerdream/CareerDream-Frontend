import React, { useState, useEffect } from 'react';
import {
  Shield, Users, Plus, Edit, Trash2, Eye, CheckCircle, XCircle,
  Key, Activity, AlertTriangle, Loader2, ChevronDown, ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

const MODULES = [
  { key: 'users',       label: 'Users',         actions: ['read','create','update','delete','ban','suspend'] },
  { key: 'recruiters',  label: 'Recruiters',     actions: ['read','create','update','delete','verify'] },
  { key: 'jobs',        label: 'Jobs',           actions: ['read','create','update','delete','feature'] },
  { key: 'courses',     label: 'Courses',        actions: ['read','create','update','delete','publish'] },
  { key: 'assessments', label: 'Assessments',    actions: ['read','create','update','delete','publish'] },
  { key: 'blog',        label: 'Blog',           actions: ['read','create','update','delete','publish','moderate'] },
  { key: 'analytics',   label: 'Analytics',      actions: ['read'] },
  { key: 'settings',    label: 'Settings',       actions: ['read','update','execute'] },
  { key: 'reports',     label: 'Reports',        actions: ['read','create','export'] },
  { key: 'admins',      label: 'Admin Mgmt',     actions: ['read','create','update','delete'] },
];

const ROLE_COLORS: Record<string, string> = {
  super_admin:      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  content_admin:    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  job_admin:        'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  user_support:     'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  recruiter_manager:'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  analytics_admin:  'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
};

type Tab = 'admins' | 'roles' | 'audit';

export function AdminRBACManagement() {
  const [tab, setTab] = useState<Tab>('admins');
  const [admins, setAdmins] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  // Admin form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRoleId, setNewRoleId] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // Role editor
  const [editingRole, setEditingRole] = useState<any>(null);
  const [editPerms, setEditPerms] = useState<any>({});

  // Audit filters
  const [auditAction, setAuditAction] = useState('');
  const [auditResource, setAuditResource] = useState('');

  useEffect(() => {
    fetchRoles();
    if (tab === 'admins') fetchAdmins();
    if (tab === 'audit') fetchAudit();
  }, [tab]);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await api.get('/admin/admins');
      setAdmins(data.admins || []);
    } finally { setLoading(false); }
  };

  const fetchRoles = async () => {
    const data = await api.get('/admin/admins/roles');
    setRoles(data);
  };

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...(auditAction && { action: auditAction }), ...(auditResource && { resourceType: auditResource }) });
      const data = await api.get(`/admin/admins/audit-log?${params}`);
      setAuditLogs(data.logs || []);
    } finally { setLoading(false); }
  };

  const seedRoles = async () => {
    setSeeding(true);
    try {
      const data = await api.post('/admin/admins/seed-roles', {});
      alert(data.message || 'Roles seeded');
      fetchRoles();
    } catch (e: any) {
      alert(e.message || 'Seeding failed');
    }
    setSeeding(false);
  };

  const createAdmin = async () => {
    if (!newEmail || !newRoleId) return alert('Email and Role are required');
    setAddLoading(true);
    try {
      await api.post('/admin/admins', { email: newEmail, name: newName, roleId: newRoleId });
      setShowAddForm(false); setNewEmail(''); setNewName(''); setNewRoleId('');
      fetchAdmins();
    } catch (e: any) {
      alert(e.message || 'Failed to create admin');
    }
    setAddLoading(false);
  };

  const changeRole = async (adminId: number, roleId: string) => {
    await api.put(`/admin/admins/${adminId}/role`, { roleId });
    fetchAdmins();
  };

  const toggleActive = async (adminId: number, current: boolean) => {
    await api.put(`/admin/admins/${adminId}/status`, { isActive: !current });
    fetchAdmins();
  };

  const deleteAdmin = async (adminId: number) => {
    if (!window.confirm('Remove this admin? Their user account will be downgraded to regular user.')) return;
    await api.delete(`/admin/admins/${adminId}`);
    fetchAdmins();
  };

  const resetPassword = async (adminId: number) => {
    await api.post(`/admin/admins/${adminId}/reset-password`, {});
    alert('Password reset email sent.');
  };

  const startEditRole = (role: any) => {
    setEditingRole(role);
    setEditPerms(JSON.parse(JSON.stringify(role.permissions)));
  };

  const togglePerm = (module: string, action: string) => {
    setEditPerms((prev: any) => ({
      ...prev,
      [module]: { ...prev[module], [action]: !prev[module]?.[action] }
    }));
  };

  const saveRolePerms = async () => {
    await api.put(`/admin/admins/roles/${editingRole.id}`, { description: editingRole.description, permissions: editPerms });
    setEditingRole(null);
    fetchRoles();
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Shield className="mr-2 text-purple-500" /> Role-Based Access Control
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage admin accounts, roles, permissions, and audit trails.</p>
        </div>
        <Button variant="outline" onClick={seedRoles} disabled={seeding} className="text-purple-600 border-purple-200">
          {seeding ? <Loader2 size={16} className="animate-spin mr-2" /> : <Shield size={16} className="mr-2" />}
          Seed Default Roles
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-slate-200 dark:border-slate-700 mb-6">
        {([['admins','Admin Directory',Users],['roles','Roles & Permissions',Shield],['audit','Audit Log',Activity]] as const).map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id as Tab)}
            className={`flex items-center px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === id ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            <Icon size={16} className="mr-2" />{label}
          </button>
        ))}
      </div>

      {/* ── ADMIN DIRECTORY ── */}
      {tab === 'admins' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" /> Add New Admin
            </Button>
          </div>

          {showAddForm && (
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Invite New Admin</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs font-medium mb-1 block text-slate-500">Full Name</label>
                  <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block text-slate-500">Email Address *</label>
                  <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="admin@careerdream.in" type="email" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block text-slate-500">Assign Role *</label>
                  <Select value={newRoleId} onValueChange={setNewRoleId}>
                    <SelectTrigger><SelectValue placeholder="Select role..." /></SelectTrigger>
                    <SelectContent>
                      {roles.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.roleName.replace(/_/g,' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={createAdmin} disabled={addLoading} className="bg-blue-600 hover:bg-blue-700">
                  {addLoading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Plus size={14} className="mr-2" />}
                  Create Admin
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                  <tr>
                    <th className="p-4 font-medium">Admin</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Invited</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                  ) : admins.length === 0 ? (
                    <tr><td colSpan={5} className="p-10 text-center">
                      <Shield size={40} className="mx-auto mb-3 text-slate-300" />
                      <p className="text-slate-500 mb-1">No admins configured yet.</p>
                      <p className="text-xs text-slate-400">Click "Add New Admin" to create the first admin account.</p>
                    </td></tr>
                  ) : admins.map(admin => (
                    <tr key={admin.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {admin.user?.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{admin.user?.name}</p>
                            <p className="text-xs text-slate-500">{admin.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Select value={String(admin.roleId)} onValueChange={v => changeRole(admin.id, v)}>
                          <SelectTrigger className="w-[160px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.roleName.replace(/_/g,' ')}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <span className={`mt-1 inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase ${ROLE_COLORS[admin.role?.roleName] || 'bg-slate-100 text-slate-600'}`}>
                          {admin.role?.roleName?.replace(/_/g,' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => toggleActive(admin.id, admin.isActive)}
                          className={`flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${admin.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-700'}`}>
                          {admin.isActive ? <><CheckCircle size={12} className="mr-1" /> Active</> : <><XCircle size={12} className="mr-1" /> Inactive</>}
                        </button>
                      </td>
                      <td className="p-4 text-xs text-slate-500">{new Date(admin.invitedAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => resetPassword(admin.id)} title="Reset Password" className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded"><Key size={16} /></button>
                          <button onClick={() => deleteAdmin(admin.id)} title="Remove Admin" className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── ROLES & PERMISSIONS ── */}
      {tab === 'roles' && (
        <div className="space-y-4">
          {editingRole ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Edit Permissions: <span className="text-purple-600">{editingRole.roleName.replace(/_/g,' ')}</span>
                  </h3>
                  <p className="text-sm text-slate-500">{editingRole.description}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setEditingRole(null)}>Cancel</Button>
                  <Button onClick={saveRolePerms} className="bg-purple-600 hover:bg-purple-700">Save Permissions</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-300 w-40">Module</th>
                      {['read','create','update','delete','publish','feature','ban','suspend','verify','moderate','execute','export'].map(a => (
                        <th key={a} className="p-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">{a}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {MODULES.map(mod => (
                      <tr key={mod.key} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{mod.label}</td>
                        {['read','create','update','delete','publish','feature','ban','suspend','verify','moderate','execute','export'].map(action => (
                          <td key={action} className="p-3 text-center">
                            {mod.actions.includes(action) ? (
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                                checked={editPerms[mod.key]?.[action] || false}
                                onChange={() => togglePerm(mod.key, action)}
                              />
                            ) : (
                              <span className="text-slate-200 dark:text-slate-700">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.length === 0 ? (
                <div className="md:col-span-2 text-center py-16 text-slate-500">
                  <Shield size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="mb-4">No roles defined yet.</p>
                  <Button onClick={seedRoles} className="bg-purple-600 hover:bg-purple-700">
                    <Shield size={16} className="mr-2" /> Seed 6 Default Roles
                  </Button>
                </div>
              ) : roles.map(role => {
                const permModules = Object.keys(role.permissions || {});
                const totalPerms = Object.values(role.permissions || {}).reduce((acc: number, mod: any) => acc + Object.values(mod).filter(Boolean).length, 0);
                return (
                  <div key={role.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded uppercase tracking-wider mb-2 ${ROLE_COLORS[role.roleName] || 'bg-slate-100 text-slate-600'}`}>
                          {role.roleName.replace(/_/g,' ')}
                        </span>
                        <p className="text-sm text-slate-500">{role.description}</p>
                      </div>
                      <button onClick={() => startEditRole(role)} className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg">
                        <Edit size={16} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                      {permModules.map(mod => (
                        <span key={mod} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded capitalize">{mod}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <span>{totalPerms} permission{totalPerms !== 1 ? 's' : ''} granted</span>
                      <span>{role._count?.admins || 0} admin{(role._count?.admins || 0) !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── AUDIT LOG ── */}
      {tab === 'audit' && (
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <Input value={auditAction} onChange={e => setAuditAction(e.target.value)} placeholder="Filter by action..." className="max-w-[200px]" />
            <Select value={auditResource || 'all'} onValueChange={v => setAuditResource(v === 'all' ? '' : v)}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Resource type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="course">Course</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchAudit} variant="outline">Apply Filter</Button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                  <tr>
                    <th className="p-4 font-medium">Timestamp</th>
                    <th className="p-4 font-medium">Admin</th>
                    <th className="p-4 font-medium">Action</th>
                    <th className="p-4 font-medium">Resource</th>
                    <th className="p-4 font-medium">Resource ID</th>
                    <th className="p-4 font-medium">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                  ) : auditLogs.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-slate-500">No audit logs found.</td></tr>
                  ) : auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                      <td className="p-4 text-xs text-slate-500 font-mono">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{log.adminEmail || `Admin #${log.adminId}`}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">{log.action}</span>
                      </td>
                      <td className="p-4 capitalize text-slate-600 dark:text-slate-300">{log.resourceType}</td>
                      <td className="p-4 text-slate-500 font-mono text-xs">{log.resourceId || '—'}</td>
                      <td className="p-4 text-slate-500 font-mono text-xs">{log.ipAddress || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
