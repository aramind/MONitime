import { List } from "@mui/material";
import React from "react";
import {
  AddCircleOutlineOutlined,
  HomeOutlined,
  QueryStatsOutlined,
  SummarizeOutlined,
} from "@mui/icons-material";
import SideItem from "./SideItem";

const SideBar = ({ show }) => {
  return (
    <List>
      {show[0] && (
        <SideItem
          icon={<HomeOutlined />}
          text="Go back to home page"
          to="/"
        />
      )}
      {show[1] && (
        <SideItem
          icon={<AddCircleOutlineOutlined />}
          text="Update daily record"
          to="/record"
        />
      )}
      {show[2] && (
        <SideItem
          icon={<QueryStatsOutlined />}
          text="Compare charts and see trends"
          to="/charts"
        />
      )}
      {show[3] && (
        <SideItem
          icon={<SummarizeOutlined />}
          text="View summaries"
          to="/summary"
        />
      )}
    </List>
  );
};

export default SideBar;
