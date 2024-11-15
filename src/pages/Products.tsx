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
  { key: "name", label: "Product Name", isSortable: true },
  { key: "brandName", label: "Brand Name", isSortable: true },
  { key: "soldCount", label: "Sold", isSortable: true },
  { key: "returnDays", label: "Return (days)", isSortable: true },
  { key: "isPublished", label: "Is Active", isSortable: true },
  {
    key: "createdAt",
    label: "Created At",
    isSortable: true,
    isDate: true,
    dateFormat: "dd/MM/yyyy",
  },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
];

const Products = () => {
  const formType = "Products";
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
        <p className="font-semibold text-3xl">Manage Products</p>
        <div className="flex gap-2 items-center">
          {userRole === "admin" &&
            isButtonAllowedToShow("Create", "Manage Products", allowedTabs) && (
              <Button
                text="View Sub-Categories"
                classes="bg-white text-primary"
                onClick={() => navigate("/products/sub-categories")}
              />
            )}
          {userRole === "admin" &&
            isButtonAllowedToShow("Create", "Manage Products", allowedTabs) && (
              <Button
                text="View Categories"
                classes="bg-white text-primary"
                onClick={() => navigate("/products/categories")}
              />
            )}
          {isButtonAllowedToShow("Create", "Manage Products", allowedTabs) && (
            <Button
              text="+ Add Product"
              classes="bg-primary text-white"
              onClick={() => navigate("/products/create-product")}
            />
          )}
        </div>
      </div>
      <Table
        classes="pt-0"
        columns={columns}
        formType={formType}
        isCached={isCached}
        responseData={updatedData}
        filterOptions={filterOptions}
        paginationData={paginationData}
        SearchPlaceholder="Search By Name , Product Name etc"
        isEdit={isButtonAllowedToShow("Edit", "Manage Products", allowedTabs)}
        isDelete={isButtonAllowedToShow(
          "Delete",
          "Manage Products",
          allowedTabs
        )}
      />
    </div>
  );
};

export default Products;
