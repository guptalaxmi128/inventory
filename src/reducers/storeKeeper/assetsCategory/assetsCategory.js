import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    category: [],
    state: 'idle', 
    success:null,
    error: null
};

export const assetsCategoryStoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ASSETS_CATEGORY_STORE:
            return {
                ...state,
                category: action.payload.category,
            };
        case actionTypes.GET_ASSETS_CATEGORY_STORE:
            return {
                ...state,
                category: action.payload,
            };
            case actionTypes.UPDATE_STORE_ASSETS_CATEGORY:
                return {
                  ...state,
                  success: action.payload,
                  error: null,
                };
        default:
            return state;
    }
};

export default assetsCategoryStoreReducer;