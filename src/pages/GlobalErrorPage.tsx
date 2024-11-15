import React from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { getUrl } from "../data/generalFunctions";

interface GlobalErrorPageProps {
  errorMessage?: string;
}

const GlobalErrorPage: React.FC<GlobalErrorPageProps> = ({ errorMessage }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const tabs = useSelector((state: RootState) => state.auth.user.allowedTabs);

  const handleNavigation = () => {
    const url = getUrl(tabs);
    navigate(token && url ? url : token ? "/not-allowed" : "/login", {
      replace: true,
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white p-6 md:p-12 text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-700 text-xl mb-3 mt-3">
          The page you are looking for does not exist.
        </p>

        {errorMessage && (
          <div className="text-red-500 mb-4">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <button
          onClick={handleNavigation}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default GlobalErrorPage;
