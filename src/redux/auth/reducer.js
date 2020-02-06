import { RECEIVE_LOGIN_DATA, LOGOUT_SUCCESS } from './actions';

const auth = (
  state = {
    loggedIn: false,
    sessionId: null,
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_LOGIN_DATA:
      return {
        loggedIn: true,
        sessionId: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loggedIn: false,
        sessionId: null,
      };
    default:
      return state;
  }
};

export { auth as default };
