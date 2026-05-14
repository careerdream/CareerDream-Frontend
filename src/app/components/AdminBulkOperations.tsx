import React, { useState, useRef } from 'react';
import { Download, Upload, Mail, Trash2, CheckCircle, AlertTriangle, Loader2, FileText, Users, Briefcase, BookOpen, Target, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

type Tab = 'bulk-actions' | 'import' | 'export' | 'campaigns' | 'history';

export function AdminBulkOperations() {
  const [tab, setTab] = useState<Tab>('bulk-actions');

  // Bulk Actions state
  const [bulkModule, setBulkModule] = useState('users');
  const [bulkAction, setBulkAction] = useState('ban');
  const [bulkIds, setBulkIds] = useState('');
  const [bulkValue, setBulkValue] = useState('');
  const [bulkResult, setBulkResult] = useState<any>(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  // Import state
  const [importModule, setImportModule] = useState('users');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<any>(null);
  const [importLoading, setImportLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Export state
  const [exportModule, setExportModule] = useState('users');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportLoading, setExportLoading] = useState(false);

  // Campaign state
  const [campaignModule, setCampaignModule] = useState('users');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignBody, setCampaignBody] = useState('');
  const [campaignResult, setCampaignResult] = useState<any>(null);

  // History state
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const moduleActions: Record<string, { value: string; label: string; needsValue?: boolean }[]> = {
    users: [
      { value: 'ban', label: 'Ban Users' },
      { value: 'suspend', label: 'Suspend Users' },
      { value: 'activate', label: 'Activate Users' },
      { value: 'delete', label: 'Delete Users' },
      { value: 'reset_password', label: 'Send Password Reset' },
      { value: 'change_role', label: 'Change Role', needsValue: true },
    ],
    jobs: [
      { value: 'delete', label: 'Delete Jobs' },
      { value: 'feature', label: 'Feature Jobs' },
      { value: 'unfeature', label: 'Unfeature Jobs' },
      { value: 'change_status', label: 'Change Status', needsValue: true },
    ],
    courses: [
      { value: 'delete', label: 'Delete Courses' },
      { value: 'change_status', label: 'Change Status', needsValue: true },
    ],
    assessments: [
      { value: 'delete', label: 'Delete Assessments' },
      { value: 'change_status', label: 'Change Status', needsValue: true },
    ],
    blog: [
      { value: 'delete', label: 'Delete Posts' },
      { value: 'change_status', label: 'Change Status', needsValue: true },
    ],
  };

  const currentActions = moduleActions[bulkModule] || [];
  const currentAction = currentActions.find(a => a.value === bulkAction);

  const executeBulk = async () => {
    const ids = bulkIds.split(',').map(s => s.trim()).filter(Boolean);
    if (!ids.length) return alert('Enter at least one ID (comma-separated)');
    if (!window.confirm(`Execute "${bulkAction}" on ${ids.length} ${bulkModule}?`)) return;
    setBulkLoading(true);
    try {
      const data = await api.post('/admin/bulk/action', { module: bulkModule, action: bulkAction, ids, value: bulkValue });
      setBulkResult(data);
    } catch (e: any) { 
      setBulkResult({ error: e.message || 'Request failed' }); 
    }
    setBulkLoading(false);
  };

  const downloadTemplate = () => {
    api.download(`/admin/bulk/export-templates?module=${importModule}`, `${importModule}_template.csv`);
  };

  const executeImport = async () => {
    if (!importFile) return alert('Select a CSV file first');
    setImportLoading(true);
    const form = new FormData();
    form.append('file', importFile);
    form.append('module', importModule);
    try {
      const data = await api.post('/admin/bulk/import', form);
      setImportResult(data);
    } catch (e: any) { 
      setImportResult({ error: e.message || 'Import failed' }); 
    }
    setImportLoading(false);
  };

  const executeExport = async () => {
    setExportLoading(true);
    try {
      await api.download(`/admin/bulk/export?module=${exportModule}&format=${exportFormat}`, `${exportModule}_export.${exportFormat}`);
    } catch { 
      alert('Export failed'); 
    }
    setExportLoading(false);
  };

  const sendCampaign = async () => {
    if (!campaignSubject || !campaignBody) return alert('Subject and body required');
    try {
      const data = await api.post('/admin/bulk/email-campaign', { module: campaignModule, subject: campaignSubject, body: campaignBody });
      setCampaignResult(data);
    } catch (e: any) {
      setCampaignResult({ error: e.message || 'Campaign failed' });
    }
  };

  const loadHistory = async () => {
    try {
      const data = await api.get('/admin/bulk/export-history');
      setHistory(data); 
      setHistoryLoaded(true);
    } catch (e) {
      console.error(e);
    }
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'bulk-actions', label: 'Bulk Actions', icon: CheckCircle },
    { id: 'import', label: 'Import Data', icon: Upload },
    { id: 'export', label: 'Export Data', icon: Download },
    { id: 'campaigns', label: 'Email Campaigns', icon: Mail },
    { id: 'history', label: 'Export History', icon: FileText },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Bulk Operations & Export</h1>
        <p className="text-slate-500 text-sm mt-1">Execute mass operations, import data, export reports, and run email campaigns.</p>
      </div>

      {/* Tab Bar */}
      <div className="flex space-x-1 border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${tab === t.id ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            <t.icon size={16} className="mr-2" />{t.label}
          </button>
        ))}
      </div>

      {/* BULK ACTIONS */}
      {tab === 'bulk-actions' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Execute Bulk Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Module</label>
                <Select value={bulkModule} onValueChange={v => { setBulkModule(v); setBulkAction(moduleActions[v]?.[0]?.value || ''); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users"><span className="flex items-center"><Users size={14} className="mr-2" />Users</span></SelectItem>
                    <SelectItem value="jobs"><span className="flex items-center"><Briefcase size={14} className="mr-2" />Jobs</span></SelectItem>
                    <SelectItem value="courses"><span className="flex items-center"><BookOpen size={14} className="mr-2" />Courses</span></SelectItem>
                    <SelectItem value="assessments"><span className="flex items-center"><Target size={14} className="mr-2" />Assessments</span></SelectItem>
                    <SelectItem value="blog">Blog Posts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Action</label>
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {currentActions.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {currentAction?.needsValue && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Value</label>
                  <Input value={bulkValue} onChange={e => setBulkValue(e.target.value)} placeholder="e.g. recruiter, active..." />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">Target IDs <span className="text-slate-400 font-normal">(comma-separated)</span></label>
              <Input value={bulkIds} onChange={e => setBulkIds(e.target.value)} placeholder="1, 2, 3, 45, 99..." className="font-mono" />
              <p className="text-xs text-slate-400 mt-1">Enter the database IDs of the records to apply this action to.</p>
            </div>
            <Button onClick={executeBulk} disabled={bulkLoading} className="bg-blue-600 hover:bg-blue-700">
              {bulkLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <CheckCircle size={16} className="mr-2" />}
              Execute Bulk Action
            </Button>
            {bulkResult && (
              <div className={`mt-4 p-4 rounded-lg border ${bulkResult.error ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800' : 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800'}`}>
                {bulkResult.error ? (
                  <p className="text-red-700 dark:text-red-400 font-medium flex items-center"><AlertTriangle size={16} className="mr-2" />{bulkResult.error}</p>
                ) : (
                  <p className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center"><CheckCircle size={16} className="mr-2" />{bulkResult.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Quick Reference */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Available Actions Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {Object.entries(moduleActions).map(([mod, actions]) => (
                <div key={mod} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="font-bold capitalize text-slate-900 dark:text-white mb-2">{mod}</p>
                  <ul className="space-y-1 text-slate-500">
                    {actions.map(a => <li key={a.value} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>{a.label}
                    </li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IMPORT */}
      {tab === 'import' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-1">Import Data from CSV</h2>
            <p className="text-sm text-slate-500 mb-6">Upload a CSV file to bulk-import records. Download the template first to ensure correct column names.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Module to Import Into</label>
                <Select value={importModule} onValueChange={setImportModule}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="jobs">Jobs</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={downloadTemplate} className="w-full">
                  <Download size={16} className="mr-2" /> Download CSV Template
                </Button>
              </div>
            </div>

            {/* Drop Zone */}
            <div
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${importFile ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10' : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10'}`}
            >
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => setImportFile(e.target.files?.[0] || null)} />
              {importFile ? (
                <div className="text-emerald-600 dark:text-emerald-400">
                  <CheckCircle size={40} className="mx-auto mb-2" />
                  <p className="font-bold">{importFile.name}</p>
                  <p className="text-sm mt-1">{(importFile.size / 1024).toFixed(1)} KB — Click to change</p>
                </div>
              ) : (
                <div className="text-slate-400">
                  <Upload size={40} className="mx-auto mb-2" />
                  <p className="font-semibold text-slate-600 dark:text-slate-300">Drop CSV here or click to browse</p>
                  <p className="text-sm mt-1">Max 10MB • CSV format only</p>
                </div>
              )}
            </div>

            <Button onClick={executeImport} disabled={importLoading || !importFile} className="mt-4 bg-blue-600 hover:bg-blue-700">
              {importLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Upload size={16} className="mr-2" />}
              {importLoading ? 'Importing...' : 'Start Import'}
            </Button>
          </div>

          {/* Import Results */}
          {importResult && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Import Results</h3>
              {importResult.error ? (
                <p className="text-red-600 flex items-center"><AlertTriangle size={16} className="mr-2" />{importResult.error}</p>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">{importResult.totalRows}</p>
                      <p className="text-sm text-slate-500">Total Rows</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg">
                      <p className="text-3xl font-bold text-emerald-600">{importResult.successCount}</p>
                      <p className="text-sm text-slate-500">Imported</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                      <p className="text-3xl font-bold text-red-600">{importResult.errorCount}</p>
                      <p className="text-sm text-slate-500">Errors</p>
                    </div>
                  </div>
                  {importResult.errors?.length > 0 && (
                    <div className="border border-red-200 dark:border-red-800 rounded-lg overflow-hidden">
                      <div className="bg-red-50 dark:bg-red-900/10 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400">Row Errors</div>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto">
                        {importResult.errors.map((e: any, i: number) => (
                          <div key={i} className="px-4 py-2 text-sm flex gap-4">
                            <span className="font-mono text-slate-500">Row {e.row}</span>
                            <span className="text-red-600">{e.msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* EXPORT */}
      {tab === 'export' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-1">Export Platform Data</h2>
            <p className="text-sm text-slate-500 mb-6">Export any module's data as CSV or JSON. The file downloads instantly.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Data Module</label>
                <Select value={exportModule} onValueChange={setExportModule}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="jobs">Jobs</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                    <SelectItem value="assessments">Assessments</SelectItem>
                    <SelectItem value="blog">Blog Posts</SelectItem>
                    <SelectItem value="enrollments">Course Enrollments</SelectItem>
                    <SelectItem value="assessment_results">Assessment Results</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Export Format</label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={executeExport} disabled={exportLoading} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  {exportLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                  {exportLoading ? 'Generating...' : 'Export Now'}
                </Button>
              </div>
            </div>

            {/* What's exported */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">Exported Columns for: <span className="text-blue-600">{exportModule}</span></h4>
              <div className="flex flex-wrap gap-2">
                {({
                  users: ['id','name','email','role','status','location','createdAt'],
                  jobs: ['id','title','company','location','salary','type','status','posted_at','category'],
                  courses: ['id','title','instructor','level','students','rating','status','category'],
                  assessments: ['id','title','category','difficulty','attempts','avgScore','status'],
                  blog: ['id','title','category','status','views','featured','createdAt'],
                  enrollments: ['userId','courseName','userName','email','status','enrolledAt'],
                  assessment_results: ['assessmentTitle','userName','email','score','progress','attemptedAt'],
                }[exportModule] || []).map((col: string) => (
                  <span key={col} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-mono">{col}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMAIL CAMPAIGNS */}
      {tab === 'campaigns' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-bold">Email Campaign Builder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Recipients</label>
              <Select value={campaignModule} onValueChange={setCampaignModule}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">All Active Users</SelectItem>
                  <SelectItem value="recruiters">All Recruiters</SelectItem>
                  <SelectItem value="all">Everyone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Subject Line</label>
              <Input value={campaignSubject} onChange={e => setCampaignSubject(e.target.value)} placeholder="Your subject here..." />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email Body <span className="text-slate-400 font-normal text-xs ml-1">Supports {'{firstName}'}, {'{email}'} tokens</span></label>
            <textarea
              className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm min-h-[180px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={campaignBody}
              onChange={e => setCampaignBody(e.target.value)}
              placeholder="Hello {firstName}, ..."
            />
          </div>
          <Button onClick={sendCampaign} className="bg-blue-600 hover:bg-blue-700">
            <Mail size={16} className="mr-2" /> Send Campaign
          </Button>
          {campaignResult && (
            <div className={`p-4 rounded-lg border ${campaignResult.error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/10 dark:border-emerald-700 dark:text-emerald-400'}`}>
              {campaignResult.error || `✓ ${campaignResult.message}`}
            </div>
          )}
        </div>
      )}

      {/* EXPORT HISTORY */}
      {tab === 'history' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 dark:text-white">Export History</h2>
            <Button variant="outline" size="sm" onClick={loadHistory}><RefreshCw size={14} className="mr-2" />Load History</Button>
          </div>
          {!historyLoaded ? (
            <div className="p-12 text-center text-slate-400">Click "Load History" to view past exports.</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                <tr>
                  <th className="p-4 font-medium">Module</th>
                  <th className="p-4 font-medium">Format</th>
                  <th className="p-4 font-medium">Size</th>
                  <th className="p-4 font-medium">Generated</th>
                  <th className="p-4 font-medium">Expires</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4 capitalize font-medium">{h.module}</td>
                    <td className="p-4 uppercase text-xs font-mono text-blue-600">{h.format}</td>
                    <td className="p-4 text-slate-500">{h.size}</td>
                    <td className="p-4 text-slate-500">{new Date(h.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-500">{new Date(h.expiresAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="outline"><Download size={14} className="mr-1" /> Download</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
