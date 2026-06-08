import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Send, AlertCircle, Image as ImageIcon, Trash2, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';
import { getWatermark } from '../utils/watermark';

interface BlogSubmissionFormProps {
  onClose: () => void;
  onPostCreated: () => void;
  editPost?: any;
}

export function BlogSubmissionForm({ onClose, onPostCreated, editPost }: BlogSubmissionFormProps) {
  const { user } = useApp();
  const [formData, setFormData] = useState({
    title: editPost?.title || '',
    excerpt: editPost?.excerpt || '',
    content: editPost?.content || '',
    category: editPost?.category || 'IT Career',
    image: editPost?.image || null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [step, setStep] = useState<'edit' | 'preview'>('edit');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Indian IT', 'Global Tech', 'Career Advice', 
    'AI/ML', 'Cloud', 'Full Stack', 
    'Data Science', 'DevOps', 'Cybersecurity', 
    'IT Career', 'Others'
  ];

  const initialCustomCategory = editPost && !categories.includes(editPost.category) ? editPost.category : '';
  const [customCategory, setCustomCategory] = useState(initialCustomCategory);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'category' && value !== 'Others') {
      setCustomCategory('');
    }
    setError('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    const finalCategory = formData.category === 'Others' ? customCategory : formData.category;
    if (formData.category === 'Others' && !customCategory.trim()) {
      setError('Please specify your custom category');
      return;
    }

    if (formData.title.length < 10) {
      setError('Title must be at least 10 characters long');
      return;
    }

    if (formData.excerpt.length < 20) {
      setError('Excerpt must be at least 20 characters long');
      return;
    }

    if (formData.content.length < 100) {
      setError('Content must be at least 100 characters long');
      return;
    }

    try {
      setIsSubmitting(true);
      // Remove watermark if it's already there to prevent duplicates (rudimentary check)
      let finalContent = formData.content;
      if (!editPost) {
        finalContent = formData.content + getWatermark(user?.name);
      }

      if (editPost) {
        await api.put(`/blog/posts/${editPost.id}`, { ...formData, content: finalContent, category: finalCategory });
      } else {
        await api.post('/blog/posts', { ...formData, content: finalContent, category: finalCategory });
      }
      onPostCreated();
    } catch (err) {
      setError(`Failed to ${editPost ? 'update' : 'create'} blog post. Please try again.`);
      console.error('Error saving post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    setStep('preview');
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim() || aiPrompt.length < 5) {
      setError('Please enter a more descriptive prompt for the AI (min 5 characters).');
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const response = await api.post('/blog/generate', { prompt: aiPrompt });
      // api.post returns the JSON directly, not an axios response object
      const { title, category, excerpt, content } = response;
      
      setFormData(prev => ({
        ...prev,
        title: title || prev.title,
        excerpt: excerpt || prev.excerpt,
        content: content || prev.content,
        category: categories.includes(category) ? category : 'Others',
      }));
      
      if (category && !categories.includes(category)) {
        setCustomCategory(category);
      }

      setAiPrompt(''); // Clear prompt on success
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setError(err.message || 'Failed to generate post. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a0a1a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a1a]/80 backdrop-blur">
          <h2 className="text-2xl font-bold text-white">{editPost ? 'Edit Post' : 'Share Your Post'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form / Preview */}
        {step === 'edit' ? (
          <form onSubmit={handlePreview} className="p-6 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* AI Generation Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-5 mb-6">
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              Generate with AI
            </label>
            <div className="flex gap-3">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Give a short brief (e.g., 'Write a post about learning React in 2026')"
                rows={2}
                className="flex-1 px-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none text-sm"
              />
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating || !aiPrompt.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center min-w-[100px] shadow-lg shadow-primary/20"
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 animate-spin mb-1" /> Generating...</>
                ) : (
                  <><Sparkles className="w-5 h-5 mb-1" /> Generate</>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 italic">
              AI will fill in the Title, Category, Excerpt, and Content based on your prompt.
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Post Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              maxLength={100}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <p className="text-xs text-gray-400 mt-1">{formData.title.length}/100</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Cover Image
            </label>
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {!formData.image ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary/50 hover:text-primary transition-all"
                >
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-sm">Click to upload cover image</span>
                  <span className="text-xs text-gray-500">JPG, PNG (Max 2MB)</span>
                </button>
              ) : (
                <div className="relative h-40 rounded-xl overflow-hidden group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      title="Change Image"
                    >
                      <ImageIcon className="w-5 h-5 text-white" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                      className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/40 transition-colors"
                      title="Remove Image"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0a0a1a]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {formData.category === 'Others' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <label className="block text-sm font-semibold text-white mb-2">
                  Specify Category <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g., Quantum Computing"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </motion.div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Excerpt <span className="text-red-400">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A short summary of your post (50-150 characters)..."
              rows={2}
              maxLength={200}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{formData.excerpt.length}/200</p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your full blog post content here... (Supports plain text. Markdown support coming soon!)"
              rows={8}
              maxLength={5000}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{formData.content.length}/5000</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors font-semibold"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Next: Preview Post
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
        ) : (
          <div className="p-6 space-y-8">
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3 text-primary">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">This is a preview of how your post will look to others.</p>
            </div>

            <article className="prose prose-invert max-w-none">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                  <Sparkles className="w-3 h-3" /> {formData.category === 'Others' ? customCategory : formData.category}
                </div>
                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{formData.title}</h1>
                
                {formData.image && (
                  <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 mb-6">
                    <img src={formData.image} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-4 bg-white/5 rounded-xl border-l-4 border-primary italic text-gray-400 mb-8">
                  {formData.excerpt}
                </div>

                <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {formData.content}
                </div>
              </div>
            </article>

            {/* Preview Actions */}
            <div className="flex gap-4 justify-end pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep('edit')}
                className="px-6 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors font-semibold"
              >
                Back to Edit
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50 transition-all"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? (editPost ? 'Saving...' : 'Publishing...') : (editPost ? 'Save Changes' : 'Confirm & Publish Now')}
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
