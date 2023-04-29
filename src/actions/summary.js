import fetchData from "./utils/fetchData";
import { convertDateToLabel } from "./utils/dateMethods";

// * url
const url = process.env.REACT_APP_SERVER_URL + "/summary";

export const getSummaryForInterval = async (
  token,
  { date, interval },
  dispatch
) => {
  dispatch({ type: "START_LOADING" });

  const label = convertDateToLabel(date);
  // const timezone = "Asia/Manila";
  // const zonedDate = utcToZonedTime(date, timezone);
  // const label = format(zonedDate, "yyyy-MM-dd");

  const result = fetchData(
    {
      url: `${url}/interval?ref=${label}&interval=${interval}`,
      method: "GET",
      token: token,
      body: null,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  return result;
};
