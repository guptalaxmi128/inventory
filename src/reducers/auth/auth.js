import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  auth: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null,
  state: "idle",
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        auth: action.payload,
        state: "success",
        error: null,
      };
    case actionTypes.LOGOUT_ADMIN:
    case actionTypes.LOGOUT_EMPLOYEE:
    case actionTypes.LOGOUT_STORE:
    case actionTypes.LOGOUT_TECHNICIAN:
        localStorage.removeItem('profile');
      return {
        ...state,
        auth: null,
        state: "success",
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
