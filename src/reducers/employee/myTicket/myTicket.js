import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    myticket: [],
    ticketById:[],
    state: 'idle', 
    error: null
};

export const myTicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MY_TICKET:
            return {
                ...state,
                myticket: action.payload.myticket,
            };
        case actionTypes.GET_MY_TICKET:
            return {
                ...state,
                myticket: action.payload,
            };
            case actionTypes.GET_EMPLOYEE_TICKET_BY_ID:
                return {
                    ...state,
                    ticketById: action.payload,
                };
        default:
            return state;
    }
};

export default myTicketReducer;