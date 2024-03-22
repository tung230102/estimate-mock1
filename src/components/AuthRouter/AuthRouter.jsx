import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "~/common";
import { isAuthenticated, userDataLocalStorage } from "~/utils";

const AuthRouter = ({ children, permissions }) => {
  const isLoggedIn = isAuthenticated();
  const { userData } = userDataLocalStorage();

  const hasPermission = () => {
    if (!permissions) return true;

    return permissions.some((permission) =>
      userData?.role?.includes(permission)
    );
  };

  if (!hasPermission()) {
    return <Navigate to="/404" replace />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default AuthRouter;
