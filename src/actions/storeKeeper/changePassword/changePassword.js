import {  CHANGE_PASSWORD_STORE_KEEPER} from "../../../constants/actionTypes";
import * as api from "../../../api";


export const changePasswordStoreKeeper = (password) => async (dispatch) => {
    try {
        const { data } = await api.changePasswordStoreKeeper(password);
        dispatch({ type: CHANGE_PASSWORD_STORE_KEEPER, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};