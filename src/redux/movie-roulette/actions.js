import api from '@/services/api';
import { API_MIDDLEWARE } from '../middlewares/api.middleware';

const CHANGE_ROULETTE_MOVIES_GENRE = 'CHANGE_ROULETTE_MOVIES_GENRE';
const changeRouletteMoviesGenre = genre => ({
  type: CHANGE_ROULETTE_MOVIES_GENRE,
  payload: {
    genre,
  },
});

const ROULETTE_MOVIES_REQUEST = 'ROULETTE_MOVIES_REQUEST',
  ROULETTE_MOVIES_SUCCESS = 'ROULETTE_MOVIES_SUCCESS',
  ROULETTE_MOVIES_FAILURE = 'ROULETTE_MOVIES_FAILURE';

const fetchRouleteMovies = pagination => ({
  [API_MIDDLEWARE]: {
    api: [api.movies.get_popular, pagination],
    types: [
      ROULETTE_MOVIES_REQUEST,
      ROULETTE_MOVIES_SUCCESS,
      ROULETTE_MOVIES_FAILURE,
    ],
    failureFeedback: {
      title: 'Unable to load movies!',
      message: 'Try to reload the page!',
    },
    requestData: {
      loadingMessage: 'Fetching movies...',
    },
  },
});

function fakeMovieSuccess(movies, totalPages) {
  return {
    type: ROULETTE_MOVIES_SUCCESS,
    response: {
      results: movies,
      totalPages,
    },
  };
}

/**
 *
 * @param {null | number} [genre]
 * If provided that means that genre has changed
 * If null, that means that genre has changed to all genres
 * If number, that means that genre has changed to genre with specified id
 * If genre has changed, it clears old movieList and creates new one
 * If genre hasn't change, it adds new items on top of the existing list
 */
const loadRouletteMovies = genre => {
  return (dispatch, getState) => {
    // dispatch(requestRouletteMovies());
    //Change to all genres if it receives null sp we need strickt equals to undefined
    if (genre !== undefined) {
      dispatch(changeRouletteMoviesGenre(genre));
    }
    /**
     * Fetch movies from server only if there are more pages to fetch
     * Feched movies will be added to the states movieList array
     * If there is no more pages, don't fetch and act as you received
     * empty array which will also be added to states movieList
     */
    const { fetchMoviesParams, totalPages } = getState().movieRoulette;
    if (!(fetchMoviesParams.page > totalPages)) {
      return dispatch(
        fetchRouleteMovies(getState().movieRoulette.fetchMoviesParams)
      );
    } else {
      dispatch(fakeMovieSuccess([]));
      return Promise.resolve();
    }
  };
};

export {
  CHANGE_ROULETTE_MOVIES_GENRE,
  ROULETTE_MOVIES_REQUEST,
  ROULETTE_MOVIES_SUCCESS,
  ROULETTE_MOVIES_FAILURE,
  loadRouletteMovies,
};
