import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useValue } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Deactivated = () => {
  const {
    state: {},
    dispatch,
  } = useValue();

  let navigate = useNavigate();
  // handlers
  const handleLogout = () => {
    navigate("/");
    dispatch({ type: "UPDATE_USER", payload: null });
    dispatch({
      type: "TOGGLE_CLOSING_MODAL",
      payload: { open: true },
    });
  };

  return (
    <Dialog
      open={true}
      sx={{
        padding: "1rem",
      }}
    >
      <DialogContent>
        <DialogContentText>
          <Typography
            textAlign="center"
            color="#333"
            fontSize="1.2rem"
            fontFamily="Prompt"
          >
            Your account has been deactivated.
          </Typography>
          <Typography
            textAlign="center"
            color="#333"
            fontSize="1.2rem"
            fontFamily="Prompt"
          >
            To reactivate your account and regain access to our app's features
            and your past data, please enter the code sent to your email and
            click reactivate.
          </Typography>
          <br></br>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0 auto",
              gap: "10px",
            }}
          >
            <Button>Send Code</Button>
            <TextField
              size="small"
              id="outlined-basic"
              label="code"
              variant="outlined"
            />
          </Box>
          <br></br>
        </DialogContentText>
        <DialogActions>
          <Button
            sx={{ width: "120px" }}
            variant="outlined"
            onClick={() => {
              dispatch({
                type: "TOGGLE_USER_SETTINGS_MODAL",
                payload: { open: true },
              });
            }}
          >
            Reactivate
          </Button>
          <Button
            sx={{ width: "120px" }}
            variant="outlined"
            onClick={handleLogout}
          >
            Exit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Deactivated;
