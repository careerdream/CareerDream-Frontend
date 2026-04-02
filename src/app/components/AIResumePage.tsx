import { useState, useCallback } from 'react';
import { Link } from 'react-router';
import { Upload, Brain, Zap, Target, AlertCircle, CheckCircle, ChevronRight, FileText, Loader2, Star, TrendingUp } from 'lucide-react';
import { jobs } from '../data/jobs';
import { courses } from '../data/courses';
import { extractSkillsFromText, simulateResumeParse, matchJobsToResume, getCareerInsights } from '../utils/resumeUtils';
import { useApp } from '../context/AppContext';

const DEMO_RESUME_TEXT = `
John Doe - Senior Software Engineer
Skills: Python, Machine Learning, TensorFlow, PyTorch, AWS, Docker, Kubernetes, SQL, PostgreSQL, Git, CI/CD
Experience: 5 years in software development, 3 years ML engineering at TechCorp
Education: B.Tech Computer Science, IIT Delhi
Projects: Built real-time recommendation engine serving 10M users using collaborative filtering
Certifications: AWS Certified Solutions Architect, Google Cloud Professional Data Engineer
`;

export function AIResumePage() {
  const { setResumeSkills, resumeSkills } = useApp();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<string[]>(resumeSkills);
  const [matchResults, setMatchResults] = useState<ReturnType<typeof matchJobsToResume>>([]);
  const [careerInsights, setCareerInsights] = useState<ReturnType<typeof getCareerInsights>>([]);

  const processResume = async (text: string) => {
    const skills = extractSkillsFromText(text);
    const matches = matchJobsToResume(skills, jobs.map(j => ({ id: j.id, title: j.title, company: j.company, skills: j.skills })));
    const insights = getCareerInsights(skills);
    setExtractedSkills(skills);
    setMatchResults(matches);
    setCareerInsights(insights);
    setResumeSkills(skills);
    setParsed(true);
  };

  const handleFile = async (f: File) => {
    setFile(f);
    setParsing(true);
    const text = await simulateResumeParse(f);
    await processResume(text);
    setParsing(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleDemo = async () => {
    setParsing(true);
    await new Promise(r => setTimeout(r, 1500));
    await processResume(DEMO_RESUME_TEXT);
    setParsing(false);
  };

  const topMatches = matchResults.slice(0, 5);
  const recommendedCourses = courses.filter(c =>
    extractedSkills.length === 0 || c.skills.some(s => extractedSkills.some(es => es.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(es.toLowerCase())))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-transparent border-b border-border py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm mb-4">
            <Brain className="w-4 h-4" />
            Powered by AI Matching Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Resume{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Match</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and let our AI instantly analyze your skills, match you to the best jobs, and identify learning gaps.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {!parsed ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Upload Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                dragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary hover:bg-primary/5'
              }`}
            >
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />

              {parsing ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Analyzing your resume...</p>
                    <p className="text-muted-foreground text-sm">Extracting skills, experience, and matching to jobs</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 max-w-xs mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-xl">
                    <Upload className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-xl mb-2">Drop your resume here</p>
                    <p className="text-muted-foreground">PDF, DOCX, or TXT • Up to 5MB</p>
                  </div>
                  {file && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                      <FileText className="w-4 h-4" />
                      {file.name}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Demo button */}
            {!parsing && (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-muted-foreground text-sm">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <button
                  onClick={handleDemo}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 transition-all font-semibold text-primary flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Try with a Demo Resume (Instant)
                </button>
              </>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: '🔍', title: 'Skill Extraction', desc: 'Auto-detect 100+ skills' },
                { icon: '🎯', title: 'Job Matching', desc: 'AI-powered match scores' },
                { icon: '📈', title: 'Gap Analysis', desc: 'Know what to learn next' },
              ].map(f => (
                <div key={f.title} className="p-4 rounded-xl border border-border bg-card text-center">
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <p className="font-semibold text-sm mb-1">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Results
          <div className="space-y-8">
            {/* Success Banner */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-10 h-10 text-green-500 shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-lg">Resume Analyzed Successfully!</p>
                <p className="text-muted-foreground text-sm">Found <strong>{extractedSkills.length}</strong> skills • Matched against <strong>{jobs.length}</strong> jobs</p>
              </div>
              <button
                onClick={() => { setParsed(false); setFile(null); setExtractedSkills([]); }}
                className="px-4 py-2 rounded-xl border border-border hover:border-primary text-sm transition-colors"
              >
                Upload New
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Skills + Insights */}
              <div className="lg:col-span-1 space-y-6">
                {/* Extracted Skills */}
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Detected Skills ({extractedSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 text-xs rounded-xl bg-primary/10 text-primary border border-primary/20 font-medium">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Insights */}
                {careerInsights.length > 0 && (
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      Career Profile
                    </h3>
                    <div className="space-y-3">
                      {careerInsights.map(({ category, level, icon }) => (
                        <div key={category} className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
                            {icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{category}</p>
                            <p className="text-xs text-muted-foreground">{level}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            level === 'Expert' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                            level === 'Intermediate' ? 'bg-blue-500/20 text-blue-500' :
                            'bg-muted text-muted-foreground'
                          }`}>{level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended courses */}
                {recommendedCourses.length > 0 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Recommended Courses
                    </h3>
                    <div className="space-y-3">
                      {recommendedCourses.map(c => (
                        <Link key={c.id} to={`/learn/${c.id}`} className="block p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                          <p className="font-medium text-sm">{c.title}</p>
                          <p className="text-xs opacity-80">{c.instructor}</p>
                        </Link>
                      ))}
                    </div>
                    <Link to="/learn" className="block mt-3 text-center text-sm opacity-90 hover:opacity-100">
                      Browse All Courses →
                    </Link>
                  </div>
                )}
              </div>

              {/* Right: Job Matches */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-5">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-xl">Top Job Matches</h3>
                </div>
                <div className="space-y-4">
                  {topMatches.map((match, i) => {
                    const job = jobs.find(j => j.id === match.jobId)!;
                    return (
                      <div key={match.jobId} className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl flex-shrink-0">
                            {job.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <p className="font-bold truncate">{match.title}</p>
                                <p className="text-sm text-muted-foreground">{match.company} • {job.location}</p>
                              </div>
                              {/* Match Score Ring */}
                              <div className={`shrink-0 w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-sm ${
                                match.matchScore >= 70 ? 'border-green-500 text-green-600 dark:text-green-400' :
                                match.matchScore >= 40 ? 'border-yellow-500 text-yellow-600' :
                                'border-muted-foreground text-muted-foreground'
                              }`}>
                                {match.matchScore}%
                              </div>
                            </div>

                            {/* Matched Skills */}
                            {match.matchedSkills.length > 0 && (
                              <div className="mb-2">
                                <p className="text-xs text-muted-foreground mb-1">Matching skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {match.matchedSkills.slice(0, 4).map(s => (
                                    <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">✓ {s}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Missing Skills */}
                            {match.missingSkills.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3 text-orange-500" /> Missing skills:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {match.missingSkills.slice(0, 3).map(s => (
                                    <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">✗ {s}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-3">
                              <Link to={`/jobs/${match.jobId}`} className="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                                View Job <ChevronRight className="w-4 h-4" />
                              </Link>
                              <span className="text-xs text-muted-foreground">{job.salary}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  <Link to="/jobs" className="text-sm text-primary hover:underline">View all {jobs.length} jobs →</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
