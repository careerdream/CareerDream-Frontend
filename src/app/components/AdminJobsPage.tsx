import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, Plus, Trash2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const JOB_TYPES = ['Remote', 'Full-time', 'Contract', 'Government', 'Abroad', 'Internship', 'Part-time'];
const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'];
const CATEGORIES = ['AI/ML', 'Cloud', 'DevOps', 'Backend', 'Frontend', 'Data Science', 'Data Engineering', 'Full Stack', 'Mobile', 'Cybersecurity', 'Product', 'Government'];

interface JobFormData {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  logo: string;
  category: string;
  description: string;
  aboutCompany: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  featured: boolean;
  urgent: boolean;
}

export function AdminJobsPage() {
  const { isAdmin, jobs } = useApp();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [niceToHaveInput, setNiceToHaveInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    experience: '',
    logo: '💼',
    category: '',
    description: '',
    aboutCompany: '',
    skills: [],
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    benefits: [],
    featured: false,
    urgent: false,
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">Admin permissions required to post jobs.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name as keyof JobFormData] }));
  };

  const addToArray = (arrayName: string, value: string, setInput: (val: string) => void) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName as keyof JobFormData] as string[], value.trim()]
    }));
    setInput('');
  };

  const removeFromArray = (arrayName: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName as keyof JobFormData] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.salary || 
        !formData.type || !formData.experience || !formData.category || !formData.description) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage({ type: 'error', text: 'Authentication required. Please login.' });
        return;
      }

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Job posted successfully! 🎉' });
        // Reset form
        setFormData({
          title: '',
          company: '',
          location: '',
          salary: '',
          type: '',
          experience: '',
          logo: '💼',
          category: '',
          description: '',
          aboutCompany: '',
          skills: [],
          responsibilities: [],
          requirements: [],
          niceToHave: [],
          benefits: [],
          featured: false,
          urgent: false,
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to post job' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error submitting form. Please try again.' });
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">Fill in the details below to post a job listing</p>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <AlertCircle className={`h-4 w-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`} />
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior ML Engineer"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company Name *</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g., TechCorp AI"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Salary Range *</label>
                <Input
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g., $150k - $200k"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Job Type *</label>
                <Select value={formData.type} onValueChange={(val) => handleSelectChange('type', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Experience Level *</label>
                <Select value={formData.experience} onValueChange={(val) => handleSelectChange('experience', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <Select value={formData.category} onValueChange={(val) => handleSelectChange('category', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Logo Emoji</label>
                <Input
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  placeholder="e.g., 🚀"
                  maxLength={2}
                />
              </div>
            </div>
          </Card>

          {/* Descriptions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Job Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Description *</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the role and responsibilities..."
                  rows={5}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">About Company</label>
                <Textarea
                  name="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={handleInputChange}
                  placeholder="Tell candidates about your company..."
                  rows={4}
                />
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Required Skills</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g., Python, TensorFlow"
                  onKeyPress={(e) => e.key === 'Enter' && (addToArray('skills', skillInput, setSkillInput), e.preventDefault())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addToArray('skills', skillInput, setSkillInput)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="bg-primary/10 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeFromArray('skills', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Responsibilities */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Responsibilities</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={responsibilityInput}
                  onChange={(e) => setResponsibilityInput(e.target.value)}
                  placeholder="e.g., Design ML models, Lead architecture"
                  onKeyPress={(e) => e.key === 'Enter' && (addToArray('responsibilities', responsibilityInput, setResponsibilityInput), e.preventDefault())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addToArray('responsibilities', responsibilityInput, setResponsibilityInput)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded flex justify-between items-center">
                    {resp}
                    <button
                      type="button"
                      onClick={() => removeFromArray('responsibilities', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Requirements */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Requirements</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  placeholder="e.g., 5+ years experience, Python expertise"
                  onKeyPress={(e) => e.key === 'Enter' && (addToArray('requirements', requirementInput, setRequirementInput), e.preventDefault())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addToArray('requirements', requirementInput, setRequirementInput)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded flex justify-between items-center">
                    {req}
                    <button
                      type="button"
                      onClick={() => removeFromArray('requirements', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Nice to Have */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Nice to Have</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={niceToHaveInput}
                  onChange={(e) => setNiceToHaveInput(e.target.value)}
                  placeholder="e.g., PhD in ML, AWS certification"
                  onKeyPress={(e) => e.key === 'Enter' && (addToArray('niceToHave', niceToHaveInput, setNiceToHaveInput), e.preventDefault())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addToArray('niceToHave', niceToHaveInput, setNiceToHaveInput)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.niceToHave.map((item, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded flex justify-between items-center">
                    {item}
                    <button
                      type="button"
                      onClick={() => removeFromArray('niceToHave', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Benefits</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  placeholder="e.g., Health insurance, Remote work, Stock options"
                  onKeyPress={(e) => e.key === 'Enter' && (addToArray('benefits', benefitInput, setBenefitInput), e.preventDefault())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addToArray('benefits', benefitInput, setBenefitInput)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded flex justify-between items-center">
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeFromArray('benefits', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Options */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Options</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={() => handleCheckboxChange('featured')}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Featured Job (Highlighted on jobs page)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.urgent}
                  onChange={() => handleCheckboxChange('urgent')}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Urgent (Mark as time-sensitive)</span>
              </label>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </div>
        </form>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Platform Stats</h2>
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{jobs.length}</div>
              <div className="text-sm text-muted-foreground">Total Job Postings</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
