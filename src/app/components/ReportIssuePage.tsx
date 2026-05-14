import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { BASE_URL } from '../utils/api';

export function ReportIssuePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue_title: '',
    issue_description: ''
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setScreenshot(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('issue_title', formData.issue_title);
    data.append('issue_description', formData.issue_description);
    if (screenshot) {
      data.append('screenshot', screenshot);
    }

    try {
      const response = await fetch(`${BASE_URL}/issues`, {
        method: 'POST',
        body: data
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong. Please try again.');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', issue_title: '', issue_description: '' });
      setScreenshot(null);
    } catch (error: any) {
      console.error('Error reporting issue:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Report an Issue</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Found a bug or experiencing technical difficulties? Let us know with the form below and our team will investigate it promptly.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {submitStatus === 'success' ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black mb-4">Issue Logged Successfully</h2>
              <p className="text-muted-foreground mb-8">
                Thank you for helping us improve CareerDream. Our team will review your report shortly.
              </p>
              <button 
                onClick={() => setSubmitStatus('idle')}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
              >
                Submit Another Issue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus === 'error' && (
                <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all font-medium"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground">Issue Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.issue_title}
                  onChange={e => setFormData({ ...formData, issue_title: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all font-medium"
                  placeholder="E.g., Unable to upload resume on Profile page"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground">Issue Description</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.issue_description}
                  onChange={e => setFormData({ ...formData, issue_description: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all font-medium resize-none"
                  placeholder="Please describe the steps to reproduce the issue..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground">Attach Screenshot (Optional)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`w-full py-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${screenshot ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}>
                    {screenshot ? (
                      <>
                        <ImageIcon className="w-8 h-8 text-primary" />
                        <span className="font-bold text-sm text-primary">{screenshot.name}</span>
                        <span className="text-xs text-muted-foreground">Click to change file</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <span className="font-bold text-sm">Drop your screenshot here</span>
                        <span className="text-xs text-muted-foreground">JPG, JPEG, PNG (Max 5MB)</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-black rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  'Submit Issue Report'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
