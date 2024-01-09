import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    technician: [],
    state: 'idle', 
    success:null,
    error: null
};

export const technicianProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case actionTypes.GET_TECHNICIAN_PROFILE:
            return {
                ...state,
                technician: action.payload,
            };
            case actionTypes.UPDATE_TECHNICIAN_PROFILE:
                return {
                  ...state,
                  success: action.payload,
                  error: null,
                };
        default:
            return state;
    }
};

export default technicianProfileReducer;