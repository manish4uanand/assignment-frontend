import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardHeader, CardContent,
  CardActions, TextField, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import { verifyUserAndLogin } from '../store/auth';
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2)
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const [emailError, setEmailError] = useState(false)

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const changeHandler = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value })
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validateEmail(login.email)) {
      dispatch(verifyUserAndLogin(login))
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
                <CardHeader title="Sign In" />
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <TextField
                      fullWidth
                      required
                      margin="normal"
                      id="email"
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={login.email}
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
                      value={login.password}
                      onChange={changeHandler}
                    />
                  </CardContent>
                  <CardActions>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Sign In
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
