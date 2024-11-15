import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotAllowed from "../pages/NotAllowed";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredPermission="View Dashboard">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/not-allowed" element={<NotAllowed />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
