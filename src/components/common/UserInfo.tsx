import React from "react";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";

const UserInfo: React.FC = () => {
  const data = useSelector((state: any) => state.auth.user);
  return (
    <div className="w-96 mx-auto absolute right-0 top-14 bg-primary text-white rounded-lg shadow-lg">
      <div className="flex gap-5 items-center border-b border-b-white p-4">
        <div className="flex items-center justify-center">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl text-primary">
                {data.firstName.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="font-bold flex gap-2 items-center text-2xl">
            {data.firstName} {data.lastName}{" "}
            <span>
              <MdVerified />
            </span>
          </p>
          <p className="text-sm text-white/80">{data.email} </p>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
