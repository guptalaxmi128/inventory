import { CHANGE_PASSWORD_EMPLOYEE} from "../../../constants/actionTypes";
import * as api from "../../../api";


export const changePasswordEmployee = (password) => async (dispatch) => {
    try {
        const { data } = await api.changePasswordEmployee(password);
        dispatch({ type: CHANGE_PASSWORD_EMPLOYEE, payload: data });
    } catch (error) {
        console.log(error);
    }
};