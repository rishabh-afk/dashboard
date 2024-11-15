import { toast } from "react-toastify";
import React, { useState } from "react";
import { Post } from "../utils/apiUtils";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState(state && state?.email ? state.email : "");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string } = {};

    if (!email) newErrors.email = "Email ID is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email ID is invalid.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response: any = await Post("vendors/send-otp", { email: email });
        if (
          (response && response?.message === "OTP sent successfully.") ||
          response?.message === "OTP already sent for this email."
        )
          return navigate(`/reset-password/${email}`, { replace: true });
        else setEmail("");
      } catch (error) {
        console.log("Login error: " + error);
        toast.error("Failed to login");
      }
    }
  };
  return (
    <div className="h-auto lg:h-screen w-full flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center">
      <div className="w-full lg:w-3/5 h-[50vh] lg:h-full flex flex-col justify-center lg:justify-end items-center lg:items-start p-8 lg:p-16 bg-primary">
        <h1 className="text-3xl md:text-5xl font-semibold text-white">
          Forgot Password?
        </h1>
        <p className="text-lg text-center lg:text-left md:text-2xl text-white mt-2">
          Create password to access your account.
        </p>
      </div>
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center p-6">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="">
            <label
              className="block text-base font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Enter your registered email
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
          <span className="flex justify-center items-center mt-1">
            <Link to="/login" className="text-sm text-blue-500 hover:underline">
              Login with Password?
            </Link>
          </span>
          <div className="w-full flex mt-5 justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 mx-auto w-full hover:bg-blue-600 transition-all duration-200 ease-linear text-white text-xl font-semibold py-2 rounded-full focus:outline-none focus:shadow-outline"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
