const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const login = sessionId => {
  return {
    type: LOGIN,
    payload: sessionId,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

export { LOGIN, LOGOUT, login, logout };
