import { GET_TECHNICIAN_TICKET,UPDATE_TICKET,GET_TICKET_BY_ID} from "../../../constants/actionTypes";
import * as api from "../../../api";

export const getTechnicianTicket  = () => async (dispatch) => {
    try {
        const { data } = await api.getTechnicianTicket ();
        console.log(data)
        dispatch({ type: GET_TECHNICIAN_TICKET, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateTicket = (formData) => async (dispatch) => {
    try {
      const response = await api.updateTicket(formData);
      dispatch({ type: UPDATE_TICKET, payload: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getTicketById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getTicketById(id);
        dispatch({ type: GET_TICKET_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
}