import { GET_TECHNICIAN_EMPLOYEE} from "../../../constants/actionTypes";
import * as api from "../../../api";

export const getTechnicianEmployee  = () => async (dispatch) => {
    try {
        const { data } = await api.getTechnicianEmployee ();
        dispatch({ type: GET_TECHNICIAN_EMPLOYEE, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};