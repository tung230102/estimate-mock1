import { lazy } from "react";
import { HeaderOnly } from "../layout";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const PlayPage = lazy(() => import("../pages/PlayPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const QuestionsPage = lazy(() => import("../pages/QuestionsPage"));
const UsersPage = lazy(() => import("../pages/UsersPage"));
const AnswerPage = lazy(() => import("../pages/AnswerPage"));

const routes = [
  {
    path: "/play",
    title: "Play",
    component: PlayPage,
    layout: HeaderOnly,
    isPrivate: false,
  },
  {
    path: "/profile",
    title: "Profile",
    component: ProfilePage,
    layout: HeaderOnly,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    component: DashboardPage,
    isPrivate: true,
  },
  {
    path: "/users",
    title: "Users Managements",
    component: UsersPage,
    isPrivate: true,
  },
  {
    path: "/questions",
    title: "Questions Managements",
    component: QuestionsPage,
    isPrivate: true,
  },
  {
    path: "/questions/:id",
    title: "Answers Managements",
    component: AnswerPage,
    isPrivate: true,
  },
];

export { routes };
