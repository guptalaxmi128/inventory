import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    members: [],
    // deletedEmployee: [],
    state: 'idle', // idle, loading, success, error
    error: null
};

export const addMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MEMBER:
            // case actionTypes.RESTORE_EMPLOYEE:
            return {
                ...state,
                members: action.payload.members
            };
        case actionTypes.GET_MEMBER:
            return {
                ...state,
                members: action.payload,
            };
        //     case actionTypes.GET_DELETE_EMPLOYEE:
        //         return {
        //             ...state,
        //             deletedEmployee: action.payload,
        //         };
        //     case actionTypes.DELETE_EMPLOYEE:
        //         const updatedEmployee = [];
        //         for (let i = 0; i < state.employee.length; i++) {
        //           if (state.employee[i].code !== action.payload) {
        //             updatedEmployee.push(state.employee[i]);
        //           }
        //         }
        //         return {
        //           ...state,
        //           employee: updatedEmployee,
        //         };
        default:
            return state;
    }
};

export default addMemberReducer;