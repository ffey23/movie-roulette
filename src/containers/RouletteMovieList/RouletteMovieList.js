import { connect } from 'react-redux'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MovieList from '../../components/MovieList/MovieList';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { fetchRouletteMovies } from '../../redux/movie-roulette/actions';
import { fetchGenres } from '../../redux/fixtures/actions';
import Swal from 'sweetalert2';

class RouletteMovieListWrapper extends Component {
  render() {
    const {moviesShown, moviesAll, moviesLoading, genres, fetchMovies} = this.props;
    return (
      <div className="roulette-movie-list">
        <MovieList movies={moviesShown} />
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

        { !moviesLoading &&
          <Button onClick={fetchMovies.bind(this, undefined)} text="Load More"/>
        }
        {/* We also need to load genres from the server to open "Choose genres" popup */}
        { !moviesLoading && !!genres.length &&
        <Button onClick={this.openGenresModal.bind(this)} text="Roll"/>
        }
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
      const { genres, fetchMovies } = this.props;
      const inputOptions = genres.reduce((total, current) => ({
            ...total, [current.id]: current.name
        }), {'null': 'All genres'});
      Swal.fire({
          input: 'radio',
          inputOptions: inputOptions,
          inputValue: genres[0].id,
      }).then(result => {
          if(result.dismiss) console.log('Dismissed!!!')
          const genreId = result.value == 'null' ? null : +result.value;
          fetchMovies(genreId);
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