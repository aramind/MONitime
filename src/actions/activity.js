import { utcToZonedTime } from "date-fns-tz";
import fetchData from "./utils/fetchData";
import { format } from "date-fns";
import { convertDateToLabel } from "./utils/dateMethods";

// * Activity/record-related request controller functions
// * responsible for preparing the request from
// * the page(s) or button clicks or any events
// * related to activity/records that needs to send
// * an http request and response to the back end via the fetchData

const url = process.env.REACT_APP_SERVER_URL + "/record";

// (1) updateActivityRecord
//    - prepares the POST record requests to be send to the server
// (2) getRecordForSelectedDate
//    - prepares the GET record requests to be send to the server
// (3) removeRecordForSelectedDate
//    - prepares the DELETE record requests to be send to the server
// (4) resetRecordForSelectedDate
//    - prepares the PUT record requests to be send to the server
export const updateActivityRecord = async (
  token,
  { date, activity, hrs, mins, operation },
  dispatch
) => {
  dispatch({ type: "START_LOADING" });
  const label = convertDateToLabel(date);

  console.log(`${url}/${label}`);
  const totalSeconds = parseInt(hrs * 3600) + parseInt(+mins * 60);
  console.log(-totalSeconds);

  fetchData(
    {
      url: `${url}/${label}`,
      method: "POST",
      token: token,
      body: {
        name: activity,
        seconds_spent: `${operation === "add" ? totalSeconds : -totalSeconds}`,
      },
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  // return result;
};

export const getRecordForSelectedDate = async (token, { date }, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const label = convertDateToLabel(date);
  // const timezone = "Asia/Manila";
  // const zonedDate = utcToZonedTime(date, timezone);
  // const label = format(zonedDate, "yyyy-MM-dd");
  // console.log(`${url}/${label}`);
  const result = fetchData(
    {
      url: `${url}/${label}`,
      method: "GET",
      token: token,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  return result;
};

export const removeRecordForSelectedDate = async (
  token,
  { date },
  dispatch
) => {
  dispatch({ type: "START_LOADING" });
  const label = convertDateToLabel(date);
  // const timezone = "Asia/Manila";
  // const zonedDate = utcToZonedTime(date, timezone);
  // const label = format(zonedDate, "yyyy-MM-dd");
  const result = fetchData(
    {
      url: `${url}/${label}`,
      method: "DELETE",
      token: token,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  console.log("FROM RRFSD", result);
  return result;
};

export const resetRecordForSelectedDate = async (token, { date }, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const label = convertDateToLabel(date);
  // const timezone = "Asia/Manila";
  // const zonedDate = utcToZonedTime(date, timezone);
  // const label = format(zonedDate, "yyyy-MM-dd");
  const result = fetchData(
    {
      url: `${url}/${label}`,
      method: "PUT",
      token: token,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  // console.log("FROM rRFSD", result);
  return result;
};
