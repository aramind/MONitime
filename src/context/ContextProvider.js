import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  // currentUser: null,
  userIsActive: true,
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  minorAlert: { open: false, severity: "info", message: "" },
  profile: { open: false, file: null, photoURL: "" },
  selectedDate: new Date(),
  notYetModal: { open: false, title: "Title" },
  recordForSelectedDate: null,
  addRecordModal: false,
  closingModalIsOpen: { open: false },
  userSettingsModal: { open: false },
  activityNames: [
    "sleep",
    "work",
    "learn",
    "self",
    "social",
    "play",
    "fitness",
    "others",
  ],
  darkMode: false,
};

// const testRecord = { sleep: "2", learn: "3" };

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      // console.log(currentUser);
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
