import {
  UsersManagementPage,
  DashboardPage,
  HomePage,
  LoginPage,
  RegisterPage,
  RegisterAnimation,
  ResetPasswordPage,
} from "../../pages";

import { ProtectedRoute } from "./ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/userManagement",
    element: (
      <ProtectedRoute protectedRoute="login">
        <UsersManagementPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute protectedRoute="login">
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/registerAnimation",
    element: (
      <ProtectedRoute protectedRoute="register">
        <RegisterAnimation />
      </ProtectedRoute>
    ),
  },
  {
    path: "resetPassword",
    element: <ResetPasswordPage />,
  },
];
