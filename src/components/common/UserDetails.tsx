import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../modals/LogoutModal";
// import { RiArrowDropDownLine } from "react-icons/ri";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
// import UserInfo from "./UserInfo";

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const [details, showDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleClose = () => setIsVisible(false);

  return (
    <div className="w-2/5 text-gray-500 flex justify-center items-center">
      <LogoutModal
        isVisible={isVisible}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
      <span className="border-r border-gray-400 pr-4 flex justify-center items-center gap-3">
        <span className="flex flex-col text-right">
          <span className="capitalize font-bold">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="capitalize text-xs">
            {(user as { role: any })?.role}
          </span>
        </span>
        <span className="w-12 h-12 aspect-square text-3xl pb-1 text-gray-600 capitalize flex justify-center items-center rounded-full bg-gray-300">
          {user?.firstName?.charAt(0)}
        </span>
        {/* <span className="relative">
          <RiArrowDropDownLine
            size={30}
            title="See Details"
            // onClick={() => showDetails(!details)}
            className="cursor-pointer rounded-full transition-all duration-200 ease-linear hover:bg-gray-400 hover:text-white p-1"
          />
          {details && <UserInfo />}
        </span> */}
      </span>
      <span className="flex items-center pl-5 gap-2">
        <FaRegBell
          title="Notification"
          size={35}
          className="cursor-pointer rounded-lg transition-all duration-200 ease-linear hover:bg-gray-200 p-1"
        />
        <MdLogout
          size={35}
          title="Logout"
          onClick={() => setIsVisible(true)}
          className="cursor-pointer rounded-lg hover:bg-gray-400 hover:text-white p-1"
        />
      </span>
    </div>
  );
};

export default UserDetails;
