import React from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { isAllowed } from "../utils/permission";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredPermission: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
}) => {
  const { pathname } = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const hasPermission = user
    ? isAllowed(user.role, requiredPermission, user.allowedTabs)
    : false;

  if (isLoading) return <Loader />;

  if (!user) return <Navigate to="/login" />;
  if (!hasPermission && !isLoading) return <Navigate to="/not-allowed" />;

  if (
    pathname &&
    pathname !== "/not-found" &&
    pathname !== "/not-allowed" &&
    pathname !== "/login"
  )
    localStorage.setItem("previousPath", pathname);

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
