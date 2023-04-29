import uploadFile from "../firebase/uploadFile";
import fetchData from "./utils/fetchData";
import { v4 as uuidv4 } from "uuid";

const url = process.env.REACT_APP_SERVER_URL;

export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = await fetchData(
      { url: url + "/register", body: user },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_USER", payload: result });
      dispatch({ type: "CLOSE_LOGIN" });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Your account has been created successfully",
        },
      });
    }
  } catch (error) {
    if (error.message === "Username already taken") {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Username already taken",
        },
      });
    } else {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
    }
  }
  dispatch({ type: "END_LOADING" });
};

// LOG IN
export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  // SEND REQUEST WITH FETCH
  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
  }

  dispatch({ type: "END_LOADING" });
};

// UPDATING PROFILE
export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const { name, username, file } = updatedFields;
  let body = { name, username };
  try {
    if (file) {
      const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      ); //upload to firebase
      body = { ...body, photoURL };
    }
    const result = await fetchData(
      {
        url: url + "/update-profile",
        method: "PATCH",
        body,
        token: currentUser.token,
      },
      dispatch
    );

    if (result) {
      const updatedUser = { ...currentUser, ...updatedFields };
      if (result.photoURL) {
        updatedUser.photoURL = result.photoURL;
      }
      dispatch({
        type: "UPDATE_USER",
        payload: updatedUser,
      });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Your profile has been updated successfully",
        },
      });
      // console.log("ON USERJS", result.photoURL);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { open: false, file: null, photoURL: result.photoURL },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "END_LOADING" });
};

// Deactivate user
export const deactivateUser = async (currentUser, content, dispatch) => {
  dispatch({ type: "START_LOADING" });

  try {
    const result = await fetchData(
      {
        url: url + "/deactivate",
        method: "DELETE",
        body: null,
        token: currentUser.token,
      },
      dispatch
    );

    if (result) {
      // console.log("DEACTIVATED NA NGA BA? isActive=", result.isActive);
      const updatedUser = { ...currentUser, isActive: result.isActive };
      dispatch({
        type: "UPDATE_USER",
        payload: updatedUser,
      });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: result.message,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "END_LOADING" });
};

// Deactivate user
export const reactivateUser = async (currentUser, content, dispatch) => {
  dispatch({ type: "START_LOADING" });

  try {
    const result = await fetchData(
      {
        url: url + "/reactivate",
        method: "PATCH",
        body: null,
        token: currentUser.token,
      },
      dispatch
    );

    if (result) {
      const updatedUser = { ...currentUser, isActive: result.isActive };
      dispatch({
        type: "UPDATE_USER",
        payload: updatedUser,
      });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: result.message,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "END_LOADING" });
};
