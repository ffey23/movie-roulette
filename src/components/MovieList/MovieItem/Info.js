import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromMd, fromLg } from '@/styled/mixins';

const Info = ({ movie }) => {
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
    <Info>
      <InfoTitle title={movie.original_title}>
        {movie.original_title} ({movie.release_date.slice(0, 4)})
      </InfoTitle>
      <p>Language: {movie.original_language}</p>
    </Info>
  );
};

Info.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Info;
