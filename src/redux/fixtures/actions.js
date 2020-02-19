import api from '@/services/api';
import { API_MIDDLEWARE } from '../middlewares/api.middleware';

const GENRES_REQUEST = 'GENRES_REQUEST',
  GENRES_SUCCESS = 'GENRES_SUCCESS',
  GENRES_FAILURE = 'GENRES_FAILURE';

const fetchGenres = () => ({
  [API_MIDDLEWARE]: {
    api: [api.fixtures.get_genres],
    types: [GENRES_REQUEST, GENRES_SUCCESS, GENRES_FAILURE],
  },
});

export { GENRES_SUCCESS, fetchGenres };
