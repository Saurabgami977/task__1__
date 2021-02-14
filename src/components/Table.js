//Library Import
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Mui Import
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Modal,
    Card,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';

//Local Import
import db from '../firebase';
import Form from './Form';
import { fetchContacts } from '../store/actions/contactsAction';
import { paginate } from '../store/actions/paginationAction';

//Mui Styles
const useStyles = makeStyles({
    modal: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        width: 500,
        padding: 30
    }
})

const MyTable = () => {
    //constants
    const TableHeadings = ['ID', 'Name', 'Number', 'Action'];
    const classes = useStyles();
    const [modal, setModal] = useState(false)

    //Redux-hooks
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contactsReducer.contacts)
    const currentPage = useSelector(state => state.pageReducer.currentPage)
    const start = useSelector(state => state.pageReducer.start)
    const end = useSelector(state => state.pageReducer.end)
    const filteredData = useSelector(state => state.searchReducer.filteredData)

    // console.log(start, end, contacts?.length) Debugging

    // map filtered data if user has started searching otherwise as usual contact
    const toMap = filteredData ? filteredData : contacts

    useEffect(() => {
        //fetch data onPageLoad, onChange, update, delete (firebase)
        dispatch(fetchContacts())
    }, [dispatch])

    return (
        <>
            {/* Modal */}
            <Modal
                open={modal !== false ? true : false}
                className={classes.modal}
                onClose={() => setModal(false)}
            >
                <Card className={classes.modalCard}>
                    <Form action='update' id={modal} />
                </Card>
            </Modal>
            {/* Table */}
            <TableContainer component={Paper} className={classes.tableBody}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                TableHeadings.map((head, index) => (
                                    <TableCell
                                        align={index > 0 ? 'right' : 'left'}
                                        key={index}>
                                        {head}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            // Global store (contacts)

                            toMap
                                ?.slice(start, end)
                                ?.map((contact, index) => (
                                    //pagination on the basis of index and start/end logic
                                    (<TableRow key={contact.id}>
                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell align="right">{contact.contact.name}</TableCell>
                                        <TableCell align="right">{contact.contact.number}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => setModal(contact.id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={e => {
                                                    db.collection('contacts').doc(contact.id).delete()
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>)
                                ))
                        }
                    </TableBody>
                </Table>
                <Pagination
                    page={currentPage}
                    onChange={(_, page) => dispatch(paginate(page))}
                    count={Math.ceil(contacts?.length / 5)}
                    size="large" color='primary'
                    style={{ margin: '10px 0px' }}
                />
            </TableContainer >
        </>
    )
}

export default MyTable
