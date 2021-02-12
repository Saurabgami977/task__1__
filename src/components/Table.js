import React, { useEffect, useState } from 'react';

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
    Container,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';

import db from '../firebase';
import Form from './Form';

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
    const classes = useStyles();
    const [contacts, setContacts] = useState()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        db.collection('contacts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setContacts([...snapshot.docs.map(doc => ({ id: doc.id, contact: doc.data() }))])
        })
    }, [])

    return (
        <>
            <Modal open={modal !== false ? true : false} className={classes.modal}>
                <Card className={classes.modalCard}>
                    <Form action='update' id={modal} />
                </Card>
            </Modal>
            <TableContainer component={Paper} className={classes.tableBody}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Number</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            contacts?.map((contact, index) => (
                                <TableRow key={contact.id}>
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
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <Pagination count={10} size="large" color='primary' style={{ margin: '10px 0px' }} />
            </TableContainer >
        </>
    )
}

export default MyTable
