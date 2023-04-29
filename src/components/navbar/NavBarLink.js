import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const NavBarLink = ({ name, to }) => {
  return (
    <NavLink
      className="navbarlink"
      to={to}
      color="inherit"
      underline="none"
      fontSize="20px"
      px={1}
      // sx={{
      //   textDecoration: "none",
      //   color: "#eee",
      //   "&:hover": {
      //     color: muiTheme.palette.hovercolor.text, //TODO: finalize the color
      //     textDecoration: "underline",
      //   },
      // }}
    >
      {name}
    </NavLink>
  );
};

export default NavBarLink;
