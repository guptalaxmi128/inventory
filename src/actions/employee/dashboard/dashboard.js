import {
  GET_DASHBOARD_EMPLOYEE_ASSET,
  GET_DASHBOARD_EMPLOYEE_OPEN,
  GET_DASHBOARD_EMPLOYEE_CLOSE,
  GET_DASHBOARD_EMPLOYEE_CATEGORY
} from "../../../constants/actionTypes";
import * as api from "../../../api";

export const getDashboardEmployeeAsset= () => async (dispatch) => {
  try {
    const { data } = await api.getDashboardEmployeeAsset();
    dispatch({ type: GET_DASHBOARD_EMPLOYEE_ASSET, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDashboardEmployeeOpen = () => async (dispatch) => {
  try {
    const { data } = await api.getDashboardEmployeeOpen();
    dispatch({ type: GET_DASHBOARD_EMPLOYEE_OPEN, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDashboardEmployeeClose = () => async (dispatch) => {
  try {
    const { data } = await api.getDashboardEmployeeClose();
    dispatch({ type: GET_DASHBOARD_EMPLOYEE_CLOSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDashboardEmployeeCategory = () => async (dispatch) => {
  try {
    const { data } = await api.getDashboardEmployeeCategory();
    dispatch({ type: GET_DASHBOARD_EMPLOYEE_CATEGORY, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
