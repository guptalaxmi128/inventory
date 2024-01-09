import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  totalAsset: [],
  totalCategory: [],
  totalEmployee: [],
  totalMember: [],
  state: "idle",
  error: null,
};

export const adminDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOTAL_ASSET:
      return {
        ...state,
        totalAsset: action.payload,
      };
    case actionTypes.GET_TOTAL_CATEGORY:
      return {
        ...state,
        totalCategory: action.payload,
      };
    case actionTypes.GET_TOTAL_EMPLOYEE:
      return {
        ...state,
        totalEmployee: action.payload,
      };
    case actionTypes.GET_TOTAL_MEMBER:
      return {
        ...state,
        totalMember: action.payload,
      };
    default:
      return state;
  }
};

export default adminDashboardReducer;
