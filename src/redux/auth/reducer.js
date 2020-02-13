import {
  SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
  RETRIEVE_SESSION,
} from './actions';

const auth = (
  state = {
    loggedIn: false,
    sessionId: null,
  },
  action
) => {
  switch (action.type) {
    case SESSION_SUCCESS:
      return {
        loggedIn: true,
        sessionId: action.response.session_id,
      };
    case DELETE_SESSION_SUCCESS:
      return {
        loggedIn: false,
        sessionId: null,
      };
    case RETRIEVE_SESSION:
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
};

export { auth as default };
