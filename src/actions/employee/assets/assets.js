import { GET_EMPLOYEE_ASSETS} from "../../../constants/actionTypes";
import * as api from "../../../api";

export const getEmployeeAssets  = () => async (dispatch) => {
    try {
        const { data } = await api.getEmployeeAssets();
        // console.log(data)
        dispatch({ type: GET_EMPLOYEE_ASSETS, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
