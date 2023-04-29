import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";
import { Close } from "@mui/icons-material";
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
