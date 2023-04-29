import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { Close, Send } from "@mui/icons-material";
import PasswordField from "./PasswordField";
import { login, register } from "../../actions/user";

const Login = () => {
  // ** states
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  // * sets what modal will show (login or register)
  // const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);

  // ** references
  const nameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // ** handlers
  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // send login request if it is not register and return
    if (!isRegister) return login({ email, password }, dispatch);

    // handles the case for register
    const name = nameRef.current.value;
    const username = userNameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Password and Confirm password do not match",
        },
      });
    // sending register request
    // console.log(name);
    // console.log(username);
    // console.log(email);
    // console.log(password);
    register({ name, username, email, password, isActive: true }, dispatch);
  };

  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
    >
      <DialogTitle>
        {isRegister ? "Register" : "Login"}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "#333" }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <DialogContentText>
              Please fill your information in the fields below:
            </DialogContentText>
            {isRegister && (
              <>
                <TextField
                  autoFocus
                  margin="normal"
                  variant="standard"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  inputRef={nameRef}
                  inputProps={{ minLength: 3 }}
                  required
                />
                <TextField
                  margin="normal"
                  variant="standard"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  inputRef={userNameRef}
                  inputProps={{ minLength: 3 }}
                  required
                />
              </>
            )}
            <TextField
              autoFocus={!isRegister}
              margin="normal"
              variant="standard"
              id="email"
              label="Email"
              type="email"
              fullWidth
              inputRef={emailRef}
              required
            />
            <PasswordField passwordRef={passwordRef} />
            {isRegister && (
              <PasswordField
                passwordRef={confirmPasswordRef}
                id="confirmPassword"
                label="Confirm Password"
              />
            )}
            <Box mt={1}>
              {isRegister ? (
                <Typography fontSize="0.8rem">
                  By registering you are accepting our{" "}
                  <Link sx={{ cursor: "pointer" }}>
                    Terms of Use and Policy
                  </Link>
                </Typography>
              ) : (
                <Typography fontSize="0.8rem">
                  <Link
                    onClick={() => {
                      dispatch({
                        type: "UPDATE_NOTYET_MODAL",
                        payload: { open: true, title: "Forgot password?" },
                      });
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              )}
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: "19px" }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<Send />}
              // onClick={} //TODO : to remove
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </DialogActions>
        </form>
        <DialogActions
          sx={{ justifyContent: "center", p: "5px 24px", fontSize: "smaller" }}
        >
          {isRegister ? `Already have an account?` : `First time user?`}
          <Button
            onClick={() => {
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? `Login` : `Register`}
          </Button>
        </DialogActions>
      </DialogTitle>
    </Dialog>
  );
};

export default Login;
