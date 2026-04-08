import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job } from '../data/jobs';
import { Course } from '../data/courses';
import { Assessment } from '../data/assessments';
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  skills: string[];
  experience: string;
  location: string;
  title: string;
  resumeUploaded: boolean;
  profileCompletion: number;
  joinedDate: string;
}

export interface TestResult {
  assessmentId: number;
  title: string;
  score: number;
  date: string;
  timeTaken: number;
}

export interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  savedJobIds: number[];
  appliedJobIds: number[];
  enrolledCourseIds: number[];
  courseProgress: Record<number, number>;
  testResults: TestResult[];
  resumeSkills: string[];
  jobs: Job[];
  courses: Course[];
  assessments: Assessment[];
  isLoading: boolean;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: () => void;
  logout: () => void;
  toggleSaveJob: (jobId: number) => void;
  applyToJob: (jobId: number) => void;
  enrollInCourse: (courseId: number) => void;
  updateCourseProgress: (courseId: number, progress: number) => void;
  addTestResult: (result: TestResult) => void;
  setResumeSkills: (skills: string[]) => void;
  isAdmin: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

const demoUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@techemail.com',
  avatar: '👨‍💻',
  role: 'user',
  skills: ['Python', 'Machine Learning', 'TensorFlow', 'AWS', 'SQL', 'Docker'],
  experience: '4 years',
  location: 'San Francisco, CA',
  title: 'ML Engineer',
  resumeUploaded: false,
  profileCompletion: 75,
  joinedDate: 'January 2025',
};

const DEFAULT_STATE: AppState = {
  user: null,
  isLoggedIn: false,
  savedJobIds: [1, 2, 5],
  appliedJobIds: [3, 7],
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
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('careerdream-state');
      return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('careerdream-state', JSON.stringify({
      ...state,
      jobs: [], courses: [], assessments: [], isLoading: true // don't cache massive api payloads heavily here
    }));
  }, [state.user, state.savedJobIds, state.appliedJobIds, state.enrolledCourseIds, state.courseProgress, state.testResults, state.resumeSkills]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        // Determine API base URL for production vs development
        const apiBase = import.meta.env.PROD 
          ? 'https://api.careerdream.in'
          : '/api';
        
        const [jobsRes, coursesRes, assessmentsRes] = await Promise.all([
          fetch(`${apiBase}/jobs`),
          fetch(`${apiBase}/courses`),
          fetch(`${apiBase}/assessments`)
        ]);
        
        const [jobsData, coursesData, assessmentsData] = await Promise.all([
          jobsRes.json(),
          coursesRes.json(),
          assessmentsRes.json()
        ]);

        setState(prev => ({ 
          ...prev, 
          jobs: jobsData, 
          courses: coursesData, 
          assessments: assessmentsData,
          isLoading: false
        }));
      } catch (error) {
        console.error('Failed to fetch from backend', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    fetchAPI();
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800)); // simulate API call
    if (email && _password) {
      setState(prev => ({ ...prev, user: { ...demoUser, email }, isLoggedIn: true }));
      return true;
    }
    return false;
  };

  const loginAsDemo = () => {
    setState(prev => ({ ...prev, user: demoUser, isLoggedIn: true }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null, isLoggedIn: false }));
  };

  const toggleSaveJob = (jobId: number) => {
    setState(prev => ({
      ...prev,
      savedJobIds: prev.savedJobIds.includes(jobId)
        ? prev.savedJobIds.filter(id => id !== jobId)
        : [...prev.savedJobIds, jobId],
    }));
  };

  const applyToJob = (jobId: number) => {
    setState(prev => ({
      ...prev,
      appliedJobIds: prev.appliedJobIds.includes(jobId)
        ? prev.appliedJobIds
        : [...prev.appliedJobIds, jobId],
    }));
  };

  const enrollInCourse = (courseId: number) => {
    setState(prev => ({
      ...prev,
      enrolledCourseIds: prev.enrolledCourseIds.includes(courseId)
        ? prev.enrolledCourseIds
        : [...prev.enrolledCourseIds, courseId],
      courseProgress: { ...prev.courseProgress, [courseId]: prev.courseProgress[courseId] ?? 0 },
    }));
  };

  const updateCourseProgress = (courseId: number, progress: number) => {
    setState(prev => ({
      ...prev,
      courseProgress: { ...prev.courseProgress, [courseId]: progress },
    }));
  };

  const addTestResult = (result: TestResult) => {
    setState(prev => ({
      ...prev,
      testResults: [result, ...prev.testResults.filter(r => r.assessmentId !== result.assessmentId)],
    }));
  };

  const setResumeSkills = (skills: string[]) => {
    setState(prev => ({
      ...prev,
      resumeSkills: skills,
      user: prev.user ? { ...prev.user, resumeUploaded: true } : null,
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      loginAsDemo,
      logout,
      toggleSaveJob,
      applyToJob,
      enrollInCourse,
      updateCourseProgress,
      addTestResult,
      setResumeSkills,
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
