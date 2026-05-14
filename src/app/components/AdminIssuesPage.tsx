import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { AlertCircle, Trash2, CheckCircle, Download, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Issue {
  id: number;
  name: string;
  email: string;
  issue_title: string;
  issue_description: string;
  screenshot_path: string | null;
  status: string;
  timestamp: string;
}

export function AdminIssuesPage() {
  const { isAdmin } = useApp();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      const data = await api.get('/issues');
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchIssues();
    }
  }, [isAdmin]);

  const handleResolve = async (id: number) => {
    try {
      await api.put(`/issues/${id}/resolve`, {});
      setIssues(issues.map(i => i.id === id ? { ...i, status: 'resolved' } : i));
    } catch (error) {
      console.error('Error resolving issue:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;
    try {
      await api.delete(`/issues/${id}`);
      setIssues(issues.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">Super Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Reported Issues Dashboard</h1>
            <p className="text-muted-foreground">Manage and resolve user-submitted technical issues.</p>
          </div>
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm">
            Total Issues: {issues.length}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-32 bg-card border border-border rounded-3xl">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">All clear!</h3>
            <p className="text-muted-foreground">There are no reported issues at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {issues.map((issue) => (
              <motion.div 
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-card border ${issue.status === 'resolved' ? 'border-green-500/30' : 'border-border'} rounded-2xl p-6 shadow-lg`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        issue.status === 'resolved' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        {issue.status}
                      </span>
                      <span className="text-xs text-muted-foreground font-bold">
                        {new Date(issue.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-1">{issue.issue_title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                        <span>Reported by: <span className="text-foreground">{issue.name}</span></span>
                        <span>•</span>
                        <a href={`mailto:${issue.email}`} className="text-primary hover:underline">{issue.email}</a>
                      </div>
                    </div>

                    <div className="p-4 bg-background rounded-xl border border-border">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{issue.issue_description}</p>
                    </div>

                    {issue.screenshot_path && (
                      <div className="flex items-center gap-4 pt-2">
                        <a 
                          href={`/api${issue.screenshot_path}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-sm font-bold hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> View Screenshot
                        </a>
                        <a 
                          href={`/api${issue.screenshot_path}`} 
                          download
                          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Download className="w-4 h-4" /> Download Attachment
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-3">
                    {issue.status !== 'resolved' && (
                      <button
                        onClick={() => handleResolve(issue.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Resolve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl font-bold transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
