import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contacts: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        default:
            return state;
    }
}

export default reducer;