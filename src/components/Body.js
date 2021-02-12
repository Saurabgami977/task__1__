import React from 'react';

import {
    Container,
    Grid,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import Form from './Form';
import Table from './Table';


const useStyles = makeStyles({
    grid: {
        boxSizing: 'border-box'
    }
})

function Body() {
    const classes = useStyles()
    return (
        <Container>
            <Grid container className={classes.grid} center="true" spacing={2}>
                <Grid item xs={12}>
                    <Paper style={{ marginTop: 10 }}>
                        <Typography variant="h1" align="center">Add to Contact</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Form />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <Table />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Body
