import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Download, CheckCircle, 
  XCircle, Clock, Star, Users, BarChart2, BookOpen, Layers, Target, Copy, Upload, HelpCircle, GripVertical, Loader2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, LineChart, Line } from 'recharts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

export function AdminAssessmentManagement() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Views: 'list', 'edit_assessment', 'details', 'questions'
  const [currentView, setCurrentView] = useState<'list' | 'edit_assessment' | 'details' | 'questions'>('list');
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  // Form State
  const [formState, setFormState] = useState({
    title: '',
    category: '',
    difficulty: 'Medium',
    duration: 60,
    passingScore: 60,
    status: 'draft',
    color: 'bg-blue-600',
    badge: '📝'
  });

  useEffect(() => {
    if (selectedAssessment && currentView === 'edit_assessment') {
      setFormState({
        title: selectedAssessment.title || '',
        category: selectedAssessment.category || '',
        difficulty: selectedAssessment.difficulty || 'Medium',
        duration: selectedAssessment.duration || 60,
        passingScore: selectedAssessment.passingScore || 60,
        status: selectedAssessment.status || 'draft',
        color: selectedAssessment.color || 'bg-blue-600',
        badge: selectedAssessment.badge || '📝'
      });
    } else if (!selectedAssessment && currentView === 'edit_assessment') {
      setFormState({
        title: '',
        category: '',
        difficulty: 'Medium',
        duration: 60,
        passingScore: 60,
        status: 'draft',
        color: 'bg-blue-600',
        badge: '📝'
      });
    }
  }, [selectedAssessment, currentView]);

  const handleSaveAssessment = async () => {
    if (!formState.title || !formState.category) {
      alert('Title and Category are required.');
      return;
    }

    setLoading(true);
    try {
      await (selectedAssessment 
        ? api.put(`/admin/assessments/${selectedAssessment.id}`, formState)
        : api.post('/admin/assessments', formState));

      setCurrentView('list');
      fetchAssessments();
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (currentView === 'list') {
      fetchAssessments();
    }
  }, [page, statusFilter, categoryFilter, difficultyFilter, currentView]);

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(categoryFilter !== 'all' && { category: categoryFilter }),
        ...(difficultyFilter !== 'all' && { difficulty: difficultyFilter }),
        ...(search && { search })
      });
      const data = await api.get(`/admin/assessments?${params}`);
      setAssessments(data.assessments);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async (id: number) => {
    try {
      const [assData, analyticsData] = await Promise.all([
        api.get(`/admin/assessments/${id}`),
        api.get(`/admin/assessments/${id}/analytics`)
      ]);
      
      // Ensure questions is parsed
      if (typeof assData.questions === 'string') {
        try { assData.questions = JSON.parse(assData.questions); } catch(e) { assData.questions = []; }
      }
      setSelectedAssessment(assData);
      setAnalytics(analyticsData);
      setCurrentView('details');
    } catch (e) {
      console.error("Failed to load details");
    }
  };

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    await api.put(`/admin/assessments/${id}`, { status: newStatus });
    fetchAssessments();
  };

  const deleteAssessment = async (id: number) => {
    if (!window.confirm('Delete this assessment? All user attempts will be lost.')) return;
    await api.delete(`/admin/assessments/${id}`);
    if (currentView !== 'list') setCurrentView('list');
    else fetchAssessments();
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} assessments? All user attempts will be lost.`)) return;
    try {
      await api.post('/admin/assessments/bulk-delete', { ids: selectedIds });
      setSelectedIds([]);
      fetchAssessments();
    } catch (e) {
      console.error(e);
    }
  };

  const duplicateAssessment = async (id: number) => {
    await api.post(`/admin/assessments/${id}/duplicate`, {});
    fetchAssessments();
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

  const DifficultyBadge = ({ level }: { level: string }) => {
    const colors: Record<string, string> = {
      Easy: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400',
      Medium: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400',
      Hard: 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${colors[level] || 'text-slate-600 bg-slate-100'}`}>
        {level}
      </span>
    );
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="max-w-7xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Assessments & Question Banks</h1>
          <div className="flex space-x-3">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 size={16} className="mr-2" /> Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button variant="outline"><Upload size={16} className="mr-2" /> Import CSV</Button>
            <Button onClick={() => { setSelectedAssessment(null); setCurrentView('edit_assessment'); }} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" /> Create Assessment
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <Input 
                placeholder="Search assessments..." 
                className="pl-10" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchAssessments()}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Difficulty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
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
                          const newIds = assessments.map(a => a.id).filter(id => !selectedIds.includes(id));
                          setSelectedIds([...selectedIds, ...newIds]);
                        } else {
                          const pageIds = assessments.map(a => a.id);
                          setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
                        }
                      }}
                      checked={assessments.length > 0 && assessments.every(a => selectedIds.includes(a.id))}
                    />
                  </th>
                  <th className="p-4 font-medium">Assessment</th>
                  <th className="p-4 font-medium">Category & Level</th>
                  <th className="p-4 font-medium">Questions</th>
                  <th className="p-4 font-medium">Avg Score</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                ) : assessments.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-500">No assessments found.</td></tr>
                ) : assessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300"
                        checked={selectedIds.includes(assessment.id)}
                        onChange={(e) => setSelectedIds(e.target.checked ? [...selectedIds, assessment.id] : selectedIds.filter(id => id !== assessment.id))}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${assessment.color} text-white`}>
                          {assessment.badge || '📝'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{assessment.title}</p>
                          <p className="text-xs text-slate-500">{assessment.duration} mins</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-xs text-slate-600 dark:text-slate-300">{assessment.category}</span>
                        <DifficultyBadge level={assessment.difficulty} />
                      </div>
                    </td>
                    <td className="p-4 text-xs">
                       <span title="Total Questions"><HelpCircle size={14} className="inline mr-1 text-blue-500" />
                       {Array.isArray(assessment.questions) ? assessment.questions.length : (typeof assessment.questions === 'string' ? JSON.parse(assessment.questions || '[]').length : 0)}
                       </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-medium text-slate-900 dark:text-white">{assessment.avgScore}%</span>
                        <span className="text-slate-500">{assessment.attempts} attempts</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={assessment.status || 'draft'} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => fetchDetails(assessment.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" title="View Analytics"><BarChart2 size={18} /></button>
                        <button onClick={() => { 
                           setSelectedAssessment(assessment); 
                           // Safe parse questions if it's string
                           if (typeof assessment.questions === 'string') {
                              try { assessment.questions = JSON.parse(assessment.questions); } catch(e) {}
                           }
                           setCurrentView('questions'); 
                        }} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded" title="Manage Questions"><Layers size={18} /></button>
                        <button onClick={() => duplicateAssessment(assessment.id)} className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded" title="Duplicate"><Copy size={18} /></button>
                        <button onClick={() => toggleStatus(assessment.id, assessment.status)} className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded" title="Toggle Publish"><Eye size={18} /></button>
                        <button onClick={() => deleteAssessment(assessment.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded" title="Delete"><Trash2 size={18} /></button>
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

  // ANALYTICS & DETAILS VIEW
  if (currentView === 'details' && selectedAssessment && analytics) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex-1">{selectedAssessment.title}</h1>
          <StatusBadge status={selectedAssessment.status} />
          <Button variant="outline" onClick={() => setCurrentView('questions')}><Layers size={16} className="mr-2" /> Questions Bank</Button>
          <Button variant="outline" onClick={() => setCurrentView('edit_assessment')}><Edit size={16} className="mr-2" /> Edit Info</Button>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Total Attempts</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{analytics.totalAttempts}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Pass Rate</h3>
            <p className="text-3xl font-bold text-emerald-600">{analytics.passRate}%</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Average Score</h3>
            <p className="text-3xl font-bold text-blue-600">{analytics.averageScore}%</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Avg Time Taken</h3>
            <p className="text-3xl font-bold text-amber-500">{analytics.avgTimeTaken}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Most Missed Question (Weakness Analysis)</h3>
          <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-lg">
             <div className="flex gap-2 items-start">
               <HelpCircle size={20} className="text-rose-500 flex-shrink-0 mt-0.5" />
               <div>
                  <p className="font-medium text-rose-900 dark:text-rose-300">{analytics.mostMissedQuestion}</p>
                  <p className="text-sm text-rose-700 dark:text-rose-400 mt-2">Only 24% of candidates answered this question correctly. Consider reviewing the material related to this topic or adjusting the difficulty.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // QUESTIONS MANAGEMENT VIEW
  if (currentView === 'questions' && selectedAssessment) {
    const questions = Array.isArray(selectedAssessment.questions) ? selectedAssessment.questions : [];
    
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex-1">{selectedAssessment.title} - Question Bank</h1>
          <Button className="bg-blue-600 hover:bg-blue-700"><Plus size={16} className="mr-2" /> Add Question</Button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
            <span className="font-medium text-slate-700 dark:text-slate-300">Total Questions: {questions.length}</span>
            <span className="text-sm text-slate-500">Drag to reorder questions. Changes auto-save.</span>
          </div>
          
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {questions.map((q: any, i: number) => (
              <div key={q.id || i} className="p-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/20 group">
                <button className="text-slate-400 cursor-grab active:cursor-grabbing hover:text-slate-600 mt-1">
                  <GripVertical size={20} />
                </button>
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-slate-900 dark:text-white">{q.question}</h4>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"><Edit size={16}/></button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><Trash2 size={16}/></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {q.options && q.options.map((opt: string, optIdx: number) => (
                      <div key={optIdx} className={`text-sm p-2 rounded border ${q.correct === optIdx ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'}`}>
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        {q.correct === optIdx && <CheckCircle size={14} className="inline ml-2 text-green-600 dark:text-green-400" />}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <div className="mt-3 text-xs bg-blue-50 text-blue-800 border border-blue-100 p-3 rounded-lg dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // CREATE / EDIT ASSESSMENT INFO (Basic)
  if (currentView === 'edit_assessment') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
         <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Assessment Info</h1>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 mb-8">Edit the assessment configuration below. To manage the specific questions, use the "Question Bank" button from the main list.</p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div><label className="text-sm font-medium">Title</label><Input value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="mt-1" /></div>
            <div><label className="text-sm font-medium">Category</label><Input value={formState.category} onChange={e => setFormState({...formState, category: e.target.value})} className="mt-1" /></div>
            <div>
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={formState.difficulty} onValueChange={v => setFormState({...formState, difficulty: v})}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label className="text-sm font-medium">Duration (minutes)</label><Input type="number" value={formState.duration} onChange={e => setFormState({...formState, duration: parseInt(e.target.value)})} className="mt-1" /></div>
            <div><label className="text-sm font-medium">Passing Score (%)</label><Input type="number" value={formState.passingScore} onChange={e => setFormState({...formState, passingScore: parseInt(e.target.value)})} className="mt-1" /></div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={formState.status} onValueChange={v => setFormState({...formState, status: v})}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 pt-6">
            <Button variant="outline" onClick={() => setCurrentView('list')} disabled={loading}>Cancel</Button>
            <Button onClick={handleSaveAssessment} disabled={loading}>
              {loading && <Loader2 size={16} className="animate-spin mr-2" />}
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
