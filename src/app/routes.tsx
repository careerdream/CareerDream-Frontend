import React from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
const PlaygroundPage = React.lazy(() => import("./components/PlaygroundPage").then(module => ({ default: module.PlaygroundPage })));
const CodingWorkspace = React.lazy(() => import("./components/CodingWorkspace").then(module => ({ default: module.CodingWorkspace })));
const LandingPage = React.lazy(() => import("./components/LandingPage").then(module => ({ default: module.LandingPage })));
const JobsPage = React.lazy(() => import("./components/JobsPage").then(module => ({ default: module.JobsPage })));
const JobDetailPage = React.lazy(() => import("./components/JobDetailPage").then(module => ({ default: module.JobDetailPage })));
const AdminJobsPage = React.lazy(() => import("./components/AdminJobsPage").then(module => ({ default: module.AdminJobsPage })));
const LearningHub = React.lazy(() => import("./components/LearningHub").then(module => ({ default: module.LearningHub })));
const CoursePage = React.lazy(() => import("./components/CoursePage").then(module => ({ default: module.CoursePage })));
const AssessmentsPage = React.lazy(() => import("./components/AssessmentsPage").then(module => ({ default: module.AssessmentsPage })));
const TestPage = React.lazy(() => import("./components/TestPage").then(module => ({ default: module.TestPage })));
const LeaderboardPage = React.lazy(() => import("./components/LeaderboardPage").then(module => ({ default: module.LeaderboardPage })));
const Dashboard = React.lazy(() => import("./components/Dashboard").then(module => ({ default: module.Dashboard })));
const AIResumePage = React.lazy(() => import("./components/AIResumePage").then(module => ({ default: module.AIResumePage })));
const AboutPage = React.lazy(() => import("./components/AboutPage").then(module => ({ default: module.AboutPage })));
const PrivacyPolicyPage = React.lazy(() => import("./components/PrivacyPolicyPage").then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = React.lazy(() => import("./components/TermsOfServicePage").then(module => ({ default: module.TermsOfServicePage })));
const CookiePolicyPage = React.lazy(() => import("./components/CookiePolicyPage").then(module => ({ default: module.CookiePolicyPage })));
const SecurityPage = React.lazy(() => import("./components/SecurityPage").then(module => ({ default: module.SecurityPage })));
const FraudAlertPage = React.lazy(() => import("./components/FraudAlertPage").then(module => ({ default: module.FraudAlertPage })));
const CourseMaterialPage = React.lazy(() => import("./components/CourseMaterialPage").then(module => ({ default: module.CourseMaterialPage })));
const RecruiterLogin = React.lazy(() => import("./components/RecruiterLogin").then(module => ({ default: module.RecruiterLogin })));
const RecruiterSignup = React.lazy(() => import("./components/RecruiterSignup").then(module => ({ default: module.RecruiterSignup })));
const RecruiterDashboard = React.lazy(() => import("./components/RecruiterDashboard").then(module => ({ default: module.RecruiterDashboard })));
const JobPostingForm = React.lazy(() => import("./components/JobPostingForm").then(module => ({ default: module.JobPostingForm })));
const NewsPage = React.lazy(() => import("./components/NewsPage").then(module => ({ default: module.NewsPage })));
const NewsDetailPage = React.lazy(() => import("./components/NewsDetailPage").then(module => ({ default: module.NewsDetailPage })));
const ProfilePage = React.lazy(() => import("./components/ProfilePage").then(module => ({ default: module.ProfilePage })));
const NotFound = React.lazy(() => import("./components/NotFound").then(module => ({ default: module.NotFound })));
const ReportIssuePage = React.lazy(() => import("./components/ReportIssuePage").then(module => ({ default: module.ReportIssuePage })));
const AdminIssuesPage = React.lazy(() => import("./components/AdminIssuesPage").then(module => ({ default: module.AdminIssuesPage })));
const SettingsPage = React.lazy(() => import("./components/SettingsPage").then(module => ({ default: module.SettingsPage })));
import { AdminRoute } from "./components/AdminRoute";
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard").then(module => ({ default: module.AdminDashboard })));
const CertificatePage = React.lazy(() => import("./components/CertificatePage").then(module => ({ default: module.CertificatePage })));
const CertificatesPage = React.lazy(() => import("./components/CertificatesPage").then(module => ({ default: module.CertificatesPage })));
const CareersPage = React.lazy(() => import("./components/CareersPage").then(module => ({ default: module.CareersPage })));
const ContactPage = React.lazy(() => import("./components/ContactPage").then(module => ({ default: module.ContactPage })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "playground", Component: PlaygroundPage },
      { path: "playground/:slug", Component: CodingWorkspace },
      { path: "about", Component: AboutPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-of-service", Component: TermsOfServicePage },
      { path: "cookie-policy", Component: CookiePolicyPage },
      { path: "security", Component: SecurityPage },
      { path: "fraud-alert", Component: FraudAlertPage },
      { path: "jobs", Component: JobsPage },
      { path: "jobs/:id", Component: JobDetailPage },
      { path: "admin/post-job", element: <AdminRoute><AdminJobsPage /></AdminRoute> },
      { path: "admin/issues", element: <AdminRoute><AdminIssuesPage /></AdminRoute> },
      { path: "admin/dashboard", element: <AdminRoute><AdminDashboard /></AdminRoute> },
      { path: "learn", Component: LearningHub },
      { path: "learn/:id", Component: CoursePage },
      { path: "learn-path/:courseId", Component: CourseMaterialPage },
      { path: "assessments", Component: AssessmentsPage },
      { path: "assessments/:id", Component: TestPage },
      { path: "assessments/:id/leaderboard", Component: LeaderboardPage },
      { path: "dashboard", Component: Dashboard },
      { path: "certificates", Component: CertificatesPage },
      { path: "ai-match", Component: AIResumePage },
      { path: "profile", Component: ProfilePage },
      { path: "settings", Component: SettingsPage },
      { path: "news", Component: NewsPage },
      { path: "news/:id", Component: NewsDetailPage },
      { path: "report-issue", Component: ReportIssuePage },
      { path: "certificate/:courseId", Component: CertificatePage },
      { path: "careers", Component: CareersPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/recruiter/login",
    element: <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><RecruiterLogin /></React.Suspense>,
  },
  {
    path: "/recruiter/register",
    element: <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><RecruiterSignup /></React.Suspense>,
  },
  {
    path: "/recruiter/dashboard",
    element: <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><RecruiterDashboard /></React.Suspense>,
  },
  {
    path: "/recruiter/post-job",
    element: <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><JobPostingForm /></React.Suspense>,
  }
]);
