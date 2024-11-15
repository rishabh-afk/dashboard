import CustomRouter from "./routes/Router";
import { useLocation, useNavigate } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { AppDispatch, RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout, setLoading } from "./features/auth/authSlice";
import { tabs } from "./data/tabs";

const Loader = React.lazy(() => import("./components/common/Loader"));

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    const fetchUser = async () => {
      const previousPath = localStorage.getItem("previousPath");
      if (refreshToken && accessToken) {
        localStorage.removeItem("previousPath");
        const { payload }: any = await dispatch(getCurrentUser() as any); // fetch current user details from server
        if (payload && payload.success) {
          const allowedTabs = payload?.data?.allowedTabs[0];
          const redirectUrl = tabs.find((tab) => tab.name === allowedTabs.name);
          if (redirectUrl)
            return navigate(previousPath ? previousPath : redirectUrl?.href, {
              replace: true,
              preventScrollReset: true,
            });
        } else {
          dispatch(logout());
          localStorage.clear();
          return navigate("/login");
        }
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!refreshToken || !accessToken) {
      dispatch(setLoading());
      return navigate(pathname ? pathname : "/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, refreshToken, accessToken]);

  if (isLoading && user.allowedTabs.length === 0)
    return (
      <Suspense>
        <Loader />
      </Suspense>
    );
  return <CustomRouter />;
};

export default App;
