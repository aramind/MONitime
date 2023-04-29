import { Box, Stack, Toolbar, Typography, styled } from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import muiTheme from "../../muiTheme";
import SideBar from "../../components/sidebar/SideBar";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import SummaryTable from "../../components/summary-table/SummaryTable";
import ChartDisplay from "../../components/charts/ChartDisplay";
import MiniRecord from "../../components/MiniRecord";
// import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
// hero images
import heroImage1 from "../../resources/images/hero/hero-image-1.webp";
import heroImage2 from "../../resources/images/hero/hero-image-2.webp";
import heroImage3 from "../../resources/images/hero/hero-image-3.png";
import Quote from "../../components/welcome-back-page/Quote";
import Deactivated from "../Deactivated";

const TextTypography = styled(Typography)({
  // textAlign: "center",
  fontFamily: "Prompt",
  padding: "0.1rem 0",
});

const heroImages = [heroImage1, heroImage2, heroImage3];

const WelcomeBackPage = () => {
  const {
    state: { currentUser },
  } = useValue();

  // handlers

  // console.log("from WBP", selectedDate);
  return (
    <>
      {currentUser?.isActive ? (
        <Box
          alignItems={"center"}
          width="100%"
          display={"flex"}
          flexDirection={"column"}
        >
          <Toolbar sx={{ marginBottom: "10px" }} />

          <Stack direction={"column"}>
            <Box
              height={{ md: "50vh" }}
              width={{ md: "80vw", lg: "60vw" }}
              backgroundColor="lightblue"
              sx={{
                marginInline: "auto",
                my: "10px",
                backgroundImage: `url(${
                  heroImages[Math.floor(Math.random() * 3)]
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
            <Box px={4}>
              <TextTypography
                fontSize="3rem"
                color="primary.main"
              >
                Hi {currentUser.username}! 👋
              </TextTypography>
              <TextTypography>
                Hope you're having a good day so far!
              </TextTypography>
              <TextTypography>
                Take a moment to reflect on your goals and priorities each day.
              </TextTypography>
              <TextTypography>
                Remember, small steps can lead to big achievements!
              </TextTypography>
              <Typography
                fontFamily={"Prompt"}
                textAlign={"left"}
                my={2.5}
              >
                Here's a quote to inspire your for the day:
              </Typography>
              <Box
                px={4}
                py={2}
                margin="0 auto"
                width="80%"
              >
                <Quote />
              </Box>
              <TextTypography>
                Let's make the most of our time ⏱️ and stay productive! 🚀💪💯
              </TextTypography>
            </Box>
            <MiniRecord />
            <Box
              px={4}
              py={1}
              mb={4}
            >
              <Typography mb={1}>What to do next?</Typography>
              <SideBar show={[null, 1, 1, 1]} />
            </Box>
          </Stack>
        </Box>
      ) : (
        <Deactivated />
      )}
    </>
  );
};

export default WelcomeBackPage;
