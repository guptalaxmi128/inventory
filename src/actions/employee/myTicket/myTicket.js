import { ADD_MY_TICKET, GET_MY_TICKET,GET_EMPLOYEE_TICKET_BY_ID } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const addMyTicket = (ticket) => async (dispatch) => {
    try {
        const { data } = await api.addMyTicket(ticket);
        dispatch({ type: ADD_MY_TICKET, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMyTicket = () => async (dispatch) => {
  
    try {
        const { data } = await api.getMyTicket();
        console.log(data)
        dispatch({ type: GET_MY_TICKET, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getEmployeeTicketById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getEmployeeTicketById(id);
        dispatch({ type: GET_EMPLOYEE_TICKET_BY_ID, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}