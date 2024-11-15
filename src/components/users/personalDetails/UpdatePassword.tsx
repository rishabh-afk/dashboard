import { useState } from "react";
import { toast } from "react-toastify";
import Password from "../../input/Password";
import { Post } from "../../../utils/apiUtils";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const field = {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your old password",
    confirmPlaceholder: "Enter your new password",
  };
  const handleInputChange = async () => {
    if (formData.password && formData.password.length < 8)
      return toast.warn("Old Password Must be at least 8 characters");
    else if (formData.confirmPassword && formData.confirmPassword.length < 8)
      return toast.warn("New Password Must be at least 8 characters");
    else if (formData && formData.password === formData.confirmPassword)
      return toast.warn("Passwords must not be match");
    let data = {
      id: "",
      oldPassword: formData?.password,
      newPassword: formData?.confirmPassword,
    };
    if (id) data.id = id;
    const response: any = await Post("vendors/reset-password", data);
    if (
      response.success &&
      !id &&
      response?.message === "Password reset successfully."
    ) {
      localStorage.clear();
      navigate("/login");
    } else if (id && response?.message === "Password reset successfully.")
      navigate(-1);
  };
  return (
    <div>
      <div className="w-1/2">
        <Password field={field} setFormData={setFormData} />
        <div className="flex gap-3 items-center justify-start w-fit">
          <button
            type="button"
            onClick={handleInputChange}
            className="mt-5 w-full whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg"
          >
            Update Password
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
