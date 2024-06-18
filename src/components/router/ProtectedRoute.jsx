import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useBoundStore } from "../../store/useBoundStore";

export const ProtectedRoute = ({ children, protectedRoute }) => {
  const { user, registeredUser } = useBoundStore((state) => ({
    user: state.user,
    registeredUser: state.registeredUser,
  }));

  if (protectedRoute === "login") {
    if (
      user?.email !== registeredUser?.email ||
      user?.password !== registeredUser?.password ||
      !user?.isAuthenticated
    ) {
      return <Navigate to="/login" replace />;
    }
  } else if (protectedRoute === "register") {
    if (!registeredUser?.isAuthenticated) {
      return <Navigate to="/register" replace />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  protectedRoute: PropTypes.oneOf(["login", "register"]).isRequired,
};
