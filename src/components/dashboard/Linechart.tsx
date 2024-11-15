import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ width = 300, height = 300 }) => {
  const data: ChartData<"line"> = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Sales",
        data: [75, 99, 90, 91, 97, 95, 40],
        borderColor: "blue",
        backgroundColor: "blue",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Monthly Sales Data" },
    },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} width={width} height={height} />;
};

export default LineChart;
