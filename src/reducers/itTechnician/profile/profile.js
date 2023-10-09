import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    technician: [],
    state: 'idle', 
    error: null
};

export const technicianProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case actionTypes.GET_TECHNICIAN_PROFILE:
            return {
                ...state,
                technician: action.payload,
            };
        default:
            return state;
    }
};

export default technicianProfileReducer;