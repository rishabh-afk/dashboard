import React from "react";
import { RootState } from "../app/store";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { endpoints } from "../data/endpoints";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { isButtonAllowedToShow } from "../data/generalFunctions";
import SkeletonLoader from "../components/common/SkeletonLoader";

const Table = React.lazy(() => import("../components/table/Table"));

const columns = [
  { key: "firstName", label: "First Name", isSortable: true },
  { key: "lastName", label: "Last Name", isSortable: true },
  { key: "mobile", label: "Phone", isSortable: true },
  { key: "email", label: "Email", isSortable: false },
  { key: "role", label: "Role", isSortable: true },
  {
    key: "createdAt",
    label: "Created At",
    isSortable: true,
    isDate: true,
    dateFormat: "dd/MM/yyyy",
  },
];

const filterOptions = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobile" },
  { label: "Name", value: "firstName" },
];

const Users = () => {
  const formType = "Users";
  const navigate = useNavigate();
  const allowedTabs = useSelector(
    (state: RootState) => state.auth.user.allowedTabs
  );
  const { data, loading, error, isCached } = useFetch(
    `${endpoints[formType].fetchAll}?role=vendor`
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  if (loading && !updatedData && !error) return <SkeletonLoader />;

  return (
    <div className="pt-[92px]">
      <div className="flex justify-between items-center mx-4 mb-2">
        <p className="font-semibold text-3xl">Manage Users</p>
        {isButtonAllowedToShow("Create", "Manage Users", allowedTabs) && (
          <Button
            text="+ Add User"
            classes="bg-primary text-white"
            onClick={() => navigate("/users/create-user")}
          />
        )}
      </div>
      <Table
        classes="pt-0"
        columns={columns}
        formType={formType}
        isCached={isCached}
        responseData={updatedData}
        filterOptions={filterOptions}
        paginationData={paginationData}
        SearchPlaceholder="Search By Name , Email , Phone , role etc."
        isEdit={isButtonAllowedToShow("Edit", "Manage Users", allowedTabs)}
        isDelete={isButtonAllowedToShow("Delete", "Manage Users", allowedTabs)}
      />
    </div>
  );
};

export default Users;
