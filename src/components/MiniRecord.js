import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import muiTheme from "../muiTheme";

import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import { useValue } from "../context/ContextProvider";
import { getRecordForSelectedDate } from "../actions/activity";
import SummaryTable from "../components/summary-table/SummaryTable";
import ChartDisplay from "../components/charts/ChartDisplay";
import getTotalTimeInSeconds from "../util-functions/getTotalTimeInSeconds";
import { useNavigate } from "react-router-dom";

const MiniRecord = () => {
  // * Global states from Context provider
  // date selected
  const {
    state: { selectedDate, currentUser, recordForSelectedDate },
    dispatch,
  } = useValue();
  const formattedDate = format(selectedDate, "E MMM d, yyyy");

  // * Local states
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(selectedDate);
    let content = {
      date: selectedDate,
    };
    // console.log(currentUser);
    if (currentUser) {
      const token = currentUser.token;
      getRecordForSelectedDate(token, content, dispatch);
    }
  }, [currentUser, dispatch, selectedDate]);

  useEffect(() => {
    async function retrieve() {
      let content = {
        date: selectedDate,
      };
      if (currentUser) {
        const token = currentUser.token;
        let record = await getRecordForSelectedDate(token, content, dispatch);
        dispatch({ type: "UPDATE_RECORDFORSELECTEDDATE", payload: record });
      }
    }
    retrieve();
  }, [selectedDate, currentUser, dispatch]);

  // const hrsArray = genArrOfDigits(24);
  // const minsArray = genArrOfDigits(60);

  // for progress bar
  let totalTimeInSeconds = recordForSelectedDate
    ? getTotalTimeInSeconds(recordForSelectedDate)
    : 0;
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
  // console.log(selectedActivity);
  // console.log(hrs);
  // console.log(mins);
  // console.log(currentUser);

  // handlers

  const handleDatePickerChange = (date) => {
    dispatch({ type: "UPDATE_DATESELECTED", payload: date });
  };

  return (
    <Box
      // alignItems={"center"}
      width="100%"
      display={"flex"}
      flexDirection={"column"}
      sx={{
        margin: "20px auto",
        // border: "1px solid green",
        [muiTheme.breakpoints.up("md")]: {
          width: { md: "95%", lg: "90%", xl: "80%" },
          // display: { md: "flex" },
        },
      }}
    >
      <Box
        marginBottom="1rem"
        // sx={{ border: "1px solid red" }}
      >
        <LinearProgress
          variant="determinate"
          value={completedPercent}
          sx={{ height: "3px", width: "105%", marginLeft: "-20px" }}
        />
      </Box>
      {/* for main content */}
      <Box
        width="100%"
        gap="1rem"
        sx={{
          margin: "0 auto",
          // border: "1px solid green",
          [muiTheme.breakpoints.up("md")]: {
            // width: { md: "95%", lg: "90%", xl: "70%" },
            display: { md: "flex" },
          },
        }}
      >
        <Stack
          flex={1}
          gap={2}
          alignItems="center"
          p={2}
          m={1}
          sx={{
            border: "1px solid green",
            borderRadius: "10px",
          }}
        >
          {/* container for form fields */}
          {/* date display */}
          <Box
            my={"1rem"}
            width={"100%"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              // border: "1px solid red",
              color: muiTheme.palette.primary.main,
            }}
          >
            <Typography variant="h5">{formattedDate}</Typography>
          </Box>
          {/* date picker */}
          {/* TODO:(minor) make the date picker occupy the whole width of the parent */}
          <Box
            // width={"100%"}
            minWidth="300px"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: "1px solid red",
              color: muiTheme.palette.primary.main,
            }}
          >
            <DatePicker
              label={"Select Date"}
              value={selectedDate}
              onChange={handleDatePickerChange}
              format="MM/dd/yyyy"
              disableFuture={true}
              maxDate={new Date()}
              inputFormat="MM/dd/yyyy"
              timeZone="Asia/Manila"
              // autoFocus
            />
          </Box>
        </Stack>

        {/* BOX 2 */}
        <Box
          flex={1.8}
          sx={
            {
              // border: "1px solid blue",
            }
          }
        >
          {/* Summary and chart */}
          <Box
            mb={2}
            sx={{
              // border: "1px solid red",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "1rem",
            }}
          >
            <Box
              width="350px"
              height="350px"
              mb={2}
              // sx={{ backgroundColor: "blue" }}
            >
              <SummaryTable />
            </Box>
            <Box
              width="300px"
              height="300px"
              sx={{
                display: "flex",
                alignItems: "center",
                // backgroundColor: "blue",
              }}
            >
              {recordForSelectedDate ? (
                <ChartDisplay
                  showSummary={false}
                  record={recordForSelectedDate}
                />
              ) : (
                <Box
                  height={"100%"}
                  width="100%"
                  // sx={{ border: "1px solid red" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: "-2rem", height: "5rem" }}
                    onClick={() => {
                      navigate("/record");
                    }}
                  >
                    Add Record
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            width="100%"
            px={{ xs: 2, sm: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              fontSize={"1.2rem"}
              color="primary"
              gutterBottom
            >
              {remainingTimeString} remaining
            </Typography>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={completedPercent}
                sx={{ height: "25px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        marginTop="2rem"
        // sx={{ border: "1px solid red" }}
      >
        <LinearProgress
          variant="determinate"
          value={completedPercent}
          sx={{ height: "3px", width: "105%", marginLeft: "-20px" }}
        />
      </Box>
    </Box>
  );
};

export default MiniRecord;
