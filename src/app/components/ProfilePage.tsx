import { useState, useRef, useEffect, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, MapPin, Briefcase, Camera,
  Plus, Trash2, Save, CheckCircle,
  Globe, Linkedin, Twitter, Github, FileText,
  Award, ArrowLeft, Loader2, Phone,
  AlertCircle, X, GripVertical, Info, UploadCloud
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { useNavigate } from 'react-router';
import { ALL_COUNTRIES, LANGUAGES, COUNTRY_CODES, ROLES, COMMON_SKILLS } from '../utils/constants';

export function ProfilePage() {
  const { user, isLoggedIn, updateUser } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [rolesList, setRolesList] = useState(() => Array.from(new Set([...ROLES, user?.title || ''])).filter(Boolean));
  const [languagesList, setLanguagesList] = useState(() => Array.from(new Set([...LANGUAGES, user?.language || ''])).filter(Boolean));
  
  const initialPhone = (user as any)?.phone || '';
  const initialCodeMatch = initialPhone ? COUNTRY_CODES.find(c => initialPhone.startsWith(c.code)) : null;
  const initCode = initialCodeMatch ? initialCodeMatch.code : '+91';
  const initNum = initialCodeMatch ? initialPhone.slice(initCode.length) : initialPhone;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || (user?.title ? 'Other' : ''), // Default to user's title if present in lists, else it will be handled
    location: user?.location || '',
    phoneCode: initCode,
    phoneNum: initNum,
    language: user?.language || '',
    bio: (user as any)?.bio || '',
    skills: user?.skills || [],
    avatar: user?.avatar || '',
    socials: {
      linkedin: (user as any)?.socials?.linkedin || '',
      twitter: (user as any)?.socials?.twitter || '',
      github: (user as any)?.socials?.github || '',
      portfolio: (user as any)?.socials?.portfolio || ''
    }
  });

  const [others, setOthers] = useState({ role: '', language: '' });

  const [formErrors, setFormErrors] = useState<{
    email?: string;
    phone?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    portfolio?: string;
  }>({});

  const [skillInput, setSkillInput] = useState('');
  
  // Drag and Drop state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        title: user.title || '',
        location: user.location || '',
        language: user.language || '',
        bio: (user as any).bio || '',
        skills: user.skills || [],
        avatar: user.avatar || '',
        socials: {
          linkedin: (user as any).socials?.linkedin || '',
          twitter: (user as any).socials?.twitter || '',
          github: (user as any).socials?.github || '',
          portfolio: (user as any).socials?.portfolio || ''
        }
      }));
      if (user.title && !ROLES.includes(user.title)) setRolesList(p => Array.from(new Set([...p, user.title])));
      if (user.language && !LANGUAGES.includes(user.language)) setLanguagesList(p => Array.from(new Set([...p, user.language])));
    }
  }, [user]);

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val.trim()) return 'Email address is required.';
    if (!re.test(val)) return 'Invalid email format.';
    return '';
  };

  const validatePhone = (val: string) => {
    if (!val.trim()) return '';
    const re = /^[0-9\s\-]{7,15}$/; // only checking the number part
    if (!re.test(val)) return 'Invalid phone number format.';
    return '';
  };

  const validateSocialUrl = (val: string) => {
    if (!val.trim()) return '';
    if (!val.startsWith('https://')) return 'URL must start with https://';
    return '';
  };

  const isValidInput = (val: string) => {
    if (!/^[a-zA-Z\s\-]{2,50}$/.test(val.trim())) return false;
    if (!/[aeiouyAEIOUY]/.test(val)) return false;
    if (/([a-zA-Z])\1{2,}/.test(val)) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('socials.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({ ...prev, socials: { ...prev.socials, [key]: value } }));
      setFormErrors(prev => ({ ...prev, [key]: validateSocialUrl(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Real-time validations
      if (name === 'email') setFormErrors(prev => ({ ...prev, email: validateEmail(value) }));
      if (name === 'phoneNum') {
        const raw = value;
        const formatted = raw.replace(/[^\d\s]/g, '');
        setFormData(prev => ({ ...prev, phoneNum: formatted }));
        setFormErrors(prev => ({ ...prev, phone: validatePhone(formatted) }));
      }
    }
    setSuccess(false);
    setError('');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError('Image must be smaller than 2MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setFormData(prev => ({ ...prev, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTimeout(() => {
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const handleAddRole = () => {
    const val = others.role.trim();
    if (!isValidInput(val)) {
      setError("Please enter a valid, meaningful job role.");
      return;
    }
    setRolesList(p => Array.from(new Set([...p, val])));
    setFormData(p => ({ ...p, title: val }));
    setOthers(p => ({ ...p, role: '' }));
    setError('');
  };

  const handleAddLanguage = () => {
    const val = others.language.trim();
    if (!isValidInput(val)) {
      setError("Please enter a valid, meaningful language.");
      return;
    }
    setLanguagesList(p => Array.from(new Set([...p, val])));
    setFormData(p => ({ ...p, language: val }));
    setOthers(p => ({ ...p, language: '' }));
    setError('');
  };

  const removeCustomRole = () => {
    setRolesList(p => p.filter(r => r === formData.title ? false : true));
    setFormData(p => ({ ...p, title: ROLES[0] }));
  };

  const removeCustomLanguage = () => {
    setLanguagesList(p => p.filter(l => l === formData.language ? false : true));
    setFormData(p => ({ ...p, language: LANGUAGES[0] }));
  };

  const addSkill = (skillToAdd?: string) => {
    const trimmed = (skillToAdd || skillInput).trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, trimmed] }));
      if (!skillToAdd) setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

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
      const newSkills = [...formData.skills];
      const draggedItemContent = newSkills[dragItem.current];
      newSkills.splice(dragItem.current, 1);
      newSkills.splice(dragOverItem.current, 0, draggedItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setFormData(prev => ({ ...prev, skills: newSkills }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.title === 'Other' || formData.language === 'Other') {
      setError('Please confirm your custom additions by clicking "Add" before saving.');
      return;
    }

    const eErr = validateEmail(formData.email);
    const pErr = validatePhone(formData.phoneNum);
    const lErr = validateSocialUrl(formData.socials.linkedin);
    const tErr = validateSocialUrl(formData.socials.twitter);
    const gErr = validateSocialUrl(formData.socials.github);
    const poErr = validateSocialUrl(formData.socials.portfolio);

    const errs = { email: eErr, phone: pErr, linkedin: lErr, twitter: tErr, github: gErr, portfolio: poErr };
    setFormErrors(errs);
    if (Object.values(errs).some(err => err !== '')) {
      setError('Please fix the validation errors before saving.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const fullPhone = formData.phoneNum ? formData.phoneCode + formData.phoneNum.replace(/\s+/g, '') : '';
      const payload = {
        name: formData.name,
        title: formData.title,
        location: formData.location,
        phone: fullPhone,
        bio: formData.bio,
        avatar: formData.avatar,
        skills: formData.skills,
        socials: formData.socials,
        language: formData.language,
      };
      
      try {
        const updated = await api.put('/auth/profile', payload);
        updateUser({
          ...updated,
          profileCompletion: updated.profileCompletion ?? user?.profileCompletion,
        });
      } catch (apiErr) {
        console.warn('Backend unavailable, saving profile to local storage...');
        updateUser({
          ...payload,
          ...({ phone: payload.phone, bio: payload.bio, socials: payload.socials } as any)
        });
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      console.error('Profile update failed:', err);
      setError(err?.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your Profile Awaits</h2>
          <p className="text-muted-foreground mb-8">Log in to manage your profile, track applications, and showcase your skills to top recruiters.</p>
          <button onClick={() => navigate('/')} className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/40 transition-all">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const completion = user?.profileCompletion ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">

        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="relative group">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest cursor-help">
              <CheckCircle className="w-3 h-3" /> Profile {completion}% Complete
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-card border border-border rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 text-center">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Profile Strength</strong> is calculated based on:
                <br/>- Avatar & Basic Info (20%)
                <br/>- Job Title & Location (20%)
                <br/>- Skills added (20%)
                <br/>- Bio (5%)
                <br/>- Completed Tests/Courses (10%)
              </p>
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 font-bold shadow-sm">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="flex-1">Profile updated successfully!</span>
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold shadow-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="flex-1">{error}</span>
              <button onClick={() => setError('')} aria-label="Dismiss error"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row items-start gap-8">
          <aside className="w-full md:w-72 shrink-0 space-y-6">
            <section className="bg-card border border-border rounded-3xl p-8 text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-accent/20" />
              <div className="relative mt-8 mb-6 inline-block group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent p-1 shadow-2xl">
                  <div className="w-full h-full rounded-[2.3rem] bg-background flex items-center justify-center overflow-hidden">
                    {formData.avatar && formData.avatar.startsWith('data:') ? (
                      <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
                    ) : formData.avatar && !formData.avatar.startsWith('👤') ? (
                      <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold">{formData.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="Upload avatar"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </div>

              <h2 className="text-2xl font-bold mb-1">{formData.name || 'Your Name'}</h2>
              <p className="text-primary font-medium text-sm mb-4">{formData.title || 'Tech Professional'}</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
                <MapPin className="w-3 h-3" /> {formData.location || 'Location not set'}
              </div>

              <div className="text-left mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Profile Strength</span>
                  <span className="font-bold text-primary">{completion}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-muted/50 p-3 rounded-2xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Tests</p>
                  <p className="text-xl font-bold">{(user as any)?.testResults?.length || 0}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-2xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Skills</p>
                  <p className="text-xl font-bold">{formData.skills.length}</p>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Social Links
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Linkedin, name: 'socials.linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...', activeColor: 'text-blue-500' },
                  { icon: Github, name: 'socials.github', label: 'GitHub', placeholder: 'https://github.com/...', activeColor: 'text-foreground' },
                  { icon: Twitter, name: 'socials.twitter', label: 'Twitter', placeholder: 'https://twitter.com/...', activeColor: 'text-sky-500' },
                  { icon: Globe, name: 'socials.portfolio', label: 'Portfolio', placeholder: 'https://yourportfolio.com', activeColor: 'text-primary' },
                ].map(({ icon: Icon, name, label, placeholder, activeColor }) => {
                  const val = name.split('.').reduce((o: any, k) => o?.[k], formData) as string;
                  const key = name.split('.')[1] as keyof typeof formErrors;
                  const errorMsg = formErrors[key];
                  const hasValidLink = val.startsWith('https://');

                  return (
                    <div key={name} className="space-y-1">
                      <div className={`flex items-center gap-3 p-3 bg-background rounded-xl border transition-all ${errorMsg ? 'border-red-500 ring-1 ring-red-500/20' : 'border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'}`}>
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${hasValidLink ? activeColor : 'text-muted-foreground'}`} />
                        <input
                          type="text"
                          name={name}
                          value={val}
                          onChange={handleChange}
                          placeholder={placeholder}
                          aria-label={label}
                          className="bg-transparent border-none outline-none text-xs w-full text-foreground placeholder:text-muted-foreground/50"
                        />
                      </div>
                      {errorMsg && <p className="text-[10px] text-red-500 font-bold pl-2">{errorMsg}</p>}
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>

          <main className="flex-1 min-w-0 w-full">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Personal Details</h3>
                      <p className="text-sm text-muted-foreground">Update your basic information</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                      Email Address {formErrors.email && <span className="text-red-500 normal-case">{formErrors.email}</span>}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3.5 bg-background border rounded-2xl outline-none transition-all ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'}`}
                      />
                    </div>
                  </div>

                  {/* Phone Sync with Settings */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                      Phone Number {formErrors.phone && <span className="text-red-500 normal-case">{formErrors.phone}</span>}
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleChange}
                        className="w-32 px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary appearance-none transition-all"
                      >
                        {COUNTRY_CODES.map(c => <option key={c.code + c.iso} value={c.code}>{c.iso} ({c.code})</option>)}
                      </select>
                      <input
                        type="text"
                        name="phoneNum"
                        value={formData.phoneNum}
                        onChange={handleChange}
                        placeholder="Number"
                        className={`min-w-0 w-full px-4 py-3.5 bg-background border rounded-2xl outline-none transition-all ${formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'}`}
                      />
                    </div>
                  </div>

                  {/* Job Role Sync with Settings */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Current Job Role</label>
                    <div className="flex items-center gap-2">
                      <select
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                      >
                        {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                        <option value="Other">Other (Specify)</option>
                      </select>
                      {!ROLES.includes(formData.title) && formData.title !== 'Other' && (
                        <button type="button" onClick={removeCustomRole} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20">
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {formData.title === 'Other' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2 mt-2">
                          <input type="text" value={others.role} onChange={e => setOthers(p => ({ ...p, role: e.target.value }))} placeholder="Enter job role" className="flex-1 px-4 py-2 bg-background border border-border rounded-xl outline-none text-sm" />
                          <button type="button" onClick={handleAddRole} className="px-4 py-2 bg-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/30">Add</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Location Sync with Settings */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Location</label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                    >
                      <option value="" disabled>Select a location</option>
                      {ALL_COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Language Sync with Settings */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Language</label>
                    <div className="flex items-center gap-2">
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                      >
                        <option value="" disabled>Select language</option>
                        {languagesList.map(l => <option key={l} value={l}>{l}</option>)}
                        <option value="Other">Other (Specify)</option>
                      </select>
                      {!LANGUAGES.includes(formData.language) && formData.language !== 'Other' && formData.language !== '' && (
                        <button type="button" onClick={removeCustomLanguage} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20">
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {formData.language === 'Other' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2 mt-2">
                          <input type="text" value={others.language} onChange={e => setOthers(p => ({ ...p, language: e.target.value }))} placeholder="Enter language" className="flex-1 px-4 py-2 bg-background border border-border rounded-xl outline-none text-sm" />
                          <button type="button" onClick={handleAddLanguage} className="px-4 py-2 bg-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/30">Add</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                      Professional Bio
                      <span className={`${formData.bio.length > 500 ? 'text-red-500' : 'text-muted-foreground'}`}>{formData.bio.length}/500</span>
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      maxLength={500}
                      rows={4}
                      placeholder="Describe your technical journey, key achievements, and career goals..."
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Skills & Expertise</h3>
                      <p className="text-sm text-muted-foreground">Drag to reorder your top skills</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Common skills to add:</p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SKILLS.filter(s => !formData.skills.includes(s)).slice(0, 8).map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => addSkill(skill)}
                        className="px-3 py-1.5 bg-muted border border-border hover:border-primary/50 hover:text-primary rounded-full text-xs font-medium transition-all"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 mb-6 relative">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    placeholder="Type a custom skill and press Enter"
                    className="flex-1 px-5 py-3.5 bg-background border border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => addSkill()}
                    className="px-6 py-3.5 bg-primary/20 border border-primary/30 text-primary rounded-2xl font-bold hover:bg-primary/30 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>

                {formData.skills.length === 0 ? (
                  <div className="text-center py-8 bg-background border border-dashed border-border rounded-2xl">
                    <Info className="w-8 h-8 mx-auto mb-2 opacity-30 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No skills added yet. Start adding your tech stack!</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {formData.skills.map((skill, index) => (
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
              </section>

              {/* Achievements */}
              <section className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Achievements & Certificates</h3>
                      <p className="text-sm text-muted-foreground">Manage your credentials</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => certInputRef.current?.click()} className="hidden md:flex items-center gap-2 px-4 py-2 border border-border bg-background hover:bg-muted rounded-xl text-sm font-bold transition-colors">
                    <UploadCloud className="w-4 h-4" /> Upload Certificate
                  </button>
                  <input type="file" ref={certInputRef} className="hidden" accept=".pdf,image/*" onChange={handleCertUpload} />
                </div>
                
                <button type="button" onClick={() => certInputRef.current?.click()} className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 mb-6 border border-border bg-background hover:bg-muted rounded-xl text-sm font-bold transition-colors">
                  <UploadCloud className="w-4 h-4" /> Upload Certificate
                </button>

                {(user as any)?.testResults?.length > 0 ? (
                  <div className="space-y-4">
                    {(user as any).testResults.slice(0, 5).map((tr: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-background border border-border rounded-2xl hover:border-primary/50 transition-colors">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tr.score >= 80 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                          {tr.score >= 80 ? <Award className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold truncate">{tr.title}</p>
                          <p className="text-xs text-muted-foreground">Score: {tr.score}% · {tr.date}</p>
                        </div>
                        <span className={`hidden sm:inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${tr.score >= 80 ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'}`}>
                          {tr.score >= 80 ? 'Top Score' : 'Completed'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-background border border-dashed border-border rounded-2xl flex flex-col items-center">
                    <Award className="w-12 h-12 mb-4 text-muted-foreground opacity-30" />
                    <p className="text-base font-bold mb-2">No achievements yet</p>
                    <p className="text-sm text-muted-foreground max-w-sm mb-6">Take assessments to prove your skills and earn badges that stand out to recruiters.</p>
                    <button type="button" onClick={() => navigate('/practice')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all">
                      Take your first assessment
                    </button>
                  </div>
                )}
              </section>

              {/* Save bottom */}
              <div className="flex justify-end pb-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/40 focus:ring-4 focus:ring-primary/20 disabled:opacity-50 transition-all text-lg w-full md:w-auto justify-center"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Save Profile
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
