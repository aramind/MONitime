import "./SummaryPage.css";
import React, { useContext, useState } from "react";
// import SummaryCard from "../components/SummaryCard";
import Card from "../components/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../contextprovider/DataContextProvider";

const SummaryPage = () => {
  const [range, setRange] = useState("week");
  // from context provider(s)
  const { pastRecords, setPastRecords } = useContext(DataContext);

  //gets the list of activity categories
  const categories = pastRecords.reduce((acc, log) => {
    log.activities.forEach((activity) => {
      if (!acc.includes(activity.name.toUpperCase())) {
        acc.push(activity.name);
      }
    });
    return acc;
  }, []);

  // console.log(categories);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="page page--summary">
      <div className="page--summary__user-info">
        <div className="card__user-info">
          <p>Date:</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeZone="Asia/Manila"
          />
          <p className="card__greet">Hi!</p>
          <p className="card__greet--subtext">
            Here is your {range}ly summary...
          </p>
        </div>

        {/* <div className="card__user-info--subcard"></div> */}

        <div className="card__options">
          <button
            className="card__option"
            onClick={() => setRange("week")}
          >
            Weekly
          </button>
          <button
            className="card__option"
            onClick={() => setRange("month")}
          >
            Monthly
          </button>
          <button
            className="card__option"
            onClick={() => setRange("quarter")}
          >
            Quarterly
          </button>
        </div>
      </div>

      <div className="page--summary__cards">
        {pastRecords.length > 0 ? (
          categories.map((category) => (
            <Card
              key={category}
              logs={pastRecords}
              category={category}
              startDate={startDate}
              setStartDate={setStartDate}
              range={range}
            />
          ))
        ) : (
          <p
            style={{
              color: "gold",
              fontSize: "2rem",
              paddingTop: "1rem",
            }}
          >
            No saved records yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
