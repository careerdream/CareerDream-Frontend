import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Download, CheckCircle, 
  XCircle, Clock, Star, Users, MessageSquare, ThumbsUp, AlertTriangle, Image as ImageIcon,
  Loader2, Tag, BookOpen, Layers
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';

export function AdminBlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortParam, setSortParam] = useState('recent');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Views: 'list', 'edit', 'comments'
  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'comments'>('list');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  // Analytics
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const { user: currentUser } = useApp();

  // Form State
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'News',
    image: '',
    status: 'draft',
    featured: false
  });

  useEffect(() => {
    if (selectedPost && currentView === 'edit') {
      setFormState({
        title: selectedPost.title || '',
        content: selectedPost.content || '',
        excerpt: selectedPost.excerpt || '',
        category: selectedPost.category || 'News',
        image: selectedPost.image || '',
        status: selectedPost.status || 'draft',
        featured: selectedPost.featured || false
      });
    } else if (!selectedPost && currentView === 'edit') {
      setFormState({
        title: '',
        content: '',
        excerpt: '',
        category: 'News',
        image: '',
        status: 'draft',
        featured: false
      });
    }
  }, [selectedPost, currentView]);

  const handleSavePost = async () => {
    if (!formState.title || !formState.content) {
      alert('Title and Content are required.');
      return;
    }

    setLoading(true);
    try {
      const url = selectedPost ? `/api/admin/blog/${selectedPost.id}` : '/api/admin/blog';
      const method = selectedPost ? 'PUT' : 'POST';
      
      const payload = {
        ...formState,
        authorId: currentUser?.id
      };

      const res = await (selectedPost 
        ? api.put(`/admin/blog/${selectedPost.id}`, payload)
        : api.post('/admin/blog', payload));

      setCurrentView('list');
      fetchPosts();
      fetchAnalytics();
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'list') {
      fetchPosts();
      fetchAnalytics();
    }
  }, [page, statusFilter, categoryFilter, sortParam, search, currentView]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        sort: sortParam,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(categoryFilter !== 'all' && { category: categoryFilter }),
        ...(search && { search })
      });
      const data = await api.get(`/admin/blog?${params}`);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await api.get('/admin/blog/analytics/dashboard');
      setDashboardStats(data);
    } catch(e) {}
  };

  const fetchDetails = async (id: number, view: 'edit' | 'comments') => {
    try {
      const data = await api.get(`/admin/blog/${id}`);
      setSelectedPost(data);
      setCurrentView(view);
    } catch (e) {
      console.error("Failed to load details");
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} posts? This cannot be undone.`)) return;
    try {
      await api.post('/admin/blog/bulk-delete', { ids: selectedIds });
      setSelectedIds([]);
      fetchPosts();
      fetchAnalytics();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    await api.put(`/admin/blog/${id}/status`, { status: newStatus });
    fetchPosts();
    fetchAnalytics();
  };

  const toggleFeatured = async (id: number, featured: boolean) => {
    await api.put(`/admin/blog/${id}/featured`, { featured: !featured });
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete(`/admin/blog/${id}`);
    if (currentView !== 'list') setCurrentView('list');
    else { fetchPosts(); fetchAnalytics(); }
  };

  const updateCommentStatus = async (cid: number, status: string) => {
    if (!selectedPost) return;
    await api.put(`/admin/blog/${selectedPost.id}/comments/${cid}`, { status });
    fetchDetails(selectedPost.id, 'comments');
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      published: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400',
      archived: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.draft}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="max-w-7xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog & News Management</h1>
          <div className="flex space-x-3">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 size={16} className="mr-2" /> Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button variant="outline" onClick={() => api.download('/admin/blog/export', 'blog_export.csv')}>
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
            <Button onClick={() => { setSelectedPost(null); setCurrentView('edit'); }} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" /> Create Post
            </Button>
          </div>
        </div>

        {/* Analytics Top Bar */}
        {dashboardStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
              <div><p className="text-sm text-slate-500">Total Posts</p><p className="text-2xl font-bold text-slate-900 dark:text-white">{dashboardStats.totalPosts}</p></div>
              <BookOpen size={24} className="text-blue-500 opacity-50" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
              <div><p className="text-sm text-slate-500">Published</p><p className="text-2xl font-bold text-emerald-600">{dashboardStats.published}</p></div>
              <CheckCircle size={24} className="text-emerald-500 opacity-50" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
              <div><p className="text-sm text-slate-500">Drafts</p><p className="text-2xl font-bold text-amber-500">{dashboardStats.drafts}</p></div>
              <Edit size={24} className="text-amber-500 opacity-50" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
              <div><p className="text-sm text-slate-500">Total Views</p><p className="text-2xl font-bold text-purple-600">{dashboardStats.totalViews}</p></div>
              <Eye size={24} className="text-purple-500 opacity-50" />
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <Input 
                placeholder="Search by title, author..." 
                className="pl-10" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchPosts()}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="IT Career">IT Career</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Tutorial">Tutorial</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[110px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortParam} onValueChange={setSortParam}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="views_desc">Most Views</SelectItem>
                  <SelectItem value="likes_desc">Most Likes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="p-4 w-12">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newIds = posts.map(p => p.id).filter(id => !selectedIds.includes(id));
                          setSelectedIds([...selectedIds, ...newIds]);
                        } else {
                          const pageIds = posts.map(p => p.id);
                          setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
                        }
                      }}
                      checked={posts.length > 0 && posts.every(p => selectedIds.includes(p.id))}
                    />
                  </th>
                  <th className="p-4 font-medium">Post Title</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Status & Featured</th>
                  <th className="p-4 font-medium">Engagement</th>
                  <th className="p-4 font-medium">Published</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr><td colSpan={7} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                ) : posts.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-slate-500">No posts found.</td></tr>
                ) : posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300"
                        checked={selectedIds.includes(post.id)}
                        onChange={(e) => setSelectedIds(e.target.checked ? [...selectedIds, post.id] : selectedIds.filter(id => id !== post.id))}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900 dark:text-white line-clamp-1 max-w-[300px]" title={post.title}>{post.title}</p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center"><Tag size={12} className="mr-1" /> {post.category}</p>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                      {post.author?.name || 'Unknown'}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-1">
                        <StatusBadge status={post.status} />
                        {post.featured && (
                          <span className="flex items-center text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider">
                            <Star size={10} className="mr-1 fill-amber-500" /> Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center" title="Views"><Eye size={14} className="mr-1" />{post.views}</span>
                        <span className="flex items-center text-rose-500" title="Likes"><ThumbsUp size={14} className="mr-1" />{post._count?.likes || 0}</span>
                        <span className="flex items-center text-blue-500" title="Comments"><MessageSquare size={14} className="mr-1" />{post._count?.comments || 0}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => fetchDetails(post.id, 'comments')} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded relative" title="Moderate Comments">
                          <MessageSquare size={18} />
                          {post._count?.comments > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>}
                        </button>
                        <button onClick={() => fetchDetails(post.id, 'edit')} className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded" title="Edit Post"><Edit size={18} /></button>
                        <button onClick={() => toggleFeatured(post.id, post.featured)} className={`p-1.5 rounded ${post.featured ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`} title="Toggle Featured"><Star size={18} /></button>
                        <button onClick={() => toggleStatus(post.id, post.status)} className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded" title={post.status === 'published' ? 'Unpublish' : 'Publish'}>
                          {post.status === 'published' ? <Eye size={18} /> : <Eye size={18} className="opacity-50" />}
                        </button>
                        <button onClick={() => deletePost(post.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
            <p className="text-slate-500">Showing page {page} of {totalPages || 1}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // POST EDITOR / CREATE VIEW (Simplified for UI representation)
  if (currentView === 'edit') {
    const isEdit = !!selectedPost;
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
         <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex-1">{isEdit ? 'Edit Blog Post' : 'Create New Post'}</h1>
          <Button variant="outline"><Eye size={16} className="mr-2" /> Live Preview</Button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 mb-6 text-sm">This editor allows you to construct full blog posts. Use the Rich Text Editor to format content and the settings below to manage metadata.</p>
          
          <div className="space-y-6">
             <div>
                <label className="text-sm font-medium mb-1 block">Post Title</label>
                <Input 
                  value={formState.title} 
                  onChange={e => setFormState({...formState, title: e.target.value})}
                  className="text-lg font-semibold" 
                />
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={formState.category} onValueChange={v => setFormState({...formState, category: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT Career">IT Career</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select value={formState.status} onValueChange={v => setFormState({...formState, status: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
             </div>

             <div>
                <label className="text-sm font-medium mb-1 block flex items-center"><ImageIcon size={14} className="mr-2" /> Featured Image URL</label>
                <Input 
                  value={formState.image} 
                  onChange={e => setFormState({...formState, image: e.target.value})}
                  placeholder="https://..." 
                />
             </div>

             <div>
               <label className="text-sm font-medium mb-1 block">Excerpt Summary</label>
               <textarea 
                  className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300 min-h-[80px]" 
                  value={formState.excerpt}
                  onChange={e => setFormState({...formState, excerpt: e.target.value})}
                  placeholder="A short description of the article..."
               />
             </div>

             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
               <div className="flex items-center justify-between mb-2">
                 <label className="text-sm font-medium">Post Content</label>
                 <div className="flex gap-2">
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 font-bold">B</button>
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 italic">I</button>
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 underline">U</button>
                 </div>
               </div>
               <textarea 
                  className="w-full rounded border border-transparent bg-white dark:bg-slate-800 px-3 py-4 text-sm focus-visible:outline-none min-h-[300px]" 
                  value={formState.content}
                  onChange={e => setFormState({...formState, content: e.target.value})}
                  placeholder="Start writing..."
               />
             </div>

             <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formState.featured} 
                    onChange={e => setFormState({...formState, featured: e.target.checked})}
                    className="w-4 h-4 rounded" 
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Feature on Homepage</span>
                </label>
             </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button variant="outline" onClick={() => setCurrentView('list')} disabled={loading}>Cancel</Button>
            <Button onClick={handleSavePost} disabled={loading}>
              {loading && <Loader2 size={16} className="animate-spin mr-2" />}
              {isEdit ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // COMMENTS MANAGEMENT VIEW
  if (currentView === 'comments' && selectedPost) {
    const commentsList = selectedPost.commentsList || [];
    
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
         <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back to Posts</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex-1 truncate">Comments: {selectedPost.title}</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
           <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
             <h3 className="font-bold text-slate-900 dark:text-white flex items-center"><MessageSquare size={16} className="mr-2" /> Moderate Comments ({commentsList.length})</h3>
           </div>
           
           <div className="divide-y divide-slate-100 dark:divide-slate-800">
             {commentsList.length === 0 ? (
               <div className="p-8 text-center text-slate-500">No comments on this post yet.</div>
             ) : commentsList.map((comment: any) => (
               <div key={comment.id} className={`p-6 flex gap-4 ${comment.status === 'spam' ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                 <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold shrink-0">
                    {comment.user?.name?.charAt(0) || '?'}
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                         <p className="font-semibold text-slate-900 dark:text-white">{comment.user?.name}</p>
                         <p className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleString()}</p>
                       </div>
                       <div className="flex items-center gap-2">
                         {comment.status === 'pending' && <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-yellow-100 text-yellow-700 rounded mr-2">Pending</span>}
                         {comment.status === 'spam' && <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-red-100 text-red-700 rounded mr-2">Spam</span>}
                         
                         {comment.status !== 'approved' && (
                           <button onClick={() => updateCommentStatus(comment.id, 'approved')} className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1 rounded">Approve</button>
                         )}
                         {comment.status !== 'spam' && (
                           <button onClick={() => updateCommentStatus(comment.id, 'spam')} className="text-xs font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-2 py-1 rounded">Mark Spam</button>
                         )}
                         <button onClick={async () => {
                            if(!window.confirm('Delete comment?')) return;
                          await api.delete(`/admin/blog/${selectedPost.id}/comments/${comment.id}`);
                          fetchDetails(selectedPost.id, 'comments');
                         }} className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded">Delete</button>
                       </div>
                    </div>
                    <p className={`text-sm ${comment.status === 'spam' ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                      {comment.comment_text}
                    </p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  }

  return null;
}
