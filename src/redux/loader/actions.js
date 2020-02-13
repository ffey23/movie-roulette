const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

/**
 * @param {boolean} [mainLoader=true] Determines if main loader will bi triggered
 * @param {string} [message="Loading..."] Loading message which we can use somewhere
 */
const startLoader = (message = 'Loading...') => {
  if (typeof message != 'string') {
    throw Error('message must be a string');
  }
  return {
    type: START_LOADING,
    message,
  };
};

const finishLoader = () => {
  return {
    type: FINISH_LOADING,
  };
};

export { START_LOADING, FINISH_LOADING, startLoader, finishLoader };
