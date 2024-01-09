import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  asset: [],
  state: "idle",
  error: null,
};

export const employeeAssetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EMPLOYEE_ASSETS:
      return {
        ...state,
        asset: action.payload,
      };

    default:
      return state;
  }
};

export default employeeAssetsReducer;
