import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RatingDisplay from './RatingDisplay';
import styled from 'styled-components';
import { colors } from '@/styled/variables';
import { fromMd, fromLg } from '@/styled/mixins';
import { pure } from 'recompose';

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
  Wrapper = pure(Wrapper);

  const ImageWrapper = styled.div`
    padding: 10px;
    // 1
    ${fromLg(`
      flex-grow: 1;
  `)}
  `;
  const Image = styled.img`
    width: 100%;
    ${fromMd(`
      width: 50px;
    `)}
    // 1
    ${fromLg(`
      height: 100%;
      width: 100%;
      object-fit: cover;
    `)}
  `;
  const RatingDisplayWrapper = styled.div`
    position: absolute;
    right: -23px;
    top: -20px;
  `;
  const Info = styled.div`
    // Hides overflown text when it is flexbox item (md)
    overflow: hidden;
    padding: 10px;
    ${fromLg(`
      padding-top: 0;
  `)}
  `;
  const InfoTitle = styled.h3`
    margin-bottom: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `;

  return (
    <Wrapper onClick={navigateToMovie}>
      <ImageWrapper>
        <Image
          src={`${process.env.REACT_APP_IMAGES_BASE_URL}w300/${movie.poster_path}`}
          alt={`Poster for movie ${movie.original_title}`}
        />
      </ImageWrapper>
      <RatingDisplayWrapper>
        <RatingDisplay rating={movie.vote_average} />
      </RatingDisplayWrapper>
      <Info>
        <InfoTitle title={movie.original_title}>
          {movie.original_title} ({movie.release_date.slice(0, 4)})
        </InfoTitle>
        <p>Language: {movie.original_language}</p>
      </Info>
    </Wrapper>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object,
};

export default pure(MovieItem);
