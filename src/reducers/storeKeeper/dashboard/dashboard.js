import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    totalAsset: [],
    totalCategory:[],
    totalMember:[],
    state: 'idle', 
    error: null
};

export const storeKeeperDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_STORE_TOTAL_ASSET:
            return {
                ...state,
                totalAsset: action.payload,
            };
        case actionTypes.GET_STORE_TOTAL_CATEGORY:
            return {
                ...state,
                totalCategory: action.payload,
            };
            case actionTypes.GET_STORE_TOTAL_MEMBER:
                return {
                    ...state,
                    totalMember: action.payload,
                };
        default:
            return state;
    }
};

export default storeKeeperDashboardReducer;