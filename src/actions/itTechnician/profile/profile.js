import { GET_TECHNICIAN_PROFILE } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const getTechnicianProfile = () => async (dispatch) => {
  
    try {
        const { data } = await api.getTechnicianProfile();
        console.log(data)
        dispatch({ type: GET_TECHNICIAN_PROFILE, payload: data });
    } catch (error) {
        console.log(error);
    }
};