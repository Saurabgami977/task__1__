import * as actionTypes from '../actions/actionTypes';


const initialState = {
    currentPage: 1,
    perPage: 5,
    start: 0,
    end: 5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PAGE:
            return {
                ...state,
                currentPage: action.payload,
                start: (action.payload - 1) * state.perPage,
                end: action.payload * state.perPage
            }
        default:
            return state;
    }
}

export default reducer;