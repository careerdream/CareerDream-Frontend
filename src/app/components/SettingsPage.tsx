import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, User, Bell, Lock, Palette, Shield, Trash2,
  ChevronRight, Moon, Sun, Globe, Mail, Smartphone,
  BriefcaseIcon, CheckCircle, AlertCircle, Loader2,
  Eye, EyeOff, LogOut, ArrowLeft, Save, Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { api } from '../utils/api';
import { useTheme } from './ThemeProvider';

type SectionId = 'account' | 'notifications' | 'privacy' | 'appearance' | 'security' | 'danger';

const SECTIONS = [
  { id: 'account' as SectionId, label: 'Account', icon: User, desc: 'Email, name & preferences' },
  { id: 'notifications' as SectionId, label: 'Notifications', icon: Bell, desc: 'Alerts & email settings' },
  { id: 'privacy' as SectionId, label: 'Privacy', icon: Shield, desc: 'Profile visibility & data' },
  { id: 'appearance' as SectionId, label: 'Appearance', icon: Palette, desc: 'Theme & display options' },
  { id: 'security' as SectionId, label: 'Security', icon: Lock, desc: 'Password & sessions' },
  { id: 'danger' as SectionId, label: 'Danger Zone', icon: Trash2, desc: 'Delete account' },
];

interface Toggle {
  label: string;
  desc: string;
  key: string;
}

const NOTIF_TOGGLES: Toggle[] = [
  { key: 'jobAlerts', label: 'Job Recommendations', desc: 'Get notified about jobs matching your profile' },
  { key: 'applicationUpdates', label: 'Application Updates', desc: 'Status changes on your job applications' },
  { key: 'courseReminders', label: 'Course Reminders', desc: 'Reminders for enrolled courses' },
  { key: 'assessmentResults', label: 'Assessment Results', desc: 'Your test scores and badges' },
  { key: 'newsDigest', label: 'Weekly News Digest', desc: 'Top IT industry news every Monday' },
  { key: 'recruiterMessages', label: 'Recruiter Messages', desc: 'When a recruiter views your profile' },
];

const PRIVACY_TOGGLES: Toggle[] = [
  { key: 'profileVisible', label: 'Public Profile', desc: 'Allow recruiters to find your profile' },
  { key: 'showEmail', label: 'Show Email to Recruiters', desc: 'Recruiters can see your email address' },
  { key: 'showActivity', label: 'Show Activity Status', desc: 'Let others know when you are active' },
  { key: 'openToWork', label: 'Open to Work', desc: 'Signal recruiters you are looking for opportunities' },
];

const LOCATIONS = ['Bengaluru, India', 'Mumbai, India', 'Delhi NCR, India', 'Hyderabad, India', 'Pune, India', 'Chennai, India', 'Remote (India)', 'New York, USA', 'London, UK', 'Dubai, UAE', 'Other'];
const LANGUAGES = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam', 'Marathi', 'Bengali', 'Other'];
const TIMEZONES = ['IST (GMT+5:30)', 'GMT (UTC+0)', 'EST (GMT-5)', 'PST (GMT-8)', 'CET (GMT+1)', 'Other'];
const ROLES = ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer', 'Consultant', 'Analyst', 'Other'];
const SKILLS_LIST = ['Communication', 'Leadership', 'Project Management', 'Technical Skills', 'Problem Solving', 'Teamwork', 'Agile', 'Other'];

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-primary' : 'bg-muted border border-border'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export function SettingsPage() {
  const { user, isLoggedIn, logout, updateUser } = useApp();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [active, setActive] = useState<SectionId>('account');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saveErr, setSaveErr] = useState('');

  // Account
  const [accountForm, setAccountForm] = useState({
    name: user?.name || '',
    jobRole: user?.title || '',
    location: user?.location || '',
    phone: user?.phone || '',
    language: user?.language || 'English',
    timezone: user?.timezone || 'IST (GMT+5:30)',
    skills: Array.isArray(user?.skills) ? user.skills : [],
  });

  const [others, setOthers] = useState({
    location: '',
    language: '',
    timezone: '',
    role: '',
    skill: '',
  });

  // Notifications — initialise from user.settings if available
  const [notifs, setNotifs] = useState<Record<string, boolean>>(() => {
    const saved = user?.settings?.notifications;
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      jobAlerts: true, applicationUpdates: true, courseReminders: true,
      assessmentResults: true, newsDigest: false, recruiterMessages: true,
    };
  });

  // Privacy — initialise from user.settings if available
  const [privacy, setPrivacy] = useState<Record<string, boolean>>(() => {
    const saved = user?.settings?.privacy;
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      profileVisible: true, showEmail: false, showActivity: true, openToWork: true,
    };
  });

  // Security
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwErr, setPwErr] = useState('');

  // Danger
  const [deleteConfirm, setDeleteConfirm] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Settings className="w-16 h-16 text-primary mx-auto mb-6 opacity-20" />
        <h2 className="text-2xl font-bold mb-4">Sign In to Access Settings</h2>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-primary text-white rounded-2xl font-bold">Return to Home</button>
      </div>
    );
  }

  const showSuccess = (msg: string) => { setSaveMsg(msg); setSaveErr(''); setTimeout(() => setSaveMsg(''), 3500); };
  const showError = (msg: string) => { setSaveErr(msg); setSaveMsg(''); };

  const saveAccount = async () => {
    setSaving(true);
    try {
      const finalRole = accountForm.jobRole === 'Other' ? others.role : accountForm.jobRole;
      const finalLoc = accountForm.location === 'Other' ? others.location : accountForm.location;
      const finalLang = accountForm.language === 'Other' ? others.language : accountForm.language;
      const finalTz = accountForm.timezone === 'Other' ? others.timezone : accountForm.timezone;
      const finalSkills = accountForm.skills.includes('Other') 
        ? [...accountForm.skills.filter(s => s !== 'Other'), others.skill].filter(s => s)
        : accountForm.skills;

      const payload = {
        name: accountForm.name,
        title: finalRole,
        location: finalLoc,
        phone: accountForm.phone,
        language: finalLang,
        timezone: finalTz,
        skills: finalSkills,
      };

      await api.put('/auth/profile', payload);
      updateUser(payload);
      showSuccess('Account settings saved!');
    } catch (e: any) { 
      showError(e?.message || 'Failed to save. Please try again.'); 
    }
    finally { setSaving(false); }
  };

  const saveNotifications = async () => {
    setSaving(true);
    try {
      // Save to backend settings store
      await api.put('/activity/settings', { settings: { notifications: JSON.stringify(notifs) } });
      // Also cache locally
      localStorage.setItem('cd-notif-prefs', JSON.stringify(notifs));
      showSuccess('Notification preferences saved!');
    } catch { showError('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  };

  const savePrivacy = async () => {
    setSaving(true);
    try {
      await api.put('/activity/settings', { settings: { privacy: JSON.stringify(privacy) } });
      localStorage.setItem('cd-privacy-prefs', JSON.stringify(privacy));
      showSuccess('Privacy settings saved!');
    } catch { showError('Failed to save.'); }
    finally { setSaving(false); }
  };

  const changePassword = async () => {
    setPwErr(''); setPwMsg('');
    if (!pwForm.current || !pwForm.next) { setPwErr('Please fill all fields.'); return; }
    if (pwForm.next.length < 6) { setPwErr('New password must be at least 6 characters.'); return; }
    if (pwForm.next !== pwForm.confirm) { setPwErr('Passwords do not match.'); return; }
    setPwLoading(true);
    try {
      await api.put('/auth/change-password', { currentPassword: pwForm.current, newPassword: pwForm.next });
      setPwMsg('Password changed successfully!');
      setPwForm({ current: '', next: '', confirm: '' });
    } catch (e: any) {
      setPwErr(e?.message || 'Failed to change password. Check your current password.');
    } finally { setPwLoading(false); }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== 'DELETE') return;
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground text-sm">Manage your account, privacy, and preferences</p>
          </div>
        </div>

        {/* Global save feedback */}
        <AnimatePresence>
          {saveMsg && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400">
              <CheckCircle className="w-5 h-5" /> {saveMsg}
            </motion.div>
          )}
          {saveErr && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
              <AlertCircle className="w-5 h-5" /> {saveErr}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Nav */}
          <nav className="space-y-1">
            {SECTIONS.map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left group ${active === id ? 'bg-primary/15 border border-primary/25 text-primary' : 'hover:bg-muted text-muted-foreground hover:text-foreground'} ${id === 'danger' ? 'mt-6 text-red-500 hover:bg-red-500/10 hover:text-red-600' : ''}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs opacity-60 truncate">{desc}</p>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${active === id ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </nav>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>

              {/* ── ACCOUNT ── */}
              {active === 'account' && (
                <div className="space-y-6">
                  <SectionHeader icon={User} title="Account Settings" desc="Update your display name, job role, and regional preferences." />
                  <Card>
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field label="Display Name">
                        <input value={accountForm.name} onChange={e => setAccountForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Your full name" />
                      </Field>
                      <Field label="Email Address">
                        <input value={user?.email || ''} disabled className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground opacity-50 cursor-not-allowed" />
                      </Field>
                      
                      <Field label="Phone Number">
                        <input value={accountForm.phone} onChange={e => setAccountForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="+91-XXXXXXXXXX" />
                        <p className="text-[10px] text-muted-foreground mt-1">Include country code (e.g. +91 for India)</p>
                      </Field>

                      <div className="space-y-4">
                        <Field label="Current Job Role">
                          <select value={ROLES.includes(accountForm.jobRole) ? accountForm.jobRole : (accountForm.jobRole ? 'Other' : '')} 
                            onChange={e => setAccountForm(p => ({ ...p, jobRole: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                            <option value="">Select Role</option>
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </Field>
                        {accountForm.jobRole === 'Other' && (
                          <input value={others.role} onChange={e => setOthers(p => ({ ...p, role: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-primary/50 rounded-xl text-foreground outline-none transition-all" placeholder="Enter your role manually" />
                        )}
                      </div>

                      <div className="space-y-4">
                        <Field label="Location">
                          <select value={LOCATIONS.includes(accountForm.location) ? accountForm.location : (accountForm.location ? 'Other' : '')} 
                            onChange={e => setAccountForm(p => ({ ...p, location: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                            <option value="">Select Location</option>
                            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </Field>
                        {accountForm.location === 'Other' && (
                          <input value={others.location} onChange={e => setOthers(p => ({ ...p, location: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-primary/50 rounded-xl text-foreground outline-none transition-all" placeholder="Enter city/region manually" />
                        )}
                      </div>

                      <div className="space-y-4">
                        <Field label="Language">
                          <select value={LANGUAGES.includes(accountForm.language) ? accountForm.language : (accountForm.language ? 'Other' : '')} 
                            onChange={e => setAccountForm(p => ({ ...p, language: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </Field>
                        {accountForm.language === 'Other' && (
                          <input value={others.language} onChange={e => setOthers(p => ({ ...p, language: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-primary/50 rounded-xl text-foreground outline-none transition-all" placeholder="Enter language manually" />
                        )}
                      </div>

                      <div className="space-y-4">
                        <Field label="Timezone">
                          <select value={TIMEZONES.includes(accountForm.timezone) ? accountForm.timezone : (accountForm.timezone ? 'Other' : '')} 
                            onChange={e => setAccountForm(p => ({ ...p, timezone: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                            {TIMEZONES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </Field>
                        {accountForm.timezone === 'Other' && (
                          <input value={others.timezone} onChange={e => setOthers(p => ({ ...p, timezone: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-primary/50 rounded-xl text-foreground outline-none transition-all" placeholder="Enter timezone manually" />
                        )}
                      </div>

                      <div className="md:col-span-2 space-y-4">
                        <Field label="Skills (Select all that apply)">
                          <div className="flex flex-wrap gap-2 pt-2">
                            {SKILLS_LIST.map(skill => (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => {
                                  const next = accountForm.skills.includes(skill) 
                                    ? accountForm.skills.filter(s => s !== skill)
                                    : [...accountForm.skills, skill];
                                  setAccountForm(p => ({ ...p, skills: next }));
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${accountForm.skills.includes(skill) ? 'bg-primary border-primary text-white' : 'bg-card border-border text-muted-foreground hover:border-primary/50'}`}
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                        </Field>
                        {accountForm.skills.includes('Other') && (
                          <input value={others.skill} onChange={e => setOthers(p => ({ ...p, skill: e.target.value }))}
                            className="w-full px-4 py-3 bg-background border border-primary/50 rounded-xl text-foreground outline-none transition-all" placeholder="Add additional skills (comma separated)" />
                        )}
                      </div>
                    </div>
                    <SaveBtn loading={saving} onClick={saveAccount} />
                  </Card>
                </div>
              )}

              {/* ── NOTIFICATIONS ── */}
              {active === 'notifications' && (
                <div className="space-y-6">
                  <SectionHeader icon={Bell} title="Notification Preferences" desc="Choose what you want to be notified about." />
                  <Card>
                    <div className="space-y-5">
                      {NOTIF_TOGGLES.map(t => (
                        <div key={t.key} className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-sm">{t.label}</p>
                            <p className="text-xs text-muted-foreground">{t.desc}</p>
                          </div>
                          <ToggleSwitch enabled={notifs[t.key]} onChange={() => setNotifs(p => ({ ...p, [t.key]: !p[t.key] }))} />
                        </div>
                      ))}
                    </div>
                    <SaveBtn loading={saving} onClick={saveNotifications} />
                  </Card>

                  <Card>
                    <h4 className="font-bold mb-4 flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> Email Frequency</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {['Immediately', 'Daily Digest', 'Weekly Only'].map(opt => (
                        <button key={opt} className="px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium hover:border-primary/50 hover:bg-primary/10 transition-all">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* ── PRIVACY ── */}
              {active === 'privacy' && (
                <div className="space-y-6">
                  <SectionHeader icon={Shield} title="Privacy Settings" desc="Control who can see your profile and activity." />
                  <Card>
                    <div className="space-y-5">
                      {PRIVACY_TOGGLES.map(t => (
                        <div key={t.key} className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-sm">{t.label}</p>
                            <p className="text-xs text-muted-foreground">{t.desc}</p>
                          </div>
                          <ToggleSwitch enabled={privacy[t.key]} onChange={() => setPrivacy(p => ({ ...p, [t.key]: !p[t.key] }))} />
                        </div>
                      ))}
                    </div>
                    <SaveBtn loading={saving} onClick={savePrivacy} />
                  </Card>

                  <Card>
                    <h4 className="font-bold mb-2 text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-primary" />Profile URL</h4>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
                      <span className="text-muted-foreground text-sm">careerdream.in/u/</span>
                      <input defaultValue={user?.name?.toLowerCase().replace(/\s+/g, '-')} className="bg-transparent text-foreground outline-none text-sm flex-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Customise your public profile link</p>
                  </Card>
                </div>
              )}

              {/* ── APPEARANCE ── */}
              {active === 'appearance' && (
                <div className="space-y-6">
                  <SectionHeader icon={Palette} title="Appearance" desc="Personalise how CareerDream looks for you." />
                  <Card>
                    <h4 className="font-bold mb-4">Color Theme</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Dark Mode', value: 'dark', icon: Moon, desc: 'Easy on eyes at night' },
                        { label: 'Light Mode', value: 'light', icon: Sun, desc: 'Crisp and clean look' },
                      ].map(opt => (
                        <button key={opt.value} onClick={toggleTheme}
                          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${theme === opt.value ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'}`}>
                          <opt.icon className="w-6 h-6" />
                          <div className="text-left">
                            <p className="font-bold">{opt.label}</p>
                            <p className="text-xs text-muted-foreground">{opt.desc}</p>
                          </div>
                          {theme === opt.value && <CheckCircle className="w-5 h-5 text-primary ml-auto" />}
                        </button>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <h4 className="font-bold mb-4">Accent Color</h4>
                    <div className="flex gap-3">
                      {['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                        <button
                          key={c}
                          title={c}
                          onClick={() => {
                            document.documentElement.style.setProperty('--primary', c);
                            localStorage.setItem('cd-accent-color', c);
                          }}
                          className="w-8 h-8 rounded-full border-2 border-background shadow-sm hover:scale-110 transition-transform"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Primary accent color used across the platform</p>
                  </Card>

                  <Card>
                    <h4 className="font-bold mb-4">Dashboard Density</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {['Compact', 'Comfortable', 'Spacious'].map(d => (
                        <button key={d} className={`py-3 rounded-xl border text-sm font-medium transition-all ${d === 'Comfortable' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card hover:border-primary/50 text-foreground'}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* ── SECURITY ── */}
              {active === 'security' && (
                <div className="space-y-6">
                  <SectionHeader icon={Lock} title="Security" desc="Manage your password and active sessions." />
                  <Card>
                    <h4 className="font-bold mb-5 flex items-center gap-2"><Key className="w-4 h-4 text-primary" /> Change Password</h4>
                    <AnimatePresence>
                      {pwMsg && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-2 text-green-400 text-sm"><CheckCircle className="w-4 h-4" />{pwMsg}</motion.div>}
                      {pwErr && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-2 text-red-400 text-sm"><AlertCircle className="w-4 h-4" />{pwErr}</motion.div>}
                    </AnimatePresence>
                    <div className="space-y-4">
                      {([
                        { key: 'current', label: 'Current Password', placeholder: 'Enter current password' },
                        { key: 'next', label: 'New Password', placeholder: 'At least 6 characters' },
                        { key: 'confirm', label: 'Confirm New Password', placeholder: 'Repeat new password' },
                      ] as { key: 'current' | 'next' | 'confirm'; label: string; placeholder: string }[]).map(f => (
                        <Field key={f.key} label={f.label}>
                          <div className="relative">
                            <input
                              type={showPw[f.key] ? 'text' : 'password'}
                              value={pwForm[f.key]}
                              onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                              placeholder={f.placeholder}
                              className="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                            <button type="button" onClick={() => setShowPw(p => ({ ...p, [f.key]: !p[f.key] }))}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                              {showPw[f.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </Field>
                      ))}
                      <button onClick={changePassword} disabled={pwLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 transition-all">
                        {pwLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                        Update Password
                      </button>
                    </div>
                  </Card>

                  <Card>
                    <h4 className="font-bold mb-4 flex items-center gap-2"><Smartphone className="w-4 h-4 text-primary" /> Active Sessions</h4>
                    <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                      <div>
                        <p className="font-semibold text-sm">This Device</p>
                        <p className="text-xs text-muted-foreground">Windows · Chrome · India · Active now</p>
                      </div>
                      <span className="text-xs text-green-400 font-bold">Current</span>
                    </div>
                    <button onClick={logout} className="mt-4 flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                      <LogOut className="w-4 h-4" /> Sign out of all sessions
                    </button>
                  </Card>
                </div>
              )}

              {/* ── DANGER ZONE ── */}
              {active === 'danger' && (
                <div className="space-y-6">
                  <SectionHeader icon={Trash2} title="Danger Zone" desc="Irreversible actions. Proceed with caution." />
                  <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/5 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                        <Trash2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-red-400">Delete Account</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Permanently deletes your profile, saved jobs, test results, and all associated data.
                          This action <strong className="text-red-400">cannot be undone</strong>.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3 pt-2">
                      <Field label={`Type DELETE to confirm`}>
                        <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)}
                          placeholder="DELETE"
                          className="w-full px-4 py-3 bg-background border border-red-500/30 rounded-xl text-foreground focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" />
                      </Field>
                      <button
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirm !== 'DELETE'}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Trash2 className="w-4 h-4" /> Permanently Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>


    </div>
  );
}

function SectionHeader({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-border">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function SaveBtn({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <div className="pt-4 border-t border-border mt-4">
      <button onClick={onClick} disabled={loading}
        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 transition-all">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
