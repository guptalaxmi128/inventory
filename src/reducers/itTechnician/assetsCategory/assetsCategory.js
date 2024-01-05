import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    techniciancategory: [],
    state: 'idle', 
    error: null
};

export const  technicianCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.GET_ASSETS_CATEGORY_TECHNICIAN:
            return {
                ...state,
                techniciancategory: action.payload,
            };
          
        default:
            return state;
    }
};

export default  technicianCategoryReducer;