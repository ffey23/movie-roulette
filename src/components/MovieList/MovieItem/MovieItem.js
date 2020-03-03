import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Rating from './Rating';
import styled from 'styled-components';
import { colors } from '@/styled/variables';
import { fromMd, fromLg } from '@/styled/mixins';
import { pure } from 'recompose';
import Image from './Image/Image';
import Info from './Info';

const MovieItem = ({ movie }) => {
  const [navigation, setNavigation] = useState(null);
  const navigateToMovie = params => {
    setNavigation(true);
  };

  if (navigation)
    return <Redirect to={`movie-details/${movie.id}`} push={true} />;

  let Wrapper = styled.div`
    // Needed for rating positioning
    position: relative;

    border: 2px solid ${colors.neutralDark};
    border-radius: 5px;

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
    <Wrapper onClick={navigateToMovie}>
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
