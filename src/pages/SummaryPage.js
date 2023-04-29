import React, { useEffect, useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import muiTheme from "../muiTheme";

import Header from "../components/summary-page-components/Header";
import SummaryCard from "../components/summary-page-components/SummaryCard";
import { useValue } from "../context/ContextProvider";
import { getSummaryForInterval } from "../actions/summary";
import SideBar from "../components/sidebar/SideBar";
import Deactivated from "./Deactivated";

const SummaryPage = () => {
  // global states
  const {
    state: { selectedDate, currentUser, activityNames },
    dispatch,
  } = useValue();
  const [interval, setInterval] = useState(7);
  // local states
  const [result, setResult] = useState({});
  const intervals = { 7: "week", 30: "month", 120: "quarter", 365: "year" };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      getSummaryForInterval(
        currentUser.token,
        { date: selectedDate, interval },
        dispatch
      )
        .then((result) => {
          setResult(result || {});
          // console.log("RESULT", result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [interval, currentUser]);

  console.log("RESULT", result);

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
              width: { md: "98%", lg: "96%", xl: "60%" },
            },
          }}
        >
          <Toolbar sx={{ marginBottom: "10px" }} />
          <Box
            width="100%"
            m={1}
          >
            <Typography
              textAlign="center"
              variant="h4"
              fontFamily="Prompt"
            >
              SUMMARY FOR PREVIOUS <b>{intervals[interval].toUpperCase()}</b>
            </Typography>
          </Box>
          <Box
            width="100%"
            // gap="1rem"

            sx={{
              margin: "10px auto",
              // border: "1px solid green",
              [muiTheme.breakpoints.up("sm")]: {
                display: { sm: "flex" },
              },
            }}
          >
            <Box
              mb={2}
              mx={1}
              sx={{
                // border: "1px solid red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Header
                interval={interval}
                setInterval={setInterval}
              />
              {/* </Box> */}
            </Box>
            {Object.keys(result).length > 0 && (
              <Box
                // flex={4}
                sx={{
                  // border: "1px solid red",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                {activityNames.map((title) => (
                  <SummaryCard
                    key={title}
                    title={title}
                    result={result}
                    intervalName={intervals[interval]}
                  />
                ))}
              </Box>
            )}
          </Box>
          <Box
            // sx={{ border: "1px solid red" }}
            px={4}
            py={1}
            mb={4}
          >
            <Typography mb={1}>What to do next?</Typography>
            <SideBar show={[1, 1, 1, null]} />
          </Box>
        </Box>
      ) : (
        <Deactivated />
      )}
    </>
  );
};

export default SummaryPage;
