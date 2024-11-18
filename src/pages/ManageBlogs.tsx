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
  { key: "_id", label: "ID", isSortable: false },
  { key: "title", label: "Title", isSortable: true },
  { key: "content", label: "Content", isSortable: true },
  { key: "status", label: "Status", isSortable: true },
  {
    isDate: true,
    isSortable: true,
    key: "createdAt",
    label: "Created At",
    dateFormat: "dd/MM/yyyy",
  },
];

const filterOptions = [
  { label: "code", value: "CODE" },
  { label: "type", value: "Type" },
  { label: "value", value: "Value" },
];

const ManageBlogs = () => {
  const formType = "Blogs";
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
        <p className="font-semibold text-3xl">Blogs</p>
        {isButtonAllowedToShow("Create", "Manage Blogs", allowedTabs) && (
          <Button
            text="+ Add Blog"
            classes="bg-primary text-white"
            onClick={() => navigate("/blogs/create-blog")}
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
        SearchPlaceholder="Search By code, type, value etc."
        isEdit={isButtonAllowedToShow("Edit", "Manage Blogs", allowedTabs)}
        isDelete={isButtonAllowedToShow("Delete", "Manage Blogs", allowedTabs)}
      />
    </div>
  );
};

export default ManageBlogs;
