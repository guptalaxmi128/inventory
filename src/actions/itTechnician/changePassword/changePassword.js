import { CHANGE_PASSWORD_TECHNICIAN} from "../../../constants/actionTypes";
import * as api from "../../../api";


export const changePasswordTechnician = (password) => async (dispatch) => {
    try {
        const { data } = await api.changePasswordTechnician(password);
        dispatch({ type: CHANGE_PASSWORD_TECHNICIAN, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};