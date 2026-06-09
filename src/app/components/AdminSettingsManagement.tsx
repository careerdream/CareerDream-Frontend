import React, { useState, useEffect } from 'react';
import { 
  Settings, Mail, CreditCard, Shield, Bell, ToggleLeft, Database, 
  AlertOctagon, Plug, Users, FileCheck, Save, RefreshCw, Eye, Download, Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api } from '../utils/api';

export function AdminSettingsManagement() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const categories = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'email', label: 'Email Configuration', icon: Mail },
    { id: 'payment', label: 'Payment & Subscription', icon: CreditCard },
    { id: 'security', label: 'Security Settings', icon: Shield },
    { id: 'notifications', label: 'Notification Alerts', icon: Bell },
    { id: 'features', label: 'Feature Flags', icon: ToggleLeft },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'moderation', label: 'Moderation Policies', icon: AlertOctagon },
    { id: 'integrations', label: 'Integrations & Webhooks', icon: Plug },
    { id: 'admins', label: 'Admin Management', icon: Users },
    { id: 'audit', label: 'Audit & Compliance', icon: FileCheck },
  ];

  useEffect(() => {
    fetchSettings();
    if (activeCategory === 'audit') fetchAuditLogs();
  }, [activeCategory]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/admin/settings/${activeCategory}`);
      setSettings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const data = await api.get('/admin/settings/audit-log');
      setAuditLogs(data.data || data.logs || []);
    } catch(e) {}
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/settings/${activeCategory}`, settings);
      alert('Settings saved successfully!');
    } catch (e: any) {
      alert(e.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const renderContent = () => {
    if (loading && activeCategory !== 'audit') return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    switch (activeCategory) {
      case 'general':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="text-sm font-medium mb-1 block">Platform Name</label>
              <Input value={settings.platformName || ''} onChange={e => handleChange('platformName', e.target.value)} placeholder="CareerDream" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Platform URL</label>
              <Input value={settings.platformUrl || ''} onChange={e => handleChange('platformUrl', e.target.value)} placeholder="https://careerdream.in" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Support Email</label>
                <Input value={settings.supportEmail || ''} onChange={e => handleChange('supportEmail', e.target.value)} placeholder="support@careerdream.in" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Support Phone</label>
                <Input value={settings.supportPhone || ''} onChange={e => handleChange('supportPhone', e.target.value)} placeholder="+1 234 567 8900" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Primary Color Hex</label>
                <div className="flex gap-2">
                  <input type="color" value={settings.primaryColor || '#2563eb'} onChange={e => handleChange('primaryColor', e.target.value)} className="h-10 w-10 p-1 border rounded" />
                  <Input value={settings.primaryColor || '#2563eb'} onChange={e => handleChange('primaryColor', e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-lg font-semibold border-b pb-2">SMTP Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">SMTP Host</label>
                <Input value={settings.smtpHost || ''} onChange={e => handleChange('smtpHost', e.target.value)} placeholder="smtp.gmail.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">SMTP Port</label>
                <Input type="number" value={settings.smtpPort || ''} onChange={e => handleChange('smtpPort', e.target.value)} placeholder="587" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">SMTP Username</label>
                <Input value={settings.smtpUser || ''} onChange={e => handleChange('smtpUser', e.target.value)} placeholder="admin@domain.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">SMTP Password</label>
                <Input type="password" value={settings.smtpPass || ''} onChange={e => handleChange('smtpPass', e.target.value)} placeholder="••••••••" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Default Sender Email</label>
              <Input value={settings.senderEmail || ''} onChange={e => handleChange('senderEmail', e.target.value)} placeholder="noreply@careerdream.in" />
            </div>
            <div className="pt-4">
              <Button variant="outline" onClick={() => api.post('/admin/settings/test-email', { to: settings.senderEmail || 'admin@localhost' })}>
                <Mail size={16} className="mr-2" /> Send Test Email
              </Button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-lg font-semibold border-b pb-2">Platform Security</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" checked={settings.forceHttps || false} onChange={e => handleChange('forceHttps', e.target.checked)} />
                <span className="font-medium text-slate-700 dark:text-slate-200">Force HTTPS Routing</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" checked={settings.requireMfaAdmin || false} onChange={e => handleChange('requireMfaAdmin', e.target.checked)} />
                <span className="font-medium text-slate-700 dark:text-slate-200">Require MFA for Admin Accounts</span>
              </label>
            </div>
            
            <h3 className="text-lg font-semibold border-b pb-2 mt-8">Authentication Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Session Timeout (Minutes)</label>
                <Input type="number" value={settings.sessionTimeout || 60} onChange={e => handleChange('sessionTimeout', parseInt(e.target.value))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Max Failed Logins before Lockout</label>
                <Input type="number" value={settings.maxFailedLogins || 5} onChange={e => handleChange('maxFailedLogins', parseInt(e.target.value))} />
              </div>
            </div>

            <h3 className="text-lg font-semibold border-b pb-2 mt-8">Password Policy</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Minimum Length</label>
                <Input type="number" className="w-32" value={settings.pwdMinLength || 8} onChange={e => handleChange('pwdMinLength', parseInt(e.target.value))} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" checked={settings.pwdRequireUpper || true} onChange={e => handleChange('pwdRequireUpper', e.target.checked)} />
                <span className="font-medium text-slate-700 dark:text-slate-200">Require Uppercase</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" checked={settings.pwdRequireSpecial || true} onChange={e => handleChange('pwdRequireSpecial', e.target.checked)} />
                <span className="font-medium text-slate-700 dark:text-slate-200">Require Special Character</span>
              </label>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-lg font-semibold border-b pb-2">Global Feature Toggles</h3>
            <p className="text-sm text-slate-500 mb-4">Instantly enable or disable core platform modules without deploying code.</p>
            
            <div className="space-y-4">
              {[
                { key: 'enableUserReg', label: 'User Registration' },
                { key: 'enableRecruiterReg', label: 'Recruiter Registration B2B' },
                { key: 'enableJobs', label: 'Job Board Module' },
                { key: 'enableCourses', label: 'Learning Hub / Courses' },
                { key: 'enableAssessments', label: 'Assessment Engine' },
                { key: 'enableBlog', label: 'Blog & News Module' },
                { key: 'maintenanceMode', label: 'SYSTEM MAINTENANCE MODE', warning: true }
              ].map(feature => (
                <div key={feature.key} className={`flex items-center justify-between p-4 border rounded-lg ${feature.warning ? 'bg-red-50 border-red-200 dark:bg-red-900/10' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                  <div>
                    <span className={`font-semibold ${feature.warning ? 'text-red-700 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>{feature.label}</span>
                    {feature.warning && <p className="text-xs text-red-600 mt-1">Disables entire platform for non-admins.</p>}
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings[feature.key] ?? (feature.warning ? false : true)} onChange={e => handleChange(feature.key, e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-lg font-semibold border-b pb-2">Database Backup Management</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-300">Manual MySQL Backup</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Generate a full SQL dump of the production database.</p>
                </div>
                <Button onClick={async () => {
                  try {
                    const data = await api.post('/admin/settings/backup', {});
                    alert(data.message);
                  } catch (e: any) {
                    alert(e.message || 'Backup failed');
                  }
                }} className="bg-blue-600 hover:bg-blue-700 text-white"><Download size={16} className="mr-2" /> Trigger Backup</Button>
              </div>
            </div>

            <h3 className="text-lg font-semibold border-b pb-2 mt-8">Data Retention Policies (GDPR)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Retain Inactive Users For (Days)</label>
                <Input type="number" value={settings.retentionUsers || 365} onChange={e => handleChange('retentionUsers', parseInt(e.target.value))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Retain Audit Logs For (Days)</label>
                <Input type="number" value={settings.retentionLogs || 90} onChange={e => handleChange('retentionLogs', parseInt(e.target.value))} />
              </div>
            </div>
          </div>
        );

      case 'audit':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">System Audit Trail</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => api.download('/admin/settings/audit-log/export', 'audit_logs.csv')}>
                  <Download size={14} className="mr-2" /> Download CSV
                </Button>
                <Button variant="outline" size="sm" onClick={fetchAuditLogs}><RefreshCw size={14} className="mr-2" /> Refresh</Button>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="p-4 font-medium text-slate-500">Timestamp</th>
                    <th className="p-4 font-medium text-slate-500">Admin ID</th>
                    <th className="p-4 font-medium text-slate-500">Action</th>
                    <th className="p-4 font-medium text-slate-500">Category</th>
                    <th className="p-4 font-medium text-slate-500">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {auditLogs.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-slate-500">No audit logs found.</td></tr>
                  ) : auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                      <td className="p-4 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-4 font-mono text-xs">{log.adminId}</td>
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{log.action}</td>
                      <td className="p-4"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs uppercase">{log.category}</span></td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
            <Settings size={48} className="mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Module Setup Pending</h3>
            <p className="max-w-md mx-auto">The configuration interface for {activeCategory} is currently being mapped to the database schema.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 flex flex-col md:flex-row gap-8">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 px-2">Configuration</h2>
          <nav className="space-y-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <cat.icon size={18} className={`mr-3 ${activeCategory === cat.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{categories.find(c => c.id === activeCategory)?.label}</h2>
            <p className="text-sm text-slate-500 mt-1">Manage global preferences and configurations.</p>
          </div>
          {activeCategory !== 'audit' && (
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving ? <RefreshCw size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
              Save Changes
            </Button>
          )}
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
