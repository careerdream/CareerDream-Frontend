import { Link } from 'react-router';
import { Briefcase, BookOpen, Award, TrendingUp, Clock, Target, ChevronRight, Calendar, Star, Brain, Upload, Users, CheckCircle, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { useApp } from '../context/AppContext';

const activityData = [
  { day: 'Mon', jobs: 3, courses: 2 },
  { day: 'Tue', jobs: 1, courses: 4 },
  { day: 'Wed', jobs: 5, courses: 1 },
  { day: 'Thu', jobs: 2, courses: 3 },
  { day: 'Fri', jobs: 4, courses: 2 },
  { day: 'Sat', jobs: 1, courses: 5 },
  { day: 'Sun', jobs: 2, courses: 3 },
];

const skillRadar = [
  { skill: 'Python', score: 85 },
  { skill: 'Cloud', score: 72 },
  { skill: 'ML', score: 78 },
  { skill: 'SQL', score: 90 },
  { skill: 'DevOps', score: 60 },
  { skill: 'JS', score: 75 },
];

export function Dashboard() {
  const { user, isLoggedIn, savedJobIds, appliedJobIds, enrolledCourseIds, courseProgress, testResults, jobs, courses, assessments, isLoading } = useApp();

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id)).slice(0, 3);
  const appliedJobs = jobs.filter(j => appliedJobIds.includes(j.id));
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  const recommendedJobs = jobs.filter(j => !appliedJobIds.includes(j.id)).slice(0, 4);

  const avgScore = testResults.length
    ? Math.round(testResults.reduce((s, r) => s + r.score, 0) / testResults.length)
    : 0;

  const statCards = [
    { icon: Briefcase, label: 'Jobs Applied', value: appliedJobIds.length, trend: '+2', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: BookOpen, label: 'Courses Enrolled', value: enrolledCourseIds.length, trend: '+1', color: 'text-accent', bg: 'bg-accent/10' },
    { icon: Award, label: 'Certifications', value: testResults.filter(r => r.score >= 70).length, trend: '+1', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Target, label: 'Avg Test Score', value: avgScore ? `${avgScore}%` : '—', trend: '+5%', color: 'text-accent', bg: 'bg-accent/10' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-10 max-w-md">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-3xl font-bold mb-3">Sign In to Continue</h1>
          <p className="text-muted-foreground mb-8">Access your personalized dashboard, track progress, and get AI-powered recommendations.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
            Go to Home →
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || jobs.length === 0 || courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg">
                  {user?.avatar}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
                  <p className="text-muted-foreground">{user?.title} • {user?.location}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/ai-match" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:opacity-90 transition-all shadow-md text-sm">
                <Brain className="w-4 h-4" /> AI Resume Match
              </Link>
              <Link to="/jobs" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:border-primary transition-colors text-sm font-medium">
                <Briefcase className="w-4 h-4" /> Browse Jobs
              </Link>
            </div>
          </div>

          {/* Profile Completion */}
          {(user?.profileCompletion ?? 0) < 100 && (
            <div className="mt-6 p-4 rounded-xl bg-card border border-border flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-semibold">Profile Completion</p>
                  <span className="text-sm text-primary font-bold">{user?.profileCompletion}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${user?.profileCompletion}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Add skills and work experience to improve your profile</p>
              </div>
              <Link to="/profile" className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors shrink-0">
                Complete Profile →
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ icon: Icon, label, value, trend, color, bg }) => (
            <div key={label} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-green-500 font-medium">{trend}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Chart */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-5">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={activityData} barGap={4}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Bar dataKey="jobs" name="Jobs" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="courses" name="Courses" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary" /> Jobs viewed</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent" /> Lessons completed</span>
              </div>
            </div>

            {/* Enrolled Courses Progress */}
            {enrolledCourses.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold">Learning Progress</h2>
                  <Link to="/learn" className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {enrolledCourses.map(course => {
                    const prog = courseProgress[course.id] ?? 0;
                    return (
                      <Link key={course.id} to={`/learn/${course.id}`}
                        className="group flex items-center gap-5 p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform`}>
                          {course.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate group-hover:text-primary transition-colors">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${prog}%` }} />
                            </div>
                            <span className="text-sm font-bold text-primary shrink-0">{prog}%</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <Link to="/learn" className="block p-4 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-center text-muted-foreground hover:text-primary text-sm font-medium">
                    + Enroll in a new course
                  </Link>
                </div>
              </section>
            )}

            {/* Applied Jobs */}
            {appliedJobs.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold">Applied Jobs</h2>
                  <Link to="/jobs" className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {appliedJobs.slice(0, 3).map(job => (
                    <Link key={job.id} to={`/jobs/${job.id}`}
                      className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl shrink-0">{job.logo}</div>
                      <div className="flex-1">
                        <h3 className="font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Applied {job.posted}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Under Review</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Test Results */}
            {testResults.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold">Test Performance</h2>
                  <Link to="/assessments" className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {testResults.slice(0, 3).map((r, i) => {
                    const asmnt = assessments.find(a => a.id === r.assessmentId);
                    return (
                      <div key={i} className="p-5 rounded-2xl border border-border bg-card text-center">
                        <div className="text-4xl mb-2">{asmnt?.badge ?? '📝'}</div>
                        <p className="font-semibold text-sm mb-1">{r.title}</p>
                        <p className={`text-3xl font-bold mb-1 ${r.score >= 80 ? 'text-green-500' : r.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{r.score}%</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                        {r.score >= 70 && (
                          <div className="mt-2 flex items-center justify-center gap-1 text-xs text-green-500">
                            <CheckCircle className="w-3 h-3" /> Certified
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Skill Radar */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-4">Skill Map</h3>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={skillRadar}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                  <Radar name="Level" dataKey="score" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Recommended Jobs */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-5">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-bold">AI Recommended Jobs</h3>
              </div>
              <div className="space-y-3">
                {recommendedJobs.map(job => {
                  const matchScore = 70 + Math.floor(Math.random() * 25);
                  return (
                    <Link key={job.id} to={`/jobs/${job.id}`}
                      className="block p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">{job.logo}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{job.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-500 font-medium">{matchScore}% match</span>
                        <span className="text-muted-foreground">{job.type}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link to="/ai-match" className="block mt-4 text-center text-xs text-primary hover:underline">
                Upload resume for better matches →
              </Link>
            </div>

            {/* Saved Jobs */}
            {savedJobs.length > 0 && (
              <div className="p-6 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Saved Jobs</h3>
                  <span className="text-xs text-muted-foreground">{savedJobIds.length} total</span>
                </div>
                <div className="space-y-3">
                  {savedJobs.map(job => (
                    <Link key={job.id} to={`/jobs/${job.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">{job.logo}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </Link>
                  ))}
                </div>
                <Link to="/jobs" className="block mt-3 text-center text-xs text-primary hover:underline">View all saved →</Link>
              </div>
            )}

            {/* AI Match CTA */}
            {!user?.resumeUploaded && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                <Brain className="w-10 h-10 mb-3 opacity-90" />
                <h3 className="font-bold text-lg mb-2">Boost Your Matches</h3>
                <p className="text-sm opacity-90 mb-4">Upload your resume to get AI-powered job recommendations tailored to your skills.</p>
                <Link to="/ai-match" className="block w-full py-3 bg-white text-primary rounded-xl text-center font-bold hover:bg-white/90 transition-all">
                  Upload Resume →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
