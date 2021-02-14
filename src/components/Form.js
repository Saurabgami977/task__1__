//Library Import
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

//Mui Imports
import { Button, Card, makeStyles, TextField, Typography } from '@material-ui/core';

//Local Imports
import db from '../firebase';

//MUI styles
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

//Props passed from Update Modal checks if is is passed
const Form = ({ action = 'add', id }) => {
    //Constants
    const classes = useStyles()
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    useEffect(() => {
        id && db
            .collection('contacts')
            .doc(id)
            .get()
            .then((res) => (
                setName(res.data()?.name),
                setNumber(res.data()?.number)
            ))
    }, [id])

    //SubmitHandler for creating contact 
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

    //updateHandler only runs if props ID is passed
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
            {/* Shows update in modal for better understanding */}
            {
                id ?
                    <Typography variant="h3" align="center">Update</Typography>
                    : null
            }
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
                    onClick={(e) => action === 'add'
                        // if props.action === 'update' then goes to updateHandler function
                        ? submitHandler(e, name, number)
                        : updateHandler(e, name, number, id)
                    }
                >
                    Submit
            </Button>
            </form>
        </Card>
    )
}

export default Form
