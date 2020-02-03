import { START_LOADING, FINISH_LOADING } from './actions';

const loading = (
  state = {
    loading: false,
    /**
     * Variable responsible for showing main loader that blocks every action
     * you would like to do on the screen
     */
    mainLoader: false,
    /**
     * Message that we would like to display somewhere on loading
     * shown on main loader when loading
     */

    message: 'Loading...',
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return action.payload;
    case FINISH_LOADING:
      return {
        loading: false,
        message: 'Loading...',
        mainLoader: false,
      };
    default:
      return state;
  }
};

export { loading as default };
