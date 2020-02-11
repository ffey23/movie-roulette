// Creates default api error message
/**
 * Catching error somewhere else in the code:
 *
 * dispatch(actionCreator()).then((result) =>
 *  {if(result.error)}
 * )
 **/

import { DISMISS_ERROR } from './actions';
const error = (state = null, action) => {
  const { type, error } = action;
  // eslint-disable-next-line
  if (type == DISMISS_ERROR) {
    return null;
  } else if (error) {
    return error;
  }
  return state;
};

export default error;
