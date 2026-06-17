import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job } from '../data/jobs';
import { Course } from '../data/courses';
import { Assessment, assessments as fallbackAssessments } from '../data/assessments';

import { api } from '../utils/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  skills: string[];
  experience: string;
  location: string;
  phone?: string;
  language?: string;
  timezone?: string;
  title: string;
  resumeUploaded: boolean;
  profileCompletion: number;
  joinedDate: string;
  settings?: Record<string, any>;
}

export interface TestResult {
  assessmentId: number;
  title: string;
  score: number;
  date: string;
  timeTaken: number;
}

export interface CheckpointScore {
  assessmentId: number;
  checkpoint: number; // 1..5
  score: number; // percentage
  date: string;
  timeTaken?: number; // minutes
  userId?: string;
  userName?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'job' | 'news' | 'feature' | 'system';
  date: string;
  read: boolean;
  link: string;
}

export interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  savedJobIds: number[];
  appliedJobIds: number[];
  enrolledCourseIds: number[];
  courseProgress: Record<number, number>;
  testResults: TestResult[];
  leaderboard: Record<number, CheckpointScore[]>;
  resumeSkills: string[];
  jobs: Job[];
  courses: Course[];
  assessments: Assessment[];
  isLoading: boolean;
  notifications: Notification[];
  resumeAnalyses: any[];
  applications: any[];
  userCourses: any[];
  certificates: any[];
  rank: any | null;
  trajectory: any[];
  detailedSkills: any[];
  jobMatches: any[];
}

interface AppContextType extends AppState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  verifyEmail: (email: string, otp: string) => Promise<boolean>;
  verifyMfa: (email: string, otp: string, rememberMe?: boolean) => Promise<boolean>;
  loginWithGoogle: (tokenId: string) => Promise<boolean>;
  loginWithGitHub: (code: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (token: string, password: string) => Promise<string>;

  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
  toggleSaveJob: (jobId: number) => void;
  applyToJob: (jobId: number) => void;
  enrollInCourse: (courseId: number) => void;
  updateCourseProgress: (courseId: number, progress: number) => void;
  addTestResult: (result: TestResult) => void;
  addCheckpointScore: (entry: CheckpointScore) => void;
  getLeaderboard: (assessmentId: number) => CheckpointScore[];
  setResumeSkills: (skills: string[]) => void;
  isAdmin: boolean;
  getGlobalRanking: () => { rank: number; percentile: number; totalScore: number };
  getSkillScores: () => Record<string, number>;
  addNotification: (notif: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  likeArticle: (articleId: number) => Promise<void>;
  commentArticle: (articleId: number, text: string) => Promise<void>;
  updateSettings: (settings: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
  addCertificate: (name: string, authority: string, issuedAt: string, expiryDate?: string) => Promise<void>;
  updateSkillProficiency: (skillName: string, level: number) => Promise<void>;
  isAuthOpen: boolean;
  setAuthOpen: (open: boolean) => void;
  authTab: 'login' | 'signup';
  setAuthTab: (tab: 'login' | 'signup') => void;
  isUnlockModalOpen: boolean;
  setUnlockModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);



const DEFAULT_STATE: AppState = {
  user: null,
  isLoggedIn: false,
  savedJobIds: [],
  appliedJobIds: [],
  enrolledCourseIds: [1, 2],
  courseProgress: { 1: 45, 2: 78 },
  testResults: [
    { assessmentId: 1, title: 'Python Programming', score: 85, date: '2 weeks ago', timeTaken: 37 },
    { assessmentId: 2, title: 'SQL & Database', score: 90, date: '1 month ago', timeTaken: 28 },
    { assessmentId: 5, title: 'JavaScript Mastery', score: 78, date: '3 weeks ago', timeTaken: 41 },
  ],
  resumeSkills: [],
  jobs: [],
  courses: [],
  assessments: [],
  isLoading: true,
  leaderboard: {},
  resumeAnalyses: [],
  applications: [],
  userCourses: [],
  certificates: [],
  rank: null,
  trajectory: [],
  detailedSkills: [],
  jobMatches: [],
  notifications: [
    {
      id: '1',
      title: 'Welcome to CareerDream!',
      message: 'Explore new IT jobs and learning paths customized for you.',
      type: 'system',
      date: new Date().toISOString(),
      read: false,
      link: '/dashboard'
    }
  ],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [isUnlockModalOpen, setUnlockModalOpen] = useState(false);

  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('careerdream-state');
      // If we have a user but no auth token, clear the user to prevent "incorrect username" issues
      const token = localStorage.getItem('authToken');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!token && parsed.user) {
          return { ...DEFAULT_STATE, ...parsed, user: null, isLoggedIn: false };
        }
        return { ...DEFAULT_STATE, ...parsed };
      }
      return DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('careerdream-state', JSON.stringify({
      ...state,
      jobs: [], courses: [], assessments: [], isLoading: true // don't cache massive api payloads heavily here
    }));

    // Sync to backend if logged in
    if (state.isLoggedIn && state.user && !state.isLoading) {
      const syncData = async () => {
        try {
          await api.put('/auth/profile', {
            name: state.user?.name,
            title: state.user?.title,
            location: state.user?.location,
            avatar: state.user?.avatar,
            testResults: state.testResults,
            courseProgress: state.courseProgress,
            skills: state.user?.skills || [],
            savedJobIds: state.savedJobIds,
            appliedJobIds: state.appliedJobIds
          });
        } catch (e) {
          console.warn('Sync to backend failed', e);
        }
      };
      
      const timeout = setTimeout(syncData, 2000); // Debounce sync
      return () => clearTimeout(timeout);
    }
  }, [state.user, state.savedJobIds, state.appliedJobIds, state.enrolledCourseIds, state.courseProgress, state.testResults, state.resumeSkills, state.isLoggedIn, state.notifications]);

  useEffect(() => {
    // Only set loading to false after auth check finishes (or immediately if not waiting for auth state)
    // Global AppContext now only tracks Auth and global preferences.
    // Heavy data (jobs, courses, assessments) is fetched at the component level.
    setState(prev => ({ 
      ...prev, 
      isLoading: false 
    }));
  }, []);

  // Auto-generate notifications for jobs and news
  useEffect(() => {
    if (!state.isLoggedIn || state.isLoading) return;

    // Check for job matches
    const userSkills = new Set([...(state.user?.skills || []), ...state.resumeSkills]);
    if (userSkills.size > 0) {
      const matchingJobs = state.jobs.filter(job => 
        job.skills.some(skill => userSkills.has(skill)) && 
        !state.notifications.some(n => n.type === 'job' && n.link.includes(job.id.toString()))
      );

      if (matchingJobs.length > 0) {
        const job = matchingJobs[0];
        addNotification({
          title: 'New Job Match! 🎯',
          message: `${job.title} at ${job.company} matches your skills. Check it out!`,
          type: 'job',
          link: `/jobs/${job.id}`
        });
      }
    }

    // Check for new features (mock trigger for demo)
    if (state.notifications.length === 1) { // Only if they have just the welcome notif
      addNotification({
        title: 'New Feature: Bulk Job Upload 📤',
        message: 'Recruiters can now post multiple jobs at once using Excel. Tell your HR!',
        type: 'feature',
        link: '/recruiter/dashboard'
      });
    }

  }, [state.jobs, state.isLoggedIn, state.isLoading]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const githubCode = urlParams.get('code');
    if (githubCode) {
      const finishGitHubLogin = async () => {
        try {
          const data = await api.post('/auth/github', { code: githubCode });
          // Store token
          localStorage.setItem('authToken', data.token);
          
          // Fetch full profile
          let userData = { ...data };
          try {
            const meData = await api.get('/auth/me');
            userData = { ...data, ...meData };
          } catch (e) {
            console.warn('Failed to fetch profile after GitHub login');
          }

          const user: User = {
            id: String(userData.id),
            name: userData.name || 'GitHub User',
            email: userData.email || '',
            avatar: userData.avatar || '👤',
            role: (userData.role || 'user') as 'user' | 'admin',
            skills: userData.skills || [],
            experience: userData.experience || '',
            location: userData.location || '',
            title: userData.title || 'IT Professional',
            resumeUploaded: userData.resumeUploaded || false,
            profileCompletion: userData.profileCompletion || 30,
            joinedDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recently',
          };

          setState(prev => ({ ...prev, user, isLoggedIn: true }));
        } catch (error) {
          console.error('GitHub login callback error:', error);
        }
        // Clean the code from URL regardless of success/failure
        window.history.replaceState({}, document.title, window.location.pathname);
      };
      finishGitHubLogin();
    }
  }, []);



  const processAuthResponse = async (data: any) => {
    // Save the token to localStorage so apiFetch can use it (especially for cross-origin local dev where cookies might fail)
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    // Fetch user profile with token to get complete user data
    let userData = { ...data };
    try {
      const meData = await api.get('/auth/me');
      userData = { ...data, ...meData };
    } catch (e) {
      console.warn('Failed to fetch profile after login, using basic data');
    }

    // Safely extract from either root (meData) or nested user object (login/verify responses)
    const sourceData = userData.name ? userData : (userData.user || {});

    const user: User = {
      id: String(userData.id || sourceData.id),
      name: userData.name || sourceData.name || (sourceData.email ? sourceData.email.split('@')[0] : 'User'),
      email: userData.email || sourceData.email || '',
      avatar: userData.avatar || sourceData.avatar || '👤',
      role: (userData.role || sourceData.role || 'user') as 'user' | 'admin',
      skills: userData.skills || sourceData.skills || [],
      experience: userData.experience || sourceData.experience || '',
      location: userData.location || sourceData.location || '',
      title: userData.title || sourceData.title || 'IT Professional',
      resumeUploaded: userData.resumeUploaded || sourceData.resumeUploaded || false,
      profileCompletion: userData.profileCompletion || sourceData.profileCompletion || 30,
      joinedDate: (userData.createdAt || sourceData.createdAt) ? new Date(userData.createdAt || sourceData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recently',
    };

    setState(prev => ({ 
      ...prev, 
      user, 
      isLoggedIn: true,
      testResults: userData.testResults || [],
      courseProgress: userData.courseProgress || {},
      savedJobIds: userData.savedJobs ? userData.savedJobs.map((j: any) => Number(j.jobId || j.id)) : [],
      appliedJobIds: userData.appliedJobs ? userData.appliedJobs.map((j: any) => Number(j.jobId || j.id)) : [],
      applications: userData.appliedJobs || [],
      userCourses: userData.enrolledCourses || [],
      enrolledCourseIds: userData.enrolledCourses ? userData.enrolledCourses.map((c: any) => Number(c.courseId)) : [],
      certificates: userData.certificates || [],
      rank: userData.rank || null,
      detailedSkills: userData.detailedSkills || [],
      trajectory: userData.growthTrajectory || [],
      resumeAnalyses: userData.resumeAnalyses || [],
      jobMatches: userData.jobMatches || []
    }));
    return true;
  };

  const login = async (email: string, password: string, rememberMe = false): Promise<any> => {
    try {
      const data = await api.post('/auth/login', { email, password, rememberMe });
      if (data.mfaRequired || data.requiresVerification) return data;
      await processAuthResponse(data);
      return { success: true };
    } catch (error: any) {
      console.warn('Backend login failed', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<any> => {
    try {
      const data = await api.post('/auth/register', { name, email, password });
      if (data.requiresVerification) return data;
      await processAuthResponse(data);
      return { success: true };
    } catch (error: any) {
      console.warn('Backend signup failed', error);
      throw error;
    }
  };

  const verifyEmail = async (email: string, otp: string): Promise<boolean> => {
    try {
      const data = await api.post('/auth/verify-email', { email, otp });
      await processAuthResponse(data);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const verifyMfa = async (email: string, otp: string, rememberMe = false): Promise<boolean> => {
    try {
      const data = await api.post('/auth/login/mfa', { email, otp, rememberMe });
      await processAuthResponse(data);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async (tokenId: string): Promise<boolean> => {
    try {
      const data = await api.post('/auth/google', { tokenId });
      return await processAuthResponse(data);
    } catch (error: any) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginWithGitHub = async (code: string): Promise<boolean> => {
    try {
      const data = await api.post('/auth/github', { code });
      return await processAuthResponse(data);
    } catch (error: any) {
      console.error('GitHub login error:', error);
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<string> => {
    try {
      const data = await api.post('/auth/forgot-password', { email });
      return data.message || 'Password reset link sent to your email.';
    } catch (error: any) {
      console.error('Forgot password error:', error);
      throw new Error(error.response?.data?.message || 'Unable to send reset email. Please try again later.');
    }
  };

  const resetPassword = async (token: string, password: string): Promise<string> => {
    try {
      const data = await api.post('/auth/reset-password', { token, password });
      return data.message || 'Password reset successfully.';
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.response?.data?.message || 'Reset link is invalid or has expired.');
    }
  };


  const updateUser = (partial: Partial<User>) => {
    setState(prev => {
      const newUser = prev.user ? { ...prev.user, ...partial } : null;
      if (!newUser) return prev;
      const newState = { ...prev, user: newUser, isLoggedIn: true };
      localStorage.setItem('careerdream-state', JSON.stringify(newState));
      return newState;
    });
  };

  // Add effect to persist state whenever it changes
  useEffect(() => {
    if (state.user || state.savedJobIds.length > 0 || state.appliedJobIds.length > 0) {
      localStorage.setItem('careerdream-state', JSON.stringify(state));
    }
  }, [state]);

  const logout = async () => {
    try { await api.post('/auth/logout', {}); } catch(e) {}
    localStorage.removeItem('careerdream-state');
    localStorage.removeItem('authToken'); // Clear the token!
    setState({ ...DEFAULT_STATE, isLoading: false });
    window.location.href = '/';
  };

  const toggleSaveJob = async (jobId: number) => {
    if (!state.isLoggedIn) {
      alert('Please log in to save jobs.');
      return;
    }

    const id = Number(jobId);
    
    // Update locally first
    setState(prev => {
      const isSaved = prev.savedJobIds.includes(id);
      const newIds = isSaved 
        ? prev.savedJobIds.filter(x => x !== id)
        : [...prev.savedJobIds, id];
      
      return { ...prev, savedJobIds: newIds };
    });

    // Try backend if it exists, but don't fail if it doesn't
    try {
      if (localStorage.getItem('authToken')) {
        await api.post(`/jobs/${id}/save`, {});
      }
    } catch (error) {
      console.log('Running in local-only mode for job saves');
    }
  };

  const likeArticle = async (articleId: number) => {
    if (!state.isLoggedIn) return;
    try {
      await api.post('/activity', { type: 'like', articleId });
    } catch (error) {
      console.error('Failed to like article', error);
    }
  };

  const commentArticle = async (articleId: number, text: string) => {
    if (!state.isLoggedIn) return;
    try {
      await api.post('/activity', { type: 'comment', articleId, commentText: text });
    } catch (error) {
      console.error('Failed to comment on article', error);
    }
  };

  const updateSettings = async (settings: Record<string, any>) => {
    if (state.user) {
      const newUser = { ...state.user, settings: { ...(state.user.settings || {}), ...settings } };
      setState(prev => ({ ...prev, user: newUser }));
    }
    
    try {
      await api.put('/activity/settings', { settings });
    } catch (error) {
      console.error('Failed to update settings on backend', error);
    }
  };

  const applyToJob = async (jobId: number) => {
    if (!state.isLoggedIn) {
      alert('Please log in to apply for jobs.');
      return;
    }

    const id = Number(jobId);

    // Optimistic update
    setState(prev => ({
      ...prev,
      appliedJobIds: prev.appliedJobIds.includes(id)
        ? prev.appliedJobIds
        : [...prev.appliedJobIds, id],
    }));

    try {
      await api.post(`/jobs/${id}/apply`, {});
      
      // Update local applications list
      setState(prev => ({
        ...prev,
        applications: [{ job: prev.jobs.find(j => j.id === id), status: 'Applied', applied_at: new Date().toISOString() }, ...prev.applications]
      }));

      addNotification({
        title: 'Application Sent! 🚀',
        message: `Your application has been successfully submitted.`,
        type: 'job',
        link: `/jobs/${id}`
      });
    } catch (error) {
      console.error('Failed to apply for job on backend', error);
    }
  };

  const enrollInCourse = async (courseId: number) => {
    // Optimistic local update
    setState(prev => ({
      ...prev,
      enrolledCourseIds: prev.enrolledCourseIds.includes(courseId)
        ? prev.enrolledCourseIds
        : [...prev.enrolledCourseIds, courseId],
      courseProgress: { ...prev.courseProgress, [courseId]: prev.courseProgress[courseId] ?? 0 },
    }));

    try {
      await api.post('/activity/course', { courseId, status: 'Enrolled' });
    } catch (error) {
      console.warn('Failed to enroll in course on backend');
    }
  };

  const addCertificate = async (name: string, authority: string, issuedAt: string, expiryDate?: string) => {
    try {
      const { data } = await api.post('/activity/certificate', { name, authority, issuedAt, expiryDate });
      setState(prev => ({
        ...prev,
        certificates: [data, ...prev.certificates]
      }));
    } catch (error) {
      console.error('Failed to add certificate', error);
    }
  };

  const updateSkillProficiency = async (skillName: string, level: number) => {
    try {
      await api.post('/activity/skills', { skillName, level });
      setState(prev => ({
        ...prev,
        detailedSkills: [
          { skill_name: skillName, proficiency_level: level, updated_at: new Date().toISOString() },
          ...prev.detailedSkills.filter(s => s.skill_name !== skillName)
        ]
      }));
    } catch (error) {
      console.error('Failed to update skill proficiency', error);
    }
  };

  const updateCourseProgress = (courseId: number, progress: number) => {
    setState(prev => ({
      ...prev,
      courseProgress: { ...prev.courseProgress, [courseId]: progress },
    }));
  };

  const addTestResult = async (result: TestResult) => {
    setState(prev => ({
      ...prev,
      testResults: [result, ...prev.testResults.filter(r => r.assessmentId !== result.assessmentId)],
    }));

    try {
      await api.post('/activity/assessment', {
        assessmentId: result.assessmentId,
        score: result.score,
        progress: 'completed',
        completed: true
      });
    } catch (error) {
      console.warn('Failed to save assessment result to backend');
    }
  };

  const addCheckpointScore = (entry: CheckpointScore) => {
    setState(prev => {
      const existing = prev.leaderboard[entry.assessmentId] ?? [];
      const updated = [entry, ...existing].slice(0, 200); // cap to 200 entries per assessment
      return { ...prev, leaderboard: { ...prev.leaderboard, [entry.assessmentId]: updated } };
    });
  };

  const getLeaderboard = (assessmentId: number) => {
    return state.leaderboard[assessmentId] ?? [];
  };

  const setResumeSkills = (skills: string[]) => {
    setState(prev => ({
      ...prev,
      resumeSkills: skills,
      user: prev.user ? { ...prev.user, resumeUploaded: true } : null,
    }));
  };

  const getGlobalRanking = () => {
    const totalScore = state.testResults.reduce((acc, tr) => acc + tr.score, 0);
    const mockTotalUsers = 15420;
    let percentile = 100 - Math.min(99, Math.floor(totalScore / 15));
    if (percentile < 1) percentile = 1;
    if (totalScore === 0) percentile = 100;
    const rank = Math.max(1, Math.floor((percentile / 100) * mockTotalUsers));
    
    return { rank, percentile, totalScore };
  };

  const getSkillScores = () => {
    const scores: Record<string, number[]> = {};
    state.testResults.forEach(tr => {
      const assessment = state.assessments.find(a => a.id === tr.assessmentId) || fallbackAssessments.find(a => a.id === tr.assessmentId);
      if (assessment) {
        if (!scores[assessment.category]) scores[assessment.category] = [];
        scores[assessment.category].push(tr.score);
      }
    });
    
    const averages: Record<string, number> = {};
    Object.keys(scores).forEach(cat => {
      const sum = scores[cat].reduce((a, b) => a + b, 0);
      averages[cat] = Math.round(sum / scores[cat].length);
    });
    return averages;
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'read' | 'date'>) => {
    setState(prev => ({
      ...prev,
      notifications: [
        {
          ...notif,
          id: Math.random().toString(36).substr(2, 9),
          read: false,
          date: new Date().toISOString()
        },
        ...prev.notifications
      ]
    }));
  };

  const markAsRead = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const clearNotifications = () => {
    setState(prev => ({ ...prev, notifications: [] }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      isAuthOpen,
      setAuthOpen,
      authTab,
      setAuthTab,
      isUnlockModalOpen,
      setUnlockModalOpen,
      login,
      signup,
      loginWithGoogle,
      loginWithGitHub,
      verifyEmail,
      verifyMfa,
      forgotPassword,
      resetPassword,

      logout,
      updateUser,
      toggleSaveJob,
      applyToJob,
      enrollInCourse,
      updateCourseProgress,
      addTestResult,
      addCheckpointScore,
      getLeaderboard,
      setResumeSkills,
      getGlobalRanking,
      getSkillScores,
      addNotification,
      markAsRead,
      clearNotifications,
      likeArticle,
      commentArticle,
      updateSettings,
      addCertificate,
      updateSkillProficiency,
      isAdmin: state.user?.role === 'admin',
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
