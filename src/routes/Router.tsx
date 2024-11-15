import React, { Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import CrudProtectedRoute from "./CRUDProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import { crudBasedRoutes, routes } from "../data/Routes";
import { Route, Routes, Navigate } from "react-router-dom";

const Login = React.lazy(() => import("../pages/Login"));
const NotAllowed = React.lazy(() => import("../pages/NotAllowed"));
const Loader = React.lazy(() => import("../components/common/Loader"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const GlobalErrorPage = React.lazy(() => import("../pages/GlobalErrorPage"));

const CustomRouter = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:email" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* TABS WISE ROUTING */}
            {routes.map(
              ({ path, component: Component, requiredPermission }, idx) => (
                <Route
                  key={idx}
                  path={path}
                  element={
                    <ProtectedRoute requiredPermission={requiredPermission}>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              )
            )}
            {/* CRUD BASED ROUTING */}
            {crudBasedRoutes.map(
              (
                { path, component: Component, requiredPermission, type },
                idx
              ) => (
                <Route
                  key={idx}
                  path={path}
                  element={
                    <CrudProtectedRoute
                      type={type}
                      requiredPermission={requiredPermission}
                    >
                      <Component />
                    </CrudProtectedRoute>
                  }
                />
              )
            )}

            {/* FOR ERROR HANDLING */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/not-allowed" element={<NotAllowed />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/not-found" element={<GlobalErrorPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default CustomRouter;
