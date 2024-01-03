import { GET_ADMIN_TICKET } from "../../../constants/actionTypes";
import * as api from "../../../api";




export const getAdminTicket = () => async (dispatch) => {
    try {
        const { data } = await api.getAdminTicket();
        // console.log(data)
        dispatch({ type: GET_ADMIN_TICKET, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};