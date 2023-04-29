import { Grid, Typography } from "@mui/material";
import React from "react";

const SummaryCardContent = ({ variant, fs, ff, content }) => {
  return (
    <Grid
      container
      rowSpacing={1}
    >
      <Grid
        item
        xs={4}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant={variant}
          fontSize={fs}
          fontFamily={ff}
        >
          {content[0]}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant={variant}
          fontSize={fs}
          fontFamily={ff}
        >
          {content[1]}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant={variant}
          fontSize={fs}
          fontFamily={ff}
        >
          {content[2]}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SummaryCardContent;
