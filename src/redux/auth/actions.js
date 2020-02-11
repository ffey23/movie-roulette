//import * as auth from './utilities';
import api from '../../services/api';
import { API_MIDDLEWARE } from '../middlewares/api.middleware';
import { startLoading, finishLoading } from '../loading/actions';
import Swal from 'sweetalert2';

const RECEIVE_LOGIN_DATA = 'RECEIVE_LOGIN_DATA';
const recieveLoginData = sessionId => {
  return {
    type: RECEIVE_LOGIN_DATA,
    payload: sessionId,
  };
};

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
const REQUEST_TOKEN_REQUEST = 'REQUEST_TOKEN_REQUEST',
  REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS',
  REQUEST_TOKEN_FAILURE = 'REQUEST_TOKEN_FAILURE';

const fetchRequestToken = () => ({
  [API_MIDDLEWARE]: {
    api: [api.auth.create_request_token],
    types: [
      REQUEST_TOKEN_REQUEST,
      REQUEST_TOKEN_SUCCESS,
      REQUEST_TOKEN_FAILURE,
    ],
  },
});

// Dispatch in the root app to check if user is logged in already
const checkLoggedIn = () => {
  return (dispatch, getState) => {
    if (!getState().loggedIn && window.localStorage.getItem('session_id')) {
      dispatch(recieveLoginData(window.localStorage.getItem('session_id')));
    }
  };
};

// Dispatch when you want to create request token and redirect for its authorization
const createRequestToken = () => {
  return dispatch => {
    return dispatch(fetchRequestToken()).then(({ response }) => {
      if (response) {
        // Saving request token into local storage and redirect to moviedb auth page
        const { request_token } = response;
        window.localStorage.setItem('request_token', request_token);
        const validateRequestTokenUrl = `${process.env.REACT_APP_AUTHORIZATION_PAGE}request_token=${request_token}`;
        window.location = validateRequestTokenUrl;
      }
    });
  };
};

// Dispatch after movieDB authentificated your request token and redirected you back
const login = () => {
  return dispatch => {
    const requestToken = window.localStorage.getItem('request_token');
    if (requestToken) {
      // Request token can be used only once
      window.localStorage.removeItem('request_token');

      dispatch(startLoading(true, 'Loging in...'));
      // When got access token, we still need to get session id to use all v3 api features
      return api.auth
        .create_access_token(requestToken)
        .then(({ access_token }) =>
          api.auth.create_session_from_v4(access_token)
        )
        .then(({ session_id }) => {
          dispatch(recieveLoginData(session_id));
          displaySuccess('You have logged in!');

          // To remember we are logged in after leaving the page
          window.localStorage.setItem('session_id', session_id);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          dispatch(finishLoading());
        });
    }
    return Promise.resolve();
  };
};

// Dispatch when you want to logout
const logout = () => {
  return (dispatch, getState) => {
    dispatch(startLoading(true, 'Loging out'));
    return api.auth
      .delete_session(getState().auth.sessionId)
      .then(() => {
        // Cleaning all login data
        dispatch(logoutSuccess());
        window.localStorage.removeItem('session_id');
        displaySuccess('You have logged out!');
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };
};

const displaySuccess = message => {
  Swal.fire({
    icon: 'success',
    toast: true,
    position: 'top-end',
    timer: 3000,
    showConfirmButton: false,
    text: message,
  });
  Promise.resolve();
};

export {
  RECEIVE_LOGIN_DATA,
  LOGOUT_SUCCESS,
  REQUEST_TOKEN_REQUEST,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
  login,
  logout,
  checkLoggedIn,
  createRequestToken,
};
