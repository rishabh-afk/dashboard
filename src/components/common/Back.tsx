import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <p className="inline-flex gap-2 items-center pl-4 pt-4">
      <span
        onClick={handleGoBack}
        className="w-9 h-9 bg-blue-300 hover:bg-blue-400 cursor-pointer transition-all duration-150 ease-linear flex justify-center items-center text-white rounded-full"
      >
        <IoArrowBack size={27} />
      </span>
      <span className="font-semibold text-lg text-blue-400">Go Back</span>
    </p>
  );
};

export default Back;
