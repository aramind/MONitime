import React from "react";
import {
  AppBar,
  Button,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import NavBarLinks from "./NavBarLinks";
import muiTheme from "../../muiTheme";

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  return (
    <AppBar
      elevation={5}
      sx={{
        boxShadow: `${currentUser ? "0px 4px 4px #185E54" : "none"}`,
        backgroundColor: `${currentUser ? "primary.main" : "transparent"}`,
      }}
      // backgroundColor={!currentUser ? "transparent" : "primary.main"}
    >
      <Toolbar
        // disableGutters
        px={2}
        sx={{ justifyContent: "space-between" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            mr: 0.1,
          }}
        >
          {/* <PendingActionsOutlined /> */}
          {currentUser && (
            <>
              <Link
                color="inherit"
                underline="none"
                to="/" //TODO: check this props
                sx={{
                  "&:hover": {
                    color: muiTheme.palette.hovercolor.text, //TODO: finalize the color
                    textDecoration: "none",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component={"h1"}
                  noWrap
                  fontSize={"2rem"}
                  fontFamily={"prompt"}
                  fontWeight={"bold"}
                  py={"0"}
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  MONitime
                </Typography>
                <Typography
                  variant="h6"
                  component={"h1"}
                  noWrap
                  fontSize={"2.5rem"}
                  fontFamily={"prompt"}
                  fontWeight={"bold"}
                  py={"0"}
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  M
                </Typography>
              </Link>
            </>
          )}
        </Stack>
        {!currentUser ? (
          <Button
            startIcon={<Lock />}
            onClick={() => dispatch({ type: "OPEN_LOGIN" })}
          >
            Login / Register
          </Button>
        ) : (
          <NavBarLinks />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
