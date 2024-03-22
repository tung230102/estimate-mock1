import { Fragment, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "~/pages/ForgotPasswordPage";
import LoginPage from "~/pages/LoginPage";
import PageNotFound from "~/pages/PageNotFound";
import RegisterPage from "~/pages/RegisterPage";
import { routes } from "~/routes/index";
import AuthRouter from "../AuthRouter";

const DefaultLayout = lazy(() => import("~/layouts"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route>
        {routes.map(({ path, component: Component, layout, permissions }) => {
          let Layout = DefaultLayout;

          if (layout) {
            Layout = layout;
          } else if (layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={path}
              path={path}
              element={
                <AuthRouter permissions={permissions}>
                  <Layout>
                    <Component />
                  </Layout>
                </AuthRouter>
              }
            />
          );
        })}
      </Route>

      <Route path="/" element={<Navigate to="/play" replace />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
}

export default AppRoutes;
