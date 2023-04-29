import React, { useState } from "react";
import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import ChartDisplayWithDetails from "../components/charts/ChartDisplayWithDetails";
import { v4 as uuidv4 } from "uuid";
import muiTheme from "../muiTheme";

import chartImage from "../resources/images/img-pie-chart.png";

import { useValue } from "../context/ContextProvider";
import SideBar from "../components/sidebar/SideBar";
import Deactivated from "./Deactivated";

const ChartsPage = () => {
  // globalStates
  const {
    state: { currentUser },
  } = useValue();
  // local states
  const [charts, setCharts] = useState([]);
  const addChart = () => {
    setCharts([...charts, { id: uuidv4() }]);
  };

  const removeChart = (id) => {
    setCharts(charts.filter((chart) => chart.id !== id));
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
          {/* MAIN CONTENT */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <>
              {charts.map((chart) => (
                <ChartDisplayWithDetails
                  key={chart.id}
                  onClose={() => removeChart(chart.id)}
                />
              ))}
              <Box
                width="320px"
                height="500px"
                // borderRadius="10px" // sx={{ border: "1px solid red" }}
              >
                <Button
                  fullWidth
                  id="add-chart-button"
                  variant="outlined"
                  p={2}
                  sx={{ height: "100%" }}
                  onClick={addChart}
                >
                  <Stack gap={2}>
                    <Typography>Add Chart</Typography>
                    <img
                      src={chartImage}
                      alt="pie chart"
                    ></img>
                  </Stack>
                </Button>
              </Box>
            </>
          </Box>
          <Box
            // sx={{ border: "1px solid red" }}
            px={4}
            py={1}
            mb={4}
          >
            <Typography mb={1}>What to do next?</Typography>
            <SideBar show={[1, 1, null, 1]} />
          </Box>
        </Box>
      ) : (
        <Deactivated />
      )}
    </>
  );
};

export default ChartsPage;
