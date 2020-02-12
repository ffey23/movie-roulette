import {
  SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
  RETRIEVE_SESSION,
  SESSION_FAILURE,
  REQUEST_TOKEN_FAILURE,
  ACCESS_TOKEN_FAILURE,
  DELETE_SESSION_FAILURE,
  REQUEST_TOKEN_REQUEST,
  ACCESS_TOKEN_REQUEST,
  DELETE_SESSION_REQUEST,
} from './actions';

const auth = (
  state = {
    loggedIn: false,
    sessionId: null,
    loadingMessage: null,
  },
  action
) => {
  // Actions that turn off loading message
  const turnOffLoading = [
    REQUEST_TOKEN_FAILURE,
    ACCESS_TOKEN_FAILURE,
    SESSION_FAILURE,
    DELETE_SESSION_FAILURE,
  ];
  if (turnOffLoading.includes[action.type]) {
    return {
      ...state,
      loadingMessage: null,
    };
  }

  // Actions that turn on loading message
  // All have to have action.loadingMessage
  const turnOnLoading = [
    REQUEST_TOKEN_REQUEST,
    ACCESS_TOKEN_REQUEST,
    DELETE_SESSION_REQUEST,
  ];
  if (turnOnLoading.includes(action.type)) {
    return {
      ...state,
      loadingMessage: action.loadingMessage,
    };
  }

  switch (action.type) {
    case SESSION_SUCCESS:
      return {
        loggedIn: true,
        sessionId: action.response.session_id,
        loadingMessage: null,
      };
    case DELETE_SESSION_SUCCESS:
      return {
        loggedIn: false,
        sessionId: null,
        loadingMessage: null,
      };
    case RETRIEVE_SESSION:
      return {
        ...state,
        loggedIn: true,
        sessionId: action.sessionId,
      };
    default:
      return state;
  }
};

export { auth as default };
