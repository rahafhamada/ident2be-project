import UITypes from "./ui.types";

export const setApMainColorAction = (payload) => ({
  type: UITypes.SET_MAIN_APP_COLOR,
  payload
})

export const setDarkMode = (payload) => ({
  type: UITypes.SET_DARK_MODE,
  payload 
})
