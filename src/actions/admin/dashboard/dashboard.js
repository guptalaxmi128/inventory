import {
    GET_TOTAL_ASSET,
    GET_TOTAL_CATEGORY,
    GET_TOTAL_EMPLOYEE,
    GET_TOTAL_MEMBER
  } from "../../../constants/actionTypes";
  import * as api from "../../../api";
  
  export const getTotalAsset= () => async (dispatch) => {
    try {
      const { data } = await api.getTotalAsset();
      dispatch({ type: GET_TOTAL_ASSET, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getTotalCategory = () => async (dispatch) => {
    try {
      const { data } = await api.getTotalCategory();
      dispatch({ type: GET_TOTAL_CATEGORY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getTotalEmployee = () => async (dispatch) => {
    try {
      const { data } = await api.getTotalEmployee();
      dispatch({ type: GET_TOTAL_EMPLOYEE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getTotalMember = () => async (dispatch) => {
    try {
      const { data } = await api.getTotalMember();
      dispatch({ type: GET_TOTAL_MEMBER, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  