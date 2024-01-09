import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    ticketNumber: [],
    openTicket:[],
    closeTicket:[],
    state: 'idle', 
    error: null
};

export const technicianDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DASHBOARD_TECHNICIAN_TICKET:
            return {
                ...state,
                ticketNumber: action.payload,
            };
        case actionTypes.GET_DASHBOARD_TECHNICIAN_OPEN:
            return {
                ...state,
                openTicket: action.payload,
            };
            case actionTypes.GET_DASHBOARD_TECHNICIAN_CLOSE:
                return {
                    ...state,
                    closeTicket: action.payload,
                };
        default:
            return state;
    }
};

export default technicianDashboardReducer;