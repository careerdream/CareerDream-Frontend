import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';
import { api } from '../utils/api';

export function JobPostingForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: 'Remote',
    locationType: 'Remote',
    description: '',
    skills: [] as string[],
    experienceLevel: 'Fresher',
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    externalUrl: '',
    applicantEmail: ''
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const recruiterAuth = localStorage.getItem('recruiterAuth');
    if (recruiterAuth) {
      const parsed = JSON.parse(recruiterAuth);
      if (parsed.employer?.company_name) {
        setFormData(prev => ({ ...prev, companyName: parsed.employer.company_name }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const recruiterAuth = localStorage.getItem('recruiterAuth');
    const recruiter = recruiterAuth ? JSON.parse(recruiterAuth) : null;

    if (!formData.title || !formData.companyName || !formData.description || formData.skills.length === 0) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Map frontend fields to backend schema
      const payload = {
        title: formData.title,
        company: formData.companyName,
        location: formData.location,
        salary: formData.salaryMin && formData.salaryMax ? `₹${formData.salaryMin} - ₹${formData.salaryMax}` : 'Negotiable',
        type: formData.locationType,
        experience: formData.experienceLevel,
        category: 'Technology', // Default for now
        description: formData.description,
        skills: formData.skills,
        applicants: 0
      };

      await api.post('/jobs', payload);
      
      alert('Job posted successfully!');
      navigate('/recruiter/dashboard');
    } catch (err: any) {
      console.error('Job post error:', err);
      alert(err?.response?.data?.message || 'Failed to post job. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <button onClick={() => navigate('/recruiter/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">Fill in the details below to reach top IT talent</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
          {/* Basic Information */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior Python Developer"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., Tech Company Inc."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Bangalore, India"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Work Type *</label>
                  <select
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  >
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Job Description */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and requirements..."
                rows={8}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-2">Include key responsibilities, qualifications, and benefits</p>
            </div>
          </section>

          {/* Skills & Experience */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Skills & Experience</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Required Skills *</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Type skill and press Enter"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-primary/60 hover:text-primary"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience Level *</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                >
                  <option>Fresher</option>
                  <option>0-2 years</option>
                  <option>2-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
            </div>
          </section>

          {/* Salary & Application */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Salary & Application</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Salary Range (Min)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">₹</span>
                    <input
                      type="number"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleChange}
                      placeholder="Minimum salary"
                      className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Salary Range (Max)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">₹</span>
                    <input
                      type="number"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleChange}
                      placeholder="Maximum salary"
                      className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Application Email *</label>
                <input
                  type="email"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  onChange={handleChange}
                  placeholder="recruiter@company.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Direct Apply Link (Company Website)</label>
                <input
                  type="url"
                  name="externalUrl"
                  value={formData.externalUrl}
                  onChange={handleChange}
                  placeholder="https://your-company.com/apply"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard')}
              className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg transition-all disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
