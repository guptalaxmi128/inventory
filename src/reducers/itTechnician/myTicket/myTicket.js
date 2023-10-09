import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    technicianticket: [],
    ticket: [],
    state: 'idle', 
    error: null
};

export const  technicianTicketReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.GET_TECHNICIAN_TICKET:
            return {
                ...state,
                technicianticket: action.payload,
            };
            case actionTypes.UPDATE_TICKET:
                return {
                    ...state,
                    technicianticket: action.payload,
                };
                case actionTypes.GET_TICKET_BY_ID:
                    return {
                        ...state,
                        ticket: action.payload,
                    };
        default:
            return state;
    }
};

export default  technicianTicketReducer;