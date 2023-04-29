import React, { useContext, useEffect, useState } from "react";
// import "./ChartsPage.css";
// import "./ChartsPage.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { v4 as uuidv4 } from "uuid";
import { useValue } from "../../context/ContextProvider";
import PieChart from "./PieChart";

const ChartDisplay = ({ onClose, showSummary }) => {
  const {
    state: { recordForSelectedDate, selectedDate },
    dispatch,
  } = useValue();

  const transformedObject = {
    sleep: 0,
    work: 0,
    learn: 0,
    self: 0,
    social: 0,
    play: 0,
    fitness: 0,
    others: 0,
  };

  // converts the format of the data fetched  to the format
  // the chart needs
  recordForSelectedDate.activities.forEach((activity) => {
    const { name, seconds_spent } = activity;
    transformedObject[name] = Number(seconds_spent) / 3600;
  });
  // console.log("TO", transformedObject);

  // computes for the total hours since the computations
  // of percentages depends on this
  const totalHrs = Object.values(transformedObject).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // gets the percentage of each activity since the data fetched from the records
  // has no percentage, only the number of hours
  const percentageObject = {};
  for (const key in transformedObject) {
    const percentage = ((transformedObject[key] / totalHrs) * 100).toFixed(1);
    percentageObject[key] = percentage;
  }

  // converts the percentageObject to array of key value pairs then sort it
  // in descending order
  const sortedInArrays = Object.entries(percentageObject).sort(
    (a, b) => parseFloat(b[1]) - parseFloat(a[1])
  );

  // converts back the sortedInArray to object with key value pairs
  const sortedPercentageObject = sortedInArrays.reduce(
    (obj, [key, value]) => ({ ...obj, [key]: value }),
    {}
  );

  // creates the summary details to be displayed below each chart
  const summaryText = Object.entries(sortedPercentageObject)
    .map(([key, percentage]) => `${key}: ${percentage}%`)
    .join(", ");

  return (
    <>
      <div className="chart--pie">
        <PieChart todaysRecord={transformedObject} />
      </div>
      {showSummary && <div className="chart-summary">{summaryText}</div>}
    </>
  );
};

export default ChartDisplay;
