import {
    GET_STORE_TOTAL_ASSET,
    GET_STORE_TOTAL_CATEGORY,
    GET_STORE_TOTAL_MEMBER
  } from "../../../constants/actionTypes";
  import * as api from "../../../api";
  
  export const getStoreTotalAsset= () => async (dispatch) => {
    try {
      const { data } = await api.getStoreTotalAsset();
      dispatch({ type: GET_STORE_TOTAL_ASSET, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getStoreTotalCategory = () => async (dispatch) => {
    try {
      const { data } = await api.getStoreTotalCategory();
      dispatch({ type: GET_STORE_TOTAL_CATEGORY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getStoreTotalMember = () => async (dispatch) => {
    try {
      const { data } = await api.getStoreTotalMember();
      dispatch({ type: GET_STORE_TOTAL_MEMBER, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  