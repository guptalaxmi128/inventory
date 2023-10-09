import { GET_ADMIN_PROFILE } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const getAdminProfile = () => async (dispatch) => {
  
    try {
        const { data } = await api.getAdminProfile();
        console.log(data)
        dispatch({ type: GET_ADMIN_PROFILE, payload: data });
    } catch (error) {
        console.log(error);
    }
};