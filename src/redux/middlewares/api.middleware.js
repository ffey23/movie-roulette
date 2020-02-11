const callApi = api => {
  const [request, ...args] = api;
  return request(...args);
};

export const API_MIDDLEWARE = 'API_MIDDLEWARE';

export default state => next => action => {
  if (!action[API_MIDDLEWARE]) {
    return next(action);
  }

  const { api, types } = action[API_MIDDLEWARE];

  if (
    !Array.isArray(types) ||
    // eslint-disable-next-line
    types.length != 3 ||
    !types.every(at => typeof at == 'string')
  ) {
    throw new Error('types must be an array of strings with the length=3');
  }

  const actionWith = data => {
    const finalAction = { ...action, ...data };
    delete finalAction[API_MIDDLEWARE];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(api).then(
    response =>
      next(
        actionWith({
          response,
          type: successType,
        })
      ),
    error => {
      const defaultTitle = 'Error';
      return next(
        actionWith({
          type: failureType,
          error: {
            message: error.response
              ? error.response.data.status_message ||
                error.response.data.errors[0]
              : error.message,
            title: error.response ? error.response.status + '!' : defaultTitle,
          },
        })
      );
    }
  );
};
