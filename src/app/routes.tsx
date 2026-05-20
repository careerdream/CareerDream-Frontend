import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { PlaygroundPage } from "./components/PlaygroundPage";
import { CodingWorkspace } from "./components/CodingWorkspace";
import { LandingPage } from "./components/LandingPage";
import { JobsPage } from "./components/JobsPage";
import { JobDetailPage } from "./components/JobDetailPage";
import { AdminJobsPage } from "./components/AdminJobsPage";
import { LearningHub } from "./components/LearningHub";
import { CoursePage } from "./components/CoursePage";
import { AssessmentsPage } from "./components/AssessmentsPage";
import { TestPage } from "./components/TestPage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { Dashboard } from "./components/Dashboard";
import { AIResumePage } from "./components/AIResumePage";
import { AboutPage } from "./components/AboutPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { CookiePolicyPage } from "./components/CookiePolicyPage";
import { SecurityPage } from "./components/SecurityPage";
import { FraudAlertPage } from "./components/FraudAlertPage";
import { CourseMaterialPage } from "./components/CourseMaterialPage";
import { RecruiterLogin } from "./components/RecruiterLogin";
import { RecruiterSignup } from "./components/RecruiterSignup";
import { RecruiterDashboard } from "./components/RecruiterDashboard";
import { JobPostingForm } from "./components/JobPostingForm";
import { NewsPage } from "./components/NewsPage";
import { NewsDetailPage } from "./components/NewsDetailPage";
import { ProfilePage } from "./components/ProfilePage";
import { NotFound } from "./components/NotFound";
import { ReportIssuePage } from "./components/ReportIssuePage";
import { AdminIssuesPage } from "./components/AdminIssuesPage";
import { SettingsPage } from "./components/SettingsPage";
import { AdminRoute } from "./components/AdminRoute";
import { AdminDashboard } from "./components/AdminDashboard";

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
      { path: "ai-match", Component: AIResumePage },
      { path: "profile", Component: ProfilePage },
      { path: "settings", Component: SettingsPage },
      { path: "news", Component: NewsPage },
      { path: "news/:id", Component: NewsDetailPage },
      { path: "report-issue", Component: ReportIssuePage },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/recruiter/login",
    Component: RecruiterLogin,
  },
  {
    path: "/recruiter/register",
    Component: RecruiterSignup,
  },
  {
    path: "/recruiter/dashboard",
    Component: RecruiterDashboard,
  },
  {
    path: "/recruiter/post-job",
    Component: JobPostingForm,
  },
]);
