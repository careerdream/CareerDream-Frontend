import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Calendar, User, ArrowRight, Sparkles,
  Search, Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { BlogPostCard } from './BlogPostCard';
import { BlogSubmissionForm } from './BlogSubmissionForm';
import { SocialMediaModal } from './SocialMediaModal';
import { NewsletterForm } from './NewsletterForm';
import { fallbackPosts } from '../data/newsFallback';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  featured: boolean;
  views: number;
  createdAt: string;
  image?: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
    title?: string;
  };
  comments?: {
    id: number;
    comment_text: string;
    created_at: string;
    user: {
      id: number;
      name: string;
      avatar?: string;
    }
  }[];
  _count?: {
    comments: number;
    likes: number;
  };
}


export function NewsPage() {
  const { isLoggedIn } = useApp();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  // Only show social modal if not dismissed before
  const [showSocialModal, setShowSocialModal] = useState(
    () => !localStorage.getItem('cd-social-modal-dismissed')
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'Indian IT', 'Global Tech', 'Career Advice', 
    'AI/ML', 'Cloud', 'Full Stack', 
    'Data Science', 'DevOps', 'Cybersecurity', 'IT Career'
  ];

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchQuery, selectedCategory]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const categoryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      const response = await api.get(
        `/blog/posts?page=${currentPage}&limit=6${categoryParam}`
      );
      setPosts(response.posts);
      setTotalPages(response.pagination.pages || 1);
    } catch (error) {
      console.error('Failed to fetch blog posts from API, falling back to static posts:', error);
      let filtered = fallbackPosts;
      if (selectedCategory) {
        filtered = fallbackPosts.filter(p => p.category === selectedCategory);
      }
      setPosts(filtered.slice((currentPage - 1) * 6, currentPage * 6) as any);
      setTotalPages(Math.ceil(filtered.length / 6) || 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostCreated = () => {
    setShowSubmissionForm(false);
    setCurrentPage(1);
    fetchPosts();
  };

  const displayedPosts = posts;

  const filteredPosts = displayedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030213] via-[#0a0a1a] to-[#030213] text-white">
      <AnimatePresence>
        {showSocialModal && (
          <SocialMediaModal onClose={() => {
            setShowSocialModal(false);
            localStorage.setItem('cd-social-modal-dismissed', '1');
          }} />
        )}
      </AnimatePresence>

      {/* Header Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">IT Career Insights</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tech Career <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">News Hub</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Stay updated with {displayedPosts.length}+ featured insights from the global IT industry.
            </p>

            {isLoggedIn && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSubmissionForm(!showSubmissionForm)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                <Plus className="w-5 h-5" />
                Share Your Post
              </motion.button>
            )}
          </motion.div>

          {/* Submission Form Modal */}
          <AnimatePresence>
            {showSubmissionForm && (
              <BlogSubmissionForm
                onClose={() => setShowSubmissionForm(false)}
                onPostCreated={handlePostCreated}
              />
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 py-8 border-b border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="relative w-12 h-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-full border-3 border-primary/20 border-t-primary rounded-full"
                />
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No blog posts found. Be the first to share!</p>
            </motion.div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BlogPostCard post={post} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Get the latest IT career insights delivered straight to your inbox
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
