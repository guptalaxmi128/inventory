import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    technicianemployee: [],
    state: 'idle', 
    error: null
};

export const  technicianEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.GET_TECHNICIAN_EMPLOYEE:
            return {
                ...state,
                technicianemployee: action.payload,
            };
          
        default:
            return state;
    }
};

export default  technicianEmployeeReducer;