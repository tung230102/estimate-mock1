import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import AppLayout from "../components/AppLayout";
import { useRefreshToken } from "../components/authentication/useRefreshToken";
import { useProfile } from "../components/users/useProfile";
import DashboardPage from "../pages/DashboardPage";
import ForgotPassPage from "../pages/ForgotPassPage";
import LoginPage from "../pages/LoginPage";
import PlayPage from "../pages/PlayPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import UsersPage from "../pages/UsersPage";

function AppRoutes() {
  const { refreshToken } = useRefreshToken();
  const { isRoles } = useProfile();

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<PlayPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
      </Route>

      {isRoles && (
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      )}

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassPage />} />

      <Route path="*" element={<h1>Page not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
