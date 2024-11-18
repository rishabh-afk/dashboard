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
  { key: "url", label: "URL", isSortable: true },
  { key: "metaTitle", label: "Title", isSortable: true },
  { key: "canonicalUrl", label: "Canonical URL", isSortable: true },
];

const filterOptions = [
  { label: "code", value: "CODE" },
  { label: "type", value: "Type" },
  { label: "value", value: "Value" },
];

const ManageSEO = () => {
  const formType = "SEO";
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
        <p className="font-semibold text-3xl">Search Engine Optimization</p>
        {isButtonAllowedToShow("Create", "SEO (Meta Data)", allowedTabs) && (
          <Button
            text="+ Add Data"
            classes="bg-primary text-white"
            onClick={() => navigate("/seo/create-seo")}
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
        isEdit={isButtonAllowedToShow("Edit", "SEO (Meta Data)", allowedTabs)}
        isDelete={isButtonAllowedToShow(
          "Delete",
          "SEO (Meta Data)",
          allowedTabs
        )}
      />
    </div>
  );
};

export default ManageSEO;
