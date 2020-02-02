import { connect } from 'react-redux'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MovieList from '../../components/MovieList/MovieList';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { fetchRouletteMovies } from '../../redux/movie-roulette/actions';
import { fetchGenres } from '../../redux/fixtures/actions';
import Swal from 'sweetalert2';
import './RouletteMovieList.scss';

class RouletteMovieListWrapper extends Component {

  render() {
    const {moviesShown, moviesAll, moviesLoading, genres, fetchMovies} = this.props;
    return (
      <div className="roulette-movie-list">
        <div className="roulette-movie-list__movie-list">
          <MovieList movies={moviesShown} />
        </div>
        {/* 
          * Hides load and roll button when movies are loading
          * We also need to hide load button if we don't have more movies to load
          */}
        {
          moviesLoading && (moviesAll.length > moviesShown.length) &&
          <div className="roulette-movie-list__loader">
            <Loader message="Fetching movies!" />
          </div>
        }
          <div className="roulette-movie-list__buttons">
            { !moviesLoading &&
            <div className="roulette-movie-list__load-button">
              <Button onClick={fetchMovies.bind(this, undefined)} text="Load"/>
            </div>
            }
            {/* We also need to load genres from the server to open "Choose genres" popup */}
            { !moviesLoading && !!genres.length &&
              <div className="roulette-movie-list__roll-button">
                <Button onClick={this.openGenresModal.bind(this)} text="Roll"/>
              </div>
            }
          </div>
      </div>
    );
  }

  componentDidMount() {
    const {fetchMovies, fetchGenres, genres, moviesAll} = this.props;

    // We fetches genres only if we already dont have them loaded
    genres.length || fetchGenres().catch(
      error => {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Roll feature is missing!',
        });
        return Promise.resolve([])
      } 
    );
    
    // We prevent fetching new movies if someone goes back to this page from movie-details
    moviesAll.length || fetchMovies().catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: 'Unable to load movies!',
      });
    });
  }

  openGenresModal() {
      const { genres, currentGenre, fetchMovies } = this.props;
      let inputOptions = genres.reduce((total, current) => ({
            ...total, [current.id]: current.name
        }), {0 : 'All genres'});
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
          if(result.dismiss) Promise.resolve()
          else {
            const genreId = result.value == '0' ? null : +result.value;
            fetchMovies(genreId);
          }
      })
  }
}

const mapStateToProps = state => {
    const {movieList, loading : moviesLoading, shownMoviesCount} = state.movieRoulette;
    return {
        moviesAll: movieList,
        moviesShown: movieList.slice(0,shownMoviesCount),
        moviesLoading, 
        genres: state.fixtures.genres,
        currentGenre: state.movieRoulette.fetchMoviesParams.with_genres,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchMovies: (genre) => dispatch(fetchRouletteMovies(genre)),
      fetchGenres: () => dispatch(fetchGenres()),
    }
  }

RouletteMovieListWrapper.propTypes = {
    moviesAll: PropTypes.array,
    moviesShown: PropTypes.array,
    moviesLoading: PropTypes.bool,
    genres: PropTypes.array,
    fetchMovies: PropTypes.func,
    fetchGenres: PropTypes.func,
}
const RouletteMovieList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RouletteMovieListWrapper);

export default RouletteMovieList;