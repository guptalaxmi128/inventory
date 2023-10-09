import { GET_EMPLOYEE_PROFILE } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const getEmployeeProfile = () => async (dispatch) => {
  
    try {
        const { data } = await api.getEmployeeProfile();
        console.log(data)
        dispatch({ type: GET_EMPLOYEE_PROFILE, payload: data });
    } catch (error) {
        console.log(error);
    }
};