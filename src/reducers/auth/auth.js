import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    auth: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null,
    state: 'idle',
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return {
                ...state,
                auth: action.payload,
                state: 'success',
                error: null
            };
        // case actionTypes.LOGOUT:
        //     localStorage.clear();
        //     return {
        //         ...state,
        //         auth: null,
        //         state: 'success',
        //         error: null
        //     };
        default:
            return state;
    }
};

export default authReducer;
