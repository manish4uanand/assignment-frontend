/**
 * All states, action and action creator realted to authentication
 */

import {
  login as userLogin,
  signup
} from '../apis';
import { loadState, saveState, saveCurrentUser, loadCurrentUser } from '../utils/storage';
import {
  LOGIN,
  LOGOUT,
  SIGNUP } from './actionType';

// default state
const defaultState = {
  token: loadState(),
  current_user: loadCurrentUser(),
}

// Reducers
export default function reducer(state=defaultState, action={}) {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return { ...state, token: action.token, current_user: action.current_user, message: action.message };
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
}

// Action creators
export function verifyUserAndLogin(data) {
  return (dispatch) => {
    userLogin(data)
      .then((response) => {
      const data = response.data;
      if(response.status) {
        // success
        var accessToken = {
          "access-token": response.headers["access-token"],
          "client": response.headers.client,
          "uid": response.headers.uid
        }
        saveState(accessToken);
        saveCurrentUser(response.data.data);
        dispatch(login({
          token: accessToken,
          current_user: response.data.data,
        }));
      } else {
        //failed
        dispatch(login({message: data.message}));
      }
    })
    .catch(error => {
      dispatch(login({message: error.response.data.errors}));
    })
  }
}

export function RegisterUser(data) {
  return (dispatch) => {
    signup(data)
    .then((response) => {
      const data = response.data;
      if(response.status) {
        alert("You have been register succesfully! \n Kindly login to continue")
        window.location.href = window.location.origin + '/sign-in'
      } else {
        //failed
        dispatch(login({message: data.message}));
      }
    })
  }
}

export function logout() {
  return (dispatch) => {
    // remove the token from storage
    saveState('');
    dispatch({type: LOGOUT});
  }
}

// private action creators
function login({token, current_user, message}) {
  return {
    type: LOGIN,
    token,
    current_user,
    message
  }
}
