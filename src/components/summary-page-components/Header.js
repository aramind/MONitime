import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import { useValue } from "../../context/ContextProvider";

const Header = ({ interval, setInterval }) => {
  // date selected

  const {
    state: { selectedDate, currentUser },
    dispatch,
  } = useValue();
  const formattedDateForHeader = format(selectedDate, "MMM d, yyyy");

  // local states
  const dateToString = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return month + day + year;
  };

  const todayInString = dateToString(new Date());
  const selectedDateInString = dateToString(selectedDate);

  // handlers
  const handleDatePickerChange = (date) => {
    dispatch({ type: "UPDATE_DATESELECTED", payload: date });
  };
  return (
    <Box>
      <Card
        sx={{
          border: "2px solid green",
          borderRadius: "20px",
          height: { xs: "280px", md: "420px" },
          width: { xs: "340px", md: "250px" },
          position: "relative",
        }}
      >
        {/* TODO: fix the avatar */}
        <Box
          // border="1px solid red"
          width="100%"
          pt={2}
        >
          <Avatar
            src={currentUser?.photoURL}
            sx={{
              margin: "0 auto",
              height: "100px",
              width: "100px",
              display: { xs: "none", md: "flex" },
            }}
          />
        </Box>
        <CardContent>
          <Box>
            {/* TODO: fix the wordings */}
            <Typography
              variant="h4"
              color="primary"
            >
              Hi {currentUser?.username}!👋
            </Typography>
            <Typography
              margin="0.5rem 0"
              variant="body1"
            >
              Here is your summary from{" "}
              <span>
                {todayInString === selectedDateInString
                  ? "today"
                  : formattedDateForHeader}
              </span>
              !
            </Typography>
          </Box>
          <Box mt={3}>
            <DatePicker
              label={"Change Reference Date?"}
              value={selectedDate}
              onChange={handleDatePickerChange}
              format="MM/dd/yyyy"
              disableFuture={true}
              maxDate={new Date()}
              inputFormat="MM/dd/yyyy"
              timeZone="Asia/Manila"
            />
          </Box>
        </CardContent>
        <CardActions sx={{ position: "absolute", bottom: "5px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              size="small"
              onClick={() => setInterval(7)}
            >
              Week
            </Button>
            <Button
              size="small"
              onClick={() => setInterval(30)}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setInterval(120)}
            >
              Quarter
            </Button>
            <Button
              size="small"
              onClick={() => setInterval(365)}
            >
              Year
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Header;
