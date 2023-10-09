import { GET_STORE_KEEPER_PROFILE } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const getStoreKeeperProfile = () => async (dispatch) => {
  
    try {
        const { data } = await api.getStoreKeeperProfile();
        console.log(data)
        dispatch({ type: GET_STORE_KEEPER_PROFILE, payload: data });
    } catch (error) {
        console.log(error);
    }
};