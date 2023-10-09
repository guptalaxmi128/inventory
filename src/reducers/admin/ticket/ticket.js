import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    ticket: [],
    state: 'idle', 
    error: null
};

export const adminTicketReducer = (state = initialState, action) => {
    switch (action.type) {
       
        case actionTypes.GET_ADMIN_TICKET:
            return {
                ...state,
                ticket: action.payload,
            };
        default:
            return state;
    }
};

export default adminTicketReducer;