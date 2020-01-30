import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import NavBar from './components/NavBar';

import './App.css';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import SignIn from './views/SignIn';
import ProductShow from './views/ProductShow';
import { Box } from '@material-ui/core'


const styles = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: theme.spacing(2),
    background: 'linear-gradient(to right, #d3cce3, #e9e4f0)',
    height: '100%'
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    const token = this.props.auth.token;
    return (
      <>
        <Router>
          <NavBar auth={this.props.auth} />
          <Box className={classes.root}>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} token={token}/>
              <PrivateRoute exact path="/products/:id" component={ProductShow} token={token}/>
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp}/>
              <Route component={NotFound} />
            </Switch>
          </Box>
        </Router>
      </>
    );
  }
}


/**
 * A helper private route component
 * check if the autentication granted, then only allow to route to the component
 * refactor to another file if required at other palces
 */
const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route {...rest} render={props => (
    authenticated(token) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/sign-in',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


/**
 * Authenticated checks if an access token is available in the state
 */
const authenticated = (token) => {
  return !!token;
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(App);
