import { useState, useCallback } from 'react';
import { Link } from 'react-router';
import { Upload, Brain, Zap, Target, AlertCircle, CheckCircle, ChevronRight, FileText, Loader2, Star, TrendingUp, Award, BookOpen, Briefcase } from 'lucide-react';
import { jobs } from '../data/jobs';
import { courses } from '../data/courses';
import { extractSkillsFromText, simulateResumeParse, matchJobsToResume, getCareerInsights, parseResumeDetails, ResumeDetails } from '../utils/resumeUtils';
import { useApp } from '../context/AppContext';


export function AIResumePage() {
  const { setResumeSkills, resumeSkills } = useApp();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<string[]>(resumeSkills);
  const [resumeDetails, setResumeDetails] = useState<ResumeDetails | null>(null);
  const [matchResults, setMatchResults] = useState<ReturnType<typeof matchJobsToResume>>([]);
  const [careerInsights, setCareerInsights] = useState<ReturnType<typeof getCareerInsights>>([]);

  const processResume = async (text: string) => {
    const details = parseResumeDetails(text);
    const matches = matchJobsToResume(details.skills, jobs.map(j => ({ id: j.id, title: j.title, company: j.company, skills: j.skills })));
    const insights = getCareerInsights(details.skills);
    
    setResumeDetails(details);
    setExtractedSkills(details.skills);
    setMatchResults(matches);
    setCareerInsights(insights);
    setResumeSkills(details.skills);
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


  const topMatches = matchResults.slice(0, 5);
  
  // Find courses that help bridge the gap for top matches
  const missingSkillsForTopMatches = Array.from(new Set(topMatches.flatMap(m => m.missingSkills)));
  const recommendedCourses = courses.filter(c =>
    c.skills.some(s => missingSkillsForTopMatches.some(ms => ms.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ms.toLowerCase()))) ||
    (extractedSkills.length === 0 && c.featured)
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
                onClick={() => { setParsed(false); setFile(null); setExtractedSkills([]); setResumeDetails(null); }}
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

                {/* Career Profile Details */}
                {resumeDetails && (
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      Career Profile
                    </h3>
                    <div className="space-y-4">
                      {resumeDetails.summary && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Professional Summary</p>
                          <p className="text-sm italic text-muted-foreground leading-relaxed">"{resumeDetails.summary}"</p>
                        </div>
                      )}
                      
                      {resumeDetails.education.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Education
                          </p>
                          <ul className="space-y-1">
                            {resumeDetails.education.map((edu, i) => (
                              <li key={i} className="text-sm font-medium">{edu}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {resumeDetails.experience.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> Experience
                          </p>
                          <ul className="space-y-1">
                            {resumeDetails.experience.map((exp, i) => (
                              <li key={i} className="text-sm font-medium">{exp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {resumeDetails.achievements.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                            <Award className="w-3 h-3" /> Achievements
                          </p>
                          <ul className="space-y-1">
                            {resumeDetails.achievements.map((ach, i) => (
                              <li key={i} className="text-sm font-medium">• {ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Role Recommendations (Insights) */}
                {careerInsights.length > 0 && (
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-bold mb-4 text-sm text-muted-foreground uppercase">Potential Career Paths</h3>
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
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended courses */}
                {recommendedCourses.length > 0 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Recommended Courses
                    </h3>
                    <p className="text-xs mb-4 opacity-90">To bridge your skills gap and boost your profile:</p>
                    <div className="space-y-3">
                      {recommendedCourses.map(c => (
                        <Link key={c.id} to={`/learn/${c.id}`} className="block p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10">
                          <p className="font-medium text-sm">{c.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] opacity-80">{c.instructor}</p>
                            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase font-bold">Enrol Now</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link to="/learn" className="block mt-4 text-center text-sm font-semibold hover:underline">
                      Explore Learning Hub →
                    </Link>
                  </div>
                )}
              </div>

              {/* Right: Job Matches */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-xl">Top Job Matches</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">Showing top 5 results</span>
                </div>
                <div className="space-y-4">
                  {topMatches.map((match, i) => {
                    const job = jobs.find(j => j.id === match.jobId)!;
                    return (
                      <div key={match.jobId} className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                            {job.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <p className="font-bold truncate text-lg group-hover:text-primary transition-colors">{match.title}</p>
                                <p className="text-sm text-muted-foreground font-medium">{match.company} • {job.location}</p>
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

                            {/* Job Brief */}
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {job.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              {/* Matched Skills */}
                              {match.matchedSkills.length > 0 && (
                                <div>
                                  <p className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400 mb-1.5">Matching Skills</p>
                                  <div className="flex flex-wrap gap-1">
                                    {match.matchedSkills.slice(0, 4).map(s => (
                                      <span key={s} className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">✓ {s}</span>
                                    ))}
                                    {match.matchedSkills.length > 4 && <span className="text-[10px] text-muted-foreground">+{match.matchedSkills.length - 4} more</span>}
                                  </div>
                                </div>
                              )}

                              {/* Missing Skills */}
                              {match.missingSkills.length > 0 && (
                                <div>
                                  <p className="text-[10px] font-bold uppercase text-orange-600 dark:text-orange-400 mb-1.5">Skills to Develop</p>
                                  <div className="flex flex-wrap gap-1">
                                    {match.missingSkills.slice(0, 3).map(s => (
                                      <span key={s} className="px-2 py-0.5 text-[10px] rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">✗ {s}</span>
                                    ))}
                                    {match.missingSkills.length > 3 && <span className="text-[10px] text-muted-foreground">+{match.missingSkills.length - 3} more</span>}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-border/50">
                              <div className="flex items-center gap-3">
                                <Link to={`/jobs/${match.jobId}`} className="flex items-center gap-1 text-sm text-primary hover:underline font-bold">
                                  View Details <ChevronRight className="w-4 h-4" />
                                </Link>
                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">{job.salary}</span>
                              </div>
                              <span className="text-[10px] text-muted-foreground italic">Posted {job.postedAt || 'recently'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/jobs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-bold border border-primary/20">
                    Explore All Opportunities <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
