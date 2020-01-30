import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStories } from '../apis';
import {
  Grid, CircularProgress, Button, Dialog,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

}));

export default function Dashboard() {
  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  
  return (
    <>
      Welcome to Dashboard
    </>
  );
}
