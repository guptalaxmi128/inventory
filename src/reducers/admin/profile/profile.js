import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    admin: [],
    state: 'idle', 
    error: null
};

export const adminProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case actionTypes.GET_ADMIN_PROFILE:
            return {
                ...state,
                admin: action.payload,
            };
        default:
            return state;
    }
};

export default adminProfileReducer ;