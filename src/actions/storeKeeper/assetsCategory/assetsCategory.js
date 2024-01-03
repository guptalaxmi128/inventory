import { ADD_ASSETS_CATEGORY_STORE ,GET_ASSETS_CATEGORY_STORE} from "../../../constants/actionTypes";
import * as api from "../../../api";



export const addAssetsCategoryStore = (category) => async (dispatch) => {
    try {
        const { data } = await api.addAssetsCategoryStore(category);
        dispatch({ type: ADD_ASSETS_CATEGORY_STORE, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAssetsCategoryStore = () => async (dispatch) => {
    try {
        const { data } = await api.getAssetsCategoryStore();
        dispatch({ type: GET_ASSETS_CATEGORY_STORE, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};