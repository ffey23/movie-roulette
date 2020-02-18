import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import styled from 'styled-components';
import { fromLg } from '../../styled/mixins';

const MovieList = ({ movies }) => {
  const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-gap: 20px;
    ${fromLg(`
        grid-gap: 40px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    `)}
  `;
  const movieItems = movies.map(m => <MovieItem movie={m} key={m.id} />);
  return <Wrapper>{movieItems}</Wrapper>;
};

MovieList.propTypes = {
  movie: PropTypes.array,
};

export default MovieList;
