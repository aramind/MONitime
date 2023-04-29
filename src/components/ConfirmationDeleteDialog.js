import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationDeleteDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDeleteDialog;
