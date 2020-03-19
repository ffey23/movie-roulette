import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from './Rating';
import styled from 'styled-components';
import { colors } from '@/styled/variables';
import { fromMd, fromLg } from '@/styled/mixins';
import { pure } from 'recompose';
import Image from './Image/Image';
import Info from './Info';

const MovieItem = ({ movie }) => {
  let Wrapper = styled(Link)`
    // Needed for rating positioning
    position: relative;

    border: 2px solid ${colors.neutralDark};
    border-radius: 5px;

    text-decoration: none;
    color: ${colors.textDark};

    // 1) Make picture grow to the title if it has to
    ${fromMd(`
      display: flex;
    `)}

    ${fromLg(`
      flex-direction: column;
      justify-content: space-between;
    `)}

    &:hover {
      cursor: pointer;
    }
  `;

  return (
    <Wrapper to={`movie-details/${movie.id}`}>
      <Image movie={movie} />
      <Rating rating={movie.vote_average} />
      <Info movie={movie} />
    </Wrapper>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object,
};

export default pure(MovieItem);
