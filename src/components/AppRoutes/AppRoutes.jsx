import { Fragment, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../../common";
import ForgotPassPage from "../../pages/ForgotPassPage";
import LoginPage from "../../pages/LoginPage";
import PageNotFound from "../../pages/PageNotFound";
import RegisterPage from "../../pages/RegisterPage";
import { routes } from "../../routes/index";
import AuthRouter from "../AuthRouter";

const DefaultLayout = lazy(() => import("../../layout"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassPage />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route>
        {routes.map(({ path, component: Component, layout, isPrivate }) => {
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
                <AuthRouter isPrivate={isPrivate}>
                  <Layout>
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
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
