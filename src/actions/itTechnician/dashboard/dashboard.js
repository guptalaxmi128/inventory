import {
    GET_DASHBOARD_TECHNICIAN_TICKET,
    GET_DASHBOARD_TECHNICIAN_OPEN,
    GET_DASHBOARD_TECHNICIAN_CLOSE,
  } from "../../../constants/actionTypes";
  import * as api from "../../../api";
  
  export const getDashboardTechnicianTicket= () => async (dispatch) => {
    try {
      const { data } = await api.getDashboardTechnicianTicket();
      dispatch({ type: GET_DASHBOARD_TECHNICIAN_TICKET, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getDashboardTechnicianOpen = () => async (dispatch) => {
    try {
      const { data } = await api.getDashboardTechnicianOpen();
      dispatch({ type: GET_DASHBOARD_TECHNICIAN_OPEN, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getDashboardTechnicianClose = () => async (dispatch) => {
    try {
      const { data } = await api.getDashboardTechnicianClose();
      dispatch({ type: GET_DASHBOARD_TECHNICIAN_CLOSE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  