import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useValue } from "../../context/ContextProvider";
import SummaryTableRow from "./SummaryTableRow";
import getActivityPercentage from "./utils/getActivityPercentage";
import { getRecordForSelectedDate } from "../../actions/activity";
import styled from "@emotion/styled";
import { format } from "date-fns-tz";
import muiTheme from "../../muiTheme";

const SummaryTable = () => {
  const {
    state: { recordForSelectedDate, activityNames, selectedDate },
  } = useValue();

  const TextTypography = styled(Typography)({
    fontFamily: "Prompt",
    paddingLeft: "1rem",
    textAlign: "center",
  });

  return (
    <Box
      display="flex"
      gap={2}
      flexDirection="column"
      p={1}
    >
      <Box>
        <TextTypography fontSize="18px">
          Summary for {format(selectedDate, "E MMM d, yyyy")}
        </TextTypography>
      </Box>
      <Box
        borderBottom={2}
        borderTop={2}
        borderColor={muiTheme.palette.primary.main}
        py={0.7}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={4}
          >
            <TextTypography
              color="primary.main"
              fontSize="22px"
            >
              Activity
            </TextTypography>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <TextTypography
              color="primary.main"
              fontSize="22px"
            >
              Total(hrs)
            </TextTypography>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <TextTypography
              color="primary.main"
              fontSize="22px"
            >
              %
            </TextTypography>
          </Grid>
        </Grid>
      </Box>
      <Box
        borderBottom={2}
        borderColor={muiTheme.palette.primary.main}
        pb={1}
      >
        {recordForSelectedDate ? (
          activityNames.map((activityName) => {
            const activity = getActivityPercentage(
              recordForSelectedDate,
              activityName
            );
            return (
              <SummaryTableRow
                key={activityName}
                col1={activity.name}
                col2={activity.seconds_spent}
                col3={activity.percentage}
              />
            );
          })
        ) : (
          <Box
            sx={{
              width: "100%",
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="error">
              No record created for {format(selectedDate, "E MMM d, yyyy")}!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SummaryTable;
