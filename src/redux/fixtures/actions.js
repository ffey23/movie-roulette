import api from '../../services/api';

const RECEIVE_GENRES = 'RECEIVE_GENRES';
const receiveGenres = genres => ({
  type: RECEIVE_GENRES,
  payload: {
    genres,
  },
});

const fetchGenres = () => {
  return dispatch => {
    return api.fixtures
      .get_genres()
      .then(response => dispatch(receiveGenres(response.genres)));
  };
};

export { RECEIVE_GENRES, fetchGenres };
