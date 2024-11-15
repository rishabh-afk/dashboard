import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { getUrl } from "../data/generalFunctions";

const NotAllowed = () => {
  const navigate = useNavigate();
  const tabs = useSelector((state: RootState) => state.auth.user.allowedTabs);

  const handleNavigate = () => {
    const url = getUrl(tabs);
    navigate(url ?? "/not-allowed"); // Change the route according to your setup
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4 animate-bounce">
          Access Denied
        </h1>
        <p className="text-xl mb-8">
          You do not have permission to view this page.
        </p>
        <button
          onClick={handleNavigate}
          className="bg-white text-red-600 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotAllowed;
