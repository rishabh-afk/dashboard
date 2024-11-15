import React from "react";
import { tabs } from "../data/tabs";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import { isCrudAllowed } from "../utils/permission";
import { Navigate, useLocation } from "react-router-dom";

interface CrudProtectedRouteProps {
  type: string;
  children: JSX.Element;
  requiredPermission: string;
}

const CrudProtectedRoute: React.FC<CrudProtectedRouteProps> = ({
  type,
  children,
  requiredPermission,
}) => {
  const { pathname } = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const hasPermission = user
    ? isCrudAllowed(user.role, type, requiredPermission, tabs, user.allowedTabs)
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

  return <Layout hideTopBottom={true}>{children}</Layout>;
};

export default CrudProtectedRoute;
