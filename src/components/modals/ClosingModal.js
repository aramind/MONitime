import React from "react";
import { useValue } from "../../context/ContextProvider";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const ClosingModal = () => {
  const {
    state: { closingModalIsOpen },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({
      type: "TOGGLE_CLOSING_MODAL",
      payload: { open: false },
    });
  };

  // console.log(profile.open);
  return (
    <Dialog
      open={closingModalIsOpen.open}
      onClose={handleClose}
      sx={{
        padding: "2rem",
      }}
    >
      <DialogTitle>
        {}
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
          <Typography
            textAlign="center"
            color="#333"
            fontSize="1.2rem"
            fontFamily="Prompt"
          >
            Thanks for using <b style={{ color: "blue" }}>MONitime</b>!
          </Typography>
          <Typography
            textAlign="center"
            color="#333"
            fontSize="1.2rem"
            fontFamily="Prompt"
          >
            Hope to see you again soon!
          </Typography>
          <Typography
            textAlign="center"
            color="#333"
            fontSize="2rem"
            fontFamily="Prompt"
          >
            👋🏼🎊🥳💻💖
          </Typography>
          <br></br>
          <Typography color="#444">Give Support?</Typography>
          <Typography color="#444">Send Gcash: 098282734283472</Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ClosingModal;
