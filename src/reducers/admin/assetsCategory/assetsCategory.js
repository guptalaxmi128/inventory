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
            case actionTypes.DELETE_ASSETS_CATEGORY:
                const assetCategoriesIdToDelete = action.payload;
                return {
                  ...state,
                  category: state.category.data.filter((category) => category.id !== assetCategoriesIdToDelete),
                };
        default:
            return state;
    }
};

export default assetsCategoryReducer;