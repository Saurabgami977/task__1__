import * as actionTypes from './actionTypes';
import db from '../../firebase';


const fetchData = (data) => {
    return {
        type: actionTypes.FETCH_CONTACTS,
        payload: data
    }
}

export const fetchContacts = () => {
    return dispatch => {
        //first added contact will go to lastIndex
        db.collection('contacts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            dispatch(fetchData([...snapshot.docs.map(doc => ({ id: doc.id, contact: doc.data() }))]))
        })
    }
}
