import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from '@/components/MovieList/MovieList';
import Loader from '@/components/Loader/Loader';
import { loadRouletteMovies } from '@/redux/movie-roulette/actions';
import { fetchGenres } from '@/redux/fixtures/actions';
import { dismissError } from '@/redux/error/actions';
import Swal from 'sweetalert2';
import './RouletteMovieList.scss';
import BottomButtons from './BottomButtons';
import styles from './RouletteMovieList.module.scss';

class RouletteMovieList extends Component {
  renderError() {
    const { error, dismissError } = this.props;
    if (error) {
      Swal.fire({
        icon: 'error',
        title: error.title,
        text: error.message,
      }).then(result => {
        dismissError();
      });
    }
  }

  renderLoader() {
    const { loadingMessage } = this.props;
    if (!loadingMessage) return null;
    return <Loader message={loadingMessage} />;
  }

  renderMovieList() {
    const { moviesShown } = this.props;
    return <MovieList movies={moviesShown} />;
  }

  renderBottomButtons() {
    const { loadingMessage, genres, moviesAll, moviesShown } = this.props;

    // when no genres, we can still see the page, but we don't have roll functionality
    const showRollButton = !loadingMessage && !!genres.length;

    // moviesAll.lenght <= moviesShown.lenght tell us that there is no more movies to load -reducer logic
    const showLoadButton =
      !loadingMessage && moviesAll.length > moviesShown.length;
    return (
      <BottomButtons
        showLoadButton={showLoadButton}
        showRollButton={showRollButton}
        handleLoadButton={this.loadMoviesHandler.bind(this)}
        handleRollButton={this.openGenresModal.bind(this)}
      />
    );
  }

  render() {
    const { moviesShown } = this.props;
    this.renderError();

    return (
      <div>
        <div className={styles.movieListWrapper}>
          <MovieList movies={moviesShown} />
        </div>
        {this.renderLoader()}
        {this.renderBottomButtons()}
      </div>
    );
  }

  componentDidMount() {
    const { moviesAll } = this.props;

    this.fetchGenres();

    // We prevent fetching new movies if someone goes back to this page from movie-details
    if (!moviesAll.length) this.fetchMovies();
  }

  fetchGenres() {
    const { genres, fetchGenres, dismissError } = this.props;

    // Prevents fetching genres if already loaded
    if (genres.length) return;

    fetchGenres().then(result => {
      dismissError();
      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            'Everything works but roll feature is missing! Try to reload the page!',
        });
      }
    });
  }

  fetchMovies(genreId) {
    const { loadRouletteMovies } = this.props;

    loadRouletteMovies(genreId)
      .then(() => {
        // If genre is changed scroll to top
        if (genreId) {
          window.scroll({
            top: 0,
          });
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Unable to load movies!',
        });
      });
  }

  loadMoviesHandler() {
    this.fetchMovies();
  }

  openGenresModal() {
    const { genres, currentGenre } = this.props;
    let inputOptions = genres.reduce(
      (total, current) => ({
        ...total,
        [current.id]: current.name,
      }),
      { 0: 'All genres' }
    );
    Swal.fire({
      title: 'Movie Roulette',
      text: 'Select genre:',
      customClass: {
        popup: 'roulette-movie-list__genres-modal-popup',
        header: 'roulette-movie-list__genres-modal-header',
        title: 'roulette-movie-list__genres-modal-title',
        content: 'roulette-movie-list__genres-modal-content',
        actions: 'roulette-movie-list__genres-modal-actions',
      },
      input: 'radio',
      inputOptions: inputOptions,
      inputValue: currentGenre || 0,
      confirmButtonText: 'Roll',
    }).then(result => {
      if (result.dismiss) Promise.resolve();
      else {
        // eslint-disable-next-line
        const genreId = result.value == '0' ? null : +result.value;
        this.fetchMovies(genreId);
      }
    });
  }
}

const mapStateToProps = state => {
  const { movieList, loadingMessage, shownMoviesCount } = state.movieRoulette;
  return {
    moviesAll: movieList,
    moviesShown: movieList.slice(0, shownMoviesCount),
    loadingMessage,
    genres: state.fixtures.genres,
    currentGenre: state.movieRoulette.fetchMoviesParams.with_genres,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRouletteMovies: genre => dispatch(loadRouletteMovies(genre)),
    fetchGenres: () => dispatch(fetchGenres()),
    dismissError: () => dispatch(dismissError()),
  };
};

RouletteMovieList.propTypes = {
  moviesAll: PropTypes.array,
  moviesShown: PropTypes.array,
  loadingMessage: PropTypes.string,
  genres: PropTypes.array,
  loadRouletteMovies: PropTypes.func,
  fetchGenres: PropTypes.func,
  dismissErrorMessage: PropTypes.func,
  currentGenre: PropTypes.number,
  error: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouletteMovieList);
