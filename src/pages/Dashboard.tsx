import React from "react";

const LineChart = React.lazy(() => import("../components/dashboard/Linechart"));

const Dashboard = () => {
  return (
    <>
      <div className="my-8 py-4 rounded-xl">
        <div className="flex flex-wrap justify-center max-w-full">
          <div className="w-full md:w-1/2 px-4">
            <LineChart />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <LineChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
