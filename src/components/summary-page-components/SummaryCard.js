import { Box, Card, CardContent, Typography, alpha } from "@mui/material";
import React, { useState } from "react";
import SummaryCardContent from "./SummaryCardContent";

const randomBGcolors = [
  "#6a040f",
  "#14213d",
  "#16697a",
  "#e01772",
  "#55a630",
  "#6411ad",
  "#2d3142",
  "#d90368",
  "#3185fc",
  "#d90429",
  "#006d77",
  "#344e41",
  "#01161e",
  "#e36414",
  "#5F0F40",
  "#9A031E",
];

const SummaryCard = ({ title, result, intervalName }) => {
  const randomColor =
    randomBGcolors[Math.floor(Math.random() * randomBGcolors.length)];

  // content = [tot, ave, percent]
  // content2 = [tot, ave, percent]

  const {
    totalSecondsPerActivity,
    activityAverages,
    activityPercentages,
    totalSecondsPerActivityPrev,
    prevActivityAverages,
    prevActivityPercentages,
  } = result;

  // extracting the data depending on the title
  const act = title.toLowerCase().split();
  const total = [totalSecondsPerActivity[act] || 0];
  const ave = [activityAverages[act] || 0];
  const percent = [activityPercentages[act] || 0];
  const prevTotal = [totalSecondsPerActivityPrev[act] || 0];
  const prevAve = [prevActivityAverages[act] || 0];
  const prevPercent = [prevActivityPercentages[act] || 0];

  console.log(`${act}:${ave}`);
  const current = [
    (+total / 3600).toFixed(1),
    (+ave).toFixed(1),
    (+percent).toFixed(1),
  ];
  const prev = [
    (+prevTotal / 3600).toFixed(1),
    (+prevAve).toFixed(1),
    (+prevPercent).toFixed(1),
  ];

  return (
    <Card
      sx={{
        width: { xs: "340px", sm: "240px" },
        height: "180px",
        borderRadius: "20px",
      }}
    >
      <Box
        height="40px"
        sx={{
          backgroundColor: alpha(randomColor, 0.5),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title.toUpperCase()}</Typography>
      </Box>
      <CardContent>
        {/* tot - ave - percent for each act */}
        <SummaryCardContent
          variant="h5"
          fs="28px"
          fstyle="Prompt"
          content={current}
        />
        <Box mb={2}>
          <SummaryCardContent
            variant="body1"
            fs="14px"
            ff="Prompt"
            content={["Tot(hrs)", "hrs/day", "%"]}
          />
        </Box>
        <Typography
          variant="body2"
          mt={1}
        >
          Prev. {intervalName}
        </Typography>
        <Box mb={1}>
          {/* prev tot - ave - percent for each act  */}
          <SummaryCardContent
            variant="body1"
            fs="14px"
            ff="Prompt"
            content={prev}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
