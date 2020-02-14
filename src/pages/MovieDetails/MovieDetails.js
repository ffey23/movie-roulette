import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startLoader, finishLoader } from '../../redux/loader/actions';
import api from '../../services/api';
import Swal from 'sweetalert2';
import Rating from 'react-rating';
import './MovieDetails.scss';

const MovieDetails = ({ startLoader, finishLoader }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [myRating, setMyRating] = useState(0);

  useEffect(() => {
    startLoader('Fetching movie!');
    api.movies
      .get_details(id, localStorage.getItem('session_id'))
      .then(
        movie => {
          setMovie(movie);
          setMyRating(
            movie.account_states.rated ? movie.account_states.rated.value : 0
          );
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Unable to load movie!',
          });
        }
      )
      .finally(() => {
        finishLoader();
      });
  }, [id, startLoader, finishLoader]);

  const rate = value => {
    // Needed for later reseting to the old value on error - othervise it wouldn't rerender
    setMyRating(value);
    api.movies.rate(id, localStorage.getItem('session_id'), value).then(
      movie => {
        Swal.fire({
          icon: 'success',
          title: 'Movie rated!',
        });
      },
      err => {
        // Reseting to old value on error
        const oldValue = myRating;
        setMyRating(oldValue);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Try rate again!',
        });
      }
    );
  };

  const renderAbout = params => {
    const infos = [
      { name: 'Rating', content: movie.vote_average },
      { name: 'Popularity', content: movie.popularity },
      { name: 'Language', content: movie.original_language },
      {
        name: 'Production Companies',
        content: movie.production_companies.map(c => c.name).join(', '),
      },
    ];
    const renderInfos = infos.map(info => (
      <p className='movie-details__about-info'>
        <span className='movie-details__info-name'>{info.name}:</span>{' '}
        {info.content}
      </p>
    ));
    return <div className='movie-details__about'>{renderInfos}</div>;
  };

  if (!movie) {
    return null;
  }
  return (
    <div className='movie-details'>
      <h2 className='movie-details__header'>{movie.original_title}</h2>
      <div className='movie-details__backdrop'>
        <img
          src={`${process.env.REACT_APP_IMAGES_BASE_URL}w500${movie.backdrop_path}`}
          className='movie-details__image'
          alt={`Poster for movie ${movie.original_title}`}
        />
        <div className='movie-details__overview movie-details__overview'>
          {movie.overview}
        </div>
      </div>
      <div className='movie-details__bottom'>
        <div className='movie-details__rating'>
          <Rating
            stop={10}
            fractions={2}
            initialRating={myRating}
            readonly={myRating !== 0}
            onChange={rate}
            emptySymbol='icon-star-empty'
            fullSymbol='icon-star-full'
          />
        </div>
        {renderAbout()}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startLoader: message => dispatch(startLoader(message)),
    finishLoader: () => dispatch(finishLoader()),
  };
};

export default connect(null, mapDispatchToProps)(MovieDetails);
