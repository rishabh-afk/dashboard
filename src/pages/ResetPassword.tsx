import { toast } from "react-toastify";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { useDispatch } from "react-redux";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../features/auth/authSlice";
import OtpVerification from "../components/common/OTPinput";
import { getUrl } from "../data/generalFunctions";

const ResetPassword: React.FC = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const isAccessToken = localStorage.getItem("accessToken");
  const [isModalVisible, setIsModalVisible] = useState(
    isAccessToken ? false : true
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleGoBack = () => {
    const state = { email: email };
    navigate("/forgot-password", { state });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response: any = await dispatch(resetPassword({ password }) as any);
      if (response?.payload && response?.payload?._id) {
        const url = getUrl(response?.payload?.allowedTabs);
        return navigate(url ?? "/not-allowed", {
          replace: true,
          preventScrollReset: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  return (
    <div className="h-auto lg:h-screen w-full flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center">
      <div className="w-full lg:w-3/5 h-[50vh] lg:h-full flex flex-col justify-center lg:justify-end items-center lg:items-start p-8 lg:p-16 bg-primary">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Reset Password!
        </h1>
        <p className="text-lg text-center lg:text-left md:text-2xl text-white mt-2">
          Reset password to access your account.
        </p>
      </div>
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center">
        {isModalVisible ? (
          <OtpVerification
            email={email}
            handleGoBack={handleGoBack}
            setIsModalVisible={setIsModalVisible}
          />
        ) : (
          <form onSubmit={handleSubmit} className="px-6 w-full">
            <div className="w-full flex-col mt-5 flex justify-center items-center">
              <div className="flex justify-between items-center w-full border-b border-gray-300 py-2 mb-5">
                <input
                  className="outline-none w-full px-2"
                  required
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  pattern=".{8,}"
                  title="Password must be at least 8 characters long."
                />
                {showPassword ? (
                  <IoMdEye
                    className="min-w-5"
                    onClick={() => setShowPassword(false)}
                    size={25}
                  />
                ) : (
                  <IoEyeOff
                    className="min-w-5"
                    onClick={() => setShowPassword(true)}
                    size={25}
                  />
                )}
              </div>
              <div
                className={`flex justify-between items-center w-full border-b border-gray-300 py-2 mb-5`}
              >
                <input
                  required
                  name="confirmPassword"
                  className="outline-none w-full px-2"
                  placeholder="Confirm password"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleChange}
                />
                {showConfirmPassword ? (
                  <IoMdEye
                    className="min-w-5"
                    onClick={() => setShowConfirmPassword(false)}
                    size={25}
                  />
                ) : (
                  <IoEyeOff
                    className="min-w-5"
                    onClick={() => setShowConfirmPassword(true)}
                    size={25}
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 mx-auto w-full hover:bg-blue-600 transition-all duration-200 ease-linear text-white text-xl font-semibold py-2 rounded-full focus:outline-none focus:shadow-outline"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
