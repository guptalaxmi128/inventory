import { GET_STORE_KEEPER_PROFILE,UPDATE_STOREKEEPER_PROFILE } from "../../../constants/actionTypes";
import * as api from "../../../api";


export const getStoreKeeperProfile = () => async (dispatch) => {
    try {
        const { data } = await api.getStoreKeeperProfile();
        dispatch({ type: GET_STORE_KEEPER_PROFILE, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateStoreKeeperProfile = (storeKeeperInfo) => async (dispatch) => {
    try {
      const { data } = await api.updateStoreKeeperProfile(storeKeeperInfo);
      dispatch({ type: UPDATE_STOREKEEPER_PROFILE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };