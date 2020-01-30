import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
 
const useStyles = makeStyles( theme => ({
  paper: {
    margin: theme.spacing(3)
  },
  table: {
    minWidth: 650,
  },
  tableCell: {
    cursor: 'pointer'
  }
}));

export default function ProductCard({products}) {
  const classes = useStyles();
  const history = useHistory();
  const [filterProducts, setFilterProducts] = useState(products || [])
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [Material, setMaterial] = useState('');
  const [Category, setCategory] = useState('');
  const [Color, setColor] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if(Name !== '' && Name.length !== 0) {
      let filtered = products.filter(item => {
        return (item.name.toLowerCase().includes(Name.toLowerCase()))
      })
      setFilterProducts(filtered.slice(0, 25))
    } else {
      setFilterProducts(products)
    }
    setIsLoading(false)
  }, [Name])

  useEffect(() => {
    setIsLoading(true)
    if(Price !== '' && Price.length !== 0) {
      let filtered = products.filter(item => {
        return (item.price.toLowerCase().includes(Price.toLowerCase()))
      })
      setFilterProducts(filtered.slice(0, 25))
    } else {
      setFilterProducts(products)
    }
    setIsLoading(false)
  }, [Price])

  useEffect(() => {
    setIsLoading(true)
    if(Material !== '' && Material.length !== 0) {
      let filtered = products.filter(item => {
        return (item.material.toLowerCase().includes(Material.toLowerCase()))
      })
      setFilterProducts(filtered.slice(0, 25))
    } else {
      setFilterProducts(products)
    }
    setIsLoading(false)
  }, [Material])

  useEffect(() => {
    setIsLoading(true)
    if(Category !== '' && Category.length !== 0) {
      let filtered = products.filter(item => {
        return (item.category.toLowerCase().includes(Category.toLowerCase()))
      })
      setFilterProducts(filtered.slice(0, 25))
    } else {
      setFilterProducts(products)
    }
    setIsLoading(false)
  }, [Category])

  useEffect(() => {
    setIsLoading(true)
    if(Color !== '' && Color.length !== 0) {
      let filtered = products.filter(item => {
        return (item.color.toLowerCase().includes(Color.toLowerCase()))
      })
      setFilterProducts(filtered.slice(0, 25))
    } else {
      setFilterProducts(products)
    }
    setIsLoading(false)
  }, [Color])

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Price </TableCell>
              <TableCell align="left">Material</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Color</TableCell>
            </TableRow>
          </TableHead>

          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TextField 
                  id="standard-basic" 
                  label=""
                  placeholder="Search"
                  value={Name}
                  onChange={e => setName(e.target.value)} />
              </TableCell>
              <TableCell align="left">
                <TextField 
                  id="standard-basic" 
                  label=""
                  placeholder="Search"
                  value={Price}
                  onChange={e => setPrice(e.target.value)} /> </TableCell>
              <TableCell align="left">
                <TextField 
                  id="standard-basic" 
                  label=""
                  placeholder="Search"
                  value={Material}
                  onChange={e => setMaterial(e.target.value)} />
              </TableCell>
              <TableCell align="left">
                <TextField 
                  id="standard-basic" 
                  label=""
                  placeholder="Search"
                  value={Category}
                  onChange={e => setCategory(e.target.value)} />
              </TableCell>
              <TableCell align="left">
                <TextField 
                  id="standard-basic" 
                  label=""
                  placeholder="Search"
                  value={Color}
                  onChange={e => setColor(e.target.value)} />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { isLoading ?
              <Grid container justify="center">
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              </Grid> :
              <>
                { filterProducts && filterProducts.length !== 0 &&
                  filterProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell className={classes.tableCell} align="left" onClick={() => history.push(`/products/${product.id}`)}>{product.name}</TableCell>
                    <TableCell className={classes.tableCell} align="left" onClick={() => history.push(`/products/${product.id}`)}>{product.price}</TableCell>
                    <TableCell className={classes.tableCell} align="left" onClick={() => history.push(`/products/${product.id}`)}>{product.material}</TableCell>
                    <TableCell className={classes.tableCell} align="left" onClick={() => history.push(`/products/${product.id}`)}>{product.category}</TableCell>
                    <TableCell className={classes.tableCell} align="left" onClick={() => history.push(`/products/${product.id}`)}>{product.color}</TableCell>
                  </TableRow>
                ))}
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
