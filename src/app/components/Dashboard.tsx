import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { 
  Briefcase, BookOpen, Award, Target, ChevronRight, 
  Clock, Brain, CheckCircle, Loader2, 
  Sparkles, Zap, ArrowUpRight, LayoutDashboard,
  Search, GraduationCap, Trophy
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar, CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { computeMatchScore } from '../utils/resumeUtils';

// Types for better safety
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  logo: string;
  posted: string;
  type: string;
  skills: string[];
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  color: string;
}

const skillRadar = [
  { skill: 'Python', score: 85 },
  { skill: 'Cloud', score: 72 },
  { skill: 'ML', score: 78 },
  { skill: 'SQL', score: 90 },
  { skill: 'DevOps', score: 60 },
  { skill: 'JS', score: 75 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'overview' | 'ats') || 'overview';

  const { 
    user, isLoggedIn, isAdmin, appliedJobIds, 
    enrolledCourseIds, courseProgress, testResults, 
    jobs, courses, isLoading, resumeSkills,
    getGlobalRanking, getSkillScores
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'ats'>(initialTab);
  const [atsData, setAtsData] = useState<any>(null);
  const [atsLoading, setAtsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'ats' && !atsData) {
      fetchAtsData();
    }
  }, [activeTab]);

  const fetchAtsData = async () => {
    setAtsLoading(true);
    try {
      const { api } = await import('../utils/api');
      const res = await api.get('/resume/analysis');
      if (res && res.data && res.data.analysis) {
        setAtsData(res.data.analysis);
      } else if (res && res.analysis) {
        setAtsData(res.analysis);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAtsLoading(false);
    }
  };

  const ranking = getGlobalRanking();
  const skillScores = getSkillScores();
  const dynamicSkillRadar = Object.entries(skillScores).map(([skill, score]) => ({ skill: skill.split(' ')[0].substring(0, 8), score })).slice(0, 6);
  const radarData = dynamicSkillRadar.length >= 3 ? dynamicSkillRadar : skillRadar;

  // Real Match scores for recommended jobs
  const recommendedJobs = jobs
    .filter(j => !appliedJobIds.includes(j.id))
    .map(j => ({
      ...j,
      matchScore: computeMatchScore(resumeSkills.length > 0 ? resumeSkills : (user?.skills || []), j.skills)
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4) as (Job & { matchScore: number })[];

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id)) as Course[];

  // Build real activity data from actual user state — no Math.random()
  const todayIdx = new Date().getDay();
  const yesterdayIdx = (todayIdx - 1 + 7) % 7;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const activityData = days.map((day, dayIdx) => {
    // Count tests taken on this day of week (parse timestamp if available)
    const testsCount = testResults.filter(r => {
      if (!r.date) return false;
      if (r.date.toLowerCase().includes('now')) return dayIdx === todayIdx;
      if (r.date.toLowerCase().includes('week')) return dayIdx === todayIdx || dayIdx === yesterdayIdx;
      try { return new Date(r.date).getDay() === dayIdx; } catch { return false; }
    }).length;

    return {
      day,
      // Show job applications on today only
      jobs: dayIdx === todayIdx ? appliedJobIds.length : 0,
      // Show course activity on today + yesterday if enrolled
      courses: enrolledCourseIds.length > 0 && (dayIdx === todayIdx || dayIdx === yesterdayIdx) ? 1 : 0,
      tests: testsCount,
    };
  });

  const statCards = [
    { icon: Briefcase, label: 'Applications', value: appliedJobIds.length, trend: '+2 this week', color: 'primary' },
    { icon: BookOpen, label: 'Courses', value: enrolledCourseIds.length, trend: 'Active learning', color: 'accent' },
    { icon: Award, label: 'Certificates', value: testResults.filter(r => r.score >= 70).length, trend: 'Achieved', color: 'primary' },
    { icon: Target, label: 'Global Rank', value: testResults.length > 0 ? `#${ranking.rank.toLocaleString()}` : '—', trend: testResults.length > 0 ? `Top ${ranking.percentile}%` : 'No tests taken', color: 'accent' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030213] text-white">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-10 max-w-md bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl"
        >
          <div className="text-6xl mb-6 drop-shadow-lg">✨</div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">Unlock Your Potential</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">Sign in to access your AI-powered career dashboard, track skill growth, and connect with top IT employers.</p>
          <Link to="/" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            Explore Opportunities
            <Zap className="w-4 h-4 group-hover:animate-pulse" />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030213] transition-colors duration-500">
      {/* Dynamic Header */}
      <div className="relative overflow-hidden bg-white dark:bg-[#030213] border-b border-border/50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] -ml-32 -mb-32" />
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col lg:flex-row lg:items-center gap-8 justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                <div className="w-20 h-20 rounded-[1.5rem] bg-white dark:bg-card border border-border flex items-center justify-center text-4xl shadow-xl relative transition-transform group-hover:scale-105">
                  <div className="w-full h-full rounded-[1.5rem] flex items-center justify-center overflow-hidden">
                    {user?.avatar && (user.avatar.startsWith('http') || user.avatar.startsWith('data:')) ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user?.avatar || '👤'
                    )}
                  </div>
                </div>
              </div>
              <div>
                <motion.h1 
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className="text-4xl font-black tracking-tight mb-1"
                >
                  Hi, {user?.name.split(' ')[0]} <span className="text-primary italic font-serif">!</span>
                </motion.h1>
                <div className="flex items-center gap-3 text-muted-foreground font-medium">
                  <LayoutDashboard className="w-4 h-4 text-primary" />
                  <span>{user?.title}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{user?.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {isAdmin && (
                <Link to="/admin/dashboard" className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)] transition-all hover:-translate-y-1">
                  <LayoutDashboard className="w-5 h-5 transition-transform group-hover:rotate-12" /> 
                  Go to Admin Dashboard
                </Link>
              )}
              <Link to="/ai-match" className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#4F46E5] text-white font-bold hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-1">
                <Brain className="w-5 h-5 transition-transform group-hover:rotate-12" /> 
                AI Match Finder
              </Link>
              <Link to="/jobs" className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-card border border-border font-bold hover:bg-muted/50 transition-all">
                <Search className="w-5 h-5 text-primary" /> 
                Explore Jobs
              </Link>
            </div>
          </motion.div>

          {/* Premium Profile Progress */}
          {((user?.profileCompletion ?? 0) < 100) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 rounded-[2rem] bg-gradient-to-r from-white/80 to-muted/30 dark:from-white/5 dark:to-transparent backdrop-blur-md border border-white/20 shadow-xl flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center font-bold text-lg text-primary shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                {user?.profileCompletion}%
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold mb-1">Elite Profile Status Pending</h3>
                <p className="text-sm text-muted-foreground">Complete your profiles to get noticed by <span className="text-foreground font-semibold">Tier-1 IT companies</span>. You're almost there!</p>
              </div>
              <Link to="/profile" className="px-8 py-3 bg-white dark:bg-card rounded-xl text-primary font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm">
                Optimize Profile →
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-8 mb-8 border-b border-border/50 pb-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`text-xl font-bold transition-all relative ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Overview
            {activeTab === 'overview' && <div className="absolute -bottom-4 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(79,70,229,0.5)]" />}
          </button>
          <button 
            onClick={() => setActiveTab('ats')}
            className={`text-xl font-bold transition-all flex items-center gap-2 relative ${activeTab === 'ats' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Brain className="w-5 h-5" />
            ATS Insights
            {activeTab === 'ats' && <div className="absolute -bottom-4 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(79,70,229,0.5)]" />}
          </button>
        </div>

        {activeTab === 'overview' ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Executive Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map(({ icon: Icon, label, value, trend, color }) => (
              <motion.div 
                key={label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-[2.5rem] bg-white dark:bg-card border border-border/50 hover:border-primary/50 transition-all shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] cursor-pointer overflow-hidden relative"
              >
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" /> {trend}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-1">{value}</div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{label}</div>
                </div>
              </motion.div>
            ))}
          </section>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Insights */}
            <div className="lg:col-span-2 space-y-12">
              {/* Activity Vision */}
              <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-white dark:bg-card border border-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black tracking-tight">Growth Trajectory</h2>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/50 p-1.5 rounded-xl text-xs font-bold uppercase tracking-tighter">
                    <button className="px-3 py-1.5 bg-white dark:bg-black rounded-lg shadow-sm">Week</button>
                    <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground">Month</button>
                  </div>
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} barGap={8}>
                      <defs>
                        <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.9)', 
                          backdropBlur: '12px',
                          border: '1px solid var(--border)', 
                          borderRadius: '20px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          padding: '12px'
                        }}
                        labelStyle={{ fontWeight: 'bold', color: '#030213', marginBottom: '4px' }}
                      />
                      <Bar dataKey="jobs" radius={[8, 8, 0, 0]} fill="url(#colorJobs)" barSize={30} />
                      <Bar dataKey="courses" radius={[8, 8, 0, 0]} fill="url(#colorCourses)" barSize={30} />
                      <Bar dataKey="tests" radius={[8, 8, 0, 0]} fill="url(#colorTests)" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-8 mt-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">
                        <div className="w-3 h-3 rounded-full bg-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.5)]" /> Job Search
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
                        <div className="w-3 h-3 rounded-full bg-[#06B6D4] shadow-[0_0_8px_rgba(6,182,212,0.5)]" /> Skill Mastery
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#10B981]">
                        <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Test Performance
                    </div>
                </div>
              </motion.div>

              {/* Learning Hub */}
              {enrolledCourses.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-8 group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-black tracking-tight">Focus Laboratory</h2>
                    </div>
                    <Link to="/learn" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                      All Courses <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {enrolledCourses.map(course => {
                      const prog = courseProgress[course.id] ?? 0;
                      return (
                        <motion.div 
                          key={course.id}
                          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        >
                          <Link to={`/learn/${course.id}`}
                            className="group block p-6 rounded-[2.5rem] bg-white dark:bg-card border border-border hover:border-primary transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/10">
                            <div className="flex items-start gap-6 mb-6">
                              <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${course.color} flex items-center justify-center text-4xl shadow-inner group-hover:rotate-6 transition-transform`}>
                                {course.image}
                              </div>
                              <div className="flex-1 min-w-0 pt-1">
                                <h3 className="font-bold text-xl truncate mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                                <p className="text-sm font-medium text-muted-foreground mb-4">By {course.instructor}</p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                  Advanced Tier
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                <span>Mastery Progress</span>
                                <span className="text-primary">{prog}%</span>
                              </div>
                              <div className="h-2.5 bg-muted rounded-full overflow-hidden p-0.5">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${prog}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]" 
                                />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Premium Sidebar */}
            <aside className="space-y-10">
              {/* Skill Topology */}
              <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-[#030213] text-white border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                    <Trophy className="w-6 h-6 text-yellow-500" /> 
                    Elite Skill Radar
                </h3>
                <div className="h-[220px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600 }} />
                      <Radar 
                        name="Level" 
                        dataKey="score" 
                        stroke="#4F46E5" 
                        fill="#4F46E5" 
                        fillOpacity={0.4} 
                        strokeWidth={3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <button className="w-full mt-6 py-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all font-bold text-sm tracking-tight relative z-10">
                    Advanced Tuning →
                </button>
              </motion.div>

              {/* AI Recruitment matching */}
              <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-white dark:bg-card border-2 border-primary/20 shadow-xl shadow-primary/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight">Precision Matches</h3>
                </div>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <Link key={job.id} to={`/jobs/${job.id}`}
                      className="group flex flex-col p-4 rounded-3xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-card shadow-md flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{job.logo}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base truncate group-hover:text-primary transition-colors">{job.title}</h4>
                          <p className="text-xs font-semibold text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${job.matchScore >= 70 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'} text-[10px] font-black uppercase tracking-widest`}>
                              <Sparkles className="w-3 h-3" /> {job.matchScore}% {job.matchScore >= 90 ? 'Elite' : 'Targeted'} Match
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground">{job.type}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link to="/ai-match" className="block mt-8 text-center text-xs font-black uppercase tracking-widest text-primary hover:underline underline-offset-8">
                  Master Match Tuning →
                </Link>
              </motion.div>

              {/* Recruitment Status */}
              <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent text-white shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <Zap className="w-64 h-64 rotate-12" />
                </div>
                <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight">Fast-Track Your <br/>Career Access</h3>
                <p className="text-white/80 text-sm mb-8 leading-relaxed relative z-10">Upload your latest resume to enable <span className="font-bold text-white">Direct Recruiter Directing</span> and bypass entry testing.</p>
                <Link to="/ai-match" className="block w-full py-4 bg-white text-[#030213] rounded-2xl text-center font-black transition-all hover:shadow-[0_15px_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 relative z-10">
                  Boost Visibility →
                </Link>
              </motion.div>
            </aside>
          </div>
        </motion.div>
        ) : (
          <AtsInsightsView atsData={atsData} loading={atsLoading} courses={courses} />
        )}
      </div>
    </div>
  );
}

function AtsInsightsView({ atsData, loading, courses }: { atsData: any, loading: boolean, courses: any[] }) {
  if (loading) return <div className="py-32 flex flex-col items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary mb-4" /><p className="text-muted-foreground font-medium">Loading ATS Insights...</p></div>;
  if (!atsData) return (
    <div className="text-center py-24 bg-card border border-border rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Brain className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-3xl font-black mb-3">No ATS Scan Found</h3>
      <p className="text-muted-foreground mb-8 text-lg">Upload your resume to unlock deep AI-driven ATS insights and personalized courses.</p>
      <Link to="/ai-match" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold inline-block hover:scale-105 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.3)]">Scan Resume Now</Link>
    </div>
  );

  const formatIssues = (typeof atsData.formatIssues === 'string' ? JSON.parse(atsData.formatIssues) : atsData.formatIssues) || [];
  const missingSkills = (typeof atsData.missingSkills === 'string' ? JSON.parse(atsData.missingSkills) : atsData.missingSkills) || [];
  const recommendedCoursesKeys = (typeof atsData.recommendedCourses === 'string' ? JSON.parse(atsData.recommendedCourses) : atsData.recommendedCourses) || [];

  const recommendedCourses = courses.filter(c => 
    recommendedCoursesKeys.some((rc: string) => c.title.toLowerCase().includes(rc.toLowerCase()) || c.skills?.some((s:string) => s.toLowerCase().includes(rc.toLowerCase())))
  ).slice(0, 3);

  // If no courses matched perfectly, just recommend popular ones
  if (recommendedCourses.length === 0) {
    recommendedCourses.push(...courses.slice(0, 3));
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Radial Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        <ScoreCard title="Overall ATS Score" score={atsData.atsScore || 0} color="#4F46E5" />
        <ScoreCard title="Keyword Match" score={atsData.keywordMatch || 0} color="#10B981" />
        <ScoreCard title="Recruiter Readiness" score={atsData.readinessScore || 0} color="#06B6D4" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Actionable Tips: Formatting */}
        <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-orange-500" />
            Formatting & Layout Issues
          </h3>
          {formatIssues.length > 0 ? (
            <ul className="space-y-4">
              {formatIssues.map((issue: string, idx: number) => (
                <li key={idx} className="flex gap-3 text-muted-foreground bg-muted/50 p-4 rounded-2xl">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl font-medium flex gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" />
              Your resume format looks perfectly optimized for ATS parsers!
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-red-500" />
            Critical Missing Skills
          </h3>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {missingSkills.map((skill: string, idx: number) => (
                <span key={idx} className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold text-sm">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl font-medium flex gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" />
              You have a highly comprehensive skill set!
            </div>
          )}
        </div>
      </div>

      {/* Suggested Courses */}
      <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <GraduationCap className="w-64 h-64 -rotate-12" />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            Recommended Masterclasses
          </h3>
          <p className="text-white/80 mb-8 font-medium">Personalized courses to bridge your skill gaps and boost your keyword match.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map(course => (
              <Link key={course.id} to={`/learn/${course.id}`} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {course.image || '📚'}
                </div>
                <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                <p className="text-xs text-white/70">Instructor: {course.instructor}</p>
                <div className="mt-4 inline-block text-sm font-bold bg-white text-primary px-4 py-2 rounded-xl">Enrol Now</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ title, score, color }: { title: string, score: number, color: string }) {
  const dashArray = 351.8;
  const dashOffset = dashArray - (dashArray * score / 100);
  
  return (
    <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" style={{ backgroundColor: color }} />
      <div className="relative w-36 h-36 flex items-center justify-center mb-6">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-xl">
          <circle cx="72" cy="72" r="56" fill="none" stroke="var(--border)" strokeWidth="14" />
          <circle cx="72" cy="72" r="56" fill="none" stroke={color} strokeWidth="14" strokeDasharray={dashArray} strokeDashoffset={dashOffset} className="transition-all duration-1500 ease-out" strokeLinecap="round" />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color }}>{score}</span>
          <span className="text-xs font-bold text-muted-foreground uppercase">/ 100</span>
        </div>
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  );
}
