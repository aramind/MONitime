import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmDeactivateDialog = ({
  open,
  handleClose,
  handleConfirm,
  action,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm {action}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {action} your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>{action}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeactivateDialog;
