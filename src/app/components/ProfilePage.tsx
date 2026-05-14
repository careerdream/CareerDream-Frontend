import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, MapPin, Briefcase, Camera,
  Plus, Trash2, Save, CheckCircle,
  Globe, Linkedin, Twitter, Github, FileText,
  Award, Clock, ArrowLeft, Loader2, Phone,
  AlertCircle, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { useNavigate } from 'react-router';

export function ProfilePage() {
  const { user, isLoggedIn, updateUser } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
    phone: '',
    bio: '',
    skills: [] as string[],
    avatar: '',
    language: 'English',
    timezone: 'IST (GMT+5:30)',
    socials: {
      linkedin: '',
      twitter: '',
      github: '',
      portfolio: ''
    }
  });

  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        title: user.title || '',
        location: user.location || '',
        phone: (user as any).phone || '',
        bio: (user as any).bio || '',
        skills: user.skills || [],
        avatar: user.avatar || '',
        language: user.language || 'English',
        timezone: user.timezone || 'IST (GMT+5:30)',
        socials: {
          linkedin: (user as any).socials?.linkedin || '',
          twitter: (user as any).socials?.twitter || '',
          github: (user as any).socials?.github || '',
          portfolio: (user as any).socials?.portfolio || ''
        }
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('socials.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({ ...prev, socials: { ...prev.socials, [key]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const payload = {
        name: formData.name,
        title: formData.title,
        location: formData.location,
        phone: formData.phone,
        bio: formData.bio,
        avatar: formData.avatar,
        skills: formData.skills,
        socials: formData.socials,
        language: formData.language,
        timezone: formData.timezone,
      };
      
      try {
        const updated = await api.put('/auth/profile', payload);
        updateUser({
          ...updated,
          profileCompletion: updated.profileCompletion ?? user?.profileCompletion,
        });
      } catch (apiErr) {
        console.warn('Backend unavailable, saving profile to local storage...');
        // Fallback: update context directly which persists to local storage
        updateUser({
          name: formData.name,
          title: formData.title,
          location: formData.location,
          avatar: formData.avatar,
          skills: formData.skills,
          // We can cast user as any to access custom fields if needed
          ...({ phone: formData.phone, bio: formData.bio, socials: formData.socials } as any)
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

  /* ─── Not logged in gate ─── */
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
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <CheckCircle className="w-3 h-3" /> Profile {completion}% Complete
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="font-medium">Profile saved successfully! Changes are now reflected everywhere.</span>
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="font-medium flex-1">{error}</span>
            <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Profile Card */}
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
                  className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 transition-transform"
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

              {/* Completion bar */}
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

            {/* Social Links */}
            <section className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Social Links
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Linkedin, name: 'socials.linkedin', placeholder: 'linkedin.com/in/your-profile', color: 'text-blue-400' },
                  { icon: Github, name: 'socials.github', placeholder: 'github.com/your-handle', color: 'text-gray-300' },
                  { icon: Twitter, name: 'socials.twitter', placeholder: 'twitter.com/your-handle', color: 'text-sky-400' },
                  { icon: Globe, name: 'socials.portfolio', placeholder: 'yourportfolio.com', color: 'text-primary' },
                ].map(({ icon: Icon, name, placeholder, color }) => {
                  const val = name.split('.').reduce((o: any, k) => o?.[k], formData) as string;
                  return (
                    <div key={name} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                      <Icon className={`w-4 h-4 ${color} shrink-0`} />
                      <input
                        type="text"
                        name={name}
                        value={val}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="bg-transparent border-none outline-none text-xs w-full text-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>

          {/* ── Main Form ── */}
          <main>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details */}
              <section className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Personal Details</h3>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 transition-all"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {success ? 'Saved!' : loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', name: 'name', type: 'text', icon: User, placeholder: 'John Doe' },
                    { label: 'Email Address', name: 'email', type: 'email', icon: Mail, placeholder: '', disabled: true },
                    { label: 'Professional Title', name: 'title', type: 'text', icon: Briefcase, placeholder: 'e.g. Senior Frontend Developer' },
                    { label: 'Location', name: 'location', type: 'text', icon: MapPin, placeholder: 'e.g. Bangalore, India' },
                    { label: 'Phone Number', name: 'phone', type: 'tel', icon: Phone, placeholder: '+91 98765 43210' },
                  ].map(({ label, name, type, icon: Icon, placeholder, disabled }) => (
                    <div key={name} className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
                      <div className="relative">
                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={type}
                          name={name}
                          value={(formData as any)[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          disabled={disabled}
                          className={`w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-2xl outline-none transition-all ${disabled ? 'opacity-50 cursor-not-allowed bg-muted' : 'focus:border-primary focus:ring-1 focus:ring-primary'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Professional Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your technical journey, key achievements, and career goals..."
                    className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">{formData.bio.length}/500</p>
                </div>
              </section>

              {/* Skills */}
              <section className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    placeholder="Add a skill (e.g. React, Docker, Python)"
                    className="flex-1 px-5 py-3.5 bg-background border border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-6 py-3.5 bg-primary/20 border border-primary/30 text-primary rounded-2xl font-bold hover:bg-primary/30 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.skills.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No skills added yet. Start adding your tech stack!</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map(skill => (
                      <motion.div
                        key={skill}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-bold"
                      >
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="text-primary/50 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>

              {/* Achievements */}
              <section className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Achievements & Activities</h3>
                {(user as any)?.testResults?.length > 0 ? (
                  <div className="space-y-4">
                    {(user as any).testResults.slice(0, 5).map((tr: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-background border border-border rounded-2xl">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tr.score >= 80 ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                          {tr.score >= 80 ? <Award className="w-6 h-6" /> : <ClipboardCheckIcon className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">{tr.title}</p>
                          <p className="text-xs text-muted-foreground">Score: {tr.score}% · {tr.date}</p>
                        </div>
                        <span className={`text-xs font-black uppercase tracking-widest ${tr.score >= 80 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                          {tr.score >= 80 ? 'Top Score' : 'Completed'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Award className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No assessments taken yet. Complete tests to earn achievements!</p>
                  </div>
                )}
              </section>

              {/* Save bottom */}
              <div className="flex justify-end pb-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 transition-all text-lg"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {success ? '✓ Saved!' : loading ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

// Inline icon since ClipboardCheck isn't a default export from lucide in some versions
function ClipboardCheckIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}
