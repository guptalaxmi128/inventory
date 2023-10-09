import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    category: [],
    state: 'idle', 
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
        default:
            return state;
    }
};

export default assetsCategoryStoreReducer;