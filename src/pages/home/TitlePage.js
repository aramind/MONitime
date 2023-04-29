import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TitlePage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // backgroundImage: " linear-gradient(180deg, #15664f, #1c4c5e)",
      }}
    >
      {/* <Toolbar sx={{ marginBottom: "10px" }} />  */}
      <Box sx={{ flex: "1" }}>
        <Stack
          height="100%"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h2"
            align="center"
            // color="#eee"
            color="primary"
            sx={{
              fontFamily: "Prompt",
              fontWeight: "bold",
              fontSize: {
                xs: "5rem",
                sm: "7rem",
                md: "8rem",
                lg: "9rem",
                xl: "10rem",
              },
            }}
          >
            MONitime
          </Typography>
          <Typography
            variant="h4"
            align="center"
            fontFamily="Prompt"
            fontStyle="italic"
            position="relative"
            top="-40px"
            fontWeight="600"
            color="#333"
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem", xl: "2rem" },
            }}
          >
            Track your time and optimize your life
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              fontSize: {
                xs: "0.5rem",
                sm: "0.6rem",
                md: "0.8rem",
                xl: "1rem",
              },
            }}
          >
            Powered by Gcash Donations. <Link>Donate Now</Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default TitlePage;
