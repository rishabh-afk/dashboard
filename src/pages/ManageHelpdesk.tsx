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
  { key: "requesterName", label: "Username", isSortable: true },
  { key: "assigneeName", label: "Assignee to", isSortable: true },
  { key: "priority", label: "Priority", isSortable: true },
  { key: "status", label: "Status", isSortable: false },
  {
    key: "resolutionDate",
    label: "Resolve At",
    isSortable: true,
    isDate: true,
    dateFormat: "dd/MM/yyyy",
  },
  {
    key: "dueDate",
    label: "Due Date",
    isSortable: true,
    isDate: true,
    dateFormat: "dd/MM/yyyy",
  },
  {
    key: "createdAt",
    label: "Raised At",
    isSortable: true,
    isDate: true,
    dateFormat: "dd/MM/yyyy",
  },
];

const filterOptions = [
  { label: "priority", value: "Priority" },
  { label: "status", value: "Status" },
];

const ManageHelpdesk = () => {
  const formType = "HelpDesk";
  const navigate = useNavigate();
  const allowedTabs = useSelector(
    (state: RootState) => state.auth.user.allowedTabs
  );
  const userRole = useSelector((state: RootState) => state.auth.user.role);
  const { data, loading, error, isCached } = useFetch(
    endpoints[formType].fetchAll
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  if (loading && !updatedData && !error) return <SkeletonLoader />;

  return (
    <div className="pt-[92px]">
      <div className="flex justify-between items-center mx-4 mb-2">
        <p className="font-semibold text-3xl">Tickets</p>
        {userRole === "admin" &&
          isButtonAllowedToShow("Create", "Help Desk", allowedTabs) && (
            <Button
              text="Manage Agents"
              classes="bg-primary text-white"
              onClick={() => navigate("/help-desk/manage-agent")}
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
        SearchPlaceholder="Search By Priority . status etc."
        isEdit={isButtonAllowedToShow("Edit", "Help Desk", allowedTabs)}
        isDelete={isButtonAllowedToShow("Delete", "Help Desk", allowedTabs)}
      />
    </div>
  );
};

export default ManageHelpdesk;
