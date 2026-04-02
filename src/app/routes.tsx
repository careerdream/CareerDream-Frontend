import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LandingPage } from "./components/LandingPage";
import { JobsPage } from "./components/JobsPage";
import { JobDetailPage } from "./components/JobDetailPage";
import { LearningHub } from "./components/LearningHub";
import { CoursePage } from "./components/CoursePage";
import { AssessmentsPage } from "./components/AssessmentsPage";
import { TestPage } from "./components/TestPage";
import { Dashboard } from "./components/Dashboard";
import { AIResumePage } from "./components/AIResumePage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "jobs", Component: JobsPage },
      { path: "jobs/:id", Component: JobDetailPage },
      { path: "learn", Component: LearningHub },
      { path: "learn/:id", Component: CoursePage },
      { path: "assessments", Component: AssessmentsPage },
      { path: "assessments/:id", Component: TestPage },
      { path: "dashboard", Component: Dashboard },
      { path: "ai-match", Component: AIResumePage },
      { path: "profile", Component: Dashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
