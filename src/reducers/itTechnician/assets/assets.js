import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    assets: [],
    state: 'idle',
    error: null
};

export const assetsTechnicianReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ASSETS_TECHNICIAN:
            return {
                ...state,
                assets: action.payload.assets
            };
        case actionTypes.GET_ASSETS_TECHNICIAN:
            return {
                ...state,
                assets: action.payload,
            };
      
        default:
            return state;
    }
};

export default assetsTechnicianReducer;