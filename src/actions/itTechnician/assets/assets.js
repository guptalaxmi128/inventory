import { ADD_ASSETS_TECHNICIAN,  GET_ASSETS_TECHNICIAN } from "../../../constants/actionTypes";
import * as api from "../../../api";

export const addAssetsTechnician = (assets) => async (dispatch) => {
    try {
        const { data } = await api.addAssetsTechnician(assets);
        dispatch({ type: ADD_ASSETS_TECHNICIAN, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAssetsTechnician  = () => async (dispatch) => {
    try {
        const { data } = await api.getAssetsTechnician();
        dispatch({ type: GET_ASSETS_TECHNICIAN, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};