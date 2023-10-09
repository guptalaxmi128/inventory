import {  GET_ADMIN_ASSETS, GET_ADMIN_ASSETS_BY_ID} from "../../../constants/actionTypes";
import * as api from "../../../api";

export const getAdminAssets  = () => async (dispatch) => {
    try {
        const { data } = await api.getAdminAssets();
        console.log(data)
        dispatch({ type: GET_ADMIN_ASSETS, payload: data });
    } catch (error) {
        console.log(error);
    }
};



  export const getAdminAssetsById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAdminAssetsById(id);
        dispatch({ type: GET_ADMIN_ASSETS_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
}