import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    align: 'right'
  }
}));

export default function NavBar({ auth }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout())
    history.push('/sign-in')
  }

  return (
    <div className={classes.root}>
      <AppBar color="default" position="static">
        <Toolbar>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
          </Box>
            <Typography variant="h6" className={classes.title}>
            </Typography>
          {
            (auth.token && !!auth.token) ?  
              <>
                <Typography variant="h6" className={classes.menuButton}>
                  { auth && auth.current_user && auth.current_user.name }
                </Typography>
                <Button onClick={logoutUser}  variant="contained">Log Out</Button>
              </>  
            :
              <>
                <Button onClick={() => history.push('/sign-in')} className={classes.menuButton} variant="contained" color="primary">Sign In</Button>
                <Button onClick={() => history.push('/sign-up')} className={classes.menuButton} variant="contained" color="primary">Sign Up</Button>
              </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}