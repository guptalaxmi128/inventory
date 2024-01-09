import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    storeKeeper: [],
    state: 'idle', 
    success:null,
    error: null
};

export const storeKeeperProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case actionTypes.GET_STORE_KEEPER_PROFILE:
            return {
                ...state,
                storeKeeper: action.payload,
            };
            case actionTypes.UPDATE_STOREKEEPER_PROFILE:
                return {
                  ...state,
                  success: action.payload,
                  error: null,
                };
        default:
            return state;
    }
};

export default storeKeeperProfileReducer ;