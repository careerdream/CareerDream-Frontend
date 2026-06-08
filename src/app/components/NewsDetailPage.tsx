import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { 
  Calendar, User, Eye, ArrowLeft, ArrowRight, 
  Share2, MessageCircle, Heart, Sparkles, Clock, Send, Twitter, Linkedin, Facebook, Link as LinkIcon
} from 'lucide-react';
import { api } from '../utils/api';
import type { BlogPost } from './NewsPage';
import { useApp } from '../context/AppContext';
import { formatShareMessage } from '../utils/watermark';
import { fallbackPosts } from '../data/newsFallback';
import { toast } from 'sonner';
import { BlogSubmissionForm } from './BlogSubmissionForm';
import { Edit2, Trash2 } from 'lucide-react';

// Simple helper to parse inline **bold** syntax, markdown links, bare URLs, and dynamic title/label bolding
const parseInlineStyles = (text: string) => {
  // Convert ***text*** to **text** so we handle it as bold
  let processedText = text.replace(/\*\*\*(.*?)\*\*\*/g, '**$1**');
  // Convert *text* to text (just remove italics for clean UI, or you could use <em>)
  processedText = processedText.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '$1');

  // Regex to match [text](url) OR bare http/https URLs
  const linkRegex = /(\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g;
  const parts = processedText.split(linkRegex);

  const elements = parts.map((part, i) => {
    if (!part) return null;

    // Check if it's a markdown link [text](url)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLinkMatch) {
      return (
        <a key={`link-${i}`} href={mdLinkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
          {mdLinkMatch[1]}
        </a>
      );
    }

    // Check if it's a bare URL
    const bareUrlMatch = part.match(/^https?:\/\/[^\s]+$/);
    if (bareUrlMatch) {
      return (
        <a key={`link-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
          {part}
        </a>
      );
    }

    // Process bold
    const boldParts = part.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((boldPart, j) => {
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        return <strong key={`bold-${i}-${j}`} className="text-white font-extrabold">{boldPart.slice(2, -2)}</strong>;
      }
      return boldPart;
    });
  });

  const flatElements = elements.flat().filter(Boolean);

  // Smart prefix colon bolding (e.g. "Role Focus: Designing distributed..." -> bold "Role Focus:")
  const firstElem = flatElements[0];
  if (typeof firstElem === 'string' && firstElem.includes(':') && !firstElem.includes('://')) {
    const colonIdx = firstElem.indexOf(':');
    if (colonIdx > 0 && colonIdx < 45) {
      const boldPrefix = firstElem.substring(0, colonIdx + 1);
      const rest = firstElem.substring(colonIdx + 1);
      flatElements[0] = rest;
      flatElements.unshift(
        <strong key="prefix-bold" className="text-white font-extrabold">{boldPrefix}</strong>
      );
    }
  }

  return flatElements;
};

const renderParagraph = (paragraph: string, index: number) => {
  let trimmed = paragraph.trim();
  if (!trimmed) return null;

  // Handle horizontal rules
  if (trimmed === '***' || trimmed === '---' || trimmed === '___') {
    return <hr key={index} className="border-white/10 my-8" />;
  }

  // Clean any leftover raw markdown symbols to guarantee 100% human-looking articles
  trimmed = trimmed.replace(/^\s*#{1,6}\s*/, '');
  trimmed = trimmed.replace(/^\s*\*\*\*\s*$/, '');

  // Handle lists starting with unicode bullet, dash, or asterisk
  if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
    // Strip bullet prefix and trailing spaces
    const listContent = trimmed.replace(/^[•\-*]\s*/, '').trim();
    return (
      <li key={index} className="list-disc list-inside pl-4 text-gray-300 ml-4 font-medium text-lg leading-relaxed my-2">
        {parseInlineStyles(listContent)}
      </li>
    );
  }

  // Handle numeric headings or short section headings beautifully
  // A heading is either numbered (e.g. "1. Senior Software Engineer") or a short title with no trailing period
  const isNumericHeading = /^\d+\.\s+[A-Za-z0-9]/.test(trimmed);
  const isShortHeading = trimmed.length < 85 && !trimmed.endsWith('.') && !trimmed.endsWith('?') && !trimmed.endsWith('"') && !trimmed.includes('says');

  if (isNumericHeading || isShortHeading) {
    return (
      <h3 key={index} className="text-xl md:text-2xl font-black text-white pt-6 pb-2 tracking-tight">
        {parseInlineStyles(trimmed)}
      </h3>
    );
  }

  return (
    <p key={index} className="text-gray-300 leading-relaxed text-lg font-medium my-4">
      {parseInlineStyles(paragraph)}
    </p>
  );
};

export function NewsDetailPage() {
  const { id } = useParams();
  const { user: currentUser } = useApp();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [comments, setComments] = useState<{id: number, user: {id: number, name: string}, comment_text: string, created_at: string}[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [timeAgo, setTimeAgo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const isAuthor = currentUser && String(post?.author?.id) === String(currentUser.id);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await api.delete(`/blog/posts/${post?.id}`);
        toast.success("Article deleted successfully");
        navigate('/news');
      } catch (err) {
        toast.error("Failed to delete article");
      }
    }
  };

  const handleEditComment = async (commentId: number) => {
    if (!editingCommentText.trim()) return;
    try {
      await api.put(`/blog/comments/${commentId}`, { comment_text: editingCommentText });
      setComments(prev => prev.map(c => c.id === commentId ? { ...c, comment_text: editingCommentText } : c));
      setEditingCommentId(null);
      setEditingCommentText('');
      toast.success("Comment updated");
    } catch (err) {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await api.delete(`/blog/comments/${commentId}`);
      setComments(prev => prev.filter(c => c.id !== commentId));
      toast.success("Comment deleted");
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    if (!post?.createdAt) return;

    const updateTime = () => {
      const now = new Date();
      const posted = new Date(post.createdAt);
      const diffInSeconds = Math.floor((now.getTime() - posted.getTime()) / 1000);

      if (diffInSeconds < 60) {
        setTimeAgo('Just now');
      } else if (diffInSeconds < 3600) {
        const mins = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${mins} min ago`);
      } else if (diffInSeconds < 86400) {
        const hrs = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`${hrs} hr ago`);
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        setTimeAgo(`${days} days ago`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [post?.createdAt]);


  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch main post from API
        try {
          const response = await api.get(`/blog/posts/${id}`);
          setPost(response);
          setLikeCount(response._count?.likes || 0);
          setIsLiked(response.isLiked || false);
          setComments(response.comments || []);
          
          const related = await api.get(`/blog/posts?limit=3`);
          setRelatedPosts(related.posts.filter((p: BlogPost) => p.id !== parseInt(id || "")));
        } catch (apiError) {
          console.warn('API failed, attempting static fallback lookup...');
          const fallbackPost = fallbackPosts.find(p => p.id === parseInt(id || "") || p.slug === id);
          if (fallbackPost) {
            setPost(fallbackPost as any);
            setLikeCount(fallbackPost.views % 13);
            setIsLiked(false);
            setComments([]);
            const related = fallbackPosts
              .filter(p => p.id !== fallbackPost.id)
              .slice(0, 2);
            setRelatedPosts(related as any);
          } else {
            console.error('No fallback post found for ID/slug:', id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch post details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPostDetails();
  }, [id]);

  const handleLike = async () => {
    if (!currentUser) return alert('Please login to like');
    if (!post?.id) return;
    
    // Optimistic Update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1));

    try {
      if (localStorage.getItem('authToken')) {
        const response = await api.post('/activity', { type: 'like', articleId: post.id });
        const { liked, likeCount: newCount } = response.data;
        setIsLiked(liked);
        if (newCount !== undefined) setLikeCount(newCount);
      }
    } catch (err) {
      console.error('Like failed:', err);
      // Revert optimistic update on failure
      setIsLiked(!newLikedState);
      setLikeCount(prev => !newLikedState ? prev + 1 : Math.max(0, prev - 1));
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert('Please login to comment');
    if (!newComment.trim()) return;

    const optimisticComment = {
      id: Date.now(),
      user: { name: currentUser.name || currentUser.email?.split('@')[0] || 'User' },
      comment_text: newComment,
      created_at: new Date().toISOString()
    };
    
    setComments([optimisticComment, ...comments]);
    setNewComment('');

    try {
      if (localStorage.getItem('authToken')) {
        const response = await api.post('/activity', { 
          type: 'comment', 
          articleId: post?.id, 
          commentText: newComment 
        });
        
        // Update optimistic comment with real ID
        if (response.success && response.data) {
          setComments(prev => prev.map(c => 
            c.id === optimisticComment.id ? { ...c, id: response.data.id } : c
          ));
        }
      }
    } catch (err) {
      console.error('Comment failed:', err);
      // Revert optimistic comment on failure
      setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
      alert('Failed to post comment. Please try again.');
    }
  };

  const socialFooter = `\n\nStay connected with us:\n\n🌐 Website https://www.CareerDream.in\n🎥 YouTube https://lnkd.in/gfwz2Pg6\n📢 WhatsApp Channel https://lnkd.in/g3jVSK3S\n🔗 LinkedIn https://lnkd.in/gFhQEQZm`;

  const shareLinks = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'hover:text-green-500', url: `https://wa.me/?text=${encodeURIComponent(formatShareMessage(post?.title || '', currentUser?.name || 'A user') + '\nArticle ' + window.location.href + socialFooter)}` },
    { name: 'LinkedIn', icon: Linkedin, color: 'hover:text-blue-600', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
    { name: 'Twitter', icon: Twitter, color: 'hover:text-sky-400', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(formatShareMessage(post?.title || '', currentUser?.name || 'A user') + '\nArticle ' + window.location.href + socialFooter)}` },
    { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-700', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const cleanTextForClipboard = (text: string) => {
    if (!text) return '';
    return text
      .replace(/^#{1,6}\s*/gm, '') // Remove heading hashes
      .replace(/\*\*\*(.*?)\*\*\*/g, '$1') // Remove ***
      .replace(/\*\*(.*?)\*\*/g, '$1')     // Remove **
      .replace(/^\s*\*\s+/gm, '• ')        // Convert asterisk bullets to real bullets
      .replace(/^\s*-\s+/gm, '• ')         // Convert dash bullets to real bullets
      .replace(/\*/g, '')                  // Strip any remaining asterisks (horizontal rules, italics)
      .replace(/__/g, '')                  // Strip underscores
      .replace(/`/g, '')                   // Strip backticks
      .trim();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030213]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full" 
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030213] text-white">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <Link to="/news" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030213] text-white selection:bg-primary/30">
      {/* Article Header / Progress Bar (optional) */}
      
      <div className="container mx-auto max-w-4xl px-6 py-24">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            to="/news" 
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to News Feed
          </Link>
        </motion.div>

        {/* Article Content */}
        <article>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <Sparkles className="w-3 h-3" /> {post.category}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 pb-12 border-b border-white/10 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl shadow-lg overflow-hidden">
                  {post.author.name === 'CareerDream Admin' ? (
                    <span className="text-white font-bold">CD</span>
                  ) : post.author.avatar ? (
                    <>
                      <img 
                        src={post.author.avatar.startsWith('http') || post.author.avatar.startsWith('/') ? post.author.avatar : `/${post.author.avatar}`} 
                        alt={post.author.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const nextSibling = (e.target as HTMLImageElement).nextElementSibling;
                          if (nextSibling) {
                            (nextSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      <span className="text-white font-bold hidden">{post.author.name.charAt(0)}</span>
                    </>
                  ) : (
                    <span className="text-white font-bold">{post.author.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-white">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.author.title || 'Tech Contributor'}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {post.views} views
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {timeAgo || 'Calculating...'}
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="w-full h-[400px] rounded-[2.5rem] bg-gradient-to-br from-white/5 to-white/10 border border-white/10 mb-12 relative overflow-hidden group">
               {post.image ? (
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               ) : (
                 <>
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                   <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20 filter grayscale group-hover:scale-110 transition-transform duration-700">
                      {post.category === 'AI/ML' ? '🤖' : post.category === 'Cloud' ? '☁️' : '💻'}
                   </div>
                 </>
               )}
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed space-y-6 text-lg font-medium">
                {post.content.split('\n').map((paragraph, i) => renderParagraph(paragraph, i))}
              </div>
            </div>

            {/* Share and Interactions */}
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isLiked ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} /> 
                  <span className="text-xs font-bold">{likeCount}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  <MessageCircle className="w-4 h-4" /> <span className="text-xs font-bold">{comments.length}</span>
                </button>
                {isAuthor && (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-all"
                    >
                      <Edit2 className="w-4 h-4" /> <span className="text-xs font-bold hidden sm:inline">Edit</span>
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" /> <span className="text-xs font-bold hidden sm:inline">Delete</span>
                    </button>
                  </>
                )}
              </div>
              <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
              >
                Share This Article <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-16 space-y-8">
              <h3 className="text-2xl font-bold">Discussion ({comments.length})</h3>
              
              <form onSubmit={handleAddComment} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm shrink-0">
                  U
                </div>
                <div className="flex-1 space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    rows={2}
                  />
                  <button 
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Send className="w-3 h-3" /> Post Comment
                  </button>
                </div>
              </form>

              <div className="space-y-6 mt-8">
                {comments.map(comment => {
                  const isCommentAuthor = currentUser && String(comment.user?.id) === String(currentUser.id);
                  return (
                  <div key={comment.id} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-bold shrink-0">
                      {(comment.user?.name || 'U').charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{comment.user?.name || 'Anonymous User'}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                          {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'Just now'}
                        </span>
                      </div>
                      
                      {editingCommentId === comment.id ? (
                        <div className="space-y-2 mt-2">
                          <textarea
                            value={editingCommentText}
                            onChange={(e) => setEditingCommentText(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors resize-none text-sm"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditComment(comment.id)}
                              className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:opacity-90 transition-opacity"
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditingCommentText('');
                              }}
                              className="px-4 py-1.5 rounded-lg bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition-opacity"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-300 text-sm leading-relaxed">{comment.comment_text}</p>
                          {isCommentAuthor && (
                            <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditingCommentText(comment.comment_text);
                                }}
                                className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" /> Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-xs text-red-500 hover:text-red-400 transition-colors font-semibold flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </motion.div>
        </article>

        {/* Related Feed (The Glimps) */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-black tracking-tighter">Read More Insights.</h2>
             <Link 
              to="/news" 
              className="px-6 py-2 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
            >
              All Articles
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((rPost, idx) => (
              <motion.div
                key={rPost.id}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all"
              >
                <Link to={`/news/${rPost.id}`} className="block">
                  <div className="flex items-center gap-2 text-primary text-[9px] font-black uppercase tracking-widest mb-4">
                    <Sparkles className="w-3 h-3" /> {rPost.category}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {rPost.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <User className="w-3 h-3" /> {rPost.author.name}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowShareModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-sm bg-[#0a0a1a] border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Share this Article</h3>
            <div className="grid grid-cols-2 gap-4">
              {shareLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all ${link.color}`}
                >
                  <link.icon className="w-8 h-8" />
                  <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                </a>
              ))}
              
              <button
                onClick={() => {
                  if (post) {
                    const cleanTitle = cleanTextForClipboard(post.title);
                    const cleanExcerpt = cleanTextForClipboard(post.excerpt);
                    const cleanContent = cleanTextForClipboard(post.content);
                    const formattedText = `📰 *${cleanTitle}*\n📝 Excerpt: ${cleanExcerpt}\n\n${cleanContent}\n\n🌐 Read the full article on CareerDream: ${window.location.href}${socialFooter}`;
                    navigator.clipboard.writeText(formattedText);
                    toast.success("Full article copied successfully! Go ahead and paste it on LinkedIn, WhatsApp, or Facebook.");
                  }
                }}
                className="col-span-2 flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-white hover:opacity-90 transition-all"
              >
                <Share2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">Copy Full Article & Share</span>
              </button>

              <button
                onClick={() => {
                  if (post) {
                    const shareMsg = formatShareMessage(post.title, currentUser?.name || 'A user');
                    navigator.clipboard.writeText(`${shareMsg}\nArticle ${window.location.href}${socialFooter}`);
                    toast.success('Link & Socials copied to clipboard!');
                  }
                }}
                className="col-span-2 flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Copy Article Link</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && post && (
        <BlogSubmissionForm
          editPost={post}
          onClose={() => setIsEditing(false)}
          onPostCreated={() => {
            setIsEditing(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
