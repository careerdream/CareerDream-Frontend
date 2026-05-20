import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertTriangle, FileJson, RefreshCw } from 'lucide-react';
import { api } from '../utils/api';
import { toast } from 'sonner';

export function AdminPlaygroundManagement() {
  const [jsonText, setJsonText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      toast.success('JSON formatted successfully');
    } catch (err) {
      toast.error('Invalid JSON. Cannot format.');
    }
  };

  const handleSubmit = async () => {
    if (!jsonText.trim()) return;
    
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      toast.error('Invalid JSON syntax');
      return;
    }

    if (!Array.isArray(parsed)) {
      toast.error('JSON root must be an array of problems');
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const res = await api.post('/admin/playground/bulk', { problems: parsed });
      setResult({ status: 'success', message: res.message, added: res.added });
      toast.success(`Successfully uploaded ${res.added} problems`);
      setJsonText('');
    } catch (err: any) {
      setResult({ status: 'error', message: err.response?.data?.message || err.message || 'Upload failed' });
      toast.error('Bulk upload failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Playground Management</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Bulk upload coding problems using JSON.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Editor Side */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FileJson className="w-5 h-5 text-blue-500" /> JSON Payload
            </h3>
            <button 
              onClick={handleFormat}
              className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors font-medium text-slate-700 dark:text-slate-300"
            >
              Format JSON
            </button>
          </div>
          
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder="[
  {
    &#34;title&#34;: &#34;Two Sum&#34;,
    &#34;slug&#34;: &#34;two-sum&#34;,
    &#34;category&#34;: &#34;Algorithms&#34;,
    &#34;difficulty&#34;: &#34;Easy&#34;,
    &#34;tags&#34;: [&#34;Array&#34;, &#34;Hash Table&#34;],
    &#34;description&#34;: &#34;...&#34;,
    ...
  }
]"
            className="flex-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-800 dark:text-slate-200"
          />
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !jsonText.trim()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all"
            >
              {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
              {isSubmitting ? 'Uploading...' : 'Bulk Upload'}
            </button>
          </div>
        </div>

        {/* Documentation / Status Side */}
        <div className="space-y-6">
          
          {result && (
            <div className={`p-4 rounded-xl border ${
              result.status === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' 
                : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20'
            }`}>
              <div className="flex items-start gap-3">
                {result.status === 'success' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
                )}
                <div>
                  <h4 className={`font-semibold ${result.status === 'success' ? 'text-emerald-800 dark:text-emerald-400' : 'text-rose-800 dark:text-rose-400'}`}>
                    {result.status === 'success' ? 'Upload Successful' : 'Upload Failed'}
                  </h4>
                  <p className={`text-sm mt-1 ${result.status === 'success' ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-600 dark:text-rose-500'}`}>
                    {result.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">JSON Schema Reference</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>Each object in the array must follow this schema:</p>
              <pre className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-lg text-xs overflow-x-auto">
{`{
  "title": "String (Required)",
  "slug": "String (Required, Unique)",
  "category": "String (e.g., 'Algorithms')",
  "difficulty": "Easy | Medium | Hard",
  "points": Number (default 10),
  "tags": ["Array", "String", ...],
  "description": "Markdown String",
  "constraints": "String",
  "inputFormat": "String",
  "outputFormat": "String",
  "editorial": "String",
  "stubs": {
    "python": "def solve()...",
    "javascript": "function solve()..."
  },
  "testCases": [
    {
      "input": "String",
      "expected": "String",
      "isSample": Boolean
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
