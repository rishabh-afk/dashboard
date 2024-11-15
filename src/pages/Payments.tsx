import React from "react";
import { demoData } from "../data/data";

const Table = React.lazy(() => import("../components/table/Table"));

const columns = [
  { key: "name", label: "Name", isSortable: true },
  { key: "phone", label: "Phone", isSortable: true },
  { key: "email", label: "Email", isSortable: true },
  { key: "state", label: "State", isSortable: true },
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

const Payments = () => {
  const data = demoData;
  const paginationData = {
    currentPage: 1,
    totalPages: demoData.length / 10,
    totalItems: demoData.length,
    itemsPerPage: 10,
  };
  return (
    <>
      <Table
        columns={columns}
        responseData={data}
        filterOptions={filterOptions}
        paginationData={paginationData}
        SearchPlaceholder="Search By Name , Email , Phone etc"
      />
    </>
  );
};

export default Payments;
