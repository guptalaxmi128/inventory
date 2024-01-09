import {  GET_ADMIN_ASSETS, GET_ADMIN_ASSETS_BY_ID,UPDATE_ADMIN_ASSETS,GET_ASSIGN_ASSETS} from "../../../constants/actionTypes";
import * as api from "../../../api";

export const getAdminAssets  = () => async (dispatch) => {
    try {
        const { data } = await api.getAdminAssets();
        // console.log(data)
        dispatch({ type: GET_ADMIN_ASSETS, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



  export const getAdminAssetsById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAdminAssetsById(id);
        dispatch({ type: GET_ADMIN_ASSETS_BY_ID, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAssignAssets = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAssignAssets(id);
        dispatch({ type: GET_ASSIGN_ASSETS, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateAdminAssets = (assetsInfo) => async (dispatch) => {
    try {
      const { data } = await api.updateAdminAssets(assetsInfo);
      dispatch({ type: UPDATE_ADMIN_ASSETS, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };