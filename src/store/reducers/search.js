import * as actionTypes from '../actions/actionTypes';


const initialState = {
    filteredData: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH:
            return {
                filteredData: action.payload
            }
        default:
            return state;
    }
}

export default reducer;