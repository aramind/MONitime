import { Pie } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

const PieChart = ({ todaysRecord }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "time",
        data: [],
        backgroundColor: [
          "#0a0908",
          "#a4161a",
          "#ffea00",
          "#7b2cbf",
          "#0077b6",
          "#fb6107",
          "#588157",
          "#abc4ff",
          "#0fa3b1",
        ],
      },
    ],
  });

  useEffect(() => {
    setData({
      labels: Object.keys(todaysRecord),
      datasets: [
        {
          label: "time",
          data: Object.values(todaysRecord).map((e) => Number(e)),
          backgroundColor: [
            "#0a0908",
            "#a4161a",
            "#ffea00",
            "#7b2cbf",
            "#0077b6",
            "#fb6107",
            "#588157",
            "#0fa3b1",
            "#abc4ff",
          ],
        },
      ],
    });
  }, [todaysRecord]);

  const options = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.index];
          const percentage = ((value / 24) * 100).toFixed(2);
          return `${data.labels[tooltipItem.index]}: ${percentage}%`;
        },
      },
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Pie
        data={data}
        options={options}
      />
    </div>
  );
};

export default PieChart;
