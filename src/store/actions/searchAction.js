import * as actionTypes from './actionTypes';
import db from '../../firebase';


const saveFilteredData = (data) => {
    return {
        type: actionTypes.SEARCH,
        payload: data
    }
}

export const filteredSearch = (search) => {
    return dispatch => {
        search ? db.collection('contacts')
            //filtering by name
            .orderBy('name')
            .startAt(search)
            .endAt(search + "\uf8ff")
            .onSnapshot(snapshot => {
                dispatch(saveFilteredData([...snapshot.docs.map(doc => ({
                    id: doc.id,
                    contact: doc.data()
                }))]))
            })
            : dispatch(saveFilteredData(null))

    }
}
