import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { useValue } from "../../context/ContextProvider";
import { Close, Send } from "@mui/icons-material";
import { updateProfile } from "../../actions/user";
import RecordPage from "../../pages/RecordPage";
import UpdateRecordModal from "../modals/UpdateRecordModal";

const ModalWrapper = ({ date }) => {
  const {
    state: { addRecordModal },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({
      type: "CLOSE_ADD_RECORD_MODAL",
    });
  };

  // console.log(profile.open);
  return (
    <Dialog
      open={addRecordModal}
      onClose={handleClose}
      maxWidth="xl"
      sx={{ width: "100vw" }}
    >
      <DialogTitle>
        Update Record
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
      <Box>
        <UpdateRecordModal date={date} />
      </Box>
    </Dialog>
  );
};

export default ModalWrapper;
