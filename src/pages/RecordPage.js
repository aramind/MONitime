import {
  Autocomplete,
  Box,
  Button,
  LinearProgress,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import muiTheme from "../muiTheme";
// import DatePickerComponent from "../components/DatePickerComponent";
// import { format } from "date-fns-tz";
// import Dropdown from "../components/form-record/Dropdown";
import { DeleteOutlineOutlined, RestartAltOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import { useValue } from "../context/ContextProvider";
import {
  getRecordForSelectedDate,
  removeRecordForSelectedDate,
  resetRecordForSelectedDate,
  updateActivityRecord,
} from "../actions/activity";
import SummaryPage from "./SummaryPage";
import SummaryTable from "../components/summary-table/SummaryTable";
import ChartDisplay from "../components/charts/ChartDisplay";
import getTotalTimeInSeconds from "../util-functions/getTotalTimeInSeconds";
import ConfirmationDeleteDialog from "../components/ConfirmationDeleteDialog";
import ConfirmationResetDialog from "../components/CofirmationResetDialog";
import Deactivated from "./Deactivated";

const RecordPage = () => {
  // * Global states from Context provider
  // date selected
  const {
    state: { selectedDate, activityNames, currentUser, recordForSelectedDate },
    dispatch,
  } = useValue();
  const formattedDate = format(selectedDate, "E MMM d, yyyy");

  // * Local states
  const [selectedActivity, setSelectedActivity] = useState(null);
  // hrs and minutes
  const [hrs, setHrs] = useState(null);
  const [mins, setMins] = useState(null);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogReset, setOpenDialogReset] = useState(false);
  const [refresh, setRefreshed] = useState(false);
  useEffect(() => {
    // console.log(selectedDate);
    window.scrollTo(0, 0);

    let content = {
      date: selectedDate,
    };
    // console.log(currentUser);
    if (currentUser) {
      const token = currentUser.token;
      getRecordForSelectedDate(token, content, dispatch);
    }
  }, [refresh]);

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
  }, [selectedDate, currentUser, dispatch, refresh]);
  const genArrOfDigits = (n) => {
    const arr = [];
    for (let i = 0; i <= n; i++) {
      arr.push(i.toString());
    }
    return arr;
  };

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

  // handlers

  const handleDelete = () => {
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleConfirmDelete = () => {
    console.log(selectedDate);
    let content = {
      date: selectedDate,
    };
    const token = currentUser.token;
    removeRecordForSelectedDate(token, content, dispatch);
    handleCloseDialogDelete();
    setRefreshed((pv) => !pv);
  };

  // RESET
  const handleReset = () => {
    setOpenDialogReset(true);
  };

  const handleCloseDialogReset = () => {
    setOpenDialogReset(false);
  };
  const handleConfirmReset = () => {
    let content = {
      date: selectedDate,
    };
    const token = currentUser.token;
    resetRecordForSelectedDate(token, content, dispatch);
    handleCloseDialogReset();
    setRefreshed((pv) => !pv);
  };

  const handleAddAndSubtract = async (operation) => {
    console.log(selectedDate);
    let content = {
      date: selectedDate,
      activity: selectedActivity,
      hrs: hrs,
      mins: mins,
      operation,
    };
    const token = currentUser.token;
    updateActivityRecord(token, content, dispatch);
    setRefreshed((pv) => !pv);
  };

  const handleDatePickerChange = (date) => {
    dispatch({ type: "UPDATE_DATESELECTED", payload: date });
  };

  return (
    <>
      {currentUser?.isActive ? (
        <Box
          // alignItems={"center"}
          width="100%"
          display={"flex"}
          flexDirection={"column"}
          sx={{
            margin: "0 auto",
            // border: "1px solid green",
            [muiTheme.breakpoints.up("md")]: {
              width: { md: "95%", lg: "90%", xl: "50%" },
              // display: { md: "flex" },
            },
          }}
        >
          <Toolbar sx={{ marginBottom: "10px" }} />
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
                width={"100%"}
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
                  autoFocus
                />
              </Box>
              {/* ACTIVITY DROP DOWN */}
              <Autocomplete
                value={selectedActivity}
                onChange={(event, newValue) => {
                  setSelectedActivity(newValue);
                }}
                id="select-activity"
                options={activityNames}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose Activity"
                  />
                )}
              />
              {/* hrs and minutes */}
              <Stack
                direction={"row"}
                maxWidth={"300px"}
                gap={2}
              >
                {/* for hrs */}
                <Autocomplete
                  value={hrs}
                  onChange={(event, newValue) => {
                    setHrs(newValue);
                  }}
                  id="select-hrs"
                  options={genArrOfDigits(24)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Hrs"
                    />
                  )}
                />
                {/* for mins */}
                <Autocomplete
                  value={mins}
                  onChange={(event, newValue) => {
                    setMins(newValue);
                  }}
                  id="select-mins"
                  options={genArrOfDigits(60)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Mins"
                    />
                  )}
                />
              </Stack>
              {/* Progress Bar */}
              {/* <Box
            width="100%"
            px={1}
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
              {hoursRemaining} hrs remaining
            </Typography>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={completedPercent}
                sx={{ height: "15px" }}
              />
            </Box>
          </Box> */}
              {/* Buttons */}
              <Stack
                marginTop={3}
                marginBottom={2}
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ width: "100%" }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAddAndSubtract("add")}
                  sx={{ paddingY: "1rem" }}
                >
                  Add
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAddAndSubtract("sub")}
                  sx={{ paddingY: "1rem" }}
                >
                  Subtract
                </Button>
              </Stack>
            </Stack>

            {/* BOX 2 */}
            <Box
              flex={3}
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
                  // border: "1px solid blue",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <Box
                  width="400px"
                  height="350px"
                  // sx={{ backgroundColor: "blue" }}
                >
                  <SummaryTable />
                </Box>
                <Box
                  width="300px"
                  height="350px"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // backgroundColor: "blue",
                  }}
                >
                  {recordForSelectedDate && (
                    <ChartDisplay
                      showSummary={false}
                      record={recordForSelectedDate}
                    />
                  )}
                </Box>
              </Box>
              <Box
                width="100%"
                px={5}
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
              {/* text info */}
              <Box px={{ xs: "5px", sm: "10px", md: "2rem" }}>
                <Stack
                  px={1}
                  my={1}
                >
                  <Typography variant="caption">
                    Reset all entries for selected date to zero? - RESET
                  </Typography>

                  <Typography variant="caption">
                    Delete all records for selected date? - DELETE
                  </Typography>
                </Stack>
                {/* save and clear */}
                <Stack
                  px={1}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      endIcon={<RestartAltOutlined />}
                      sx={{ py: "1rem" }}
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <ConfirmationResetDialog
                      open={openDialogReset}
                      handleClose={handleCloseDialogReset}
                      handleConfirm={handleConfirmReset}
                    />
                  </>
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      endIcon={<DeleteOutlineOutlined />}
                      sx={{ py: "1rem" }}
                      onClick={handleDelete}
                    >
                      Delete Record
                    </Button>
                    <ConfirmationDeleteDialog
                      open={openDialogDelete}
                      handleClose={handleCloseDialogDelete}
                      handleConfirm={handleConfirmDelete}
                    />
                  </>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box
            marginY="1rem"
            px="8px"
            // sx={{ border: "1px solid red" }}
          >
            <LinearProgress
              variant="determinate"
              value={completedPercent}
              sx={{ height: "3px", width: "100%" }}
            />
          </Box>
          {/* END */}
          <Box
            // sx={{ border: "1px solid red" }}
            px={4}
            py={1}
            mb={4}
          >
            <Typography mb={1}>What to do next?</Typography>
            <SideBar show={[1, null, 1, 1]} />
          </Box>
        </Box>
      ) : (
        <Deactivated />
      )}
    </>
  );
};

export default RecordPage;
