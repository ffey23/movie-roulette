import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RatingDisplay from './RatingDisplay';
import styled from 'styled-components';
import { colors } from '@/styled/variables';
import { fromMd, fromLg } from '@/styled/mixins';
import { pure } from 'recompose';
import Image from '@/components/Image/Image';
import { ReactComponent as ErrorSvg } from '@/assets/images/error-icon.svg';

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

  const ImageWrapper = styled.div`
    position: relative;
    padding: 10px;
    padding-bottom: calc((100% - 20px) * 1.49997 + 10px);
    ${fromMd(`
      padding-bottom: 10px;
      width: 70px;
      height: 95px;
      // prevents shrinking image if title is to big
      flex-shrink: 0;
    `)}
    ${fromLg(`
      padding-bottom: calc((100% - 20px) * 1.49997 + 10px);
      width: 100%;
      height: auto;
      flex-grow: 1;
    `)}
  `;

  const imageCss = `
    position: absolute;
    width: calc(100% - 20px);
    ${fromMd(`
      position: relative;
      width: 100%;
    `)}
    ${fromLg(`
      position: absolute;
      width: calc(100% - 20px);
      // 1
      object-fit: cover;
    `)}
  `;

  const ErrorFallback = () => {
    const ErrorSvgWrapper = styled.div`
      position: absolute;
      width: 100px;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
      ${fromMd(`
        width: 55px;
        position: relative;
        top: 10px;
        left: 0;
      `)}
      ${fromLg(`
        position: absolute;
        width: 100px;
        top: calc(50% - 50px);
        left: calc(50% - 50px);
      `)}
      svg {
        fill: ${colors.neutralDark};
      }
    `;

    return (
      <ErrorSvgWrapper>
        <ErrorSvg />
      </ErrorSvgWrapper>
    );
  };

  const RatingDisplayWrapper = styled.div`
    position: absolute;
    right: -23px;
    top: -20px;
  `;
  const Info = styled.div`
    // Hides overflown text when it is flexbox item (md)
    overflow: hidden;
    padding: 10px;
    padding-top: 0;
    ${fromMd(`
      padding-top: 10px;
    `)}
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
          ErrorFallback={ErrorFallback}
          css={imageCss}
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
