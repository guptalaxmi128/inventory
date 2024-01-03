import { ADD_MEMBER,GET_MEMBER } from "../../constants/actionTypes";
import * as api from "../../api";


export const addMember = (member) => async (dispatch) => {
    try {
        const { data } = await api.addMember(member);
        dispatch({ type: ADD_MEMBER, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMember = () => async (dispatch) => {
  
    try {
        const { data } = await api.getMember();
        console.log(data)
        dispatch({ type: GET_MEMBER, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
