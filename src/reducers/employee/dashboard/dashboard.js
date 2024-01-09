import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  assetNumber: [],
  openTicket: [],
  closeTicket: [],
  assetCategory: [],
  state: "idle",
  error: null,
};

export const employeeDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DASHBOARD_EMPLOYEE_ASSET:
      return {
        ...state,
        assetNumber: action.payload,
      };
    case actionTypes.GET_DASHBOARD_EMPLOYEE_OPEN:
      return {
        ...state,
        openTicket: action.payload,
      };
    case actionTypes.GET_DASHBOARD_EMPLOYEE_CLOSE:
      return {
        ...state,
        closeTicket: action.payload,
      };
    case actionTypes.GET_DASHBOARD_EMPLOYEE_CATEGORY:
      return {
        ...state,
        assetCategory: action.payload,
      };
    default:
      return state;
  }
};

export default employeeDashboardReducer;
