import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    ticket: [],
    ticketById:[],
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
            case actionTypes.GET_ADMIN_TICKET_BY_ID:
                return {
                    ...state,
                    ticketById: action.payload,
                };
        default:
            return state;
    }
};

export default adminTicketReducer;