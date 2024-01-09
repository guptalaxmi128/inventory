import { GET_TECHNICIAN_PROFILE,UPDATE_TECHNICIAN_PROFILE } from "../../../constants/actionTypes";
import * as api from "../../../api";

export const getTechnicianProfile = () => async (dispatch) => {
  try {
    const { data } = await api.getTechnicianProfile();
    dispatch({ type: GET_TECHNICIAN_PROFILE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateTechnicianProfile = (technicianInfo) => async (dispatch) => {
    try {
      const { data } = await api.updateTechnicianProfile(technicianInfo);
      dispatch({ type: UPDATE_TECHNICIAN_PROFILE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };