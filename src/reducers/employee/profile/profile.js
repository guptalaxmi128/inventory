import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    employee: [],
    state: 'idle', 
    error: null
};

export const employeeProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case actionTypes.GET_EMPLOYEE_PROFILE:
            return {
                ...state,
                employee: action.payload,
            };
        default:
            return state;
    }
};

export default employeeProfileReducer;