import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const changePasswordEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_PASSWORD_EMPLOYEE:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };

    default:
      return state;
  }
};

export default changePasswordEmployeeReducer;
