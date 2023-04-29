import React from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  AddCircle,
  Home,
  Menu,
  QueryStats,
  Summarize,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NavigationSpeedDial = () => {
  const navigate = useNavigate();

  return (
    <SpeedDial
      ariaLabel="Navigation speed dial"
      sx={{ position: "fixed", bottom: 24, right: 20 }}
      icon={<Menu />}
    >
      <SpeedDialAction
        icon={<Home />}
        tooltipTitle="Home"
        onClick={() => navigate("/")}
      />
      <SpeedDialAction
        icon={<AddCircle />}
        tooltipTitle="Add Record"
        onClick={() => navigate("/record")}
      />
      <SpeedDialAction
        icon={<QueryStats />}
        tooltipTitle="Charts"
        onClick={() => navigate("/charts")}
      />
      <SpeedDialAction
        icon={<Summarize />}
        tooltipTitle="Summary"
        onClick={() => navigate("/summary")}
      />
    </SpeedDial>
  );
};

export default NavigationSpeedDial;
