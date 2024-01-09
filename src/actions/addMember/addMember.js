import { ADD_MEMBER,GET_MEMBER,UPDATE_MEMBER,GET_MEMBER_BY_ID } from "../../constants/actionTypes";
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

export const updateMember = (memberInfo) => async (dispatch) => {
    try {
      const { data } = await api.updateMember(memberInfo);
      dispatch({ type: UPDATE_MEMBER, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getMemberById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getMemberById(id);
        dispatch({ type: GET_MEMBER_BY_ID, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}