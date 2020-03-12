export const DISMISS_ERROR = 'DISMISS_ERROR';
export const SET_ERROR = 'SET_ERROR';

export const dismissError = () => ({
  type: DISMISS_ERROR,
});

export const setError = (title, message) => ({
  type: SET_ERROR,
  error: {
    title,
    message,
  },
});
