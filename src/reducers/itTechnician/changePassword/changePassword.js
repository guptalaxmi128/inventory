import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const changePasswordTechnicianReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_PASSWORD_TECHNICIAN:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };

    default:
      return state;
  }
};

export default changePasswordTechnicianReducer;
