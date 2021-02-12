import React, { useState } from 'react';

import { Button, Card, makeStyles, TextField } from '@material-ui/core';
import db from '../firebase';
import firebase from 'firebase';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '30vh',
    },
    input: {
        padding: '10px 0px',
        margin: '5px 10px'
    },
    btn: {
        margin: '5px'
    }
})


const Form = ({ action = 'add', id }) => {
    const classes = useStyles()
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const submitHandler = (e, name, number) => {
        e.preventDefault();
        (name && number) ? (
            db.collection('contacts').add({
                name: name,
                number: number,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })) : alert('Please Enter Valid Data')
        setName('');
        setNumber('')
    }

    const updateHandler = (e, name, number, id) => {
        e.preventDefault();
        (name && number) ? (
            db.collection('contacts').doc(id).set({
                name: name,
                number: number,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true })) : alert('Please Enter Valid Data')
        setName('');
        setNumber('')
    }
    return (
        <Card>
            <form className={classes.root}>
                <TextField
                    className={classes.input}
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    className={classes.input}
                    label="Phone Number"
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <Button
                    className={classes.btn}
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={(e) => action === 'add' ? submitHandler(e, name, number) : updateHandler(e, name, number, id)}
                >
                    Submit
            </Button>
            </form>
        </Card>
    )
}

export default Form
