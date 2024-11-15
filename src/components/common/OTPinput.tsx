import { CiEdit } from "react-icons/ci";
import { Post } from "../../utils/apiUtils";
import React, { useState, useRef, useEffect } from "react";

const OtpVerification = ({
  email,
  setOtpLocal,
  handleGoBack,
  setIsModalVisible,
}: {
  email: any;
  setOtpLocal?: any;
  handleGoBack?: any;
  setIsModalVisible?: any;
}) => {
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Enable the verify button when all OTP digits are filled
  useEffect(() => {
    const isOtpComplete = otp.every((digit) => digit !== "");
    setIsButtonDisabled(!isOtpComplete);
  }, [otp]);

  // Timer countdown for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Handle case when pasting a 6-digit OTP
    if (value.length === 6 && index === 0) {
      const newOtp = value.split("").slice(0, 6);
      setOtp(newOtp);
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit;
        }
      });
      inputRefs.current[5].focus();
    } else if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input box
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleResend = async () => {
    setTimer(30);
    setIsResendDisabled(true);
    await Post("vendors/send-otp", { email: email });
    setOtp(Array(6).fill(""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    try {
      const response: any = await Post("vendors/verify-otp", {
        email: email,
        otp: otpCode,
      });
      if (response.success) {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white px-6 py-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary text-center mb-4">
          Enter OTP to verify your <br className="hidden bg:block" /> E-mail
        </h1>
        <p className="text-center text-sm font-semibold text-primary/70 mb-5">
          We&apos;ve sent an OTP to this E-mail Address <br />
          <span className="text-primary/70 pt-1 flex justify-center items-center font-semibold cursor-pointer">
            {email}{" "}
            <span
              onClick={handleGoBack}
              className="text-primary hover:text-primary/80 hover:underline text-xs pl-2 cursor-pointer"
            >
              <CiEdit size={18} />
            </span>
          </span>
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-6 gap-3 px-2 justify-center items-center mb-4"
        >
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric" // Opens numeric keyboard on mobile
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputRefs.current[index] = el as HTMLInputElement;
              }}
              className="w-full aspect-square text-center border focus:border-2 border-primary/30 rounded-md focus:outline-none focus:border-primary/70 text-lg" // Reduced font size
            />
          ))}
        </form>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className={`w-full py-2 text-white rounded-md transition text-xl duration-200 ${
            isButtonDisabled
              ? "bg-primary/30 cursor-not-allowed"
              : "bg-primary hover:bg-primary/80"
          }`}
        >
          Verify
        </button>
        <div className="text-center mt-2">
          {isResendDisabled ? (
            <p className="text-primary">Resend OTP in {timer}s</p>
          ) : (
            <p
              onClick={handleResend}
              className="text-primary hover:text-primary/80 hover:underline text-sm cursor-pointer"
            >
              Resend OTP
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
