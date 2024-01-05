import { ADD_ASSETS_STORE, GET_ASSETS_STORE,UPDATE_ASSETS,GET_ASSETS_BY_ID } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const addAssets = (assetsInfo) => async (dispatch) => {
    try {
        const { data } = await api.addAssets(assetsInfo);
        dispatch({ type: ADD_ASSETS_STORE, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAssets  = () => async (dispatch) => {
    try {
        const { data } = await api.getAssets();
        // console.log(data)
        dispatch({ type: GET_ASSETS_STORE, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const updateAssets = (assetsInfo) => async (dispatch) => {
    try {
      const { data } = await api.updateAssets(assetsInfo);
      dispatch({ type: UPDATE_ASSETS, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getAssetsById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAssetsById(id);
        dispatch({ type: GET_ASSETS_BY_ID, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }