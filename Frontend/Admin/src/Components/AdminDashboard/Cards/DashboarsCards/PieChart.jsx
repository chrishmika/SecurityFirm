import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import axios from "axios";
import MonthInName from "../../../../utils/MonthInName";

Chart.register(CategoryScale, ChartDataLabels);

const PieChart = ({ companyId }) => {
  const [chartData, setChartData] = useState({
    labels: ["Present", "Leave", "Absent"],
    datasets: [
      {
        label: "Today",
        data: [0, 0, 0],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"], // green, yellow, red
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = MonthInName(today.getMonth());

        const response = await axios.post(
          "/api/admin/viewStats",
          { year: currentYear, month: currentMonth },
          { withCredentials: true }
        );

        // Assume API returns [presentCount, leaveCount, absentCount]
        const values = response.data;
        if (Array.isArray(values) && values.length === 3) {
          setChartData((prev) => ({
            ...prev,
            datasets: [{ ...prev.datasets[0], data: values }],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    fetchData();
  }, [companyId]);

  const handleChartClick = (event, elements) => {
    if (!elements.length) return;

    const index = elements[0].index;
    const label = chartData.labels[index];
    console.log("Clicked slice:", label);
    // Add navigation or filtering logic here
  };

  return (
    <div className="h-full rounded-2xl sm:p-4 flex items-center justify-center">
      <div className="chart-container md:w-80 w-50 flex flex-col justify-center items-center h-80">
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "bottom" },
              title: {
                display: true,
                text: "Today's Duty Status",
                font: { size: 20 },
              },
              datalabels: {
                color: "white",
                font: { size: 16, weight: "bold" },
                anchor: "center",
                align: "center",
                formatter: (value) => value,
              },
            },
            onClick: handleChartClick,
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
