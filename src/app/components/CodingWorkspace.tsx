import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Editor } from '@monaco-editor/react';
import { 
  Play, Send, ChevronLeft, CheckCircle2, XCircle, Clock, Cpu, 
  FileText, Lightbulb, BookOpen, History, Copy, Check, 
  ThumbsUp, MessageSquare, ArrowLeft, Eye, Sparkles
} from 'lucide-react';
import { api } from '../utils/api';
import { toast } from 'sonner';
import { getEditorialForProblem } from '../data/editorialLibrary';

// ── Lightweight inline markdown renderer ─────────────────────
// Converts **bold**, `code`, and \n line breaks to JSX elements
function renderMarkdown(text: string) {
  if (!text) return null;
  return text.split('\n').map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    // Split on **bold** and `code` patterns
    const regex = /\*\*(.+?)\*\*|`([^`]+)`/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      if (match[1] !== undefined) {
        parts.push(<strong key={`b-${lineIdx}-${match.index}`} className="font-bold text-foreground">{match[1]}</strong>);
      } else if (match[2] !== undefined) {
        parts.push(<code key={`c-${lineIdx}-${match.index}`} className="bg-muted/60 text-primary font-mono px-1 py-0.5 rounded text-[11px] border border-border/40">{match[2]}</code>);
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex));
    return (
      <React.Fragment key={lineIdx}>
        {parts.length > 0 ? parts : line}
        {lineIdx < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export function CodingWorkspace() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  // Custom Editorial UI State
  const [copiedApproach1, setCopiedApproach1] = useState(false);
  const [copiedApproach2, setCopiedApproach2] = useState(false);
  const [approach1Lang, setApproach1Lang] = useState('javascript');
  const [approach2Lang, setApproach2Lang] = useState('javascript');

  // Submissions UI State
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Solutions UI State
  const [selectedSolution, setSelectedSolution] = useState(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
    { id: 'sql', name: 'SQL' },
    { id: 'bash', name: 'Bash' }
  ];

  useEffect(() => {
    fetchProblem();
  }, [slug]);

  const fetchProblem = async () => {
    try {
      const res = await api.get(`/playground/problems/${slug}`);
      setProblem(res);
      
      let initialLang = 'javascript';
      if (res.stubs) {
        const availableLangs = Object.keys(res.stubs);
        if (availableLangs.length > 0) {
          if (availableLangs.includes(language)) {
            initialLang = language;
          } else {
            if (res.category === 'Database' && availableLangs.includes('sql')) {
              initialLang = 'sql';
            } else if (res.category === 'Shell' && availableLangs.includes('bash')) {
              initialLang = 'bash';
            } else if (res.category === 'Pandas' && availableLangs.includes('python')) {
              initialLang = 'python';
            } else {
              initialLang = availableLangs[0];
            }
          }
        }
      }
      
      setLanguage(initialLang);
      if (res.stubs && res.stubs[initialLang]) {
        setCode(res.stubs[initialLang]);
      }
    } catch (error) {
      console.error('Error fetching problem:', error);
      toast.error('Failed to load problem');
      navigate('/playground');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user submissions from backend API
  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await api.get(`/playground/submissions?slug=${slug}`);
      setSubmissions(res);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'submissions') {
      fetchSubmissions();
      setSelectedSubmission(null);
    }
  }, [activeTab, slug]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (problem?.stubs && problem.stubs[newLang]) {
      setCode(problem.stubs[newLang]);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setSubmitting(true);
    setResults(null);
    setActiveTab('results');
    
    try {
      const res = await api.post(`/playground/submit/${slug}`, { language, sourceCode: code });
      setResults(res);
      if (res.status === 'ACCEPTED') {
        toast.success(`Success! +${res.pointsAwarded || 0} points`);
      } else {
        toast.error('Some test cases failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Code submission failed');
      setResults({ status: 'Error', message: error.response?.data?.message || 'An error occurred during execution' });
    } finally {
      setSubmitting(false);
    }
  };

  const getSolutionsList = () => {
    return [
      {
        id: 1,
        title: `🔥 [Optimal] JavaScript/TypeScript clean Map solution with O(N) time and O(N) space`,
        author: 'algoguru',
        avatar: 'A',
        upvotes: 1240,
        comments: 84,
        date: '3 days ago',
        category: 'JavaScript',
        content: `### Intuition
By using a hash table, we can optimize the lookup time from O(N) to O(1) by trading space for time.

### Complexity
- **Time Complexity**: O(N) - We traverse the list containing N elements only once.
- **Space Complexity**: O(N) - The extra space required depends on the number of items stored in the hash table.

### Code
\`\`\`javascript
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
\`\`\``
      },
      {
        id: 2,
        title: `🐍 Python 3 simple dictionary solution (linear scan with comments)`,
        author: 'py_master',
        avatar: 'P',
        upvotes: 890,
        comments: 42,
        date: '5 days ago',
        category: 'Python 3',
        content: `### Intuition
Maintain a dictionary mapping each visited number to its index. Check complement (target - num) on the fly.

### Complexity
- **Time Complexity**: O(N) - One single iteration.
- **Space Complexity**: O(N) - Dictionary elements.

### Code
\`\`\`python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
\`\`\``
      },
      {
        id: 3,
        title: `🚀 C++ Optimal Hash Map / Two Pointers approach`,
        author: 'cpp_wizard',
        avatar: 'C',
        upvotes: 520,
        comments: 19,
        date: '1 week ago',
        category: 'C++',
        content: `### Intuition
Use std::unordered_map in C++ for amortized O(1) lookup time per element.

### Complexity
- **Time Complexity**: O(N) - Single scan.
- **Space Complexity**: O(N) - Extra map overhead.

### Code
\`\`\`cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hash;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};
\`\`\``
      }
    ];
  };

  const renderApproachCard = (approach, copied, setCopied, selectedLang, setSelectedLang) => {
    const codeText = approach.implementations[selectedLang] || approach.implementations['javascript'] || '';
    const langs = Object.keys(approach.implementations);
    
    return (
      <div className="p-5 bg-card/40 border border-border rounded-xl space-y-4">
        <h4 className="text-sm font-extrabold text-foreground">{approach.title}</h4>
        
        <div className="space-y-1.5">
          <h5 className="text-[10px] font-black uppercase text-muted-foreground">Algorithm</h5>
          <p className="text-xs text-foreground/80 leading-relaxed">{approach.algorithm}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 p-3 bg-muted/20 border border-border/40 rounded-lg text-[11px]">
          <div>
            <span className="font-bold text-muted-foreground block text-[9px] uppercase">Time Complexity</span>
            <span className="text-foreground/95 font-bold">{approach.complexity.time}</span>
          </div>
          <div>
            <span className="font-bold text-muted-foreground block text-[9px] uppercase">Space Complexity</span>
            <span className="text-foreground/95 font-bold">{approach.complexity.space}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[10px] font-black uppercase text-muted-foreground">Implementation</h5>
          
          <div className="flex flex-wrap gap-1 border-b border-border/40 pb-1.5 overflow-x-auto">
            {langs.map(l => (
              <button
                key={l}
                onClick={() => setSelectedLang(l)}
                className={`px-2 py-0.5 text-[10px] rounded transition-all font-semibold ${
                  selectedLang === l 
                    ? 'bg-primary text-white font-bold' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {l === 'cpp' ? 'C++' : l === 'python' ? 'Python 3' : l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative rounded-lg overflow-hidden border border-border bg-[#050414] font-mono text-[11px] text-foreground/90 shadow-inner">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50 bg-card/60">
              <span className="text-[9px] uppercase font-bold text-muted-foreground">{selectedLang}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                  setCopied(true);
                  toast.success('Code copied to clipboard!');
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors px-2 py-0.5 rounded border border-border/40 hover:bg-muted bg-card/80 font-bold"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 overflow-x-auto max-h-[250px] leading-relaxed scrollbar-thin scrollbar-thumb-border/45">
              <code>{codeText}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  };

  const renderSolutionApproaches = (problem) => {
    const data = getEditorialForProblem({ slug: problem.slug, title: problem.title, category: problem.category, tags: problem.tags || [] });
    
    return (
      <div className="space-y-5">
        {data.approaches.map((approach, idx) => {
          const isApp1 = idx === 0;
          return (
            <div key={idx}>
              {isApp1 ? (
                renderApproachCard(
                  approach, 
                  copiedApproach1, 
                  setCopiedApproach1, 
                  approach1Lang, 
                  setApproach1Lang
                )
              ) : (
                renderApproachCard(
                  approach, 
                  copiedApproach2, 
                  setCopiedApproach2, 
                  approach2Lang, 
                  setApproach2Lang
                )
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return <div className="min-h-screen bg-[#030213] flex items-center justify-center text-primary font-bold animate-pulse">Loading Workspace...</div>;
  }

  if (!problem) return null;

  return (
    <div className="flex flex-col h-screen bg-[#030213] text-foreground font-sans overflow-hidden">
      
      {/* Header */}
      <header className="h-14 border-b border-border bg-card/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/playground')} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm truncate max-w-[200px] md:max-w-md">{problem.title}</h1>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase ${
              problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-red-500/20 text-red-500'
            }`}>{problem.difficulty}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={language}
            onChange={handleLanguageChange}
            className="bg-muted border border-border rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-primary"
          >
            {languages.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          
          <button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            {submitting ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit
          </button>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel - Description/Results */}
        <div className="w-full md:w-[45%] flex flex-col border-r border-border bg-card/30 h-full overflow-hidden">
          
          {/* Tabs */}
          <div className="flex items-center border-b border-border bg-card shrink-0 px-2 pt-2 gap-1 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-colors ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50 rounded-t-lg'}`}
            >
              <FileText className="w-3.5 h-3.5" /> Description
            </button>
            <button 
              onClick={() => setActiveTab('editorial')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-colors ${activeTab === 'editorial' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50 rounded-t-lg'}`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Editorial
            </button>
            <button 
              onClick={() => setActiveTab('solutions')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-colors ${activeTab === 'solutions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50 rounded-t-lg'}`}
            >
              <Lightbulb className="w-3.5 h-3.5" /> Solutions
            </button>
            <button 
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-colors ${activeTab === 'submissions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50 rounded-t-lg'}`}
            >
              <History className="w-3.5 h-3.5" /> Submissions
            </button>
            {results && (
              <button 
                onClick={() => setActiveTab('results')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-colors ${activeTab === 'results' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50 rounded-t-lg'}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Results
              </button>
            )}
          </div>
          
          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-border">
            
            {activeTab === 'description' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-foreground/85">
                  {renderMarkdown(problem.description)}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase text-muted-foreground">Input Format</h3>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border font-mono text-xs text-foreground/80">
                    {problem.inputFormat}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase text-muted-foreground">Output Format</h3>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border font-mono text-xs text-foreground/80">
                    {problem.outputFormat}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase text-muted-foreground">Constraints</h3>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border font-mono text-xs text-foreground/80 leading-relaxed">
                    {renderMarkdown(problem.constraints)}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-5 animate-in fade-in">
                {/* Header Metadata */}
                <div className="border-b border-border pb-3">
                  <h2 className="text-lg font-bold mb-1.5">{problem.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[9px] text-primary font-bold border border-primary/30">CD</div>
                      <span className="font-bold text-foreground">CareerDream</span>
                      <span className="bg-blue-500/20 text-blue-400 p-0.5 rounded-full"><Check className="w-2.5 h-2.5" /></span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Eye className="w-3.5 h-3.5" /> 15,129,102</span>
                    <span>•</span>
                    <span>Jun 25, 2021</span>
                    <span className="bg-primary/10 text-primary font-black px-1.5 py-0.5 rounded text-[9px] uppercase ml-auto">Editorial</span>
                  </div>
                </div>



                {/* Solution Article Section */}
                <div className="space-y-3 pt-1">
                  <div className="border-b border-border pb-1">
                    <h3 className="text-sm font-bold flex items-center gap-1.5 text-foreground uppercase tracking-wider text-muted-foreground">
                      Solution Article
                    </h3>
                  </div>
                  {renderSolutionApproaches(problem)}
                </div>
              </div>
            )}

            {activeTab === 'solutions' && (
              <div className="space-y-5 animate-in fade-in">
                {selectedSolution ? (
                  <div className="space-y-4">
                    <button 
                      onClick={() => setSelectedSolution(null)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-bold transition-colors pb-2 border-b border-border/30 w-full"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Solutions List
                    </button>
                    
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-bold text-foreground leading-snug">{selectedSolution.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-[9px]">{selectedSolution.avatar}</div>
                        <span className="font-semibold text-foreground/80">{selectedSolution.author}</span>
                        <span>•</span>
                        <span>{selectedSolution.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><ThumbsUp className="w-3 h-3 text-primary/80" /> {selectedSolution.upvotes}</span>
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none text-xs leading-relaxed border-t border-border/40 pt-3 space-y-3 text-foreground/90">
                      {selectedSolution.content.split('\n\n').map((paragraph, pIdx) => {
                        if (paragraph.startsWith('### ')) {
                          return <h4 key={pIdx} className="text-xs font-bold text-foreground mt-3 mb-1 uppercase tracking-wide text-muted-foreground">{paragraph.replace('### ', '')}</h4>;
                        }
                        if (paragraph.startsWith('```')) {
                          const lines = paragraph.split('\n');
                          const codeLines = lines.slice(1, lines.length - 1).join('\n');
                          return (
                            <div key={pIdx} className="relative rounded-lg overflow-hidden border border-border bg-[#050414] font-mono text-[11px] text-foreground/90 my-2 shadow-inner">
                              <pre className="p-3 overflow-x-auto max-h-[300px]">
                                <code>{codeLines}</code>
                              </pre>
                            </div>
                          );
                        }
                        return <p key={pIdx}>{paragraph}</p>;
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Community Solutions</h3>
                      <span className="text-[9px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-semibold">Sorted by upvotes</span>
                    </div>

                    <div className="space-y-2.5">
                      {getSolutionsList().map(sol => (
                        <div 
                          key={sol.id}
                          onClick={() => setSelectedSolution(sol)}
                          className="p-3.5 bg-card/40 border border-border/80 hover:border-primary/50 hover:bg-card/75 rounded-xl cursor-pointer transition-all duration-300 group space-y-2.5"
                        >
                          <h4 className="text-xs font-bold group-hover:text-primary transition-colors leading-snug">{sol.title}</h4>
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4.5 h-4.5 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-[9px]">{sol.avatar}</div>
                              <span className="font-semibold text-foreground/70">{sol.author}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-0.5"><ThumbsUp className="w-3 h-3 text-primary/70" /> {sol.upvotes}</span>
                              <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" /> {sol.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-5 animate-in fade-in">
                {selectedSubmission ? (
                  <div className="space-y-4">
                    <button 
                      onClick={() => setSelectedSubmission(null)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-bold transition-colors pb-2 border-b border-border/30 w-full"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Submissions List
                    </button>

                    <div className="p-4 rounded-xl border flex flex-col gap-2.5 bg-muted/20 border-border/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-muted-foreground">Status</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          selectedSubmission.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {selectedSubmission.status === 'ACCEPTED' ? 'Accepted' : selectedSubmission.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedSubmission.runtime || 0} ms</span>
                        <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> {selectedSubmission.memory || 0} KB</span>
                        <span className="font-semibold text-foreground/75 uppercase">{selectedSubmission.language}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Submitted: {new Date(selectedSubmission.submittedAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-black uppercase text-muted-foreground">Submitted Code</h4>
                        <button 
                          onClick={() => {
                            setCode(selectedSubmission.code);
                            toast.success('Restored code to workspace editor!');
                          }}
                          className="flex items-center gap-1 text-[9px] text-primary hover:text-primary-focus transition-colors px-2 py-0.5 rounded border border-primary/20 hover:bg-primary/5 bg-black/20 font-bold"
                        >
                          <Sparkles className="w-3 h-3" /> Load in Editor
                        </button>
                      </div>

                      <div className="relative rounded-lg overflow-hidden border border-border bg-[#050414] font-mono text-[11px] text-foreground/90 shadow-inner">
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50 bg-card/60">
                          <span className="text-[9px] uppercase font-bold text-muted-foreground">{selectedSubmission.language}</span>
                        </div>
                        <pre className="p-3 overflow-x-auto max-h-[300px] leading-relaxed scrollbar-thin">
                          <code>{selectedSubmission.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-black">My Submissions</h3>
                    
                    {loadingSubmissions ? (
                      <div className="text-center py-8 text-xs text-muted-foreground animate-pulse">Loading submissions...</div>
                    ) : submissions.length === 0 ? (
                      <div className="text-center py-12 text-xs text-muted-foreground border border-dashed border-border rounded-xl bg-muted/10">
                        No submissions yet. Write some code and submit it to see your history!
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {submissions.map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => setSelectedSubmission(sub)}
                            className="p-3.5 bg-card/40 border border-border/80 hover:border-primary/50 hover:bg-card/75 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between"
                          >
                            <div className="space-y-1">
                              <span className={`text-xs font-bold ${
                                sub.status === 'ACCEPTED' ? 'text-green-500' : 'text-red-500'
                              }`}>
                                {sub.status === 'ACCEPTED' ? 'Accepted' : sub.status.replace(/_/g, ' ')}
                              </span>
                              <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-semibold">
                                <span className="uppercase text-foreground/60">{sub.language}</span>
                                <span>•</span>
                                <span>{sub.runtime || 0} ms</span>
                              </div>
                            </div>
                            <div className="text-[10px] text-muted-foreground text-right space-y-0.5">
                              <div>{new Date(sub.submittedAt).toLocaleDateString()}</div>
                              <div className="text-[9px] opacity-70">{new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'results' && results && (
              <div className="space-y-6 animate-in fade-in">
                
                <div className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center ${
                  results.status === 'Accepted' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' :
                  results.status === 'Error' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                  'bg-amber-500/10 border-amber-500/30 text-amber-500'
                }`}>
                  {results.status === 'Accepted' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                  <h2 className="text-xl font-bold">{results.status}</h2>
                  
                  {results.correctness !== undefined && (
                    <div className="flex gap-4 mt-2 px-4 py-2 bg-black/20 rounded-lg">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold opacity-70">Correctness</span>
                        <span className="text-sm font-bold">{Math.round(results.correctness)}%</span>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold opacity-70">Test Cases</span>
                        <span className="text-sm font-bold">{results.passedCount}/{results.totalCount}</span>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold opacity-70">Runtime</span>
                        <span className="text-sm font-bold">{results.runtime || 0} ms</span>
                      </div>
                    </div>
                  )}

                  {results.message && <p className="text-sm opacity-80 mt-1">{results.message}</p>}
                </div>

                {results.testCases && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase text-muted-foreground">Test Cases</h3>
                    {results.testCases.map((tc, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">Test Case {idx + 1}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            tc.passed ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {tc.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        {tc.error ? (
                          <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-mono whitespace-pre-wrap">
                            {tc.error}
                          </div>
                        ) : (
                          <div className="flex gap-4 text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> {tc.executionTime || 0}ms</span>
                            <span className="flex items-center gap-1 text-muted-foreground"><Cpu className="w-3 h-3" /> {tc.memoryUsed || 0}KB</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="w-full md:w-[55%] flex flex-col h-full bg-[#1e1e1e]">
          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language === 'c++' ? 'cpp' : language === 'bash' ? 'shell' : language}
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 1.5,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                formatOnPaste: true,
              }}
              loading={<div className="h-full flex items-center justify-center text-muted-foreground animate-pulse text-sm">Loading Editor...</div>}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
