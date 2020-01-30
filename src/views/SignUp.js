import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardHeader, CardContent,
  CardActions, TextField, Button, FormGroup,
  FormControlLabel, Switch
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import { RegisterUser } from '../store/auth';
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2)
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [emailError, setEmailError] = useState(false)

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const changeHandler = (event) => {
    setSignUp({ ...signUp, [event.target.name]: event.target.value })
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validateEmail(signUp.email)) {
      dispatch(RegisterUser(signUp))
    } else {
      setEmailError(true)
    }
  }

  return (
    <>
      {
        !!auth.token ?
          <Redirect to="/" /> :
          <Grid container justify="center">
            <Grid item xs={12} md={3}></Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardHeader title="Sign Up" />
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <TextField
                      fullWidth
                      required
                      margin="normal"
                      id="name"
                      label="Name"
                      name="name"
                      type="name"
                      variant="outlined"
                      value={signUp.name}
                      onChange={changeHandler}
                    />
                    <TextField
                      fullWidth
                      required
                      margin="normal"
                      id="email"
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={signUp.email}
                      onChange={changeHandler}
                      error={emailError}
                      helperText="Incorrect Email."
                    />
                    <TextField
                      fullWidth
                      required
                      margin="normal"
                      name="password"
                      type="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      value={signUp.password}
                      onChange={changeHandler}
                    />
                  </CardContent>
                  <CardActions>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Register
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}></Grid>
          </Grid>
      }
    </>
  );
}
