import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  employee: [],
  state: "idle",
  success: null,
  error: null,
};

export const employeeProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EMPLOYEE_PROFILE:
      return {
        ...state,
        employee: action.payload,
      };
    case actionTypes.UPDATE_EMPLOYEE_PROFILE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default employeeProfileReducer;
