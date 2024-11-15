import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  RadialLinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StatisticalCharts: React.FC = () => {
  // Data for Bar Chart
  const barData: ChartData<"bar"> = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 2000, 4000, 5000],
        backgroundColor: "rgba(53, 162, 235)",
      },
      {
        label: "Revenue",
        data: [2500, 1500, 3500, 4500],
        backgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  // Options for Bar Chart
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quarterly Sales & Revenue",
      },
    },
  };

  // Data for Pie Chart
  const pieData: ChartData<"pie"> = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        data: [300, 150, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  // Options for Pie Chart
  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Distribution",
      },
    },
  };

  return (
    <div className="p-4 my-16 grid grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-4 space-y-5">
        <Bar data={barData} options={barOptions} />
        <Bar data={barData} options={barOptions} />
      </div>

      <div className="bg-white p-4">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default StatisticalCharts;
