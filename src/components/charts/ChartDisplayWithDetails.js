import React, { useContext, useEffect, useState } from "react";
// import "./ChartsPage.css";
// import "./ChartsPage.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { v4 as uuidv4 } from "uuid";
import { useValue } from "../../context/ContextProvider";
import PieChart from "./PieChart";
import { getRecordForSelectedDate } from "../../actions/activity";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import muiTheme from "../../muiTheme";
import { format } from "date-fns-tz";
import ChartDisplay from "./ChartDisplay";
import getTotalTimeInSeconds from "../../util-functions/getTotalTimeInSeconds";
import { useNavigate } from "react-router-dom";
import { CancelOutlined, Close } from "@mui/icons-material";
import AddRecordModal from "./ModalWrapper";
import ModalWrapper from "./ModalWrapper";

const ChartDisplayWithDetails = ({ onClose, showSummary }) => {
  // * Global states from Context provider
  const {
    state: { currentUser, recordForSelectedDate },
    dispatch,
  } = useValue();

  // * Local states
  const [dateForChart, setDateForChart] = useState(new Date());
  const formattedDate = format(dateForChart, "E MMM d, yyyy");
  const [chartRecord, setChartRecord] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    async function retrieve() {
      let content = {
        date: dateForChart,
      };
      if (currentUser) {
        const token = currentUser.token;
        let record = await getRecordForSelectedDate(token, content, dispatch);
        setChartRecord(record);
        // dispatch({ type: "UPDATE_RECORDFORSELECTEDDATE", payload: record });
      }
    }
    retrieve();
  }, []);

  useEffect(() => {
    async function retrieve() {
      let content = {
        date: dateForChart,
      };
      if (currentUser) {
        const token = currentUser.token;
        let record = await getRecordForSelectedDate(token, content, dispatch);
        setChartRecord(record);
        // dispatch({ type: "UPDATE_RECORDFORSELECTEDDATE", payload: record });
      }
    }
    retrieve();
  }, [dateForChart, currentUser, dispatch, recordForSelectedDate]);

  // for progress bar
  let totalTimeInSeconds = chartRecord ? getTotalTimeInSeconds(chartRecord) : 0;
  let hoursRemaining = 24 - Math.floor(totalTimeInSeconds / 3600);
  let minutesRemaining = Math.round((totalTimeInSeconds % 3600) / 60);

  let remainingTimeString = "";
  if (hoursRemaining > 0) {
    remainingTimeString = hoursRemaining + " hrs";
  }
  if (minutesRemaining > 0) {
    remainingTimeString += " " + minutesRemaining + " mins";
  }

  console.log("TIME REMAINING:", remainingTimeString);

  const completedPercent = ((24 - hoursRemaining) / 24) * 100;

  // handlers

  const handleDatePickerChange = (date) => {
    setDateForChart(date);
  };

  // TROUBLESHOOTING CONSOLE LOGS
  console.log("FROM CDWD", chartRecord);
  return (
    <>
      <Box
        width="320px"
        height="500px"
        display="flex"
        flexDirection="column"
        position="relative"
        justifyContent="center"
        border="1px solid"
        borderColor={muiTheme.palette.primary.main}
        borderRadius="10px"
        p={2}
      >
        {/* date picker */}
        {/* TODO:(minor) make the date picker occupy the whole width of the parent */}
        <Box
          width={"100%"}
          height="100px"
          p={1}
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            // border: "3px solid red",
          }}
        >
          <>
            <Box
              width="2.5rem"
              // backgroundColor="yellow"
              height="100%"
              display="flex"
              alignItems="start"
              justifyContent="end"
              sx={{
                position: "absolute",
                top: "4px",
                right: "4px",
              }}
            >
              <CancelOutlined
                color="primary"
                onClick={onClose}
                // fontSize="small"
                sx={{
                  "&:hover": {
                    color: muiTheme.palette.hovercolor.text, //TODO: finalize the color
                    textDecoration: "none",
                    cursor: "pointer",
                  },
                }}
              />
            </Box>

            <Box>
              <DatePicker
                label={"Select Date"}
                value={dateForChart}
                onChange={handleDatePickerChange}
                format="MM/dd/yyyy"
                disableFuture={true}
                maxDate={new Date()}
                inputFormat="MM/dd/yyyy"
                timeZone="Asia/Manila"
                // autoFocus}
              />
            </Box>
          </>
        </Box>
        <Box
          px={1}
          flex={1}
        >
          <Box
            width="100%"
            // height="300px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap={1}
            // sx={{ border: "1px solid red", backgroundColor: "red" }}
          >
            {chartRecord ? (
              <>
                <ChartDisplay
                  showSummary={true}
                  record={chartRecord}
                />
                <Box
                  width="100%"
                  // backgroundColor="red"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    backgroundColor="gray"
                    sx={{ width: "100%" }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={completedPercent}
                      sx={{ height: "10px" }}
                    />
                  </Box>
                  <Typography
                    fontSize="0.8rem"
                    color="primary"
                    gutterBottom
                  >
                    {completedPercent}% completed
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <Typography
                  fontSize="12px"
                  textAlign="center"
                >
                  No data available for the selected date
                </Typography>
                <Button
                  // width="200px"
                  variant="contained"
                  // onClick={() => {
                  //   navigate("/record");
                  // }}
                  onClick={() => {
                    dispatch({
                      type: "OPEN_ADD_RECORD_MODAL",
                    });
                  }}
                >
                  Add Record
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <ModalWrapper date={dateForChart} />
    </>
  );
};
// END

export default ChartDisplayWithDetails;
