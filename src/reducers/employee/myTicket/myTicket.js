import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    myticket: [],
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
        default:
            return state;
    }
};

export default myTicketReducer;