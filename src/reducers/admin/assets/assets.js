import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    assets: [],
    assetsById: [],
    state: 'idle', 
    error: null
};

export const  assetsReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.GET_ADMIN_ASSETS:
            return {
                ...state,
                assets: action.payload,
            };
          
                case actionTypes.GET_ADMIN_ASSETS_BY_ID:
                    return {
                        ...state,
                        assetsById: action.payload,
                    };
        default:
            return state;
    }
};

export default  assetsReducer;