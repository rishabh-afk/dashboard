import React from "react";
import { RootState } from "../app/store";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { endpoints } from "../data/endpoints";
// import { useNavigate } from "react-router-dom";
// import Button from "../components/common/Button";
import SkeletonLoader from "../components/common/SkeletonLoader";
import { isButtonAllowedToShow } from "../data/generalFunctions";

const Table = React.lazy(() => import("../components/table/Table"));

const columns = [
  { key: "_id", label: "ID", isSortable: false },
  { key: "fullName", label: "User Name" },
  { key: "productName", label: "Product Name", isSortable: true },
  { key: "rating", label: "Ratings", isSortable: true },
  { key: "comment", label: "comment" },
  { key: "isPublish", label: "Active Status", isSortable: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Product", value: "productName" },
];

const Reviews = () => {
  const formType = "Reviews";
  // const navigate = useNavigate();
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
      {/* <div className="flex justify-between items-center mx-4 mb-2">
        <p className="font-semibold text-3xl">Manage Reviews</p>
        {isButtonAllowedToShow("Create", "Manage Reviews", allowedTabs) && (
          <Button
            text="+ Add Review"
            classes="bg-primary text-white"
            onClick={() => navigate("/reviews/create-review")}
          />
        )}
      </div> */}
      <Table
        classes="pt-0"
        columns={columns}
        formType={formType}
        isCached={isCached}
        responseData={updatedData}
        filterOptions={filterOptions}
        paginationData={paginationData}
        SearchPlaceholder="Search By Name , Email , Phone etc"
        isEdit={isButtonAllowedToShow("Edit", "Manage Reviews", allowedTabs)}
        isDelete={isButtonAllowedToShow(
          "Delete",
          "Manage Reviews",
          allowedTabs
        )}
      />
    </div>
  );
};

export default Reviews;
