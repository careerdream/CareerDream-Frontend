import { useState, useRef, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, User, Bell, Lock, Palette, Shield, Trash2,
  ChevronRight, Moon, Sun, Globe, Mail, Smartphone,
  CheckCircle, AlertCircle, Loader2,
  Eye, EyeOff, LogOut, ArrowLeft, Save, Key, X, Plus, GripVertical, Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { api } from '../utils/api';
import { useTheme } from './ThemeProvider';
import { ALL_COUNTRIES, LANGUAGES, COUNTRY_CODES, ROLES, COMMON_SKILLS } from '../utils/constants';

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

  const [rolesList, setRolesList] = useState(() => Array.from(new Set([...ROLES, user?.title || ''])).filter(Boolean));
  const [languagesList, setLanguagesList] = useState(() => Array.from(new Set([...LANGUAGES, user?.language || ''])).filter(Boolean));

  const initialPhone = user?.phone || '';
  const initialCodeMatch = initialPhone ? COUNTRY_CODES.find(c => initialPhone.startsWith(c.code)) : null;
  const initCode = initialCodeMatch ? initialCodeMatch.code : '+91';
  const initNum = initialCodeMatch ? initialPhone.slice(initCode.length) : initialPhone;

  const [accountForm, setAccountForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    jobRole: user?.title || ROLES[0],
    location: user?.location || '',
    phoneCode: initCode,
    phoneNum: initNum,
    languages: user?.language ? user.language.split(',').map((l: string) => l.trim()).filter(Boolean) : [],
    skills: user?.skills || [],
  });

  const [others, setOthers] = useState({ role: '', language: '' });

  const [notifs, setNotifs] = useState(() => {
    try {
      const stored = localStorage.getItem('cd-notif-prefs');
      return stored ? JSON.parse(stored) : { jobAlerts: true, applicationUpdates: true, courseReminders: true, assessmentResults: true, newsDigest: false, recruiterMessages: true };
    } catch { return { jobAlerts: true, applicationUpdates: true, courseReminders: true, assessmentResults: true, newsDigest: false, recruiterMessages: true }; }
  });

  const [privacy, setPrivacy] = useState(() => {
    try {
      const stored = localStorage.getItem('cd-privacy-prefs');
      return stored ? JSON.parse(stored) : { profileVisible: true, showEmail: false, showActivity: true, openToWork: true };
    } catch { return { profileVisible: true, showEmail: false, showActivity: true, openToWork: true }; }
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, new: false, confirm: false });

  const [formErrors, setFormErrors] = useState({ name: '', email: '', phone: '' });
  const [skillInput, setSkillInput] = useState('');

  // Drag and Drop refs
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const showSuccess = (msg: string) => { setSaveMsg(msg); setSaveErr(''); setTimeout(() => setSaveMsg(''), 3000); };
  const showError = (msg: string) => { setSaveErr(msg); setSaveMsg(''); };

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val.trim()) return 'Email is required';
    if (!re.test(val)) return 'Invalid email format';
    return '';
  };
  
  const validatePhone = (val: string) => {
    if (!val.trim()) return '';
    if (!/^\+?[0-9]{7,15}$/.test(val.replace(/\s/g, ''))) return 'Invalid phone number';
    return '';
  };

  const validateName = (val: string) => {
    if (!val.trim()) return 'Name is required';
    if (!/^[a-zA-Z\s\-]{2,50}$/.test(val)) return 'Invalid name format';
    return '';
  };

  const isValidInput = (val: string) => {
    if (!/^[a-zA-Z\s\-]{2,50}$/.test(val.trim())) return false;
    if (!/[aeiouyAEIOUY]/.test(val)) return false;
    if (/([a-zA-Z])\1{2,}/.test(val)) return false;
    return true;
  };

  const handleNameBlur = () => {
    const name = accountForm.name.trim();
    if (!name) { setFormErrors(p => ({ ...p, name: validateName(accountForm.name) })); return; }
    const capitalized = name.split(' ').map(word => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '').join(' ');
    setAccountForm(p => ({ ...p, name: capitalized }));
    setFormErrors(p => ({ ...p, name: validateName(capitalized) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountForm(p => ({ ...p, email: e.target.value }));
    setFormErrors(p => ({ ...p, email: validateEmail(e.target.value) }));
  };

  const handleAddRole = () => {
    const val = others.role.trim();
    if (!isValidInput(val)) { showError("Please enter a valid, meaningful job role."); return; }
    setRolesList(p => Array.from(new Set([...p, val])));
    setAccountForm(p => ({ ...p, jobRole: val }));
    setOthers(p => ({ ...p, role: '' }));
    showSuccess("Role added and selected.");
  };

  const handleAddLanguage = () => {
    const val = others.language.trim();
    if (!isValidInput(val)) { showError("Please enter a valid, meaningful language."); return; }
    setLanguagesList(p => Array.from(new Set([...p, val])));
    if (!accountForm.languages.includes(val)) {
      setAccountForm(p => ({ ...p, languages: [...p.languages, val] }));
    }
    setOthers(p => ({ ...p, language: '' }));
    showSuccess("Language added.");
  };

  const removeCustomRole = () => {
    setRolesList(p => p.filter(r => r === accountForm.jobRole ? false : true));
    setAccountForm(p => ({ ...p, jobRole: ROLES[0] }));
  };

  const addSkill = (skillToAdd?: string) => {
    const trimmed = (skillToAdd || skillInput).trim();
    if (trimmed && !accountForm.skills.includes(trimmed)) {
      setAccountForm(prev => ({ ...prev, skills: [...prev.skills, trimmed] }));
      if (!skillToAdd) setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setAccountForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  // Drag and drop handlers for skills
  const handleDragStart = (e: DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    (e.target as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).style.opacity = '1';
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newSkills = [...accountForm.skills];
      const draggedItemContent = newSkills[dragItem.current];
      newSkills.splice(dragItem.current, 1);
      newSkills.splice(dragOverItem.current, 0, draggedItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setAccountForm(prev => ({ ...prev, skills: newSkills }));
    }
  };

  const saveAccount = async () => {
    const nErr = validateName(accountForm.name);
    const eErr = validateEmail(accountForm.email);
    const fullPhone = accountForm.phoneNum ? accountForm.phoneCode + accountForm.phoneNum.replace(/\s+/g, '') : '';
    const pErr = validatePhone(fullPhone);

    if (accountForm.jobRole === 'Other') {
      showError('Please confirm your custom additions by clicking "Add" before saving.');
      return;
    }

    if (nErr || eErr || pErr) {
      setFormErrors({ name: nErr, email: eErr, phone: pErr });
      showError('Please fix validation errors before saving.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: accountForm.name,
        email: accountForm.email,
        title: accountForm.jobRole,
        location: accountForm.location,
        phone: fullPhone,
        language: accountForm.languages.join(', '),
        skills: accountForm.skills,
      };

      await api.put('/auth/profile', payload);
      updateUser(payload);
      showSuccess('Account settings saved successfully!');
    } catch (e: any) { showError(e?.message || 'Failed to save. Please try again.'); }
    finally { setSaving(false); }
  };

  const saveNotifications = async () => {
    setSaving(true);
    try {
      await api.put('/activity/settings', { settings: { notifications: JSON.stringify(notifs) } });
      localStorage.setItem('cd-notif-prefs', JSON.stringify(notifs));
      showSuccess('Notification preferences saved successfully!');
    } catch { showError('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  };

  const savePrivacy = async () => {
    setSaving(true);
    try {
      await api.put('/activity/settings', { settings: { privacy: JSON.stringify(privacy) } });
      localStorage.setItem('cd-privacy-prefs', JSON.stringify(privacy));
      showSuccess('Privacy settings saved successfully!');
    } catch { showError('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  };

  const savePassword = async () => {
    if (passwords.new !== passwords.confirm) { showError('Passwords do not match'); return; }
    if (passwords.new.length < 6) { showError('Password must be at least 6 characters'); return; }
    setSaving(true);
    try {
      await api.put('/auth/change-password', { currentPassword: passwords.current, newPassword: passwords.new });
      showSuccess('Password updated successfully!');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (e: any) { showError(e?.message || 'Failed to update password'); }
    finally { setSaving(false); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Settings Unavailable</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">Please log in to manage your account settings, privacy, and preferences.</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg transition-all">
          Return Home
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (active) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                  Full Name {formErrors.name && <span className="text-red-500 normal-case">{formErrors.name}</span>}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={accountForm.name} onBlur={handleNameBlur} onChange={e => setAccountForm(p => ({ ...p, name: e.target.value }))} className={`w-full pl-12 pr-4 py-3.5 bg-background border rounded-2xl outline-none transition-all ${formErrors.name ? 'border-red-500' : 'border-border focus:border-primary'}`} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                  Email Address {formErrors.email && <span className="text-red-500 normal-case">{formErrors.email}</span>}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={accountForm.email} onChange={handleEmailChange} className={`w-full pl-12 pr-4 py-3.5 bg-background border rounded-2xl outline-none transition-all ${formErrors.email ? 'border-red-500' : 'border-border focus:border-primary'}`} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                  Phone Number {formErrors.phone && <span className="text-red-500 normal-case">{formErrors.phone}</span>}
                </label>
                <div className="flex gap-2">
                  <select value={accountForm.phoneCode} onChange={e => setAccountForm(p => ({ ...p, phoneCode: e.target.value }))} className="w-32 px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary appearance-none">
                    {COUNTRY_CODES.map(c => <option key={c.code + c.iso} value={c.code}>{c.iso} ({c.code})</option>)}
                  </select>
                  <input type="text" value={accountForm.phoneNum} onChange={e => {
                      const raw = e.target.value;
                      const formatted = raw.replace(/[^\d\s]/g, '');
                      setAccountForm(p => ({ ...p, phoneNum: formatted }));
                      setFormErrors(p => ({ ...p, phone: validatePhone(formatted) }));
                    }} placeholder="Number" className={`min-w-0 w-full px-4 py-3.5 bg-background border rounded-2xl outline-none transition-all ${formErrors.phone ? 'border-red-500' : 'border-border focus:border-primary'}`} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Current Job Role</label>
                <div className="flex items-center gap-2">
                  <select value={accountForm.jobRole} onChange={e => setAccountForm(p => ({ ...p, jobRole: e.target.value }))} className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary appearance-none transition-all">
                    {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                    <option value="Other">Other (Specify)</option>
                  </select>
                  {!ROLES.includes(accountForm.jobRole) && accountForm.jobRole !== 'Other' && (
                    <button type="button" onClick={removeCustomRole} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {accountForm.jobRole === 'Other' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2 mt-2">
                      <input type="text" value={others.role} onChange={e => setOthers(p => ({ ...p, role: e.target.value }))} placeholder="Enter job role" className="flex-1 px-4 py-2 bg-background border border-border rounded-xl outline-none text-sm" />
                      <button type="button" onClick={handleAddRole} className="px-4 py-2 bg-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/30">Add</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Location</label>
                <select value={accountForm.location} onChange={e => setAccountForm(p => ({ ...p, location: e.target.value }))} className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary appearance-none">
                  <option value="" disabled>Select a location</option>
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Languages</label>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && val !== 'Other' && !accountForm.languages.includes(val)) {
                          setAccountForm(p => ({ ...p, languages: [...p.languages, val] }));
                        }
                        e.target.value = "";
                      }}
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                    >
                      <option value="">Select language to add</option>
                      {languagesList.filter(l => !accountForm.languages.includes(l)).map(l => <option key={l} value={l}>{l}</option>)}
                      <option value="Other">Other (Specify)</option>
                    </select>
                  </div>
                  
                  {/* Add Custom Language */}
                  <div className="flex gap-2 mt-2">
                    <input 
                      type="text" 
                      value={others.language} 
                      onChange={e => setOthers(p => ({ ...p, language: e.target.value }))} 
                      placeholder="Or type a custom language" 
                      className="flex-1 px-4 py-3 bg-background border border-border rounded-xl outline-none text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddLanguage();
                        }
                      }}
                    />
                    <button type="button" onClick={handleAddLanguage} className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-xl text-sm hover:bg-primary/20 transition-colors">Add</button>
                  </div>

                  {/* Selected Languages Tags */}
                  {accountForm.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 p-3 bg-background border border-border rounded-xl">
                      {accountForm.languages.map((lang, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-bold">
                          {lang}
                          <button
                            type="button"
                            onClick={() => setAccountForm(p => ({ ...p, languages: p.languages.filter(l => l !== lang) }))}
                            className="p-0.5 hover:bg-primary/20 rounded-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-4">Skills</label>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Common skills to add:</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SKILLS.filter(s => !accountForm.skills.includes(s)).slice(0, 8).map(skill => (
                    <button key={skill} type="button" onClick={() => addSkill(skill)} className="px-3 py-1.5 bg-muted border border-border hover:border-primary/50 hover:text-primary rounded-full text-xs font-medium transition-all">
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mb-6 relative">
                <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }} placeholder="Type a custom skill and press Enter" className="flex-1 px-5 py-3.5 bg-background border border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                <button type="button" onClick={() => addSkill()} className="px-6 py-3.5 bg-primary/20 border border-primary/30 text-primary rounded-2xl font-bold hover:bg-primary/30 transition-all flex items-center gap-2">
                  Add
                </button>
              </div>

              {accountForm.skills.length === 0 ? (
                <div className="text-center py-8 bg-background border border-dashed border-border rounded-2xl">
                  <Info className="w-8 h-8 mx-auto mb-2 opacity-30 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No skills added yet.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {accountForm.skills.map((skill, index) => (
                    <div
                      key={skill}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      className="flex items-center gap-2 px-4 py-2 bg-background border border-border hover:border-primary/50 shadow-sm rounded-full text-foreground text-sm font-semibold cursor-grab active:cursor-grabbing transition-colors"
                    >
                      <GripVertical className="w-3.5 h-3.5 text-muted-foreground opacity-50" />
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`} className="text-muted-foreground hover:text-red-500 transition-colors ml-1 p-0.5 rounded-full hover:bg-red-500/10">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-start pt-4">
              <button onClick={saveAccount} disabled={saving} className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 transition-all">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground mb-6">Choose what you want to be notified about via email and in-app alerts.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {NOTIF_TOGGLES.map(t => (
                <div key={t.key} className="flex items-start justify-between p-4 bg-background border border-border rounded-2xl">
                  <div className="pr-4">
                    <h4 className="font-bold text-sm mb-1">{t.label}</h4>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <ToggleSwitch enabled={(notifs as any)[t.key]} onChange={() => setNotifs(p => ({ ...p, [t.key]: !(p as any)[t.key] }))} />
                </div>
              ))}
            </div>
            <div className="flex justify-start pt-4">
              <button onClick={saveNotifications} disabled={saving} className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 transition-all">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Preferences
              </button>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground mb-6">Control your visibility and what data is shared with recruiters.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PRIVACY_TOGGLES.map(t => (
                <div key={t.key} className="flex items-start justify-between p-4 bg-background border border-border rounded-2xl">
                  <div className="pr-4">
                    <h4 className="font-bold text-sm mb-1">{t.label}</h4>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <ToggleSwitch enabled={(privacy as any)[t.key]} onChange={() => setPrivacy(p => ({ ...p, [t.key]: !(p as any)[t.key] }))} />
                </div>
              ))}
            </div>
            <div className="flex justify-start pt-4">
              <button onClick={savePrivacy} disabled={saving} className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 transition-all">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Privacy Settings
              </button>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground mb-6">Customize the look and feel of your CareerDream workspace.</p>
            <div className="p-4 bg-background border border-border rounded-2xl max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-sm mb-1">Theme</h4>
                  <p className="text-xs text-muted-foreground">Toggle dark mode</p>
                </div>
                {theme === 'dark' ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-amber-500" />}
              </div>
              <button onClick={toggleTheme} className="w-full py-3 bg-muted hover:bg-muted/80 rounded-xl text-sm font-bold transition-colors">
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6 max-w-md">
            <p className="text-sm text-muted-foreground mb-6">Update your password to keep your account secure.</p>
            {[
              { label: 'Current Password', key: 'current' },
              { label: 'New Password', key: 'new' },
              { label: 'Confirm New Password', key: 'confirm' },
            ].map(f => (
              <div key={f.key} className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{f.label}</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={(showPwd as any)[f.key] ? 'text' : 'password'}
                    value={(passwords as any)[f.key]}
                    onChange={e => setPasswords(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full pl-12 pr-12 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary transition-all"
                  />
                  <button type="button" onClick={() => setShowPwd(p => ({ ...p, [f.key]: !(p as any)[f.key] }))} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {(showPwd as any)[f.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-start pt-4">
              <button onClick={savePassword} disabled={saving} className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 transition-all">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Update Password
              </button>
            </div>
          </div>
        );

      case 'danger':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
              <h4 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Once you delete your account, there is no going back. All your data, job applications, and course progress will be permanently removed.
              </p>
              <button className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all">
                Delete My Account
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
          
          <aside className="w-full md:w-72 shrink-0">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <div className="flex flex-col gap-1">
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setActive(s.id); setSaveMsg(''); setSaveErr(''); }}
                    className={`flex items-center gap-4 w-full p-4 rounded-2xl text-left transition-all ${active === s.id ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent'}`}
                  >
                    <s.icon className={`w-5 h-5 shrink-0 ${active === s.id ? 'text-primary' : 'opacity-70'}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm">{s.label}</h4>
                      <p className={`text-xs truncate ${active === s.id ? 'text-primary/70' : 'opacity-60'}`}>{s.desc}</p>
                    </div>
                    {active === s.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                  </button>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-border">
                <button onClick={logout} className="flex items-center gap-3 w-full p-4 rounded-2xl text-left text-red-500 hover:bg-red-500/10 transition-colors font-bold text-sm">
                  <LogOut className="w-5 h-5" /> Log out
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0 w-full mt-4 md:mt-14">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  {(() => { const S = SECTIONS.find(x => x.id === active); return S ? <><S.icon className="w-8 h-8 text-primary" /> {S.label}</> : null; })()}
                </h2>
                <p className="text-muted-foreground">{SECTIONS.find(x => x.id === active)?.desc}</p>
              </div>

              <AnimatePresence>
                {saveMsg && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 font-bold shadow-sm">
                    <CheckCircle className="w-5 h-5 shrink-0" /> <span className="flex-1">{saveMsg}</span>
                  </motion.div>
                )}
                {saveErr && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold shadow-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" /> <span className="flex-1">{saveErr}</span>
                    <button onClick={() => setSaveErr('')}><X className="w-4 h-4" /></button>
                  </motion.div>
                )}
              </AnimatePresence>

              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
