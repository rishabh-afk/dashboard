import { toast } from "react-toastify";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { getUrl } from "../data/generalFunctions";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = "Email ID is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email ID is invalid.";

    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response: any = await dispatch(loginUser({ email, password }));
        if (response?.payload && response?.payload?._id) {
          const url = getUrl(response?.payload?.allowedTabs);
          return navigate(url ?? "/not-allowed", {
            replace: true,
            preventScrollReset: true,
          });
        }
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log("Login error: " + error);
        toast.error("Failed to login");
      }
    }
  };

  return (
    <div className="h-auto lg:h-screen w-full flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center">
      <div className="w-full lg:w-3/5 h-[50vh] lg:h-full flex flex-col justify-center lg:justify-end items-center lg:items-start p-8 lg:p-16 bg-primary">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Welcome Back!
        </h1>
        <p className="text-lg md:text-2xl text-white mt-2">
          Login to access your account.
        </p>
      </div>
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-semibold mb-7 text-primary">
          Login into Your Account
        </h1>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block text-base font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Email ID*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`shadow-sm border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="yourname@company.com"
            />
            {errors.email && (
              <p className="text-red-500 font-semibold text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              className="block text-base font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`shadow-sm border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 font-semibold text-xs mt-1">
                {errors.password}
              </p>
            )}
            <div className="flex justify-between mt-1 items-center mb-4">
              <div className="flex items-center justify-start">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="mr-1 w-4 h-4"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 mx-auto w-full hover:bg-blue-600 transition-all duration-200 ease-linear text-white text-xl font-semibold py-2 rounded-full focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
