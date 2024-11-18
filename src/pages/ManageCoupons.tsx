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
  { key: "code", label: "Code", isSortable: true },
  { key: "type", label: "Type", isSortable: true },
  { key: "value", label: "Value", isSortable: true },
  { key: "usageLimit", label: "Limit", isSortable: true },
  { key: "minimumSpend", label: "Min.", isSortable: true },
  { key: "maximumSpend", label: "Max.", isSortable: true },
  {
    isDate: true,
    isSortable: true,
    key: "expiryDate",
    label: "Expired At",
    dateFormat: "dd/MM/yyyy",
  },
];

const filterOptions = [
  { label: "code", value: "CODE" },
  { label: "type", value: "Type" },
  { label: "value", value: "Value" },
];

const ManageCoupons = () => {
  const formType = "Coupons";
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
        <p className="font-semibold text-3xl">Coupons</p>
        {isButtonAllowedToShow("Create", "Manage Coupons", allowedTabs) && (
          <Button
            text="+ Create Coupon"
            classes="bg-primary text-white"
            onClick={() => navigate("/coupons/create-coupon")}
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
        isEdit={isButtonAllowedToShow("Edit", "Help Desk", allowedTabs)}
        isDelete={isButtonAllowedToShow("Delete", "Help Desk", allowedTabs)}
      />
    </div>
  );
};

export default ManageCoupons;
