import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationResetDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm Reset</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reset records for the selected date?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Reset</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationResetDialog;
