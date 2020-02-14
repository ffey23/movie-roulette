import { startLoader, finishLoader } from '../loader/actions';
const callApi = api => {
  const [request, ...args] = api;
  return request(...args);
};

export const API_MIDDLEWARE = 'API_MIDDLEWARE';

export default store => next => action => {
  if (!action[API_MIDDLEWARE]) {
    return next(action);
  }

  const { api, types, loaderMessage, stopLoaderOnSuccess = true } = action[
    API_MIDDLEWARE
  ];

  if (!Array.isArray(types)) {
    throw new Error('types must be an array');
  }

  if (types.length !== 3) {
    throw new Error('types must be an array with length=3');
  }

  if (!types.every(at => typeof at == 'string')) {
    throw new Error('types must be an array of strings');
  }

  if (!Array.isArray(api)) {
    throw new Error('api must be an array');
  }

  if (typeof api[0] != 'function') {
    throw new Error(
      'first element of the api array must be a function that returns promise'
    );
  }

  // eslint-disable-next-line
  if (loaderMessage != undefined && typeof loaderMessage != 'string') {
    throw new Error('loaderMessage must be a string');
  }

  const actionWith = (data, dataSpecific) => {
    const finalAction = {
      ...action,
      ...data,
      ...action[API_MIDDLEWARE][dataSpecific],
    };
    delete finalAction[API_MIDDLEWARE];
    return finalAction;
  };
  loaderMessage && store.dispatch(startLoader(loaderMessage));

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }, 'requestData'));
  return callApi(api).then(
    response => {
      stopLoaderOnSuccess && store.dispatch(finishLoader());
      return next(
        actionWith(
          {
            response,
            type: successType,
          },
          'successData'
        )
      );
    },
    error => {
      store.dispatch(finishLoader());
      const defaultTitle = 'Error';
      return next(
        actionWith(
          {
            type: failureType,
            error: {
              message: error.response
                ? error.response.data.status_message ||
                  error.response.data.errors[0]
                : error.message,
              title: error.response
                ? error.response.status + '!'
                : defaultTitle,
            },
          },
          'failureData'
        )
      );
    }
  );
};
