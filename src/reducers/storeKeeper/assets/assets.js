import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  assets: [],
  assetsById: [],
  state: "idle",
  success: null,
  error: null,
};

export const assetsStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ASSETS_STORE:
      return {
        ...state,
        assets: action.payload.assets,
      };
    case actionTypes.GET_ASSETS_STORE:
      return {
        ...state,
        assets: action.payload,
      };
    case actionTypes.UPDATE_ASSETS:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.GET_ASSETS_BY_ID:
      return {
        ...state,
        assetsById: action.payload,
      };
    default:
      return state;
  }
};

export default assetsStoreReducer;
