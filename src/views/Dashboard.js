import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, CircularProgress, Button, Dialog,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getProducts } from '../apis';
import ProductTable from '../components/ProductCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    padding: theme.spacing(3)
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // ComponentDidMount to fetch data on load
  useEffect(() => {
    getProducts(auth.token)
    .then(res => {
      setProducts(res.data)
      setIsLoading(false)
    })
    .catch(error => console.log(error))
  }, [])
  
  return (
    <div className={classes.root}>
      {
        isLoading ? 
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            </Grid>
            :
            <>
              {
                products && products.length !== 0 &&
                <ProductTable products={products} />
              }
            </>
        }
    </div>
  );
}
