import { ADD_ASSETS_CATEGORY ,GET_ASSETS_CATEGORY,DELETE_ASSETS_CATEGORY,UPDATE_ADMIN_ASSETS_CATEGORY} from "../../../constants/actionTypes";
import * as api from "../../../api";



export const addAssetsCategory = (category) => async (dispatch) => {
    try {
        const { data } = await api.addAssetsCategory(category);
        dispatch({ type: ADD_ASSETS_CATEGORY, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAssetsCategory = () => async (dispatch) => {
    try {
        const { data } = await api.getAssetsCategory();
        dispatch({ type: GET_ASSETS_CATEGORY, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteAssetsCategory = (id) => async (dispatch) => {
    try {
      const response = await api.deleteAssetsCategory(id);
      dispatch({ type: DELETE_ASSETS_CATEGORY, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const updateAdminAssetCategory = (assetsInfo) => async (dispatch) => {
    try {
      const { data } = await api.updateAdminAssetCategory(assetsInfo);
      dispatch({ type: UPDATE_ADMIN_ASSETS_CATEGORY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };