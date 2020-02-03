import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './MovieItem.scss';
import RatingDisplay from '../RatingDisplay/RatingDisplay';

const MovieItem = ({ movie }) => {
  const [navigation, setNavigation] = useState(null);
  const navigateToMovie = params => {
    setNavigation(true);
  };
  if (navigation)
    return <Redirect to={`movie-details/${movie.id}`} push={true} />;
  return (
    <div className='movie-item' onClick={navigateToMovie}>
      <div className='movie-item__image-wrapper'>
        <img
          src={`${process.env.REACT_APP_IMAGES_BASE_URL}w300/${movie.poster_path}`}
          className='movie-item__image'
          alt={`Poster for movie ${movie.original_title}`}
        />
      </div>
      <div className='movie-item__rating'>
        <RatingDisplay rating={movie.vote_average} />
      </div>
      <div className='movie-item__info'>
        <h3 className='movie-item__title' title={movie.original_title}>
          <span>
            {movie.original_title} ({movie.release_date.slice(0, 4)})
          </span>
        </h3>
        <p className='movie-item__other-info'>
          Language: {movie.original_language}
        </p>
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object,
};

export default MovieItem;
