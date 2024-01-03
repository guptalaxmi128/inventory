import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    assets: [],
    state: 'idle', 
    success:null,
    error: null
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
        default:
            return state;
    }
};

export default assetsStoreReducer;