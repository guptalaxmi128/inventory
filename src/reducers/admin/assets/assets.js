import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  assets: [],
  assetsById: [],
  assignAsset:[],
  state: "idle",
  success: null,
  error: null,
};

export const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_ASSETS:
      return {
        ...state,
        assets: action.payload,
      };
      case actionTypes.GET_ASSIGN_ASSETS:
        return {
          ...state,
          assignAsset: action.payload,
        };
    case actionTypes.GET_ADMIN_ASSETS_BY_ID:
      return {
        ...state,
        assetsById: action.payload,
      };
    case actionTypes.UPDATE_ADMIN_ASSETS:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default assetsReducer;
