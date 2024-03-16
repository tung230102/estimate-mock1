import { Navigate } from "react-router-dom";
import { isAuthenticated, userDataLocalStorage } from "../../utils";

const AuthRouter = ({ children, isPrivate }) => {
  const isLoggedIn = isAuthenticated();
  const { isRoles } = userDataLocalStorage();

  if (isPrivate && !isRoles) {
    return <Navigate to="/404" replace />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRouter;
