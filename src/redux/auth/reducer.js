import {
  RECEIVE_LOGIN_DATA,
  LOGOUT_SUCCESS,
  REQUEST_TOKEN_REQUEST,
  REQUEST_TOKEN_FAILURE,
} from './actions';

const auth = (
  state = {
    loggedIn: false,
    sessionId: null,
    loadingMessage: null,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_TOKEN_REQUEST:
      return {
        ...state,
        loadingMessage: 'Creating request token',
      };
    case REQUEST_TOKEN_FAILURE:
      return {
        ...state,
        loadingMessage: null,
      };
    case RECEIVE_LOGIN_DATA:
      return {
        loggedIn: true,
        sessionId: action.payload,
        loadingMessage: null,
      };
    case LOGOUT_SUCCESS:
      return {
        loggedIn: false,
        sessionId: null,
        loadingMessage: null,
      };
    default:
      return state;
  }
};

export { auth as default };
