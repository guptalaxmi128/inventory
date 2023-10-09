import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    category: [],
    state: 'idle', 
    error: null
};

export const assetsCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ASSETS_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
            };
        case actionTypes.GET_ASSETS_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };
        default:
            return state;
    }
};

export default assetsCategoryReducer;