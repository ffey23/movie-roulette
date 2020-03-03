import api from '@/services/api';
import { API_MIDDLEWARE } from '../middlewares/api.middleware';
import Swal from 'sweetalert2';

const RETRIEVE_SESSION = 'RETRIEVE_SESSION';
const retrieveSession = sessionId => {
  return {
    type: RETRIEVE_SESSION,
    sessionId,
  };
};

// Dispatch in the root app to check if user is logged in already
const checkLoggedIn = () => {
  return (dispatch, getState) => {
    if (!getState().loggedIn && window.localStorage.getItem('session_id')) {
      dispatch(retrieveSession(window.localStorage.getItem('session_id')));
    }
  };
};

const REQUEST_TOKEN_REQUEST = 'REQUEST_TOKEN_REQUEST',
  REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS',
  REQUEST_TOKEN_FAILURE = 'REQUEST_TOKEN_FAILURE';

const fetchRequestToken = () => ({
  [API_MIDDLEWARE]: {
    api: [api.auth.fetch_request_token],
    types: [
      REQUEST_TOKEN_REQUEST,
      REQUEST_TOKEN_SUCCESS,
      REQUEST_TOKEN_FAILURE,
    ],
    loaderMessage: 'Fetching request token...',
    stopLoaderOnSuccess: false,
  },
});

// Dispatch when you want to create request token and redirect for its authorization
const createRequestToken = () => {
  return dispatch => {
    return dispatch(fetchRequestToken()).then(({ response }) => {
      if (response) {
        // Saving request token into local storage and redirect to moviedb auth page
        const { request_token } = response;
        window.localStorage.setItem('request_token', request_token);
        const AUTH_PAGE_BASE_URL = 'https://www.themoviedb.org/auth/access?';
        const validateRequestTokenUrl = `${AUTH_PAGE_BASE_URL}request_token=${request_token}`;
        window.location = validateRequestTokenUrl;
      }
    });
  };
};

const ACCESS_TOKEN_REQUEST = 'ACCESS_TOKEN_REQUEST',
  ACCESS_TOKEN_SUCCESS = 'ACCESS_TOKEN_SUCCESS',
  ACCESS_TOKEN_FAILURE = 'ACCESS_TOKEN_FAILURE';

const fetchAccessToken = requestToken => ({
  [API_MIDDLEWARE]: {
    api: [api.auth.fetch_access_token, requestToken],
    types: [ACCESS_TOKEN_REQUEST, ACCESS_TOKEN_SUCCESS, ACCESS_TOKEN_FAILURE],
    loaderMessage: 'Loging in...',
    stopLoaderOnSuccess: false,
  },
});

const SESSION_REQUEST = 'SESSION_REQUEST',
  SESSION_SUCCESS = 'SESSION_SUCCESS',
  SESSION_FAILURE = 'SESSION_FAILURE';

const fetchSession = accessToken => ({
  [API_MIDDLEWARE]: {
    api: [api.auth.fetch_session, accessToken],
    types: [SESSION_REQUEST, SESSION_SUCCESS, SESSION_FAILURE],
  },
});

// Dispatch after movieDB authentificated your request token and redirected you back
const login = () => {
  return dispatch => {
    const requestToken = window.localStorage.getItem('request_token');
    if (requestToken) {
      // Request token can be used only once
      window.localStorage.removeItem('request_token');

      // When got access token, we still need to get session id to use all v3 api features
      return dispatch(fetchAccessToken(requestToken))
        .then(
          ({ response }) =>
            response && dispatch(fetchSession(response.access_token))
        )
        .then(({ response }) => {
          if (response) {
            displaySuccess('You have logged in!');
            // To remember we are logged in after leaving the page
            window.localStorage.setItem('session_id', response.session_id);
          }
        });
    }
    return Promise.resolve();
  };
};

const DELETE_SESSION_REQUEST = 'DELETE_SESSION_REQUEST',
  DELETE_SESSION_SUCCESS = 'DELETE_SESSION_SUCCESS',
  DELETE_SESSION_FAILURE = 'DELETE_SESSION_FAILURE';

const deleteSession = sessionId => ({
  [API_MIDDLEWARE]: {
    api: [api.auth.delete_session, sessionId],
    types: [
      DELETE_SESSION_REQUEST,
      DELETE_SESSION_SUCCESS,
      DELETE_SESSION_FAILURE,
    ],
    loaderMessage: 'Loging out...',
  },
});

// Dispatch when you want to logout
const logout = () => {
  return (dispatch, getState) => {
    return dispatch(deleteSession(getState().auth.sessionId)).then(
      ({ response }) => {
        if (response) {
          window.localStorage.removeItem('session_id');
          displaySuccess('You have logged out!');
        }
      }
    );
  };
};

const displaySuccess = message => {
  Swal.fire({
    icon: 'success',
    toast: true,
    position: 'top-end',
    timer: 2000,
    showConfirmButton: false,
    text: message,
  });
  Promise.resolve();
};

export {
  RETRIEVE_SESSION,
  REQUEST_TOKEN_REQUEST,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAILURE,
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,
  DELETE_SESSION_REQUEST,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_FAILURE,
  // API for components
  login,
  logout,
  checkLoggedIn,
  createRequestToken,
};
