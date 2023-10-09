import { LOGIN } from "../../constants/actionTypes";
import * as api from "../../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: LOGIN, payload: data });
    if (data && data.post === 'ADMIN') {
        history('/admin/dashboard');
      } else if (data && data.post === 'EMPLOYEE') {
        history('/employee/dashboard');
      } else if (data && data.post === 'STORE KEEPER') {
        history('/storeKeeper/dashboard');
      } else if (data && data.post === 'IT TECHNICIAN') {
        history('/ITTechnician/dashboard');
      } else {
        history('/');
      }
  } catch (error) {
    console.log(error);
  }
};
