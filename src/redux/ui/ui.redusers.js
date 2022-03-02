import UITypes from "./ui.types";

const initialState = {
  mainColor: "#F2B324",
  isDarkMode: false,
  
};

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UITypes.SET_MAIN_APP_COLOR:
      return { ...state, mainColor: payload };
    case UITypes.SET_DARK_MODE:
      return { ...state, isDarkMode: !payload  };

    default:
      return state;
  }
};

export default uiReducer;

// Make darkMode type
// setup dark mode in uiReducer
// create an action for darkMode
