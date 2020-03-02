import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';

// We can't use styled components here because MovieItem would rerender when it shouldn't (on load more)
import styles from './MovieList.module.scss';

const MovieList = ({ movies }) => {
  const movieItems = movies.map(m => <MovieItem movie={m} key={m.id} />);
  return <div className={styles.movieListWrapper}>{movieItems}</div>;
};

MovieList.propTypes = {
  movie: PropTypes.array,
};

export default MovieList;
