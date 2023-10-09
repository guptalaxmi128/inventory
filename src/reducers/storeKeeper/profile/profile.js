import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    storeKeeper: [],
    state: 'idle', 
    error: null
};

export const storeKeeperProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case actionTypes.GET_STORE_KEEPER_PROFILE:
            return {
                ...state,
                storeKeeper: action.payload,
            };
        default:
            return state;
    }
};

export default storeKeeperProfileReducer ;