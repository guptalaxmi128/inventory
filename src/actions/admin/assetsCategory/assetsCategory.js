import { ADD_ASSETS_CATEGORY ,GET_ASSETS_CATEGORY} from "../../../constants/actionTypes";
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