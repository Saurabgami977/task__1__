import * as actionTypes from './actionTypes';


export const paginate = (page) => {
    return {
        type: actionTypes.SET_PAGE,
        payload: page
    }
}