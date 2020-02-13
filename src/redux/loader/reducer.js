import { START_LOADING, FINISH_LOADING } from './actions';

const loader = (
  /**
   * Message that we would like to display in main loader
   * null - loader is not shown
   * string - loader is shown
   **/
  state = null,
  // {
  // loading: false,
  /**
   * Variable responsible for showing main loader that blocks every action
   * you would like to do on the screen
   */
  // mainLoader: false,
  /**
   * Message that we would like to display somewhere on loading
   * shown on main loader when loading
   */

  // message: null,
  //},
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return action.message;
    case FINISH_LOADING:
      return null;
    default:
      return state;
  }
};

export { loader as default };
