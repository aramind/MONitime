import { Grid, Typography, styled } from "@mui/material";
import React from "react";

const SummaryTableRow = ({ col1, col2, col3, fs }) => {
  const TextTypography = styled(Typography)({
    fontFamily: "Prompt",
    fontSize: "18px",
    paddingLeft: "1rem",
    textAlign: "center",
  });

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        xs={4}
      >
        <TextTypography>{col1[0].toUpperCase() + col1.slice(1)}</TextTypography>
      </Grid>
      <Grid
        item
        xs={4}
      >
        <TextTypography>{(+col2 / 3600).toFixed(2)}</TextTypography>
      </Grid>
      <Grid
        item
        xs={4}
      >
        <TextTypography>{col3}</TextTypography>
      </Grid>
    </Grid>
  );
};

export default SummaryTableRow;
