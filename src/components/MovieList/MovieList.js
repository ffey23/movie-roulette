import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.scss';

const MovieList = ({movies}) => {
    const movieItems = movies.map(m => 
        <MovieItem movie={m} key={m.id}/>
    );
    return (
        <div className="movie-list">
            { movieItems }
        </div>
    )
};

MovieList.propTypes = {
    movie: PropTypes.array,
}

export default MovieList;
