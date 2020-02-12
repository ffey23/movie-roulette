import {
  SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
  RETRIEVE_SESSION,
} from './actions';

const auth = (
  state = {
    loggedIn: false,
    sessionId: null,
    loadingMessage: null,
  },
  action
) => {
  // All failures just turns off the loading message
  if (action.error) {
    return {
      ...state,
      loadingMessage: null,
    };
  }
  // All requests just turns loadingMessage with loadingMessage action in it
  if (action.loadingMessage) {
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
