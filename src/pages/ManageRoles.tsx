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
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobile" },
  { label: "Role", value: "role" },
];

const ManageRoles = () => {
  const formType = "Permissions";
  const navigate = useNavigate();
  const allowedTabs = useSelector(
    (state: RootState) => state.auth.user.allowedTabs
  );
  const { data, loading, error, isCached } = useFetch(
    endpoints[formType].fetchAll
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  if (loading && !updatedData && !error) return <SkeletonLoader />;

  return (
    <div className="pt-[92px]">
      <div className="flex justify-between items-center mx-4 mb-2">
        <p className="font-semibold text-3xl">Manage Roles</p>
        {isButtonAllowedToShow("Create", "Manage Roles", allowedTabs) && (
          <Button
            text="Create Role"
            classes="bg-primary text-white"
            onClick={() => navigate("/manage-roles/create-role")}
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
        SearchPlaceholder="Search By Name , Email , Phone etc"
        isEdit={isButtonAllowedToShow("Edit", "Manage Roles", allowedTabs)}
        isDelete={isButtonAllowedToShow("Delete", "Manage Roles", allowedTabs)}
      />
    </div>
  );
};

export default ManageRoles;
