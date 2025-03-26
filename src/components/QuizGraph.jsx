import React, { useState } from "react";
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
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const QuizGraph = () => {
  const [timeFrame, setTimeFrame] = useState("Monthly");

  // Sample data for each time frame
  const dataSets = {
    Monthly: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      data: [80, 20, 60, 70, 80, 50, 40, 70, 45, 90, 30, 60],
    },
    Weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [65, 75, 85, 55],
    },
    Daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [50, 60, 70, 80, 90, 40, 30],
    },
  };

  const currentData = dataSets[timeFrame];

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Quiz Score",
        data: currentData.data,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#004692",
        pointBorderColor: "#39FF14",
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
          font: { weight: "bold" },
        },
      },
      title: {
        display: true,
        text: `${timeFrame} Quiz Data`,
        color: "#39FF14",
        font: { size: 22, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "#000E1B",
        titleColor: "#39FF14",
        bodyColor: "#FFFFFF",
        borderColor: "#004692",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: { color: "#FFFFFF" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: "#FFFFFF",
          stepSize: 20,
        },
        grid: {
          color: "rgba(57, 255, 20, 0.1)",
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutCubic",
      delay: (context) => {
        let delay = 0;
        if (
          context.type === "data" &&
          context.mode === "default" &&
          !context.dropped
        ) {
          delay = context.dataIndex * 120 + context.datasetIndex * 50;
          context.dropped = true;
        }
        return delay;
      },
    },
  };

  return (
    <div className="w-[44rem] h-[19rem] p-1  rounded-md 2xl:w-[60rem] 2xl:h-[27rem]">
      {/* Dropdown for selecting time frame */}
      <div className="absolute justify-end mb-2">
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="p-2 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="Monthly">Monthly</option>
          <option value="Weekly">Weekly</option>
          <option value="Daily">Daily</option>
        </select>
      </div>

      {/* Line Chart */}
      <Line data={data} options={options} />
    </div>
  );
};

export default QuizGraph;
