import { lazy } from "react";
import { HeaderOnly } from "../layouts";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const PlayPage = lazy(() => import("../pages/PlayPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const QuestionsPage = lazy(() => import("../pages/QuestionsPage"));
const UsersPage = lazy(() => import("../pages/UsersPage"));
const AnswerPage = lazy(() => import("../pages/AnswerPage"));

const routes = [
  {
    path: "/play",
    component: PlayPage,
    layout: HeaderOnly,
    permissions: ["user"],
  },
  {
    path: "/profile",
    component: ProfilePage,
    layout: HeaderOnly,
    permissions: ["admin", "user"],
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    permissions: ["admin"],
  },
  {
    path: "/users",
    title: "Users Managements",
    component: UsersPage,
    permissions: ["admin"],
  },
  {
    path: "/questions",
    title: "Questions Managements",
    component: QuestionsPage,
    permissions: ["admin"],
  },
  {
    path: "/questions/:id",
    title: "Answers Managements",
    component: AnswerPage,
    permissions: ["admin"],
  },
];

export { routes };
