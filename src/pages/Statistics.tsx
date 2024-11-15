import React from "react";

const StatisticalCharts = React.lazy(
  () => import("../components/dashboard/StatisticalChart")
);

const Statistics = () => {
  return (
    <>
      <StatisticalCharts />
    </>
  );
};

export default Statistics;
