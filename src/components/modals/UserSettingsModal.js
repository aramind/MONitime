import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import {
  Box,
  Button,
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
import ConfirmDeactivateDialog from "../confirmDialogs/ConfirmDeactivateDialog";
import { deactivateUser, reactivateUser } from "../../actions/user";

const UserSettingsModal = () => {
  const {
    state: { currentUser, userSettingsModal },
    dispatch,
  } = useValue();

  // local states
  const [openDialogDeactivate, setOpenDialogDeactivate] = useState(false);

  // handlers
  const handleClose = () => {
    dispatch({
      type: "TOGGLE_USER_SETTINGS_MODAL",
      payload: { open: false },
    });
  };

  // handlers

  const handleDeactivate = () => {
    setOpenDialogDeactivate(true);
  };

  const handleCloseDialogDeactivate = () => {
    setOpenDialogDeactivate(false);
    dispatch({ type: "TOGGLE_USER_SETTINGS_MODAL", payload: { open: false } });
  };

  const handleConfirmDeactivate = () => {
    let content = {};
    console.log(currentUser);
    try {
      if (currentUser?.isActive) {
        deactivateUser(currentUser, content, dispatch);
      } else if (!currentUser?.isActive) {
        reactivateUser(currentUser, content, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
    handleCloseDialogDeactivate();
  };

  // console.log(profile.open);
  return (
    <Dialog
      open={userSettingsModal.open}
      onClose={handleClose}
      sx={{
        padding: "2rem",
      }}
    >
      <DialogTitle>
        User Settings
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
        <Button
          color="error"
          variant="outlined"
          onClick={handleDeactivate}
        >
          {currentUser?.isActive ? "Deactivate Account" : "Reactivate Account"}
        </Button>
        <ConfirmDeactivateDialog
          open={openDialogDeactivate}
          handleClose={handleCloseDialogDeactivate}
          handleConfirm={handleConfirmDeactivate}
          action={currentUser?.isActive ? "deactivate" : "reactivate"}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserSettingsModal;
