import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";

Chart.register(CategoryScale, ChartDataLabels);

////////need to create a method to count the numbers and dispaly

const data = {
  labels: ["Present", "Leave", "Absent"],
  datasets: [
    {
      label: ["Today"],
      data: [55, 23, 96],
      backgroundColor: ["#000000", "#005588", "#875588"],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  const [chartData, setChartData] = useState(data);

  const handleChartClick = (event, elements) => {
    if (!elements.length) return; // If no slice is clicked, do nothing

    const index = elements[0].index; // Get the clicked slice index
    const label = chartData.labels[index]; // Get the label (e.g., "Present")

    switch (label) {
      case 1: {
        return; //need to return to relevanr areas
      }
      case 2: {
        return; //need to return to relevanr areas
      }
      case 3: {
        return; //need to return to relevanr areas
      }
      default: {
        return;
      }
    }
  };

  return (
    <div className="h-full rounded-2xl sm:p-4 flex items-center justify-center">
      <div className="chart-container md:w-80 w-50 flex flex-col justify-center place-items-center-center h-80">
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  padding: 20,
                  font: { size: 14 },
                  align: "start",
                },
              },
              title: {
                display: true,
                color: "",
                text: "Daily Statisics",
                font: { size: 20 },
              },
              datalabels: {
                color: "white",
                font: { size: 16, weight: "bold" },
                anchor: "center",
                align: "center",
                formatter: (value, context) => {
                  const dataset = context.chart.data.datasets[0].data;
                  const total = dataset.reduce((acc, val) => acc + val, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${percentage}%`;
                },
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
