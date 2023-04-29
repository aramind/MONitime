const reducer = (state, action) => {
  switch (action.type) {
    // for login/register modal
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };

    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    // for loading
    case "START_LOADING":
      return { ...state, loading: true };

    case "END_LOADING":
      return { ...state, loading: false };
    // for  alert
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    // for  minor alert
    case "UPDATE_MINOR_ALERT":
      return { ...state, minorAlert: action.payload };
    // for  updating profile
    case "UPDATE_PROFILE": {
      console.log("from reducer", action.payload);
      return { ...state, profile: action.payload };
    }
    // for logging and loggin out via the icon on the navbar
    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    // for updating todays record on local storage
    case "UPDATE_RECORDFORSELECTEDDATE":
      // localStorage.setItem("todaysRecord", JSON.stringify(action.payload));
      return { ...state, recordForSelectedDate: action.payload };
    // for selectedDate
    case "UPDATE_DATESELECTED":
      return { ...state, selectedDate: action.payload };

    // for add record modal
    case "OPEN_ADD_RECORD_MODAL":
      return { ...state, addRecordModal: true };
    // for add record modal
    case "CLOSE_ADD_RECORD_MODAL":
      return { ...state, addRecordModal: false };

    // for add record modal
    case "UPDATE_NOTYET_MODAL":
      return { ...state, notYetModal: action.payload };
    // for add record modal
    case "CLOSE_NOTYET_MODAL":
      return { ...state, notYetModal: false };

    // dark mode
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    // closing modal
    case "TOGGLE_CLOSING_MODAL":
      return {
        ...state,
        closingModalIsOpen: action.payload,
      };
    // closing modal

    case "TOGGLE_USER_SETTINGS_MODAL":
      return {
        ...state,
        userSettingsModal: action.payload,
      };

    case "SET_ACCOUNT_STATUS":
      return {
        ...state,
        userIsActive: action.payload,
      };

    default:
      throw new Error("No matched action");
  }
};

export default reducer;
