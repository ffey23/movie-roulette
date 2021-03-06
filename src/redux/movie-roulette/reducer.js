import {
  CHANGE_ROULETTE_MOVIES_GENRE,
  ROULETTE_MOVIES_REQUEST,
  ROULETTE_MOVIES_SUCCESS,
  ROULETTE_MOVIES_FAILURE,
  // SHOW_MORE_MOVIES,
} from './actions';

const movieRoulette = (
  state = {
    // Will be directly used as request body object so using _ instead of camelCase
    fetchMoviesParams: {
      page: 1,
      with_genres: null,
    },
    fetching: false,
    totalPages: undefined,

    /**
     * List of all fetched movies
     *
     * Not all fetched pages will be shown at once
     * We show just movies with index 0 to shownMoviesCount-1
     *
     * Every time that user wishes to expend the list, new 20 movies will first be fetched
     * from the server if we are not on the last page and the results will be attached to
     * movieList
     *
     * After fetch we will take arbitrary number of random movies with index greater or equal
     * to shownMoviesCount and put them right after already shown movies in movieList array
     */
    movieList: [],
    shownMoviesCount: 0,
    loadingMessage: null,
  },
  action
) => {
  switch (action.type) {
    case ROULETTE_MOVIES_REQUEST:
      return {
        ...state,
        loadingMessage: action.loadingMessage,
      };
    case ROULETTE_MOVIES_SUCCESS:
      // variable telling how many new movies will we see on each load
      const showNewCount = 6;
      return {
        ...state,
        loadingMessage: null,
        fetchMoviesParams: {
          ...state.fetchMoviesParams,
          page: state.fetchMoviesParams.page + 1,
        },
        // reordering movie list which will in combination with shownMoviesCount give the illusion of randomness
        movieList: showMovies(
          [...state.movieList, ...action.response.results],
          state.shownMoviesCount,
          showNewCount
        ),
        totalPages: action.response.totalPages,
        shownMoviesCount: state.shownMoviesCount + showNewCount,
      };
    case ROULETTE_MOVIES_FAILURE:
      return {
        ...state,
        loadingMessage: null,
      };
    case CHANGE_ROULETTE_MOVIES_GENRE:
      return {
        ...state,
        fetchMoviesParams: {
          page: 1,
          with_genres: action.payload.genre,
        },
        movieList: [],
        totalPages: undefined,
        shownMoviesCount: 0,
      };
    default:
      return state;
  }
};

/**
 *
 * @param {array} movieList
 * @param {*} shownMoviesCount how many first movies are shown - already in the right place
 * @param {*} newShownCount how many new movies we want to show - move them from where they are and glue to movies already shown
 * @return {array} Array of movies with new order from which we can tell which movies will be shown
 */
const showMovies = (movieList, shownMoviesCount, newShownCount) => {
  const shownMovies = [...movieList.slice(0, shownMoviesCount)];
  let unshownMovies = [...movieList.slice(shownMoviesCount)];

  for (let i = 0; i < newShownCount; i++) {
    // Checking if we have any unshown movie to stop looping if we dont
    const unshownLength = unshownMovies.length;
    if (!unshownLength) break;
    let randomIndex = Math.floor(Math.random() * unshownMovies.length);

    // Pushing that movie to the end of the shown movies list and removing it from unshown movies list
    shownMovies.push(unshownMovies[randomIndex]);
    unshownMovies = [
      ...unshownMovies.slice(0, randomIndex),
      ...unshownMovies.slice(randomIndex + 1),
    ];
  }
  return [...shownMovies, ...unshownMovies];
};
export default movieRoulette;
