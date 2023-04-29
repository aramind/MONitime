import React from "react";
import { useValue } from "../../context/ContextProvider";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const NotYetModal = () => {
  const {
    state: { notYetModal },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({
      type: "UPDATE_NOTYET_MODAL",
      payload: { open: false, title: "Update Record" },
    });
  };

  // console.log(profile.open);
  return (
    <Dialog
      open={notYetModal.open}
      onClose={handleClose}
      sx={{
        padding: "2rem",
      }}
    >
      <DialogTitle>
        {notYetModal.title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography color="error">
            Sorry...feature not yet implemented. Devs run out of funds.😔
          </Typography>
          <br></br>
          <Typography color="error">Give Support?</Typography>
          <Typography color="error">Send Gcash: 098282734283472</Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default NotYetModal;
