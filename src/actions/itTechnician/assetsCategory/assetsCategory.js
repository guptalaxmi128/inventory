import { GET_ASSETS_CATEGORY_TECHNICIAN } from "../../../constants/actionTypes";
import * as api from "../../../api";



export const getAssetsCategoryTechnician  = () => async (dispatch) => {
    try {
        const { data } = await api.getAssetsCategoryTechnician();
        dispatch({ type: GET_ASSETS_CATEGORY_TECHNICIAN, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};