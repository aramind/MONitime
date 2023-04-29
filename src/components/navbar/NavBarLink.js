import { Link } from "@mui/material";
import React from "react";
import muiTheme from "../../muiTheme";

const NavBarLink = ({ name, to }) => {
  return (
    <Link
      to={to}
      color="inherit"
      underline="none"
      href={to}
      fontSize="20px"
      px={1}
      sx={{
        "&:hover": {
          color: muiTheme.palette.hovercolor.text, //TODO: finalize the color
          textDecoration: "underline",
        },
      }}
    >
      {name}
    </Link>
  );
};

export default NavBarLink;
