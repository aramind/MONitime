import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import muiTheme from "../../muiTheme";

const SideItem = ({ icon, text, to }) => {
  return (
    <ListItem sx={{ margin: "-1rem 0" }}>
      <ListItemIcon
        sx={{
          margin: 0,
          padding: "0 5px 0 0",
          color: muiTheme.palette.primary.main,
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText>
        <Typography
          variant="subtitle2"
          fontSize="0.8rem"
          sx={{ marginLeft: "-1rem" }}
        >
          <Link to={to}>{text}</Link>
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export default SideItem;
