import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getProductDetails } from '../apis';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3)
  }
}));

export default function ProductShow({ match }) {
  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if(match.params && match.params.length !== 0){
      getProductDetails(auth.token, match.params.id)
      .then(res => setProduct(res.data))
      .catch(error => console.log(error))
    }
  }, [])

  return (
    <div className={classes.root}>
      <Card>
        {
          !!product ?
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              { product.name }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>Category :</strong>  { product.category } <br/>
              <strong>Color :</strong>  { product.color } <br/>
              <strong>Material :</strong>  { product.material } <br/>
              <strong>Price :</strong>  { product.price } <br/>
            </Typography>
          </CardContent> :
          <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
              No Data Found
            </Typography>
          </CardContent>
        }
      </Card>
    </div>
  )
}
