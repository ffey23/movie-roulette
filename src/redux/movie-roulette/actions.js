import api from '../../services/api';

const REQUEST_ROULETTE_MOVIES = 'REQUEST_ROULETTE_MOVIES';
const requestRouletteMovies = () => ({
  type: REQUEST_ROULETTE_MOVIES,
});

const RECEIVE_ROULETTE_MOVIES = 'RECEIVE_ROULETTE_MOVIES';
function receiveRouletteMovies(movies, totalPages) {
  return {
    type: RECEIVE_ROULETTE_MOVIES,
    payload: {
      movies,
      totalPages: totalPages,
    },
  };
}

const CHANGE_ROULETTE_MOVIES_GENRE = 'CHANGE_ROULETTE_MOVIES_GENRE';
const changeRouletteMoviesGenre = genre => ({
  type: CHANGE_ROULETTE_MOVIES_GENRE,
  payload: {
    genre,
  },
});

/**
 *
 * @param {null | number} [genre]
 * If provided that means that genre has changed
 * If null, that means that genre has changed to all genres
 * If number, that means that genre has changed to genre with specified id
 * If genre has changed, it clears old movieList and creates new one
 * If genre hasn't change, it adds new items on top of the existing list
 */
const fetchRouletteMovies = genre => {
  return (dispatch, getState) => {
    const { fetchMoviesParams, totalPages } = getState().movieRoulette;
    dispatch(requestRouletteMovies());
    //Change to all genres if it receives null sp we need strickt equals to undefined
    if (genre !== undefined) {
      dispatch(changeRouletteMoviesGenre(genre));
    }
    /**
     * Fetch pages from server only if there are more pages to fetch
     * If not, don't fetch and act as you received empty array
     */

    if (!(fetchMoviesParams.page > totalPages)) {
      return api.movies
        .get_popular(getState().movieRoulette.fetchMoviesParams)
        .then(response => {
          dispatch(
            receiveRouletteMovies(response.results, response.total_pages)
          );
          return response;
        });
    } else {
      dispatch(receiveRouletteMovies([]));
      return Promise.resolve();
    }
  };
};

export {
  REQUEST_ROULETTE_MOVIES,
  RECEIVE_ROULETTE_MOVIES,
  CHANGE_ROULETTE_MOVIES_GENRE,
  fetchRouletteMovies,
  receiveRouletteMovies,
};
