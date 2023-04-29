import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import NavBarLink from "./NavBarLink";
import UserMenu from "../user/UserMenu";
import { Brightness4, DarkModeSharp } from "@mui/icons-material";

const linkNames = [
  { name: "Home", to: "/" },
  { name: "Record", to: "/record" },
  { name: "Charts", to: "/charts" },
  { name: "Summary", to: "/summary   " },
  // { name: "Read", to: "/read        " },
];
const NavBarLinks = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  // local states
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
    >
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        //
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        {linkNames.map((item) => (
          <NavBarLink
            key={`navbarLink_${item.name}`}
            name={item.name}
            to={item.to}
          ></NavBarLink>
        ))}
      </Stack>

      <Tooltip title={currentUser ? currentUser.name : "User"}>
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar
            src={currentUser?.photoURL}
            alt={currentUser?.name}
          >
            {currentUser.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Stack ml="-10px">
        <Switch
          onChange={() => {
            dispatch({
              type: "UPDATE_NOTYET_MODAL",
              payload: { open: true, title: "Dark Mode" },
            });
          }}
          fontSize="small"
          sx={{
            "& .MuiSwitch-thumb": {
              backgroundColor: "lightblue",
            },
          }}
        />

        <Typography
          fontSize="0.7rem"
          mt="-10px"
        >
          Dark Mode
        </Typography>
      </Stack>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Stack>
  );
};

export default NavBarLinks;
