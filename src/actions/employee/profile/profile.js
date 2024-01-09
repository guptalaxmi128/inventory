import { GET_EMPLOYEE_PROFILE,UPDATE_EMPLOYEE_PROFILE } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const getEmployeeProfile = () => async (dispatch) => {
    try {
        const { data } = await api.getEmployeeProfile();
        dispatch({ type: GET_EMPLOYEE_PROFILE, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const updateEmployeeProfile = (employeeInfo) => async (dispatch) => {
    try {
      const { data } = await api.updateEmployeeProfile(employeeInfo);
      dispatch({ type: UPDATE_EMPLOYEE_PROFILE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };